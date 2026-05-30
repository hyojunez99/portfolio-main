# Portfolio Main Website

## 1. 프로젝트 소개

- **설명:** 개발 역량과 작업 스타일을 명확하게 전달하기 위해 기획·디자인·개발 전 과정을 직접 수행한 개인 포트폴리오 웹사이트입니다. GSAP을 활용한 인터랙티브한 UI와 데이터 기반의 효율적인 컴포넌트 설계를 중점으로 구현했습니다.

- **진행 기간:** 2026.05.16 ~ 2026.05.31 (15일)
- **개발 인원:** 개인 프로젝트
- **배포 링크:** [Portfolio Main](https://hyojunez99.github.io/portfolio-main/)
- **GitHub:** [Repository Link](https://github.com/hyojunez99/portfolio.git)

---

## 2. 사용 기술 스택 (Tech Stack)

- **Frontend:** JavaScript (ES6+), React.js, SCSS
- **Data Handling:** Mock JSON
- **Animation:** GSAP (ScrollTrigger, TextPlugin)
- **Design Tools:** Figma, Photoshop, Illustrator
- **Version Control & Tools:** Git, GitHub, Supabase

---

## 3. 기획 및 디자인 (Planning & Design)

- **컨셉:** 차분하고 정돈된 구조로, 사용자에게 프로젝트 정보와 개발 역량을 직관적으로 전달하는 포트폴리오 웹사이트
- **Tool:** Figma
- **주요 활동:**
  - 전체 UI/UX 설계 및 레이아웃 디자인
  - 프로젝트 및 기술 스택 데이터 구조 정의 (JSON 기반 유지보수 최적화)
  - 반응형 웹 구현 설계 (데스크탑, 태블릿, 모바일)
  - GSAP 인터랙션 시안 작성 및 최적화 구현

---

## 4. 디렉토리 구조

```text
src
│
├── assets
│   ├── data            # JSON 데이터 (Projects, Skills 등)
│   │
│   ├── images          # 프로젝트 / UI 이미지 및 아이콘
│   │
│   ├── pdf             # 이력서 및 관련 문서
│   │
│   └── scss            # variables, mixin, font, global
│
├── components          # 재사용 컴포넌트
│
├── pages               # 페이지 단위 컴포넌트
│
└── App.jsx
```

---

## 5. 담당 역할

- **기획 및 디자인**
  - 전체 레이아웃 설계, UI/UX 설계 및 반응형 구조 기획
- **개발:**
- React.js 및 SCSS를 활용한 프론트엔드 구현
- GSAP TextPlugin & ScrollTrigger 기반 스크롤 인터랙션 최적화
- JSON 데이터를 활용한 동적 컴포넌트 연동 및 유지보수성 확보
- CSS 인터랙션과 GSAP 애니메이션의 충돌 방지를 위한 최적화 로직 적용

---

## 6. 주요 기능

- 타이핑 애니메이션: TextPlugin을 활용한 섹션별 타이핑 효과 및 레이아웃 밀림(Layout Shift) 방지
- 스크롤 인터랙션: ScrollTrigger를 활용한 마인드맵 노드 및 프로젝트 카드 순차 등장
- 반응형 웹: Grid 및 Flex 기반의 유연한 레이아웃으로 모바일/태블릿 환경 대응
- 효율적 데이터 관리: JSON 파일 기반의 데이터 연동으로 콘텐츠 수정 및 확장성 개선

---

## 7. 트러블 슈팅

- **문제 1:** CSS 인터랙션과 GSAP 애니메이션의 충돌
  - **해결:** GSAP 애니메이션 완료 후 clearProps: "all"을 호출하여 인라인 스타일을 제거함으로써 CSS :hover 효과가 정상 작동하도록 최적화.

- **문제 2:** PDF 파일을 링크로 연결했을 때 브라우저에 따라 새 탭으로 열리지 않는 문제
  - **해결:** 링크 속성을 수정하고 여러 브라우저에서 테스트하며 동작 차이를 확인

- **문제 3:** JSON을 통한 아이콘 동적 로딩 시 경로 문제
  - **해결:** public 폴더 구조를 활용하여 정적 자산 경로를 고정하고, onError 핸들러로 이미지 로드 실패 시 UI 대응 처리.

---

## 8. 인사이트 (Insights)

- 기능 구현보다 사용자 경험을 고려한 구조 설계의 중요성 체감
- 애니메이션 적용 시 사용자 시선 흐름과 정보 전달 속도의 균형 학습
- GSAP과 CSS 간의 인터랙션 충돌 해결을 통해 웹 애니메이션 최적화 역량 강화
