const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const responseRoutes = require("./routes/responseRoutes");
const startCronJob = require("./cronJob");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/responses", responseRoutes);

startCronJob(); 

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; 
