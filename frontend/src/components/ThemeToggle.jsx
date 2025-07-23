import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
     const { theme, toggleTheme } = useContext(ThemeContext);
  return (
     <button onClick={toggleTheme} className="text-2xl focus:outline-none">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  )
}

export default ThemeToggle
