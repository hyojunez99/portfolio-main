import "./Skills.scss";
import data from "../../assets/data/Skills.json";
import { useSkillsAnimation } from "../../hooks/useSkillsAnimation";
import { useRef } from "react";

const Skills = () => {
  const skillsRef = useRef(null);
  useSkillsAnimation(skillsRef);

  return (
    <section id="skills" ref={skillsRef}>
      <h1>Skills & Expertise</h1>
      {data.map((group) => (
        <div className="skill-group" key={group.id}>
          <h3>{group.category}</h3>

          <div className="skill-items">
            {group.items.map((skill, i) => (
              <div className="skill-card" key={i}>
                <div className="icon">
                  <img
                    src={require(`../../assets/icons/${skill.icon}`)}
                    alt={skill.name}
                  />
                </div>

                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
