# 🌿 TouchGrass AI

> **"Your next adventure starts when you put your phone down."**  
> Personalized outdoor missions powered by local open-weight AI.

TouchGrass AI is an open-source web application designed to counter screen fatigue and doomscrolling. It uses a locally running open-weight language model (**Qwen 3 4B**) via **Ollama**, live weather metrics from **Open-Meteo**, and nearby public parks from **OpenStreetMap** to craft tailored, sensory-rich outdoor micro-adventures with an explicit phone-down rule.

---

## 🏆 Hacktoberfest Open-Source AI Challenge
Built for the **Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass**.

---

## 🌟 Key Features

- **🧠 100% Local AI (Privacy-First)**: Powered by `qwen3:4b` running on your local machine via Ollama. No private user thoughts, moods, or location data are ever sent to cloud AI providers.
- **⛅ Live Weather Adaptation**: Real-time temperature, wind speed, and rain probability from Open-Meteo guide the mission intensity and safety precautions.
- **🗺️ Verified Nearby Green Spaces**: Integrates with OpenStreetMap Nominatim to ground missions in real public parks without hallucinating locations or trespassing.
- **📵 Distraction-Free Mission Mode**: An ultra-minimal outdoor interface featuring a large countdown timer, readable task cards, and a bold phone-down reminder.
- **🛡️ Strict Safety Guardrails**: Schema-validated JSON output enforcing exactly three achievable challenges, zero medical/mental-health claims, and practical safety advice.
- **🌱 Anti-Addictive Design**: No infinite feeds, streaks, points, or gamification traps — just a gentle nudge to experience the physical world.

---

## 🛠️ Architecture & Tech Stack

```text
React Frontend (Vite + Tailwind CSS)
    ↓
POST /api/mission
    ↓
Express Backend (Node.js)
    ├── Open-Meteo API (Live Weather)
    ├── OpenStreetMap Nominatim (Nearby Parks)
    └── Ollama localhost:11434 (qwen3:4b)
    ↓
Structured Outdoor Mission (JSON Schema Validated)
    ↓
Mission Mode & Reflective Wrap-up
```

### Directory Structure

```text
touchgrass-ai/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static public assets & favicon
│   └── src/
│       ├── components/         # Button, Badge, Navbar, Footer, MissionOption, ProgressIndicator
│       ├── pages/              # HomePage, GenerateMissionPage, MissionPage, MissionCompletePage
│       ├── services/           # Frontend API client (api.js)
│       ├── utils/              # Time parsing & formatting utilities
│       ├── App.jsx             # Top-level router & state coordinator
│       ├── main.jsx            # React root entry
│       └── index.css           # Tailwind styles, color system & accessibility
│
├── server/                     # Express Backend
│   ├── routes/                 # /api/mission, /api/ai, /api/weather, /api/places
│   ├── services/               # ollama.js, weather.js, places.js
│   ├── index.js                # Express app entry
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## 📦 Getting Started

### Prerequisites

1. **Node.js** (v18 or higher) & **npm**
2. **[Ollama](https://ollama.ai)** installed and running locally with `qwen3:4b`:
   ```bash
   ollama run qwen3:4b
   ```

### 1. Backend Setup

```bash
cd server
npm install
npm run dev
# Express server runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
# Vite frontend runs on http://localhost:5173
```

---

## 🔍 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Service health status |
| `/api/ai/health` | `GET` | Ollama connectivity & `qwen3:4b` model verification |
| `/api/weather` | `GET` | Current weather from Open-Meteo (`?latitude=..&longitude=..`) |
| `/api/places` | `GET` | Nearby public green spaces (`?latitude=..&longitude=..`) |
| `/api/mission` | `POST` | Generate structured, validated outdoor mission |

### Example Mission Request Body

```json
{
  "mood": "Stressed",
  "time": "30 min",
  "difficulty": "Easy",
  "activity": "Nature",
  "latitude": 40.785091,
  "longitude": -73.968285
}
```

### Example Validated Response

```json
{
  "title": "30-Minute Nature Reset",
  "duration": "30 min",
  "difficulty": "Easy",
  "description": "Reconnect with the natural world to ease stress through mindful listening, observation, and exploration.",
  "challenges": [
    "Walk 100 meters and notice at least 3 natural sounds without looking at your phone.",
    "Identify 2 different natural textures by observing without touching anything unsafe.",
    "Find 1 unique tree or plant feature along your path."
  ],
  "phoneRule": "Pocket your phone in your front pocket before starting the walk.",
  "safetyNote": "Stay aware of footing and surrounding traffic at all times."
}
```

---

## 🔒 Security & Privacy Guarantees

- **No API Keys or Secrets Committed**: Zero cloud AI keys required.
- **No Coordinate Storage**: User location is never stored on disk, database, or logs.
- **No Raw Coordinates to LLM**: Coordinates are resolved server-side to general weather and public park names; raw GPS coordinates are never fed to the AI prompt.
- **No Stack Traces Exposed**: Production error handlers return clean, human-readable error messages.

---

## 📄 License
MIT License. Open-source for Hacktoberfest 2026.