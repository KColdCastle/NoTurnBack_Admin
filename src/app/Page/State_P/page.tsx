'use client';

import '../../globals.css';
import State from '../../components/state/statetest';
import { useAuth } from '../../hooks/useAuth';
import Login from '../../Page/Login_P/page';

export default function State_P() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          {isLoggedIn ? <State /> : <Login />}
        </div>
      </div>
    </div>
  );
}
