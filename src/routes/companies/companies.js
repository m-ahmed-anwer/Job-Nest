import { useEffect, useState } from "react";

import Company from "../../components/company/company";
import { getCompanyUsers } from "../../firebase/firebase";
import LoadingCompany from "../../components/loading-company/loading.comapny";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const list = await getCompanyUsers();
        setCompanies(list);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Companies
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="lg:col-span-3">
                <section className="py-16">
                  <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                    <div className="max-w-md">
                      <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">
                        Top Companies
                      </h1>
                      <p className="text-gray-600 mt-2">
                        Best Companies in 2023 are listed down below as you can
                        see these companies have achecived many bonus.
                      </p>
                    </div>
                    <ul className="mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
                      {isLoading ? (
                        <>
                          <LoadingCompany />
                          <LoadingCompany />
                          <LoadingCompany />
                          <LoadingCompany />
                        </>
                      ) : companies.length === 0 ? (
                        <p className="my-5 mx-11">
                          No companies registered yet.
                        </p>
                      ) : (
                        companies.map((item) => {
                          return (
                            <div key={item.id}>
                              <Company item={item} />
                            </div>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
export default Companies;
