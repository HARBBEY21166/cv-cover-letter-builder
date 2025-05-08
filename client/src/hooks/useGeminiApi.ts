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
  if (promptType === "coverLetter") {
    return `Write a professional cover letter based on my CV and this job posting. Follow this format and these rules strictly:

FORMAT:
1. Top Contact Block: 
   Abbey Aina  
   olamilekansunday445@gmail.com  
   [Today's Date]  
   Hiring Manager or Team Name  
   Company Name  

2. Start with a warm, clear statement of interest, referencing the position and company.

3. In 1–2 short paragraphs, highlight relevant skills or experiences from the CV that match job requirements.

4. Include a bullet list of 2–3 contributions or strengths based on my CV and job role.

5. In the closing paragraph:
   - Reaffirm interest
   - Mention values or mission fit
   - Thank the reader

6. Sign off professionally with “Best regards,” followed by my full name.

STRICT RULES:
- Use only verifiable content from my CV.
- Do NOT include placeholders or imaginary projects.
- Do NOT duplicate links already found in the CV.
- Do NOT add the job ad text itself.
- Keep tone enthusiastic but professional.
- Limit paragraphs to 3 lines max.

MY CV CONTENT:
${formData.cvContent}

JOB TITLE:
${formData.positionTitle}

COMPANY NAME:
${formData.companyName}

JOB REQUIREMENTS:
${formData.jobRequirements}

FULL JOB DESCRIPTION:
${formData.jobDescription}`;
  } else {
    return `Update and rewrite my CV professionally based on the job role below. 

INSTRUCTIONS:
- Keep the structure appropriate for tech/design roles
- Emphasize relevant achievements and skills from my CV that match the job requirements
- DO NOT change or reformat any existing links — preserve them exactly
- Tailor tone and content to the position
- Keep the structure and links from my original CV.
- Improve clarity, grammar, and flow professionally.
- DO NOT add introductory text like "Here's your CV".
- DO NOT duplicate links already in the CV.


MY CURRENT CV:
${formData.cvContent}

JOB TITLE:
${formData.positionTitle}

COMPANY NAME:
${formData.companyName}

JOB REQUIREMENTS:
${formData.jobRequirements}

FULL JOB DESCRIPTION:
${formData.jobDescription}`;
  }
};


  const generate = async (): Promise<string> => {
    if (!apiKey) {
      setError("API key is required");
      return "";
    }

    setLoading(true);
    setError(null);
    setText("");

    try {
      const prompt = generatePrompt();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate content");
      }

      const data = await response.json();
      console.log("Gemini API response:", JSON.stringify(data));

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        setText(responseText);
        return responseText;
      } else {
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
