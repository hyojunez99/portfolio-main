import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSkillsAnimation = (containerRef) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* 1. 타이틀 */
      gsap.from("h1", {
        scrollTrigger: {
          trigger: "h1",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        filter: "blur(6px)",
        duration: 0.8,
        ease: "power3.out",
      });

      /* 2. 그룹별 애니메이션 */
      const groups = gsap.utils.toArray(".skill-group");

      groups.forEach((group) => {
        const cards = group.querySelectorAll(".skill-card");
        const title = group.querySelector("h3");

        // 초기 상태
        gsap.set([title, cards], {
          opacity: 0,
          y: 30,
          scale: 0.95,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        /* 등장 */
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: {
                each: 0.06,
                from: "start", // 🔥 핵심 (일관성)
              },
              ease: "back.out(1.7)",
            },
            "-=0.3",
          )

          /* 🔥 등장 끝난 후 float 적용 */
          .add(() => {
            gsap.to(cards, {
              y: "+=6",
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: {
                each: 0.2,
              },
            });
          });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
