import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import Dropdown from '../user_dropdown/dropdown';
import SearchBar from '../user_searchbar/searchbar';
import '../user.css';

// function classNames(...classes: any) {
//     return classes.filter(Boolean).join(' ')
// }

const navigation = [
  { name: '패션/뷰티', href: 'beauty', current: true },
  { name: '취미/키덜트', href: 'hobby', current: false },
  { name: '디지털/가구/가전', href: 'digital', current: false },
  { name: '스포츠', href: 'sport', current: false },
  { name: '자동차', href: 'car', current: false },
];

export default function Nav() {
  return (
    <>
      <Disclosure as='nav' className='bg-white mb-10'>
        {(open) => (
          <div className=''>
            <div className='flex-container justify-center items-center'>
              <div className='flex-item'>
                {/* <div className=''>
                            <Dropdown/>
                        </div> */}
                <div className='link-container'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`nav-link ${
                        item.current ? 'current' : ''
                      } flex-auto text-neutral-400 `}
                      aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </a>
                  ))}
                </div>
                <SearchBar />
              </div>
            </div>
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
