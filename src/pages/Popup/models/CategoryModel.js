// src/models/CategoryModel.js
import axios from 'axios';
import { CATEGORY_CODE_MAP, CODE_CATEGORY_MAP } from '../utils/categoryCodes';

const API_BASE_URL = 'http://api.cens.kro.kr:8080';

/**
 * 서버에서 저장된 관심 카테고리(문자열 배열)를 가져온다.
 * @returns {Promise<Array<string>>} 예: ["정치","경제","세계"]
 */
export async function fetchMemberCategories() {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/member/categories`, {
            headers: { 'Content-Type': 'application/json' },
        });
        // 서버에서는 문자열 배열을 반환한다고 가정
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        console.error('[CategoryModel] fetchMemberCategories 실패:', err);
        throw err;
    }
}

/**
 * 선택된 문자열 카테고리 리스트(예: ["정치","IT/과학"])를
 * 숫자 코드(예: [100,105])로 변환하여 서버에 저장한다.
 * @param {Array<string>} categoryNames
 * @returns {Promise<void>}
 */
export async function saveMemberCategories(categoryNames) {
    // ① 문자열 배열 → 숫자 코드 배열 변환
    const codesToSend = categoryNames.map((cat) => CATEGORY_CODE_MAP[cat]).filter(Boolean);
    try {
        await axios.post(
            `${API_BASE_URL}/api/member/categories`,
            codesToSend,
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('[CategoryModel] saveMemberCategories 실패:', err);
        throw err;
    }
}
