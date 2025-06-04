// src/utils/categoryCodes.js

// ① 문자열 ↔ 숫자 코드 매핑
export const CATEGORY_CODE_MAP = {
    '정치': 100,
    '경제': 101,
    '사회': 102,
    '생활/문화': 103,
    '세계': 104,
    'IT/과학': 105,
};

// ② 숫자 코드 → 문자열 매핑 (필요하다면)
export const CODE_CATEGORY_MAP = {
    100: '정치',
    101: '경제',
    102: '사회',
    103: '생활/문화',
    104: '세계',
    105: 'IT/과학',
};

// ③ 화면에서 보여줄 전체 문자열 목록
//    (Object.keys로 바로 쓰기보다는 미리 추출해두는 편이 안전)
export const ALL_CATEGORIES = Object.keys(CATEGORY_CODE_MAP);
