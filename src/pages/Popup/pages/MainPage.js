import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainPage.css';

const MainPage = ({ onPageChange }) => {
  const [news, setNews] = useState([]); // All articles
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios
      .get('http://api.cens.kro.kr:8080/api/article')
      .then((response) => {
        const data = response.data;
        setNews(data);

        const uniqueCats = Array.from(
          new Set(data.map((item) => item.category))
        );
        setCategories(['All', ...uniqueCats]);
      })
      .catch((error) => {
        console.error('뉴스 불러오기 실패:', error);
      });
  }, []);

  const filteredNews =
    selectedCategory === 'All'
      ? news
      : news.filter((item) => item.category === selectedCategory);

  return (
    <div className="page">
      <div className="header">
        <h1>CENS</h1>
        <button onClick={() => onPageChange('settings')}>설정</button>
      </div>
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

      <div className="news-list">
        {filteredNews.map((item) => (
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
              View full article
            </button>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <p className="no-news">No articles available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
