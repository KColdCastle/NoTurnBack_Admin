'use client';

import './report.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Report 타입 정의
type ReportType = {
  id: string;
  title: string;
  content: string;
  email: string;
  create_date: string; // 날짜는 문자열로 받습니다
};

// 날짜를 한국 시간으로 포맷하는 함수
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
};

export default function Report() {
  const router = useRouter();
  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reportList`);
        const data = await response.json();
        // 여기서 서버로부터 받은 날짜 데이터를 한국 시간대로 변환하여 상태에 저장합니다.
        const formattedData: ReportType[] = data.map((rep: ReportType) => ({
          ...rep,
          create_date: formatDate(rep.create_date), // 날짜 형식을 변환합니다.
        }));
        setReports(formattedData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    }
    fetchReport();
  }, []);

  return (
    <div className='reportContainer'>
      <h1>신고글 목록2</h1>
      <ul className='reportList'>
        {reports.map((report: ReportType) => (
          <li key={report.id} className='reportItem'>
            <h2>{report.title}</h2>
            <p>{report.content}</p>
            <small>작성자: {report.email}</small>
            <p>{report.create_date}</p> {/* 변환된 날짜를 여기서 보여줍니다 */}
          </li>
        ))}
      </ul>
    </div>
  );
}