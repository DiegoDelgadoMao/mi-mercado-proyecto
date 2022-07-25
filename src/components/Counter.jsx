import { useState, useReducer } from 'react';

const initialState = {
	count: 0,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SUM':
			return { count: state.count + 1 };
		case 'RES':
			return { count: state.count - 1 };
		default:
			return state;
	}
};

export const Counter = () => {
	// const [counter, setCounter] = useState(0);

	const [state, dispatch] = useReducer(reducer, initialState);
	const sum = () => dispatch({ type: 'SUM' });
	const res = () => dispatch({ type: 'RES' });
	return (
		<div style={{ textAlign: 'center', color: 'white', fontZise: '30px' }}>
			<h2>useReducer</h2>
			<nav>
				<button onClick={sum}>+</button>
				<button onClick={res}>-</button>
			</nav>
			<h3>{state.count}</h3>
		</div>
	);
};
