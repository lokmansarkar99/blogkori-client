"use client";

import { useLogout } from "@/services/auth.services";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Navbar({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const redirectTo = user?.role === "user" ? "/user" : "/admin";
  const logout = useLogout();

  console.log(user);

  return (
    <nav className="mx-auto mt-4 sticky top-4 z-50 px-3">
      <div className="max-w-7xl mx-auto bg-white rounded-xl  px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-md">
        {/* Logo */}
        <Link href="/" className=" text-[#7050ff] text-xl font-bold">
          BlogKori
        </Link>

        {/* Menu */}
        <div className="hidden md:flex flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/about"
                className="text-[#3F404D] font-semibold hover:text-[#7050ff]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-[#3F404D] font-semibold hover:text-[#7050ff]"
              >
                Blog
              </Link>
            </li>
            {/* <li>
              <Link
                href="/contact"
                className="text-[#3F404D] font-semibold hover:text-[#7050ff]"
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Auth / Profile */}
        <div className="flex gap-2 items-center">
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base"
            >
              Sign In
            </Link>
          ) : (
            <div className="dropdown dropdown-end relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn btn-ghost btn-circle avatar flex items-center justify-center"
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <ul className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box absolute right-0 z-10">
                  <li>
                    <Link href={`${redirectTo}`}>Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
