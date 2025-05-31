import React from 'react';
import logo from '../../../assets/img/cens-logo.svg';
import './LoginPage.css';

const LoginPage = ({ onPageChange }) => {
  const handleGoogleLogin = () => {
    const redirectUrl = chrome.identity.getRedirectURL(); // 자동으로 https://<EXT_ID>.chromiumapp.org 반환
    console.log('Redirect URL:', redirectUrl);

    const authUrl = `https://api.cens.kro.kr:8080/oauth2/authorization/google`; // 실제 배포용
    // const authUrl = `http://localhost:8080/oauth2/authorization/google`; // 로컬 테스트용

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      function(redirectUrl) {
        if (chrome.runtime.lastError) {
          console.error('Login 실패:', chrome.runtime.lastError);
          return;
        }

        const url = new URL(redirectUrl);
        const accessToken = url.searchParams.get('accessToken');
        const refreshToken = url.searchParams.get('refreshToken');

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        if (accessToken && refreshToken) {
          // ✅ 토큰 저장
          chrome.storage.local.set(
            {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
            () => {
              console.log('✅ 토큰 저장 완료');

              // 페이지 전환
              if (onPageChange) {
                onPageChange('main'); // 로그인 성공 시 메인 페이지로 전환
              }
            },
          );
        } else {
          console.error('로그인 실패: 토큰을 찾을 수 없습니다.');
        }
      },
    );
  };



  return (
    <div className="page login-page">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <p className="intro">
        Get the latest news, summarized for you. Stay informed without the
        information overload.
      </p>
      <button className="logout-button" onClick={() => onPageChange('login')}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
