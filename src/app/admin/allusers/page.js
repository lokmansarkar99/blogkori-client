import { getAllUsers } from "@/actions/admin.action";
import UserActionMenu from "@/app/Components/adminComponets/UserActionMenu";
import Image from "next/image";

export default async function Page() {
  const userData = await getAllUsers();
  const users = userData?.users || [];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-white mb-4">All Users</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Profile</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4">
                  <Image
                    src={user.image || "/defaultProfile.png"}
                    alt={user.name}
                    width={45}
                    height={45}
                    className="rounded-full border border-gray-300 object-cover"
                  />
                </td>
                <td className="py-3 px-4 font-medium text-[#7050ff]">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td
                  className={`py-3 px-4 text-gray-800 ${
                    user.role === "admin" ? "text-red-600" : ""
                  }`}
                >
                  {user.role}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    user.status === "approved"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {user.status}
                </td>
                <td className="py-3 px-4">
                  <UserActionMenu user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative" // ✅ relative
          >
            {/* UserActionMenu on top-right */}
            <div className="absolute top-2 right-2">
              <UserActionMenu user={user} />
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={user.image || "/defaultProfile.png"}
                alt={user.name}
                width={45}
                height={45}
                className="rounded-full border border-gray-300 object-cover"
              />
              <div>
                <h3 className="font-medium text-[#7050ff]">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between text-sm text-gray-700">
              <p>
                <span className={`font-semibold `}>Role:</span>{" "}
                <span
                  className={`${user.role === "admin" ? "text-red-600" : ""}`}
                >
                  {user.role}
                </span>
              </p>
              <p
                className={`font-semibold ${
                  user.status === "approved" ? "text-green-600" : "text-red-500"
                }`}
              >
                {user.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
