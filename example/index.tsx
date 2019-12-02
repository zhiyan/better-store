import React, { useState } from 'react';
import { render } from 'react-dom';
import { Provider, useStore, createStore } from '../src/index';

function useCounter() {
  const [count, setCount] = useState(0);
  const decrement = () => setCount(count - 1);
  const increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

createStore('counter', useCounter);

function CounterEdit() {
  const counter = useStore('counter');

  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

function CounterDisplay() {
  const count = useStore(({ counter }) => counter.count);

  return <div>{count}</div>;
}

function App() {
  return (
    <Provider>
      <CounterEdit />
      <CounterDisplay />
    </Provider>
  );
}

render(<App />, document.getElementById('root'));
