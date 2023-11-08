import type { NextApiRequest, NextApiResponse } from 'next';

// API 라우트 핸들러
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // adminId를 URL 파라미터에서 추출
  const { adminId } = req.query;

  try {
    const result = await fetch(
      `http://localhost:8080/admin/admin_info/${adminId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (result.ok) {
      const data = await result.json();
      const { employeeName } = data; // 필요한 데이터만 추출

      // 성공적으로 데이터를 가져왔을 때 200 상태 코드와 함께 데이터 전송
      res.status(200).json({ employeeName });
    } else {
      // 외부 API에서 오류 응답을 받았을 때
      res.status(result.status).json({ message: '외부 API 에러' });
    }
  } catch (err) {
    // 요청 중 에러 발생 시 500 상태 코드와 함께 메시지 전송
    res.status(500).json({ message: '회원정보를 가져오지 못했습니다' });
  }
}
