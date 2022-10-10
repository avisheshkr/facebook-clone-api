const express = require("express");
const { createMessage, getMessage } = require("../controllers/message");
const Message = require("../models/Message");

const router = express.Router();

// Create Message
router.post("/", createMessage);

//Get message
router.get("/:conversationId", getMessage);

module.exports = router;
