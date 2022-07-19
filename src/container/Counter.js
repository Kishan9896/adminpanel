import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "./redux/action/counterAction"

function counter(props) {
    const dispatch = useDispatch ()
    const c = useSelector(state => state.counter.counter)
    const incrementHandle = () => {
        dispatch(increment())
    }

    const decrementHandle = () => {
        dispatch(decrement);
    }

    return (
        <div>
            <button onClick={increment}>+</button>
            {c}
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default counter;