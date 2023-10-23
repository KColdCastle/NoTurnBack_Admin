'use client';

import './report.css';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Report() {
  const router = useRouter();

  type ReportType = {
    id: string;
    title: string;
    content: string;
    email: string;
    create_date: string;
  };

  const [reports, setReports] = useState<ReportType[]>([]);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reportList`);
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    }
    fetchReport();
  }, []);

  return (
    <div className='reportContainer'>
      <>
        <h1>신고글 목록2</h1>
        <ul className='reportList'>
          {reports.map((rep) => (
            <li key={rep.id} className='reportItem'>
              <h2>{rep.title}</h2>
              <p>{rep.content}</p>
              <small>작성자: {rep.email}</small>
              <p>{rep.create_date}</p>
            </li>
          ))}
        </ul>
      </>
      {/* 로그인이 되어 있지 않은 상태일 경우 아무것도 렌더링하지 않음 */}
    </div>
  );
}
