import React from "react";
import { FormData, ApiKeyStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InputSectionProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  apiKeyStatus: ApiKeyStatus;
  onApiKeyModalOpen: () => void;
  onGenerateCoverLetter: () => void;
  onUpdateCV: () => void;
  showToast: (message: string, type?: "success" | "error") => void;
}

export default function InputSection({
  formData,
  onChange,
  apiKeyStatus,
  onApiKeyModalOpen,
  onGenerateCoverLetter,
  onUpdateCV,
  showToast,
}: InputSectionProps) {
  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "cvContent",
      "companyName",
      "positionTitle",
      "jobRequirements",
      "jobDescription",
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (emptyFields.length > 0) {
      showToast("Please fill in all required fields", "error");
      return false;
    }
    
    return true;
  };

  const handleGenerateCoverLetter = () => {
    if (validateForm()) {
      if (apiKeyStatus !== "configured") {
        showToast("Please configure your API key first", "error");
        onApiKeyModalOpen();
        return;
      }
      onGenerateCoverLetter();
    }
  };

  const handleUpdateCV = () => {
    if (validateForm()) {
      if (apiKeyStatus !== "configured") {
        showToast("Please configure your API key first", "error");
        onApiKeyModalOpen();
        return;
      }
      onUpdateCV();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold text-gray-800">Your Information</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* CV Content Field */}
          <div className="mb-4">
            <label htmlFor="cvContent" className="block text-gray-700 font-medium mb-2">
              CV Content <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="cvContent"
              rows={8}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your CV content here..."
              value={formData.cvContent}
              onChange={(e) => onChange("cvContent", e.target.value)}
            />
          </div>
          
          {/* Company Name Field */}
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="companyName"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
            />
          </div>
          
          {/* Position Title Field */}
          <div className="mb-4">
            <label htmlFor="positionTitle" className="block text-gray-700 font-medium mb-2">
              Position Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="positionTitle"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter position title"
              value={formData.positionTitle}
              onChange={(e) => onChange("positionTitle", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold text-gray-800">Job Details</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* Job Requirements Field */}
          <div className="mb-4">
            <label htmlFor="jobRequirements" className="block text-gray-700 font-medium mb-2">
              Job Requirements <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="jobRequirements"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job requirements here..."
              value={formData.jobRequirements}
              onChange={(e) => onChange("jobRequirements", e.target.value)}
            />
          </div>
          
          {/* Job Description Field */}
          <div className="mb-4">
            <label htmlFor="jobDescription" className="block text-gray-700 font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="jobDescription"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste the job description here..."
              value={formData.jobDescription}
              onChange={(e) => onChange("jobDescription", e.target.value)}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              className="flex-1 bg-primary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
              onClick={handleGenerateCoverLetter}
            >
              <Send className="h-4 w-4 mr-2" />
              Generate Cover Letter
            </Button>
            <Button
              className="flex-1 bg-secondary hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
              onClick={handleUpdateCV}
            >
              <FileText className="h-4 w-4 mr-2" />
              Update CV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
