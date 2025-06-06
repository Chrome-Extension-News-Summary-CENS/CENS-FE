import {
    getInitialSelectedCategories,
    updateCategories,
    getAllCategories,
} from '../../controllers/CategoryController';

/* ───── 모킹 ───── */
jest.mock('../../models/CategoryModel', () => ({
    fetchMemberCategories: jest.fn(),
    saveMemberCategories: jest.fn(),
}));
jest.mock('../../utils/categoryCodes', () => ({
    CATEGORY_CODE_MAP: { '정치': 100, '경제': 101, '세계': 104 },
    CODE_CATEGORY_MAP: { 100: '정치', 101: '경제', 104: '세계' },
    ALL_CATEGORIES: ['정치', '경제', '세계'],
}));
import {
    fetchMemberCategories,
    saveMemberCategories,
} from '../../models/CategoryModel';
import { ALL_CATEGORIES } from '../../utils/categoryCodes';

/* ───── 테스트 ───── */
describe('CategoryController', () => {
    describe('getInitialSelectedCategories', () => {
        it('유효한 카테고리만 반환', async () => {
            fetchMemberCategories.mockResolvedValueOnce(['정치', '연예', '세계']);

            const valid = await getInitialSelectedCategories();

            console.log('✅ 초기 필터링 결과:', valid);   // 👉 로그!
            expect(valid).toEqual(['정치', '세계']);
        });
    });

    describe('updateCategories', () => {
        it('saveMemberCategories 호출', async () => {
            const selected = ['정치', '세계'];
            await updateCategories(selected);

            console.log('✅ updateCategories 전달값:', selected); // 👉 로그!
            expect(saveMemberCategories).toHaveBeenCalledWith(selected);
        });
    });

    describe('getAllCategories', () => {
        it('ALL_CATEGORIES 복사본 반환', () => {
            const arr = getAllCategories();

            console.log('✅ getAllCategories 결과:', arr); // 👉 로그!
            expect(arr).toEqual(ALL_CATEGORIES);
            expect(arr).not.toBe(ALL_CATEGORIES);
        });
    });
});
