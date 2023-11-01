'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useMongoNickname from '../../hooks/mongoNickname';
import './state.css';

interface IMember {
  state: boolean;
  createDate: string;
  passwordChangeDate: string;
  email: string;
  nickname: string;
  phoneNum: string;
  address: string;
  warning: number;
}

const Member: React.FC<{ member: IMember }> = ({ member }) => {
  const { nickname: mongoNickname, loading } = useMongoNickname(member.email);

  return (
    <tr>
      <td className={member.state ? 'statusNormal' : 'statusSuspended'}>
        {member.state ? '정상' : '정지'}
      </td>
      <td>{member.createDate}</td>
      <td>{member.passwordChangeDate}</td>
      <td>{member.email}</td>
      <td>{loading ? 'Loading...' : mongoNickname}</td>
      <td>{member.phoneNum}</td>
      <td>{member.address}</td>
      <td>{member.warning}</td>
    </tr>
  );
};

export default function Search() {
  const [searchCategory, setSearchCategory] = useState('email');
  const [searchEmail, setSearchEmail] = useState('');
  const [members, setMembers] = useState<IMember[]>([]);
  const [searchedMembers, setSearchedMembers] = useState<IMember[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);

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
          : { phoneNum: searchEmail };

      const response = await axios.post(searchUrl, searchData);
      setSearchedMembers(response.data.filter((m: IMember) => !m.state));
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch('http://127.0.0.1:8080/admin/memberList');
        const data = await response.json();
        setMembers(data.filter((m: IMember) => !m.state));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchMembers();
  }, []);

  if (!members) return <span>Loading...</span>;

  return (
    <>
      {members.length === 0 ? (
        <span>유저정보 없음</span>
      ) : (
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th
                  colSpan={9}
                  style={{ textAlign: 'center', fontSize: '30px' }}>
                  정지된 회원 정보
                </th>
              </tr>
              <tr>
                <th colSpan={9} style={{ textAlign: 'center' }}>
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
