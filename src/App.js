import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/user-context";
import Outlayer from "./routes/home/home.page";
import Home from "./components/home/home.component";
import Jobs from "./routes/jobs/jobs.component";
import Login from "./routes/login/login.component";
import Signup from "./routes/signup/signup.component";
import ContactUs from "./components/contact-us/contact-us";
import NotFound from "./components/404/NotFound";
import JobPost from "./routes/job-post/job-post";
import Companies from "./routes/companies/companies";
import ForgetPassword from "./routes/reset-password/forget.password";
import PrivacyPolicy from "./routes/privacy/privacy.policy";
import ProfileRoute from "./routes/profile/profile-route";
import JobDescribe from "./routes/jobs/single-job/single.job.describe";
import TermsAndConditions from "./routes/privacy/terms.conditions";
import JobPost1 from "./routes/job-post/job-post1";
import SingleCompany from "./routes/companies/Unique.company";
import Chat from "./components/single-company/Chat";

function App() {
  const { currentUser } = useContext(UserContext);

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
        <Route path="/jobs/:jobId" element={<JobDescribe />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<SingleCompany />} />
        <Route path="/about" element={<Jobs />} />
        <Route path="/service" element={<Jobs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />

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

        <Route
          path="/profile/*"
          element={currentUser ? <ProfileRoute /> : <Navigate to="/login" />}
        />
        <Route
          path="/post"
          element={currentUser ? <JobPost1 /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/details"
          element={currentUser ? <JobPost /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={currentUser ? <Chat /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
