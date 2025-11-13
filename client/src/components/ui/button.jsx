import React from "react";

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
  >
    {children}
  </button>
);

export default Button;
