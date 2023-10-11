import '../../globals.css';
import dynamic from 'next/dynamic';
import Search from '../../components/search/search';

const DynamicSearch = dynamic(
  () => import('../../components/search/search'), // 실제 컴포넌트의 경로를 사용하세요.
  { ssr: true } // Server-Side Rendering 비활성화
);

export default function Search_P() {
  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          <DynamicSearch /> {/* 동적으로 불러온 Search 컴포넌트 사용 */}
        </div>
      </div>
    </div>
  );
}
