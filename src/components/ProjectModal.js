import { useEffect } from "react";
import React from "react";
import projectsDetailData from "../assets/data/ProjectsDetail.json";
import "./ProjectModal.scss";

const ProjectModal = ({ projectId, onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!projectId) return null;

  const detail = projectsDetailData.find(
    (item) => String(item.id) === String(projectId),
  );

  const getImagePath = (imgName) => {
    return require(`../assets/images/${imgName}`);
  };

  if (!detail) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content chalkboard-popup"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <p className="error-msg">프로젝트 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const detailImages = Array.isArray(detail.images?.detail)
    ? detail.images.detail
    : detail.images?.detail
      ? [detail.images.detail]
      : [];
  console.log(detailImages);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content chalkboard-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <span className="project-badge">
            {detail.projectType || "개인 프로젝트"}
          </span>
          <h2 className="project-title">{detail.proname}</h2>
          <p className="project-duration">📅 {detail.duration}</p>
        </div>

        <div className="modal-body-grid">
          <div className="visual-preview-area">
            <div className="preview-screen-list">
              {detailImages.map((imgName, index) => (
                <div key={index} className="image-box">
                  <img
                    src={
                      getImagePath(imgName) ||
                      "https://placehold.co/600x450/141e24/ffffff?text=NO+IMAGE"
                    }
                    alt={`${detail.proname} 상세화면 ${index + 1}`}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x450/141e24/ffffff?text=ERROR";
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="outlink-group">
              {detail.deploy && (
                <a
                  href={detail.deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn live"
                >
                  LIVE VIEW 🔗
                </a>
              )}
              {detail.github && (
                <a
                  href={detail.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn git"
                >
                  GITHUB 📂
                </a>
              )}
              {detail.pdf && (
                <a
                  href={`${process.env.PUBLIC_URL}/pdf/${detail.pdf}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-btn pdf"
                >
                  PDF VIEW 📄
                </a>
              )}
            </div>
          </div>

          <div className="info-spec-area">
            <div className="spec-section">
              <h3>SUMMARY (요약)</h3>
              <p className="summary-text">{detail.summary}</p>
            </div>

            {detail.mainFeatures && (
              <div className="spec-section">
                <h3>MAIN FEATURES (주요 특징)</h3>
                <ul>
                  {detail.mainFeatures.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {detail.responsibilities && (
              <div className="spec-section">
                <h3>MY RESPONSIBILITIES (기여한 점)</h3>
                <ul>
                  {detail.responsibilities.map((r, i) => (
                    <li key={i}>▪ {r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="spec-section">
              <h3>TECH STACK (기술 스택)</h3>
              <div className="tech-stack-tags">
                {detail.techStack?.Frontend?.map((t, i) => (
                  <span key={i} className="stack-badge FE">
                    {t}
                  </span>
                ))}
                {detail.techStack?.Data?.map((t, i) => (
                  <span key={i} className="stack-badge DT">
                    {t}
                  </span>
                ))}
                {detail.techStack?.Tools?.map((t, i) => (
                  <span key={i} className="stack-badge TL">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {detail.troubleShooting && (
              <div className="spec-section troubleshooting-section">
                <h3>TROUBLE SHOOTING (문제 해결)</h3>
                {detail.troubleShooting.map((ts, i) => (
                  <div key={i} className="ts-card">
                    <p className="ts-prob">
                      <strong>🚨 Problem:</strong> {ts.problem}
                    </p>
                    <p className="ts-sol">
                      <strong>💡 Solution:</strong> {ts.solution}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
