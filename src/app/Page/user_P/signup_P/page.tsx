'use client';

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { usePathname, useRouter } from 'next/navigation'; //13버전부터는 navigation을 사용해야함

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    phoneNum: '',
    verificationCode: '',
    confirmPassword: '',
    detailAddress: '',
  });

  const [message, setMessage] = useState('');

  const router = useRouter();

  function onSubmit(e: any) {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const address = formData.address;
    const phoneNum = formData.phoneNum;

    formData.address = address + ' ' + formData.detailAddress;

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (email && password && address && phoneNum) {
      fetch('/member/member_join', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(
              '서버 응답이 실패했습니다. 상태 코드: ' + response.status
            );
          } else {
            alert(`회원가입을 축하합니다! ${email} 님`);
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('POST 요청 실패:', error);
        });
      console.log('회원가입 데이터:', formData);
    } else {
      alert('입력칸을 전부 입력해주세요!');
    }
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function addressSearch() {
    // Daum 우편번호 검색 API를 동적으로 불러오기
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = function () {
      // API가 로드된 후에 팝업 창 열기
      if (window.daum && window.daum.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data) {
            // 주소 선택 후 처리
            const selectedAddress = data.roadAddress || data.jibunAddress;
            setFormData({
              ...formData,
              address: selectedAddress,
              detailAddress: '', // 상세주소 초기화
            });
          },
        }).open();
      } else {
        console.error('Daum 우편번호 검색 API가 로드되지 않았습니다.');
      }
    };

    // 스크립트를 <head> 요소에 추가하여 API를 불러옵니다.
    document.head.appendChild(script);
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <label className='block mb-2'>이메일</label>
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>비밀번호</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>비밀번호 확인</label>
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>주소</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
          <label className='block mt-2 mb-2'>상세주소</label>
          <input
            type='text'
            name='detailAddress'
            value={formData.detailAddress}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
          <button
            type='button'
            onClick={addressSearch}
            className='mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'>
            주소검색
          </button>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>전화번호</label>
          <input
            type='tel'
            name='phoneNum'
            value={formData.phoneNum}
            onChange={handleInputChange}
            className='border rounded py-2 px-3 w-full'
          />
        </div>
        <button
          type='submit'
          className='py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600'>
          가입하기
        </button>
      </form>
      <div className='mt-4'>{message}</div>
    </div>
  );
}
