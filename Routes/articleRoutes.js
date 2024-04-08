const express = require("express");

const router = express.Router();

const {createArticle} = require('../Controller/Other/ArticleController');
const { getArticle } = require("../Controller/Other/getAllArticles");
const { getRequestedArticle } = require("../Controller/Other/getReuestedArticleController");

router.post('/createArticle',  createArticle);
router.get('/getArticle', getArticle);
router.get('/getRequestedArticle?/:articleId', getRequestedArticle);

module.exports = router;