"use client";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import EditModal from "./EditModal";

const EditButton = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        title="Edit post"
        aria-label={`Edit ${post.title}`}
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-700 text-sm font-medium rounded-md"
      >
        <PencilIcon className="w-4 h-4 hover:text-[#7050ff]" />
      </button>

      {isModalOpen && (
        <EditModal post={post} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default EditButton;
