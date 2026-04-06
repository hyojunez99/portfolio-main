import { Routes, Route, useLocation } from "react-router-dom";
import "../src/assets/scss/global.scss";

import Intro from "./pages/intro/Intro";
import AboutPage from "./layout/AboutPage";
import ProjectPage from "./layout/ProjectPage";
import ProjectsAll from "./pages/projects/ProjectsAll";
import ProjectDetail from "./pages/projects/ProjectDetail";

import { useState, useEffect } from "react";
import Loading from "./hooks/Loading";

function App() {
  const location = useLocation();
  const state = location.state;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  if (isLoading) {
    return <Loading onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      {/* 메인 라우트 */}
      <Routes location={state?.background || location}>
        <Route path="/" element={<Intro />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/all" element={<ProjectsAll />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>

      {/* 모달 라우트 */}
      {state?.background && (
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      )}
    </>
  );
}

export default App;
