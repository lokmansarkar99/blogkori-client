import PostCard from "./PostCard";

async function BlogPost({ posts }) {
  return (
    <div
      className="min-h-screen 
     text-white py-10 px-6"
    >
      {/* <h1 className="text-3xl font-bold mb-8 text-white text-center">
        All Blog <mark className="text-[#7050ff]">Posts</mark>
      </h1> */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogPost;
