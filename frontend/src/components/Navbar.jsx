import { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

import lightLogo from "../assets/flowell_logo_dark.png";
import darkLogo from "../assets/flowell_logo_white.png";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <nav
      className="overflow-hidden
             backdrop-blur-lg bg-white/70 dark:bg-[#0e0e0e] shadow-lg border-b border-gray-100 dark:border-[#121212] px-6 py-4 md:px-10 md:py-5 flex justify-between items-center transition-all duration-500">
      <img
        src={theme === "dark" ? darkLogo : lightLogo}
        alt="Flowell Logo"
        className="h-10 transition-transform duration-300 hover:scale-105"
      />

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
