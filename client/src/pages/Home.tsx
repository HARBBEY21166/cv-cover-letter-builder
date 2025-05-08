import { useState, useEffect } from "react";
import InputSection from "@/components/InputSection";
import OutputSection from "@/components/OutputSection";
import ApiKeyModal from "@/components/ApiKeyModal";
import Toast from "@/components/Toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useGeminiApi } from "@/hooks/useGeminiApi";
import { FormData, ApiKeyStatus, OutputType } from "@/types";
import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // API Key state
  const [apiKey, setApiKey] = useLocalStorage<string>("geminiApiKey", "");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  // Form data state with localStorage persistence
  const [formData, setFormData] = useLocalStorage<FormData>("formData", {
    cvContent: "",
    companyName: "",
    positionTitle: "",
    jobRequirements: "",
    jobDescription: ""
  });
  
  // Output states
  const [coverLetterOutput, setCoverLetterOutput] = useState<OutputType>({
    loading: false,
    error: null,
    data: null
  });
  
  const [cvOutput, setCvOutput] = useState<OutputType>({
    loading: false,
    error: null,
    data: null
  });
  
  // Set up Gemini API hooks
  const coverLetterApi = useGeminiApi(apiKey, "coverLetter", formData);
  const cvApi = useGeminiApi(apiKey, "cv", formData);
  
  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error"
  });
  
  // Update form data
  const handleFormDataChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  // Show toast notification
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };
  
  // API Key management
  const getApiKeyStatus = (): ApiKeyStatus => {
    return apiKey ? "configured" : "not-configured";
  };
  
  // Handle cover letter generation
  const handleGenerateCoverLetter = async () => {
    if (getApiKeyStatus() !== "configured") {
      showToast("Please configure your API key first", "error");
      setIsApiKeyModalOpen(true);
      return;
    }
    
    setCoverLetterOutput({
      loading: true,
      error: null,
      data: null
    });
    
    try {
      // This now returns the generated text directly
      const generatedText = await coverLetterApi.generate();
      
      // Update the output state once the API call is complete
      if (coverLetterApi.error) {
        setCoverLetterOutput({
          loading: false,
          error: coverLetterApi.error,
          data: null
        });
        showToast(coverLetterApi.error, "error");
      } else if (!generatedText) {
        throw new Error("No text was generated. Please try again.");
      } else {
        console.log("Cover letter generated text length:", generatedText.length);
        
        // Update state with the generated text
        setCoverLetterOutput({
          loading: false,
          error: null,
          data: { 
            text: generatedText,
            title: `Cover letter for ${formData.companyName}: ${formData.positionTitle}`,
            date: new Date().toLocaleDateString()
          }
        });
        
        showToast("Cover letter generated successfully");
      }
    } catch (error) {
      setCoverLetterOutput({
        loading: false,
        error: (error as Error).message || "Failed to generate cover letter. Please try again.",
        data: null
      });
      showToast((error as Error).message || "Failed to generate cover letter", "error");
    }
  };
  
  // Handle CV update
  const handleUpdateCV = async () => {
    if (getApiKeyStatus() !== "configured") {
      showToast("Please configure your API key first", "error");
      setIsApiKeyModalOpen(true);
      return;
    }
    
    setCvOutput({
      loading: true,
      error: null,
      data: null
    });
    
    try {
      // This now returns the generated text directly
      const generatedText = await cvApi.generate();
      
      // Update the output state once the API call is complete
      if (cvApi.error) {
        setCvOutput({
          loading: false,
          error: cvApi.error,
          data: null
        });
        showToast(cvApi.error, "error");
      } else if (!generatedText) {
        throw new Error("No text was generated. Please try again.");
      } else {
        console.log("CV generated text length:", generatedText.length);
        
        // Update state with the generated text
        setCvOutput({
          loading: false,
          error: null,
          data: { 
            text: generatedText,
            title: `Optimized CV for ${formData.positionTitle}`,
            date: new Date().toLocaleDateString()
          }
        });
        
        showToast("CV updated successfully");
      }
    } catch (error) {
      setCvOutput({
        loading: false,
        error: (error as Error).message || "Failed to update CV. Please try again.",
        data: null
      });
      showToast((error as Error).message || "Failed to update CV", "error");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">CV & Cover Letter Assistant</h1>
            <p className="text-gray-600 mt-1">Generate tailored cover letters and optimize your CV using AI</p>
          </div>
          
          {/* API Key Configuration Button */}
          <Button 
            variant="outline"
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition"
            onClick={() => setIsApiKeyModalOpen(true)}
          >
            <Key className="mr-2 h-4 w-4" />
            <span>{getApiKeyStatus() === "configured" ? "API Key Configured" : "Configure API Key"}</span>
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <InputSection 
          formData={formData}
          onChange={handleFormDataChange}
          apiKeyStatus={getApiKeyStatus()}
          onApiKeyModalOpen={() => setIsApiKeyModalOpen(true)}
          onGenerateCoverLetter={handleGenerateCoverLetter}
          onUpdateCV={handleUpdateCV}
          showToast={showToast}
        />
        
        {/* Output Section */}
        <OutputSection 
          coverLetterOutput={coverLetterOutput}
          cvOutput={cvOutput}
          formData={formData}
          showToast={showToast}
        />
      </div>
      
      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onApiKeySave={(key) => {
          setApiKey(key);
          setIsApiKeyModalOpen(false);
          showToast("API key saved successfully");
        }}
        showToast={showToast}
      />
      
      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}
