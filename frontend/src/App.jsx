import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RedeemPage from "./pages/RedeemPage";
import Home from "./pages/Home";
import RedeemError from "./pages/RedeemError";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { ThemeProvider } from "./context/ThemeContext";
import AnnouncementBar from "./components/AnnouncementBar";
import Congratulations from "./pages/Congratulations";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider>
      {loading ? (
        <Loader active={true} onFinish={() => setLoading(false)} />
      ) : (
        <Router>
          <AnnouncementBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redeem/:token" element={<RedeemPage loading={loading} setLoading={setLoading} />} />
            <Route path="/redeem-error" element={<RedeemError />} />
            <Route path="/congratulations" element={<Congratulations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
