const mongoose = require("mongoose");

// Define a schema for messages
const scheduledMessageSchema = new mongoose.Schema(
  {
    // User ID of the sender
    senderId: {
      type: String,
      required: [true, "Source ID is required"],
    },
    // User ID of the receiver
    reciverId: {
      type: String,
      required: [true, "Target ID is required"],
    },
    // Body of the message
    scheduledMessage: {
      type: String,
      required: [true, "Message is required"],
    },
    scheduledDateTime: {
        type: Date,
        required: [true, "Date and time are required"],
      },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } // Specify custom field names for timestamps
);

// Create a Mongoose model for the Message schema
module.exports = mongoose.model("ScheduledMessage", scheduledMessageSchema, "ScheduledMessageCollection");
