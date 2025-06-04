// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import './DetailPage.css';
import NewsController from '../controllers/NewsController';

const DetailPage = ({ onPageChange, newsId }) => {
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      await NewsController.initializeNews();
      const detail = NewsController.getNewsById(newsId);
      setNewsDetail(detail);
    };

    initializeData();
  }, [newsId]);

  if (!newsDetail) {
    return <div className="dp-not-found">뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="dp-page">
      {/* ─────────── 헤더 ─────────── */}
      <div className="dp-header">
        <button
          className="dp-back-button"
          onClick={() => onPageChange('main')}
        >
          ← 뒤로
        </button>
        <h1 className="dp-header-title">뉴스 상세</h1>
      </div>

      {/* ─────────── 뉴스 상세 컨테이너 ─────────── */}
      <div className="dp-news-detail">
        <span className="dp-news-category">{newsDetail.category}</span>
        <h2 className="dp-news-title">{newsDetail.title}</h2>
        <p className="dp-news-date">{newsDetail.createDate}</p>
        <div className="dp-news-content">{newsDetail.content}</div>
        <a
          href={newsDetail.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="dp-original-link"
        >
          원문 보기
        </a>
      </div>
    </div>
  );
};

export default DetailPage;
