// // src/pages/CategoryEditPage.js
// import React, { useState } from 'react';
// import './CategoryEditPage.css';

// const CategoryEditPage = ({ onPageChange }) => {
//     // 고정된 카테고리 목록 (원하는 대로 늘리거나 줄일 수 있습니다)
//     const ALL_CATEGORIES = [
//         'Technology',
//         'Politics',
//         'Sports',
//         'Entertainment',
//         'Science',
//     ];

//     // 선택된 카테고리를 상태로 관리합니다.
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     // 체크박스를 토글하는 핸들러
//     const toggleCategory = (category) => {
//         if (selectedCategories.includes(category)) {
//             // 이미 선택되어 있으면 제거
//             setSelectedCategories((prev) =>
//                 prev.filter((c) => c !== category)
//             );
//         } else {
//             // 새로 선택 추가
//             setSelectedCategories((prev) => [...prev, category]);
//         }
//     };

//     // Save 버튼 클릭 시, 선택된 카테고리를 로컬 스토리지 등에 저장하거나 API 호출로 전송할 수 있습니다.
//     // 여기서는 간단히 Settings 화면으로 돌아가도록 onPageChange('settings')를 호출합니다.
//     const handleSave = () => {
//         // 예시: localStorage.setItem('newsCategories', JSON.stringify(selectedCategories));
//         // (실제 로직에 맞춰서 API 호출하거나 크롬 스토리지에 저장해 주세요.)
//         onPageChange('settings');
//     };

//     return (
//         <div className="category-edit-page">
//             {/* ──────────────────────────────────────────────────────── */}
//             {/* 헤더 영역: 뒤로가기 + Settings 타이틀 */}
//             <div className="category-edit-header">
//                 <button
//                     className="back-button"
//                     onClick={() => onPageChange('settings')}
//                     aria-label="뒤로가기"
//                 >
//                     ←
//                 </button>
//                 <h1 className="category-edit-title">Settings</h1>
//             </div>

//             {/* ──────────────────────────────────────────────────────── */}
//             {/* 콘텐츠 영역: News Categories + 목록 */}
//             <div className="category-edit-content">
//                 <h2 className="section-title">News Categories</h2>
//                 <ul className="categories-list">
//                     {ALL_CATEGORIES.map((cat) => (
//                         <li key={cat} className="category-item">
//                             <label className="category-label-wrapper">
//                                 <span className="category-label-text">{cat}</span>
//                                 <input
//                                     type="checkbox"
//                                     className="category-checkbox"
//                                     checked={selectedCategories.includes(cat)}
//                                     onChange={() => toggleCategory(cat)}
//                                     aria-checked={selectedCategories.includes(cat)}
//                                 />
//                             </label>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* ──────────────────────────────────────────────────────── */}
//             {/* Save 버튼 영역 */}
//             <div className="save-button-container">
//                 <button
//                     className="save-button"
//                     onClick={handleSave}
//                     aria-label="카테고리 저장"
//                 >
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CategoryEditPage;
