import React from "react";

function Form({ setAddJob }) {
  return (
    <div class="absolute inset-y-0 right-0 w-80 h-screen bg-gray-300 shadow-md">
      <button onClick={() => setAddJob(false)}>Test</button>
    </div>
  );
}

export default Form;
