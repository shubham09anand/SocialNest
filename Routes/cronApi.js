const cron = require('node-cron');
const axios = require('axios');

const scheduleCronJob = () => {
  cron.schedule('* * * * *', async () => {
    try {
      // Assuming that the processScheduledMessage route is mounted at '/auth/processScheduledMessage'
      const response = await axios.post('http://localhost:8080/auth/processScheduledMessage');
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};

module.exports = { scheduleCronJob };
