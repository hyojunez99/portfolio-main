import { useLayoutEffect } from "react";
import gsap from "gsap";

export const useIntroAnimation = (containerRef) => {
  useLayoutEffect(() => {
    const light = containerRef.current.querySelector(".mouse-light");

    const moveLight = (e) => {
      if (!light) return;

      gsap.to(light, {
        x: e.clientX - 350,
        y: e.clientY - 350,
        duration: 0.12,
        ease: "power2.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", moveLight);

    const ctx = gsap.context(() => {
      gsap.set(".intro-panel", {
        opacity: 0,
        scale: 1.05,
      });

      gsap.set(".intro-title", {
        opacity: 0,
        y: 80,
      });

      gsap.set(".intro-label", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".content p", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".meta", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".bg-text", {
        opacity: 0,
        scale: 1.2,
      });

      gsap.set(".floating-track", {
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(".floating-track", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })

        .to(
          ".intro-panel",
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=1.2",
        )

        .to(
          ".bg-text",
          {
            opacity: 0.06,
            scale: 1,
            duration: 1.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1.2",
        )

        .to(
          ".intro-label",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1.3",
        )

        .to(
          ".intro-title",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=1",
        )

        .to(
          ".content p",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.9",
        )

        .to(
          ".meta",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        );

      gsap.to(".bg-text", {
        y: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-track-top", {
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-track-bottom", {
        y: 20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", moveLight);

      ctx.revert();
    };
  }, [containerRef]);

  const animateHover = (enter, side) => {
    const left = containerRef.current.querySelector(".intro-left");

    const right = containerRef.current.querySelector(".intro-right");

    if (!left || !right) return;

    const target = side === "left" ? left : right;

    const other = side === "left" ? right : left;

    if (window.innerWidth < 1024) return;

    if (enter) {
      gsap.to(target, {
        width: "58%",
        duration: 0.7,
        overwrite: true,
        ease: "power3.out",
      });

      gsap.to(other, {
        width: "42%",
        duration: 0.7,
        overwrite: true,
        ease: "power3.out",
      });

      gsap.to(target.querySelector(".content"), {
        y: -12,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(target.querySelector(".bg-text"), {
        scale: 1.05,
        opacity: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(target.querySelector(".meta"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".mouse-light", {
        scale: 1.08,
        opacity: 1,
        duration: 0.4,
      });
    } else {
      gsap.to([left, right], {
        width: "50%",
        duration: 0.7,
        overwrite: true,
        ease: "power3.out",
      });

      gsap.to(".content", {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".bg-text", {
        scale: 1,
        opacity: 0.06,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.to(".meta", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".mouse-light", {
        scale: 1,
        opacity: 0.9,
        duration: 0.4,
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

    tl.to(other, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power2.out",
    })

      .to(
        target,
        {
          width: "100%",
          duration: 1,
          ease: "power4.inOut",
        },
        "<",
      )

      .to(
        target.querySelector(".content"),
        {
          scale: 1.05,
          duration: 1,
          ease: "power3.out",
        },
        "<",
      )

      .to(
        target.querySelector(".bg-text"),
        {
          scale: 1.2,
          opacity: 0.12,
          duration: 1,
          ease: "power3.out",
        },
        "<",
      );
  };
  
  return {
    animateHover,
    animateClick,
  };
};
