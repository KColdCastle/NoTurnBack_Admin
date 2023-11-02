'use client';

import React, { useState, useEffect } from 'react';
import ImageViewer from '../../../../components/user/digitalImg/digitalImg';
import Timer from '../../../../components/user/timer/timer';
import SendModal from '../../../../components/user/senderModal/senderModal';
import { useRouter } from 'next/navigation';
import '../listDetail.css';
import { useAuth } from '../../../../hooks/useAuth';
import Login from '../../../../Page/Login_P/page';

export default function Detail({ params }: { params: { id: string } }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState<any>({});
  const [nick, setNick] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<any>(false);
  const router = useRouter();

  const id = params.id;

  useEffect(() => {
    const sessionEmail = sessionStorage.getItem('loggedEmail');
    setSessionEmail(sessionEmail);
  }, []);

  const openModal2 = () => {
    setIsModal2Open(true);
  };
  const closeModal2 = () => {
    setIsModal2Open(false);
  };

  useEffect(() => {
    getData(id);
  }, []);

  useEffect(() => {
    // console.log("endDate");
    // console.log(postData)
  }, [postData]);

  async function getData(id: any) {
    const detailData = await fetch(`/api/findDetail/${id}`)
      .then((data) => data.json())
      .then((data) => {
        return data.result;
      })
      .catch((error) => {
        console.error('서버 요청 실패', error);
      });
    setNick(detailData[1].nickname);
    setPostData(detailData[0]);
    setEmail(detailData[0].post.email);
    const endTime = detailData[0]?.post.endDate;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (endTime && now > endTime) {
        setIsExpired(true);
        handleBidding();
        clearInterval(interval);
      }
    }, 1000);
  }

  async function deletePost(postId: string) {
    try {
      const response = await fetch(`/api/findDetail/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('삭제성공');
        router.back();
      } else {
        const data = await response.json();
        alert('Error:');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleBidding = async () => {
    try {
      const response = await fetch(`/api/updatePost/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isExpired: true }),
      });
      if (response.ok) {
        console.log('성공');
      }
    } catch (error) {
      console.error('실패', error);
    }
  };
  const handleButton = () => {
    setIsOpen(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    openModal2();
  };

  function goBack() {
    router.back();
  }
  function Main() {
    return (
      <div className='container1'>
        <div className='main-content'>
          <div className='center-content'>
            <div>
              <div className='relative-container'>
                <div>
                  <div className='top-icon' onClick={goBack}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='icon-svg'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
                      />
                    </svg>
                  </div>
                </div>
                <div className='flex-container flex-container-lg'>
                  <ImageViewer id={id} />

                  <div className='lg-content'>
                    <div>
                      <div key={postData.id} className='group'>
                        <h1 className='title-text'>
                          제목: {postData.post.title}
                        </h1>
                        <p className='indigo-text'>판매자: {nick}</p>
                        <ul role='list'>
                          <li className='list-item'>
                            <div
                              className='list-item-icon'
                              aria-hidden='true'
                            />
                            <span className='font-strong'>
                              <Timer
                                endDate={parseInt(postData.post.endDate)}
                              />
                            </span>
                          </li>
                          <li className='list-item'>
                            <div
                              className='list-item-icon'
                              aria-hidden='true'
                            />
                            <span className='font-strong'>
                              시작가 :{' '}
                              {Number(
                                postData.post.starting_price
                              ).toLocaleString('ko-KR')}
                              원
                            </span>
                          </li>
                        </ul>
                        <div>
                          {isModal2Open && (
                            <SendModal
                              id={id}
                              isModal2Open={isModal2Open}
                              closeModal2={closeModal2}
                              nickname={nick}
                              email={email}
                            />
                          )}
                        </div>
                        <div>
                          <button
                            className='delete-button'
                            onClick={() => deletePost(id)}>
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-min-screen'>
                <div className='main-content'>
                  <div className='center-text-large'>
                    {postData.post.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {postData.post == undefined ? (
        <div className='text-center text-5xl'>
          데이터를 불러오는중입니다 잠시만 기달려주세요
        </div>
      ) : (
        <Main />
      )}
    </>
  );
}
