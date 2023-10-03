import React from "react";
import { useParams } from "react-router";
import Profile from "../../asjedh/Profile";

function SingleCompany() {
  const { companyId } = useParams();

  return (
    <div>
      <Profile companyId={companyId} />
    </div>
  );
}

export default SingleCompany;
