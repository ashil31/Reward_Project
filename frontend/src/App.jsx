import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedeemPage from "./pages/RedeemPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/redeem/:token" element={<RedeemPage />} />
        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
