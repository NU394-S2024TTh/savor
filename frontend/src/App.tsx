import './App.css';

import React, { useState } from 'react';

import logo from './logo.svg';

import Fridge from './fridge/Fridge';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Fridge />
      </header>
    </div>
  );
}

export default App;
