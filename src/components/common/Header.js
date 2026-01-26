import { useState } from "react";
import Gnb from "./Gnb";
import "./Header.scss";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("intro"); // 기본 활성화 메뉴

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveMenu(id);
    }
  };

  return (
    <header>
      <div className="header-desktop">
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
      <Gnb />
    </header>
  );
};

export default Header;
