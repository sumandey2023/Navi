import React from "react";

const UserProfile = () => {
  return (
    <div className="px-3 py-2 border-t border-gray-700">
      <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-[#343541] rounded-lg cursor-pointer transition-colors">
        <div className="w-8 h-8 bg-[#40414f] rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">S</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Suman Dey</p>
          <p className="text-xs text-gray-400">Free</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
