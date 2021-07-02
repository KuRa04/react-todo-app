import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Todo {
  value: string
}

const App: React.VFC = () => {
  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={''} onChange={(e) => e.preventDefault()} />
        <input type='submit' value={'追加'} onChange={(e) => e.preventDefault()} />
      </form>
    </div>
  );
}

export default App;
