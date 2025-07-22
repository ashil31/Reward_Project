import React from "react";
import { useState } from "react";
import axios from "axios";


const RewardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardSerialNumber: "",
    upiId: "",
  });

  const [reward, setReward] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = window.location.pathname.split("/redeem/")[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rewards/claim",
        {
          ...formData,
          qrToken: token,
        }
      );
      setReward(response.data.rewardAmount);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (reward !== null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          🎉 Congratulations!
        </h1>
        <p className="text-xl mb-2">You won ₹{reward}!</p>
        <p className="text-gray-600">
          You will receive the reward within 48 hours.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Claim Your Reward</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="cardSerialNumber"
          placeholder="Card Serial Number"
          value={formData.cardSerialNumber}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="upiId"
          placeholder="UPI ID (Optional)"
          value={formData.upiId}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Claim Reward"}
        </button>
      </form>
    </div>
  );
};

export default RewardForm;
