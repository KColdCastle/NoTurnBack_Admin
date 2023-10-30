// hooks/useJWT.ts

import { useState } from 'react';

const useJWT = (key: string = 'adminAuthToken') => {
  const initialToken =
    typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;

  const [token, setTokenInternal] = useState<string | null>(initialToken);

  const setToken = (newToken: string) => {
    window.localStorage.setItem(key, newToken);
    setTokenInternal(newToken);
  };

  const removeToken = () => {
    window.localStorage.removeItem(key);
    setTokenInternal(null);
  };

  return {
    token,
    setToken,
    removeToken,
  };
};

export default useJWT;
