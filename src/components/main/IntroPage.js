import "./IntroPage.scss";
import { FaArrowDown } from "react-icons/fa6";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const IntroPage = () => {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = [
        { title: "DARE", desc: "도전을 두려워하지 않습니다" },
        { title: "CONFIDENT", desc: "선택에 책임을 집니다" },
        { title: "BUILD", desc: "끝까지 구현합니다" },
        {
          title: "DARE, CONFIDENT & BUILD",
          desc: "도전을 두려워하지 않고, 선택에 책임을 지며, 끝까지 구현합니다.",
        },
      ];

      const line = document.querySelector(".line");
      const desc = document.querySelector(".desc");

      gsap.set(line, { opacity: 0, y: 40, filter: "blur(6px)" });
      gsap.set(desc, { opacity: 0, y: 20 });
      gsap.set(".intro-date", { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      words.forEach((word, index) => {
        tl.call(() => {
          line.classList.remove("is-highlight");

          if (word.title === "DARE, CONFIDENT & BUILD") {
            line.classList.add("is-highlight");
          }

          line.textContent = word.title;
          desc.textContent = word.desc;
        });

        tl.to(line, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
        }).to(
          desc,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.3"
        );

        if (index !== words.length - 1) {
          tl.to([line, desc], {
            opacity: 0,
            y: -20,
            duration: 0.6,
            delay: 0.6,
          });
        }
      });

      tl.to(".intro-date", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

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
        <div className="word-line">
          <h1 className="line"></h1>
          <p className="desc"></p>
        </div>
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
