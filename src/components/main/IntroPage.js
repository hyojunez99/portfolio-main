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

      gsap.set([line, desc, ".intro-date"], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      words.forEach((word, index) => {
        tl.call(() => {
          line.classList.remove("is-highlight");

          if (index === words.length - 1) {
            line.classList.add("is-highlight");
          }

          line.textContent = word.title;
          desc.textContent = word.desc;
        });

        // TITLE 등장
        tl.fromTo(
          line,
          { y: 40, opacity: 0, filter: "blur(8px)", scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.8,
          },
        )

          // DESC 등장
          .fromTo(
            desc,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
            },
            "-=0.35",
          );

        // 마지막 문장이 아닐 경우 사라짐
        if (index !== words.length - 1) {
          tl.to([line, desc], {
            y: -30,
            opacity: 0,
            duration: 0.6,
            delay: 0.7,
          });
        }
      });

      // intro-date 등장
      tl.fromTo(
        ".intro-date",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
      );

      // 스크롤 아이콘
      gsap.to(".down-icon", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
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
        <p className="intro-date">HyoJun’s portfolio</p>
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
