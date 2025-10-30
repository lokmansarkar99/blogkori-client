import Image from "next/image";
import Link from "next/link";



export default function LoginComponent({children}) {
 

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-12 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
          {/* Illustration Section */}
          <div className="w-full max-w-md flex justify-center">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src="/woman-working-servers-dark.png"
                alt="Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Login Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-100">
            {/* Welcome Text */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                Welcome Back 👋
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Please enter your credentials to continue
              </p>
            </div>
            {children}

            {/* Create account link */}
            <div className="text-center text-sm text-gray-600">
              New on our platform?{" "}
              <Link
                href="/register"
                className="text-purple-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
