const Article = require("../../Models/ArticleModel");

const getArticle = async (req, res) => {
   try {
    //   console.log("Article");

      const articlesData = await Article.aggregate([
          {
               $lookup: {
                   from: "UserSignupDataCollection",
                   let: { userIdObj: { $toObjectId: "$userID" } },
                   pipeline: [
                       {
                           $match: {
                               $expr: {
                                   $eq: ["$_id", "$$userIdObj"]
                               }
                           }
                       },
                       {
                         $project: {
                             "password": 0
                         }
                     }
                   ],
                   as: "writerdata"
               }
           },
           {
                $project: {
                     "writerdata.dateOfBirth": 0,
                     "writerdata.phoneNumber": 0,
                     "writerdata.city": 0,
                     "writerdata.state": 0,
                     "writerdata.country": 0,
                     "writerdata.description": 0,
                     "writerdata.createdAt": 0,
                     "writerdata.updatedAt": 0,
                     "writerdata.__v": 0,
                },
           },
      ]);

      res.status(201).json({ success: true, article: articlesData });
   } catch (error) {
      console.error("Error getting articles:", error);
      res.status(500).json({
         success: false,
         error: "Internal Server Error",
      });
   }
};

module.exports = { getArticle };
