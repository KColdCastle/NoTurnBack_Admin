// 'use client';
// import React, {
//   FormEvent,
//   useState,
//   useEffect,
//   useRef,
//   ChangeEvent,
// } from 'react';

// export default function Login() {
//   const myref = useRef<HTMLInputElement>(null);
//   const [show, setShow] = useState<boolean>(true);
//   const [switchOn, setSwitch] = useState(false);
//   const [adminId, setaAminId] = useState<string>('');
//   const [formData, setFormData] = useState({
//     adminId: '',
//     adminPassword: '',
//     employeeName: '',
//   });
//   console.log('0번 폼데이따', formData);

//   useEffect(() => {
//     const adminIdS = window.localStorage.getItem('email');
//     const toggle: boolean =
//       window.localStorage.getItem('switch') === 'TRUE' ? true : false;
//     if (toggle && adminIdS) {
//       setSwitch(true);
//       setaAminId(adminIdS);
//       if (myref.current) {
//         myref.current.value = adminIdS;
//       }
//     }
//   }, []);

//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { adminId, adminPassword } = formData;

//     if (adminId && adminPassword) {
//       try {
//         const response = await fetch(`/api/adminLoginS`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             accept: 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.result && data.result.employeeName) {
//             sessionStorage.setItem('loggedInfo', data.result.employeeName);
//             sessionStorage.setItem('loggedEmail', data.result.adminId);
//             alert(data.result.employeeName + '님 환영합니다');
//             location.href = '/';
//           } else {
//             alert('다시 시도해주세요!');
//           }
//         } else {
//           alert('로그인 실패!');
//         }
//       } catch (error) {
//         alert('오류 발생: ' + error);
//       }
//     }
//   };

//   const SignUp = () => {
//     window.location.href = 'signup';
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           onFocus={() => setShow(true)}
//           type='text'
//           id='adminId'
//           name='adminId'
//           ref={myref}
//           value={formData.adminId}
//           placeholder='이메일 또는 아이디'
//         />
//         <input
//           type='password'
//           id='password'
//           name='adminPassword'
//           onChange={onChange}
//           value={formData.adminPassword}
//           placeholder='비밀번호'
//         />
//         <button type='submit'>Login</button>
//       </form>
//       {!show && (
//         <p className='text-red-500 text-xs italic'>
//           이메일이 존재하지 않습니다. 이메일을 다시 확인해주세요.
//         </p>
//       )}
//     </div>
//   );
// }
