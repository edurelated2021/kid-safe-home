const express = require('express');
const router = express.Router();
const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage } = require("@langchain/core/messages");
require("dotenv").config();

router.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }
  try {
    const model = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-4",  
      openAIApiKey: process.env.OPENAI_API_KEY
    });

    const response = await model.call([
      new HumanMessage(`You are a child safety expert. Answer in a friendly, clear, and actionable way. If a question falls outside the domain of child safety, gently let the user know that your expertise is focused on child safety and suggest they ask a question within that area. Do not provide recommendations or information on unrelated topics. Provide suggestions using HTML formatting with <h3> for sections and <ul>/<li> for tips. Question: ${question}`)
    ]);

    res.json({ answer: response.text });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
