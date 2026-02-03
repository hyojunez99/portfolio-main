import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import bgVideo from "../assets/video/bg-video.mp4";
import "./Layout.scss";
import CursorBackground from "../components/common/CursorBackground";

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

      {/* 배경 동영상 */}
      <div className="video-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="../../assets/images/bg.png" // 대체 이미지
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>
      <CursorBackground />
    </div>
  );
};

export default Layout;
