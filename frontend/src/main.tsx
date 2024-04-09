import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import EnhancedTable from './components/table/tablerow';

import Homepage from './homepage/homepage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <EnhancedTable></EnhancedTable> */}
    <Homepage />
  </React.StrictMode>,
);