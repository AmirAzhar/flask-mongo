import React from "react";

function Form({ showSidebar, setShowSidebar }) {
  return (
    <div
      className={`transform top-0 right-0 w-60 bg-gray-200 fixed h-full ease-in-out duration-300 ${
        showSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={() => setShowSidebar(!showSidebar)}>Test</button>
    </div>
  );
}

export default Form;
