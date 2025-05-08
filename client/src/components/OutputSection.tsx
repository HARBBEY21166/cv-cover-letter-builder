import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, AlertCircle, RotateCcw } from "lucide-react";
import { FormData, OutputType } from "@/types";
import { downloadTextFile } from "@/lib/utils/downloadFile";

interface OutputSectionProps {
  coverLetterOutput: OutputType;
  cvOutput: OutputType;
  formData: FormData;
  showToast: (message: string, type?: "success" | "error") => void;
  onClearCoverLetter?: () => void;
  onClearCV?: () => void;
}

export default function OutputSection({
  coverLetterOutput,
  cvOutput,
  formData,
  showToast,
  onClearCoverLetter,
  onClearCV,
}: OutputSectionProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => showToast("Copied to clipboard"))
        .catch(() => showToast("Failed to copy text", "error"));
    } else {
      // Fallback for browsers without clipboard API support
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand("copy");
        showToast("Copied to clipboard");
      } catch (err) {
        showToast("Failed to copy text", "error");
      }
      
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Letter Output */}
      <Card className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-auto">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Cover Letter</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Copy to clipboard"
              onClick={() => {
                if (coverLetterOutput.data) {
                  copyToClipboard(coverLetterOutput.data.text);
                }
              }}
              disabled={!coverLetterOutput.data}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Download as .txt"
              onClick={() => {
                if (coverLetterOutput.data) {
                  downloadTextFile(
                    coverLetterOutput.data.text,
                    `cover_letter_${formData.companyName.toLowerCase().replace(/\s+/g, '_')}`
                  );
                  showToast("File downloaded");
                }
              }}
              disabled={!coverLetterOutput.data}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Clear output"
              onClick={() => {
                if (onClearCoverLetter) {
                  onClearCoverLetter();
                  showToast("Cover letter cleared");
                }
              }}
              disabled={!coverLetterOutput.data}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Empty State */}
        {!coverLetterOutput.loading && !coverLetterOutput.error && !coverLetterOutput.data && (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <svg
              className="w-64 h-auto mb-6 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 2V9.85999C15.5 10.3 14.98 10.52 14.66 10.23L12.34 8.09003C12.15 7.91003 11.85 7.91003 11.66 8.09003L9.34003 10.23C9.02003 10.52 8.5 10.3 8.5 9.85999V2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 17H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Cover Letter Generated Yet</h3>
            <p className="text-gray-500 max-w-sm">
              Fill in your information and job details, then click "Generate Cover Letter" to create a customized letter.
            </p>
          </div>
        )}
        
        {/* Content */}
        {!coverLetterOutput.loading && !coverLetterOutput.error && coverLetterOutput.data && (
          <div>
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {`Cover letter for ${formData.companyName}: ${formData.positionTitle}`}
              </h3>
              <p className="text-sm text-gray-500">
                Generated on {getCurrentDate()}
              </p>
            </div>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {coverLetterOutput.data.text}
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {coverLetterOutput.loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Generating your cover letter...</p>
          </div>
        )}
        
        {/* Error State */}
        {coverLetterOutput.error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              {coverLetterOutput.error || "Failed to generate cover letter. Please check your API key and try again."}
            </p>
            <Button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
      
      {/* CV Output */}
      <Card className="bg-white rounded-xl shadow-md p-6 border border-gray-200 h-auto">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Updated CV</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Copy to clipboard"
              onClick={() => {
                if (cvOutput.data) {
                  copyToClipboard(cvOutput.data.text);
                }
              }}
              disabled={!cvOutput.data}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Download as .txt"
              onClick={() => {
                if (cvOutput.data) {
                  downloadTextFile(
                    cvOutput.data.text,
                    `updated_cv_${formData.positionTitle.toLowerCase().replace(/\s+/g, '_')}`
                  );
                  showToast("File downloaded");
                }
              }}
              disabled={!cvOutput.data}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
              title="Clear output"
              onClick={() => {
                if (onClearCV) {
                  onClearCV();
                  showToast("CV cleared");
                }
              }}
              disabled={!cvOutput.data}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Empty State */}
        {!cvOutput.loading && !cvOutput.error && !cvOutput.data && (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <svg
              className="w-64 h-auto mb-6 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 9.08984H20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13H8.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 13H16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 17H8.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17H16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No CV Updates Yet</h3>
            <p className="text-gray-500 max-w-sm">
              Fill in your information and job details, then click "Update CV" to optimize your resume for this position.
            </p>
          </div>
        )}
        
        {/* Content */}
        {!cvOutput.loading && !cvOutput.error && cvOutput.data && (
          <div>
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                Optimized CV for <span>{formData.positionTitle}</span>
              </h3>
              <p className="text-sm text-gray-500">
                Generated on {getCurrentDate()}
              </p>
            </div>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {cvOutput.data.text}
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {cvOutput.loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            <p className="mt-4 text-gray-600">Optimizing your CV...</p>
          </div>
        )}
        
        {/* Error State */}
        {cvOutput.error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              {cvOutput.error || "Failed to update CV. Please check your API key and try again."}
            </p>
            <Button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
