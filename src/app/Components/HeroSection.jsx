import React from "react";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="py-24 px-6 md:px-12  relative overflow-hidden">
      {/* Content Container */}
      <div className="max-w-5xl mt-9 mx-auto text-center relative z-10">
        {/* Tagline */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider uppercase text-[#7050ff] bg-blue-100 rounded-full">
          Expert Insights. Delivered Daily.
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#3F404D] mb-6 leading-tight">
          Unlock the World's Best Ideas.
        </h1>

        {/* Sub-Headline/Description */}
        <p className="text-xl md:text-2xl text-[#3F404D] font-light mb-10 max-w-3xl mx-auto">
          Deep dives into strategy, culture, and innovation that will elevate
          your perspective and drive real change.
        </p>

        {/* CTA */}
        <Link
          href="/blog"
          className="inline-block px-8 py-3 text-lg font-bold text-white bg-[#7050ff] rounded-lg hover:bg-[#5a4bcf] transition duration-300 shadow-xl"
        >
          Start Reading Now
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
