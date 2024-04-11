import { useEffect, useState } from "react";

/*
 * This hook will countdown from the initialTime to 0.
 * When the countdown ends, the onCountdownEnd callback will be called.
 */
const useCountdown = (initialTime: number, onCountdownEnd: () => void) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          onCountdownEnd(); // Call the callback when countdown ends
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount or dependency change
  }, [initialTime, onCountdownEnd]);

  return time;
};

export default useCountdown;
