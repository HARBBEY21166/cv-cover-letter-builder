import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  visible: boolean;
  message: string;
  type: "success" | "error";
}

export default function Toast({ visible, message, type }: ToastProps) {
  if (!visible) return null;

  const bgColor = type === "success" ? "bg-gray-800" : "bg-red-600";
  const icon = type === "success" ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50`}>
      {icon}
      <span>{message}</span>
    </div>
  );
}
