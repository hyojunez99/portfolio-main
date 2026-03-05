import "./IntroPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroPage = () => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".title-main h1", {
        y: 80,
        opacity: 0,
        duration: 1,
      })
        .from(
          ".title-main p",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".title-sub p",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".keywords span",
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.4",
        );
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={introRef}>
      <div className="intro-title">
        <div className="title-main">
          <h1>Hyojun</h1>
          <p>Web Publisher</p>
        </div>

        <div className="title-sub">
          <p>
            구조를 설계하고
            <br />
            완성도 있는 UI를 구현합니다.
          </p>
        </div>

        <div className="title-desc">
          <p className="keywords">
            <span>Semantic Markup</span>
            <span>·</span>
            <span>Responsive Layout</span>
            <span>·</span>
            <span>Accessibility</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;
