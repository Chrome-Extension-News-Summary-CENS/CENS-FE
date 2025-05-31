import React, { useEffect, useState } from 'react';
import './MainPage.css';
import NewsController from '../controllers/NewsController';

const MainPage = ({ onPageChange }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      await NewsController.initializeNews();
      setNews(NewsController.getNews());
      setLoading(NewsController.isLoading());
      setError(NewsController.getError());
    };

    initializeData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page">
      <div className="header">
        <h1>뉴스</h1>
        <button onClick={() => onPageChange('settings')}>설정</button>
      </div>
      <div className="news-list">
        {news.map((item) => (
          <div key={item.articleId} className="news-item">
            <span className="news-category">{item.category}</span>
            <h3 className="news-title">{item.title}</h3>
            <p className="news-summary">{item.summary}</p>
            <p className="news-date">{item.createDate}</p>
            <button
              className="view-full-button"
              onClick={() => onPageChange('detail', item.articleId)}
            >
              자세히 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
