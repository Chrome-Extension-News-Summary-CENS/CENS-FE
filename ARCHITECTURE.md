# CENS Chrome Extension 아키텍처 문서

## 1. 시스템 아키텍처 (C4 모델)

### 1.1 Context (시스템 컨텍스트)

```
[Chrome Extension System]
    ├── [Popup Application]
    │   ├── News Module
    │   ├── Auth Module
    │   └── Settings Module
    ├── [Background Service]
    │   └── OAuth2 Authentication
    └── [Content Script]
        └── Page Interaction
```

### 1.2 Container (컨테이너)

- **Popup Application**

  - React 기반의 사용자 인터페이스
  - MVC 패턴으로 구현된 뉴스 관리 시스템
  - 사용자 인증 및 설정 관리

- **Background Service**

  - OAuth2 인증 처리
  - 메시지 브로커링
  - 상태 관리

- **Content Script**
  - 웹 페이지와의 상호작용
  - DOM 조작

### 1.3 Component (컴포넌트)

```
[News Module]
    ├── Model (NewsModel)
    │   ├── 데이터 구조 정의
    │   ├── API 통신
    │   └── 비즈니스 로직
    ├── Controller (NewsController)
    │   ├── 사용자 액션 처리
    │   ├── 데이터 흐름 제어
    │   └── 상태 관리
    └── View (Pages)
        ├── LoginPage
        ├── MainPage
        ├── DetailPage
        └── SettingsPage
```

## 2. MVC 패턴 구현

### 2.1 Model 계층

- **NewsModel**
  - 뉴스 데이터 구조 정의
  - API 통신 로직
  - 데이터 조작 메서드

### 2.2 Controller 계층

- **NewsController**
  - Model과 View 사이의 중재자
  - 사용자 액션 처리
  - 데이터 흐름 제어

### 2.3 View 계층

- **Pages**
  - 사용자 인터페이스 구현
  - 사용자 입력 처리
  - 데이터 표시

## 3. 데이터 흐름

```
[User Action] → [View] → [Controller] → [Model] → [API]
     ↑            ↑          ↑            ↑
     └────────────┴──────────┴────────────┘
```

## 4. 주요 컴포넌트 설명

### 4.1 NewsModule

- 뉴스 데이터 관리
- 카테고리별 필터링
- 상세 뉴스 조회

### 4.2 AuthModule

- Google OAuth2 인증
- 토큰 관리
- 세션 관리

### 4.3 SettingsModule

- 사용자 설정 관리
- 카테고리 관리
- 알림 설정

## 5. 기술 스택

- **Frontend**

  - React
  - CSS Modules
  - Webpack

- **Backend Communication**

  - Axios
  - JWT

- **Chrome Extension API**
  - chrome.identity
  - chrome.storage
  - chrome.runtime

## 6. 보안 고려사항

- OAuth2 인증 사용
- 토큰 기반 인증
- HTTPS 통신
- XSS 방지

## 7. 확장성 고려사항

- 모듈화된 구조
- 컴포넌트 재사용
- 의존성 주입
- 테스트 용이성
