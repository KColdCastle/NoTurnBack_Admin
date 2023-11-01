'use client';
import '../../globals.css';
import Report from '../../components/report/report';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../Page/Login_P/page';

export default function Report_P() {
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          {isLoggedIn ? <Report /> : <Login />}
        </div>
      </div>
    </div>
  );
}
