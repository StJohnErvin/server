const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const responseRoutes = require("./routes/responseRoutes");
const startCronJob = require("./cronJob");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/responses", responseRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

startCronJob(io); 

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
