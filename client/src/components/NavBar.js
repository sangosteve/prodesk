import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FiMail, FiCalendar, FiBell, FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("user");
  };
  return (
    <div className="bg-white p-4 flex shadow-sm w-full">
      <div className="w-2/4 flex h-full">
        <div className="flex items-center">
          <FiSearch size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for Leads, Contacts, Reports and Tasks "
            className="focus:outline-none  text-gray-400 pl-2 bg-inherit "
          />
        </div>
      </div>
      <div className="w-2/4 h-full flex align-middle justify-end">
        <div className="w-20 flex items-center justify-around">
          <FiMail size={18} className="text-gray-400" />

          <FiCalendar size={18} className="text-gray-400" />

          <FiBell size={18} className="text-gray-400" />
        </div>

        <div className="w-6 h-6 flex items-center justify-center rounded-xl hover:cursor-pointer ">
          <HiOutlineUserCircle
            size={24}
            className="text-gray-400"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
