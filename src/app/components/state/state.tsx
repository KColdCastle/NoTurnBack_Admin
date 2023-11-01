'use client';

import React, { useState, useEffect } from 'react';

import useFetch from '../../hooks/useFetch';
import './state.css';
import axios from 'axios';
import useMongoNickname from '../../hooks/mongoNickname';

interface IMemberstate {
  state: boolean;
  createDate: string;
  passwordChangeDate: string;
  email: string;
  nickname: string;
  password: string;
  phoneNum: string;
  address: string;
  warning: number;
}
const Member: React.FC<{ member: IMemberstate }> = ({ member }) => {
  const {
    nickname: mongoNickname,
    loading,
    error,
  } = useMongoNickname(member.email);
  return (
    <tr>
      <td className={member.state ? 'statusNormal' : 'statusSuspended'}>
        {member.state ? '정상' : '정지'}
      </td>
      <td>{member.createDate}</td>
      <td>{member.passwordChangeDate}</td>
      <td>{member.email}</td>
      <td>{loading ? 'Loading...' : mongoNickname}</td>
      <td>{member.password}</td>
      <td>{member.phoneNum}</td>
      <td>{member.address}</td>
      <td>{member.warning}</td>
    </tr>
  );
};

// Search 컴포넌트 정의
export default function Search() {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const [searchCategory, setSearchCategory] = useState('email');
  const [searchEmail, setSearchEmail] = useState(''); // Step 1
  const [searchedMembers, setSearchedMembers] = useState<IMemberstate[]>([]); // 새로운 상태 추가
  const [searchClicked, setSearchClicked] = useState(false);
  // Step 2
  const handleSearch = async (): Promise<void> => {
    setSearchClicked(true);
    try {
      const searchUrl =
        searchCategory === 'email'
          ? 'http://127.0.0.1:8080/member/memberSearchEmail'
          : 'http://127.0.0.1:8080/member/memberSearchPN';

      const searchData =
        searchCategory === 'email'
          ? { email: searchEmail }
          : { phoneNum: searchEmail }; // 이 부분은 email 상태 변수명을 더 일반적인 이름으로 변경하는 것이 좋겠습니다.

      const response = await axios.post(searchUrl, searchData);
      const filteredSearchResults = response.data.filter(
        (member: IMemberstate) => !member.state
      );
      setSearchedMembers(filteredSearchResults);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  // useFetch로 백엔드에서 멤버 리스트 가져옴
  const [members, setMembers] = useState<IMemberstate[]>([]);

  useEffect(() => {
    async function fetchProfileAndCombine() {
      try {
        const responseProfile = await fetch(`/api/profileList`);
        const dataProfile = await responseProfile.json();

        const responseMembers = await fetch(
          'http://127.0.0.1:8080/member/memberState'
        );
        const dataMembers = await responseMembers.json();

        const combinedData = dataMembers.map((member: IMemberstate) => {
          const matchingProfile = dataProfile.find(
            (profile: any) => profile.email === member.email
          );
          return {
            ...member,
            nickname: matchingProfile ? matchingProfile.nickname : null,
          };
        });
        console.log('데이터:', combinedData);

        setMembers(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchProfileAndCombine();
  }, []);

  // 경고 수 증가 처리를 위한 핸들러 함수

  if (!members) return <span>Loading...</span>;

  return (
    <>
      {members.length === 0 ? (
        <span>악성 유저 정보 없음</span>
      ) : (
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th
                  colSpan={9}
                  style={{ textAlign: 'center', fontSize: '30px' }}>
                  정지 유저 정보
                </th>
              </tr>
              <tr>
                <th
                  colSpan={13}
                  style={{
                    textAlign: 'center',
                  }}>
                  <select
                    className='search-input1'
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}>
                    <option className='search-input1' value='email'>
                      EMAIL
                    </option>
                    <option className='search-input1' value='phoneNum'>
                      PHON
                    </option>
                  </select>
                  <input
                    type='text'
                    placeholder={
                      searchCategory === 'email'
                        ? 'EMAIL...  ENTER ⏎'
                        : 'PHON...  ENTER ⏎'
                    }
                    className='search-input'
                    value={searchEmail}
                    onChange={(e) => {
                      setSearchEmail(e.target.value);
                      setSearchClicked(false);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </th>
              </tr>
              <tr className='wdth'>
                <th>상태</th>
                <th>계정생성일</th>
                <th>패스워드변경일</th>
                <th>이메일</th>
                <th>이름</th>
                <th>패스워드</th>
                <th>핸드폰번호</th>
                <th>주소</th>
                <th>경고</th>
              </tr>
            </thead>
            <tbody>
              {(searchEmail.trim() === '' || !searchClicked
                ? members
                : searchedMembers
              ).map((member) => (
                <Member
                  member={member}
                  key={
                    searchCategory === 'email' ? member.email : member.phoneNum
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
