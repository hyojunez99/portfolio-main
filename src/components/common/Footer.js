import "./Footer.scss";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const formRef = useRef(null);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-animate", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });

      gsap.to(".bg-footer", {
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="bg-footer" />

      <section id="contact">
        <p className="footer-txt footer-animate">끝까지 봐주셔서 감사합니다.</p>

        <p className="footer-desc footer-animate">
          이 페이지의 모든 요소를 직접 구현했습니다.
        </p>

        <div className="footer-links footer-animate">
          <button onClick={() => window.open("https://github.com/hyojunez99")}>
            GitHub
          </button>
          <span>·</span>
          <button
            onClick={() =>
              window.open("https://hyojunez99.github.io/portfolio/")
            }
          >
            Resume
          </button>
        </div>

        <div className="footer-cta footer-animate">
          <p className="cta-title">Contact Me</p>
          <form ref={formRef} onSubmit={sendEmail} className="cta">
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

        <div className="footer-end footer-animate">— END —</div>

        <p className="copyright footer-animate">
          © 2026 Web Publisher Lee Hyojun
        </p>
      </section>
    </footer>
  );
};

export default Footer;
