# AI Agricultural Assistant

A full-stack web application built with React, Vite, Express, and the Google Gemini API to assist farmers, gardeners, and agricultural enthusiasts with AI-driven insights. 

## 🌟 Features

- **🌾 Season & Crop Recommendation:** Get AI-driven crop suggestions tailored to your season, region, and specific local conditions.
- **🩺 AI Plant Doctor:** Upload an image of a plant or crop to instantly identify visible diseases, pests, or nutrient deficiencies, along with recommended treatments.
- **🧪 Soil Report Analyzer:** Upload soil report documents or images. The AI extracts key metrics (pH, Nitrogen, Moisture, etc.) and provides actionable recommendations for improving soil health.
- **💬 Smart Agricultural Assistant:** A built-in chat interface to ask any agriculture-related queries.
- **🌍 Multilingual Support:** Interact with the AI features in multiple languages.

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Express.js, Node.js
- **AI Integration:** Google Gemini API (`@google/genai` SDK)
- **Build Tooling:** esbuild (for compiling the backend server)

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will start concurrently (Vite for the frontend and Express for the backend API routing) on `http://localhost:3000`.

## 📦 Deployment

This project is configured as a full-stack application (serving a built SPA through an Express server). It is recommended to deploy on platforms that support Node.js servers, such as **Render**, **Railway**, or **Heroku**.

1. **Build the project:**
   ```bash
   npm run build
   ```
   *This command builds the Vite frontend into the `dist/` directory and bundles the Express server into `dist/server.cjs`.*

2. **Start the production server:**
   ```bash
   npm start
   ```
   *(Which runs `node dist/server.cjs`)*

### Deployment Environment Variables
Make sure to add your `GEMINI_API_KEY` to the environment variables/secrets section of your chosen hosting platform before deploying.

## 📝 License
MIT License
