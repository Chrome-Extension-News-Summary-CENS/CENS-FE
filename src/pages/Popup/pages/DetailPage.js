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
    return <div>뉴스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="page">
      <div className="header">
        <button onClick={() => onPageChange('main')}>← 뒤로</button>
        <h1>뉴스 상세</h1>
      </div>
      <div className="news-detail">
        <span className="news-category">{newsDetail.category}</span>
        <h2 className="news-title">{newsDetail.title}</h2>
        <p className="news-date">{newsDetail.createDate}</p>
        <div className="news-content">{newsDetail.content}</div>
        <a
          href={newsDetail.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="original-link"
        >
          원문 보기
        </a>
      </div>
    </div>
  );
};

export default DetailPage;
