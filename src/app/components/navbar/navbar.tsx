'use client';
import React, { useEffect, useState } from 'react';
import { useAuth, AuthProvider } from '../../hooks/useAuth';
import Link from 'next/link';
import axios from 'axios';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // 로그아웃 함수
  async function logout() {
    try {
      await axios.post(
        'http://127.0.0.1:8080/admin/logout',
        {},
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.log('로그아웃 에러:', error);
    }
  }

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
          <button onClick={logout} className='menu-item'>
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
};

export default Navbar;
