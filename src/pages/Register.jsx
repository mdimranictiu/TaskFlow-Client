import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-6">
        {/* Logo and Welcome Message */}
        <div className="flex flex-col items-center">
          <img
            src="https://taskify.taskhub.company/storage/logos/default_full_logo.png"
            alt="Logo"
            className="w-32 mb-4"
          />
          <h3 className="text-2xl font-semibold text-[#566A7F]">
          Create a new account
          </h3>
          <p className="py-2 text-[#566A7F]">Register to Continue</p>
        </div>

        {/* Login Form */}
        
        <form className="mt-4">
        <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Your Photo URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              placeholder="Photo URL"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0C65E3] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#0C65E3] rounded-lg hover:bg-white hover:text-[#0C65E3] border border-[#0C65E3] text-lg font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500 font-semibold">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
        >
          <FcGoogle size={24} />
          <span className="font-semibold cursor-pointer">Continue with Google</span>
        </button>
        <p className="text-center px-4 text-gray-500">Already Have An Account ? <Link className="text-black" to='/'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
