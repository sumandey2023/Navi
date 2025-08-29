require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./db/connectDB");
const { initSocketServer } = require("./sockets/socketServer");
const http = require("http");
const server = http.createServer(app);

initSocketServer(server);
connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
