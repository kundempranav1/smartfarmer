import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "missing-key", // Fallback to avoid crash, though it will fail on use
      httpOptions: { headers: { "User-Agent": "aistudio-build" } },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // AI Doctor Endpoint
  app.post("/api/ai-doctor", async (req, res) => {
    try {
      const { imageParams, language } = req.body;
      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let response;
      let lastError;

      for (const model of modelsToTry) {
        try {
          response = await getAI().models.generateContent({
            model,
            contents: {
              parts: [
                { inlineData: { mimeType: imageParams.mimeType, data: imageParams.data } },
                { text: `Analyze this image of a plant or crop. Identify any visible diseases, pests, or nutrient deficiencies, and provide a detailed diagnosis along with recommended treatments or actions. Please respond entirely in ${language || 'English'}.` }
              ]
            }
          });
          break; // Success
        } catch (error: any) {
          lastError = error;
          if (error?.status !== 503) {
            throw error; // If it's not a capacity issue, don't fallback
          }
          console.warn(`Model ${model} overloaded. Trying next...`);
        }
      }

      if (!response) throw lastError;

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(503).json({ error: error.message || "Failed to process image due to high demand. Please try again later." });
    }
  });

  // Season Crop Detector Endpoint
  app.post("/api/season-crop", async (req, res) => {
    try {
      const { season, region, conditions, language } = req.body;
      const prompt = `Based on the following data, recommend the best crops to plant:\nSeason: ${season}\nRegion: ${region}\nExtra conditions: ${conditions}\nProvide a structured list of crops, their benefits, and planting instructions. Please respond entirely in ${language || 'English'}.`;
      
      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let response;
      let lastError;

      for (const model of modelsToTry) {
        try {
          response = await getAI().models.generateContent({
            model,
            contents: prompt
          });
          break; // Success
        } catch (error: any) {
          lastError = error;
          if (error?.status !== 503) {
            throw error; // If it's not a capacity issue, don't fallback
          }
          console.warn(`Model ${model} overloaded. Trying next...`);
        }
      }

      if (!response) throw lastError;

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(503).json({ error: error.message || "Failed to recommend crops due to high demand. Please try again later." });
    }
  });

  // Analyze Soil Report Endpoint
  app.post("/api/analyze-soil", async (req, res) => {
    try {
      const { imageParams, language } = req.body;
      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let response;
      let lastError;

      for (const model of modelsToTry) {
        try {
          response = await getAI().models.generateContent({
            model,
            contents: {
              parts: [
                { inlineData: { mimeType: imageParams.mimeType, data: imageParams.data } },
                { text: `Analyze this soil report document or image. Extract the key metrics (like pH, Nitrogen, Moisture, etc.) and provide actionable recommendations for improving soil health and suitable crops to plant. Format clearly. Please respond entirely in ${language || 'English'}.` }
              ]
            }
          });
          break; // Success
        } catch (error: any) {
          lastError = error;
          if (error?.status !== 503) {
            throw error; // If it's not a capacity issue, don't fallback
          }
          console.warn(`Model ${model} overloaded. Trying next...`);
        }
      }

      if (!response) throw lastError;

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(503).json({ error: error.message || "Failed to analyze soil report due to high demand. Please try again later." });
    }
  });

  // Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language } = req.body;
      const prompt = `You are FarmFriend Assistant, a helpful AI for farmers. Answer the user's question clearly. Question: "${message}". Please respond in ${language || 'English'}.`;
      
      const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let response;
      let lastError;

      for (const model of modelsToTry) {
        try {
          response = await getAI().models.generateContent({
            model,
            contents: prompt
          });
          break; // Success
        } catch (error: any) {
          lastError = error;
          if (error?.status !== 503) {
            throw error; // If it's not a capacity issue, don't fallback
          }
          console.warn(`Model ${model} overloaded. Trying next...`);
        }
      }

      if (!response) throw lastError;

      res.json({ result: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(503).json({ error: error.message || "Failed to get response due to high demand. Please try again later." });
    }
  });

  // Catch-all 404 for /api routes
  app.use("/api", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Global API error handler
  app.use("/api", (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("API Error:", err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
