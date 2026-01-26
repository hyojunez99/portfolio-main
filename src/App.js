import { HashRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/global.scss";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import ProjectsDetailPage from "./pages/ProjectsDetailPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<ProjectsDetailPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
