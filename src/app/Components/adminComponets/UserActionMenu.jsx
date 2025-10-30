"use client";
import { useState, useTransition } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import {
  changeRoleByAdmin,
  deleteUserById,
  updateUserByAdmin,
} from "@/actions/admin.action";

export default function UserActionMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [isChangigStatus, startChangeStatus] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [isRoleChanging, startRoleChanging] = useTransition();

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  let status = user?.status === "approved" ? "suspended" : "approved";
  let userRole = user?.role === "user" ? "admin" : "user";

  const handleMakeAdmin = () => {
    startRoleChanging(async () => {
      try {
        const res = await changeRoleByAdmin({
          userId: user?._id,
          role: userRole,
        });
        if (res.success) {
          toast.success(`User role changed to ${userRole}`);
        } else {
          toast.error("Something went wrong while changing user role");
        }
      } catch (err) {
        toast.error("Error changing user role");
      }
    });
    closeMenu();
  };

  const handleToggleStatus = () => {
    startChangeStatus(async () => {
      try {
        const res = await updateUserByAdmin({ userId: user?._id, status });
        if (res.success) {
          toast.success(`Changed user status to ${status}`);
        } else {
          toast.error("Something went wrong when changing user status");
        }
      } catch (err) {
        toast.error("Error changing user status");
      }
    });
    closeMenu();
  };

  const handleDeleteUser = () => {
    startDeleting(async () => {
      try {
        const res = await deleteUserById({ userId: user?._id });
        if (res.success) {
          toast.success(`User deleted successfully`);
        } else {
          toast.error("Something went wrong when deleting user");
        }
      } catch (err) {
        toast.error("Error deleting user");
      }
    });
    closeMenu();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-md w-40 z-10">
          <ul className="text-sm text-gray-700">
            <li
              onClick={handleMakeAdmin}
              className={`px-4 py-2  hover:bg-gray-100 cursor-pointer`}
            >
              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
            </li>

            <li
              onClick={handleToggleStatus}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.status === "approved" ? "Suspend User" : "Activate User"}
            </li>

            <li
              onClick={handleDeleteUser}
              className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Delete User
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
