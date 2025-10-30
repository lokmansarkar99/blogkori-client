"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Illustration */}
      <div className="relative">
        <Image
          src="/404.png"
          alt="Page Not Found"
          width={420}
          height={320}
          className="mx-auto drop-shadow-xl animate-bounce-slow"
          priority
        />
      </div>

      {/* Text content */}
      <h1 className="mt-8 text-4xl md:text-5xl font-bold text-gray-800 ">
        Oops! Page Not Found
      </h1>
      <p className="mt-3 text-gray-600 text-sm md:text-base max-w-md mx-auto">
        The page you’re looking for doesn’t exist or has been moved. Let’s get
        you back on track.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-[#7033ff] to-[#8b5cff] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-transform duration-300 hover:scale-105">
        Go to Homepage
      </Link>
    </div>
  );
}
