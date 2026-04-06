import { useLayoutEffect } from "react";
import gsap from "gsap";

export const useIntroAnimation = (containerRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".intro-title", { opacity: 0, y: 60 });

      gsap.to(".intro-panel", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        startAt: { scale: 1.05, opacity: 0 },
      });

      gsap.to(".intro-title", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  const animateHover = (enter, side) => {
    const left = containerRef.current.querySelector(".intro-left");
    const right = containerRef.current.querySelector(".intro-right");

    if (!left || !right) return;

    if (enter) {
      gsap.to(side === "left" ? left : right, {
        width: "60%",
        duration: 0.5,
        overwrite: true,
        ease: "power2.out",
      });
      gsap.to(side === "left" ? right : left, {
        width: "40%",
        duration: 0.5,
        overwrite: true,
        ease: "power2.out",
      });
    } else {
      gsap.to([left, right], {
        width: "50%",
        duration: 0.5,
        overwrite: true,
        ease: "power2.out",
      });
    }
  };

  const animateClick = (side, callback) => {
    const left = containerRef.current.querySelector(".intro-left");
    const right = containerRef.current.querySelector(".intro-right");
    const target = side === "left" ? left : right;
    const other = side === "left" ? right : left;

    const tl = gsap.timeline({
      onComplete: callback,
    });

    tl.to(target, {
      width: "100%",
      duration: 0.8,
      ease: "power4.inOut",
    }).to(
      other,
      {
        opacity: 0,
        duration: 0.5,
      },
      "<",
    );
  };

  return { animateHover, animateClick };
};
