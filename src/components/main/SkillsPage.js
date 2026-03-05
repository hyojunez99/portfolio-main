import SkillsCard from "../ui/SkillsCard";
import "./SkillPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  const skillsRef = useRef(null);

  useLayoutEffect(() => {
    if (!skillsRef.current) return;

    const ctx = gsap.context(() => {
      const section = skillsRef.current;

      const line = section.querySelector(".skills-top-title .about-sec-line");
      const title = section.querySelector(".skills-top-title h3");
      const cards = section.querySelectorAll(".skills-item .card"); // 🔥 수정

      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      gsap.set(title, { opacity: 0, y: 30 });
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
          "+=0.2"
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
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
        </div>
        <SkillsCard />
      </div>
    </section>
  );
};

export default SkillsPage;