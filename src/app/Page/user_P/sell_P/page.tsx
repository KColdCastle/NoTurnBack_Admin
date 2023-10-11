'use client';

import '../../../components/user/user.css';
import Upload from './_components/upload';
import Login from '../../../components/user/user_login/login';
import Footer from '../../../components/user/user_footer/footer';
import Nav from '../../../components/user/user_nav/nav';

export default function Sell() {
  return (
    <>
      <div>
        <div>
          <Login />
          <div>
            <Nav />
          </div>
        </div>
        <Upload />
      </div>
      <Footer />
    </>
  );
}
