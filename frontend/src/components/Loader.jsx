import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import lightLogo from "../assets/flowell_logo_dark.png";
import darkLogo from "../assets/flowell_logo_white.png";
import { ThemeContext } from "../context/ThemeContext";

const Loader = ({ onComplete }) => {
  const logoRef = useRef();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 1.5 }
    ).to(logoRef.current, { scale: 0, opacity: 0, duration: 1 });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <img
        src={theme === "dark" ? darkLogo : lightLogo}
        alt="Loading..."
        ref={logoRef}
        className="h-20"
      />
    </div>
  );
};

export default Loader;
