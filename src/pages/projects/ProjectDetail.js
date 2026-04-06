import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ImGithub, ImLink, ImFilePdf } from "react-icons/im";
import data from "../../assets/data/ProjectsDetail.json";
import "./ProjectDetail.scss";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const contentRef = useRef(null);

  const backgroundLocation = loc.state?.background;

  const project = data.find((el) => el.id === id);
  const currentIndex = data.findIndex((el) => el.id === id);
  const prevProject = data[currentIndex - 1];
  const nextProject = data[currentIndex + 1];

  const handleClose = () => {
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      navigate("/projects", { replace: true });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [id]);

  if (!project) return null;

  const highlightText = (text, highlights) => {
    if (!highlights) return text;
    let result = text;
    highlights.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(regex, `<span class="highlight">$1</span>`);
    });
    return result;
  };

  return (
    <section id="modal" onClick={handleClose}>
      <div
        className="modal-content"
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{ overflowY: "auto", maxHeight: "90vh" }}
      >
        <button className="close" onClick={handleClose}>
          ✕
        </button>

        <h2>{project.proname}</h2>
        <p className="summary">{project.summary}</p>

        <div className="info">
          <p>
            <strong>진행 기간</strong> {project.duration}
          </p>
          <p>
            <strong>참여 인원</strong> {project.teamSize}
          </p>
          <p>
            <strong>프로젝트 유형</strong> {project.projectType}
          </p>
        </div>

        {/* 링크 */}
        <div className="links">
          {project.deploy && (
            <a href={project.deploy} target="_blank" rel="noreferrer">
              <span>
                <ImLink />
              </span>
              사이트 보기
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              <span>
                <ImGithub />
              </span>
              GitHub
            </a>
          )}
          {project.pdf && (
            <a href={`/pdf/${project.pdf}`} target="_blank" rel="noreferrer">
              <span>
                <ImFilePdf />
              </span>
              PDF
            </a>
          )}
        </div>

        {/* 주요 기능 */}
        <div className="section">
          <h3>주요 기능</h3>
          <ul>
            {project.mainFeatures?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 트러블슈팅 */}
        {project.troubleShooting?.length > 0 && (
          <div className="section">
            <h3>문제 해결 과정</h3>
            {project.troubleShooting.map((item, i) => (
              <div key={i} className="trouble-item">
                <p className="problem">
                  <strong>문제 상황 :</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.problem, item.highlights),
                    }}
                  />
                </p>
                <p className="solution">
                  <strong>해결 방법 :</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.solution, item.highlights),
                    }}
                  />
                </p>

                {item.highlights && (
                  <div className="highlight-tags">
                    {item.highlights.map((tag, idx) => (
                      <span key={idx}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 인사이트 */}
        {project.insights && (
          <div className="section">
            <h3>회고 및 인사이트</h3>
            {Array.isArray(project.insights) ? (
              <ul>
                {project.insights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{project.insights}</p>
            )}
          </div>
        )}

        {/* 이전/다음 네비게이션 */}
        <div className="modal-nav">
          {prevProject && (
            <button
              onClick={() =>
                navigate(`/projects/${prevProject.id}`, {
                  state: { background: backgroundLocation },
                  replace: true,
                })
              }
            >
              ← 이전 프로젝트
            </button>
          )}

          {nextProject && (
            <button
              onClick={() =>
                navigate(`/projects/${nextProject.id}`, {
                  state: { background: backgroundLocation },
                  replace: true,
                })
              }
            >
              다음 프로젝트 →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
