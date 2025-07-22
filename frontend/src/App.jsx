import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RedeemPage from "./pages/RedeemPage";

const Home = () => (
  <div>
    <h1>Welcome to Reward Portal</h1>
    <p>Scan your QR to claim rewards.</p>
  </div>
);

const RedeemError = () => (
  <div>
    <h1>Oops!</h1>
    <p>Invalid access. Please scan your QR to claim a reward.</p>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/redeem/:token" element={<RedeemPage />} />
      <Route path="/redeem-error" element={<RedeemError />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default App;
