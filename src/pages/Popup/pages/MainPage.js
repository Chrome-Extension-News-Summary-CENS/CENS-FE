// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import './MainPage.css';
import NewsController from '../controllers/NewsController';

const MainPage = ({ onPageChange }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);          // 고유 카테고리 목록 + "All"
  const [selectedCategory, setSelectedCategory] = useState('All'); // 현재 선택된 카테고리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // NewsController 초기화 (API 호출 등)
        await NewsController.initializeNews();
        const allNews = NewsController.getNews();
        const isLoading = NewsController.isLoading();
        const err = NewsController.getError();

        setNews(allNews);
        setLoading(isLoading);
        setError(err);

        // 에러가 없고, 데이터를 정상적으로 받아왔다면 카테고리 목록 생성
        if (!err && Array.isArray(allNews)) {
          // 각 기사(item.category)에서 고유한 카테고리 뽑기
          const uniqueCats = Array.from(
            new Set(allNews.map((item) => item.category))
          );
          // 앞에 "All"을 추가
          setCategories(['All', ...uniqueCats]);
        }
      } catch (e) {
        setLoading(false);
        setError('뉴스 불러오기 중 오류가 발생했습니다.');
        console.error(e);
      }
    };

    initializeData();
  }, []);

  // 로딩/에러 화면 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  // 선택된 카테고리에 따른 뉴스 필터링
  const filteredNews =
    selectedCategory === 'All'
      ? news
      : news.filter((item) => item.category === selectedCategory);

  return (
    <div className="page">
      {/* ─────────── 헤더 ─────────── */}
      <div className="header">
        <h1 className="logo">뉴스</h1>
        <button
          className="settings-button"
          onClick={() => onPageChange('settings')}
        >
          설정
        </button>
      </div>

      {/* ─────────── 카테고리 탭바 ─────────── */}
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={
              cat === selectedCategory
                ? 'category-item active'
                : 'category-item'
            }
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─────────── 뉴스 리스트 ─────────── */}
      <div className="news-list">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div
              key={item.articleId}
              className="news-item"
              onClick={() => onPageChange('detail', item.articleId)}
            >
              <span className="news-category">{item.category}</span>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-summary">{item.summary}</p>
              <p className="news-date">{item.createDate}</p>
              <button
                className="view-full-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPageChange('detail', item.articleId);
                }}
              >
                자세히 보기
              </button>
            </div>
          ))
        ) : (
          <p className="no-news">해당 카테고리에 뉴스가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
