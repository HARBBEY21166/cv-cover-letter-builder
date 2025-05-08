import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onApiKeySave: (key: string) => void;
  showToast: (message: string, type?: "success" | "error") => void;
}

export default function ApiKeyModal({ isOpen, onClose, apiKey, onApiKeySave, showToast }: ApiKeyModalProps) {
  const [keyInputValue, setKeyInputValue] = useState(apiKey);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    const trimmedKey = keyInputValue.trim();
    if (!trimmedKey) {
      showToast("Please enter a valid API key", "error");
      return;
    }
    onApiKeySave(trimmedKey);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-gray-800">API Key Configuration</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <p className="text-gray-600 mb-4">
          Enter your Google Gemini API key to enable AI features. Your key is stored locally in your browser.
        </p>
        
        <div className="mb-4">
          <Label htmlFor="apiKey" className="block text-gray-700 font-medium mb-2">
            Gemini API Key
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="apiKey"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your API key"
              value={keyInputValue}
              onChange={(e) => setKeyInputValue(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Get your API key from{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>
        
        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition"
            onClick={handleSave}
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
