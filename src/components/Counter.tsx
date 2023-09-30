import React, {FC, useState} from 'react';

const Counter: FC = () => {

    const [count, setCount] = useState<number>(5);

    function increment(): void {
        setCount(count + 1);
    }

    function decrement(): void {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;