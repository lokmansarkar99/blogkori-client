import Link from "next/link";

export default function PostCard({ post }) {
  if (!post) {
    console.log("PostCard: post undefined, skipping render...");
    return null;
  }
  const { title, content, imageUrl, categories, status, createdAt } = post;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform border border-[#f1eef5]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-gray-600">{title}</h2>

        {/* Content */}
        <p className="text-[#706780] mb-3 line-clamp-3">{content}</p>

        {/* categories & Date */}
        <div className="flex justify-between items-center">
          <span className="bg-[#5B21B6]/30 text-gray-900 px-2 py-1 rounded text-sm backdrop-blur-sm border border-[#5B21B6]/50">
            {post?.categories}
          </span>
          <span className="inline-block border border-[#7C3AED] text-[#C084FC] px-2 py-0.5 rounded-full text-xs font-medium">
            {createdAt}
          </span>
        </div>
      </div>

      {/* Read More Button */}
      <div className="flex justify-end mx-4 my-4">
        <Link href={`/blog/${post._id}`}>
          <button className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
}
