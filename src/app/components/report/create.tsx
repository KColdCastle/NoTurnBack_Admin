'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const backGroundStyle = {
  // backgroundImage: "url('/img/경매이미지.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat', // 이미지 반복 없음
};

export default function ReportList() {
  const [sessionNickname, setSessionNickname] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');

  // 올리는 사람 닉네임 세션에담아 가져오는 부분
  useEffect(() => {
    // sessionStorage에서 nickname 가져오기
    const user = JSON.parse(sessionStorage.getItem('loggedInMember') || '{}');
    // JSON.parse(...)는 가져온 문자열 데이터를 JavaScript 객체로 변환
    if (user.nickname) {
      // sessionStorage에 nickname이 있는 경우, 상태(State)에 설정하여 화면에 표시
      setSessionNickname(user.nickname);
      setSessionEmail(user.email);
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      let email: any = sessionStorage.getItem('email');

      data.append('email', email);
      const send = await fetch('api/report', {
        method: 'POST',
        body: data,
        // headers: {
        // "Content-Type": `application/json`, // application/json 타입 선언
        // }
      })
        .then((res) => {
          if (res.status == 200)
            //성공시 처리
            console.log('res:', res);
          window.location.href = '/'; //Home 으로 이동
          //alert("Message : " +200)
        })
        .catch((e) => {
          throw e;
        })
        .finally();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={backGroundStyle}>
          <div className='mx-[10%]'>
            <div className='tab-bar'>
              <div className='tab'>
                <span className='tab_hi'>신고 하기</span>
              </div>
            </div>

            <div className='mx-[10%]'>
              <div className='border-gray-900/10 pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='username'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      올리는 사람 닉네임
                    </label>
                    <div className='mt-2 w-[448px]'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset'>
                        <input
                          type='text'
                          name='nickname'
                          id='username'
                          autoComplete='username'
                          className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                          // onChange={handleEmailChange} // 입력 필드 값이 변경될 때 호출되는 함수
                          // defaultValue={sessionNickname}
                          defaultValue={sessionNickname} // 입력 필드의 값은 상태(State)에서 가져온다.
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      제목
                    </label>
                    <div className='mt-2 w-[448px]'>
                      <input
                        id='titles'
                        name='title'
                        type='text'
                        placeholder='제목'
                        autoComplete='off'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset'
                      />
                    </div>
                  </div>
                </div>

                <div className='border-gray-900/10 pb-12'>
                  <div className='mt-6'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      내용
                    </label>
                    <textarea
                      id='description'
                      name='content'
                      rows={3}
                      placeholder='내용을 입력해 주세요'
                      className='block w-full rounded-md border-0 py-1.5 h-[80px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                      defaultValue={''}
                    />
                  </div>

                  <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button
                      type='submit'
                      className='rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
                      신고 등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
