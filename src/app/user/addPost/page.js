import AddPost from "@/app/Components/userComponents/userPost/AddPost";

export const metadata = {
  title: "Create New Post",
  description: "Create a new blog post"
};

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <AddPost />
    </div>
  );
}
