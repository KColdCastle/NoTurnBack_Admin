// 'use client';

// import React, {
//   FormEvent,
//   FocusEvent,
//   useState,
//   useEffect,
//   useRef,
//   ChangeEvent,
// } from 'react';
// import { Switch } from '@headlessui/react';
// import { useRouter } from 'next/navigation'; // `next/navigation`이 아니라 `next/router`를 사용해야 합니다.
// // import { useAuth } from '../../hooks/useAuthTest2';/
// import axios from 'axios';
// import './login.css';

// const Login: React.FC = () => {
//   const { setIsLoggedIn } = useAuth();

//   const [adminId, setAdminId] = useState('');
//   const [adminPassword, setAdminPassword] = useState('');
//   const [employeeName, setEmployeeName] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     // 페이지 로드 시 서버에 로그인 상태 확인
//     const JSESSIONID = getCookie('JSESSIONID');
//     if (JSESSIONID) {
//       axios
//         .get('http://127.0.0.1:8080/admin/checkLoginStatus', {
//           withCredentials: true,
//         })
//         .then((response) => {
//           setIsLoggedIn(response.data.loggedIn);
//         })
//         .catch((error) => {
//           console.error('로그인 상태 확인 중 오류 발생:', error);
//           setIsLoggedIn(false);
//         });
//     }
//   }, []);

//   const getCookie = (name: string) => {
//     const value = '; ' + document.cookie;
//     const parts = value.split('; ' + name + '=');
//     if (parts.length === 2) return parts.pop()?.split(';').shift();
//   };

//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8080/admin/login', {
//         adminId,
//         adminPassword,
//       });
//       const { employeeName } = response.data;
//       setEmployeeName(employeeName);
//       setIsModalOpen(true);
//       localStorage.setItem('isLoggedIn', 'true');
//     } catch (error) {
//       console.log('로그인 에러:', error);
//     }
//   }

//   function closeModal() {
//     setIsModalOpen(false);
//     setIsLoggedIn(true); // 여기서 로그인 성공 함수를 호출합니다.

//     router.push('/');
//   }
//   return (
//     <div className='container1'>
//       <form onSubmit={onSubmit}>
//         <input
//           value={adminId}
//           onChange={(e) => setAdminId(e.target.value)}
//           placeholder='Admin ID'
//         />
//         <input
//           type='password'
//           value={adminPassword}
//           onChange={(e) => setAdminPassword(e.target.value)}
//           placeholder='Password'
//         />
//         <button type='submit'>로그인</button>
//       </form>

//       {isModalOpen && (
//         <div className='modal-bg'>
//           <div className='modal'>
//             <p className='modal-font'>
//               ✨ 관리자 {employeeName} 님! ✨
//               <button onClick={closeModal}>확인</button>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
