import "./Intro.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIntroAnimation } from "../../hooks/useIntroAnimation";

const Intro = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { animateHover, animateClick } = useIntroAnimation(containerRef);

  const handleClick = (side) => {
    animateClick(side, () => {
      navigate(side === "left" ? "/projects" : "/about");
    });
  };

  return (
    <section id="intro" ref={containerRef}>
      <div className="mouse-light" />

      <div className="floating-track floating-track-top">
        <div className="floating-text">
          INTERACTION · UX · MOTION · FRONTEND · PUBLISHING · INTERACTION · UX ·
          MOTION · FRONTEND · PUBLISHING ·
        </div>
      </div>

      <div className="floating-track floating-track-bottom">
        <div className="floating-text">
          USER EXPERIENCE · CREATIVE UI · GSAP · REACT · SCROLL MOTION · USER
          EXPERIENCE · CREATIVE UI · GSAP · REACT · SCROLL MOTION ·
        </div>
      </div>

      <div
        className="intro-panel intro-left"
        onMouseEnter={() => animateHover(true, "left")}
        onMouseLeave={() => animateHover(false)}
        onClick={() => handleClick("left")}
      >
        <div className="overlay" />

        <div className="bg-text">WORKS</div>

        <div className="content">
          <span className="intro-label">PORTFOLIO</span>

          <h1 className="intro-title">PROJECTS</h1>

          <p>사용자 경험을 중심으로 설계한 작업들</p>

          <div className="meta">
            <span>Motion & Experience</span>

            <span>사용자 중심 인터랙션</span>
          </div>
        </div>
      </div>

      <div
        className="intro-panel intro-right"
        onMouseEnter={() => animateHover(true, "right")}
        onMouseLeave={() => animateHover(false)}
        onClick={() => handleClick("right")}
      >
        <div className="overlay" />

        <div className="bg-text">ABOUT</div>

        <div className="content">
          <span className="intro-label">PROFILE</span>

          <h1 className="intro-title">ABOUT ME</h1>

          <p>경험과 흐름을 설계하는 퍼블리셔</p>

          <div className="meta">
            <span>UX Driven Publisher</span>

            <span>경험 중심의 인터페이스</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
