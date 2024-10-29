require('dotenv').config();
console.log('Database URL:', process.env.DATABASE_URL); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const responseRoutes = require('./routes/responseRoutes');
const startCronJob = require('./cronJob'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/responses', responseRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

startCronJob(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
