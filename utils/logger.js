const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };
  
  const logError = (error) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${error}`);
  };
  
  module.exports = {
    logMessage,
    logError
  };
  