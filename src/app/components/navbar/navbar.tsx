'use client';

import React from 'react';
import Link from 'next/link';
import './Navbar.css';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className='navbar'>
      <div></div> {/* 이 공간은 왼쪽에 추가적인 요소를 넣기 위한 예시 공간 */}
      <Link href='/' className='navbar-brand'>
        JINDDOBAY
      </Link>
      <div className='navbar-links'>
        <Link href='/Page/Report_P' className='navbar-link' legacyBehavior>
          신고/건의 게시판
        </Link>
        <Link href='/Page/Create_P' className='navbar-link' legacyBehavior>
          신고/건의 작성
        </Link>

        {isLoggedIn ? (
          <button onClick={logout}>로그아웃</button>
        ) : (
          <Link href='/Page/Login_P' className='navbar-link'>
            로그인
          </Link>
        )}

        <Link href='/Page/Signup_P' className='navbar-link'>
          회원가입
        </Link>
      </div>
    </div>
  );
}
