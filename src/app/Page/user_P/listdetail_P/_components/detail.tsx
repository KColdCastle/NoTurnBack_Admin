"use client"

import React, { useState, useEffect } from 'react';
import BottomList from './bottomlist';
// import Modal from './Modal';
// import MainList from './MainList';



export default function Test() {
  const [newComment, setNewComment] = useState(''); // Comment 타입 사용
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* 그리드 레이아웃 */}
      <div className="mx-auto flex flex-col lg:flex-row lg:max-w-7xl lg:px-8">
        {/* 이미지 */}
        <div className="lg:w-1/2">
          <div className="p-12 lg:sticky lg:top-4 lg:overflow-hidden">
            <img src='back.png'></img>

          </div>
        </div>
        {/* 오른쪽 컨텐츠 */}
        <div className="lg:w-1/2">
          <div className="lg:pl-4">
            <div className="lg:max-w-lg">
              {/* 섹션 제목 */}
              <p className="text-base font-semibold leading-7 text-indigo-600">판매자: Seller</p>
              {/* 메인 제목 */}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">제목: Title</h1>
              {/* 본문 텍스트 */}
              <p className="mt-6 text-xl leading-8 text-gray-700">시작가: 1000000원</p>
              <p>필요함?</p>
              {/* 목록 */}
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">입찰건수: Bid Count</strong> 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">남은시간: Time Remaining</strong> 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <div className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">시작가: Starting price</strong> 
                  </span>
                </li>
              </ul>
              <div className="flex justify-center mt-4">
                <button className="btn_action w-[500px] bg-zinc-950 text-white px-4 py-4 rounded-lg hover:bg-zinc-800" onClick={openModal}>
                  입찰하기
                </button>
                {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
              </div>
              <div className="flex justify-center mt-4">
                <button className="w-[500px] border-2 bg-white text-black px-4 py-4 rounded-lg hover:bg-zinc-300">
                  찜하기
                </button>
              </div>

              {/* 추가 섹션 제목 */}
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">입찰시 주의사항</h2>

              {/* 추가 섹션 본문 */}
              <p className="mt-6">좀 지켜줘라</p>
            </div>
          </div>
        </div>
        
      </div>
      
      <ProductDetail/>
      <BottomList/>
      <div></div>
      
      {/* <MainList/> */}
    </div>
  );
}
function ProductDetail() {
  return (
    <div className="product_detail_item_wrap detail_item flex justify-center items-center">
      <div className="detail_title_header_images">
        <div className="detail_header_logo_wrap">
          <p className="detail_header_logo_title"></p>
        </div>
       
       
        <div className="detail_img_wrap">
          <div className="detail_content_images open" style={{ maxHeight: '963px' }}>
            <div className="images">
              <img
                src="back.png"
                loading="lazy"
                alt="Product Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
