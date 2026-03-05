import { useState, useEffect } from "react";
import Gnb from "./Gnb";
import "./Header.scss";

const SECTION_IDS = ["intro", "about", "skills", "projects", "contact"];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("intro");

  const handleScroll = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

      const offsetTop =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      setActiveMenu(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenu(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-80px 0px -40% 0px", // 헤더 높이 반영
        threshold: 0,
      }
    );

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <div className="header-desktop">
        <ul>
          {SECTION_IDS.map((id) => (
            <li
              key={id}
              className={activeMenu === id ? "active" : ""}
              onClick={() => handleScroll(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <Gnb />
    </header>
  );
};

export default Header;