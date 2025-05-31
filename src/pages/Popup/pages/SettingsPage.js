// SettingsPage.js (로직을 컴포넌트 내부에 둔 예시)
import React from 'react';
import './SettingsPage.css';

const SettingsPage = ({ onPageChange }) => {
  const handleLogout = () => {
    // 로컬스토리지 토큰 삭제
    localStorage.removeItem('authToken');
    // 크롬 익스텐션 백그라운드에 메시지 보내기
    // chrome.runtime.sendMessage({ action: 'LOGOUT' });
    // onPageChange로 로그인 화면 이동 요청
    onPageChange('login');
  };

  const handleVersion = () => {
    const v = chrome.runtime.getManifest().version;
    alert(`현재 버전: ${v}`);
  };

  const handleCategoryClick = () => {
    onPageChange('categoryEdit');
  };

  // “개발자 정보”를 누르면, 예를 들어 새 창을 열거나 간단한 얼럿을 띄우는 형태:
  const handleDeveloperClick = () => {
    alert('개발자 정보: example@domain.com');
    onPageChange('settings');
  };

  const menuItems = [
    { id: 'logout', label: 'Logout', action: handleLogout },
    { id: 'version', label: 'Version Information', action: handleVersion },
    { id: 'category', label: 'Category Settings', action: handleCategoryClick },
    { id: 'developer', label: 'Developer Information', action: handleDeveloperClick },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button
          className="back-button"
          onClick={() => onPageChange('main')}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="settings-title">Settings</h1>
      </div>

      <ul className="settings-list">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="settings-item"
            onClick={item.action}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                item.action();
              }
            }}
          >
            <span className="item-label">{item.label}</span>
            <span className="item-arrow">→</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
