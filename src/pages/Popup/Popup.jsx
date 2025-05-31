import React, { useState } from 'react';
import './Popup.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SettingsPage from './pages/SettingsPage';
import CategoryEditPage from './pages/CategoryEditPage';

const Popup = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const handlePageChange = (page, newsId = null) => {
    setCurrentPage(page);
    if (newsId) {
      setSelectedNewsId(newsId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onPageChange={handlePageChange} />;
      case 'main':
        return <MainPage onPageChange={handlePageChange} />;
      case 'detail':
        return <DetailPage onPageChange={handlePageChange} newsId={selectedNewsId} />;
      case 'settings':
        return <SettingsPage onPageChange={handlePageChange} />;
      case 'categoryEdit':
        return <CategoryEditPage onPageChange={handlePageChange} />;
      default:
        return <LoginPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
};

export default Popup;
