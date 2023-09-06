import React from "react";

import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import MyProfile from "../../components/profile/myProfile";
import Settings from "./settings";
import UploadPost from "../../components/post/post";

function ProfileRoute() {
  return (
    <Routes>
      <Route path="/*" element={<Profile />}>
        <Route index element={<MyProfile />} />
        <Route path="posts" element={<UploadPost />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default ProfileRoute;
