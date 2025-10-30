import CommentStatus from "./adminComponets/CommentStatus";

export default function CommentCard({ comments, isAdmin }) {
  return (
    <section className="max-w-3xl mx-auto py-8 px-4 ">
      <h2 className="text-2xl font-bold mb-5 dark:text-gray-600">
        Comments ({comments?.length})
      </h2>

      <div className="space-y-4 shadow-lg ">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border border-gray-100 dark:border-gray-300 rounded-xl p-4 hover:shadow-md transition bg-white dark:bg-[#dedee6]"
          >
            {/* Comment Content */}
            <p className="text-gray-900 dark:text-gray-900 mb-2">
              {comment.content}
            </p>

            {/* Comment Footer */}
            <div className="flex justify-between items-center text-sm">
              <span
                className={`px-2 py-1 rounded-md font-medium text-gray-400`}
              >
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>

              {isAdmin && <CommentStatus comment={comment} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
