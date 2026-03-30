import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Offer from "./pages/Offer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Dashboard (bestehende App) */}
      <Route path="/" element={<App />} />

      {/* ✅ Neue Offerte-Seite */}
      <Route path="/offer" element={<Offer />} />
    </Routes>
  </BrowserRouter>
);
