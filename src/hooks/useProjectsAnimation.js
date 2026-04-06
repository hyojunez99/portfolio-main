import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useProjectsAnimation = (containerRef) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline();

      headerTl
        .from(".projects-header .back-btn", {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".projects-header h1",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".projects-header p",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );

      const items = gsap.utils.toArray(".project-item");

      items.forEach((item) => {
        const left = item.querySelector(".project-left");
        const right = item.querySelector(".project-right");

        const isReverse = item.classList.contains("reverse");

        const leftStart = isReverse ? "100%" : "-100%";
        const rightStart = isReverse ? "-100%" : "100%";

        gsap.set(left, {
          x: leftStart,
          opacity: 0,
          scale: 0.95,
        });

        gsap.set(right, {
          x: rightStart,
          opacity: 0,
          scale: 0.95,
        });

        gsap.set(item.querySelectorAll(".project-right *"), {
          opacity: 0,
          y: 30,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.to(left, {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power4.out",
        })
          .to(
            right,
            {
              x: "0%",
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power4.out",
            },
            "<",
          )

          .to(
            item.querySelectorAll(".project-right *"),
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4",
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
