import SkillsDate from "../../assets/data/Skills.json";
import "./SkillsCard.scss";

const SkillsCard = () => {
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
