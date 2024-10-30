const cron = require("node-cron");
const axios = require("axios");
const logMessage = require("./utils/logger");

function startCronJob(io) {
  if (process.env.NODE_ENV === "test") return; 

  cron.schedule("*/5 * * * *", async () => {
    logMessage("__define-ocg__: Running cron job to fetch data from httpbin.org");

    try {
      const response = await axios.get("https://httpbin.org/anything");
      io.emit("newData", response.data);
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
}

module.exports = startCronJob;
