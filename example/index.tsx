import React, { useState } from "react"
import { Provider, useStore, createStore } from "../src/index"
import { render } from "react-dom"

function useCounter() {
	let [count, setCount] = useState(0)
	let decrement = () => setCount(count - 1)
	let increment = () => setCount(count + 1)
	return { count, decrement, increment }
}

createStore('counter', useCounter);

function CounterEdit() {
	let counter = useStore('counter')
  
	return (
		<div>
			<button onClick={counter.decrement}>-</button>
			<span>{counter.count}</span>
			<button onClick={counter.increment}>+</button>
		</div>
	)
}

function CounterDisplay(){
	const count = useStore(({counter}) => counter.count);

	return (<div>{count}</div>)
}

function App() {
	return (
		<Provider>
			<CounterEdit />
			<CounterDisplay />
		</Provider>
	)
}

render(<App />, document.getElementById("root"))