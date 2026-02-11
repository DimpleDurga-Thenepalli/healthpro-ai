import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.MY_API_KEY
});

// 🔗 API ROUTE
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // 👇 send to frontend
    res.json({ result: response.text });

  } catch (err) {
    res.status(500).json({ error: "Gemini error" });
  }
});

// 🚀 start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
