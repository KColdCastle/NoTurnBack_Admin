'use client';

import { Tab } from '@headlessui/react';
import { useState, useRef, useEffect } from 'react';

type imgFile = {
  id: string;
  src: any;
}[];

export default function ImageViewer({ id }: any) {
  // id값 넘겨받음
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imgFile, setProducts] = useState<any>([]);
  const scrollRef = useRef(null);

  let counter = 0;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    //let data = getData(images)
  }, [imgFile]);

  async function getData() {
    const result = await fetch(`/api/images/${id}`, {
      method: 'GET',
    })
      .then((e) => e.json())
      .then((e) => {
        let data = e.images;
        let temp = [];
        for (let i = 0; i < data.length; i++) {
          temp.push({ src: data[i] });
        }
        setProducts(temp);
      })
      .catch((error) => console.error(error));
    //console.log(result);
    //setProducts([result])
  }

  const imgLength: number = imgFile.length - 1;

  function handleScrollClick(e: number) {
    const curr = selectedIndex + e;
    if (curr > -1 && curr < imgLength + 1) {
      setSelectedIndex(curr);
    }
  }
  function TabListItem() {
    return (
      <>
        {imgFile &&
          imgFile.map((e: any, index: number) => {
            return (
              <div key={index} className='scrollbarArea'>
                <Tab
                  id={'tab' + index}
                  className={
                    index == selectedIndex
                      ? `border-[0.5rem] border-solid bg-blue-600 gap-3`
                      : `border-solid hover:border-[0.5rem] hover:bg-blue-600 gap-3`
                  }>
                  <img className='w-24 ' src={`${e.src}`} />
                </Tab>
              </div>
            );
          })}
      </>
    );
  }
  function TabListPreview() {
    return imgFile.map((e: any, index: number) => {
      return (
        <Tab.Panel key={index}>
          {index == selectedIndex ? (
            <img
              src={`${e.src}`}
              className='flex justify-center outline-dasheded content-center justify-item-center outline-gray-600'
              style={{ width: '100%' }}
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
        <div className='flex items-center grid-cols-2 bg-white'>
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
