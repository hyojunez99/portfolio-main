import SkillsCard from "../ui/SkillsCard";
import "./SkillPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  const skillsRef = useRef(null);

  useLayoutEffect(() => {
    const section = skillsRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const line = section.querySelector(".skills-top-title .about-sec-line");
      const title = section.querySelector(".skills-top-title h3");
      const desc = section.querySelector(".skills-desc");
      const cards = section.querySelectorAll(".skills-item .card");

      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(desc, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(line, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "+=0.2",
        )
        .to(
          desc,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills-sec">
        <div className="skills-top-title">
          <h3>Skills</h3>
          <div className="about-sec-line"></div>

          <p className="skills-desc">
            프로젝트 구현과 협업 과정에서 사용한 기술 스택입니다.
          </p>
        </div>

        <SkillsCard />
      </div>
    </section>
  );
};

export default SkillsPage;
