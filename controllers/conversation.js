const Conversation = require("../models/Conversation");

//New Conversation
const createConversation = async (req, res) => {
  try {
    const newConversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Conversation of a user
const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: req.params.userId },
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createConversation, getConversation };
