import { useState } from "react";
import ProjectsCard from "../ui/ProjectsCard";
import ProjectsDate from "../../assets/data/Projects.json";
import "./ProjectsPage.scss";
import { FaCaretDown } from "react-icons/fa";

const categories = [
  "All",
  "Portfolio",
  "Team",
  "Clone",
  "Personal",
  "Practical",
];

const ProjectsPage = () => {
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false); // 모바일 드롭다운

  // 카테고리 필터
  const filteredProjects =
    category === "All"
      ? ProjectsDate
      : ProjectsDate.filter((item) => item.type === category);

  const handleSelect = (item) => {
    setCategory(item);
    setOpen(false);
  };

  return (
    <section id="projects">
      <div className="project-zip">
        <div className="pro-title">
          <h3>Projects</h3>
          <p>다양한 프로젝트를 통해 쌓아온 경험과 결과물들입니다</p>
        </div>
        {/* PC 카테고리 */}
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
        {/* 모바일 카테고리 */}
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

        {/* 카드 */}
        <ProjectsCard projects={filteredProjects} />
      </div>
    </section>
  );
};

export default ProjectsPage;
