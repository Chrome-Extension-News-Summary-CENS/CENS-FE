// src/pages/CategoryEditPage.js
import React, { useState, useEffect } from 'react';
import {
    getInitialSelectedCategories,
    updateCategories,
    getAllCategories,
} from '../controllers/CategoryController';
import '../utils/categoryCodes';  // 내부 상수도 필요하면 컨트롤러에서 가져와도 된다.
import './CategoryEditPage.css';

const CategoryEditPage = ({ onPageChange }) => {
    // 1) 모든 카테고리(문자열) 목록
    const ALL_CATEGORIES = getAllCategories();

    // 2) 화면에서 체크된 "문자열 카테고리" 상태
    const [selectedCategories, setSelectedCategories] = useState([]);

    // 3) 저장 중 클릭 방지용
    const [saving, setSaving] = useState(false);

    // ───────────────────────────────────────────────────────────────────────────
    // 초기 로딩: Controller.getInitialSelectedCategories() 호출
    useEffect(() => {
        const init = async () => {
            try {
                const validCategories = await getInitialSelectedCategories();
                setSelectedCategories(validCategories);
            } catch (err) {
                console.error('❌ 초기 카테고리 불러오기 실패:', err);
                alert('카테고리를 불러오는 중 오류가 발생했습니다.');
            }
        };
        init();
    }, []);

    // ───────────────────────────────────────────────────────────────────────────
    // 체크박스 토글 핸들러 (최대 3개 제한)
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prev) => prev.filter((c) => c !== category));
        } else {
            if (selectedCategories.length >= 3) {
                alert('최대 3개까지만 선택 가능합니다.');
                return;
            }
            setSelectedCategories((prev) => [...prev, category]);
        }
    };

    // ───────────────────────────────────────────────────────────────────────────
    // Save 버튼 클릭 시: Controller.updateCategories() 호출
    const handleSave = async () => {
        setSaving(true);
        try {
            await updateCategories(selectedCategories);
            // 저장에 성공하면 Settings 페이지로 돌아감
            onPageChange('settings');
        } catch (err) {
            console.error('❌ 카테고리 저장 실패:', err);
            alert('카테고리 저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    // ───────────────────────────────────────────────────────────────────────────
    return (
        <div className="ce-category-edit-page">
            {/* 헤더 */}
            <div className="ce-category-edit-header">
                <button
                    className="ce-back-button"
                    onClick={() => onPageChange('settings')}
                    aria-label="뒤로가기"
                >
                    ←
                </button>
                <h1 className="ce-category-edit-title">Settings</h1>
            </div>

            {/* 콘텐츠 */}
            <div className="ce-category-edit-content">
                <h2 className="ce-section-title">News Categories</h2>
                <ul className="ce-categories-list">
                    {ALL_CATEGORIES.map((cat) => {
                        const isDisabled =
                            selectedCategories.length >= 3 &&
                            !selectedCategories.includes(cat);

                        return (
                            <li key={cat} className="ce-category-item">
                                <label className="ce-category-label-wrapper">
                                    <span className="ce-category-label-text">{cat}</span>
                                    <input
                                        type="checkbox"
                                        className="ce-category-checkbox"
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => toggleCategory(cat)}
                                        aria-checked={selectedCategories.includes(cat)}
                                        disabled={isDisabled}
                                    />
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Save 버튼 */}
            <div className="ce-save-button-container">
                <button
                    className="ce-save-button"
                    onClick={handleSave}
                    disabled={saving}
                    aria-label="카테고리 저장"
                >
                    {saving ? '저장 중…' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default CategoryEditPage;
