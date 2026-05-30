import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import "./Footer.scss";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Footer = () => {
  const formRef = useRef(null);
  const footerRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_wuwxhsr",
        "template_8goaoul",
        formRef.current,
        "ICRancNzwpLfULADg",
      )
      .then(() => {
        alert("메일이 전송되었습니다! 소중한 연락 감사드립니다.");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("메일 전송에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-section .section-title-area",
          start: "top 85%",
        },
      });
      titleTl
        .to(".footer-section .sub-title", {
          duration: 0.6,
          text: { value: "04. CONTACT" },
        })
        .to(".footer-section .main-title", {
          duration: 1.5,
          text: { value: "언제나 열려있는 소통 창구" },
        });

      gsap.from(".contact-info-board", {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-main-grid",
          start: "top 80%",
        },
      });

      gsap.from(".contact-form-board", {
        x: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-main-grid",
          start: "top 80%",
        },
      });

      gsap.set(".chalk-link-btn", { y: 20, opacity: 0 });
      gsap.to(".chalk-link-btn", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-links-group",
          start: "top 88%",
        },
      });

      gsap.set(".chalk-field", { y: 20, opacity: 0 });
      gsap.to(".chalk-field", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".chalk-form",
          start: "top 85%",
        },
      });

      gsap.from(".copyright-area", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".copyright-area",
          start: "top 95%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section" ref={footerRef} id="contact">
      <div className="footer-container container">
        <div className="section-title-area">
          <p className="sub-title"></p>
          <h2 className="main-title"></h2>
        </div>

        <div className="footer-main-grid">
          <div className="contact-info-board">
            <p className="message-glow">
              "첫 화면은 완성했습니다.
              <br />
              이제는 팀과 함께 더 좋은 경험을 만들고 싶습니다."
            </p>
            <p className="message-subtxt">
              이 포트폴리오는 기획, 컴포넌트 아키텍처 설계, 동적 JSON 데이터
              연동까지 <br />전 과정을 칠판(Chalkboard) 무드로 직접 구현한
              작업물입니다.
            </p>

            <div className="contact-links-group">
              <button
                className="chalk-link-btn"
                onClick={() => window.open("https://github.com/hyojunez99")}
              >
                GitHub Profile ↗
              </button>
              <button
                className="chalk-link-btn"
                onClick={() =>
                  window.open(
                    `${process.env.PUBLIC_URL}/pdf/resume.pdf`,
                    "_blank",
                  )
                }
              >
                Resume (이력서) ↗
              </button>
            </div>
          </div>

          <div className="contact-form-board">
            <form ref={formRef} onSubmit={sendEmail} className="chalk-form">
              <div className="chalk-field">
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  placeholder=" "
                  required
                />
                <label htmlFor="form-name">성함 또는 기업명</label>
                <span className="chalk-line"></span>
              </div>

              <div className="chalk-field">
                <input
                  type="email"
                  name="contact"
                  id="form-email"
                  placeholder=" "
                  required
                />
                <label htmlFor="form-email">회신받으실 이메일 주소</label>
                <span className="chalk-line"></span>
              </div>

              <div className="chalk-field text-area-field">
                <textarea
                  name="message"
                  id="form-message"
                  placeholder=" "
                  required
                />
                <label htmlFor="form-message">
                  협업 제안 또는 메시지를 남겨주세요
                </label>
                <span className="chalk-line"></span>
              </div>

              <button type="submit" className="submit-chalk-btn">
                메시지 전송하기
              </button>
            </form>
          </div>
        </div>

        <div className="copyright-area">
          <p className="copyright-txt">
            © 2026 Web Publisher Lee Hyojun. All Rights Reserved.
          </p>
          <a href="#intro" className="top-scroll-btn">
            TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
