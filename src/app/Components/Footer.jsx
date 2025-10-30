// "use client";

export default function Footer() {
  return (
    <footer className="bg-[#c5c6fc]  py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#3F404D]">About</h3>
          <p className="text-[#3F404DCC] text-sm leading-relaxed mb-4">
            InsightCraft is a creative blogging platform built to share powerful
            ideas, stories, and innovations that inspire people around the
            world. We believe in the value of curiosity, creativity, and
            continuous learning.
          </p>
          <p className="text-sm text-[#3F404DCC]">
            <span className="font-semibold">Email:</span> info@jstemplate.net
          </p>
          <p className="text-sm text-[#3F404DCC]">
            <span className="font-semibold">Phone:</span> 880 123 456 789
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#3F404D]">
            Quick Link
          </h3>
          <ul className="space-y-2 text-[#3F404DCC] text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Archived
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Author
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#3F404D]">
            Category
          </h3>
          <ul className="space-y-2 text-[#3F404DCC] text-sm">
            <li>
              <a href="#" className="hover:text-blue-600">
                Lifestyle
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Technology
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Travel
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Business
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Economy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Sports
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-1 text-center text-[#3F404D]">
            Weekly Newsletter
          </h3>
          <p className="text-[#3F404DCC] text-sm text-center mb-4">
            Get blog articles and offers via email
          </p>
          <form className="flex flex-col space-y-3">
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border text-[#3F404DCC] rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-800">✉️</span>
            </div>
            <button
              type="submit"
              className="bg-[#6D28D9] hover:bg-[#6204f8] text-white py-2 rounded-md text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} InsightCraft — Exploring ideas, stories, and
        innovations that inspire.
      </div>
    </footer>
  );
}
