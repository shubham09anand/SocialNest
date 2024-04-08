const FriendRequest = require("../../../Models/FriendRequestModle")

const newFriendRequest = async (req, res) => {
  try {
    // console.log("Friend Reuqest Sent")
    
     const friendRequest = req.body;
    
     const exisitingFriendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: req.body.senderId, reciverId: req.body.reciverId },
        { senderId: req.body.reciverId, reciverId: req.body.senderId }
      ]
    });
    
    if (!exisitingFriendRequest) {
      const newfriendRequest = await FriendRequest.create(friendRequest);

      res.status(200).json({
        message: 'Friend Reuqest Sent',
        friendRequest: newfriendRequest,
      });
    }
    else{
      res.status(200).json({
        message: 'Friend Reuqest Already Exist',
        friendRequest: newfriendRequest,
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Process Falied',
      error: error.message, 
    });
  }
};

module.exports = {newFriendRequest};