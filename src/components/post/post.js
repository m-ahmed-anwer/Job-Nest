import React, { useContext, useEffect, useState } from "react";
import LoadingJob from "../loading-job/Loading-job";
import { Link } from "react-router-dom";
import { getJobByUserEmail } from "../../firebase/firebase";
import { UserContext } from "../../context/user-context";
import EditJob from "../jobs/edit-job";
import { generateReport } from "../../pdf/asjedh.pdf";

function UploadPost() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      setIsLoading(true);
      const jobsData = await getJobByUserEmail(currentUser.email);
      setJobs(jobsData);
      setIsLoading(false);
    };
    fetchJobs();
  }, [update]);

  const reportGenerate = async () => {
    generateReport(currentUser.email);
  };

  return (
    <>
      <div className=" w-full ">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              My Posts
            </h1>
            <button
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              onClick={reportGenerate}
            >
              Download PDF of Jobs
            </button>
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
            ) : jobs === null || jobs.length === 0 ? (
              <p className="my-10 mx-11">No jobs available</p>
            ) : (
              jobs.map((doc) => (
                <div key={doc.id}>
                  <EditJob
                    job={doc.job}
                    company={doc.company}
                    id={doc.id}
                    setUpdate={setUpdate}
                  />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default UploadPost;
