import SkillsCard from "../ui/SkillsCard";
import "./SkillPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  const skillsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#skills", {
        opacity: 0,
        y: 60,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
          once: true,
        },
      });

      tl.to("#skills", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills-zip">
        <div className="skills-txt">
          <h3>Skills</h3>
          <p>작업 과정에서 실제로 사용해 온 기술들을 중심으로 정리했습니다.</p>
        </div>
        <SkillsCard />
      </div>
    </section>
  );
};

export default SkillsPage;
