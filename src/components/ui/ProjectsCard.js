import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsDetailPage from "../../pages/ProjectsDetailPage";
import "./ProjectsCard.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

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

  // GSAP ScrollTrigger로 스크롤 애니메이션 추가
  useEffect(() => {
    const cards = document.querySelectorAll(
      ".project-card .pr-card li.card-bg",
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-card",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects]);

  const handleClick = (id) => {
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

  return (
    <div className="project-card">
      {/* 일반 카드 */}
      <ul className="pr-card">
        {projects.map((item) => (
          <li
            key={item.id}
            className={`card-bg ${
              visibleProjects.includes(item) ? "visible" : ""
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
                <p className="type2">{item.type2}</p>

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
