// src/components/medium/StatusNotification.tsx
import React from "react";
import { Save, X } from "lucide-react";

interface StatusNotificationProps {
  saveStatus: string;
  error: string;
}

const StatusNotification: React.FC<StatusNotificationProps> = ({
  saveStatus,
  error,
}) => {
  if (!saveStatus && !error) return null;

  const isError = Boolean(error);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
        isError
          ? "bg-red-50 border-red-200 text-red-800"
          : "bg-green-50 border-green-200 text-green-800"
      }`}
    >
      <div className="flex items-center gap-2">
        {isError ? <X className="w-5 h-5" /> : <Save className="w-5 h-5" />}
        <span className="font-medium">{isError ? error : saveStatus}</span>
      </div>
    </div>
  );
};

export default StatusNotification;
