const UserLogin = require("../../Models/UserSignupModel");

const updatePassword = async (req, res) => {
     // console.log("update Password");
     try {
          const userId = req.body.userId;
          const newPassword = req.body.newPassword;

          // Find the user by userId
          const user = await UserLogin.findById(userId);

          // Check if the user exists
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: "User not found",
               });
          }

          // Update the user's password
          user.password = newPassword;
          await user.save();

          res.status(200).json({
               success: true,
               message: "Password updated successfully",
          });
     } catch (error) {
          console.error("Password updation failed:", error.message);
          res.status(500).json({
               success: false,
               message: "Error during updation",
               error: error.message,
          });
     }
};

module.exports = { updatePassword };