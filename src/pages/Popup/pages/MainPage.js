// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import './MainPage.css';
import NewsController from '../controllers/NewsController';
import axios from 'axios';
import logo from '../../../assets/img/news-logo.svg';
import SearchIcon from '../../../assets/img/search-icon.svg';
import SettingIcon from '../../../assets/img/setting-icon.svg';

const MainPage = ({ onPageChange }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]); // 고유 카테고리 목록 + "All"
  const [selectedCategory, setSelectedCategory] = useState('All'); // 현재 선택된 카테고리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInterestCategories, setUserInterestCategories] = useState([]);

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
          setCategories(['All', 'My Interest', ...uniqueCats]);

          const catRes = await axios.get(
            'http://api.cens.kro.kr:8080/api/member/categories',
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          // console.log('📥 서버에서 받아온 관심 카테고리:', catRes.data);
          const interestCats = Array.isArray(catRes.data) ? catRes.data : [];
          setUserInterestCategories(interestCats);
          // console.log('✅ 관심 카테고리 (검증됨):', interestCats);
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
      : selectedCategory === 'My Interest'
      ? news.filter((item) => userInterestCategories.includes(item.category))
      : news.filter((item) => item.category === selectedCategory);

  return (
    <div className="page">
      {/* ─────────── 헤더 ─────────── */}
      <div className="header">
        <img className="logo-icon" src={logo} alt="News Logo" />
        <h1 className="header-title">News</h1>

        <div className="header-right-group">
          {/* 검색 아이콘 버튼 */}
          <button
            className="search-button"
            onClick={() => {
              /* 필요 시 검색 모달/페이지 열기 로직 삽입 */
              console.log('검색 버튼 클릭됨');
            }}
            aria-label="검색"
          >
            {' '}
            <img src={SearchIcon} className="search-icon" alt="검색" />
          </button>

          {/* 설정(톱니바퀴) 아이콘 */}
          <button
            className="settings-button"
            onClick={() => onPageChange('settings')}
            aria-label="설정"
          >
            <img src={SettingIcon} className="search-icon" alt="검색" />
          </button>
        </div>
      </div>

      {/* ─────────── “Today's Summaries” 부제목 ─────────── */}
      <h2 className="subtitle">Today's Summaries</h2>

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
