import "./About.scss";
import bgImg from "../../assets/images/bg-img1.jpg";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pc-bg", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          once: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          once: true,
        },
      });

      tl.from(".about-top p, .about-top span", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
        .from(
          ".about-mid p",
          {
            y: 24,
            opacity: 0,
            duration: 0.9,
            stagger: 0.25,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".bottom li",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about">
      <div className="pc-bg">
        <div className="bg-img">
          <img src={bgImg} alt="background" />
          <div className="bg-color"></div>
        </div>

        <div className="pc-line"></div>

        <div className="txt">
          <div className="about-top">
            <p>안녕하세요</p>
            <span> Web Publisher 이효준 입니다.</span>
          </div>

          <div className="about-mid">
            <p>
              조용하지만 단단하게, 끝까지 책임지는 퍼블리셔 저는 화려한 말보다
              <span> 묵묵한 성실함</span>의 가치를 믿습니다.
            </p>
            <p>
              한 번 잡은 코드는 안정적으로 동작할 때까지 수정을 거듭하며, 화면에
              보이는 화려함만큼이나 보이지 않는 코드의 구조와 가독성을 중요하게
              생각합니다.
            </p>
            <p>
              예상치 못한 문제 앞에서도<span> 쉽게 꺾이지 않습니다.</span>{" "}
              오히려 그 문제를 해결하는 과정에서 배우고, 그 경험을 다음 코드에
              더 나은 양분으로 담아냅니다.
            </p>
            <p>
              마지막까지 <span>책임지는</span> 태도로 팀과 사용자에게 신뢰를
              주는 웹 퍼블리셔가 되겠습니다.
            </p>
          </div>

          <div className="bottom">
            <ul>
              <li>#묵묵한</li>
              <li>#성실함</li>
              <li>#중꺾마</li>
              <li>#책임있는</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
