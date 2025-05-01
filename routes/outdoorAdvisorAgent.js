const express = require('express');
const router = express.Router();
const { ChatOpenAI } = require('@langchain/openai');
const { ChatPromptTemplate } = require('@langchain/core/prompts');

router.post('/api/outdoor-safety', async (req, res) => {
  const { outdoorActivity, childAge } = req.body;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `
      You are an expert in child outdoor safety.
      A parent will describe an outdoor plan in free-form text, such as:
      - "We're going to the mountains with our toddler."
      - "My child is attending a beach picnic."
      - "A 5-year-old is joining us on a camping trip."

      Your task is to extract key context and give safety advice suitable for a child aged ${childAge}.

      Be thoughtful and age-aware. Include risks like terrain, insects, dehydration, wildlife, and more.
      Provide suggestions using HTML formatting with <h3> for sections and <ul>/<li> for tips.

      If the description is unclear or missing key details, politely ask for more information.
    `],
    ["human", outdoorActivity]
  ]);

  try {
    const llm = new ChatOpenAI({
      modelName: "gpt-4.1", 
      temperature: 0.7,
    });

    const chain = prompt.pipe(llm);

    const response = await chain.invoke({});

    let result = response.content || response.text || "";
    result = result.replace(/```html\s*/g, '').replace(/```/g, '');

    res.json({ answer: result });
  } catch (err) {
    console.error('Outdoor Safety Error:', err);
    res.status(500).json({ error: "Outdoor safety advisor failed." });
  }
});

module.exports = router;
