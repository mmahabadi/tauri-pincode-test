import { Dialog } from "@headlessui/react";

type PropTypes = {
  onLogout: () => void;
};

function AuthorizedPanel({ onLogout }: PropTypes) {
  return (
    <>
      <div className="bg-cyan-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-white"
            >
              Stop Procedure
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-white">
                Are you sure you want to stop the procedure?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cyan-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-cyan-800 shadow-sm hover:bg-white sm:ml-3 sm:w-auto"
          onClick={onLogout}
        >
          Stop Procedure
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:text-white sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default AuthorizedPanel;
