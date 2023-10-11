'use client';

import React from 'react';
import useFetch from '../../hooks/useFetch';
import './state.css';
import axios from 'axios';

interface IMemberstate {
  state: boolean;
  createDate: string;
  passwordChangeDate: string;
  email: string;
  name: string;
  password: string;
  phoneNum: string;
  address: string;
  warning: number;
}
const Member: React.FC<{ member: IMemberstate }> = ({ member }) => (
  <tr>
    <td>{member.state ? '악성' : '정상'}</td>
    <td>{member.createDate}</td>
    <td>{member.passwordChangeDate}</td>
    <td>{member.email}</td>
    <td>{member.name}</td>
    <td>{member.password}</td>
    <td>{member.phoneNum}</td>
    <td>{member.address}</td>
    <td>{member.warning}</td>
    <td>
      <button>경고 증가</button>
      {/* onClick prop을 통해 클릭 핸들러를 연결 */}
    </td>
  </tr>
);

export default function StatePage() {
  const members: IMemberstate[] = useFetch(
    'http://127.0.0.1:8080/member/memberState'
  );

  if (!members) return <span>Loading...</span>;

  const filteredMembers = members.filter((member) => !member.state); // state가 false인 멤버만 필터링
  return (
    <>
      {filteredMembers.length === 0 ? (
        <span>악성 유저 정보 없음</span>
      ) : (
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th colSpan={9} style={{ textAlign: 'center' }}>
                  악성 회원정보
                </th>
              </tr>
              <tr>
                <input
                  type='text'
                  placeholder='Search...'
                  className='search-input'></input>
                <button className='search-btn'>Search</button>
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
                <th>버튼</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <Member member={member} key={member.email} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
