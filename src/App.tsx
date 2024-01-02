import { App as AntdApp } from 'antd';

import { MotionLazy } from './components/Animate/motion-lazy';
import Router from './router';
import AntdConfig from './theme/antd';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
