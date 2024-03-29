# Better Store

> Pure hooks to replace any React State Management libraries


### install

```bash
  npm install better-store
```

### example

```javascript
import React, { useState } from 'react';
import { Provider, useStore, createStore } from 'better-store';
import { render } from 'react-dom';

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

React.render(<App />, document.getElementById('root'));

```

