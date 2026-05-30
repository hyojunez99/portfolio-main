import React, { useState, useEffect } from "react";
import "./Header.scss";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";

    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="intro-header container">
      <div className="logo">
        LEE <span>HyoJun.</span>
      </div>

      <nav className="nav-links">
        <a href="#intro">ABOUT</a>
        <a href="#process">PROCESS</a>
        <a href="#skills">SKILLS</a>
        <a href="#archive">ARCHIVE</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <div className="theme-toggle-container">
        <button
          className={`theme-toggle-btn ${isDarkMode ? "dark" : "light"}`}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          <span className="toggle-ball">{isDarkMode ? "🌙" : "☀️"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
