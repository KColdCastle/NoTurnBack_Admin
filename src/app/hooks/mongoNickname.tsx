import { useState, useEffect } from 'react';

// 커스텀 훅: useMongoNickname
function useMongoNickname(email: string) {
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await fetch(`/api/profileList`);
        const data = await response.json();

        const nicknameFromMongo = data.find(
          (profile: any) => profile.email === email
        )?.nickname;

        setNickname(nicknameFromMongo);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchNickname();
  }, [email]);

  return { nickname, loading, error };
}

export default useMongoNickname;
