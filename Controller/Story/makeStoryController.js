const Story = require("../../Models/StoryModel");

const createuserStory = async (req, res) => {
  try {
    // console.log("Story");

    
    const { userId, storyMessage, storyPhoto, duration , postCreationTime } = req.body;
    console.log(userId)

    const checkStoryExistance = await Story.findOne({ userId: userId });

    if (checkStoryExistance) {
      console.log("Exist");

      // Corrected the usage of the spread operator and fixed the arrays to push into
      checkStoryExistance.storyMessage.push(storyMessage);
      checkStoryExistance.storyPhoto.push(storyPhoto);
      checkStoryExistance.duration.push(duration);
      checkStoryExistance.postCreationTime.push(postCreationTime);

      await checkStoryExistance.save(); // Save the changes to the existing document

      res.status(200).json({
        message: 'Story Created Successfully',
      });

    } else {
      const userStory = req.body;
      const newUserStory = await Story.create(userStory);

      res.status(200).json({
        message: 'Story Created Successfully',
        Story: newUserStory,
      });
    }

  } catch (error) {
    console.error('Error Creating Story:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { createuserStory };
