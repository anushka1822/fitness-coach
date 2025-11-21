# 💪 FitAI Coach

**An AI-powered personal trainer that generates hyper-personalized workout and diet plans in seconds.**
--
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🚀 Demo of the App

- **🔴 Live App:** [https://fitness-coach-lemon.vercel.app/]
- **🎥 Video Demo:** [https://drive.google.com/file/d/1QQDa6PFIM4gSWiiRq61FbNxCn87w-0Pp/view?usp=sharing]

---

## ✨ Features

- **🧠 AI Logic:** Uses **Google Gemini Pro** to reason through user biology (BMI, level, goals) and generate a scientifically accurate routine.
- **🖼️ Context-Aware Visuals:** Generates dynamic, real-time images for every specific exercise and meal using **Pollinations AI**.
- **🗣️ Voice Guidance:** Integrated **ElevenLabs** (Text-to-Speech) to read plans aloud in a natural, human-like voice.
- **📄 PDF Export:** Users can download their custom plan as a formatted PDF to take to the gym.
- **💾 Local History:** Automatically saves generated plans to Local Storage so users can revisit past routines.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Vite
- **AI Model:** Google Gemini API (`gemini-1.5-flash` / `gemini-pro`)
- **Image Gen:** Pollinations.ai (Real-time generation)
- **Voice Gen:** ElevenLabs API / Web Speech API Fallback

---

## ⚙️ Installation & Setup

If you want to run this locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/anushka1822/fitness-coach.git
    cd fitness-coach
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup API Keys**
    Create a file named `.env` in the root directory. Add your keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_key_here
    VITE_ELEVEN_LABS_KEY=your_elevenlabs_key_here
    ```

4.  **Run the App**
    ```bash
    npm run dev
    ```
---

## 💡 How It Works

1.  **User Input:** The user fills out a detailed form (Age, Weight, Injuries, Equipment, Diet).
2.  **Prompt Engineering:** The app constructs a complex JSON prompt sent to Gemini.
3.  **Parsing:** The AI returns a structured JSON object containing the Workout and Diet data.
4.  **Enrichment:** The app maps over the data, fetching dynamic images for each item in real-time.
5.  **Rendering:** The plan is displayed with interactive cards, voice controls, and export options.

---
