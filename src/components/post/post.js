import React, { useContext, useEffect, useState } from "react";
import LoadingJob from "../loading-job/Loading-job";
import SingleJob from "../jobs/single-job";
import { Link } from "react-router-dom";
import { getJobByUserEmail } from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";

function UploadPost() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      setIsLoading(true);
      const jobsData = await getJobByUserEmail(currentUser.email);
      setJobs(jobsData);
      setIsLoading(false);
    };
    fetchJobs();
  }, [currentUser]);

  return (
    <>
      <div className=" w-full ">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              My Posts
            </h1>
          </div>
          <div className="lg:col-span-3">
            {isLoading ? (
              <>
                <LoadingJob />
                <LoadingJob />
                <LoadingJob />
                <LoadingJob />
                <LoadingJob />
                <LoadingJob />
              </>
            ) : jobs.length === null ? (
              <p className="my-10 mx-11">No jobs available</p>
            ) : (
              jobs.map((doc) => (
                <Link to={`/edit/${doc.id}`} key={doc.id}>
                  <SingleJob job={doc.job} company={doc.company} />
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default UploadPost;
