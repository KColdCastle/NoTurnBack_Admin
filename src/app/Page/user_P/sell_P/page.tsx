'use client';

import '../../../components/user/user.css';
import Upload from './_components/upload';
import './_components/upload.css';
import Login from '../../../components/user/user_login/login';
import Footer from '../../../components/user/user_footer/footer';
import Header from '../../../components/user/user_header/header';
import MainList from '../../../components/user/user_mainlist/mainList';

import Nav from '../../../components/user/user_nav/nav';

export default function Sell() {
  return (
    <div>
      <Header />
      <div>
        <Upload />
      </div>
      <Footer />
    </div>
  );
}
