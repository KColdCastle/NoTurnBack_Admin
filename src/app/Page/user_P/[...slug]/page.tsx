/* eslint-disable @next/next/no-img-element */
'use client';

import ImageViewer from '../../../components/user/digitalImg/digitalImg';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Login from '../../../Page/Login_P/page';

export default function AdminPage(query: { params: any }) {
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
        setVisibleProducts(e.slice(0, 8));
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

  const categories = [
    {
      name: '패션/뷰티',
      href: '/Page/user_P/beauty',
      current: category === 'beauty',
    },
    {
      name: '취미/키덜트',
      href: '/Page/user_P/hobby',
      current: category === 'hobby',
    },
    {
      name: '디지털/가구/가전',
      href: '/Page/user_P/digital',
      current: category === 'digital',
    },
    {
      name: '스포츠',
      href: '/Page/user_P/sport',
      current: category === 'sport',
    },
    { name: '자동차', href: '/Page/user_P/car', current: category === 'car' },
    { name: '기타', href: '/Page/user_P/etc', current: category === 'etc' },
  ];
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

  function CategoryBar() {
    return (
      <div className='mb-6 flex justify-center overflow-x-auto'>
        {' '}
        {/* 중앙 정렬을 위해 justify-center 추가 */}
        {categories.map((cat, idx) => (
          <a
            key={idx}
            href={cat.href}
            className={`mx-2 py-2 px-6 rounded-md text-sm font-medium shadow-md ${
              cat.current
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}>
            {cat.name}
          </a>
        ))}
      </div>
    );
  }

  function AdminProductList() {
    return (
      <div>
        {isLoggedIn ? (
          <div className='bg-gray-100 p-8'>
            <h2 className='font-bold text-2xl mb-2 text-center'>
              Admin Product Management
            </h2>

            <CategoryBar />
            <div className='container mx-auto px-4'>
              {' '}
              {/* Container를 사용하여 게시글들을 가운데로 몰아줍니다. */}
              {/* ... (기존 코드 유지) */}
              <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {visibleProducts.map((e: any, key: number) => (
                  <div
                    key={key}
                    className='product-item bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'>
                    {/* 각 아이템에 대한 스타일 개선 */}
                    <a
                      href={`/Page/user_P/listDetail/${e.id}`}
                      className='group'>
                      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg mb-4'>
                        <img
                          src={e.images[0]}
                          alt={e.imageAlt}
                          className='h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300'
                        />
                      </div>
                      <h3 className='mt-2 text-sm text-gray-700'>{e.title}</h3>
                      <p className='mt-1 text-lg font-medium text-gray-900'>
                        시작가 :{' '}
                        {Number(e.starting_price).toLocaleString('ko-KR')}원
                      </p>
                    </a>
                  </div>
                ))}
              </div>
              <div className='text-center mt-8'>
                {visibleProducts.length < products.length && (
                  <button
                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'
                    onClick={loadMoreProducts}>
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }

  return postData === undefined ? (
    <div className='text-center text-5xl mt-8'>Loading...</div>
  ) : (
    <AdminProductList />
  );
}
