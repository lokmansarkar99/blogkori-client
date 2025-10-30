"use client";
import { createPost } from "@/services/user.services";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddPost() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categories: ""
  });
  const [blogPreview, setBlogPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const blogFileRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setBlogPreview(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a blog image");
      return;
    }

    if (!formData.categories) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const postFormData = new FormData();
      postFormData.append("image", selectedFile);
      postFormData.append("title", formData.title);
      postFormData.append("content", formData.content);
      postFormData.append("categories", JSON.stringify([formData.categories]));

      const result = await createPost(postFormData);

      if (result?.message === "Post created successfully!") {
        toast.success("Blog added successfully!");

        setFormData({ title: "", content: "", categories: "" });
        setBlogPreview(null);
        setSelectedFile(null);
        if (blogFileRef.current) blogFileRef.current.value = "";

        router.push("/user");
      } else {
        toast.error(result?.message || "Failed to add blog!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#7050ff]">
        Add New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7050ff] outline-none disabled:opacity-50"
            required
            minLength={3}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            disabled={loading}
            rows="5"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7050ff] outline-none disabled:opacity-50"
            required
            minLength={10}
          />
        </div>

        {/* Blog Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">
            Blog Image*
          </label>
          <input
            type="file"
            accept="image/*"
            ref={blogFileRef}
            onChange={handleImageUpload}
            disabled={loading}
            className="w-full p-3 rounded-lg border border-gray-300 outline-none disabled:opacity-50"
            required
          />
          {blogPreview && (
            <img
              src={blogPreview}
              alt="blog preview"
              className="mt-3 rounded-lg w-40 h-40 object-cover border border-gray-200"
            />
          )}
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-1 font-medium text-gray-800">
            Category*
          </label>
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7050ff] outline-none disabled:opacity-50"
            required
          >
            <option value="" disabled>
              -- Select a Category --
            </option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="programming">Programming</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7050ff] text-white p-3 rounded-lg hover:bg-[#5a3de0] transition font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}
