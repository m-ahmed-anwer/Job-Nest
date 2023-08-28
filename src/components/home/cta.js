import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const CTA = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <section
      className="py-28"
      style={{
        background:
          "linear-gradient(152.92deg, rgba(112, 132, 252, 0.2) 4.54%, rgba(232, 121, 24, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
        <div className="max-w-xl space-y-3 md:mx-auto">
          <h3 className="text-indigo-600 font-semibold">Find Your Dream Job</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Take the Next Step with Job Nest
          </p>
          <p className="text-gray-600  md:text-lg">
            Discover a world of opportunities tailored to your career goals. Let
            Job Nest be your guide in the journey towards your dream job.
          </p>
        </div>
        <div className="mt-7">
          <Link
            to={currentUser ? "/jobs" : "/login"}
            className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
