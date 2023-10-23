'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import { useTokenValidityCheck } from '../../hooks/useTokenValidityCheck'; // 경로는 실제 훅 파일 위치에 따라 조정해주세요.

export default function Navbar() {
  const isTokenValid = useTokenValidityCheck();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isTokenValid) {
      setIsLoggedIn(false);
      // 서버에 로그아웃 요청을 보낼 수도 있습니다.
      // 예: axios.post('/logout');
    } else {
      setIsLoggedIn(true);
    }
  }, [isTokenValid]);

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    // 서버에 로그아웃 요청을 보내는 로직을 추가할 수 있습니다.
    // 예: axios.post('/logout');
    window.location.href = '/'; // 로그인 페이지로 리디렉션
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-left'></div>
      <Link href='/' className='navbar-title'>
        JINDDOBAY
      </Link>
      <div className='navbar-menu'>
        <Link href='/Page/Report_P' className='menu-item'>
          신고/건의 게시판
        </Link>

        {/* isLoggedIn 상태를 기반으로 로그아웃 버튼 또는 로그인/회원가입 버튼을 표시 */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className='menu-item logout-btn'>
            로그아웃
          </button>
        ) : (
          <>
            <Link href='/Page/Login_P' className='menu-item'>
              로그인
            </Link>
            <Link href='/Page/Signup_P' className='menu-item'>
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
