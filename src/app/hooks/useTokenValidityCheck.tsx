import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTokenValidityCheck() {
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8080/admin/validate'
        );

        if (response.status !== 200) {
          // 리프레시 토큰을 사용하여 액세스 토큰 재발급을 시도한다.
          const refreshResponse = await axios.post(
            'http://127.0.0.1:8080/admin/refresh'
          );

          if (refreshResponse.status !== 200) {
            setIsTokenValid(false);
          }
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    }

    checkTokenValidity();

    const logoutOnInactivity = setTimeout(() => {
      setIsTokenValid(false);
    }, 300000); // 5분 동안 유휴 상태면 로그아웃 처리

    return () => {
      clearTimeout(logoutOnInactivity);
    };
  }, []);

  return isTokenValid;
}
