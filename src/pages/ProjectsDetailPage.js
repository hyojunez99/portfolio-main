import DetailData from "../assets/data/ProjectsDetail.json";
import "./ProjectsDetailPage.scss";

const ProjectsDetailPage = ({ id }) => {
  // id가 일치하는 프로젝트 찾기
  const project = DetailData.find((item) => String(item.id) === id);

  if (!project) {
    return (
      <section id="projectsdetail">해당 프로젝트를 찾을 수 없습니다.</section>
    );
  }

  return (
    <section id="projectsdetail">
      <div className="top">
        <h1 className="project-name">{project.proname}</h1>
        <p className="summary">{project.summary}</p>
      </div>

      <div className="links">
        <ul>
          {project.deploy && (
            <li>
              <a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 배포 사이트
              </a>
            </li>
          )}
          {project.github && (
            <li>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                💻 GitHub 저장소
              </a>
            </li>
          )}
          {project.pdf && (
            <li>
              <a href={project.pdf} target="_blank" rel="noopener noreferrer">
                📄 기획 / 결과 PDF
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="day">
        <p className="title">진행 기간</p>
        <p>{project.duration}</p>
      </div>
      {project.teamSize && (
        <p className="team">
          <p className="title">참여 인원</p>
          <p>{project.teamSize}</p>
        </p>
      )}
      {project.mainFeatures && (
        <div className="main">
          <p className="title">주요 기능</p>
          <ul>
            {project.mainFeatures.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="role">
          <p className="title">담당 역할</p>
          <ul>
            {project.responsibilities.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </div>
      )}

      {project.techStack && (
        <div className="stack">
          <p className="title">기술 스택</p>
          {typeof project.techStack === "object" &&
          !Array.isArray(project.techStack) ? (
            <ul>
              {Object.entries(project.techStack).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {Array.isArray(value) ? value.join(", ") : value}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {project.techStack.map((tech, idx) => (
                <li key={idx}>{tech}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {project.troubleShooting && project.troubleShooting.length > 0 && (
        <div className="troubleShooting">
          <p className="title">개발 이슈</p>
          {project.troubleShooting.map((ts, idx) => (
            <div key={idx} className="issue">
              <p>
                <strong>문제 : </strong> {ts.problem || ts.issue}
              </p>
              <p>
                <strong>└ 해결 : </strong> {ts.solution}
              </p>
              {ts.result && (
                <p>
                  <strong> └ 결과 : </strong> {ts.result}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {project.insights && (
        <div className="insights">
          <p className="title">개발 후 느낀점</p>
          {Array.isArray(project.insights) ? (
            project.insights.map((insight, idx) => <p key={idx}>{insight}</p>)
          ) : (
            <p>{project.insights}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectsDetailPage;
