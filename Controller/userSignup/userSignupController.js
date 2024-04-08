const UserSignupModel = require("../../Models/UserSignupModel");

const createUserSignupDetails = async (req, res) => {
     try {
          // console.log("register")
          // console.log(req.body.password);

          const userLoginData = req.body;

          const existingUser = await UserSignupModel.findOne({ userName: req.body.userName});

          if (!existingUser) {
                 
               const newUserLoginData = await UserSignupModel.create( userLoginData);

               res.status(200).json({
                    message: true,
                    loginDetails: newUserLoginData,
               });
               
          } else {
               res.status(200).json({
                    message: false,
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

module.exports = { createUserSignupDetails };
