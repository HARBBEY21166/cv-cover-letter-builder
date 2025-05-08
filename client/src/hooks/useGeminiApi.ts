import { useState } from "react";
import { FormData } from "@/types";

interface GeminiResult {
  text: string;
  loading: boolean;
  error: string | null;
  generate: () => Promise<string>;
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
      return `Generate a cover letter using EXACTLY these rules:
1. HEADER: Use CV's contact info in this order:
   Name | Phone | Email | LinkedIn | Portfolio  
   (No labels like 'Email:', just raw data)

2. BODY CONTENT MUST:
   - Reference 2 specific projects from CV
   - Mention 3 technical skills from the job requirements
   - Use only verifiable facts from the CV
   - Keep paragraphs under 3 lines

3. FORBIDDEN:
   - Any [placeholders] 
   - Unsubstantiated claims
   - Reformatted links
   - Skills not in original CV

My CV Content: ${formData.cvContent}
Position Title: ${formData.positionTitle}
Company Name: ${formData.companyName}
Job Requirements: ${formData.jobRequirements}
Job Description: ${formData.jobDescription}`;
    } else {
      return `Generate a cv using EXACTLY these rules:

- Update my CV from your knowledge base and based on the requirements mentioned in job details
- PRESERVE ALL EXISTING LINKS CHARACTER-FOR-CHARACTER

My Current CV: ${formData.cvContent}
Position Title: ${formData.positionTitle}
Company Name: ${formData.companyName}
Job Requirements: ${formData.jobRequirements}
Job Description: ${formData.jobDescription}`;
    }
  };

  const generate = async (): Promise<string> => {
    if (!apiKey) {
      setError("API key is required");
      return "";
    }

    setLoading(true);
    setError(null);
    setText(""); // Clear previous text

    try {
      const prompt = generatePrompt();
      
      // Using the gemini-2.0-flash model as requested
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
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
      console.log("Gemini API response:", JSON.stringify(data));
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const responseText = data.candidates[0].content.parts[0].text;
        console.log("Extracted text length:", responseText.length);
        
        // Save the text to state
        setText(responseText);
        
        // Return the text directly
        return responseText;
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred");
      return "";
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
