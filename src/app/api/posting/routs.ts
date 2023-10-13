import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  return null;
}
export async function POST(req: NextRequest) {
  return new Response('OK');
}
export async function PUT() {
  return null;
}
export async function DELETE() {
  return null;
}
