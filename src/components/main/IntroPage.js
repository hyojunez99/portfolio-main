import "./IntroPage.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import introData from "../../assets/data/IntroData.json";

gsap.registerPlugin(ScrollTrigger);

const IntroPage = () => {
  const introRef = useRef(null);
  const trackRef = useRef(null);

  const projects = introData.introProjects.slice(0, 7);

  const handleCardClick = () => {
    const el = document.querySelector("#projects");

    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".title h1", { y: 80, opacity: 0, duration: 1 })
        .from(".role", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".subtitle p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".skills span",
          { opacity: 0, y: 20, stagger: 0.12, duration: 0.6 },
          "-=0.4",
        )
        .from(
          ".card",
          { opacity: 0, y: 40, stagger: 0.08, duration: 0.6 },
          "-=0.2",
        );

      const track = trackRef.current;

      gsap.set(track, {
        willChange: "transform",
        force3D: true,
      });

      const totalHeight = track.getBoundingClientRect().height;
      const loopHeight = totalHeight / 2;

      const flow = gsap.to(track, {
        y: -loopHeight,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      track.addEventListener("mouseenter", () => {
        gsap.to(flow, { timeScale: 0.3, duration: 0.6 });
      });

      track.addEventListener("mouseleave", () => {
        gsap.to(flow, { timeScale: 1, duration: 0.6 });
      });

      gsap.to(".card-flow", {
        y: -60,
        scrollTrigger: {
          trigger: "#intro",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
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
            <p className="role">Web Publisher</p>
          </div>

          <div className="subtitle">
            <p>
              구조를 설계하고
              <br />
              완성도 있는 사용자 인터페이스를 구현합니다.
            </p>
          </div>

          <div className="skills">
            <span>Semantic Markup</span>
            <span>·</span>
            <span>Responsive Web</span>
            <span>·</span>
            <span>Web Accessibility</span>
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
                  onClick={handleCardClick}
                  style={{ cursor: "pointer" }}
                >
                  <div className="thumb">
                    <img
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
