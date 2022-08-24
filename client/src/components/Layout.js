import React from "react";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Tickets,
  Users,
  Reports,
  Settings,
  Login,
} from "../pages/index";
import TicketViewPage from "../pages/TicketViewPage";
const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen bg-slate-50">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
