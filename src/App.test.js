// src/App.test.js
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import App from "./App";

test("renders learn react link", () => {
  render(
    <Router>
      <App />
    </Router>
  );
});
