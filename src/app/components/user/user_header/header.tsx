'use client';

import React, { useState, useEffect } from 'react';
import Login from '../user_login/login';
import MyModal from '../user_login/MyModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 로그인 상태를 확인
    const loggedIn = sessionStorage.getItem('loggedInMember');
    console.log(loggedIn?.length);
    console.log(loggedIn);
    if (loggedIn?.length != null) {
      setIsLoggedIn(true);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    // 로그인 성공 시, isLoggedIn 상태를 변경하고 localStorage에 저장
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 시, isLoggedIn 상태를 변경하고 localStorage에서 제거
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
    sessionStorage.removeItem('loggedInMember');
  };

  return (
    <>
      <div className='header_top'>
        <div className='top_inner'>
          <ul className='top_list'>
            <li className='top_item'>
              <a href='/Page/user_P/sell_P' className='top_link'>
                물품등록
              </a>
            </li>
            <li className='top_item'>
              <a href='/Page/user_P/notice_P' className='top_link'>
                신고
              </a>
            </li>
            <li className='top_item'>
              <a href='/Page/user_P/signup_P' className='top_link'>
                회원가입
              </a>
            </li>
            <li className='top_item'>
              <a href='/Page/user_P/myage_P' className='top_link'>
                마이페이지
              </a>
            </li>

            {isLoggedIn ? (
              <li className='top_item'>
                <button onClick={handleLogout} className='top_link'>
                  로그아웃
                </button>
              </li>
            ) : (
              <li className='top_item'>
                <button onClick={openModal} className='top_link'>
                  로그인
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div>
        <div className='text-6xl text-center h-50 w-50 flex items-center justify-center'>
          <a href='/'>
            <img src='img/3.png' className='mx-auto my-auto' alt='' />
          </a>
        </div>
      </div>

      <MyModal isOpen={isModalOpen} closeModal={closeModal}>
        <div>
          <Login />
        </div>
      </MyModal>
    </>
  );
}
