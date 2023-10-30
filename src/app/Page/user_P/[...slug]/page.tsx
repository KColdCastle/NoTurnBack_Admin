/* eslint-disable @next/next/no-img-element */
'use client';

import Sidebar from '../../../components/sidebar/sidebar';
import ImageViewer from '../../../components/user/digitalImg/digitalImg';
import { useState, useEffect } from 'react';

export default function Page(query: { params: any }) {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [postData, setPostData] = useState<any>([]);

  let category = query.params.slug[0];

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch(`/api/getlist/${category}`, {
      method: 'GET',
    })
      .then((e) => e.json())
      .then((e) => {
        setProducts(e);
        setVisibleProducts(e.slice(0, 8)); // 초기에 표시할 상품 설정
      })
      .catch((error) => console.error(error));
  }

  const loadMoreProducts = () => {
    const currentLength = visibleProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + 8);

    if (nextProducts.length > 0) {
      setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function ListDetailPage() {
    return (
      <div className='bg-white'>
        <div>
          <Sidebar />
        </div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Products</h2>

          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {visibleProducts.map((e: any, key: number) => (
              <div key={key} className='product-item'>
                <a href={`/Page/user_P/listDetail/${e.id}`} className='group'>
                  <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                    <img
                      src={e.images[0]}
                      alt={e.imageAlt} // alt 속성 추가
                      className='h-full w-full object-cover object-center group-hover:opacity-75'
                      style={{ width: '280px', height: '280px' }}
                    />
                  </div>
                  <h3 className='mt-4 text-sm text-gray-700'>{e.title}</h3>
                  <p className='mt-1 text-lg font-medium text-gray-900'>
                    {e.starting_price}
                  </p>
                </a>
              </div>
            ))}
          </div>
          <div className='text-center mt-4'>
            {visibleProducts.length < products.length && (
              <button
                className='bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-2 rounded-lg animate-bounce'
                onClick={loadMoreProducts}>
                더 보기
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {postData == undefined ? (
        <div className='text-center text-5xl'> 데이터 로딩중입니다</div>
      ) : (
        <ListDetailPage />
      )}
    </>
  );
}
