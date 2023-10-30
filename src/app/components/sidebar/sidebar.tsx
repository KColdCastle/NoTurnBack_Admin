'use client';

import './sidebar.css';
import React from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';

const navigation = [
  { name: '패션/뷰티', href: '/Page/user_P/beauty', current: true },
  { name: '취미/키덜트', href: '/Page/user_P/hobby', current: false },
  { name: '디지털/가구/가전', href: '/Page/user_P/digital', current: false },
  { name: '스포츠', href: '/Page/user_P/sport', current: false },
  { name: '자동차', href: '/Page/user_P/car', current: false },
  { name: '기타', href: '/Page/user_P/etc', current: false },
];

export default function sidebar() {
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
            <a href='#'>
              <i className='fa-solid fa-cat'></i> 관리자
            </a>
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
            <a href='/Page/user_P/beauty_P'>카테고리</a>
            <ul>
              {/* <li>
                <a href='/Page/user_P/beauty_P'>패션/뷰티</a>
              </li>
              <li>
                <a href='/Page/user_P/car_P'>취미/키덜트</a>
              </li>
              <li>
                <a href='/Page/user_P/digital_P'>디지털/가전/가구</a>
              </li>
              <li>
                <a href='/Page/user_P/etc_P'>스포츠</a>
              </li>
              <li>
                <a href='/Page/user_P/sport_P'>자동차</a>
              </li> */}
              <Disclosure as='nav' className='bg-white mb-10'>
                <div className=''>
                  <div className='flex justify-center items-center'>
                    <div className='flex-item'>
                      <div className='link-container space-x-6'>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={`nav-link ${
                              item.current ? 'current' : ''
                            } flex-auto text-black font-bold `}
                            aria-current={item.current ? 'page' : undefined}>
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className=''></div>
                </div>
              </Disclosure>
            </ul>
          </li>
          <li></li>
          <li>
            <a href='#'>게시판</a>
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
            <a href='#'>유저정보</a>
            <ul>
              <li>
                <Link href='/Page/Search_P'>유저조회</Link>
              </li>
              <li>
                <Link href='/Page/State_P'>블랙리스트</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href='#'>TOP10</a>
            <ul>
              <li>
                <a href='../Page/searchBlack_P'>text1</a>
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
        </ul>
      </aside>
    </div>
  );
}
