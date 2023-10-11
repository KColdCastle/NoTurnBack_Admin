'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './search.css';

interface IMember {
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

// IMember 인터페이스를 받아오는 FC (Functional Component) 생성
const Member: React.FC<{
  member: IMember; // IMember 인터페이스를 받아오는 member prop
  onWarningChange: (email: string, newWarning: number) => void; // onWarningIncrease 함수 prop
}> = ({ member, onWarningChange }) => {
  // member와 onWarningIncrease prop을 파라미터로 받아옴
  // 경고 증가 함수 정의
  const increaseWarning = async () => {
    try {
      // 백엔드로 PUT 요청을 보내 경고 수를 증가시킴
      const response = await axios.put(
        `http://127.0.0.1:8080/member/increaseWarning/${member.email}`
      );
      // 요청이 성공적으로 이루어졌다면
      if (response.status === 200) {
        // 업데이트된 멤버 정보를 백엔드에서 가져옴
        const updatedMember = await axios.get(
          `http://127.0.0.1:8080/member/member/${member.email}`
        );
        // onWarningIncrease 함수 호출하여 사용자 인터페이스 업데이트
        onWarningChange(updatedMember.data.email, updatedMember.data.warning);
        onWarningChange(updatedMember.data.dmail, updatedMember.data.state);
      }
    } catch (error) {
      // 경고 증가 실패시 콘솔에 오류 메시지 출력
      console.error('Warning increase failed', error);
    }
  };

  const minusWarning = async () => {
    try {
      // 백엔드로 PUT 요청을 보내 경고 수를 증가시킴
      const response = await axios.put(
        `http://127.0.0.1:8080/member/minusWarning/${member.email}`
      );
      // 요청이 성공적으로 이루어졌다면
      if (response.status === 200) {
        // 업데이트된 멤버 정보를 백엔드에서 가져옴
        const updatedMember = await axios.get(
          `http://127.0.0.1:8080/member/member/${member.email}`
        );
        // onWarningIncrease 함수 호출하여 사용자 인터페이스 업데이트
        onWarningChange(updatedMember.data.email, updatedMember.data.warning);
        onWarningChange(updatedMember.data.dmail, updatedMember.data.state);
      }
    } catch (error) {
      // 경고 증가 실패시 콘솔에 오류 메시지 출력
      console.error('Warning minus failed', error);
    }
  };

  // 테이블 로우를 렌더링하는 JSX 리턴
  return (
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
        <button onClick={increaseWarning}>경고 증가</button>{' '}
        {/* 버튼 클릭 시 increaseWarning 함수 호출 */}
      </td>
      <td>
        <button onClick={minusWarning}>경고 감소</button>{' '}
        {/* 버튼 클릭 시 increaseWarning 함수 호출 */}
      </td>
    </tr>
  );
};

// Search 컴포넌트 정의
export default function Search() {
  const [searchName, setSearchName] = useState(''); // Step 1
  const [searchedMembers, setSearchedMembers] = useState<IMember[]>([]); // 새로운 상태 추가
  // Step 2
  const handleSearch = async (): Promise<void> => {
    try {
      if (searchName.trim() === '') {
        // 검색창이 비어있는 경우
        setSearchedMembers([]); // searchedMembers를 초기화합니다.
        return;
      }
      const response = await axios.post(
        'http://127.0.0.1:8080/member/search2',
        {
          name: searchName,
        }
      );
      setSearchedMembers(response.data); // searchedMembers 상태 업데이트
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  // useFetch로 백엔드에서 멤버 리스트 가져옴
  const fetchedMembers: IMember[] = useFetch(
    'http://127.0.0.1:8080/member/memberList'
  );
  // 멤버 상태 설정
  const [members, setMembers] = useState<IMember[]>([]);

  // 가져온 멤버를 상태에 설정하는 useEffect 훅
  useEffect(() => {
    setMembers(fetchedMembers);
  }, [fetchedMembers]);

  // 경고 수 증가 처리를 위한 핸들러 함수
  const handleWarningChange = (email: string, newWarning: number) => {
    // 이메일이 일치하는 멤버의 경고 수를 newWarning으로 업데이트
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === email ? { ...member, warning: newWarning } : member
      )
    );
  };

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
                  colSpan={11}
                  style={{ textAlign: 'center', fontSize: '30px' }}>
                  회원정보
                </th>
              </tr>
              <tr>
                <th
                  colSpan={11}
                  style={{ textAlign: 'center', fontSize: '20px' }}>
                  <input
                    type='text'
                    placeholder='Search...'
                    className='search-input'
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}></input>
                  <button className='search-btn' onClick={handleSearch}>
                    Search
                  </button>
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
                <th>업버튼</th>
                <th>다운버튼</th>
              </tr>
            </thead>
            <tbody>
              {(searchName.trim() === '' ? members : searchedMembers).map(
                (
                  member // 조건 렌더링
                ) => (
                  <Member
                    member={member}
                    key={member.email}
                    onWarningChange={handleWarningChange}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
