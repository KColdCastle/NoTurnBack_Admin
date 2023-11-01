'use client';

import './sidebar.css';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: '패션/뷰티', href: '/Page/user_P/beauty', current: true },
  { name: '취미/키덜트', href: '/Page/user_P/hobby', current: false },
  { name: '디지털/가구/가전', href: '/Page/user_P/digital', current: false },
  { name: '스포츠', href: '/Page/user_P/sport', current: false },
  { name: '자동차', href: '/Page/user_P/car', current: false },
  { name: '기타', href: '/Page/user_P/etc', current: false },
];

export default function sidebar() {
  const { isLoggedIn } = useAuth();

  const [employeeName, setEmployeeName] = useState('');
  useEffect(() => {
    // 클라이언트 사이드에서만 실행됩니다.
    const savedName = localStorage.getItem('employeeName');
    if (savedName) {
      setEmployeeName(savedName);
    }
  }, []);

  return (
    <div>
      <aside className='side-bar'>
        <section className='side-bar__icon-box'>
          <section className='side-bar__icon-1'>
            <div></div>
            <div></div>
            <div></div>
          </section>
        </section>
        <ul>
          <li className='admin'>
            {isLoggedIn ? (
              <span className='section-title'>{employeeName}</span>
            ) : (
              <span className='section-title'>로그인 해라</span>
            )}
            {/* 링크를 텍스트로 변경 */}
            <ul>
              <li>
                <a href='#'>text1</a>
              </li>
              <li>
                <a href='#'>text2</a>
              </li>
              <li>
                <a href='#'>text3</a>
              </li>
              <li>
                <a href='#'>text4</a>
              </li>
            </ul>
          </li>
          <li>
            <span className='section-title'>카테고리</span>{' '}
            {/* 링크를 텍스트로 변경 */}
            <ul>
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`nav-link ${item.current ? 'current' : ''}`}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <span className='section-title'>게시판</span>{' '}
            {/* 링크를 텍스트로 변경 */}
            <ul>
              <li>
                <Link href='/Page/Report_P'>신고/건의</Link>
              </li>
              <li>
                <a href='#'>text2</a>
              </li>
              <li>
                <a href='#'>text3</a>
              </li>
              <li>
                <a href='#'>text4</a>
              </li>
            </ul>
          </li>
          <li>
            <span className='section-title'>유저정보</span>{' '}
            {/* 링크를 텍스트로 변경 */}
            <ul>
              <li>
                <Link href='/Page/Search_P'>유저조회</Link>
              </li>
              <li>
                <Link href='/Page/State_P'>블랙리스트</Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}
