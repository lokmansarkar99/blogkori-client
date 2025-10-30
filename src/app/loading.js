const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-[#3650d1] animate-ping opacity-75"></div>
        <div className="relative rounded-full h-full w-full border-2 border-[#264ac2]"></div>
      </div>
    </div>
  );
};

export default Loading;
