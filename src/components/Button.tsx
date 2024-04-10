type PropTypes = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: PropTypes) => {
  return (
    <button
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
