"use client";

import { createUserByAdmin } from "@/actions/admin.action";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await createUserByAdmin({ name, email, password });
      if (res.success) {
        toast.success("User created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(res.message || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#7050ff] text-white py-2 rounded-lg hover:bg-[#7033ff] transition duration-200"
      >
        {isLoading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}

export default CreateUser;
