const mongoose = require("mongoose");

// Define a schema for stories
const storySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID of the corresponding user who created the story is required"],
    },
    storyMessage: [[{
      type: String,
      required: [function () { return !this.storyPhoto; }, "Either 'storyMessage' or 'storyPhoto' is required."],
    }]],
    storyPhoto: [
      [
        {
          type: String,
          required: [function () { return !this.storyMessage; }, "Either 'storyMessage' or 'storyPhoto' is required."],
        }
      ]
    ],
    duration: [[{
      type: Number, // Assuming you want to store the duration in hours
      required: true
    }]],
    postCreationTime: [[{
      type: Date,
      required: true
    }]],
  },
);

module.exports = mongoose.model("Story", storySchema, "StoryCollection");
