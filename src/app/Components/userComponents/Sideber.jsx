"use client";
import { useLogout } from "@/services/auth.services";
import Link from "next/link";
import { useState } from "react";
import {
  MdAddBox,
  MdDashboard,
  MdHome,
  MdLogout,
  MdPostAdd
} from "react-icons/md";

const sidebarItems = [
  { name: "Dashboard", icon: <MdDashboard />, link: "/user" },
  { name: "My Posts", icon: <MdPostAdd />, link: "/user/myallposts" },
  { name: "Add Post", icon: <MdAddBox />, link: "/user/addPost" },
  { name: "Home", icon: <MdHome />, link: "/" }
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  return (
    <>
      {/* Mobile Toggle  */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#7050ff] text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white text-[#7050ff] h-screen py-5 fixed top-0 left-0 
        w-[220px] z-40 transition-transform duration-300 border-r border-gray-200
        ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
      >
        <h2 className="text-center mb-8 mt-5 text-2xl font-bold tracking-wide">
          Dashboard
        </h2>
        <nav>
          <ul className="list-none p-0">
            {sidebarItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  href={item.link}
                  className="flex items-center px-5 py-2 rounded-md transition-colors hover:bg-[#f3f0ff]"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-base font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="mb-4">
              <button
                className="flex items-center px-5 py-2 rounded-md transition-colors hover:bg-[#f3f0ff]"
                onClick={logout}
              >
                <span className="mr-3 text-xl">
                  <MdLogout />
                </span>
                <span className="text-base font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
