const Message = require("../models/Message");

// Create Message
const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Message
const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessage };
