'use client';

import React, { useEffect, useState } from 'react';
import '../../../components/user/user.css';
export default function MyPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ConfirmPassword: '',
    phoneNum: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('loggedInMember');
    let email = null; // email 객체를 초기화합니다.

    if (sessionData) {
      const loggedInData = JSON.parse(sessionData); // 세션 데이터 파싱
      email = loggedInData.email; // email 값을 추출합니다.
      console.log(email);
    }

    fetch(`/member/member_info/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFormData(res[0]);
        console.log(1, res);
      });
  }, []);

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function passwordChange(e: any) {
    e.preventDefault();

    const sessionData = sessionStorage.getItem('loggedInMember');
    let email: string | null = null; // email 객체를 초기화합니다.

    if (sessionData) {
      const loggedInData = JSON.parse(sessionData); // 세션 데이터 파싱
      email = loggedInData.email; // email 값을 추출합니다.
      console.log(email);
    }

    if (formData.password != formData.ConfirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 비밀번호를 다시 입력해주세요!');

      return;
    } else {
      fetch(`/member/member_info/${email}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            console.log(formData);
            throw new Error('서버 응답이 실패했습니다.' + response.status);
          } else {
            alert(`${email}님의 비밀번호가 성공적으로 변경되었습니다`);
          }
        })
        .catch((error) => {
          console.log('UPDATE 요청 실패!:', error);
        });
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>마이페이지</h2>
      <div className='mb-4'>
        <label className='block mb-2'>비밀번호</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          className='border rounded py-2 px-3 w-full'
        />
        <label className='block mt-2 mb-2'>비밀번호 확인</label>
        <input
          type='password'
          name='ConfirmPassword'
          value={formData.ConfirmPassword}
          onChange={handleInputChange}
          className='border rounded py-2 px-3 w-full'
        />
        <button
          type='button'
          onClick={passwordChange}
          className='mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'>
          비밀번호 변경
        </button>
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>전화번호</label>
        <input
          type='text'
          name='phoneNum'
          value={formData.phoneNum}
          onChange={handleInputChange}
          className='border rounded py-2 px-3 w-full'
        />
        <label className='block mb-2'>주소</label>
        <input
          type='text'
          name='address'
          value={formData.address}
          onChange={handleInputChange}
          className='border rounded py-2 px-3 w-full'
        />
      </div>
    </div>
  );
}
