import "./About.scss";
import Skills from "../Skills/Skills";
import { useNavigate } from "react-router-dom";
import { FiGithub, FiSend, FiFileText } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useAboutAnimation } from "../../hooks/useAboutAnimation";

const About = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);
  useAboutAnimation(containerRef);

  const scrollToFooter = () => {
    const footerSection = document.getElementById("contact");
    if (footerSection) {
      footerSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const nameInput = footerSection.querySelector('input[name="name"]');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 800);
      }
    }
  };

  const openResume = () => {
    window.open("/pdf/resume.pdf", "_blank");
  };

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
    <section id="about" ref={containerRef}>
      <div className="about">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 돌아가기
        </button>

        <div className="about-wrap">
          <div className="about-left">
            <span className="about-badge">새로운 도전을 기다리고 있습니다</span>

            <h1 className="about-title">About Me</h1>

            <div className="about-intro">
              <h2>
                디자인의 의도를 읽고,
                <br />
                코드로 최적의 경험을 설계하는 웹 퍼블리셔입니다.
              </h2>

              <div className="about-desc">
                <p>
                  단순히 화면을 그려내는 것에 그치지 않고,
                  <strong>
                    {" "}
                    사용자의 흐름과 인터랙션의 목적을 깊게 고민하며 UI
                  </strong>
                  를 구현합니다.
                </p>

                <p>
                  웹 표준과 접근성을 준수한 구조적인 마크업은 물론,
                  <strong> SCSS를 활용한 체계적인 스타일 설계</strong>로
                  유지보수가 용이한 코드를 지향합니다.
                </p>

                <p>
                  문제를 발견하면 원인을 끝까지 분석하고 개선하는 과정에서
                  즐거움을 느낍니다. 이러한 집요함이 서비스의 완성도를 결정짓는
                  핵심이라고 믿습니다.
                </p>

                <p>
                  에이전시와 스타트업 환경에서 팀원들과 원활하게 소통하며,
                  기술적 한계를 넘어 더 나은 결과물을 만들어내는 파트너가
                  되겠습니다.
                </p>
              </div>
            </div>

            <div className="about-actions">
              <button className="btn primary" onClick={scrollToFooter}>
                <FiSend /> 문의하기
              </button>
              <button className="btn secondary" onClick={openResume}>
                <FiFileText /> 이력서 보기
              </button>
            </div>

            <div className="about-social">
              <a
                href="https://github.com/hyojunez99"
                target="_blank"
                rel="noreferrer"
                title="Github"
              >
                <FiGithub />
              </a>
            </div>
          </div>

          <div className="about-right">
            <div className="about-section">
              <div className="skills-wrapper">
                <Skills />
              </div>
            </div>

            <div className="about-section">
              <h3>Experience</h3>

              <div className="about-timeline">
                <div className="about-item">
                  <span className="date">2025.08 - 2026.01</span>
                  <h4>UI/UX 웹 퍼블리싱 전문 과정 수료</h4>
                  <p>
                    React 기반의 컴포넌트 설계, JSON 데이터 연동, GSAP를 활용한
                    동적 인터랙션 구현 및 고도화된 반응형 웹 구축 역량을
                    습득했습니다.
                  </p>
                </div>

                <div className="about-item">
                  <span className="date">2023.03 - 2024.03</span>
                  <h4>현장 데이터 분석 및 협업 프로세스 경험</h4>
                  <p>
                    서울성모병원 작업환경측정 업무를 통해 복잡한 데이터를
                    체계화하고, 다양한 이해관계자와 협업하며 문제를 해결하는
                    커뮤니케이션 능력을 길렀습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default About;
