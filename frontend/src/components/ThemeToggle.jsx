import React from "react";

const ThemeToggle = ({ isDark, toggleTheme, size = "default" }) => {
  const sizeClasses = {
    small: "p-1.5 sm:p-2",
    default: "p-2 sm:p-2.5",
  };

  const iconSizes = {
    small: "w-4 h-4",
    default: "w-4 h-4 sm:w-5 sm:h-5",
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${sizeClasses[size]} rounded-xl hover:shadow-md dark:hover:shadow-md transition-all duration-200 group`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          className={`${iconSizes[size]} text-yellow-500 group-hover:scale-110 transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className={`${iconSizes[size]} text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
