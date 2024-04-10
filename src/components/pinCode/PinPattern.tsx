type PropTypes = {
  pin: string;
};

function PinPattern({ pin }: PropTypes) {
  return (
    <div
      data-testid="PinPattern"
      className="flex flex-row justify-center items-center rounded-full"
    >
      {Array.from(Array(4).keys()).map((number) => (
        <div
          key={"pin-" + number}
          className={
            "h-4 w-4 m-2 border-2 rounded-full " +
            (number < pin.length ? "bg-gray-100" : "border-gray-100")
          }
        ></div>
      ))}
    </div>
  );
}

export default PinPattern;
