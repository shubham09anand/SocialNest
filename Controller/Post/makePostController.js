const Post = require("../../Models/PostModel")

const createuserPost = async (req, res) => {
  try {
    console.log("Post")
    // console.log(req.body.message);
    
     const userPost = req.body;
    
     const newUserPost = await Post.create(userPost);

     res.status(200).json({
          message: 'Post Created Succesfully',
          post: newUserPost,
     });
    
  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message, 
    });
  }
};

module.exports = {createuserPost};