const express = require("express");

const router = express.Router();

const { scheduledMessageController } = require("../Controller/scheduledMessage/sendScheduledMessage");
const { getScheduledMessage } = require("../Controller/scheduledMessage/getScheduledMessage");
const { deleteScheduledMessageController } = require("../Controller/scheduledMessage/deleteScheduledMessage");
const { processScheduledMessage } = require("../Controller/scheduledMessage/processScheduledMessage");

router.post('/createScheduledMessage', scheduledMessageController);
router.post('/processScheduledMessage', processScheduledMessage);
router.post('/getScheduledMessage', getScheduledMessage);
router.post('/deleteScheduledMessage', deleteScheduledMessageController);


module.exports = router;