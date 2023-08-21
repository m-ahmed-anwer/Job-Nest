import React, { Fragment } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Outlet } from "react-router";

function Outlayer() {
  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col mt-5 mb-5" style={{ minHeight: "500px" }}>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
}

export default Outlayer;
