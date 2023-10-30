'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { TransactionInfo2 } from '@/typeModules';

export default function Bidding({
  closeModal,
  isOpen,
  postId,
}: TransactionInfo2) {
  const [amount, setAmount] = useState<any>(false);
  const [balance, setBalance] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const ref = useRef<any>(null);
  useEffect(() => {
    getData;
  }, []);
  useEffect(() => {}, [data]);
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function updateValue(price: string) {
    let parseNumber = parseInt(price);
    const getEmail = sessionStorage.getItem('loggedEmail');
    if (data.sellerEmail != sessionStorage.getItem('loggedEmail')) {
      if (parseNumber === -1) {
        let cusVal = parseInt(ref.current?.value);
        let min = (parseInt(data.currentPrice) * 1.01).toFixed(0);
        if (cusVal >= parseInt(min)) {
          fetch(`http://localhost:8080/jinddoPay/create/${getEmail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const balance = data.balance;
              // console.log("두번째1: ", balance);
              // console.log("두번째2: ", data);
              setBalance(balance);
              if (balance >= cusVal) {
                requestUpdate(cusVal);
              } else {
                alert('잔액이 부족합니다.');
              }
            })
            .catch((error) => {
              console.error('잔액 확인 중 오류 발생:', error);
            });
        } else {
          alert('최소금액은: ' + min);
        }
      } else if (data.maxEmail != sessionStorage.getItem('loggedEmail')) {
        fetch(`http://localhost:8080/jinddoPay/create/${getEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const balance = data.balance;
            // console.log("첫번쨰1:", data);
            // console.log("첫번쨰2:", balance);
            if (balance >= parseNumber) {
              requestUpdate(parseNumber);
            } else {
              alert('잔액이 부족합니다.');
            }
          })
          .catch((error) => {
            console.error('잔액 확인 중 오류 발생:', error);
          });
      }
    }
  }

  async function requestUpdate(price: number) {
    let currentPrice = parseInt(data.currentPrice);
    let maxPrice = parseInt(data.maxPrice);
    if (
      data.maxEmail == sessionStorage.getItem('loggedEmail') &&
      maxPrice < price
    ) {
      console.log(data.maxEmail);
      data.maxPrice = price;
    } else {
      if (maxPrice < price) {
        if (data.maxEmail != sessionStorage.getItem('loggedEmail')) {
          data.maxEmail = sessionStorage.getItem('loggedEmail');
        }
        data.maxPrice = price;
        let newcurr = maxPrice * 1.02;
        if (newcurr < price) data.currentPrice = newcurr;
        else data.currentPrice = maxPrice;
      } else if (currentPrice < price) {
        data.currentPrice = price;
      }
    }
    await fetch(`/api/transaction/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setData(e);
      });
  }
  async function getData() {
    let temp = await fetch(`/api/transaction/${postId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }).then((e) => {
      return e.json();
    });
    console.log(temp);
    setData(temp);
  }

  return (
    <>
      {data !== undefined ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className=' font-medium leading-6 text-gray-900'>
                      <div className='titleSection text-left flex'>
                        {/* <h1 className='text-xl'>입찰에 참가:</h1> */}
                        <div className='ml-auto right'>
                          <button onClick={closeModal}>
                            <XCircleIcon
                              style={{
                                width: '30px',
                              }}
                            />
                          </button>
                        </div>
                      </div>
                      <div className='priceInfo mt-3'>
                        {data.maxEmail ==
                        sessionStorage.getItem('loggedEmail') ? (
                          <div>
                            <b>KRW: {data.maxPrice}</b> +{' '}
                            <span> shipping : 3000 KRW</span>
                          </div>
                        ) : (
                          <div>
                            <b>KRW: {data.currentPrice}</b> +{' '}
                            <span> shipping : 3000 KRW</span>
                          </div>
                        )}
                      </div>
                    </Dialog.Title>
                    {data.maxEmail == sessionStorage.getItem('loggedEmail') ? (
                      ''
                    ) : (
                      <div id='description' className=''>
                        <div className='maxBiddingButton mt-10 grid-cols-3 gap-6 grid justify-center items-center'>
                          <div className='grid-rows-2'>
                            <div>
                              <button
                                onClick={() => {
                                  updateValue(
                                    (data.currentPrice * 1.01).toFixed(0)
                                  );
                                }}
                                className='bg-cyan-400 w-[100%] h-8 rounded-full'>
                                {(data.currentPrice * 1.01).toFixed(0)} KRW
                              </button>
                            </div>
                          </div>
                          <div className='grid-rows-2'>
                            <div>
                              <button
                                onClick={() => {
                                  updateValue(
                                    (data.currentPrice * 1.03).toFixed(0)
                                  );
                                }}
                                className='bg-cyan-400 w-[100%] h-8  rounded-full'>
                                {(data.currentPrice * 1.03).toFixed(0)} KRW
                              </button>
                            </div>
                          </div>
                          <div className='grid-rows-2'>
                            <div>
                              <button
                                onClick={() => {
                                  updateValue(
                                    (data.currentPrice * 1.05).toFixed(0)
                                  );
                                }}
                                className='bg-cyan-400 w-[100%] h-8 rounded-full'>
                                {(data.currentPrice * 1.05).toFixed(0)} KRW
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {data.maxEmail == sessionStorage.getItem('loggedEmail') ? (
                      ''
                    ) : (
                      <div className='mt-12 h-[1px] bg-black m-6 relative text-center'>
                        <span className='text-black absolute mt-[-30px] ml-[-30px] bg-white px-4 py-4'>
                          또는
                        </span>
                      </div>
                    )}
                    {data.maxEmail == sessionStorage.getItem('loggedEmail') ? (
                      <div className='grid gird-rows-3'>
                        <div className='text-black font-bold text-lg'>
                          최고 입찰자입니다!
                        </div>
                        <div className='mt-2'>
                          <p className='font-bold '>
                            KRW: {(data.maxPrice * 1.01).toFixed(0)} 보다 높은
                            가격을 입력해주세요
                          </p>
                          <input
                            ref={ref}
                            name='cusPrice'
                            type='number'
                            className='h-10 w-full border border-gray-400 rounded-lg'
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              updateValue('-1');
                            }}
                            className='bg-sky-400 h-9 text-center w-full mt-5 rounded-lg'>
                            응찰하기
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className='grid gird-rows-3'>
                        <div className='text-black font-bold text-lg'>
                          내 최고 입찰가
                        </div>
                        <div className='mt-2'>
                          <p className='font-bold '>
                            KRW: {(data.currentPrice * 1.01).toFixed(0)} 보다
                            높은 가격을 입력해주세요
                          </p>
                          <input
                            ref={ref}
                            name='cusPrice'
                            type='number'
                            className='h-10 w-full border border-gray-400 rounded-lg'
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              updateValue('-1');
                            }}
                            className='bg-sky-400 h-9 text-center w-full mt-5 rounded-lg'>
                            응찰하기
                          </button>
                        </div>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        'undeinfed'
      )}
    </>
  );
}
