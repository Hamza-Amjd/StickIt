import React from "react";

const GradientButton = ({name,handlePress}) => {
  return (
    <div class="max-w-7xl mx-auto my-2" >
      <div class="relative group cursor-pointer" onClick={handlePress}>
        <div class="absolute -inset-1  bg-teal-700 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative px-20 py-3 bg-teal-700 rounded-full leading-none flex items-top justify-start space-x-6">
          <div class="space-y-2">
            <p class=" font-semibold text-white">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientButton;
