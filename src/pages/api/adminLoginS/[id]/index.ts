import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: any }) {
  let query = context.params.id;
  try {
    const result = await fetch('http://localhost:8080/admin/adminLogin', {
      method: 'POST',
      body: JSON.stringify({
        adminId: query[0],
        adminPassword: query[1],
        employeeName: query[2],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await result.json();
    console.log('1번 데이따', data);
    console.log('2번 리설뚜', result);

    if (result.status !== 200) {
      // 서버에서 오류 응답을 반환한 경우
      return NextResponse.json(
        { result: data.message || '로그인 실패' },
        { status: result.status }
      );
    }
    console.log('3번 데이따', result);

    const refinedData = {
      adminId: data.adminId,
      adminPassword: data.adminPassword,
      employeeName: data.employeeName,
    };

    console.log('리설트:', refinedData);
    return NextResponse.json(refinedData, { status: 200 });
  } catch (err) {
    // 네트워크 또는 기타 예외 발생 시
    return NextResponse.json({ result: '로그인 실패500' }, { status: 500 });
  }
}
