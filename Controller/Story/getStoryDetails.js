const storySchema = require("../../Models/StoryModel")

const storyDetails = async (req, res) => {
  try {
    const Story = await storySchema.aggregate([
      {
        $lookup: {
          from: "UserSignupDataCollection",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toObjectId: "$$userId" }, "$_id"] },
              },
            },
          ],
          as: "storyUserDetalis",
        },
      },
      {
        $project: {
          "storyUserDetalis.password": 0,
          "storyUserDetalis.createdAt": 0,
          "storyUserDetalis.updatedAt": 0,
          "storyUserDetalis.__v": 0,
          "storyUserDetalis._id": 0,
        }
      }
    ]);

    if (Story.length == 0) {
      res.status(400).json({
        message: "No Story Exists",
        storyDetails: Story,
      });
    } else {
      res.status(200).json({
        message: "Story Exists",
        storyDetails: Story,
      });
    }
  } catch (error) {
    console.error("Procedure failed:", error);
    res.status(500).json({
      message: "Internal Server Errorqwqeqwdw",
      error: error.message,
    });
  }
};

module.exports = { storyDetails };
