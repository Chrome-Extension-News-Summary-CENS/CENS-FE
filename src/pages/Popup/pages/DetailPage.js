import React, { useState } from 'react';
import './DetailPage.css';

const DetailPage = ({ onPageChange, newsId }) => {
  const [newsDetail, setNewsDetail] = useState(null); // 서버에서 받아올 뉴스 상세 데이터

  return (
    <div className="page">
      <div className="header">
        <button onClick={() => onPageChange('main')}>← 뒤로가기</button>
      </div>
      {newsDetail && (
        <div className="news-detail">
          <h2>{newsDetail.title}</h2>
          <p>{newsDetail.content}</p>
          <a
            href={newsDetail.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            원문 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
