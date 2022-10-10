const express = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversation");

const router = express.Router();

//New Conversation
router.post("/", createConversation);

//Get Conversation of a user
router.get("/:userId", getConversation);

module.exports = router;
