import React from "react";

interface OverlayLoaderProps {
  show: boolean;
  label?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ show, label }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative flex items-center gap-2 bg-white rounded-lg py-2 px-4 border border-gray-200">
        <div className="w-3 h-3 border-2 border-black border-b-transparent rounded-full animate-spin"></div>
        <div className="text-black text-center text-sm">
          {label || "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default OverlayLoader;
