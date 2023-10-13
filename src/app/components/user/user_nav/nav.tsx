import React, { Fragment, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import Dropdown from '../user_dropdown/dropdown';
import SearchBar from '../user_searchbar/searchbar';

// function classNames(...classes: any) {
//     return classes.filter(Boolean).join(' ')
// }

const navigation = [
  { name: '패션/뷰티', href: '/Page/user_P/beauty_P', current: true },
  { name: '취미/키덜트', href: '/Page/user_P/hobby_P', current: false },
  { name: '디지털/가구/가전', href: '/Page/user_P/digital_P', current: false },
  { name: '스포츠', href: '/Page/user_P/sport_P', current: false },
  { name: '자동차', href: '/Page/user_P/car_P', current: false },
];

export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState<string>('');

  const searchToggle = () => {
    setIsActive(!isActive);
    setSearchText('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // 검색 로직을 이곳에 추가
    console.log('검색어:', searchText);
  };
  return (
    <>
      <Disclosure as='nav' className='bg-white mb-10'>
        {(open) => (
          <div className=''>
            <div className='flex-container justify-center items-center'>
              <div className='flex-item'>
                {/* 검색바 */}
                <div className={`search-wrapper ${isActive ? 'active' : ''}`}>
                  <div className='input-holder'>
                    {/* isActive가 true일 때만 검색 입력창을 렌더링 */}
                    {isActive && (
                      <input
                        type='text'
                        className='search-input placeholder:text-cyan-50'
                        placeholder='Search...'
                        value={searchText}
                        onChange={handleInputChange}
                      />
                    )}
                    <button className='search-icon' onClick={searchToggle}>
                      <div className='center-icon'>
                        {' '}
                        {/* 아이콘을 중앙에 배치하기 위한 래퍼 요소 */}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          className='w-8 h-8 '>
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <span className='close' onClick={searchToggle}></span>
                </div>
                {/* 여기까지 */}
                {/* <SearchBar/> */}

                <div className='link-container space-x-6 '>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`nav-link ${
                        item.current ? 'current' : ''
                      } flex-auto text-black font-bold text hover:text-orange-400`}
                      aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className=''></div>
          </div>
        )}
      </Disclosure>

      {/* <div className='sellButton'>
          <Link href='/sell'> 
              <button className='sell'>상품판매</button>
          </Link>
      </div> */}
    </>
  );
}
