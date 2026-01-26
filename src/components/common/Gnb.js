import { useState } from "react";
import "./Gnb.scss";

const Gnb = () => {
  const [activeMenu, setActiveMenu] = useState("intro"); // 기본 활성화 메뉴
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveMenu(id); 
    setIsOpen(false); 
  };

  return (
    <nav className={isOpen ? "open" : ""}>
      <div className="mobile-toggle">
        <button
          onClick={handleClick}
          className={isOpen ? "open" : ""}
          aria-label="menu toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`menu-wrap ${isOpen ? "open" : ""}`}>
        <ul>
          <li
            className={activeMenu === "intro" ? "active" : ""}
            onClick={() => handleScroll("intro")}
          >
            Intro
          </li>
          <li
            className={activeMenu === "about" ? "active" : ""}
            onClick={() => handleScroll("about")}
          >
            About
          </li>
          <li
            className={activeMenu === "skills" ? "active" : ""}
            onClick={() => handleScroll("skills")}
          >
            Skills
          </li>
          <li
            className={activeMenu === "projects" ? "active" : ""}
            onClick={() => handleScroll("projects")}
          >
            Projects
          </li>
          <li
            className={activeMenu === "contact" ? "active" : ""}
            onClick={() => handleScroll("contact")}
          >
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Gnb;
