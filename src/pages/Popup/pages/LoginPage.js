import React from 'react';
import logo from '../../../assets/img/cens-logo.svg';
import './LoginPage.css';

const LoginPage = ({ onPageChange }) => {
  return (
    <div className="page login-page">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <p className="intro">
        Get the latest news, summarized for you. Stay informed without the
        information overload.
      </p>
      <button className="google-signin" onClick={() => onPageChange('main')}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
