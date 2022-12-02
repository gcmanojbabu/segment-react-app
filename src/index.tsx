import React from 'react';
import ReactDOM from 'react-dom/client';

import { HomeScreen } from './screens/HomeScreen/HomeScreen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='App'>
      <HomeScreen />
    </div>
  </React.StrictMode>
);
