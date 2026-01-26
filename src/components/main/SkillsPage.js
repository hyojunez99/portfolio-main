import SkillsCard from "../ui/SkillsCard";
import "./SkillPage.scss";

const SkillsPage = () => {
  return (
    <section id="skills">
      <div className="skills-zip">
        <h3>Skills</h3>
        <p>
          웹 퍼블리셔로서 다룰 수 있는 기술 스택과 도구들을 정리한 페이지입니다.
          <br />
          기본 언어부터 프레임워크, 디자인 툴, 협업 도구까지 폭넓게
          경험했습니다.
        </p>
        <SkillsCard />
      </div>
    </section>
  );
};

export default SkillsPage;
