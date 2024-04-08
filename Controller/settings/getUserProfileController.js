const UserSignupModel = require("../../Models/UserSignupModel"); // modle to get the user signup data
const User = require("../../Models/UserProfileModle") // modle to get the user profile data

const getUserProfile = async (req, res) => {
     try {
          // console.log("get user profile")
          // console.log(req.body.userId);

          const userId = req.body.userId;

          const userProfile1 = await UserSignupModel.findOne({ _id: userId});
          const userProfile2 = await User.findOne({ userId: userId});
                              
          if (userProfile1) {
               res.status(200).json({
                    message: "Data Fetched",
                    userProfile1: userProfile1,
                    userProfile2: userProfile2,
               });
          }
          else{
               res.status(400).json({
                    message: "Something went wrong",
                    userProfile1: userProfile1,
                    userProfile2: userProfile2,
               });
          }
     } catch (error) {
          console.error("Login Failed:", error);
          res.status(500).json({
               message: "Internal Server Error",
               error: error.message,
          });
     }
};

module.exports = { getUserProfile };
