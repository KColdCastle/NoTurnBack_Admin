// import React from 'react';
// import { notFound } from 'next/navigation';
// import prisma from '../../../../lib/db';
// import ReportList from '../../../components/report/reportlist';

// export default async function ReportSearch({
//   params,
// }: {
//   params: { id: string };
// }) {
//   //todo: id 파라미터를 문자로 변환
//   const id = String(Array.isArray(params?.id) ? params?.id[0] : params?.id);

//   //todo: ID로 게시물 찾기/ 작성자 정보도 포함
//   const report = await prisma.report.findUnique({
//     where: { id },
//     include: { user: true },
//   });

//   if (!report) notFound();

//   return <ReportList {...report} />;
// }
