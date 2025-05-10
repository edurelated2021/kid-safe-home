const express = require('express');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const { findProductsMatchingKeyWords } = require('../tools/productRecommendationsService');  // Path to the function that handles the product search

dotenv.config();
const router = express.Router();

// Initialize OpenAI instance
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the tool function to be used by the LLM

const tools = [
  {
      "type": "function",
      "name": "findProductsMatchingKeyWords",
      "description": "Given a list of relevant keywords, return products from the product database that match those keywords.",
      "parameters": {
        "type": "object",
        "properties": {
          "keywords": {
            "type": "array",
            "items": { "type": "string" },
            "description": "List of keywords to match products against."
          }
        },
        "required": ["keywords"],
        "additionalProperties": false
      }
  }
];

// Supported list of keywords to perform search with
const supportedKeywords = [
    "kitchen", "sharp corners", "edges", "door", "electric", "window", "fall", "table", "stair", "couch"
];

// Function to process user query and extract relevant keywords
router.post('/api/product-recommendations', async (req, res) => {
  try {
    const { query } = req.body;

    

    // 1. Send the query and the supported keywords list to OpenAI for keyword extraction and tool name selection
    const prompt = `
      You are a child safety expert. Given the following list of supported keywords: "${supportedKeywords}", 
      analyze the user's query: "${query}" and extract the most relevant keywords from the supported keywords list.
      Then, choose the appropriate tool for this task and return the tool name and the selected keywords in a structured JSON format.
      If a question falls outside the domain of child safety, gently let the user know that your expertise is focused on child safety and suggest they ask a question within that area. Do not provide recommendations or information on unrelated topics. The format should be:
      {
        "toolName": "name_of_the_tool_to_invoke",
        "parameters": ["keyword1", "keyword2", ...]
      }
    `;

    const response = await openAI.responses.create({
      model: 'gpt-4.1',  
      input: [
        { role: 'system', content: 'You are a helpful assistant for child safety.' },
        { role: 'user', content: prompt }
      ],
      tools,
    });
    // console.log(JSON.stringify(response, null, 2));

    // Extract tool name and parameters from the response
    let toolName = '';
    let parameters = [];
    try {
      const messageContent = response.output[0].content[0].text;
      toolName = JSON.parse(messageContent).toolName;
      parameters = JSON.parse(messageContent).parameters;
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      return res.status(400).json({ error: 'Failed to extract tool name and parameters from response.' });
    }

    // 2. Dynamically execute the corresponding tool based on the tool name
    const products = await executeTool(toolName, parameters);

    // 3. Format and return the products to LLM for a user-friendly display
    const productDetailsPrompt = `
      Here is a list of products based on the keywords extracted: 
      ${JSON.stringify(products)}

      Format this list of products into a user-friendly response using HTML, including the product name, description, image URL, and product URL.
    `;


    const productResponse = await openAI.responses.create({
      model: 'gpt-4.1',
      input: [
        { role: 'system', content: 'You are a helpful assistant for child safety.' },
        { role: 'user', content: productDetailsPrompt }
      ]
    });

    // Return the formatted HTML response
    const formattedProducts = productResponse.output_text;
    result = formattedProducts.replace(/```html\s*/g, '').replace(/```/g, '');

    res.json({ products: result });

  } catch (error) {
    console.error('Error processing recommendation:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Function to dynamically execute the tool based on the tool name and parameters
async function executeTool(toolName, parameters) {
  switch (extractToolName(toolName)) {
    case 'findProductsMatchingKeyWords':
      return await findProductsMatchingKeyWords(parameters);
    // Add more cases for other tools as needed
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

function extractToolName(toolName) {
  return toolName.replace(/^functions\./, '');
}

module.exports = router;
