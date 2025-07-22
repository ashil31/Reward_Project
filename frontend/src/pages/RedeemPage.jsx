import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedeemPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardSerialNumber: '',
    upiId: '', // optional
  });
  const [submitted, setSubmitted] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/rewards/claim", {
        ...formData,
        qrToken: token,
      });

      setRewardAmount(response.data.rewardAmount);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-200 p-4">
      {!submitted ? (
        <form
          className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center">Claim Your Reward</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="cardSerialNumber"
            placeholder="Card Serial Number"
            required
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="upiId"
            placeholder="UPI ID (optional)"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-green-600">🎉 Congratulations!</h2>
          <p className="mt-2 text-xl">You've won ₹{rewardAmount}</p>
          <p className="mt-1 text-sm text-gray-600">Your reward will be credited within 48 hours.</p>
        </div>
      )}
    </div>
  );
};
export default RedeemPage;