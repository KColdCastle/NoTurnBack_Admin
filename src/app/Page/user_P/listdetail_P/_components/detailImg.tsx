'use client';

import { Tab } from '@headlessui/react';

import { useState, useRef } from 'react';
type imgFile = {
  src: any;
}[];
export default function ImageViewer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);
  let counter = 0;
  const imgFile: imgFile = [
    {
      src: 'data:image/jpeg;base64,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',
    },
    {
      src: 'https://cdn.mediafine.co.kr/news/photo/202305/31322_53304_3628.jpg',
    },
    {
      src: 'https://thumb.mtstarnews.com/06/2023/06/2023062215005684112_1.jpg',
    },
    {
      src: 'https://thumb.mtstarnews.com/06/2023/06/2023062215005684112_1.jpg',
    },
    {
      src: 'https://thumb.mtstarnews.com/06/2023/06/2023062215005684112_1.jpg',
    },
    {
      src: 'https://thumb.mtstarnews.com/06/2023/06/2023062215005684112_1.jpg',
    },
  ];
  const imgLength: number = imgFile.length - 1;
  function handleScrollClick(e: number) {
    const curr = selectedIndex + e;
    if (curr > -1 && curr < imgLength + 1) {
      setSelectedIndex(curr);
    }
  }
  function TabListItem() {
    return imgFile.map((e, index) => {
      return (
        <div key={index} className='scrollbarArea'>
          <Tab
            id={'tab' + index}
            className={
              index == selectedIndex
                ? `border-[0.5rem] border-solid bg-blue-600 gap-3`
                : `border-solid hover:border-[0.5rem] hover:bg-blue-600 gap-3`
            }>
            <input className='w-24  ' type='image' src={`${e.src}`} />
          </Tab>
        </div>
      );
    });
  }
  function TabListPreview() {
    return imgFile.map((e, index) => {
      return (
        <Tab.Panel key={index}>
          {index == selectedIndex ? (
            <input
              className='flex justify-center outline-dasheded content-center justify-item-center outline-gray-600'
              type='image'
              style={{ width: '100%' }}
              src={e.src}
              alt='Picture of the author'
            />
          ) : (
            <></>
          )}
        </Tab.Panel>
      );
    });
  }

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      vertical
      key={'TabGroup'}>
      <div className='flex grid-cols-2 m-4 gap-2 ml-8'>
        <div>
          <button
            className='text-greay-500 w-[100%]'
            onClick={() => handleScrollClick(-1)}>
            UP
          </button>
          <Tab.List className='bg-blue-50 align-middle flex justify-center'>
            <div
              ref={scrollRef}
              className='w-28 h-[540px] scrollbarImgContainer'
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarColor: 'transparent transparent',
              }}>
              <TabListItem />
            </div>
          </Tab.List>
          <button
            className='text-greay-500 w-[100%]'
            onClick={() => {
              handleScrollClick(1);
            }}>
            down
          </button>
        </div>
        <div className='flex items-center grid-cols-2 bg-slate-200'>
          <button
            onClick={() => {
              handleScrollClick(-1);
            }}
            disabled={selectedIndex == 0 ? true : false}
            className='text-gray-700 hover:text-gray-500 text-[35px]  left '>
            &lt;
          </button>
          <div
            className='w-[400px] flex justify-center outline-dasheded content-center justify-item-center outline-gray-600'
            id='ImgContainer'>
            <Tab.Panels style={{ width: '400px' }} key={'keyPanel'}>
              <TabListPreview />
            </Tab.Panels>
          </div>
          <button
            onClick={() => {
              handleScrollClick(1);
            }}
            disabled={selectedIndex == imgLength ? true : false}
            className='text-gray-700 hover:text-gray-500 text-[35px]'>
            &gt;
          </button>
        </div>
      </div>
    </Tab.Group>
  );
}
