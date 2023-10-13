'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { usePathname, useRouter } from 'next/navigation';
import { url } from 'inspector';

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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='col-span-full'></div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              JINDDOPAY ADMIN SIGN UP
            </h2>
            <p className='mb-7 mt-1 text-sm leading-6 text-red-600' space-y-12>
              * 정확한 정보 기입 부탁드립니다. *
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='adminId'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  아이디
                </label>
                <div className='mt-2'>
                  <input
                    onChange={handleInputChange}
                    placeholder='   ID'
                    name='adminId'
                    value={formData.adminId}
                    type='adminId'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='adminPassword'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  비밀번호
                </label>
                <div className='mt-2'>
                  <input
                    onChange={handleInputChange}
                    placeholder='   PassWord'
                    name='adminPassword'
                    value={formData.adminPassword}
                    type='adminPassword'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='eName'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  사원이름
                </label>
                <div className='mt-2'>
                  <input
                    onChange={handleInputChange}
                    placeholder='   Employee Name'
                    name='employeeName'
                    value={formData.employeeName}
                    type='employeeName'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'></h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className='mt-10 space-y-10'></div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'>
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Save
          </button>
        </div>
      </form>
      <div className='mt-4'>{message}</div>
    </div>
  );
}
