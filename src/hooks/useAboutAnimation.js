import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useAboutAnimation = (containerRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const leftElements = [
        ".about-badge",
        ".about-title",
        ".about-intro h2",
        ".about-desc p",
        ".about-actions",
        ".about-social",
      ];

      gsap.from(leftElements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: ".about-timeline",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};
