import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/counterSlice';
import type { RootState, AppDispatch } from '../store/store';
import { incrementByAmount } from '../store/counterSlice';

const Counter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: RootState) => state.counter.value);

    return (
        <div>
            <h3>Count: {count}</h3>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button>
            <button onClick={() => dispatch(incrementByAmount(-10))}>Decrement by 10</button>
        </div>
    );
};

export default Counter;