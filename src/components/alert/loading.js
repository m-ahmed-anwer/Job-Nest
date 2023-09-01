import React from "react";

function Loading({ loading, value }) {
  return (
    <div
      className={` ${
        !loading ? "hidden" : "absolute"
      } bg-white bg-opacity-60 z-10 ${
        value === true ? "h-1/2" : "h-full"
      } w-full flex items-center justify-center`}
    >
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
}

export default Loading;
