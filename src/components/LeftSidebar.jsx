import React, { useState } from "react";

const LeftSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="fixed left-4 top-16  p-4">
      {/* Button to show/hide sidebar on small screens */}
      <button
        className="fixed top-4 left-4  text-white px-4 py-2 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      {/* Sidebar */}
      <div
        className={`bg-gray-200 w-64 h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 rounded-md ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-auto md:h-auto md:overflow-visible`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/logo.svg" // Replace with your logo path
              alt="Logo"
              className="w-12 h-12 mx-auto"
            />
            <p className="text-gray-800 font-semibold text-lg mt-2">
              Social Media App
            </p>
          </div>
          {/* Navigation Links */}
          <nav className="space-y-4">
            <a
              href="/"
              className="block py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Home
            </a>
            <a
              href="/profile"
              className="block py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Profile
            </a>
            <a
              href="/messages"
              className="block py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Messages
            </a>
            {/* Add more navigation links as needed */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
