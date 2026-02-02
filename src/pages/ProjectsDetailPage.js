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
        <ul className="links-list">
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
              <a
                href={`${process.env.PUBLIC_URL}/pdf/${project.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 기획 / 결과 PDF
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="table">
        <div className="pro-sec">
          <p className="title">프로젝트 개요</p>

          <div className="table-top">
            <div className="row">
              <h4 className="label">진행 기간</h4>
              <p className="value">{project.duration}</p>
            </div>

            <div className="row">
              <h4 className="label">참여 인원</h4>
              <p className="value">{project.teamSize}</p>
            </div>

            {project.mainFeatures && (
              <div className="row">
                <h4 className="label">주요 기능</h4>
                <ul className="value">
                  {project.mainFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.responsibilities?.length > 0 && (
              <div className="row">
                <h4 className="label">담당 역할</h4>
                <ul className="value">
                  {project.responsibilities.map((role, idx) => (
                    <li key={idx}>{role}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {project.techStack && (
          <div className="stack">
            <p className="title">기술 스택</p>
            <div className="stack-top">
              {typeof project.techStack === "object" &&
              !Array.isArray(project.techStack) ? (
                Object.entries(project.techStack).map(([category, items]) => (
                  <div className="stack-group" key={category}>
                    <h4 className="stack-category">{category}</h4>
                    <ul className="stack-tags">
                      {(Array.isArray(items) ? items : [items]).map(
                        (tech, idx) => (
                          <li className="stack-tag" key={idx}>
                            {tech}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="stack-tags">
                  {project.techStack.map((tech, idx) => (
                    <li className="stack-tag" key={idx}>
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {project.troubleShooting && project.troubleShooting.length > 0 && (
          <div className="troubleShooting">
            <p className="title">개발 이슈</p>
            {project.troubleShooting.map((ts, idx) => (
              <div key={idx} className="issue">
                <p>
                  <strong className="problem">문제 : </strong>{" "}
                  {ts.problem || ts.issue}
                </p>
                <p>
                  <strong className="solve">└ 해결 : </strong> {ts.solution}
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
              project.insights.map((insight, idx) => (
                <div className="insight-item" key={idx}>
                  <p className="feel">{insight}</p>
                </div>
              ))
            ) : (
              <div className="insight-item">
                <p className="feel">{project.insights}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsDetailPage;
