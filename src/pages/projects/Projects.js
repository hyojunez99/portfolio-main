import "./Projects.scss";
import data from "../../assets/data/Projects.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useProjectsAnimation } from "../../hooks/useProjectsAnimation";

const Projects = () => {
  const containerRef = useRef(null);
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);
  useProjectsAnimation(containerRef);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="projects" ref={containerRef}>
      <div className="projects-inner">
        <div className="projects-header">
          {/* 뒤로가기 */}
          <button
            className="back-btn"
            onClick={() => navigate("/", { replace: true })}
          >
            ← 돌아가기
          </button>
          <h1>Projects</h1>
          <p>사용자 경험과 구조 설계를 중심으로 완성한 작업들입니다.</p>
        </div>

        {data
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .slice(0, 4)
          .map((item, index) => (
            <div
              className={`project-item ${index % 2 !== 0 ? "reverse" : ""}`}
              key={item.id}
            >
              <div
                className={`project-left ${!item.image2 ? "is-mobile-only" : ""}`}
              >
                {item.image && (
                  <img
                    className="mobile-img"
                    src={require(`../../assets/images/${item.image}`)}
                    alt={item.proname}
                  />
                )}

                {item.image2 && (
                  <img
                    className="desktop-img"
                    src={require(`../../assets/images/${item.image2}`)}
                    alt={item.proname}
                  />
                )}
              </div>

              {/* 텍스트 섹션 */}
              <div className="project-right">
                <span className="number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="type">{item.type2}</p>
                <h2>{item.proname}</h2>
                <p className="name">{item.prosub}</p>

                {item.day && <p className="day">{item.day}</p>}

                {item.keywords && (
                  <div className="keywords">
                    {item.keywords.map((kw, i) => (
                      <span key={i} className="keyword-tag">
                        #{kw.replace(/\s+/g, "_")}
                      </span>
                    ))}
                  </div>
                )}

                <div className="skills">
                  {item.skills?.map((skill, i) => (
                    <img
                      key={i}
                      src={require(`../../assets/icons/${skill.image}`)}
                      alt="skill"
                    />
                  ))}
                </div>

                <div className="button">
                  <Link
                    to={`/projects/${item.id}`}
                    state={{ background: currentLocation }}
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="more-btn">
        <Link to="/projects/all">전체 프로젝트 보기 →</Link>
      </div>

      {/* Top 버튼 */}
      {showTop && (
        <button
          className="top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </section>
  );
};

export default Projects;
