import { useState } from "react";
import { FormData } from "@/types";

interface GeminiResult {
  text: string;
  loading: boolean;
  error: string | null;
  generate: () => Promise<void>;
}

export function useGeminiApi(
  apiKey: string,
  promptType: "coverLetter" | "cv",
  formData: FormData
): GeminiResult {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrompt = () => {
    // Format the prompt based on the type
    if (promptType === "coverLetter") {
      return `Generate a cover letter using:
- My qualifications: ${formData.cvContent}
- For ${formData.positionTitle} at ${formData.companyName}
- Job requirements: ${formData.jobRequirements}
- Job description: ${formData.jobDescription}
Output should be professional and tailored to this specific role with a proper salutation, body, and closing.`;
    } else {
      return `Generate an updated CV using:
- My current CV: ${formData.cvContent}
- For ${formData.positionTitle} at ${formData.companyName}
- Job requirements: ${formData.jobRequirements}
- Job description: ${formData.jobDescription}
Optimize my CV by reordering skills to match the requirements and highlight relevant experience for this specific role. Output should be a complete, professional CV.`;
    }
  };

  const generate = async () => {
    if (!apiKey) {
      setError("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = generatePrompt();
      
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate content");
      }

      const data = await response.json();
      
      // Extract the generated text from the response
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setText(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    loading,
    error,
    generate,
  };
}
