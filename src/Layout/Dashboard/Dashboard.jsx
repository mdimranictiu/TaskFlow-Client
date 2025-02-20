import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { FaCirclePlus } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";





const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user,logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest(".sidebar")) {
        setSidebarOpen(false);
      }
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, dropdownOpen]);
 const handleLogOut=()=>{
    logOut()
 }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`sidebar ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } fixed md:relative md:translate-x-0 w-64 bg-gray-800 text-white h-full p-5 transition-transform duration-300 z-50 flex flex-col`}
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2 mt-12 flex-1">
          <Link
            to="/dashboard/home"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <IoHomeOutline></IoHomeOutline>
            Home
          </Link>
          <Link
            to="/dashboard/add-task"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <FaCirclePlus></FaCirclePlus>
            Add Task
          </Link>
          <Link
            to="/dashboard/my-tasks"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <BsListTask></BsListTask>
            My Tasks
          </Link>
        </nav>

        {/* Logout Button at Bottom */}
        <button onClick={handleLogOut}  className="absolute bottom-5 left-0 w-full bg-red-500 px-4 py-2 text-center text-white hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-[#1E2939] text-white shadow-md p-4 flex justify-between px-24 items-center relative">
          {/* Sidebar Toggle Button (for mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold">TaskFlow</h2>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <FaBell size={24} className="text-gray-300 cursor-pointer" />

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"} // Default image if no user photo
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 p-3 bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b mb-2">
                    <p className="font-semibold">{user?.displayName || "User"}</p>
                    <p className="text-sm">{user?.email || "No Email"}</p>
                  </div>
                  <button className="w-full cursor-pointer px-4 py-2 mb-2 text-left text-gray-300 hover:bg-gray-700">
                    Profile
                  </button>
                  <button onClick={handleLogOut} className="w-full cursor-pointer bg-red-500 mb-2 px-4 py-2 text-left text-white hover:bg-red-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
