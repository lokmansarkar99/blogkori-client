import {
  getAllPendingPost,
  getAllPostForAdmmin,
  getAllUsers
} from "@/actions/admin.action";
import Card from "@/app/Components/userComponents/card";
import { getUserProfile } from "@/services/user.services";
import { FileText, Users } from "lucide-react";
import Image from "next/image";
import EditProfileModal from "../userComponents/EditProfileModal";

const AdminDashboard = async () => {
  const isUser = await getUserProfile();
  const user = isUser?.user || {};
  const userData = await getAllUsers();
  const allPostData = await getAllPostForAdmmin();
  const totalUsers = userData?.users?.length;
  const pendingUsers = userData?.stats?.pendingUsers;
  const pendingPosts = await getAllPendingPost();
  const totalPost = allPostData?.posts?.posts?.length;

  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">User Dashboard</h2>

        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Image
              src={user?.avatarUrl || "/defaultProfile.png"}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full border border-gray-200"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#7050ff]">
                {user.name}
              </h3>
              <p className="text-lg text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* More Button + Modal */}
          <EditProfileModal user={user} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <Card
            title="Total Users"
            value={totalUsers}
            icon={Users}
            color="bg-[#7050ff]"
          />
          <Card
            title="Pending Users"
            value={pendingUsers}
            icon={Users}
            color="bg-red-500"
          />
          <Card
            title="Total Posts"
            value={totalPost}
            icon={FileText}
            color="bg-[#7050ff]"
          />
          <Card
            title="Pending Posts"
            value={pendingPosts?.posts?.length}
            icon={FileText}
            color="bg-red-500"
          />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
