import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./routes/home/home.component";
import Jobs from "./routes/jobs/jobs.component";
import Login from "./routes/login/login.component";
import Signup from "./routes/signup/signup.component";
import ContactUs from "./components/contact-us/contact-us";
import NotFound from "./components/404/NotFound";
import Outlayer from "./components/home/home.page";
import JobPost from "./routes/job-post/job-post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlayer />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<Jobs />} />
        <Route path="/service" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/post" element={<JobPost />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
