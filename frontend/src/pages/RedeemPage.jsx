import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Congratulations from "../components/Congratulations";

const RedeemPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardSerialNumber: "",
    upiId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://reward-project.onrender.com/api/rewards/claim",
        {
          ...formData,
          qrToken: token,
        }
      );
      setRewardAmount(response.data.rewardAmount);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100 dark:bg-black text-black dark:text-white transition-all duration-500">
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

          {/* Input Fields */}
          {[
            { name: "name", type: "text", label: "Name", required: true },
            { name: "email", type: "email", label: "Email", required: true },
            { name: "phone", type: "text", label: "Phone", required: true },
            {
              name: "cardSerialNumber",
              type: "text",
              label: "Card Serial Number",
              required: true,
            },
            {
              name: "upiId",
              type: "text",
              label: "UPI ID (optional)",
              required: false,
            },
          ].map(({ name, type, label, required }) => (
            <div key={name} className="relative mt-8 w-full">
              <input
                type={type}
                name={name}
                id={name}
                required={required}
                onChange={handleChange}
                autoComplete="off"
                placeholder=" " // important: a space only
                className="peer block w-full appearance-none px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1c1c1c] text-sm text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <label
                htmlFor={name}
                className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 dark:peer-focus:text-blue-400"
              >
                {label}
              </label>
            </div>
          ))}

          {/* Submit Button */}
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
  );
};
export default RedeemPage;
