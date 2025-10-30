import Image from "next/image";
const VerifyEmailComp = ({children}) => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-5xl w-full">
        {/* Illustration */}
        <div className="flex justify-center items-center">
          <Image
            src="/authentication-form-fields-dark.png"
            alt="Email verification illustration"
            width={520}
            height={360}
            className=""
            priority
          />
        </div>

        {/* Form */}
        
        <div className="w-full max-w-md bg-white border border-gray-200 px-8 py-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold mb-3 text-center text-gray-800 tracking-tight">
            Enter Verification Code
          </h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            We’ve sent a code to your email. Please enter it below to continue.
          </p>
          {children}
          <p className="text-xs text-gray-600 mt-6 text-center">
            Didn’t receive the code?{" "}
            <span
              className="underline cursor-pointer hover:text-[#7033ff] font-semibold">
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default VerifyEmailComp;
