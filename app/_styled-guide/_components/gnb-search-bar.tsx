'use client';

import { IoSearch } from 'react-icons/io5';
import React, { useState, useRef } from 'react';
import useSearchSuggestions from '@/hooks/useSearchSuggestions';
import DropdownList from './DropdownList';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
}

// Gnb에서 사용하기 위해서 만들어진 검색창입니다.
const GnbSearchBar = ({ placeholder = '상품 이름을 검색해 보세요' }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const { suggestions, isLoading, isError } = useSearchSuggestions(keyword);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 검색창 input 활성화시, dropdownList 열림
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    // input 요소가 focus를 잃어도 0.2초동안 Dropdown을 유지합니다.
    setTimeout(() => {
      if (!inputRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 200);
  };

  // 검색 처리 함수. 한 글자 이상 입력해야 함
  const executeSearch = () => {
    if (keyword.trim()) {
      router.push(`/search?q=${keyword}`);
    }
  };

  // 검색창에서 Enter 키 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  // dropdownList에서 option 선택 시 콜백
  const onSelect = (value: string) => {
    setKeyword(value);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center md:w-[300px] lg:w-[400px] md:h-[50px] lg:h-14 py-4 px-5 bg-black-450 rounded-full">
        <IoSearch
          className="md:mr-[10px] lg:mr-5 h-6 w-6 text-gray-400 cursor-pointer"
          onClick={executeSearch}
        />
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent focus:outline-none text-white"
        />
      </div>
      {isDropdownOpen && <DropdownList options={suggestions} onSelect={onSelect} />}
    </div>
  );
};

export default GnbSearchBar;
