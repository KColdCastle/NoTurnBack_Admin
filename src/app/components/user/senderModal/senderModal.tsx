'use client';
/* eslint-disable react-hooks/rules-of-hooks */

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
// Modal.setAppElement('#__next'); // 웹 접근성을 지원하는 기능을 사용할 때 필요한 설정

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    border: 'none',
    padding: '20px',
    height: '60%', // 모달 창의 높이를 조절
    width: '30%', // 모달 창의 너비 조정
    maxWidth: '1000px', // 모달 창의 최대 너비 조정
  },
};

interface ModalProps {
  isModal2Open: boolean;
  id: string;
  email: string;
  nickname: string;
  closeModal2: () => void;
}

export default function SendModal({
  isModal2Open,
  closeModal2,
  id,
  email,
  nickname,
}: ModalProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [sessionNickname, setSessionNickname] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // sessionStorage에서 Email 가져오기
    const userEmail = sessionStorage.getItem('loggedEmail') || '{}';
    const user = sessionStorage.getItem('loggedInfo') || '{}';

    console.log(userEmail);
    if (userEmail) {
      // sessionStorage에 nickname이 있는 경우, 상태(State)에 설정하여 화면에 표시
      setSessionEmail(userEmail);
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const title = formData.title;
    // const content = formData.content;
    // const f = await new FormData(event.currentTarget);

    // if(title && content) {
    try {
      const f = new FormData(event.currentTarget);
      const jsonData = [
        {
          postid: id,
          sender: sessionEmail,
          receiver: email,
          title: f.get('title')?.toString(),
          content: f.get('content')?.toString(),
        },
      ];

      await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(jsonData),
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
            // 쪽지가 성공적으로 보내진 경우
            closeModal2(); // 모달 창을 닫습니다
          }
          console.log('response: ', response);
        })
        .catch((error) => {
          console.error('POST 요청 실패:', error);
        })
        .finally();
    } catch (error) {
      console.log(error);
      alert('쪽지 전송에 실패하였습니다');
    }
    // }

    // console.log(jsonData)
    //     const send = await fetch('http://localhost:3000/api/message',{
    //     method: 'POST',
    //     body : JSON.stringify(jsonData),
    //     headers: {
    //       "Content-Type": `application/json`, // application/json 타입 선언
    //     }
    //     }).then((res) =>{
    //     //성공시 처리
    //     if(res.status == 200)
    //         window.location.href= '/' //Home 으로 이동
    //         //alert("Message : " +200)

    //   }).catch((e) => {throw e}).finally()
    // }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      <Modal
        isOpen={isModal2Open}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel='Auction Bid Modal'>
        <form onSubmit={onSubmit}>
          <div className='text-center'>
            <h2 className=' font-semibold mb-4'> 문의 </h2>
            <div className='grid-cols-1 gap-4'>
              <div className='flex flex-col mt-14 mb-10'>
                <div className='flex items-center'>
                  <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                    판매자 :{' '}
                  </h3>
                  <div className='text-xl w-30 px-3 py-2 focus:outline-none '>
                    {nickname}
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col mt-4">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold whitespace-nowrap mr-5">본인 닉네임</h3>
                                    <span className="text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">50,000 원</span>
                                </div>
                            </div> */}
              <div className='flex flex-col mt-4 mb-10'>
                <div className='flex items-center'>
                  <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                    제목
                  </h3>
                  {/* <span className="text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">아니 너무비싸다고</span> */}
                  <input
                    type='text' // input 타입을 text로 설정
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                    className='text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    placeholder='제목을 입력하세요'
                  />
                </div>
              </div>
              <div className='flex flex-col col-span-2 mt-4 mb-10'>
                <div className='flex items-center'>
                  <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                    내용
                  </h3>
                  {/* <form onSubmit={handleSubmit}> */}
                  <textarea
                    rows={5}
                    name='content'
                    onChange={handleAreaChange}
                    value={formData.content}
                    // onChange={(e) => setBidAmount(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {/* </form> */}
                </div>
              </div>

              <div className='flex-col-1 col-span-2 mt-4 '>
                <button
                  type='submit'
                  className='w-[150px] h-12 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'>
                  쪽지 보내기
                </button>
                <button
                  className='w-[150px] h-12 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'
                  onClick={closeModal2}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
