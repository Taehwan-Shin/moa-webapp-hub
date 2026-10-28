# 모아 · 나의 웹앱 허브

설치 의존성 없는 정적 HTML/CSS/JavaScript 앱. 기존 앱 9개와 새 발표자 뽑기·모둠 만들기 도구 2개를 연결합니다.

실행: `node serve.mjs` → http://127.0.0.1:4198

검증: `node --test tests/core.test.mjs`

`dist/catalog.mjs`가 기본 앱 목록입니다. 앱에서 추가한 링크와 즐겨찾기는 브라우저 localStorage에만 저장되며 기기 간 동기화되지 않습니다. 학생 번호는 메모리에만 유지합니다. 일기는 기존 Firebase 앱으로 연결하며 일기 데이터·인증 정보를 읽거나 이전하지 않습니다. 접근 제한된 기존 앱은 원래 권한을 요구합니다.

기존 앱 주소 출처: 연결된 Sites 목록, 기존 classroom-hub README, GitHub Pages 배포 기록. 다른 교사의 허브는 내 앱으로 등록하지 않았습니다.

## GitHub Pages

main은 소스, gh-pages는 dist의 정적 파일만 배포합니다. 수정 후 검증하고 `git subtree split --prefix=dist -b pages-build` 및 `git push origin pages-build:gh-pages`로 배포할 수 있습니다. 공개 호스팅이며 각 외부 앱의 권한은 별도로 유지됩니다.
