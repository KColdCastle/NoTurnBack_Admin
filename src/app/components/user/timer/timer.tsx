import { useEffect, useState } from 'react';

type TimeNow = {
  endDate: number;
};

export default function Timer({ endDate }: TimeNow) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const rightNow = new Date(Date.now());
      const endAt = endDate - rightNow.getTime();
      let secondcal = Math.floor(endAt / 1000);
      let minutecal = Math.floor(secondcal / 60);
      let hourcal = Math.floor(minutecal / 60);
      if (endAt <= 0) {
        setIsExpired(true);
        clearInterval(interval);
        return;
      }
      secondcal = secondcal % 60;
      minutecal = minutecal % 60;
      setHour(hourcal);
      setMinute(minutecal);
      setSecond(secondcal);
      if (hourcal === 0 && minutecal === 0 && secondcal === 0) {
        setIsExpired(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <div>남은 시간 {`${hour}h:${minute}m:${second}s`}</div>
    </div>
  );
}
