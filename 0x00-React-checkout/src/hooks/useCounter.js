import { useState } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const increase = (step = 1, stop = 100) => {
    if (counter < stop) {
      setCounter((prev) => prev + step);
    }
  };

  const decrease = (step = 1) => {
    if (counter > 0) {
      setCounter((prev) => prev - step);
    }
  };

  return { counter, increase, decrease };
};

export default useCounter;
