type ToastType = {
  type: "success" | "error";
  message: string;
};

const Toaster = ({ type, message }: ToastType) => {
  return (
    <div className="fixed top-0 right-0 z-20 flex items-end justify-center p-4 pointer-events-none">
      {message && (
        <div
          className={`bg-gray-100 p-4 rounded-md shadow-md border-l-4 ${
            type === "success" ? "border-green-500" : "border-red-500"
          } pointer-events-auto`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toaster;
