const FriendRequestModle = require("../../../Models/FriendRequestModle");
const FriendRecordModel = require("../../../Models/FriendRecordModel");

const processFriendRequest = async (req, res) => {
     try {
          // console.log("Processing Friend Request");

          const { reciverId, senderId, action } = req.body;
          console.log(req.body)
          
          const receivedFriendRequest = await FriendRequestModle.findOne({
               reciverId: reciverId,
               senderId: senderId,
          });

          if (receivedFriendRequest) {
               let newFriend;

               if (action === "Accepted") {
                    newFriend = await FriendRecordModel.create({
                         friend_1: reciverId,
                         friend_2: senderId,
                    });

                    if (newFriend) {
                         const friendRequestIdToDelete = receivedFriendRequest._id;
                         const deletedFriendRequest = await FriendRequestModle.deleteOne({ _id: friendRequestIdToDelete });
                         
                         return res.status(200).json({
                              message: true,
                              newFriend: newFriend,
                              deletedFriendRequest: deletedFriendRequest,
                         });
                    } else {
                         return res.status(200).json({
                              message: "Something Went Wrong",
                         });
                    }
               } else if (action === "Rejected") {
                    const friendRequestIdToDelete = receivedFriendRequest._id;
                    const deletedFriendRequest = await FriendRequestModle.deleteOne({ _id: friendRequestIdToDelete });

                    return res.status(200).json({
                         message: "Friend request rejected",
                         deletedFriendRequest: deletedFriendRequest,
                    });
               }
          } else {
               return res.status(404).json({
                    message: "Friend Request Not Found yo",
               });
          }
     } catch (error) {
          console.error("Error:", error);
          return res.status(500).json({
               message: "Server Error",
               error: error,
          });
     }
};

module.exports = { processFriendRequest };
