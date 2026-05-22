import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Función para generar recomendaciones de diseño de tarjetas.
 * Usa JSON para que la IA devuelva un formato estructurado.
 */
export async function getCardRecommendation(vibe: string) {
  // Leemos la variable de entorno, y si por problemas de caché de Vite falla, usamos la que me pasaste directamente
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : undefined) || "AIzaSyBltB4hypBJesO-od9ZPLZdcZL_viP8-9Y";
  if (!apiKey) throw new Error("API Key de Gemini no configurada");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash", generationConfig: { responseMimeType: "application/json" } });

  const prompt = `
  Eres un experto diseñador de productos para la marca 'tapt.', la cual crea tarjetas de presentación inteligentes (NFC) de alta gama y muy modernas.
  El usuario quiere una tarjeta con el siguiente estilo o 'vibe': "${vibe}".
  Genera un diseño personalizado para él.
  
  Devuelve un objeto JSON estrictamente con la siguiente estructura:
  {
    "name": "Nombre corto y creativo de la edición (ej. 'Neon Void Edition')",
    "desc": "Una descripción atractiva y breve del material y el acabado (ej. 'Fibra de carbono mate con detalles que brillan en la oscuridad.')",
    "gradient": "Un código CSS válido para un background (ej. 'linear-gradient(135deg, #1a1a2e, #16213e)', o algo más complejo, puedes usar conic-gradient, radial-gradient, etc.)"
  }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    return JSON.parse(text) as { name: string; desc: string; gradient: string };
  } catch (e) {
    console.error("Error parseando la respuesta JSON de Gemini", e);
    throw new Error("No se pudo generar la tarjeta");
  }
}

/**
 * Inicializa y devuelve una sesión de chat con el "conserje" Tap.
 */
export function createChatSession() {
  // Leemos la variable de entorno, y si por problemas de caché de Vite falla, usamos la que me pasaste directamente
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : undefined) || "AIzaSyBltB4hypBJesO-od9ZPLZdcZL_viP8-9Y";
  if (!apiKey) throw new Error("API Key de Gemini no configurada");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hola, ¿quién eres y qué puedes hacer?" }],
      },
      {
        role: "model",
        parts: [{ text: "Hola — soy Tap, tu conserje de Inteligencia Artificial para la marca tapt. Estoy aquí para ayudarte con cualquier pregunta sobre nuestras tarjetas inteligentes de gama alta, materiales, envíos, y la configuración de tu perfil NFC. ¿En qué te puedo ayudar hoy?" }],
      },
    ],
    systemInstruction: {
      parts: [{ text: `
      Eres 'Tap', el conserje de inteligencia artificial de 'tapt.', una marca de tarjetas de presentación NFC ultra premium.
      Tu tono es sofisticado, conciso, útil y moderno. Nunca suenes robótico ni aburrido. Usa respuestas cortas y al grano.
      
      Información de la marca:
      - Los envíos tardan 3-5 días en mercados desarrollados y 7-14 días en emergentes. Se envía a todo el mundo.
      - Precios base: Empiezan en €29. La edición Iridescent cuesta €49. La edición Walnut (madera de nogal) cuesta €69.
      - Las tarjetas no necesitan una app para configurarse, el perfil se edita fácilmente por web.
      - Si el usuario pide un diseño, menciónales que pueden usar el recomendador de estilos arriba.
      `}],
      role: "system",
    }
  });

  return chat;
}
