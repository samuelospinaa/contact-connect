import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates AI-powered card design recommendations.
 * Uses JSON mode so the AI returns a structured format.
 */
export async function getCardRecommendation(vibe: string) {
  // Read from env variable, with hardcoded fallback for demo purposes
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : undefined) || "AIzaSyBltB4hypBJesO-od9ZPLZdcZL_viP8-9Y";
  if (!apiKey) throw new Error("Gemini API Key not configured");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash", generationConfig: { responseMimeType: "application/json" } });

  const prompt = `
  You are an expert product designer for the brand 'tapt.', which creates high-end, ultra-modern smart NFC business cards.
  The user wants a card with the following style or 'vibe': "${vibe}".
  Generate a personalized design for them.
  
  Return a JSON object strictly with the following structure:
  {
    "name": "A short, creative edition name (e.g. 'Neon Void Edition')",
    "desc": "An attractive, brief description of the material and finish (e.g. 'Matte carbon fiber with glow-in-the-dark accents.')",
    "gradient": "A valid CSS code for a background (e.g. 'linear-gradient(135deg, #1a1a2e, #16213e)', or something more complex — you can use conic-gradient, radial-gradient, etc.)"
  }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return JSON.parse(text) as { name: string; desc: string; gradient: string };
  } catch (e) {
    console.error("Error parsing JSON response from Gemini", e);
    throw new Error("Could not generate the card design");
  }
}

/**
 * Initializes and returns a chat session with the 'Tap' AI concierge.
 */
export function createChatSession() {
  // Read from env variable, with hardcoded fallback for demo purposes
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : undefined) || "AIzaSyBltB4hypBJesO-od9ZPLZdcZL_viP8-9Y";
  if (!apiKey) throw new Error("Gemini API Key not configured");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hi, who are you and what can you do?" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi — I'm Tap, your AI concierge for the tapt. brand. I'm here to help you with any questions about our premium smart cards, materials, shipping, and setting up your NFC profile. How can I help you today?" }],
      },
    ],
    systemInstruction: {
      parts: [{ text: `
      You are 'Tap', the AI concierge for 'tapt.', an ultra-premium NFC business card brand.
      Your tone is sophisticated, concise, helpful, and modern. Never sound robotic or boring. Keep responses short and to the point.
      
      Brand information:
      - Shipping takes 3-5 days in developed markets and 7-14 days in emerging markets. We ship worldwide.
      - Base pricing: Starting at €29. The Iridescent edition costs €49. The Walnut edition costs €69.
      - Cards don't need an app to set up — the profile is easily edited via the web.
      - If the user asks for a design, mention that they can use the style recommender above.
      `}],
      role: "system",
    }
  });

  return chat;
}
