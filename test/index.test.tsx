import Adapter from 'enzyme-adapter-react-16';
import React, { useState } from 'react';
import { mount, configure } from 'enzyme';
import { createStore, useStore, Provider } from '../src';

configure({ adapter: new Adapter() });

function useCounter() {
  const [count, setCount] = useState(0);
  const decrement = () => setCount(count - 1);
  const increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

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

test('basic', () => {
  createStore('counter', useCounter);
  const App = () => (
    <Provider>
      <CounterEdit />
      <CounterDisplay />
    </Provider>
  );

  const app = mount(<App />);
  const span = app.find('span');
  const btns = app.find('button');

  expect(span.text()).toBe('0');
  btns.at(1).simulate('click');
  expect(span.text()).toBe('1');
  btns.at(0).simulate('click');
  expect(span.text()).toBe('0');
});
