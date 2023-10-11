import '../user.css';

export default function Login() {
  return (
    <>
      <div className='header_top'>
        <div className='top_inner'>
          <ul className='top_list'>
            <li className='top_item'>
              <a href='/notice' className='top_link'>
                신고
              </a>
            </li>
            <li className='top_item'>
              <a href='/my' className='top_link'>
                로그인
              </a>
            </li>
            <li className='top_item'>
              <a href='/saved' className='top_link'>
                회원가입
              </a>
            </li>
            <li className='top_item'>
              <a href='#notifications' className='top_link'>
                마이페이지
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='text-6xl text-center mx-[100px] py-10'>
        <a href='/'>JINDDOBAY</a>
      </div>
    </>
  );
}
