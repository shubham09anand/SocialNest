const express = require("express");

const {createUserSignupDetails} = require('./Controller/userSignup/userSignupController');
const {createuserProfile} = require('./Controller/userCreateProfileController');
const {loginController} = require('./Controller/userLoginController');
const { userLoggedDetails } = require("./Controller/userSignup/userLoggedDetails");


const { getTrends } = require("./Controller/miscellaneousControllers/twitterTrends");
const { AIchat } = require("./Controller/miscellaneousControllers/aiChat");
const { textToImageController } = require("./Controller/miscellaneousControllers/aiImage");

const { createuserStory } = require("./Controller/Story/makeStoryController");
const { storyDetails } = require("./Controller/Story/getStoryDetails");
const { getSelectedStory } = require("./Controller/Story/getSelectedStory");

const { getUserPostActivity } = require("./Controller/settings/AccountHistory/PostMadeByPerson");
const { userStoryHistroy } = require("./Controller/settings/AccountHistory/StoryMadeByPerson");


const router = express.Router();


router.post('/login', loginController);

router.post('/signup', createUserSignupDetails);

router.post('/makeprofile', createuserProfile);

router.post('/userLoggedDetails', userLoggedDetails);

router.post('/createuserStory', createuserStory);

router.post('/storyDetails', storyDetails);

router.get('/getSelectedStory', getSelectedStory);

router.post('/getUserPostActivity', getUserPostActivity);

router.post('/getUserStoryActivity', userStoryHistroy);

router.get('/getTwitterTrends', getTrends);

router.get('/aiResponse', AIchat);

router.post('/textToImage', textToImageController);

module.exports = router;