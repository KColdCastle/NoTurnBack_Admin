// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const API_BASE_URL = 'http://127.0.0.1:8080/admin';

// export default function Login() {
//   const [formData, setFormData] = useState({ adminId: '', adminPassword: '' });
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const login = async () => {
//     console.log('보내는 데이터:', formData);

//     try {
//       const response = await axios.post(`${API_BASE_URL}/login`, formData);
//       console.log('로그인 응답:', response.data);
//       console.log('리스폰:', response);

//       if (response.data.message === '로그인 성공') {
//         console.log('리스폰1:', response);

//         const userInfoResponse = await axios.get(
//           `${API_BASE_URL}/adminInfo/${formData.adminId}`
//         );

//         // 사용자 정보 응답을 출력
//         console.log('사용자 정보 응답 전체:', userInfoResponse.data);

//         if (userInfoResponse.data && userInfoResponse.data.employeeName) {
//           const employeeName = userInfoResponse.data.employeeName;
//           console.log('닉네임:', employeeName);
//           alert(`환영합니다 ${employeeName}님!`);
//           router.push('/');
//         } else {
//           setMessage('사용자 정보를 가져오는 데 실패했습니다.');
//         }
//       } else {
//         setMessage(response.data.message || '로그인 실패');
//       }
//     } catch (error) {
//       console.error('로그인 요청 실패:', error);
//       setMessage('서버 에러');
//     }
//   };

//   async function onSubmit(e: any) {
//     e.preventDefault();
//     try {
//       await login();
//     } catch (error) {
//       console.error('로그인 요청 실패:', error);
//       setMessage('서버 에러');
//     }
//   }

//   function handleInputChange(e: any) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div className='space-y-12'>
//           <h2 className='text-base font-semibold leading-7 text-gray-900'>
//             JINDDOPAY ADMIN LOGIN
//           </h2>

//           <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
//             <div className='sm:col-span-3'>
//               <label
//                 htmlFor='adminId'
//                 className='block text-sm font-medium leading-6 text-gray-900'>
//                 아이디
//               </label>
//               <div className='mt-2'>
//                 <input
//                   onChange={handleInputChange}
//                   placeholder='   ID'
//                   name='adminId'
//                   value={formData.adminId}
//                   type='text'
//                   className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                 />
//               </div>
//             </div>
//           </div>

//           <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
//             <div className='sm:col-span-3'>
//               <label
//                 htmlFor='adminPassword'
//                 className='block text-sm font-medium leading-6 text-gray-900'>
//                 비밀번호
//               </label>
//               <div className='mt-2'>
//                 <input
//                   onChange={handleInputChange}
//                   placeholder='   PassWord'
//                   name='adminPassword'
//                   value={formData.adminPassword}
//                   type='password'
//                   className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='mt-6 flex items-center justify-end gap-x-6'>
//           <button
//             type='submit'
//             className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'>
//             Login
//           </button>
//         </div>
//       </form>
//       <div className='mt-4'>{message}</div>
//     </div>
//   );
// }

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
      const { employeeName } = response.data; // Assuming the returned data has a name field for the employee name
      console.log('서버에서 받아온 사원 이름:', employeeName);

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
