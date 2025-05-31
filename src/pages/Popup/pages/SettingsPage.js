import React from 'react';
import './SettingsPage.css';

const SettingsPage = ({ onPageChange }) => {
  return (
    <div className="page">
      <div className="header">
        <button onClick={() => onPageChange('main')}>← 뒤로가기</button>
        <h2>설정</h2>
      </div>
      <div className="settings-content">
        <div className="category-settings">
          <h3>카테고리 선택</h3>
          {/* 카테고리 선택 UI */}
        </div>
        <button className="logout-button" onClick={() => onPageChange('login')}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
