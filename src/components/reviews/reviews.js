import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import {
  createReview,
  getReviewsByEmail,
  deleteReview,
} from "../../firebase/firebase";

function Review({ company }) {
  const { currentUser } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [stars, setStars] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [fail, setFail] = useState(false);
  const [alertMSG, setAlertMSG] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      if (company.email) {
        const fetchedReviews = await getReviewsByEmail(company.email);
        setReviews(fetchedReviews);
        //console.log(await getReviewsByEmail(company.email));
      }
    };

    fetchReviews();
  }, []);

  const onMouseOver = (rating) => {
    if (clicked) return;

    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace("far", "fas");
    });
  };

  const onMouseOut = (rating) => {
    if (clicked) return;

    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace("fas", "far");
    });
  };

  const onClick = (rating) => {
    setClicked(true);
    setStars(rating);

    [...Array(5)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace("fas", "far");
    });

    [...Array(rating)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace("far", "fas");
    });
  };

  const resetForm = (e) => {
    e.preventDefault();

    // Reset
    [...Array(5)].map((x, i) => {
      document.querySelector(`#star-${i + 1}`).classList.replace("fas", "far");
    });

    setReview("");
    setStars(1);
    setClicked(false);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (currentUser) {
      setFail(false);
      if (review) {
        const newReview = {
          userEmail: currentUser.email,
          userName: currentUser.displayName,
          recieverEmail: company.email,
          rating: stars,
          description: review,
        };

        await createReview(newReview);
        setReviews([...reviews, newReview]);

        resetForm(e);
      } else {
        setAlertMSG("Please fill out this field to review.");
        setFail(true);
      }
    } else {
      setAlertMSG("Please login to review.");
      setFail(true);
    }
  };

  const deleteReview = async (event, reviewIndex) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const reviewIdToDelete = reviews[reviewIndex].id; // Adjust this line based on your data structure
      await deleteReview(reviewIdToDelete);
      const newState = reviews.filter((r) => r.id !== reviewIdToDelete);
      setReviews(newState);
    } catch (error) {
      console.error("Error deleting review:", error.message);
    }
  };

  return (
    <div className=" p-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl  font-bold mb-8">
            Hello what do you think about our company 🤔 Review Us
          </h1>
        </div>
        <div className="md:w-1/2 mx-auto">
          <div className="mt-5">
            {[...Array(5)].map((x, i) => {
              return (
                <i
                  key={i}
                  className={`${
                    stars > i ? "fas" : "far"
                  } fa-star text-3xl text-yellow-500 cursor-pointer`}
                  id={`star-${i + 1}`}
                  onMouseOver={(e) => onMouseOver(i + 1)}
                  onMouseOut={(e) => onMouseOut(i + 1)}
                  onClick={(e) => onClick(i + 1)}
                />
              );
            })}
          </div>
          <div className="mt-5">
            <textarea
              disabled={!currentUser && true}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={3}
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                setFail(false);
              }}
            />
            {fail && <p className="text-red-500 text-xs italic">{alertMSG}</p>}
          </div>
          <div className="mt-5">
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={(e) => resetForm(e)}
            >
              Reset
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => submitReview(e)}
            >
              Submit
            </button>
          </div>
          <div className="mt-5">
            {reviews.map((r, rIndex) => {
              return (
                <div
                  key={rIndex}
                  className="bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <div className="text-sm text-yellow-950">
                    {r.userName} - {r.userEmail}
                  </div>

                  {[...Array(r.rating)].map((s, sIndex) => {
                    return (
                      <i
                        key={sIndex}
                        className="fas fa-star text-yellow-500"
                      ></i>
                    );
                  })}
                  <p>{r.description}</p>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md focus:outline-none mt-2"
                    onClick={(e) => deleteReview(e, rIndex)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
