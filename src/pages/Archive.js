import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import projectsData from "../assets/data/Projects.json";
import ProjectModal from "../components/ProjectModal";
import "./Archive.scss";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const images = require.context(
  "../assets/images",
  false,
  /\.(png|jpe?g|gif|svg)$/,
);

const Archive = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    "ALL",
    "Team",
    "Portfolio",
    "Redesign",
    "UI/UX Design",
    "Detail Page",
    "Clone",
  ];

  const filteredProjects =
    activeFilter === "ALL"
      ? [...projectsData].sort((a, b) => a.priority - b.priority)
      : [...projectsData]
          .filter((project) => project.type === activeFilter)
          .sort((a, b) => a.priority - b.priority);

  const getImagePath = (imageName) => {
    const key = `./${imageName}`;
    if (images.keys().includes(key)) {
      return images(key);
    }
    return "https://placehold.co/600x400/1e2227/ffffff?text=No+Image";
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-title-area",
          start: "top 80%",
        },
      });
      titleTl
        .to(".archive-section .sub-title", {
          duration: 0.6,
          text: { value: "04. ARCHIVE" },
        })
        .to(".archive-section .main-title", {
          duration: 1.5,
          text: { value: "선택과 집중으로 일궈낸 작업물" },
        });

      gsap.set(".filter-btn", { y: -20, opacity: 0 });
      gsap.to(".filter-btn", {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.1,
        scrollTrigger: {
          trigger: ".filter-tab-bar",
          start: "top 85%",
        },
      });

      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".archive-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="archive-section" id="archive" ref={sectionRef}>
      <div className="archive-container container">
        <div className="section-title-area">
          <p className="sub-title"></p>
          <h2 className="main-title"></h2>
        </div>

        <div className="filter-tab-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="archive-grid">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProjectId(project.id)}
            >
              <div className="card-number">
                {(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="card-thumb-wrap">
                <img
                  src={getImagePath(project.images?.main || "default.png")}
                  alt={project.proname}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400/1e2227/ffffff?text=No+Image";
                  }}
                />
                <span className="project-type-badge">{project.type2}</span>
              </div>

              <div className="card-details">
                <p className="project-duration">{project.day}</p>
                <h3 className="project-name">{project.proname}</h3>
                <p className="project-subdesc">{project.prosub}</p>

                <div className="keyword-tags">
                  {project.keywords?.map((word, idx) => (
                    <span key={idx} className="tag">
                      #{word}
                    </span>
                  ))}
                </div>

                <div className="tech-icon-list">
                  {project.skills?.map((skill, idx) => {
                    try {
                      const iconSrc = require(
                        `../assets/images/icons/${skill}-icon.png`,
                      );
                      return (
                        <img
                          key={idx}
                          src={iconSrc}
                          alt={skill}
                          className="mini-icon"
                        />
                      );
                    } catch (e) {
                      return null;
                    }
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProjectId && (
        <ProjectModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
};

export default Archive;
