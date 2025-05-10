const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/api/photo-analysis', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  try {
    const imagePath = path.resolve(req.file.path);
    const fileData = fs.readFileSync(imagePath);
    const base64Image = fileData.toString('base64');
    const prompt = `
      You are a child safety expert.

      Your job is to:
      - Analyze an image of a home interior.
      - Identify any potential safety hazards for toddlers.
      - Suggest actionable safety improvements.
      - Also highlight any positive safety features already present in the image.

      If the image is not a home interior:
      - Gently ask the user to upload a relevant home interior photo.

      Please format your response using valid HTML:
      - Use <h3> for section headings.
      - Use <ul> and <li> for listing points under each section.
	  
	  If an image is not a home interior image, gently request the user to upload an image that shows home interiors. Do not provide any assessment, recommendations or information on unrelated images or topics. 

      Your response should include these three sections:
      1. <h3>Potential Hazards</h3>
      2. <h3>Recommended Improvements</h3>
      3. <h3>Positive Safety Features Detected</h3>
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a child safety expert. When shown an image of a home interior, identify any potential safety hazards for toddlers and suggest actionable improvements. If the image is not a home interior, gently ask the user to upload a relevant photo. Respond using clean HTML with bullet points and sections."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this image for child safety concerns at home."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "high" // important: required key
              }
            }
          ]
        }
      ],
      max_tokens: 1400
    });

    const htmlResponse = `
    <div class="row mt-4">

      <div class="col-md-8">
        <div class="alert alert-warning">
          ${response.choices[0].message.content}
        </div>
      </div>
      <div id="annotatedImageContainer" class="col-md-4 position-relative d-inline-block">
        <img id="annotatableImage" src="data:image/jpeg;base64,${base64Image}" class="img-thumbnail" style="max-width: 100%;" />
      </div>
    </div>
    `;

    res.json({ result: htmlResponse });

  } catch (err) {
    console.error("Photo analysis error:", err.message);
    res.status(500).json({ error: 'Image analysis failed.' });
  } finally {
    fs.unlinkSync(req.file.path); // Cleanup
  }
});

module.exports = router;
