import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home.component";
import Jobs from "./routes/jobs/jobs.component";
import Login from "./routes/login/login.component";
import Signup from "./routes/signup/signup.component";
import ContactUs from "./components/contact-us/contact-us";
import NotFound from "./components/404/NotFound";
import Outlayer from "./routes/home/home.page";
import JobPost from "./routes/job-post/job-post";
import Companies from "./routes/companies/companies";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/user-context";
import Settings from "./components/settings/settings";
import Profile from "./routes/profile/profile";
import ForgetPassword from "./routes/reset-password/forget.password";

function App() {
  const { currentUser, databaseUser } = useContext(UserContext);
  useEffect(() => {
    document.title = "Job Nest";
    return () => {
      document.title = "Job Nest";
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Outlayer />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<Jobs />} />
        <Route path="/profile" element={currentUser && <Profile />} />
        <Route path="/service" element={<Jobs />} />
        <Route path="/settings" element={currentUser && <Settings />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forget-password"
          element={currentUser ? <Navigate to="/" /> : <ForgetPassword />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <Signup />}
        />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/post" element={currentUser && <JobPost />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
