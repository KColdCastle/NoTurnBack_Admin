import React, { useState } from 'react';
import '../user.css';

export default function Dropdown({ onSelect }: any) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    onSelect(category); // 선택한 카테고리를 부모 컴포넌트(upload컴포넌트)로 전달
  };

  const categories = [
    '패션/뷰티',
    '취미/키덜트',
    '디지털/가구/가전',
    '스포츠',
    '자동차',
  ];

  return (
    <div className='relative inline-block'>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategorySelect(e.target.value)}
          className='block w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
          {/* <option value="">카테고리</option> */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
