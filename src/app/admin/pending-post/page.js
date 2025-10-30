// src/app/admin/pending-posts/page.js
import { getAllPendingPost } from "@/actions/admin.action";
import PendingPostActions from "@/app/Components/adminComponets/PendingPostActions";
import Image from "next/image";
export default async function PendingPostPage() {
  const pendingPostsData = await getAllPendingPost();
  const posts = pendingPostsData?.posts;

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <h1 className="text-2xl text-white font-medium mb-4">Pending Posts</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 text-sm text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left font-semibold tracking-wide">
              Image
            </th>
            <th className="py-3 px-4 text-left font-semibold tracking-wide">
              Title
            </th>
            <th className="py-3 px-4 text-left font-semibold tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
          {posts?.map((post) => (
            <tr
              key={post._id}
              className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <td className="py-3 px-4">
                <Image
                  src={post.imageUrl}
                  alt={`Image for ${post.title}`}
                  width={80}
                  height={60}
                  className="rounded-md object-cover border border-gray-300"
                />
              </td>
              <td className="p-2 text-blue-600 underline">{post.title}</td>
              <td className="py-3 px-4">
                {/* Client Component for actions */}
                <PendingPostActions post={post} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
