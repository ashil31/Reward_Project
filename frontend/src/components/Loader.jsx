import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import lightLogo from "../assets/flowell_logo_dark.png";
import darkLogo from "../assets/flowell_logo_white.png";
import { ThemeContext } from "../context/ThemeContext";

const Loader = ({ active, onFinish }) => {
  const logoRef = useRef();
  const loopTl = useRef();
  const exitTl = useRef();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    loopTl.current = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 1.2, ease: "power1.inOut" }
    });
    loopTl.current.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1.2, opacity: 1 }
    );
    return () => {
      loopTl.current.kill();
      exitTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!active) {
      exitTl.current = gsap.timeline({
        onStart: () => loopTl.current.pause(),
        onComplete: onFinish
      });
      exitTl.current.to(logoRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power1.out"
      });
    }
  }, [active, onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <img
        ref={logoRef}
        src={theme === "dark" ? darkLogo : lightLogo}
        alt="Loading..."
        className="h-20"
      />
    </div>
  );
};

export default Loader;
