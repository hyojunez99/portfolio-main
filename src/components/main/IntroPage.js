import "./IntroPage.scss";
import { IoChevronDownOutline } from "react-icons/io5";

const IntroPage = () => {
  return (
    <section id="intro">
      <div className="title">
        <h1>
          I ALWAYS <br /> DO MY BEST
        </h1>
        <p>HyoJun’s portfolio 2026.01. XX</p>
      </div>
      <div className="bottom">
        <p>Scroll Down</p>
        <IoChevronDownOutline className="down-icon" />
      </div>
    </section>
  );
};

export default IntroPage;
