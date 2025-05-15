import React from "react";

interface OverlayLoaderProps {
  show: boolean;
  label?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ show, label }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-center">
          {label || "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default OverlayLoader;
