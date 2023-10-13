'use client';
import prisma from '@/db';
import '../../../components/user/user.css';
import './globals.css';

import Nav from '../../../components/user/user_nav/nav';
import MainList from '../../../components/user/user_mainlist/mainList';

export default function Home() {
  // async function test(){
  //   await prisma.test.create({
  //     data: {
  //       email: 'elsa@prisma.io',
  //       name: 'Elsa Prisma',
  //     },
  //   });
  // }

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
