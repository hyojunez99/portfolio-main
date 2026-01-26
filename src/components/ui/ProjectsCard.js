import { useEffect, useState } from "react";
import ProjectsDetailPage from "../../pages/ProjectsDetailPage";
import "./ProjectsCard.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

const ProjectsCard = ({ projects }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  // transition 적용
  useEffect(() => {
    setVisibleProjects([]);
    const timeout = setTimeout(() => {
      setVisibleProjects(projects);
    }, 50);
    return () => clearTimeout(timeout);
  }, [projects]);

  const handleClick = (id) => {
    const numId = Number(id);
    if ([10, 11, 12].includes(numId)) return; // 모달 열리지 않게
    setSelectedId(id);
  };

  // 닫힘 애니메이션 처리
  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, 250);
  };

  // 모달 열리면 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedId]);

  // 일반 프로젝트와 special 프로젝트 분리
  const normalProjects = projects.filter((p) => ![10, 11, 12].includes(p.id));

  return (
    <div className="project-card">
      {/* 일반 카드 */}
      <ul className="pr-card">
        {normalProjects.map((item) => (
          <li
            key={item.id}
            className={`card-bg ${visibleProjects.includes(item) ? "visible" : ""}`}
            onClick={() => handleClick(item.id)}
          >
            <div
              className={`box-top ${String(item.id) === "8" ? "different-card" : ""}`}
            >
              {item.image && (
                <div className="card-img1">
                  <img
                    src={require(`../../assets/images/${item.image}`)}
                    alt={item.proname}
                  />
                </div>
              )}
              {item.image2 && (
                <div className="card-img2">
                  <img
                    src={require(`../../assets/images/${item.image2}`)}
                    alt={item.proname}
                  />
                </div>
              )}
            </div>

            <div className="txt-box">
              <div className="txt-top">
                <p className="proname">{item.proname}</p>
                <IoIosArrowForward className="detail" />
              </div>
              <div className="txt-mid">
                <p className="day">{item.day}</p>
                <p className="type2">{item.type2}</p>
              </div>
              <div className="prosub">
                <p>{item.prosub}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedId && (
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
        </>
      )}
    </div>
  );
};

export default ProjectsCard;
