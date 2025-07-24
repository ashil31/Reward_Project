import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Congratulations from "../components/Congratulations";
import rewardSound from "../assets/reward.mp3";
// import { cn } from "../libs/utils";
// import flowellIcon from "../assets/flowell-icon.png";
import OccupationSelect from "../components/OccupationSelect ";
import BackgroundEffects from "../components/BackgroundEffects";

const RedeemPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pumpSerial: "",
    occupation: "",
    paymentMethod: "upi",
    upiId: "",
    accountNumber: "",
    ifsc: "",
    beneficiaryName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        qrToken: token,
      };
      const response = await axios.post(
        "https://reward-project.onrender.com/api/rewards/claim",
        payload
      );
      setRewardAmount(response.data.rewardAmount);
      setSubmitted(true);

      const audio = new Audio(rewardSound);
      audio.volume = 1;
      await audio.play().catch((err) => {
        console.warn("🔇 Audio play failed:", err);
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <BackgroundEffects />
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-12 transition-all duration-500">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#111111] shadow-2xl rounded-3xl p-8 w-full max-w-lg space-y-6 transition-all duration-500"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
              Claim Your Reward 🎁
            </h2>

            {error && (
              <p className="text-red-500 text-center text-sm font-semibold">
                {error}
              </p>
            )}

            {/* Pump Serial Number */}
            <div className="relative w-full">
              <input
                type="text"
                name="pumpSerial"
                id="pumpSerial"
                required
                onChange={handleChange}
                autoComplete="off"
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="pumpSerial"
                className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Pump Serial Number
              </label>
            </div>

            {/* Name */}
            <div className="relative w-full">
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                autoComplete="off"
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Name
              </label>
            </div>

            {/* Phone */}
            <div className="relative w-full">
              <input
                type="text"
                name="phone"
                id="phone"
                required
                onChange={handleChange}
                autoComplete="off"
                placeholder=" "
                className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Mobile Number
              </label>
            </div>

            {/* Occupation */}
            <OccupationSelect handleChange={handleChange} />

            {/* Payment Method Toggle */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === "bank"}
                  onChange={handleChange}
                />
                Bank Transfer
              </label>
            </div>

            {/* UPI ID */}
            {formData.paymentMethod === "upi" && (
              <div className="relative w-full">
                <input
                  type="text"
                  name="upiId"
                  id="upiId"
                  required
                  onChange={handleChange}
                  placeholder=" "
                  className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="upiId"
                  className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  UPI ID
                </label>
              </div>
            )}

            {/* Bank Details */}
            {formData.paymentMethod === "bank" && (
              <>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    required
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="accountNumber"
                    className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Account Number
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    name="ifsc"
                    id="ifsc"
                    required
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="ifsc"
                    className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    IFSC Code
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    name="beneficiaryName"
                    id="beneficiaryName"
                    required
                    onChange={handleChange}
                    placeholder=" "
                    className="peer block w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="beneficiaryName"
                    className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Beneficiary Name
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-600 hover:to-blue-500 dark:from-green-500 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit
            </button>
          </form>
        ) : (
          <Congratulations rewardAmount={rewardAmount} />
        )}
      </div>
    </div>
  );
};

export default RedeemPage;
