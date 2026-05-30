import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import processData from "../assets/data/processData.json";
import "./Process.scss";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const processRef = useRef(null);
  const uxProcess = processData?.uxProcess || [];
  const identityMap = processData?.identityMap || {
    center: { name: "이효준", role: "Web Publisher" },
    nodes: [],
  };
  const keyPoints = processData?.keyPoints || [];

  const topNode = identityMap.nodes.find((node) => node.position === "top");
  const leftNode = identityMap.nodes.find((node) => node.position === "left");
  const rightNode = identityMap.nodes.find((node) => node.position === "right");
  const bottomNode = identityMap.nodes.find(
    (node) => node.position === "bottom",
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-title-area",
          start: "top 80%",
        },
      });

      titleTl
        .to(".sub-title", {
          duration: 0.6,
          text: { value: "02. PROCESS" },
          ease: "none",
        })
        .to(".main-title", {
          duration: 1.5,
          text: { value: "사용자의 시선에서 시작하는 구현" },
          ease: "none",
        });

      gsap.from(".flow-step", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".sketch-box",
          start: "top 70%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".identity-map",
          start: "top 60%",
        },
      });
      tl.from(".center-node", {
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
      }).from(".node", {
        opacity: 0,
        scale: 0.5,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".postit-box", {
        y: -100,
        rotation: -5,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: ".postit-box",
          start: "top 80%",
        },
      });
    }, processRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" id="process" ref={processRef}>
      <div className="process-container container">
        <div className="section-title-area">
          <p className="sub-title"></p>
          <h2 className="main-title"></h2>
        </div>

        <div className="diagram-grid">
          <div className="diagram-box sketch-box">
            <h3 className="box-title">UX PROCESS (사용자 경험 설계 과정)</h3>
            <div className="flow-wrapper">
              {uxProcess.map((item) => (
                <div key={item.id} className="flow-step">
                  <span className="step-num">{item.id}</span>
                  <div className="step-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="center-arrow">
            <span className="arrow-chalk">⇒</span>
          </div>

          <div className="diagram-box code-box">
            <h3 className="box-title">
              IDENTITY ARCHITECTURE (퍼블리셔 이효준)
            </h3>
            <div className="identity-map">
              <div className="center-node">
                <span>{identityMap.center.name}</span>
                <small>{identityMap.center.role}</small>
              </div>
              {[
                { data: topNode, className: "top", colorClass: "top-node" },
                { data: leftNode, className: "left", colorClass: "left-node" },
                {
                  data: rightNode,
                  className: "right",
                  colorClass: "right-node",
                },
                {
                  data: bottomNode,
                  className: "bottom",
                  colorClass: "bottom-node",
                },
              ].map(
                (item, idx) =>
                  item.data && (
                    <div key={idx} className={`node ${item.className}`}>
                      <div className={`main-node ${item.colorClass}`}>
                        <span>{item.data.title}</span>
                      </div>
                      <div className="sub-branches">
                        {item.data.children.map((child, cIdx) => (
                          <div key={cIdx} className="child-node">
                            <span>{child}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>

          <div className="postit-box">
            <div className="postit-tape"></div>
            <h3 className="postit-title">KEY POINT ⭐️</h3>
            <ul className="postit-list">
              {keyPoints.map((point, idx) => (
                <li key={idx}>
                  <span className="check-box">☑︎</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
