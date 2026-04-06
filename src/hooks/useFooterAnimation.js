import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useFooterAnimation = (containerRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        ".footer-txt, .footer-subtxt, .footer-links, .cta-title, .cta-form .field, .cta-btn",
        {
          opacity: 0,
          y: 40,
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // 🔥 핵심 수정
          start: "top 75%", // 🔥 핵심 수정
          toggleActions: "play none none none",
          once: true,
          // markers: true,
        },
      });

      tl.to(".footer-txt, .footer-subtxt", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
        .to(
          ".footer-links, .footer-links .dot",
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.4",
        )
        .to(
          ".cta-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .to(
          ".cta-form .field",
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4",
        )
        .to(
          ".cta-btn",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        );

      gsap.to(".bg-footer", {
        scale: 1.3,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
