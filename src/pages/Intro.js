import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import "./Intro.scss";

gsap.registerPlugin(TextPlugin);

const Intro = () => {
  const introRef = useRef(null);

  const techStacks = [
    { name: "HTML5", color: "#E34F26" },
    { name: "SCSS", color: "#CF649A" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "GSAP", color: "#88CE02" },
    { name: "React", color: "#61DAFB" },
  ];

  const keywords = [
    "시선 설계",
    "사용자 최우선",
    "기술적 최적화",
    "사용자 중심 논리",
  ];

  const headlineTexts = [
    "디자인 의도를 정확하게 구현하고,",
    "사용자 경험까지 개선하는",
    "신입 웹 퍼블리셔 이효준입니다.",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const headlineSpans = introRef.current.querySelectorAll(
        ".main-headline .inline-block",
      );
      headlineSpans.forEach((el, index) => {
        tl.to(
          el,
          {
            duration: 1.5,
            text: { value: headlineTexts[index] },
            ease: "none",
          },
          "+=0.2",
        );
      });

      const keywordTags =
        introRef.current.querySelectorAll(".intro-keyword-tag");
      gsap.set(keywordTags, { opacity: 0, y: 15, scale: 0.9 });
      tl.to(
        keywordTags,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.5",
      ); 

      tl.from(
        ".tech-tag",
        {
          scale: 0,
          rotation: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3",
      );

      tl.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      );
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });

      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(".hero-text-wrapper", {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="intro-section" id="intro" ref={introRef}>
      <div className="hero-content container">
        <div className="hero-text-wrapper">
          <h1 className="main-headline">
            <div className="line-wrap">
              <span className="inline-block"></span>
            </div>
            <div className="line-wrap">
              <span className="inline-block point-text"></span>
            </div>
            <div className="line-wrap">
              <span className="inline-block"></span>
            </div>
          </h1>
          <div className="intro-keyword-tags">
            {keywords.map((word, idx) => (
              <span key={idx} className="intro-keyword-tag">
                # {word}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-badge-group">
          {techStacks.map((tech, idx) => (
            <span
              key={idx}
              className="tech-tag"
              style={{ "--point-color": tech.color }}
            >
              # {tech.name}
            </span>
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
        <p>Scroll Down</p>
        <svg className="arrow-svg" viewBox="0 0 24 24">
          <path
            d="M7 10l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Intro;
