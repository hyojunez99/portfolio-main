import { useEffect, useRef } from "react";
import "./CursorBackground.scss";

const CursorBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // CSS 변수로 마우스 위치 전달
      if (bgRef.current) {
        bgRef.current.style.setProperty("--mouse-x", `${clientX}px`);
        bgRef.current.style.setProperty("--mouse-y", `${clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="cursor-bg" ref={bgRef}></div>;
};

export default CursorBackground;
