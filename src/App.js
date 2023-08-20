import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Home from "./routes/home/home.component";
import Jobs from "./routes/jobs/jobs.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<Jobs />} />
        <Route path="/service" element={<Jobs />} />
      </Route>
    </Routes>
  );
}

export default App;
