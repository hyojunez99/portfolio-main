import { useEffect, useState } from "react";
import ProjectsDetailPage from "../../pages/ProjectsDetailPage";
import "./ProjectsCard.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { createPortal } from "react-dom";

const ProjectsCard = ({ projects }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  // 필터 변경 시 transition
  useEffect(() => {
    setVisibleProjects([]);

    const timeout = setTimeout(() => {
      setVisibleProjects(projects);
    }, 50);

    return () => clearTimeout(timeout);
  }, [projects]);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, 250);
  };

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedId]);

  return (
    <div className="project-card">
      <ul className="pr-card">
        {projects.map((item) => (
          <li
            key={item.id}
            className={`card-bg ${
              visibleProjects.some((p) => p.id === item.id) ? "visible" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            <div
              className={`box-top ${
                String(item.id) === "8" ? "different-card" : ""
              }`}
            >
              {item.image && (
                <div className="card-img1">
                  <img
                    className="card-img"
                    src={require(`../../assets/images/${item.image}`)}
                    alt={item.proname}
                  />
                </div>
              )}

              {item.image2 && (
                <div className="card-img2">
                  <img
                    className="card-img"
                    src={require(`../../assets/images/${item.image2}`)}
                    alt={item.proname}
                  />
                </div>
              )}
            </div>

            <div className="txt-box">
              <div className="txt-top">
                <p
                  className={`type2 ${
                    item.type2 === "개인 프로젝트" ? "solo" : "team"
                  }`}
                >
                  {item.type2}
                </p>

                <IoIosArrowForward className="detail" />
                <p className="pc-detail">더보기</p>
              </div>

              <div className="txt-mid">
                <p className="proname">{item.proname}</p>

                <div className="skills">
                  {item.skills.map((skill, index) => (
                    <img
                      key={index}
                      className="skill-icon"
                      src={require(`../../assets/icons/${skill.image}`)}
                      alt=""
                    />
                  ))}
                </div>
              </div>

              <div className="prosub">
                <p>{item.prosub}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedId &&
        createPortal(
          <>
            <div
              className={`modal-backdrop ${isClosing ? "closing" : ""}`}
              onClick={handleClose}
            />

            <div className={`project-modal ${isClosing ? "closing" : "open"}`}>
              <div className="modal-content">
                <div className="btn">
                  <IoIosClose className="close-btn" onClick={handleClose} />
                </div>

                <ProjectsDetailPage id={selectedId} />
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};

export default ProjectsCard;