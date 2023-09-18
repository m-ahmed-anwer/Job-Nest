import React from "react";
import { useParams } from "react-router";
import Profile from "../../components/single-company/Profile";
import Chat from "../../components/single-company/Chat";

function SingleCompany() {
  const { companyId } = useParams();

  return (
    <div>
      <Profile />
      assd
      <Chat />
    </div>
  );
}

export default SingleCompany;
