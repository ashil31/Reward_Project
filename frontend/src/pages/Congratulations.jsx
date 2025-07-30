import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";

import confettiAnim from "../assets/confetti.json";

const Congratulations = () => {
  const containerRef = useRef();

  useEffect(() => {

    gsap.fromTo(
      containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center px-4 py-10 overflow-hidden dark:bg-black">
      {/* 🎊 Confetti */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <Lottie
          animationData={confettiAnim}
          loop={false}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* 🎁 Reward Message */}
      <div
        ref={containerRef}
        className="z-10 bg-white dark:bg-[#1c1c1c] p-8 rounded-3xl shadow-2xl border-2 border-green-400 dark:border-green-500 text-center max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3 animate-pulse">
          🎉 Congratulations!
        </h2>
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          You have been rewarded!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          Your reward will be credited within 3 business days.
        </p>
      </div>
    </div>
  );
};

export default Congratulations;
