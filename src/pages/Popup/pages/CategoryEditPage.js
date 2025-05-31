// src/pages/CategoryEditPage.js
import React, { useState, useEffect } from 'react';
import './CategoryEditPage.css';

const STORAGE_KEY = 'interestCategories';

const CategoryEditPage = ({ onPageChange }) => {
    const ALL_CATEGORIES = [
        '정치',
        '경제',
        '사회',
        '생활/문화',
        '세계',
        'IT/과학',
    ];

    // 로컬 저장소에서 기존에 선택된 카테고리 불러오기
    const [selectedCategories, setSelectedCategories] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // 체크박스를 토글하는 핸들러 (최대 3개 제한)
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            // 이미 선택되어 있으면 제거
            setSelectedCategories((prev) =>
                prev.filter((c) => c !== category)
            );
        } else {
            if (selectedCategories.length >= 3) {
                alert('최대 3개까지만 선택 가능합니다.');
                return;
            }
            // 새로 선택 추가
            setSelectedCategories((prev) => [...prev, category]);
        }
    };

    // Save 버튼 클릭 시: 로컬 스토리지에 저장 후 SettingsPage로 돌아가기
    const handleSave = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCategories));
        } catch (e) {
            console.error('카테고리 저장 중 오류 발생:', e);
        }
        onPageChange('settings');
    };

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
                    aria-label="카테고리 저장"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default CategoryEditPage;
