import React from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const Protected = () => {
  return (
    <div className="flex w-full h-screen bg-slate-50">
      <Sidebar />
      <div className="w-full flex flex-col">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Protected;
