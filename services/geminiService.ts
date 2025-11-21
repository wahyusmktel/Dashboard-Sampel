import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a real app, handle the case where API_KEY is missing gracefully
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateStudentInsight = async (dataContext: string): Promise<string> => {
  if (!apiKey) return "API Key not configured. Cannot generate insights.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Act as an educational data analyst. 
        Analyze the following student performance data summary: "${dataContext}".
        Provide a brief, encouraging, and strategic insight (max 2 sentences) for the school administrator regarding trends or areas for improvement.
        Keep the tone professional yet modern.
      `,
    });

    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Error generating insight:", error);
    return "Unable to generate AI insight at this time.";
  }
};