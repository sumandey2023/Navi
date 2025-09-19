import React, { useState } from "react";
import { Menu, Share2, MoreVertical } from "lucide-react";
import ShareChatModal from "./ShareChatModal";

const Header = ({ toggleSidebar, currentChat }) => {
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    chat: null,
  });

  const handleShare = () => {
    if (currentChat) {
      setShareModal({ isOpen: true, chat: currentChat });
    }
  };

  const handleCloseShareModal = () => {
    setShareModal({ isOpen: false, chat: null });
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="bg-[#212121] p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors"
            disabled={!currentChat}
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add top padding so page content doesn’t go under header */}
      <div className="pt-16">{/* Page content will go here */}</div>

      {/* Share Modal */}
      <ShareChatModal
        isOpen={shareModal.isOpen}
        onClose={handleCloseShareModal}
        chat={shareModal.chat}
      />
    </>
  );
};

export default Header;
