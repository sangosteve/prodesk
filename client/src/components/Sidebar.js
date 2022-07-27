import React from "react";

import {
  FiInfo,
  FiLayers,
  FiUsers,
  FiPieChart,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="bg-gray-900 w-12 h-min-screen flex flex-col align-middle">
      <div className="w-full h-14 border-b border-gray-500"></div>
      <nav className="flex flex-col w-full h-44 items-center justify-between mt-8">
        {/* Top Nav */}

        <Link to="/">
          <FiInfo size={18} color="#fff" />
        </Link>

        <Link to="/tickets">
          <FiLayers size={18} color="#fff" />
        </Link>

        <Link to="/users">
          <FiUsers size={18} color="#fff" />
        </Link>

        <Link to="/reports">
          <FiPieChart size={18} color="#fff" />
        </Link>

        <Link to="/settings">
          <FiSettings size={18} color="#fff" />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
