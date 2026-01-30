import "./IntroPage.scss";
import { FaArrowDown } from "react-icons/fa6";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroPage = () => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".line", {
        opacity: 0,
        y: 60,
        filter: "blur(6px)",
      });

      gsap.set(".intro-date", {
        opacity: 0,
        y: 20,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".line-1", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
      })
        .to(
          ".line-2",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
          },
          "-=0.35",
        )
        .to(
          ".intro-date",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.25",
        );

      gsap.to(".down-icon", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={introRef}>
      <div className="title">
        <h1 className="line line-1">I ALWAYS</h1>
        <h1 className="line line-2">DO MY BEST</h1>
        <p className="intro-date">HyoJun’s portfolio 2026.01</p>
      </div>
      <div className="bottom">
        <div className="down-icon">
          <span className="scroll-circle">
            <FaArrowDown />
          </span>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;
