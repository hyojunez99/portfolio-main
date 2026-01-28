import { useState, useLayoutEffect, useRef } from "react";
import ProjectsCard from "../ui/ProjectsCard";
import ProjectsDate from "../../assets/data/Projects.json";
import "./ProjectsPage.scss";
import { FaCaretDown } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Portfolio",
  "Team",
  "Clone",
  "Personal",
  "Practical",
];

const ProjectsPage = () => {
  const sectionRef = useRef(null);
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const filteredProjects =
    category === "All"
      ? ProjectsDate
      : ProjectsDate.filter((item) => item.type === category);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".pro-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".pro-pcmenu, .pro-mbmenu", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const handleSelect = (item) => {
    setCategory(item);
    setOpen(false);
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="project-zip">
        <div className="pro-title">
          <h3>Projects</h3>
          <p>구현 과정과 결과 모두에 책임을 두고 작업한 기록입니다.</p>
        </div>
        {/* PC */}
        <div className="pro-pcmenu">
          <ul>
            {categories.map((item) => (
              <li
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile */}
        <div className="pro-mbmenu">
          <p className="label" onClick={() => setOpen(!open)}>
            {category}
            <span className={`arrow ${open ? "open" : ""}`}>
              <FaCaretDown />
            </span>
          </p>
          <ul className={`dropdown ${open ? "open" : ""}`}>
            {categories.map((item) => (
              <li
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ProjectsCard projects={filteredProjects} />
      </div>
    </section>
  );
};

export default ProjectsPage;
