import React, { useState } from 'react';
import './MainPage.css';

const MainPage = ({ onPageChange }) => {
  const [news, setNews] = useState([]); // 서버에서 받아올 뉴스 데이터

  return (
    <div className="page">
      <div className="header">
        <h1>뉴스 요약</h1>
        <button onClick={() => onPageChange('settings')}>설정</button>
      </div>
      <div className="news-list">
        {news.map((item) => (
          <div
            key={item.id}
            className="news-item"
            onClick={() => onPageChange('detail', item.id)}
          >
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
