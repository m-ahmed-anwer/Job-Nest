import React, { useEffect, useState } from "react";
import Profile from "../../components/single-company/Profile";
import { Link, useParams } from "react-router-dom";
import { getCompanyUserById } from "../../firebase/firebase";
import Loading from "../../components/alert/loading";

function SingleCompany() {
  const { companyId } = useParams();
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const list = await getCompanyUserById(companyId);
      setCompany(list);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <>
          <div class="bg-white p-3 shadow-sm rounded-sm sm:w-3/4 container mx-auto sm:mt-24">
            <div className="flex flex-wrap sm">
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                <img src={company.photoURL} alt="" className="rounded-xl" />
              </div>
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                <h2 className="mb-4 text-4xl font-semibold text-blue-500 dark:text-gray-300">
                  {company.displayName}
                </h2>
                <p className="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                  Hey there 👋, Welcome to {company.displayName} profile feel
                  free to browse the company, if you have any clarification
                  please chat with us
                </p>
                <Link
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  type="submit"
                  to={`/chat/${companyId}`}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    CHAT
                  </span>
                </Link>
              </div>
            </div>
            <div class="text-gray-700 sm:mt-28 mt-11">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Company Name</div>
                  <div class="mx-2 my-4">{company.displayName}</div>
                </div>

                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Contact No.</div>
                  <div class="mx-2 my-4">{company.userPhone}</div>
                </div>
                {company.address && (
                  <>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Country</div>
                      <div class="mx-2 my-4">{company.address.country}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Zip</div>
                      <div class="mx-2 my-4">{company.address.zip}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">City</div>
                      <div class="mx-2 my-4">{company.address.city}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">State</div>
                      <div class="mx-2 my-4">{company.address.state}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Street</div>
                      <div class="mx-2 my-4">{company.address.street}</div>
                    </div>
                  </>
                )}

                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Email.</div>
                  <div class="mx-2 my-4">{company.email}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Date of Joined</div>
                  <div class="mx-2 my-4">{Date(company.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
          <Profile company={company} />
        </>
      )}
    </div>
  );
}

export default SingleCompany;
