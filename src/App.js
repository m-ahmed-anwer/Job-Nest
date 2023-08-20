import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Home from "./routes/home/home.component";
import Jobs from "./routes/jobs/jobs.component";
import Login from "./routes/login/login.component";
import Signup from "./routes/signup/signup.component";
import ContactUs from "./components/contact-us/contact-us";
import NotFound from "./components/404/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<Jobs />} />
        <Route path="/service" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
