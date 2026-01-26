import IntroPage from "../components/main/IntroPage";
import About from "../components/main/About";
import SkillsPage from "../components/main/SkillsPage";
import ProjectsPage from "../components/main/ProjectsPage";

const MainPage = () => {
  return (
    <div className="MainPage">
      <IntroPage />
      <About />
      <SkillsPage />
      <ProjectsPage />
    </div>
  );
};

export default MainPage;
