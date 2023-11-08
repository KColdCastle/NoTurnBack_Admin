'use client';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  employeeName: string;
  setEmployeeName: React.Dispatch<React.SetStateAction<string>>; // 이름 상태를 업데이트하는 함수 추가
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 초기값을 false로 설정
  const [employeeName, setEmployeeName] = useState<string>(''); // 이름 상태 추가

  useEffect(() => {
    // 1. 로그인 상태 초기화
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }

    const savedSession = window.localStorage.getItem('JSESSIONID');
    if (savedSession) {
      axios
        .get('http://127.0.0.1:8080/admin/checkLoginStatus', {
          withCredentials: true,
        })
        .then((response) => {
          setIsLoggedIn(response.data.loggedIn);

          // 2. 로그인 상태 저장
          if (response.data.loggedIn) {
            localStorage.setItem('isLoggedIn', 'true');

            setEmployeeName(response.data.employeeName); // 서버로부터 받은 사용자 이름을 상태에 저장
          } else {
            // 3. 로그인 상태 삭제
            localStorage.removeItem('isLoggedIn');
            setEmployeeName(''); // 로그아웃 시 이름 상태를 빈 문자열로 설정
          }
        })
        .catch((error) => {
          console.error('로그인 상태 확인 중 오류 발생:', error);
          setIsLoggedIn(false);
          localStorage.removeItem('isLoggedIn'); // 로그인 상태 삭제
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, employeeName, setEmployeeName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
