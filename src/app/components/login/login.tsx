'use client';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Login() {
  const { isLoggedIn, login, logout } = useAuth();
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8080/admin/admin_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, adminPassword }),
      });

      const data = await response.text();

      if (response.ok) {
        login();
        router.push('/'); // 게시판 페이지로 리디렉션
      } else {
        setErrorMsg(data);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='Admin ID'
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
}

export default Login;
