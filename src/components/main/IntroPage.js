import "./IntroPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import introData from "../../assets/data/IntroData.json";

const IntroPage = () => {
  const introRef = useRef(null);
  const trackRef = useRef(null);

  const projects = introData.introProjects.slice(0, 6);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".title h1", { y: 80, opacity: 0, duration: 1 })
        .from(".title p", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".subtitle p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".skills span",
          { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 },
          "-=0.4",
        )
        .from(
          ".card",
          { opacity: 0, y: 40, stagger: 0.08, duration: 0.6 },
          "-=0.2",
        );

      const track = trackRef.current;
      gsap.set(track, { willChange: "transform", force3D: true });

      const totalHeight = track.getBoundingClientRect().height;
      const loopHeight = totalHeight / 2;

      gsap.to(track, {
        y: -loopHeight,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="intro" ref={introRef}>
      <div className="intro-inner">
        <div className="intro-title">
          <div className="title">
            <h1>Hyojun</h1>
            <p>Web Publisher</p>
          </div>

          <div className="subtitle">
            <p>
              구조를 설계하고
              <br />
              완성도 있는 UI를 구현합니다.
            </p>
          </div>

          <div className="skills">
            <span>Semantic Markup</span>
            <span>·</span>
            <span>Responsive Layout</span>
            <span>·</span>
            <span>Accessibility</span>
          </div>
        </div>

        <div className="card-flow">
          <div className="card-mask">
            <div className="card-track" ref={trackRef}>
              {[...projects, ...projects].map((p, i) => (
                <div
                  className="card"
                  key={`${p.title}-${i}`}
                  title={p.keywords.join(", ")}
                >
                  <div className="thumb">
                    <img
                      className="card-img"
                      src={require(`../../assets/images/${p.image}`)}
                      alt={p.title}
                    />
                  </div>

                  <div className="body">
                    <div className="meta">
                      <p className="year">{p.year}</p>
                      <span
                        className={`team ${
                          p.team === "팀프로젝트" ? "team" : "solo"
                        }`}
                      >
                        {p.team}
                      </span>
                    </div>

                    <p className="title-text">{p.title}</p>

                    <div className="keywords">
                      {p.keywords.map((kw, idx) => (
                        <span key={idx} className="kw">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroPage;
