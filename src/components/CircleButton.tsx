import React from "react";

type PropTypes = {
  text: string | React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

const CircleButton = ({ text, onClick, disabled }: PropTypes) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        "w-12 h-12 flex items-center justify-center rounded-full focus:outline-none " +
        (disabled
          ? "border-gray-200 border-2 text-gray-200"
          : "bg-gray-200 hover:bg-gray-400")
      }
    >
      <span className="text-xl">{text}</span>
    </button>
  );
};

export default CircleButton;
