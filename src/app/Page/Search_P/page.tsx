'use client';
import '../../globals.css';
import Search from '../../components/search/search';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../Page/Login_P/page';

export default function Search_P() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          {isLoggedIn ? <Search /> : <Login />}
        </div>
      </div>
    </div>
  );
}
