import React from "react";
import logo from "../../assets/free-notes-172-470361.png";

export const Navbar = () => {
  return (
    <header className="flex items-center px-6 py-3 gap-4 border-b-2 border-gray-100 bg-white shadow-sm">
      <div className="w-12 h-12 rounded-md overflow-hidden bg-indigo-50 flex items-center justify-center">
        <img className="w-full h-full object-contain" src={logo} alt="logo" />
      </div>
      <h1 className="text-indigo-800 text-3xl font-extrabold tracking-tight">
        NOTE ALL
      </h1>
      <div className="ml-auto text-sm text-gray-500">Daily notes.Never Forget</div>
    </header>
  );
};
