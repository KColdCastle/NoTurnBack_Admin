'use client';

import React, { Component, useState } from 'react';
import DetailModal from './_components/modal';
import Detail from './_components/detail';
import Nav from '../../../components/user/user_nav/nav';
import Login from '../../../components/user/user_login/login';
import BottomList from './_components/bottomlist';

export default function Buy() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // ==========================================================================================

  return (
    <>
      <div>
        <Nav />
        <Detail />
      </div>
      {/* <div>
                <button
                    onClick={openModal}
                    className="text-xl bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 "
                >입찰버튼</button>
                <Modal isOpen={modalIsOpen} closeModal={closeModal} />
            </div> */}
    </>
  );
}
