'use client';

import React, {
  FormEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [switchOn, setSwitch] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const adminIdRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const savedAdminId = window.localStorage.getItem('adminId');
    const toggleValue = window.localStorage.getItem('switch');
    const toggle = toggleValue === 'TRUE' ? true : false;

    if (toggle && savedAdminId) {
      setSwitch(true);
      setAdminId(savedAdminId);
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/admin/login', {
        adminId,
        adminPassword,
      });
      console.log('로그인 데이터 전송:', { adminId, adminPassword });
      const { employeeName, accessToken, refreshToken } = response.data;
      console.log('서버에서 받아온 사원 이름:', employeeName);

      window.localStorage.setItem('accessToken', accessToken); // 추가된 코드
      window.localStorage.setItem('refreshToken', refreshToken); // 추가된 코드

      setEmployeeName(employeeName);
      setIsModalOpen(true);
    } catch (error) {
      console.log('로그인 에러:', error);
    }
  }

  function newJeansCookie(e: boolean) {
    setSwitch(e);
    if (e) {
      window.localStorage.setItem('adminId', adminId);
      window.localStorage.setItem('switch', 'TRUE');
    } else {
      window.localStorage.setItem('adminId', '');
      window.localStorage.setItem('switch', 'FALSE');
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    router.push('/');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          ref={adminIdRef}
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder='Admin ID'
        />
        <input
          type='password'
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder='Password'
        />
        <Switch.Group>
          <Switch.Label className='mr-4'>아이디 저장</Switch.Label>
          <Switch
            checked={switchOn}
            onChange={newJeansCookie}
            className={`${
              switchOn ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}>
            <span className='sr-only'>Switch</span>
            <span
              className={`${
                switchOn ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </Switch.Group>
        <button type='submit'>로그인</button>
      </form>

      {isModalOpen && (
        <div className='modal-bg'>
          <div className='modal'>
            <p>환영합니다 {employeeName}님!</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}
