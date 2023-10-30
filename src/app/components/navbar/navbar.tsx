'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8080/logout', {
        adminId: 'yourAdminIdHere',
      }); // NOTE: You will need to get the correct adminId.
      window.localStorage.removeItem('token');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    const response = await axios.post(
      'http://127.0.0.1:8080/admin/token/refresh',
      {
        refreshToken: 'yourRefreshTokenHere',
      }
    );
    const newToken = response.data.token;
    window.localStorage.setItem('token', newToken);
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
        {isLoggedIn ? (
          <>
            <button onClick={refreshToken} className='menu-item'>
              토큰 갱신
            </button>
            <button onClick={handleLogout} className='menu-item'>
              로그아웃
            </button>
          </>
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
