import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import bgVideo from "../assets/video/bg-video.mp4";
import "./Layout.scss";

const Layout = () => {
  
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <div className="video-bg">
        <video src={bgVideo} autoPlay muted loop playsInline />
        <video
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
};

export default Layout;
