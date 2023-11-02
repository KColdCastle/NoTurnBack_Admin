'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { url } from 'inspector';
import './signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    employeeName: '',
    adminId: '',
    adminPassword: '',
    // AdminPassword1: '',
  });
  const [message, setMessage] = useState('');

  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
    const employeeName = formData.employeeName;
    const adminId = formData.adminId;
    const adminPassword = formData.adminPassword;

    // formData.eNumber = eNumber + ' ' + formData.eNumber;

    // if (formData.AdminPassword !== formData.confirmPassword) {
    //   alert('비밀번호가 일치하지 않습니다.');
    //   return;
    // }

    if (adminId && adminPassword && employeeName) {
      fetch('http://127.0.0.1:8080/admin/admin_join', {
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
            alert(`회원가입을 축하합니다! ${employeeName} 님`);
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
  function push(e: any) {
    router.push('/');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className='form-font'>JINDDOPAY ADMIN SIGN UP</h2>
        <p className='message'>* 정확한 정보 기입 부탁드립니다. *</p>

        <input
          onChange={handleInputChange}
          placeholder='ID'
          name='adminId'
          value={formData.adminId}
          type='text'
        />

        <input
          onChange={handleInputChange}
          placeholder='PassWord'
          name='adminPassword'
          value={formData.adminPassword}
          type='password'
        />

        <input
          onChange={handleInputChange}
          placeholder='Employee Name'
          name='employeeName'
          value={formData.employeeName}
          type='text'
        />

        <div>
          <button onClick={push} type='button'>
            Cancel
          </button>
          <button type='submit'>Save</button>
        </div>
      </form>
      <div className='message'>{message}</div>
    </div>
  );
}
