
# 👶🔒 KidSafe AI

An AI-powered web application that helps parents and guardians detect child safety hazards in home environments, plan safer outdoor activities, and discover child-proofing products.

---

## 🛡️ Why KidSafe AI?

Every year, thousands of children suffer preventable injuries in their own homes—from sharp corners, exposed electrical outlets, and unattended kitchen tools, to unsafe furniture arrangements. Here are some startling statistics related to home related injuries:

- **More than 2,000 children** younger than 15 years die annually in the United States due to home-related accidents.
- **More than 3.4 million children** suffer unintentional accidental injuries in the home annually.
- **Falls, burns, poisoning, and choking** are among the most common causes of injury.
- Most accidents happen in seemingly safe, familiar places like **living rooms**, **kitchens**, or **bathrooms**.

**References**  
- [Protecting Children in Your Home](https://safekids.org/sites/default/files/documents/ResearchReports/report_to_the_nation_protecting_children_in_your_home.pdf)
- [Home Safety Program](https://www.nationwidechildrens.org/research/areas-of-research/center-for-injury-research-and-policy/injury-topics/research-projects/home-safety-program)
- [Injury Statistics](https://www.stanfordchildrens.org/en/topic/default?id=accident-statistics-90-P02853)

### ⚠️ The Need

Parents often overlook these risks due to lack of awareness, information overload, or simply not knowing what to look for. **KidSafe AI** is built to address this gap—by using artificial intelligence to:
- Ask any **generic safety related question** to the AI
- Scan **uploaded room images** for visible hazards.
- Offer **contextual safety checklists** based on outdoor activities.
- Recommend **childproofing products** tailored to the user’s concern (e.g., “sharp edges,” “kitchen safety” etc).

### 👶🛡️ App overview

**KidSafe AI**
KidSafe AI is an AI-powered web application designed to help parents and guardians create safer environments for children. Leveraging advanced language models and image analysis, the platform provides personalized safety recommendations across various contexts—indoors, outdoors, and through product suggestions.

Key features include:

-  **Conversational Agent:**  An AI chatbot that answers safety-related queries using real-time language model responses.

- **Room Image Analysis:** Users can upload photos of their home interiors. The AI analyzes images to detect potential child safety hazards (e.g., sharp edges, exposed wires) and provides detailed recommendations.

- **Outdoor Safety Advisor:** Based on natural language descriptions of upcoming activities (e.g., “a trip to the beach with my 3-year-old”), the AI generates a customized checklist tailored to the child’s age and the activity's nature.

- **Product Recommendations**: An innovative AI tool that interprets user queries, extracts relevant safety concerns (like “sharp corners” or “kitchen safety”), and recommends suitable child-proofing products from a structured local product database.

The platform integrates OpenAI's function calling and tool usage capabilities to ensure reliable and explainable AI behavior. 

KidSafe AI empowers caregivers with proactive insights to protect children—making homes and outings safer, one intelligent suggestion at a time.

### Language & Frameworks
- [x] HTML, Javascript, Bootstrap CSS (web frontend)
- [x] Node.js and Express (backend)
- [x] Multer - node.js middleware for processing file uploads
- [x] LangChain framework - LLM integration
- [x] OpenAI api - interacts with gpt-4.1 as the underlying LLM (app leverages LLM's natural language processing and vision capabilities)
---

## Architecture Overview
![Architecture Diagram](docs/images/arch_diagram.jpg?raw=true)

The application follows a modular, modern AI-first architecture:

```
Frontend (HTML + JS + Bootstrap)
        |
        | REST API Calls
        ▼
Node.js + Express Backend
        |
        |──▶ OpenAI GPT-4.1 for:
        |     └── Natural language understanding
        |     └── Image analysis for detailed hazard detection and analysis
        |     └── Tool/function calling
        |
        |──▶ Tools:
        |     └── Conversational Agent (ask any question for safety recommendations)
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
git clone https://github.com/edurelated2021/kid-safe-home.git
cd kid-safe-home
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Edit `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key
```

### 4. Project Structure

```
.
├── css
│   ├── style.css
│   └── ...
|── js
│   ├── dashboard.js
│   └── ...
├── tools/
│   ├── productRecommendationsService.js
│   └── ...
├── data/
│   └── products.json
├── routes/
│   ├── chatAgent.js
│   ├── imageAnalyzerAgent.js
│   └── productRecommendationsAgent.js
|   └── outdoorAdvisorAgent.js
|   └── [Add additional agents...]
├── server.js
└── .env
└── package.json
└── index.html
└── dashboard.html
```

### 5. Start the Server

```bash
npm start
```

By default, the app runs at: `http://localhost:3000`
Enter user as "admin" and credential as "admin123" on the Login screen to navigate to the dashboard screen.  

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
## Application Screenshots

Link to the demo video:  https://youtu.be/6O2rvoK5vrw  

## Login Page
![Login Page](docs/images/loginScreen.jpg?raw=true)

## Conversational Agent
![Conversational Agent](docs/images/conversational_agent.png?raw=true)

## Analyze Image to identify safety risks
![Image Analysis](docs/images/safety_bedroom.png?raw=true)

![Image Analysis](docs/images/safety_kitchen.png?raw=true)

## Outdoor Safety Advisor
![Outdoor Safety](docs/images/outdoor_safety.png?raw=true)

## Product Recommendation
![Product Recommendation](docs/images/product_recommendation.png?raw=true)

---
## 📚 Planned Future Enhancements
- 🔍 Add checklist, reminder and scheduler features
- 🔍 Add room by room checklist generator feature
- 🔍 Add gamified safety score feature
- 📱 AR View: Use phone camera to scan the room and overlay hazard markers
- 🛒 Integration with e-commerce APIs for live product recommendations
- 📱 Mobile app version
- 📱 Add voice assistant feature
- 🌍 Multilingual support

---
## Notes
Images used in documentation are from https://unsplash.com/

The information, recommendations, analysis and guidance provided through this application, including but not limited to content concerning child safety, are generated using generative artificial intelligence technologies. While we are certain that the app will offer meaningful, context specific and relevant guidance for a wide range of user queries, the guidance and recommendations may not be exhaustive and all inclusive, may have omissions, may not conform to the most current safety standards (which can, in certain cases, vary by geography) or circumstances that may vary from one individual to another.

Users are strongly encouraged to conduct independent research and consult with appropriately qualified professionals prior to making any decisions (implementation, purchase or others) based on the content presented within the app. Any product recommendations are intended solely for informational purposes and do not constitute an endorsement, certification, or guarantee of suitability, safety or effectiveness.

## 📄 License

MIT License
