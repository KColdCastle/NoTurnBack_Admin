import Cookies from 'js-cookie';

export const useCookie = (key: string) => {
  const getCookie = () => Cookies.get(key);

  const setCookie = (value: string, options?: Cookies.CookieAttributes) => {
    const defaultOptions: Cookies.CookieAttributes = {
      expires: 7, // 기본적으로 7일 후에 만료. 필요에 따라 변경 가능
      path: '/', // 애플리케이션의 모든 경로에서 유효
      // 필요에 따라 추가적인 기본 옵션 설정 가능
    };

    // 사용자가 제공한 옵션으로 기본 옵션을 덮어쓴다
    const finalOptions = { ...defaultOptions, ...options };

    Cookies.set(key, value, finalOptions);
  };

  const removeCookie = () => Cookies.remove(key);

  return { getCookie, setCookie, removeCookie };
};
