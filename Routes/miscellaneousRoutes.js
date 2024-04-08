const express = require("express");

const router = express.Router();

const { getTrends } = require("../Controller/miscellaneousControllers/twitterTrends");
const { AIchat } = require("../Controller/miscellaneousControllers/aiChat");
const { textToImageController } = require("../Controller/miscellaneousControllers/aiImage");

router.get('/getTwitterTrends', getTrends);
router.get('/aiResponse', AIchat);
router.post('/textToImage', textToImageController);

module.exports = router;