import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import skillsData from "../assets/data/Skills.json";
import "./Skills.scss";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SkillCard = ({ category }) => {
  const getImagePath = (icon) => {
    try {
      return require(`../assets/images/icons/${icon}`);
    } catch (e) {
      return "https://placehold.co/100x100?text=NO+IMAGE";
    }
  };

  return (
    <div className="skill-category-card">
      <h3 className="category-title">{category.category}</h3>
      <span className="chalk-divider"></span>
      <ul className="skill-items-list">
        {category.items.map((item, idx) => (
          <li key={idx} className="skill-item-box">
            <img
              src={getImagePath(item.icon)}
              alt={item.name}
              className="skill-icon"
              onError={(e) => {
                e.target.src = "https://placehold.co/100x100?text=ERROR";
              }}
            />
            <span className="skill-name">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-title-area",
          start: "top 80%",
        },
      });

      titleTl
        .to(".sub-title", {
          duration: 0.6,
          text: { value: "03. CORE TECH STACK" },
        })
        .to(".main-title", {
          duration: 1.5,
          text: { value: "보유 기술 및 협업 툴" },
        });

      gsap.from(".skill-category-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".skills-grid-board",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container container">
        <div className="section-title-area">
          <p className="sub-title"></p>
          <h2 className="main-title"></h2>
        </div>

        <div className="skills-grid-board">
          {skillsData.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
