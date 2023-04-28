import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 bg-black z-[99999999] flex items-center justify-center opacity-70">
      <div className="w-10 h-10 border-2 border-dashed border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
