// src/controllers/CategoryController.js
import {
    fetchMemberCategories,
    saveMemberCategories,
} from '../models/CategoryModel';

import {
    CATEGORY_CODE_MAP,
    CODE_CATEGORY_MAP,
    ALL_CATEGORIES,
} from '../utils/categoryCodes';

/**
 * 초기에 View에서 호출해서, 서버에서 받아온 카테고리(문자열[]) 중
 * 유효한 것만 필터링하여 반환한다.
 * @returns {Promise<Array<string>>} 예: ["정치","세계"]
 */
export async function getInitialSelectedCategories() {
    // 1) 서버에서 받아온 문자열 배열
    const received = await fetchMemberCategories();
    // 2) CATEGORY_CODE_MAP에 매핑 가능한 값만 필터링
    return received.filter((cat) => CATEGORY_CODE_MAP[cat] !== undefined);
}

/**
 * View(페이지)에서 "저장" 버튼 클릭했을 때 호출.
 * @param {Array<string>} selectedCategoryNames  // 화면에서 선택된 문자열 카테고리
 */
export async function updateCategories(selectedCategoryNames) {
    // ① 서버에 저장할 때는 saveMemberCategories 내부에서 숫자 코드로 변환
    await saveMemberCategories(selectedCategoryNames);
}

/**
 * 화면에서 보여줄 전체 카테고리 목록(문자열 배열)을 반환
 * → View 쪽에서는 ALL_CATEGORIES를 직접 import해도 되지만,
 *    Controller를 경유하여 가져오면 의존성을 더 분리할 수 있다.
 */
export function getAllCategories() {
    return ALL_CATEGORIES.slice(); // 새로운 배열로 복사
}
