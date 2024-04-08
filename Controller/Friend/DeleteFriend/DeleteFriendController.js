const FriendRecordModel = require("../../../Models/FriendRecordModel");

const removeFriend = async (req, res) => {
    try {
        const { friendId, userId } = req.body;
        // console.log(req.body)

        // Find the friend record where friend_1 or friend_2 matches userId and friendId
        const friendRecord = await FriendRecordModel.findOne({
            $or: [
                { friend_1: userId, friend_2: friendId },
                { friend_1: friendId, friend_2: userId }
            ]
        });

        if (!friendRecord) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        await FriendRecordModel.deleteOne({ _id: friendRecord._id });

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { removeFriend };
