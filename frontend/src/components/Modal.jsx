import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        className="bg-[#2a2b32] rounded-xl w-full max-w-md mx-4 relative shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
