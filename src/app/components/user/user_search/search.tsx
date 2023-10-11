import Link from 'next/link';
import Dropdown from '../user_dropdown/dropdown';

export default function Search() {
  return (
    <>
      <div>
        <div className='flex mx-32'>
          <div className=' mb-3'>
            <Dropdown />
          </div>
        </div>
        <div className='flex items-center justify-center mb-5'>
          <div className='flex border border-purple-200 rounded w-full md:w-[800px] h-12'>
            <input
              type='text'
              className='block w-full px-4 py-2 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Search...'
            />
            <button className='px-8 text-white bg-emerald-400 border-l rounded text-base flex-shrink-0'>
              검색
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
