import React, { useEffect } from "react";
import Header from "./components/Header";
import Intro from "./pages/Intro";
import Process from "./pages/Process";
import Archive from "./pages/Archive";
import Footer from "./components/Footer";

import "./assets/scss/_global.scss";
import Skills from "./components/Skills";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="portfolio-app">
      <Header />
      <main>
        <Intro />
        <Process />
        <Skills />
        <Archive />
      </main>
      <Footer />
    </div>
  );
}

export default App;
