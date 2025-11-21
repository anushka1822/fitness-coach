import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePlan = async (userData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Act as an elite personal trainer and nutritionist.
      
      User Profile:
      - Age: ${userData.age}
      - Gender: ${userData.gender}
      - Height: ${userData.height}
      - Weight: ${userData.weight}
      - Goal: ${userData.goal}
      - Fitness Level: ${userData.level}
      - Equipment Available: ${userData.equipment}
      - Dietary Preference: ${userData.diet}

      Generate a 1-day detailed workout and diet plan perfectly tailored to them.
      
      🚨 CRITICAL INSTRUCTION: 
      Return ONLY valid JSON. Do not return any introductory text, markdown formatting, or code blocks (like \`\`\`json).
      
      Target JSON Structure:
      {
        "userAnalysis": "Brief 1-sentence assessment of their goal.",
        "workout": [
          { 
            "exerciseName": "Exercise Name", 
            "sets": "Number of sets", 
            "reps": "Number of reps", 
            "rest": "Rest time",
            "imageQuery": "Search term for an image of this exercise (e.g., 'barbell squat gym')" 
          }
        ],
        "diet": [
          { 
            "mealName": "Breakfast", 
            "foodItems": "List of foods", 
            "calories": "Approx calories",
            "imageQuery": "Search term for this meal (e.g., 'oatmeal with berries')"
          }
        ],
        "motivation": "A short, punchy motivational quote for them."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};