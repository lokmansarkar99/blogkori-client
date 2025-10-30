"use client";
import { updateUserProfile, uploadAvatar } from "@/services/user.services";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function EditProfileModal({ user }) {
  const [editProfile, setEditProfile] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState(user?.avatarUrl || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // Step 1: Update profile (name/email)
        const profileResult = await updateUserProfile({
          name: formData.name,
          email: formData.email
        });

        if (!profileResult?.success) {
          toast.error(profileResult?.message || "Failed to update profile");
          return;
        }

        // Step 2: Upload avatar if new file selected
        if (selectedFile) {
          const avatarFormData = new FormData();
          avatarFormData.append("avatar", selectedFile);

          const avatarResult = await uploadAvatar(avatarFormData);

          if (!avatarResult?.success) {
            toast.error("Profile updated but avatar upload failed");
            setEditProfile(false);
            router.refresh();
            return;
          }
        }

        toast.success("Profile updated successfully!");
        setEditProfile(false);
        setSelectedFile(null);
        router.refresh();
      } catch (error) {
        console.error("Update profile error:", error);
        toast.error(error.message || "An error occurred");
      }
    });
  };

  return (
    <>
      {/* Edit Button */}
      <div
        onClick={() => setEditProfile(true)}
        className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition"
      >
        <SquarePen className="w-6 h-6 text-gray-600 hover:text-[#7050ff]" />
      </div>

      {/* Edit Modal */}
      {editProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[#7050ff]">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="text-center mb-6">
                <div
                  onClick={() => !isPending && fileInputRef.current.click()}
                  className={`cursor-pointer group relative w-24 h-24 mx-auto rounded-full border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">Upload</span>
                  )}
                  {!isPending && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white transition">
                      Change
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  disabled={isPending}
                  className="hidden"
                />
                {selectedFile && (
                  <p className="text-xs text-gray-600 mt-2">
                    New image selected: {selectedFile.name}
                  </p>
                )}
              </div>

              {/* Form Inputs */}
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isPending}
                  className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#7050ff] outline-none rounded mt-1 disabled:opacity-50 disabled:bg-gray-100"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isPending}
                  className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-[#7050ff] outline-none rounded mt-1 disabled:opacity-50 disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditProfile(false)}
                  disabled={isPending}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-[#7050ff] text-white rounded hover:bg-[#5931d1] disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
