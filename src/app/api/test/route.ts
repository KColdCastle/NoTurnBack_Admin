// 필요한 모듈을 import 합니다.
import { NextResponse, NextRequest } from 'next/server'; // Next.js의 server-side 핸들링을 위한 타입들
import prisma from '@/db'; // Prisma 클라이언트를 가져옵니다. "@/db"는 프로젝트 내의 Prisma 설정 경로일 것으로 예상됩니다.
import axios from 'axios'; // HTTP 클라이언트 라이브러리인 axios를 가져옵니다.

// GET 요청 처리 함수입니다.
export async function GET() {
  // Prisma를 사용하여 'test' 테이블의 모든 데이터를 가져옵니다.
  const data = await prisma.test.findMany();

  // 외부 API 요청을 위한 URL. 현재는 비어 있습니다.
  const url = '';

  // axios를 사용하여 외부 API에 GET 요청을 보냅니다.
  let sql = await axios.get(url).then((e) => {
    console.log(e); // 요청 결과를 콘솔에 로그합니다.
  });

  // 가져온 'test' 테이블 데이터를 JSON 형식으로 응답합니다.
  return NextResponse.json(data);
}

// POST 요청 처리 함수입니다.
export async function POST(req: NextRequest) {
  // 요청 본문에서 formData를 추출합니다.
  const data = await req.formData();

  // formData에서 필요한 데이터를 구조 분해 할당하여 변수에 저장합니다.
  let { name, address, address2, phone, email } = Object.fromEntries(data);

  // formData를 객체 형태로 변환하여 'body' 변수에 저장합니다.
  let body = Object.fromEntries(data);

  // 정상적으로 처리되었음을 의미하는 "OK" 문자열로 응답합니다.
  return new Response('OK');
}
