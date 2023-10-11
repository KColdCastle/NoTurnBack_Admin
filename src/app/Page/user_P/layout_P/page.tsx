import './globals.css';
import Login from '../../../components/user/user_login/login';
import Footer from '../../../components/user/user_footer/footer';
import Main from '../../../components/user/user_main/main';

export default function Layout() {
  return (
    <>
      <div>
        <Login />
        <Main />
        <Footer />
      </div>
    </>
  );
}
