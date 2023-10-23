import '../../globals.css';
import dynamic from 'next/dynamic';
import State from '../../components/state/statetest';

export default function State_P() {
  return (
    <div className='container1'>
      <div className='main-content'>
        <div className='center-content'>
          <State /> {/* 동적으로 불러온 Search 컴포넌트 사용 */}
        </div>
      </div>
    </div>
  );
}
