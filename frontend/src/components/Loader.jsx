import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import lightLogo from "../assets/flowell_logo_dark.png";
import darkLogo from "../assets/flowell_logo_white.png";
import { ThemeContext } from "../context/ThemeContext";

const Loader = ({ onComplete }) => {
  const logoRef = useRef();
  const loopingRef = useRef(); // to store the looping animation
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // a timeline that loops zoom-in and zoom-out indefinitely
    const loopTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.5, ease: "none" } });
    loopTl.fromTo(logoRef.current, { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 1 });

    loopingRef.current = loopTl;

    return () => {
      loopingRef.current?.kill();
    };
  }, []);

  // when loading completes, fade out the logo and kill the looping animation
  useEffect(() => {
    if (onComplete) {
      const endTl = gsap.timeline({
        onComplete: () => {
          loopingRef.current?.kill();
        },
      });
      endTl.to(logoRef.current, { scale: 0, opacity: 0, duration: 1 });
    }
  }, [onComplete]);

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
