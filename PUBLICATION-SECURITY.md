# GitHub 공개 배포 보안 감사 · 2026-10-28

배포 목적: ChatGPT 구독과 독립적으로 정적 허브를 GitHub Pages에 제공.

- 공개 허용 목록으로 10개 소스·검증·문서 파일만 복사. Sites 메타데이터, Git 이력, 계정 파일, 인증 토큰, Firebase 관리자 설정, 실제 일기·학생 자료, 운영 로그, 배포 아카이브 제외.
- 비밀키·토큰·이메일 패턴 검사 통과. 앱 내 사용자 입력은 textContent로 출력. 외부 앱 링크는 HTTPS 및 noopener noreferrer.
- 추가 앱 주소에서 인증 쿼리·프래그먼트(access_token, refresh_token, id_token, api_key, password, code 등)를 차단하도록 보완하고 실패 테스트 후 통과 확인.
- Firebase 일기는 별도 Firebase Hosting에서 열림. Pages는 일기 데이터나 계정 인증을 받지 않으며 별도 authorizedDomains 추가 불필요.
- 일기 백엔드는 기존 Google 인증·소유자별 Firestore 규칙·클라이언트 암호화를 유지. 실제 일기 자료·비밀번호를 저장소에 포함하지 않음.
- 기존 비공개 앱의 제목·접속 주소는 공개 목록에 포함되지만 해당 앱의 인증·권한을 변경하지 않음.
- 신규 외부 라이브러리나 GitHub Actions 패키지 도입 없음. GitHub 기본 Pages 브랜치 배포 사용.

## 부작용과 한계

- GitHub Pages는 공개 배포다. ChatGPT 비공개 로그인은 이 허브에 적용되지 않는다. 기존 Firebase 일기장의 Google 로그인은 유지된다.
- 즐겨찾기·사용자 추가 앱은 주소별 브라우저 저장소이므로 Sites에서 Pages로 자동 이전되지 않는다.
- GitHub Pages는 임의 응답 헤더 설정을 제공하지 않는다. Sites의 _headers는 제외하고 HTML meta CSP(default-src self, connect-src none, object-src none, base-uri none, form-action none) 및 no-referrer를 유지했다. frame-ancestors/X-Frame-Options 헤더 보호는 Pages에서 보장하지 않는다.
- 사용자가 추가한 링크의 목적지 안전은 보증하지 않는다. 민감한 값이나 개인정보를 링크 메타데이터에 입력하지 않도록 안내한다.
- 소스 공개 범위와 Pages 파일은 명시적 목록·SHA-256으로 확인한다. 웹앱에는 관리자 자격증명과 사용자의 실제 데이터가 없다.

검증: 허브 테스트 6개 통과, 일기 암호문 분할·복원 테스트 1개 통과. 일기 운영 메타데이터와 에뮬레이터 규칙·저장 흐름 점검은 작업 폴더 verification 보고서에 별도 보관.
