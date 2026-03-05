import SkillsDate from "../../assets/data/Skills.json";
import "./SkillsCard.scss";

const SkillsCard = () => {
  return (
    <div className="skills-card">
      <ul className="skills-item">
        {SkillsDate.map((categoryItem) => (
          <li key={categoryItem.id} className="card">
            {/* 카테고리명 */}
            <h3 className="category">{categoryItem.category}</h3>

            {/* 서브 항목들 */}
            <ul className="items">
              {Object.keys(categoryItem)
                .filter((key) => key.startsWith("sub") && !key.endsWith("-img"))
                .map((subKey) => {
                  const imgKey = `${subKey}-img`;
                  const imgSrc = categoryItem[imgKey];
                  const text = categoryItem[subKey];

                  return (
                    <li key={subKey} className="item">
                      {imgSrc && (
                        <img
                          src={require(`../../assets/icons/${imgSrc}`)}
                          alt={text}
                          className="logo-icon"
                        />
                      )}
                      <span className="logo-txt">{text}</span>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCard;
