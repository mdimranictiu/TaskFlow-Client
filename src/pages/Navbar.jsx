import React, { useState } from "react";
//import { BellIcon } from "@heroicons/react/24/outline"; // Notification Icon
import { motion } from "framer-motion"; // For smooth animations

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/120x40?text=LOGO"
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Right Side - Notification, Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
         {/* // <BellIcon className="w-7 h-7 text-gray-600 hover:text-blue-600" /> */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile Image & Username */}
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="https://via.placeholder.com/40" // Replace with actual profile image URL
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-3 py-1 rounded-lg text-gray-700 font-medium text-sm"
            >
              John Doe
            </motion.span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
