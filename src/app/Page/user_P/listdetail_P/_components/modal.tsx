import React, { useState } from 'react';
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
    width: '100%', // 모달 창의 너비 조정
    maxWidth: '1000px', // 모달 창의 최대 너비 조정
  },
};

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function DetailModal({ isOpen, closeModal }: ModalProps) {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 경매 입찰을 처리하는 로직을 추가하세요.
    console.log('Bid Amount:', bidAmount);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Auction Bid Modal'>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>경매 입찰</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col mt-4'>
            <div className='flex items-center'>
              <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                진또페이
              </h3>
              <span className='text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
                100,000 원
              </span>
            </div>
          </div>
          <div className='flex flex-col mt-4'>
            <div className='flex items-center'>
              <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                시작가
              </h3>
              <span className='text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
                50,000 원
              </span>
            </div>
          </div>
          <div className='flex flex-col mt-4'>
            <div className='flex items-center'>
              <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                MAX금액
              </h3>
              <span className='text-xl w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
                150,000 원
              </span>
            </div>
          </div>
          <div className='flex flex-col col-span-2 mt-4'>
            <div className='flex items-center'>
              <h3 className='text-lg font-semibold whitespace-nowrap mr-5'>
                입찰 금액
              </h3>
              <form onSubmit={handleSubmit}>
                <input
                  type='number'
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
              </form>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <div className='flex flex-col col-span-2 mt-4'>
            <button
              type='submit'
              className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'>
              입찰
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </Modal>
  );
}
