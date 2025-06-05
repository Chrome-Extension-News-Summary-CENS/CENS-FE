# CENS Chrome Extension

CENS: Chrome Extension News Summary 는 사용자가 설정한 카테고리의 뉴스를 GPT를 이용해 요약, 제공하는 크롬 확장 프로그램입니다.

## 주요 기능

- 🔐 Google 계정을 통한 간편 로그인
- 📰 카테고리별 맞춤형 뉴스 추천
- 📜 GPT를 이용해 요약된 뉴스
- ⚙️ 사용자 설정 관리

## System Architecture

프로젝트의 시스템 아키텍처와 MVC 패턴 구현에 대한 자세한 내용은 [ARCHITECTURE.md](ARCHITECTURE.md) 문서를 참조해주세요.

## 설치 방법

1. Chrome 웹 스토어에서 설치 (TBU)

2. 개발자 모드로 설치

   ```bash
   # 저장소 클론
   git clone [https://github.com/Chrome-Extension-News-Summary-CENS/CENS-FE]

   # 의존성 설치
   npm install

   # 개발 서버 실행
   npm start
   ```

## 기술 스택

- React
- Chrome Extension API
- OAuth2
- JWT
- Axios

## 개발 환경 설정

1. Node.js 설치 (v14 이상)
2. 프로젝트 클론
3. 의존성 설치
   ```bash
   npm install
   ```
4. 개발 서버 실행
   ```bash
   npm start
   ```

## 빌드 방법

```bash
# 프로덕션 빌드
npm run build

# 개발 빌드
npm run build:dev
```

## 프로젝트 구조

```
src/
├── pages/
│   ├── Popup/
│   │   ├── pages/
│   │   │   ├── LoginPage
│   │   │   ├── MainPage
│   │   │   ├── DetailPage
│   │   │   └── SettingsPage
│   │   └── Popup.jsx
│   ├── Background/
│   │   └── background.js
│   └── ContentScript/
│       └── contentScript.js
├── models/
│   └── NewsModel.js
└── controllers/
    └── NewsController.js
```

## 사용 방법

1. Chrome 브라우저에서 확장 프로그램 설치
2. Google 계정으로 로그인
3. 관심 있는 뉴스 카테고리 선택
4. 메인 페이지에서 추천 뉴스 확인
5. 설정 페이지에서 개인화 옵션 관리

## 보안 고려사항

- OAuth2 인증 사용
- 토큰 기반 인증
- HTTPS 통신
- XSS 방지

## 확장성 고려사항

- 모듈화된 구조
- 컴포넌트 재사용
- 의존성 주입
- 테스트 용이성

## 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Commit Message Convention

- feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
- fix : 기능에 대한 버그 수정
- build : 빌드 관련 수정
- chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
- docs : 문서(주석) 수정
- style : 코드 스타일, 포맷팅에 대한 수정
- refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
- release : 버전 릴리즈
- merge : 병합

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## developers

- frontend: [corkang](https://github.com/corkang), [Park MinJun](https://github.com/ParkMinjun0721)
- backend: [suminJN](https://github.com/SuminJN)

## Project Link

- [github](https://github.com/Chrome-Extension-News-Summary-CENS/CENS-FE)
