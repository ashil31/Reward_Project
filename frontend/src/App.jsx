// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RedeemPage from "./pages/RedeemPage";
import Home from "./pages/Home";
import RedeemError from "./pages/RedeemError";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { ThemeProvider } from "./context/ThemeContext";
import AnnouncementBar from "./components/AnnouncementBar";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <Router>
          <AnnouncementBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redeem/:token" element={<RedeemPage />} />
            <Route path="/redeem-error" element={<RedeemError />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
