const axios = require('axios');
const cron = require('node-cron');
const Response = require('./models/Response');
const generateRandomData = require('./utils/generateRandomData');
const { logMessage, logError } = require('./utils/logger');

function startCronJob(io) {
  cron.schedule('*/5 * * * *', async () => {
    logMessage('__define-ocg__: Running cron job to fetch data from httpbin.org');

    try {
      const payload = generateRandomData();

      const response = await axios.post('https://httpbin.org/anything', payload);

      const responseData = new Response({
        data: response.data,
        createdAt: new Date()
      });

      await responseData.save();
      logMessage('Data saved to database');

      io.emit('new_data', responseData);
      logMessage('New data emitted to clients');
    } catch (error) {
      logError(`Error in cron job: ${error.message}`);
    }
  });
}

module.exports = startCronJob;
