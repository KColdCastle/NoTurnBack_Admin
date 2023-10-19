import { useState, useEffect } from 'react';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginState = sessionStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(storedLoginState);
  }, []);

  const login = () => {
    sessionStorage.setItem('loggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}

export default useAuth;
