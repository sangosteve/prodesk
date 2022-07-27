import React from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Tickets, Users, Reports, Settings } from "../pages/index";
const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen bg-slate-50">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
