import React, { useState, useRef, useEffect } from "react";
import { useUserStore } from "../store";
import { LogOut, User, Settings } from "lucide-react";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useUserStore();

  // Get user's first letter for avatar
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback
  };

  // Get user's display name
  const getUserDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    // You might want to redirect to login page here
    window.location.href = "/login";
  };

  return (
    <div
      className="px-3 py-2 border-t border-gray-700 relative"
      ref={dropdownRef}
    >
      {/* User Profile Button */}
      <div
        className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-[#343541] rounded-lg cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-[#40414f] rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {getUserInitial()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{getUserDisplayName()}</p>
          <p className="text-xs text-gray-400">Free</p>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#212121] border border-gray-600 rounded-lg shadow-lg z-50">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#40414f] rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {getUserInitial()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#343541] transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#343541] transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-[#343541] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
