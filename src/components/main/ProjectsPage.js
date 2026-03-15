import { useState, useLayoutEffect, useRef, useMemo } from "react";
import ProjectsCard from "../ui/ProjectsCard";
import ProjectsData from "../../assets/data/Projects.json";
import "./ProjectsPage.scss";
import { FaCaretDown } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
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
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (category === "All") return ProjectsData;
    return ProjectsData.filter((item) => item.type === category);
  }, [category]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      const line = section.querySelector(".pro-line");
      const title = section.querySelector(".pro-title h3");
      const desc = section.querySelector(".pro-desc");
      const menus = section.querySelectorAll(".pro-pcmenu, .pro-mbmenu");

      const cards = section.querySelectorAll(".card-bg");

      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(desc, { opacity: 0, y: 20 });
      gsap.set(menus, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(line, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "+=0.2",
        )
        .to(
          desc,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          menus,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setIsOpen(false);
  };

  return (
    <section id="projects" ref={sectionRef}>
      <div className="project-zip">
        <div className="pro-title">
          <h3>Projects</h3>
          <div className="pro-line" />

          <p className="pro-desc">
            사용자 경험을 고려해 구현한 다양한 웹 퍼블리싱 프로젝트입니다.
          </p>
        </div>

        <div className="pro-pcmenu">
          <ul>
            {CATEGORIES.map((item) => (
              <li
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => handleCategoryChange(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pro-mbmenu">
          <button
            type="button"
            className="label"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {category}
            <span className={`arrow ${isOpen ? "open" : ""}`}>
              <FaCaretDown />
            </span>
          </button>

          <ul className={`dropdown ${isOpen ? "open" : ""}`}>
            {CATEGORIES.map((item) => (
              <li
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => handleCategoryChange(item)}
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
