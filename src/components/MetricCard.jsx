import React from "react";

export const MetricCard = ({ title, value, unit, isGood }) => {
  return (
    <div className="
      bg-white 
      p-4 
      rounded-xl 
      shadow-md 
      border 
      border-gray-200
      hover:shadow-lg 
      transition-shadow 
      duration-200
    ">
      <h4 className="text-gray-600 text-sm font-medium mb-1">
        {title}
      </h4>

      <h2 
        className={`text-xl font-bold ${
          isGood ? "text-green-600" : "text-red-600"
        }`}
      >
        {value} {unit}
      </h2>
    </div>
  );
};


