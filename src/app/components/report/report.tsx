'use client';

import React, { useEffect, useState } from 'react';

export default function Report() {
  // type Report = {
  //   id: string;
  //   title: string;
  //   content: string;
  //   email: string;
  //   create_date: string;
  //   // 필요한 경우 다른 필드도 추가하세요
  // };
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetchReport();
  });

  async function fetchReport() {
    const report2 = await fetch(`/api/reportList`, {
      method: 'GET',
      headers: { accept: 'application/json' },
    })
      .then((e) => {
        let temp = e.json();
        console.log('temp는 이거다:', temp);
        return temp;
      })
      .then((e) => {
        setReport(e);
      });
    console.log('report.title: ', report);
  }

  return (
    <div>
      {/* <h1>신고글 목록2</h1>
      <ul>
        {report.map((rep) => (
          <>
            <li key={rep.id}>
              <h2>{rep.title}</h2>
              <p>{rep.content}</p>
              <small>작성자: {rep.email}</small>
              <p>{rep.create_date}</p>
            </li>
          </>
        ))}
      </ul> */}
    </div>
  );
}
