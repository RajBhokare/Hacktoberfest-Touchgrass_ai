# 🌿 TouchGrass AI

> AI-powered outdoor missions designed to get people off their screens and into the real world.

TouchGrass AI uses a locally running open-weight AI model (**Qwen 3 4B**) through **Ollama** to generate personalized outdoor activities and missions based on user mood, available time, difficulty level, weather conditions, and personal preferences.

---

## 🚀 Hackathon Submission
Built for the **Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend (`/client`)**: React (JavaScript), Vite
- **Backend (`/server`)**: Node.js, Express, CORS, dotenv
- **Core AI**: Ollama running `qwen3:4b` locally (no external paid/closed APIs)

### Project Structure

```text
touchgrass-ai/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── index.js
│
├── .gitignore
├── README.md
└── package.json
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- [Ollama](https://ollama.ai) installed with `qwen3:4b` pulled:
  ```bash
  ollama run qwen3:4b
  ```

### 1. Server Setup
```bash
cd server
npm install
npm run dev # Runs nodemon on port 5000 (or PORT env)
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev # Starts Vite dev server
```

---

## 🔍 API Endpoints (Current)

- `GET /api/health` - API health check status