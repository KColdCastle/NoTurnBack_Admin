'use client';

import '../user.css';
import Login from '../user_login/login';
import Footer from '../user_footer/footer';
import Header from '../user_header/header';

import Main from '../user_main/main';
import Nav from '../user_nav/nav';
import MainList from '../user_mainlist/mainList';

export default function Layout() {
  return (
    <>
      <div>
        <Header />
        <div>
          <Nav />
        </div>
        <div>
          <MainList />
        </div>
        <Footer />
      </div>
    </>
  );
}
