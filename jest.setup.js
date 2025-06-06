/* jest.setup.js --------------------------------------------------------- */

/* 1) Jest DOM 확장 – expect(… ).toBeInTheDocument() 같은 매처 추가 */
import '@testing-library/jest-dom';

/* 2) localStorage / sessionStorage 모킹 */
import 'jest-localstorage-mock';

/* 3) window.alert / confirm 등의 브라우저 기본 다이얼로그 모킹
      (테스트에서 호출 여부만 검사할 때 유용) */
global.alert = jest.fn();
global.confirm = jest.fn();

/* 4) matchMedia 모킹 – RTL로 반응형 컴포넌트 테스트 시 필요할 수 있음 */
if (!window.matchMedia) {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        /* addListener/removeListener 는 deprecated지만
           일부 라이브러리가 아직 사용 → no-op 함수로 채워 둡니다. */
        addListener: jest.fn(),
        removeListener: jest.fn(),
        // 최신 API
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }));
}

/* 5) 크롬 익스텐션 API 모킹 (선택)
      sinon-chrome 또는 jest-webextension-mock 둘 중 하나 사용 */
// import 'jest-webextension-mock';
// 또는
// import sinonChrome from 'sinon-chrome';
// global.chrome = sinonChrome;   // 필요 시 수동 주입

/* 6) fetch 모킹이 필요하면 주석 해제
import 'whatwg-fetch';
 */

/* ---------------------------------------------------------------------- */
