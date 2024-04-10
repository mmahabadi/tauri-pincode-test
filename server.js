import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:1420",
  },
});
//
// ─── MIDDLEWAREs ─────────────────────────────────────────────────────────────────────
//
app.use(cors());
app.use(bodyParser.json());

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
app.post("/api/auth", (req, res) => {
  res.send({ auth: req.body.pin === "1111" ? "Authorized" : "Failed" });
});

//
// ─── SOCKET.IO ─────────────────────────────────────────────────────────────────────
//

io.on("connection", (socket) => {
  console.log("A client connected");

  setTimeout(() => {
    socket.emit("System Failer", "a motor failure occurs. motor number 1");
  }, Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000);
  //(between 3 to 10 seconds)

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

//
// ─── RUN SERVER ─────────────────────────────────────────────────────────────────
//
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
