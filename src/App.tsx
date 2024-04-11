import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import Button from "./components/Button";
import Modal from "./components/Modal";
import PinCode from "./components/pinCode/PinCode";
import AuthorizedPanel from "./components/AuthorizedPanel";

const socket = io("http://localhost:3001");

function App() {
  const [open, setOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    function onConnect() {
      console.log("Connected to the server");
    }

    function onDisconnect() {
      console.log("Disconnected from the server");
    }

    function systemFailerEvent(message: string) {
      toast(message);
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
      <ToastContainer />
      <main className="h-full w-full flex justify-center items-center min-w-full min-h-full">
        <section className="container mx-auto flex justify-center items-center">
          <Button onClick={() => setOpen(true)} text="Abort procedure" />
        </section>
        <Modal show={open} onClose={() => setOpen(false)}>
          {!isAuthorized && (
            <PinCode attemptCount={4} onSubmit={handleSubmit} />
          )}
          {isAuthorized && <AuthorizedPanel onLogout={logoutHandler} />}
        </Modal>
      </main>
    </>
  );
}

export default App;
