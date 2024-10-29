const Response = require('../models/Response');

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
