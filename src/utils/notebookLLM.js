import { GoogleGenAI } from "@google/genai";
console.log("GEMINI KEY:", import.meta.env.VITE_GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export async function generateQuizFromVideos(videos) {
    const titles = videos.map(v => v.title).join("\n");

    const prompt = `
You are an expert educational assessment generator.

A student has completed a course on ${videos.map(v => v.title).join(", ")}.

Generate 5 high-quality multiple choice questions that test the STUDENT'S UNDERSTANDING OF THE COURSE CONCEPTS.

IMPORTANT RULES:
- Questions must be about concepts, logic, syntax, use-cases, applications, and problem-solving.
- DO NOT ask questions about video names, numbering, order, playlist sequence, or titles.
- DO NOT reference the words "video", "playlist", or "course title".
- Questions must feel like real interview / exam questions.
- Each question must have 4 options.
- Include the correct answer.
- Keep difficulty beginner to intermediate.

Return STRICT JSON array format like this:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "correct option"
  }
]

No extra text.
Only JSON.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const text = response.text;

    try {
        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log("Gemini raw:", text);
        console.log("Gemini cleaned:", cleanedText);

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini JSON parse failed:", error);
        return [];
    }
}