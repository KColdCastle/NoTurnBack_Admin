'use client';

import React, {
  FormEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';

export default function login() {
  const myref = useRef<any>(null);
  const [show, setShow] = useState<boolean>(true);
  const [switchOn, setSwitch] = useState(false);
  const [adminId, setadminId] = useState<any>('');
  const [formData, setFormData] = useState({
    adminId: '',
    adminPassword: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminIdS = window.localStorage.getItem('adminId');
    const toggle: boolean =
      window.localStorage.getItem('switch') === 'TRUE' ? true : false;
    if (toggle && adminIdS != '') {
      setSwitch(true);
      setadminId(adminIdS);
      //document.getElementById("email").value =emailS
      myref.current.value = adminIdS;
    }
  }, []);
  function onChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  async function onSubmit(e: any) {
    e.preventDefault();
    const adminId = formData.adminId;
    const adminPassword = formData.adminPassword;

    if (adminId && adminPassword) {
      fetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // 로그인 성공 시 세션 정보를 받아옵니다.
            return response.json().then((data) => {
              console.log('세션 정보:', data.sessionInfo);
              alert(`안녕하세요! ${adminId} 님`);

              sessionStorage.setItem(
                'loggedInMember',
                JSON.stringify(data.sessionInfo)
              );

              console.log('세션 정보:', data.sessionInfo);
              window.location.href = '/';
            });
          } else {
            alert('로그인 실패');
            throw new Error(
              '서버 응답이 실패했습니다. 상태 코드: ' + response.status
            );
          }
        })
        .catch((error) => {
          console.error('POST 요청 실패:', error);
        });
    } else {
      alert('아이디나 패스워드를 확인해주세요!');
    }
  }
  function newJeansCookie(e: boolean) {
    //id 저장
    setSwitch(e);
    if (e && (adminId !== '' || adminId !== undefined || adminId !== null)) {
      window.localStorage.setItem('adminId', adminId);
      window.localStorage.setItem('switch', 'TRUE');
      console.log('TRUE');
    } else {
      window.localStorage.setItem('adminId', '');
      window.localStorage.setItem('switch', 'FALSE');
    }
  }

  const error = show ? (
    <></>
  ) : (
    <p className='text-red-500 text-xs italic'>
      이메일이 존재하지 않습니다 이메일을 다시 확인부탁 드립니다.
    </p>
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label
                  htmlFor='adminId'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  아이디
                </label>
                <div className='mt-2'>
                  <input
                    onChange={onChange}
                    onFocus={() => setShow(true)}
                    type='adminId'
                    id='adminId'
                    name='adminId'
                    ref={myref}
                    value={formData.adminId}
                    placeholder='아이디'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {error}
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'>
                    비밀번호
                  </label>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'>
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className='mt-2'>
                  <input
                    type='adminPassword'
                    id='adminPassword'
                    name='adminPassword'
                    onChange={onChange}
                    value={formData.adminPassword}
                    placeholder='비밀번호'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Sign in
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-500'>
              Not a member?{' '}
              <a
                href='#'
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
