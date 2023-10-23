'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './search.css';
import useMongoNickname from '../../hooks/mongoNickname';

interface IMember {
  state: boolean;
  createDate: string;
  passwordChangeDate: string;
  email: string;
  password: string;
  nickname: string;
  phoneNum: string;
  address: string;
  warning: number;
}

// IMember 인터페이스를 받아오는 FC (Functional Component) 생성
const Member: React.FC<{
  member: IMember; // IMember 인터페이스를 받아오는 member prop
  handleWarningUpdate: (
    email: string,
    newWarning: number,
    newState: boolean
  ) => void; // onWarningIncrease 함수 prop
}> = ({ member, handleWarningUpdate }) => {
  const {
    nickname: mongoNickname,
    loading,
    error,
  } = useMongoNickname(member.email);

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
        handleWarningUpdate(
          updatedMember.data.email,
          updatedMember.data.warning,
          updatedMember.data.state
        );
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
        handleWarningUpdate(
          updatedMember.data.email,
          updatedMember.data.warning,
          updatedMember.data.state
        );
      }
    } catch (error) {
      // 경고 증가 실패시 콘솔에 오류 메시지 출력
      console.error('Warning minus failed', error);
    }
  };

  function getWarningClass(warningCount: any) {
    switch (warningCount) {
      case 0:
        return 'warningZero';
      case 1:
        return 'warningOne';
      case 2:
        return 'warningTwo';
      case 3:
        return 'warningThree';
      default:
        return '';
    }
  }

  // 테이블 로우를 렌더링하는 JSX 리턴
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
      <td className={getWarningClass(member.warning)}>{member.warning}</td>
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const [searchCategory, setSearchCategory] = useState('email');
  const [searchEmail, setSearchEmail] = useState(''); // Step 1
  const [searchedMembers, setSearchedMembers] = useState<IMember[]>([]); // 새로운 상태 추가
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

      setSearchedMembers(response.data);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  // useFetch로 백엔드에서 멤버 리스트 가져옴
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    async function fetchProfileAndCombine() {
      try {
        const responseProfile = await fetch(`/api/profileList`);
        const dataProfile = await responseProfile.json();

        const responseMembers = await fetch(
          'http://127.0.0.1:8080/admin/memberList'
        );
        const dataMembers = await responseMembers.json();

        const combinedData = dataMembers.map((member: IMember) => {
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
  const handleWarningChange = (
    email: string,
    newWarning: number,
    newState: boolean
  ) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === email
          ? { ...member, warning: newWarning, state: newState }
          : member
      )
    );

    setSearchedMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.email === email
          ? { ...member, warning: newWarning, state: newState }
          : member
      )
    );
  };

  // // 경고 수 증가 처리를 위한 핸들러 함수
  // const handleStateChange = (email: string, newState: boolean) => {
  //   // 이메일이 일치하는 멤버의 경고 수를 newWarning으로 업데이트
  //   setMembers((prevMembers) =>
  //     prevMembers.map((member) =>
  //       member.email === email ? { ...member, state: newState } : member
  //     )
  //   );
  // };

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
                      PHONE
                    </option>
                  </select>
                  <input
                    type='text'
                    placeholder={
                      searchCategory === 'email'
                        ? 'EMAIL...  ENTER ⏎'
                        : 'PHONE...  ENTER ⏎'
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
                <th>업버튼</th>
                <th>다운버튼</th>
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
                  handleWarningUpdate={handleWarningChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
