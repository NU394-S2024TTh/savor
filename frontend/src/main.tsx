import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Fridge from './fridge/Fridge';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Fridge />
  </React.StrictMode>,
);