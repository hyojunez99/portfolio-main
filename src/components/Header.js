import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Header.scss";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const links = menuRef.current?.querySelectorAll("a");
    if (!links) return;

    if (isMenuOpen) {
      gsap.set(links, { y: -10, opacity: 0 });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.07,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="intro-header container">
      <div className="logo">
        LEE <span>HyoJun.</span>
      </div>

      <button
        className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="메뉴 열기"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className="nav-links desktop-nav">
        <a href="#intro">ABOUT</a>
        <a href="#process">PROCESS</a>
        <a href="#skills">SKILLS</a>
        <a href="#archive">ARCHIVE</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <nav
        ref={menuRef}
        className={`nav-links mobile-nav ${isMenuOpen ? "open" : ""}`}
      >
        <a href="#intro" onClick={handleNavClick}>
          ABOUT
        </a>
        <a href="#process" onClick={handleNavClick}>
          PROCESS
        </a>
        <a href="#skills" onClick={handleNavClick}>
          SKILLS
        </a>
        <a href="#archive" onClick={handleNavClick}>
          ARCHIVE
        </a>
        <a href="#contact" onClick={handleNavClick}>
          CONTACT
        </a>
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
