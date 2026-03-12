import SkillsData from "../../assets/data/Skills.json";
import "./SkillsCard.scss";

const SkillsCard = () => {
  return (
    <div className="skills-card">
      <ul className="skills-item">
        {SkillsData.map((categoryItem) => (
          <li key={categoryItem.id} className="card">
            {/* 카테고리 */}
            <h3 className="category">{categoryItem.category}</h3>

            {/* 스킬 목록 */}
            <ul className="items">
              {categoryItem.items.map((item) => (
                <li key={item.name} className="item">
                  {item.icon && (
                    <img
                      src={require(`../../assets/icons/${item.icon}`)}
                      alt={item.name}
                      className="logo-icon"
                    />
                  )}

                  <span className="logo-txt">{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCard;