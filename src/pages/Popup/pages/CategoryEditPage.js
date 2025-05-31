// src/pages/CategoryEditPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryEditPage.css';

const STORAGE_KEY = 'interestCategoryCodes'; // 로컬스토리지에 “숫자 코드”로 저장
const API_BASE_URL = 'http://api.cens.kro.kr:8080';

// ① 문자열 ↔ 숫자 코드 매핑
const CATEGORY_CODE_MAP = {
    '정치': 100,
    '경제': 101,
    '사회': 102,
    '생활/문화': 103,
    '세계': 104,
    'IT/과학': 105,
};

// (선택) ② 서버에서 숫자 코드만 받아올 때, 
//     초기화 용도로 “반대 매핑”이 필요하면 함께 선언
const CODE_CATEGORY_MAP = {
    100: '정치',
    101: '경제',
    102: '사회',
    103: '생활/문화',
    104: '세계',
    105: 'IT/과학',
};

const CategoryEditPage = ({ onPageChange }) => {
    // 모든 문자열 목록
    const ALL_CATEGORIES = Object.keys(CATEGORY_CODE_MAP);

    // 1) 로컬 저장소나 서버에서 받아온 “숫자 코드 배열”을, 
    //    화면에선 “문자열 배열”로 관리하기 위해 상태를 두 단계로 관리할 수 있음.
    //    여기서는 로컬스토리지에 “숫자 코드 배열”이 남아 있다고 가정하여,
    //    컴포넌트 초기 state에 이를 문자열로 변환하여 세팅하는 예시:
    const [selectedCategories, setSelectedCategories] = useState(() => {
        try {
            const savedCodes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            // 숫자 코드 배열 → 문자열 배열로 변환
            return savedCodes
                .map((code) => CODE_CATEGORY_MAP[code])
                .filter((str) => typeof str === 'string');
        } catch {
            return [];
        }
    });

    const [saving, setSaving] = useState(false);

    // 2) 체크박스를 토글하는 핸들러 (최대 3개 제한)
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prev) =>
                prev.filter((c) => c !== category)
            );
        } else {
            if (selectedCategories.length >= 3) {
                alert('최대 3개까지만 선택 가능합니다.');
                return;
            }
            setSelectedCategories((prev) => [...prev, category]);
        }
    };

    // 3) Save 버튼 클릭 시: 
    //    (가) 문자열 배열 → 숫자 코드 배열 변환
    //    (나) POST /api/member/categories 에 전송
    //    (다) 로컬스토리지에 숫자 코드 배열 저장
    //    (라) SettingsPage 로 돌아가기
    const handleSave = async () => {
        setSaving(true);

        try {
            // 3-①: 문자열 배열 → 숫자 코드 배열
            const codesToSend = selectedCategories.map(
                (catStr) => CATEGORY_CODE_MAP[catStr]
            );
            // 예: ['정치','IT/과학'] → [100, 105]

            // 3-②: 서버에 POST 요청
            await axios.post(
                `${API_BASE_URL}/api/member/categories`,
                { categories: codesToSend },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 인증이 필요하다면 아래 헤더도 추가하세요:
                        // Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                }
            );

            // 3-③: 로컬스토리지에 숫자 코드 배열 저장
            localStorage.setItem(STORAGE_KEY, JSON.stringify(codesToSend));

            // 3-④: Settings 화면으로 돌아가기
            onPageChange('settings');
        } catch (e) {
            console.error('관심 카테고리 업데이트 실패:', e);
            alert('카테고리 저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
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
