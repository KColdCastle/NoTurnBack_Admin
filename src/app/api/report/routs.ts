// //! Next.js의 API 라우트 타입을 임포트합니다.
// import type { NextApiRequest, NextApiResponse } from 'next';

// //! Prisma 클라이언트를 임포트합니다.
// import prisma from '../../../lib/db';

// //! POST /api/post
// //! 요청 본문에서 필요한 필드: title, authorEmail
// //! 요청 본문에서 선택적 필드: content
// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { title, content, user, email } = req.body; //! 요청 본문에서 필요한 값을 추출합니다.

//   //! Prisma를 사용하여 새 게시물을 데이터베이스에 생성합니다.
//   const result = await prisma.report.create({
//     data: {
//       title: title, //? 게시물 제목
//       content: content, //? 게시물 내용
//       user: { connect: { email: user } }, //? 유저
//       email: email, //? 이메일
//     },
//   });

//   //! HTTP 상태 201(생성됨)과 함께 결과를 반환합니다.
//   return res.status(201).json(result);
// }
import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../lib/db';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  console.log('데이터좀 보라고: ', data);

  let { email, title, content } = Object.fromEntries(data);
  // console.log('body입니다:', email);

  let insert = {
    email: email.toString(),
    title: title.toString(),
    content: content.toString(),
  };
  const report = await prisma.report.create({
    data: insert,
  });
  console.log('report: ', report);
  return new Response('OK');
}
