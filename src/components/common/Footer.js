import React, { useRef } from "react";
import "./Footer.scss";
import emailjs from "emailjs-com";
import { useFooterAnimation } from "../../hooks/useFooterAnimation";

const Footer = () => {
  const formRef = useRef(null);
  const footerRef = useRef(null);

  // 푸터 애니메이션 호출
  useFooterAnimation(footerRef);

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
        alert("메일이 전송되었습니다!");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("메일 전송에 실패했습니다.");
      });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="bg-footer" />

      <section id="contact" className="contact-section">
        <div className="footer-content">
          <p className="footer-txt">
            <span className="glow">
              첫 화면은 완성했습니다.
              <br />
              이제는 팀과 함께 더 좋은 경험을 만들고 싶습니다.
            </span>
          </p>

          <p className="footer-subtxt">
            이 포트폴리오는 기획부터 구현까지 전 과정을 직접 설계했습니다.
          </p>

          <div className="footer-links">
            <button
              onClick={() => window.open("https://github.com/hyojunez99")}
            >
              GitHub <span className="arrow">↗</span>
            </button>
            <span className="dot">·</span>
            <button
              onClick={() =>
                window.open("https://hyojunez99.github.io/portfolio-main/")
              }
            >
              Resume <span className="arrow">↗</span>
            </button>
          </div>

          <div className="footer-cta">
            <p className="cta-title">연락 주시면 감사하겠습니다</p>

            <form ref={formRef} onSubmit={sendEmail} className="cta-form">
              <div className="field">
                <input type="text" name="name" placeholder=" " required />
                <label>이름</label>
              </div>

              <div className="field">
                <input type="email" name="contact" placeholder=" " required />
                <label>이메일</label>
              </div>

              <div className="field">
                <textarea name="message" placeholder=" " required />
                <label>메시지를 남겨주세요</label>
              </div>

              <button type="submit" className="cta-btn">
                보내기
              </button>
            </form>
          </div>

          <p className="copyright">© 2026 Web Publisher Lee Hyojun</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
