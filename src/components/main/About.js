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
            소통과 구조를 바탕으로 <br />
            완성도를 책임지는 웹 퍼블리셔입니다.
          </h1>
        </div>

        <ul className="about-card">
          <li>
            <h3>소통과 협업</h3>
            <p>
              혼자 해결하려 하기보다 상황을 공유하고 의견을 나누며 더 나은
              방향을 찾습니다. 팀 프로젝트 경험을 통해 기획 의도를 이해하고,
              협업을 고려한 퍼블리싱의 중요성을 배웠습니다.
            </p>
          </li>
          <li>
            <h3>구조 중심의 구현</h3>
            <p>
              화면의 완성도는 보이지 않는 코드 구조에서 시작된다고 생각합니다.
              의미 있는 마크업과 가독성 있는 코드로 유지보수와 확장성을 고려한
              결과물을 지향합니다.
            </p>
          </li>
          <li>
            <h3>책임감 있는 실행력</h3>
            <p>
              계획을 세우고 끝까지 실행하는 태도를 중요하게 생각합니다. 작은
              오류도 놓치지 않으며, 안정적으로 동작할 때까지 점검하는 습관을
              가지고 있습니다.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
