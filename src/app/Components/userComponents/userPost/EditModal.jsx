"use client";
import { updatePost, updatePostImage } from "@/services/user.services";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";

const EditModal = ({ post, onClose }) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    categories: post.categories || []
  });
  const [preview, setPreview] = useState(post.imageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // Convert single category to array format
    setFormData((prev) => ({ ...prev, categories: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // Step 1: Update post text fields
        const updateResult = await updatePost(post._id, {
          title: formData.title,
          content: formData.content,
          categories: formData.categories
        });

        if (!updateResult?.message?.includes("successfully")) {
          toast.error(updateResult?.message || "Failed to update post");
          return;
        }

        // Step 2: Update image if new file selected
        if (selectedFile) {
          const imageFormData = new FormData();
          imageFormData.append("image", selectedFile);

          const imageResult = await updatePostImage(post._id, imageFormData);

          if (!imageResult?.success) {
            toast.error("Post updated but image upload failed");
            onClose();
            return;
          }
        }

        toast.success("Post updated successfully!");
        onClose();
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.message || "An error occurred");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-xl text-[#7050ff] text-center font-semibold mb-4">
          Edit Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-800 font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 border border-[#7050ff] rounded-lg focus:ring-2 focus:ring-[#7050ff] disabled:opacity-50 disabled:bg-gray-100"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-800 font-medium">
              Content
            </label>
            <textarea
              name="content"
              rows="4"
              value={formData.content}
              onChange={handleChange}
              disabled={isPending}
              className="w-full p-2 border border-[#7050ff] rounded-lg focus:ring-2 focus:ring-[#7050ff] disabled:opacity-50 disabled:bg-gray-100"
              required
              minLength={10}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-800 font-medium">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageUpload}
              disabled={isPending}
              className="w-full p-2 border border-[#7050ff] rounded-lg disabled:opacity-50"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-md w-40 h-32 object-cover border border-[#7050ff]"
              />
            )}
            {selectedFile && (
              <p className="text-xs text-gray-600 mt-1">
                New image selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-800 font-medium">
              Category
            </label>
            <select
              name="categories"
              value={formData.categories[0] || "Programming"}
              onChange={handleCategoryChange}
              disabled={isPending}
              className="w-full p-2 border border-[#7050ff] rounded-lg focus:ring-2 focus:ring-[#7050ff] disabled:opacity-50 disabled:bg-gray-100"
              required
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Programming">Programming</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-[#7050ff] text-white rounded hover:bg-[#5a3de0] disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
