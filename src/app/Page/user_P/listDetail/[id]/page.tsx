'use client';

import React, { useState, useEffect } from 'react';
import ImageViewer from '../../../../components/user/digitalImg/digitalImg';
import Bidding from '../../../../components/user/biding/biding';
import Timer from '../../../../components/user/timer/timer';
import SendModal from '../../../../components/user/senderModal/senderModal';

export default function Detail({ params }: { params: { id: string } }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState<any>({});
  const [nick, setNick] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<any>(false);

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

  function Main() {
    return (
      <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
        <div>
          <a href='/'>
            <div className='top-12 mb-6 ml-[980px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
                />
              </svg>
            </div>
          </a>
        </div>
        <div className='mx-auto flex flex-col lg:flex-row lg:max-w-7xl lg:px-8'>
          <ImageViewer id={id} />

          <div className='lg:w-1/2'>
            <div className='lg:pl-4'>
              <div className='lg:max-w-lg'>
                <div key={postData.id} className='group'>
                  <p className='text-base font-semibold leading-7 text-indigo-600'>
                    판매자: {nick}
                  </p>
                  <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    제목: {postData.post.title}
                  </h1>

                  <ul role='list' className='mt-8 space-y-8 text-gray-600'>
                    <li className='flex gap-x-3'>
                      <div
                        className='mt-1 h-5 w-5 flex-none text-indigo-600'
                        aria-hidden='true'
                      />
                      {/* <span>
                        <strong className="font-semibold text-gray-900">입찰건수: Bid Count</strong>
                      </span> */}
                    </li>
                    <li className='flex gap-x-3'>
                      <div
                        className='mt-1 h-5 w-5 flex-none text-indigo-600'
                        aria-hidden='true'
                      />
                      <span>
                        <strong className='font-semibold text-gray-900'>
                          {' '}
                          <Timer endDate={parseInt(postData.post.endDate)} />
                        </strong>
                      </span>
                    </li>
                    <li className='flex gap-x-3'>
                      <div
                        className='mt-1 h-5 w-5 flex-none text-indigo-600'
                        aria-hidden='true'
                      />
                      <span>
                        <strong className='font-semibold text-gray-900'>
                          시작가: {postData.post.starting_price}원
                        </strong>
                      </span>
                    </li>
                  </ul>
                  <div>
                    {isExpired ? (
                      <button
                        className='bg-zinc-400 w-[500px] border-2 text-white px-4 py-4 rounded-lg '
                        onClick={handleBidding}
                        disabled={true}>
                        입찰이 끝났습니다
                      </button>
                    ) : sessionEmail === email ? (
                      <button
                        className='bg-zinc-400 w-[500px] border-2 text-white px-4 py-4 rounded-lg '
                        onClick={handleBidding}
                        disabled={true}>
                        같은 이메일은 입찰할 수 없습니다
                      </button>
                    ) : !sessionEmail ? (
                      <div>
                        <button
                          className='bg-black w-[500px] border-2 text-white px-4 py-4 rounded-lg hover:bg-zinc-700'
                          disabled>
                          로그인 후 이용해주세요
                        </button>
                      </div>
                    ) : (
                      <button
                        className='bg-black w-[500px] border-2 text-white px-4 py-4 rounded-lg hover:bg-zinc-700'
                        onClick={handleButton}
                        disabled={false}>
                        입찰하기
                      </button>
                    )}
                  </div>
                  <div className='flex justify-center mt-4'>
                    {sessionEmail ? (
                      <div className='flex justify-center mt-4'>
                        {sessionEmail === email ? (
                          <button
                            className='w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg cursor-not-allowed'
                            disabled={true}>
                            판매자 본인이에요
                          </button>
                        ) : (
                          <button
                            className='w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg hover:bg-zinc-300'
                            onClick={handleOpenModal}>
                            문의하기
                          </button>
                        )}
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
                    ) : (
                      <div className='flex justify-center mt-4'>
                        <button
                          className='w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg cursor-not-allowed'
                          disabled={true}>
                          로그인 후 이용해주세요
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
                  입찰시 주의사항
                </h2>
                <p className='mt-6'></p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex min-h-screen flex-row '>
          <div className='main -ml-48 flex flex-grow flex-col p-4  md:ml-0'>
            <div className='flex items-center justify-center bg-white text-center text-5xl font-bold '>
              {postData.post.content}
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
          {' '}
          데이터를 불러오는중입니다 잠시만 기달려주세요
        </div>
      ) : (
        <Main />
      )}
    </>
  );
}
