type PropTypes = {
  text: string;
};

function PinCodeError({ text }: PropTypes) {
  return (
    <div
      data-testid="PinCodeError"
      className="bg-red-500 text-white text-center mt-4 p-2 rounded"
    >
      {text}
    </div>
  );
}

export default PinCodeError;
