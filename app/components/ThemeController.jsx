"use client";

import { useEffect, useState } from "react";

const ThemeController = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.classList.add("text-white");
        setIsDarkMode(true);
      }
    }
  }, []);

  const handleThemeChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("text-white");
      setIsDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.remove("text-white");
      setIsDarkMode(false);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        className="toggle theme-controller"
        checked={isDarkMode}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeController;
