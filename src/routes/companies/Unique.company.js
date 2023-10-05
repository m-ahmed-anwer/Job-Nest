import React, { useEffect, useState } from "react";
import Profile from "../../components/single-company/Profile";
import { Link, useParams } from "react-router-dom";
import { getCompanyUserById } from "../../firebase/firebase";
import Loading from "../../components/alert/loading";

function SingleCompany() {
  const { companyId } = useParams();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const list = await getCompanyUserById(companyId);
      setCompanies(list);
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
                <img src={companies.photoURL} alt="" className="rounded-xl" />
              </div>
              <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                <h2 className="mb-4 text-4xl font-semibold text-blue-500 dark:text-gray-300">
                  {companies.displayName}
                </h2>
                <p className="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                  Hey there 👋, Welcome to {companies.displayName} profile feel
                  free to browse the company, if you have any clarification
                  please chat with us
                </p>
                <Link
                  className="rounded-lg px-4 py-2 border-2 border-black text-black hover:bg-blue-600 hover:text-blue-100 duration-300"
                  type="submit"
                  to={`/chat/${companyId}`}>
                  CHAT
                </Link>
              </div>
            </div>
            <div class="text-gray-700 sm:mt-28 mt-11">
              <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Company Name</div>
                  <div class="mx-2 my-4">{companies.displayName}</div>
                </div>

                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Contact No.</div>
                  <div class="mx-2 my-4">{companies.userPhone}</div>
                </div>
                {companies.address && (
                  <>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Country</div>
                      <div class="mx-2 my-4">{companies.address.country}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Zip</div>
                      <div class="mx-2 my-4">{companies.address.zip}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">City</div>
                      <div class="mx-2 my-4">{companies.address.city}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">State</div>
                      <div class="mx-2 my-4">{companies.address.state}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="mx-2 my-4 font-semibold">Street</div>
                      <div class="mx-2 my-4">{companies.address.street}</div>
                    </div>
                  </>
                )}

                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Permanant Address</div>
                  <div class="mx-2 my-4">{companies.displayName}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Email.</div>
                  <div class="mx-2 my-4">{companies.email}</div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="mx-2 my-4 font-semibold">Date of Joined</div>
                  <div class="mx-2 my-4">{Date(companies.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>
          <Profile />
        </>
      )}
    </div>
  );
}

export default SingleCompany;
