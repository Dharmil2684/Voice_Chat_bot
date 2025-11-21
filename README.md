# 🎙️ Voice Chat Bot with Analytics Dashboard

> **A Full-Stack MERN Application** featuring real-time voice interaction, secure authentication, and an admin-level analytics dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)
![AI](https://img.shields.io/badge/AI-Gemini%202.5-orange.svg)

## 🚀 Live Demo
- **Frontend (Vercel):** [https://voice-chat-bot-nu.vercel.app](https://voice-chat-bot-nu.vercel.app)
- **Backend (Render):** [https://voice-chat-bot-mz6s.onrender.com](https://voice-chat-bot-mz6s.onrender.com)
  
### 🔐 Demo Credentials
- **Email:** abc@gmail.com  
- **Password:** 123

---

## 📖 Project Overview

This project is an intelligent Voice Bot designed to simulate a human-like customer support agent. Unlike traditional bots that rely on expensive, high-latency audio processing APIs, this project utilizes a **Hybrid Architecture**:
1.  **The "Ear" & "Mouth":** Uses the browser's native **Web Speech API** for zero-latency, zero-cost Speech-to-Text and Text-to-Speech.
2.  **The "Brain":** Uses **Google Gemini 1.5 Flash** (via Node.js) for high-speed, context-aware reasoning.

This approach ensures the application is fast, scalable, and cost-effective.

---

## ✨ Key Features

### 🤖 AI & Voice
* **Real-time Interaction:** Instant voice feedback using browser-native APIs.
* **Context Aware:** The AI knows the logged-in user's name and maintains conversational context.
* **Gemini 1.5 Flash:** Leveraging Google's latest model for fast inference.

### 🔐 Security & User Management
* **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
* **Password Hashing:** Industry-standard `bcryptjs` encryption for user passwords.
* **Data Isolation:** Users can only access their own chat history and analytics.

### 📊 Analytics Dashboard
* **Performance Metrics:** Visualizes API Latency and Total Query counts.
* **Chat History:** Persistent logs of previous conversations stored in MongoDB.
* **Interactive Charts:** Built with `Recharts` for data visualization.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Axios, Recharts, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas & Local), Mongoose ORM |
| **AI Model** | Google Gemini 1.5 Flash (`@google/generative-ai`) |
| **Auth** | JWT, BcryptJS |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## ⚙️ Architecture

The application follows a **Client-Server** model:

1.  **User Speaks:** Browser converts Audio $\to$ Text (Web Speech API).
2.  **Request:** React sends the Text + Auth Token to the Node.js Backend.
3.  **Processing:**
    * Backend verifies the JWT Token.
    * Fetches User Context (Name) from MongoDB.
    * Sends Prompt + Context to Google Gemini API.
4.  **Response:** Gemini returns the AI text response.
5.  **Storage:** Backend logs the query, response, and latency to MongoDB.
6.  **Speech:** React receives the text and speaks it out (Speech Synthesis).

---

## 📦 Local Installation

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Dharmil2684/Voice_Chat_bot
cd Voice_Chat_bot
```
## 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_ai_studio_key
JWT_SECRET=your_secret_key
```

Start server:
```bash
npm start
```

## 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start client:
```bash
npm run dev
```

## 📂 Project Structure
```
/voice-bot-assignment
│
├── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   └── server.js
│
└── /frontend
    ├── /src
    │   ├── /components
    │   ├── /pages
    │   └── /services
    └── vite.config.js
```

## 🛡️ Deployment Guide

### Backend (Render)
- Create Web Service
- Root Dir: backend
- Build: npm install
- Start: npm start
- Add Environment Variables

### Frontend (Vercel)
- Root Dir: frontend
- Framework: Vite
- Add `VITE_API_URL` pointing to Render backend

## 👨‍💻 Author
**Dharmil Halpati**  
📧 Email: [dharmilhalpatics12@gmail.com](mailto:dharmilhalpatics12@gmail.com)

## 📄 License
MIT License
