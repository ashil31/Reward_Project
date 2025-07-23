import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "../assets/flowell_logo_white_theme.png";

const Loader = ({ onComplete }) => {
  const logoRef = useRef();

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
      <img src={logo} alt="Loading..." ref={logoRef} className="h-20" />
    </div>
  );
};

export default Loader;
