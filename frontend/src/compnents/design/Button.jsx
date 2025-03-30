import React from "react";

const Button = ({ handleClick, title, value = "" }) => {
  return (
    <button
      className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 mx-auto text-lg font-semibold focus:outline-none"
      value={value}
      onClick={handleClick} // This will correctly call the passed handleClick function
    >
      {title}
    </button>
  );
};

export default Button;
