'use client';

import React from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div></div> {/* 이 공간은 왼쪽에 추가적인 요소를 넣기 위한 예시 공간 */}
      <Link href='/' className='navbar-brand'>
        JINDDOBAY
      </Link>
      <div className='navbar-links'>
        <Link href='/Page/Login_P' className='navbar-link'>
          로그인
        </Link>
        <Link href='/Page/Signup_P' className='navbar-link'>
          회원가입
        </Link>
      </div>
    </div>
  );
}
