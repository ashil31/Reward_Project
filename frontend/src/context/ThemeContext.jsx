// src/context/ThemeContext.jsx
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storageKey = "theme-preference";
  const getColorPreference = () =>
    localStorage.getItem(storageKey) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const [theme, setTheme] = useState(getColorPreference);

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    const toggleButton = document.querySelector("#theme-toggle");
    if (toggleButton) {
      toggleButton.setAttribute("aria-label", newTheme);
    }
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
