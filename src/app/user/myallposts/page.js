import DeleteButton from "@/app/Components/userComponents/userPost/DeleteButton";
import EditButton from "@/app/Components/userComponents/userPost/EditButton";
import { getUserPosts } from "@/services/user.services";
import { revalidatePath } from "next/cache";
import Image from "next/image";
// const initialPosts = [
//   {
//     id: 1,
//     title: "Getting Started with Next.js",
//     content:
//       "Next.js is a powerful React framework for building fast, SEO-friendly web applications.",
//     image: "/404.png"
//   },
//   {
//     id: 2,
//     title: "Understanding React Hooks",
//     content:
//       "Hooks like useState and useEffect make React functional components much more powerful.",
//     image: "/404.png"
//   },
//   {
//     id: 3,
//     title: "Top 5 VS Code Extensions for Developers",
//     content:
//       "From Prettier to ESLint, here are some must-have extensions to boost your coding workflow.",
//     image: "/404.png"
//   }
// ];

const Dashboard = async () => {
  const getPosts = await getUserPosts();
  const initialPosts = (await getPosts?.posts) || [];

  const handleDelete = (post) => {
    // delete api call
    revalidatePath("/blog");
  };

  const handleEdit = (updatedPost) => {
    // edit api call
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl text-gray-700 font-bold mb-4">My All Posts</h1>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Title</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {initialPosts.map((post) => (
              <tr
                key={post.id}
                className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={80}
                    height={60}
                    className="rounded-md object-cover border border-gray-300"
                  />
                </td>
                <td className="py-3 px-4 text-[#7050ff] font-medium">
                  {post.title}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <EditButton post={post} />
                  <DeleteButton post={post} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
