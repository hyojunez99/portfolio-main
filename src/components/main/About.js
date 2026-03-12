import "./About.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      const section = aboutRef.current;

      const line = section.querySelector(".about-sec-line");
      const smallTitle = section.querySelector(".about-top-title h3");
      const mainTitle = section.querySelector(".about-title h1");
      const cards = section.querySelectorAll(".about-card li");

      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(smallTitle, { opacity: 0, y: 30 });
      gsap.set(mainTitle, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(line, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          smallTitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "+=0.2",
        )
        .to(
          mainTitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            stagger: 0.25,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef}>
      <div className="about-sec">
        <div className="about-top-title">
          <h3>About</h3>
          <div className="about-sec-line"></div>
        </div>

        <div className="about-title">
          <h1>
            구조적인 마크업과 안정적인 UI 구현을
            <br />
            지향하는 웹 퍼블리셔입니다.
          </h1>
        </div>

        <ul className="about-card">
          <li>
            <h3>협업과 커뮤니케이션</h3>
            <p>
              기획 의도와 디자인을 정확하게 이해하고 구현하는 과정을 중요하게
              생각합니다. 팀 프로젝트를 통해 작업 내용을 공유하고 의견을
              조율하며 협업하는 퍼블리싱 과정을 경험했습니다.
            </p>
          </li>

          <li>
            <h3>구조적인 퍼블리싱</h3>
            <p>
              UI의 완성도는 보이지 않는 코드 구조에서 시작된다고 생각합니다.
              의미 있는 마크업과 가독성 있는 스타일 구조를 통해 유지보수와
              확장성을 고려한 퍼블리싱을 지향합니다.
            </p>
          </li>

          <li>
            <h3>UI 완성도</h3>
            <p>
              작은 인터랙션과 세부 동작까지 점검하며 완성도 높은 UI를 구현하는
              것을 중요하게 생각합니다. 다양한 프로젝트를 통해 사용자 경험을
              고려한 인터페이스를 구현해왔습니다.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
