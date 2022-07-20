import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "./redux/action/counterAction"

function Counter(props) {
    const dispatch = useDispatch()
    const c = useSelector(state => state.counter.counter)
    const incrementHandle = () => {
        dispatch(increment())
    }

    const decrementHandle = () => {
        dispatch(decrement());
    }

    return (
        <div>
            <button onClick={incrementHandle}>+</button>
            {c}
            <button onClick={decrementHandle}>-</button>
        </div>
    );
}

export default Counter;