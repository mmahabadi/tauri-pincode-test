import { useEffect, useState } from "react";
import PinCodeError from "./PinCodeError";
import KeyPad from "./KeyPad";
import PinPattern from "./PinPattern";
import LockError from "./LockError";
import Loading from "../Loading";

type PropTypes = {
  onSubmit: () => void;
  attemptCount: number;
};

function PinCode({ onSubmit, attemptCount }: PropTypes) {
  const [pin, setPin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [leftAttempts, setLeftAttemps] = useState(attemptCount);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkPasscode = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/auth", {
        method: "POST",
        body: JSON.stringify({ pin }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      setLoading(false);
      if (result.auth === "Authorized") {
        onSubmit();
      } else {
        setHasError(true);
        setLeftAttemps((prev) => prev - 1);
        setPin("");
        if (leftAttempts === 1) {
          setIsLocked(true);
        }
      }
    } catch (err) {
      setPin("");
      console.error(err);
    }
  };

  useEffect(() => {
    if (pin.length === attemptCount) {
      checkPasscode();
    }
  }, [attemptCount, pin]);

  const handleClick = (number: number) => {
    setPin((prev) => prev + number);
  };

  const removeHandler = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const unlockHanlder = () => {
    setHasError(false);
    setIsLocked(false);
    setLeftAttemps(attemptCount);
  };

  return (
    <div className="align-center w-[300px]">
      <p className="text-gray-200 text-center">
        Login <br /> The key is 1111
      </p>
      <PinPattern data-test="pin-pattern" pin={pin} />
      {loading && <Loading />}
      <KeyPad
        onKeyPress={handleClick}
        onDelete={removeHandler}
        disabled={isLocked}
      />

      {hasError && leftAttempts > 0 && (
        <PinCodeError
          text={`Oops! The passkey is wrong. you have ${leftAttempts} more attempts.`}
        />
      )}
      {isLocked && <LockError onUnlocked={unlockHanlder} />}
    </div>
  );
}

export default PinCode;
