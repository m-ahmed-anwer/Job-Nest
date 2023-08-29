import React from "react";

export default function LoadingCompany() {
  return (
    <div>
      <div className="border rounded-lg w-full">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-2">
            <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>

            <div className="w-32 h-4 bg-gray-200 rounded-full animate-pulse"></div>

            <div className="w-48 h-3 mt-1 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="w-20 h-8 px-3 py-2  bg-gray-50 rounded-lg animate-pulse"></div>
        </div>
        <div className="py-5 px-4 border-t flex justify-end">
          <div className="w-1/4 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
