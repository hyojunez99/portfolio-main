import SkillsDate from "../../assets/data/Skills.json";
import "./SkillsCard.scss";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsCard = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 카드 전체 컨테이너
      gsap.from(".skills-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-card",
          start: "top 75%",
          once: true,
        },
      });

      // 카드 개별 등장
      gsap.from(".skills-item", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".skills-card",
          start: "top 70%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="skills-card">
      <ul>
        {SkillsDate.map((item, idx) => {
          return (
            <li key={idx} className="skills-item">
              <div className="skill-icon">
                <img
                  src={require(`../../assets/icons/${item.image}`)}
                  alt={item.category}
                />
              </div>

              <p className="skill-category">{item.category}</p>

              <ul className="skill-tags">
                {Object.keys(item)
                  .filter((key) => key.startsWith("sub") && item[key])
                  .map((subKey) => (
                    <li key={subKey}>{item[subKey]}</li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillsCard;
