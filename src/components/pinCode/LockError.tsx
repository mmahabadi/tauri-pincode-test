import PinCodeError from "./PinCodeError";
import useCountdown from "../../hooks/useCountdown";

type PropTypes = {
  onUnlocked: () => void;
};

const LOCK_TIME = 30;

function LockError({ onUnlocked }: PropTypes) {
  const time = useCountdown(LOCK_TIME, onUnlocked);

  return (
    <PinCodeError
      data-testid="LockError"
      text={`You are locked for ${time} seconds.`}
    />
  );
}

export default LockError;
