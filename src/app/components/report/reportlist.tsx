// import React from 'react';
// import Create from '../../components/report/create'; //! Post 컴포넌트를 components 디렉토리에서 가져옵니다.
// import prisma from '../../../lib/db'; //! 데이터베이스 쿼리를 위해 prisma 클라이언트 인스턴스를 가져옵니다.
// import './report.css';

// //todo: 이 함수는 게시되지 않은 글 목록 (드래프트)을 렌더링합니다.
// export default async function ReportList() {
//   const [reports, setReports] = React.useState([]);

//   React.useEffect(() => {
//     async function fetchReports() {
//       const drafts = await prisma.report.findMany({
//         include: { user: true },
//       });
//       setReports(drafts);
//     }
//     fetchReports();
//   }, []);

//   return (
//     <div>
//       <h1> ee</h1>

//       <main>
//         {reports.map((report) => (
//           <Report key={report.id} post={report} />
//         ))}
//       </main>
//     </div>
//   );
// }
