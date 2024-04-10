import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import io from "socket.io-client";

import Button from "./components/Button";
import Modal from "./components/Modal";
import PinCode from "./components/pinCode/PinCode";
import AuthorizedPanel from "./components/AuthorizedPanel";
import Toaster from "./components/Toaster";

const socket = io("http://localhost:3001");

function App() {
  const [open, setOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [hasFailer, setHasFailer] = useState("");

  useEffect(() => {
    function onConnect() {
      console.log("Connected to the server");
    }

    function onDisconnect() {
      console.log("Disconnected from the server");
    }

    function systemFailerEvent(message: string) {
      setHasFailer(message);
      console.log(message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("System Failer", systemFailerEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("System Failer", systemFailerEvent);
    };
  }, []);

  const handleSubmit = () => {
    setIsAuthorized(true);
  };

  const logoutHandler = () => {
    setIsAuthorized(false);
  };

  return (
    <>
      {ReactDom.createPortal(
        <Toaster type="error" message={hasFailer} />,
        document.getElementById("toaster")!
      )}
      <div className="h-full w-full flex justify-center items-center min-w-full min-h-full">
        <div className="container mx-auto flex justify-center items-center">
          <Button onClick={() => setOpen(true)} text="Abort procedure" />
        </div>
        <Modal show={open} onClose={() => setOpen(false)}>
          {!isAuthorized && (
            <PinCode attemptCount={4} onSubmit={handleSubmit} />
          )}
          {isAuthorized && <AuthorizedPanel onLogout={logoutHandler} />}
        </Modal>
      </div>
    </>
  );
}

export default App;
