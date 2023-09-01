import React from "react";

import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import MyProfile from "../../components/profile/myProfile";

function ProfileRoute() {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path=":posts" element={<MyProfile />} />
      <Route path=":settings" element={<MyProfile />} />
    </Routes>
  );
}

export default ProfileRoute;
