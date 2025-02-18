import Button from "@mui/material/Button";
import { useEffect } from "react";

export function Counter(props) {
  const { counter, setCounter } = props;
  // Store counter in localStorage
  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  function increaseCount() {
    setCounter(counter + 1);
  }

  function decreaseCount() {
    setCounter(counter - 1);
  }

  function resetCount() {
    setCounter(0);
  }

  return (
    <div className="flex-1">
      <div className="counter card">
        <div>Counter: {counter}</div>
        <div className="flex btn">
          <Button variant="contained" onClick={decreaseCount}>
            -
          </Button>
          <Button variant="contained" onClick={resetCount}>
            Reset
          </Button>
          <Button variant="contained" onClick={increaseCount}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
