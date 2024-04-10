import { useEffect, useState } from "react";
import PinCodeError from "./PinCodeError";

type PropTypes = {
  onUnlocked: () => void;
};

function LockError({ onUnlocked }: PropTypes) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) {
      onUnlocked();
    }
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, setTime, onUnlocked]);

  return (
    <PinCodeError
      data-testid="LockError"
      text={`You are locked for ${time} seconds.`}
    />
  );
}

export default LockError;
