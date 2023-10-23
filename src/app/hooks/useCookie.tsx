import Cookies from 'js-cookie';

export const useCookie = (key: string) => {
  const getCookie = () => Cookies.get(key);
  const setCookie = (value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(key, value, options);
  const removeCookie = () => Cookies.remove(key);

  return { getCookie, setCookie, removeCookie };
};
