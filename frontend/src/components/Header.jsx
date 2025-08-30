import React from "react";
import { Menu, Share2, MoreVertical } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="bg-[#212121] p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
