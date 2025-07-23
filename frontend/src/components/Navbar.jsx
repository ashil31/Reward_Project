import logo from "../assets/flowell_logo_white_theme.png";
import { useRef, useEffect } from "react";
import { animateLogo } from "../animations/logoAnimation";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const logoRef = useRef();

  useEffect(() => {
    animateLogo(logoRef);
  }, []);
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-black shadow">
      <img src={logo} alt="Logo" className="h-10" />
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
