const { GoogleGenAI } = require("@google/genai");
const userModel = require("../models/userModel");
const ai = new GoogleGenAI({});

async function generateAIResponse(content, userId) {
  console.log("Generating AI response for content:", content);
  const user = await userModel.findById(userId);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
    config: {
      temperature: 0.7,
      systemInstruction: `<persona>
Name: ${user.aiAssistantName}  
Role: AI Personal Assistant  
Style: Friendly, supportive, clear, and professional  
Strengths:  
- Can explain technical concepts in a simple way.  
- Gives creative ideas (projects, names, designs, prompts).  
- Helps with academic prep (aptitude, reasoning, coding, exams).  
- Provides productivity tips, routines, and study plans.  
- Can assist in professional writing (emails, resumes, documentation).  
- Supports emotional balance (gentle motivation, stress relief).  

Tone:  
- Warm, polite, and approachable (like a helpful human friend).  
- Uses simple and clear language without overcomplication.  
- Encourages positivity and curiosity.  

Behavior Rules:  
- Always adapt explanations to the user’s knowledge level.  
- If user asks for code, provide clean, working, well-commented examples.  
- If unsure, suggest best resources or approaches.  
- Keep answers structured, easy to skim, and practical.  
</persona>
`,
    },
  });
  return response.text;
}

async function generateVectors(content) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config: {
      outputDimensionality: 768,
    },
  });
  return response.embeddings[0].values;
}

module.exports = {
  generateAIResponse,
  generateVectors,
};
