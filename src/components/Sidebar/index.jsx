import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const getStyles = ({ isActive }) => {
    const styles =
      "flex items-center gap-2 px-3 py-2 rounded-tr-full rounded-br-full transition-all";
    return isActive
      ? `text-slate-50 bg-indigo-800 ${styles}`
      : `text-gray-700 hover:bg-indigo-800 hover:text-slate-50 ${styles}`;
  };

  return (
    <aside className="flex flex-col gap-3 border-r-2 border-gray-100 w-[170px] h-screen p-4 bg-white">
      <NavLink className={getStyles} to="/">
        <span className="material-icons-outlined">home</span>
        <span>Home</span>
      </NavLink>

      <NavLink className={getStyles} to="/archive">
        <span className="material-icons-outlined">archive</span>
        <span>Archive</span>
      </NavLink>

      <NavLink className={getStyles} to="/important">
        <span className="material-icons-outlined">label_important</span>
        <span>Important</span>
      </NavLink>

      <NavLink className={getStyles} to="/bin">
        <span className="material-icons-outlined">delete</span>
        <span>Bin</span>
      </NavLink>
    </aside>
  );
};
