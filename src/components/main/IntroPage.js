import "./IntroPage.scss";
import { IoChevronDownOutline } from "react-icons/io5";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroPage = () => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ⭐ 초기 상태 강제
      gsap.set(".line", {
        opacity: 0,
        y: 150,
        scale: 1.3,
        filter: "blur(14px)",
      });

      gsap.set(".intro-date", {
        opacity: 0,
        y: 40,
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".line-1", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
      })
        .to(
          ".line-2",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
          },
          "-=0.4"
        )
        .to(
          ".intro-date",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3"
        );

      gsap.to(".down-icon", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
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
        <p className="intro-date">HyoJun’s portfolio 2026.01. XX</p>
      </div>

      <div className="bottom">
        <p>Scroll Down</p>
        <IoChevronDownOutline className="down-icon" />
      </div>
    </section>
  );
};

export default IntroPage;
