
# 👶🔒 KidSafe AI

An AI-powered web application that helps parents and guardians detect child safety hazards in home environments, plan safer outdoor activities, and discover child-proofing products.

---

## 🛡️ Why KidSafe AI?

Every year, thousands of children suffer preventable injuries in their own homes—from sharp corners, exposed electrical outlets, and unattended kitchen tools, to unsafe furniture arrangements. According to the WHO and CDC:

- **Over 2,000 children** die annually in the U.S. due to home-related accidents.
- **Falls, burns, poisoning, and choking** are among the most common causes of injury.
- Most accidents happen in seemingly safe, familiar places like **living rooms**, **kitchens**, or **bathrooms**.

### ⚠️ The Need

Parents often overlook these risks due to lack of awareness, information overload, or simply not knowing what to look for. **KidSafe AI** was built to address this gap—by using artificial intelligence to:

- Scan **uploaded room images** for visible hazards.
- Offer **contextual safety checklists** based on outdoor activities.
- Recommend **childproofing products** tailored to the user’s concern (e.g., “sharp edges,” “kitchen safety”).

---

## 🧠 Architecture Overview

The application follows a modular, modern AI-first architecture:

```
Frontend (HTML + JS + Bootstrap)
        |
        | REST API Calls
        ▼
Node.js + Express Backend
        |
        |──▶ OpenAI GPT-4o for:
        |     └── Natural language understanding
        |     └── Tool/function calling
        |
        |──▶ Tools:
        |     └── Image analyzer (room hazard detection)
        |     └── Outdoor checklist generator
        |     └── Product recommender (based on keywords)
        |
        └──▶ Local product database (JSON)
```

- **OpenAI's Tool Calling** is used to invoke custom logic dynamically.
- **Product recommendations** are selected from a JSON-based catalog using keyword matching.
- **Hazard analysis** uses text + image input and LLM formatting logic for recommendations.

---

## 🚀 How to Run the Application Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kidsafe-ai.git
cd kidsafe-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key
```

### 4. Project Structure

```
.
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/
│   ├── index.html
│   ├── login.html
├── tools/
│   ├── productRecommendationsService.js
│   └── ...
├── data/
│   └── products.json
├── routes/
│   ├── image-analysis.js
│   ├── outdoor-safety.js
│   └── product-recommendations.js
├── server.js
└── .env
```

### 5. Start the Server

```bash
npm start
```

By default, the app runs at: `http://localhost:3000`
Enter user as "admin" and credential as "admin123" to login to the dashboard screen.  

---

## 🧪 Features

- ✅ Login page with dummy authentication
- ✅ Conversational safety agent (LLM-powered)
- ✅ Room hazard analysis from uploaded images
- ✅ Outdoor activity checklist generator
- ✅ Product recommendation system with OpenAI tool calls
- ✅ Smooth UI with Bootstrap and Font Awesome icons
- ✅ Modular architecture (easy to extend)

---

## 📚 Future Enhancements

- 🔍 Real-time object detection for hazards
- 🛒 Integration with e-commerce APIs for live product recommendations
- 📱 Mobile app version
- 🌍 Multilingual support

---

## 🤝 Contributing

If you'd like to improve KidSafe AI, feel free to fork and submit a pull request. Contributions are welcome!

---

## 📄 License

MIT License
