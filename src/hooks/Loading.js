import "./Loading.scss";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 5;

      if (count >= 100) {
        count = 100;
        clearInterval(interval);

        // 👉 문 열리는 애니메이션
        const tl = gsap.timeline({
          onComplete: onComplete,
        });

        tl.to(".loader-left", {
          x: "-100%",
          duration: 1,
          ease: "power4.inOut",
        })
          .to(
            ".loader-right",
            {
              x: "100%",
              duration: 1,
              ease: "power4.inOut",
            },
            "<",
          )
          .to(
            ".loader-center",
            {
              opacity: 0,
              duration: 0.4,
            },
            "<",
          );
      }

      setProgress(count);
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-left" />
      <div className="loader-right" />

      <div className="loader-center">
        <h1 className="logo">HyoJun</h1>
        <p className="loading">{progress}%</p>
      </div>
    </div>
  );
};

export default Loading;
