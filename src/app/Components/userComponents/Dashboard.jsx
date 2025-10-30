import Card from "@/app/Components/userComponents/card";
import EditProfileModal from "@/app/Components/userComponents/EditProfileModal";
import { getUserProfile, getUserStats } from "@/services/user.services";
import { FileText, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";

export default async function UserDashBoard() {
  // User Stats API
  const userStats = await getUserStats();
  const stats = userStats?.stats || {};

  const { totalLikes = 0, totalDislikes = 0, totalPosts = 0 } = stats;

  // Fetch user profile
  const userData = await getUserProfile();
  const user = userData?.user || {};

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
              className="rounded-full border border-gray-200 object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-[#7050ff]">
                {user.name}
              </h3>
              <p className="text-lg text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Edit Button + Modal */}
          <EditProfileModal user={user} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <Card
            title="Total Likes"
            value={totalLikes}
            icon={ThumbsUp}
            color="bg-green-500"
          />
          <Card
            title="Total Dislikes"
            value={totalDislikes}
            icon={ThumbsDown}
            color="bg-red-500"
          />
          <Card
            title="Total Posts"
            value={totalPosts}
            icon={FileText}
            color="bg-[#7050ff]"
          />
        </div>
      </main>
    </div>
  );
}
