const scheduledMessageSchema = require("../../Models/ScheduledMessage");

const getScheduledMessage = async (req, res) => {
    try {
        // console.log("get scheduled");

        // Assuming the user ID is passed as a query parameter (change if needed)
        const userId = req.body.userId;
        const receiver_id = req.body.receiver_id;

        // console.log(userId);

        const scheduledMessages = await scheduledMessageSchema.aggregate([
            {
                $match: {
                    senderId: userId,
                },
                $match: {
                    reciverId: receiver_id,
                },
            },
            {
                $project: {
                    "senderId": 0,
                    "reciverId": 0,
                    "updated_at": 0,
                    "__v": 0
                }
            }
        ]);

        res.status(200).json({
            success: scheduledMessages.length > 0 ? true : false,
            messages: scheduledMessages || [],
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

module.exports = { getScheduledMessage };