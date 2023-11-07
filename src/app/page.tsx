'use client';

import Search from './components/search/search';
import Report from './components/report/report';
import State from './components/state/state';
import Category from './Page/user_P/[...slug]/page';


import './globals.css';
import Login from './Page/Login_P/page';
import { useAuth } from './hooks/useAuth';

export default function main() {
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기
  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          {isLoggedIn ? (
            <div className='preview-content'>
              <div className='preview-wrapper'>
                <div
                  className='preview'
                  onClick={() => (window.location.href = '/Page/Report_P')}>
                  <div className='scaled-content'>
                    <Report />
                  </div>
                </div>

                <p className='preview-title'>🐹 신고 게시판</p>
              </div>
              <div className='preview-wrapper'>
                <div
                  className='preview'
                  onClick={() =>
                    (window.location.href = '/Page/user_P/beauty')
                  }>
                  <div className='scaled-content'>
                    <Category params={{ slug: ['desiredCategory'] }} />
                  </div>
                </div>
                <p className='preview-title'>🐳 카테고리</p>
              </div>
              <div className='preview-wrapper'>
                <div
                  className='preview'
                  onClick={() => (window.location.href = '/Page/Search_P')}>
                  <div className='scaled-content'>
                    <Search />
                  </div>
                </div>
                <p className='preview-title'>🦄 유저 정보</p>
              </div>
              <div className='preview-wrapper'>
                <div
                  className='preview'
                  onClick={() => (window.location.href = '/Page/State_P')}>
                  <div className='scaled-content'>
                    <State />
                  </div>
                </div>
                <p className='preview-title'>😈 블랙리스트 유저 </p>
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}
