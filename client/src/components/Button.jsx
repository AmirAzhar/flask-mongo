// Lib
import { useState } from "react";

// Code
import Form from "./Form";

function Button() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      <div className="absolute bottom-0 right-0">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex justify-center items-center bg-blue-900 rounded-full h-14 w-14 m-4 hover:scale-125 transform ease-in-out duration-300"
        >
          <span className="font-bold text-2xl text-white">+</span>
        </button>
      </div>
      <Form setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </div>
  );
}

export default Button;
