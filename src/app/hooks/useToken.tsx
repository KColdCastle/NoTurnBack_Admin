import { useState } from 'react';

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export const useToken = () => {
  // 토큰의 존재 여부만 관리합니다.
  // 실제 토큰 값은 HttpOnly 쿠키에 저장되므로 이 훅에서는 접근할 수 없습니다.
  const [hasTokens, setHasTokens] = useState<Tokens>({
    accessToken: null,
    refreshToken: null,
  });

  // 서버로부터 토큰이 발급되었을 때 호출하여 상태를 업데이트합니다.
  const updateTokenPresence = (accessToken: boolean, refreshToken: boolean) => {
    setHasTokens({
      accessToken: accessToken ? 'Present' : null,
      refreshToken: refreshToken ? 'Present' : null,
    });
  };

  // 토큰이 만료되거나 무효화되었을 때 호출하여 상태를 초기화합니다.
  const clearTokens = () => {
    setHasTokens({ accessToken: null, refreshToken: null });
  };

  return { hasTokens, updateTokenPresence, clearTokens };
};
