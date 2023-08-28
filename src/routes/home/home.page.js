import React, { Fragment } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Outlet } from "react-router";

function Outlayer() {
  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col " style={{ minHeight: "500px" }}>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
}

export default Outlayer;
