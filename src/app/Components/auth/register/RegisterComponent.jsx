
import Link from "next/link";
import Image from "next/image";
const RegisterComponent = ({children}) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center px-4 py-12 gap-10">
        {/* Form Section */}
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center">Create account</h1>
          <p className="text-sm text-gray-600 text-center">
            Let's start with your basic information
          </p>

        {children}

          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline text-center block">
            You already have an account? Sign in
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-md flex justify-center">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/woman-laptop-sitting-dark.png"
              alt="Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterComponent;
