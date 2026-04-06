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
      <div
        className="intro-panel intro-left"
        onMouseEnter={() => animateHover(true, "left")}
        onMouseLeave={() => animateHover(false)}
        onClick={() => handleClick("left")}
      >
        <div className="overlay" />
        <div className="content">
          <h1 className="intro-title">PROJECTS</h1>
          <p>경험을 통해 쌓아온 프로젝트 결과물</p>
        </div>
      </div>

      <div
        className="intro-panel intro-right"
        onMouseEnter={() => animateHover(true, "right")}
        onMouseLeave={() => animateHover(false)}
        onClick={() => handleClick("right")}
      >
        <div className="overlay" />
        <div className="content">
          <h1 className="intro-title">ABOUT ME</h1>
          <p>사용자의 경험을 설계하는 퍼블리셔 이효준입니다</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
