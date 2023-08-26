import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Company from "./company";
import { getCompanyUsers } from "../../firebase/firebase";

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];
const integrations = [
  {
    title: "Discord",
    desc: "Ut enim ad minim veniam",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_694_1840)">
          <path
            d="M40.634 8.31115C37.5747 6.90738 34.294 5.87315 30.8638 5.28081C30.8013 5.26937 30.7389 5.29794 30.7067 5.35508C30.2848 6.10551 29.8175 7.08451 29.4902 7.854C25.8008 7.30166 22.1304 7.30166 18.5166 7.854C18.1893 7.06741 17.705 6.10551 17.2811 5.35508C17.249 5.29985 17.1866 5.27128 17.1241 5.28081C13.6958 5.87126 10.4151 6.90549 7.35387 8.31115C7.32737 8.32257 7.30465 8.34164 7.28958 8.36638C1.06678 17.6631 -0.6379 26.7313 0.19836 35.6871C0.202144 35.7309 0.22674 35.7728 0.260796 35.7995C4.36642 38.8145 8.34341 40.645 12.2466 41.8582C12.309 41.8773 12.3752 41.8544 12.415 41.803C13.3383 40.5421 14.1613 39.2127 14.867 37.8146C14.9086 37.7327 14.8688 37.6356 14.7837 37.6032C13.4783 37.108 12.2352 36.5042 11.0395 35.8185C10.9449 35.7633 10.9373 35.628 11.0243 35.5632C11.2759 35.3747 11.5276 35.1785 11.7679 34.9804C11.8114 34.9443 11.872 34.9366 11.9231 34.9595C19.7786 38.546 28.2831 38.546 36.0459 34.9595C36.097 34.9347 36.1576 34.9424 36.203 34.9785C36.4433 35.1766 36.6949 35.3747 36.9484 35.5632C37.0354 35.628 37.0298 35.7633 36.9352 35.8185C35.7394 36.5175 34.4964 37.108 33.189 37.6013C33.1039 37.6337 33.0661 37.7327 33.1077 37.8146C33.8285 39.2107 34.6515 40.5402 35.5578 41.8011C35.5957 41.8544 35.6637 41.8773 35.7262 41.8582C39.6483 40.645 43.6252 38.8145 47.7309 35.7995C47.7668 35.7728 47.7895 35.7328 47.7933 35.689C48.7942 25.3351 46.117 16.3413 40.6964 8.36827C40.6832 8.34164 40.6605 8.32257 40.634 8.31115ZM16.04 30.234C13.675 30.234 11.7263 28.0627 11.7263 25.3961C11.7263 22.7295 13.6372 20.5582 16.04 20.5582C18.4617 20.5582 20.3916 22.7486 20.3538 25.3961C20.3538 28.0627 18.4428 30.234 16.04 30.234ZM31.9895 30.234C29.6245 30.234 27.6758 28.0627 27.6758 25.3961C27.6758 22.7295 29.5867 20.5582 31.9895 20.5582C34.4113 20.5582 36.3411 22.7486 36.3033 25.3961C36.3033 28.0627 34.4113 30.234 31.9895 30.234Z"
            fill="#5865F2"
          />
        </g>
        <defs>
          <clipPath id="clip0_694_1840">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  ,
  {
    title: "Discord",
    desc: "Ut enim ad minim veniam",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_694_1840)">
          <path
            d="M40.634 8.31115C37.5747 6.90738 34.294 5.87315 30.8638 5.28081C30.8013 5.26937 30.7389 5.29794 30.7067 5.35508C30.2848 6.10551 29.8175 7.08451 29.4902 7.854C25.8008 7.30166 22.1304 7.30166 18.5166 7.854C18.1893 7.06741 17.705 6.10551 17.2811 5.35508C17.249 5.29985 17.1866 5.27128 17.1241 5.28081C13.6958 5.87126 10.4151 6.90549 7.35387 8.31115C7.32737 8.32257 7.30465 8.34164 7.28958 8.36638C1.06678 17.6631 -0.6379 26.7313 0.19836 35.6871C0.202144 35.7309 0.22674 35.7728 0.260796 35.7995C4.36642 38.8145 8.34341 40.645 12.2466 41.8582C12.309 41.8773 12.3752 41.8544 12.415 41.803C13.3383 40.5421 14.1613 39.2127 14.867 37.8146C14.9086 37.7327 14.8688 37.6356 14.7837 37.6032C13.4783 37.108 12.2352 36.5042 11.0395 35.8185C10.9449 35.7633 10.9373 35.628 11.0243 35.5632C11.2759 35.3747 11.5276 35.1785 11.7679 34.9804C11.8114 34.9443 11.872 34.9366 11.9231 34.9595C19.7786 38.546 28.2831 38.546 36.0459 34.9595C36.097 34.9347 36.1576 34.9424 36.203 34.9785C36.4433 35.1766 36.6949 35.3747 36.9484 35.5632C37.0354 35.628 37.0298 35.7633 36.9352 35.8185C35.7394 36.5175 34.4964 37.108 33.189 37.6013C33.1039 37.6337 33.0661 37.7327 33.1077 37.8146C33.8285 39.2107 34.6515 40.5402 35.5578 41.8011C35.5957 41.8544 35.6637 41.8773 35.7262 41.8582C39.6483 40.645 43.6252 38.8145 47.7309 35.7995C47.7668 35.7728 47.7895 35.7328 47.7933 35.689C48.7942 25.3351 46.117 16.3413 40.6964 8.36827C40.6832 8.34164 40.6605 8.32257 40.634 8.31115ZM16.04 30.234C13.675 30.234 11.7263 28.0627 11.7263 25.3961C11.7263 22.7295 13.6372 20.5582 16.04 20.5582C18.4617 20.5582 20.3916 22.7486 20.3538 25.3961C20.3538 28.0627 18.4428 30.234 16.04 30.234ZM31.9895 30.234C29.6245 30.234 27.6758 28.0627 27.6758 25.3961C27.6758 22.7295 29.5867 20.5582 31.9895 20.5582C34.4113 20.5582 36.3411 22.7486 36.3033 25.3961C36.3033 28.0627 34.4113 30.234 31.9895 30.234Z"
            fill="#5865F2"
          />
        </g>
        <defs>
          <clipPath id="clip0_694_1840">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  ,
  {
    title: "Discord",
    desc: "Ut enim ad minim veniam",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_694_1840)">
          <path
            d="M40.634 8.31115C37.5747 6.90738 34.294 5.87315 30.8638 5.28081C30.8013 5.26937 30.7389 5.29794 30.7067 5.35508C30.2848 6.10551 29.8175 7.08451 29.4902 7.854C25.8008 7.30166 22.1304 7.30166 18.5166 7.854C18.1893 7.06741 17.705 6.10551 17.2811 5.35508C17.249 5.29985 17.1866 5.27128 17.1241 5.28081C13.6958 5.87126 10.4151 6.90549 7.35387 8.31115C7.32737 8.32257 7.30465 8.34164 7.28958 8.36638C1.06678 17.6631 -0.6379 26.7313 0.19836 35.6871C0.202144 35.7309 0.22674 35.7728 0.260796 35.7995C4.36642 38.8145 8.34341 40.645 12.2466 41.8582C12.309 41.8773 12.3752 41.8544 12.415 41.803C13.3383 40.5421 14.1613 39.2127 14.867 37.8146C14.9086 37.7327 14.8688 37.6356 14.7837 37.6032C13.4783 37.108 12.2352 36.5042 11.0395 35.8185C10.9449 35.7633 10.9373 35.628 11.0243 35.5632C11.2759 35.3747 11.5276 35.1785 11.7679 34.9804C11.8114 34.9443 11.872 34.9366 11.9231 34.9595C19.7786 38.546 28.2831 38.546 36.0459 34.9595C36.097 34.9347 36.1576 34.9424 36.203 34.9785C36.4433 35.1766 36.6949 35.3747 36.9484 35.5632C37.0354 35.628 37.0298 35.7633 36.9352 35.8185C35.7394 36.5175 34.4964 37.108 33.189 37.6013C33.1039 37.6337 33.0661 37.7327 33.1077 37.8146C33.8285 39.2107 34.6515 40.5402 35.5578 41.8011C35.5957 41.8544 35.6637 41.8773 35.7262 41.8582C39.6483 40.645 43.6252 38.8145 47.7309 35.7995C47.7668 35.7728 47.7895 35.7328 47.7933 35.689C48.7942 25.3351 46.117 16.3413 40.6964 8.36827C40.6832 8.34164 40.6605 8.32257 40.634 8.31115ZM16.04 30.234C13.675 30.234 11.7263 28.0627 11.7263 25.3961C11.7263 22.7295 13.6372 20.5582 16.04 20.5582C18.4617 20.5582 20.3916 22.7486 20.3538 25.3961C20.3538 28.0627 18.4428 30.234 16.04 30.234ZM31.9895 30.234C29.6245 30.234 27.6758 28.0627 27.6758 25.3961C27.6758 22.7295 29.5867 20.5582 31.9895 20.5582C34.4113 20.5582 36.3411 22.7486 36.3033 25.3961C36.3033 28.0627 34.4113 30.234 31.9895 30.234Z"
            fill="#5865F2"
          />
        </g>
        <defs>
          <clipPath id="clip0_694_1840">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

function Companies() {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCompanies = async () => {
      try {
        const list = await getCompanyUsers();
        setCompanies(list);
      } catch (error) {
        console.log(error.message);
      }
      console.log(companies);
    };

    fetchCompanies();
  }, []);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Featured Companies
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

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
                      {companies.map((item) => {
                        return <Company item={item} />;
                      })}
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
