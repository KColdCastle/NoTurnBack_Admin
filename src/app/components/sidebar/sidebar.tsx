import './sidebar.css';
import React from 'react';
import Link from 'next/link';

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
            <a href='#'>카테고리</a>
            <ul>
              <li>
                <a href='#'>패션/뷰티</a>
              </li>
              <li>
                <a href='#'>취미/키덜트</a>
              </li>
              <li>
                <a href='#'>디지털/가전/가구</a>
              </li>
              <li>
                <a href='#'>스포츠</a>
              </li>
              <li>
                <a href='#'>자동차</a>
              </li>
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
