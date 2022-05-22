// Lib
import { useState } from "react";

// Code
import Form from "./Form";

function Button() {
  const [addJob, setAddJob] = useState(false);
  return (
    <div>
      <div className="absolute bottom-0 right-0">
        <button
          onClick={() => setAddJob(true)}
          className="flex justify-center items-center bg-blue-900 rounded-full h-10 w-10 m-4 hover:scale-125 transform ease-in-out duration-300"
        >
          <span className="font-bold text-xl text-white">+</span>
        </button>
      </div>
      {addJob && <Form setAddJob={setAddJob} />}
    </div>
  );
}

export default Button;
