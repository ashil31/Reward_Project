import React from "react";

const RedeemError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="text-gray-600 mt-2">
        Invalid access. Please scan your QR to claim a reward.
      </p>
    </div>
  );
};

export default RedeemError;
