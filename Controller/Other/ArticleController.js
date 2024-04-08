const Article = require("../../Models/ArticleModel");

const createArticle = async (req, res) => {
  try {
    // console.log("Article");
    const articleData = req.body;

    // Log the incoming data to inspect the structure
    // console.log("Received data:", articleData);

    // Save the article to the database
    const savedArticle = await Article.create(articleData);

    res.status(201).json({ success: true, article: savedArticle });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = { createArticle };
