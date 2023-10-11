'use client';
import prisma from '@/db';
import '../user.css';

import Nav from '../user_nav/nav';
import MainList from '../user_mainlist/mainList';

export default function Home() {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div>
        <MainList />
      </div>
    </>
  );
}
