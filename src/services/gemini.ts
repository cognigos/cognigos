// Gemini AI Service for content generation
// Users provide their own API key in Settings

import axios from 'axios';

let geminiApiKey: string | null = null;

export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
};

export const getGeminiApiKey = () => {
  return geminiApiKey;
};

interface GenerateContentRequest {
  prompt: string;
  systemInstruction?: string;
}

export const generateContent = async (request: GenerateContentRequest): Promise<string> => {
  if (!geminiApiKey) {
    throw new Error('Gemini API key not configured. Please add your key in Settings.');
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: request.systemInstruction
                  ? `${request.systemInstruction}\n\n${request.prompt}`
                  : request.prompt,
              },
            ],
          },
        ],
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    return text;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error.response?.data?.error?.message || 'Failed to generate content');
  }
};

// Generate philosophy track card
export const generatePhilosophyCard = async (
  topic: string,
  philosophySystem: string
): Promise<string> => {
  const prompt = `Create a concise, engaging explanation (2-3 sentences, max 150 words) about "${topic}" in ${philosophySystem} philosophy. Write in second person ("you"), make it practical and relatable to modern life.`;

  return await generateContent({ prompt });
};

// Generate Nexus scenario
export const generateNexusScenario = async (
  domain: string,
  personality: string,
  context: string
): Promise<{
  dialogue: string;
  options: string[];
  subtext: string[];
}> => {
  const prompt = `Create a social intelligence training scenario:
Domain: ${domain}
Personality type: ${personality}
Context: ${context}

Generate:
1. Opening dialogue from the NPC (2-3 sentences)
2. Three response options (labeled A, B, C)
3. Three pieces of subtext (what the NPC is really testing)

Format as JSON:
{
  "dialogue": "...",
  "options": ["A: ...", "B: ...", "C: ..."],
  "subtext": ["...", "...", "..."]
}`;

  const response = await generateContent({ prompt });
  
  try {
    // Extract JSON from response (Gemini sometimes wraps it in markdown)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    throw new Error('Failed to parse AI response');
  }
};

// Generate quiz questions
export const generateQuizQuestions = async (
  moduleContent: string,
  count: number = 3
): Promise<any[]> => {
  const prompt = `Based on this module content:

"${moduleContent}"

Generate ${count} multiple-choice quiz questions to test comprehension. Each question should have 4 options with one correct answer.

Format as JSON array:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "..."
  }
]`;

  const response = await generateContent({ prompt });
  
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Failed to parse quiz response:', error);
    return [];
  }
};

// Evaluate Nexus response
export const evaluateNexusResponse = async (
  scenario: string,
  userChoice: string,
  domain: string
): Promise<{
  ratings: Record<string, number>;
  feedback: string;
  optimalResponse: string;
}> => {
  const prompt = `Scenario: ${scenario}

User chose: ${userChoice}

Evaluate this response in the domain of "${domain}". Provide:
1. Ratings (0-10) for: emotional_intelligence, persuasiveness, active_listening, adaptability, nonverbal_awareness
2. Brief feedback (2-3 sentences)
3. What the optimal response would be

Format as JSON:
{
  "ratings": {
    "emotional_intelligence": 7.5,
    "persuasiveness": 8.0,
    ...
  },
  "feedback": "...",
  "optimalResponse": "..."
}`;

  const response = await generateContent({ prompt });
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Failed to parse evaluation response:', error);
    throw new Error('Failed to evaluate response');
  }
};
