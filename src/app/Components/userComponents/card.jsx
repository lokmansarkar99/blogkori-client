import React from "react";

const Card = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
      {/* Left side */}
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>

      {/* Right side (icon) */}
      <div
        className={`p-4 rounded-full ${color} text-white flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Card;
