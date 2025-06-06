import axios from 'axios';

// 1) axios 모킹
jest.mock('axios');

// 2) categoryCodes 모킹
jest.mock('../../utils/categoryCodes', () => ({
    CATEGORY_CODE_MAP: { '정치': 100, '경제': 101, 'IT/과학': 105 },
    CODE_CATEGORY_MAP: { 100: '정치', 101: '경제', 105: 'IT/과학' },
}));

import {
    fetchMemberCategories,
    saveMemberCategories,
} from '../../models/CategoryModel';

const API = 'http://api.cens.kro.kr:8080/api/member/categories';

describe('CategoryModel', () => {
    /* ------------------------------------------------------------------ */
    describe('fetchMemberCategories', () => {
        it('정상 응답(문자열 배열)을 그대로 반환', async () => {
            axios.get.mockResolvedValueOnce({ data: ['정치', '경제'] });

            const data = await fetchMemberCategories();

            /* ✅ 여기서 출력 */
            console.log('👉 fetchMemberCategories 결과:', data);

            expect(axios.get).toHaveBeenCalledWith(API, {
                headers: { 'Content-Type': 'application/json' },
            });
            expect(data).toEqual(['정치', '경제']);
        });


        it('응답이 배열이 아니면 빈 배열 반환', async () => {
            axios.get.mockResolvedValueOnce({ data: { foo: 'bar' } });

            const data = await fetchMemberCategories();
            expect(data).toEqual([]);
        });

        it('요청 실패 시 에러 throw', async () => {
            // 로그 끄기
            const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

            axios.get.mockRejectedValueOnce(new Error('Network'));
            await expect(fetchMemberCategories()).rejects.toThrow('Network');

            spy.mockRestore(); // 로그 복원
        });
    });

    /* ------------------------------------------------------------------ */
    describe('saveMemberCategories', () => {
        it('카테고리명을 코드 배열로 변환해 POST', async () => {
            axios.post.mockResolvedValueOnce({ status: 200 });

            await saveMemberCategories(['정치', 'IT/과학']);

            expect(axios.post).toHaveBeenCalledWith(
                API,
                [100, 105],
                { headers: { 'Content-Type': 'application/json' } },
            );
        });

        it('POST 실패 시 에러 throw', async () => {
            const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

            axios.post.mockRejectedValueOnce(new Error('500'));
            await expect(saveMemberCategories(['정치'])).rejects.toThrow('500');

            spy.mockRestore();
        });
    });
});
