const express = require("express");

const router = express.Router();

const { scheduledMessageController } = require("../Controller/scheduledMessage/sendScheduledMessage");
const { processScheduledMessage } = require("../Controller/scheduledMessage/processScheduledMessage");
const { getScheduledMessage } = require("../Controller/scheduledMessage/getScheduledMessage");


router.post('/createScheduledMessage', scheduledMessageController);
router.post('/processScheduledMessage', processScheduledMessage);
router.post('/getScheduledMessage', getScheduledMessage);


module.exports = router;