const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCV0_I26dExFLwWMbju9ZokQyZGOAKa_Ak");

const AIchat = async (req, res) => {
  try {

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const value = (req.query.userInput)
    // console.log(value)

    const result = await model.generateContent(value);
    const response = await result.response;

    const text = response.text();

    res.status(200).json({
      message: 'Success',
      generatedText: text,
      resultRES:result
    });

  } catch (error) {
    console.error('Error Creating Post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = { AIchat };