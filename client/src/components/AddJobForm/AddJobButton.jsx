// Lib
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

// Code
import AddJobForm from "./AddJobForm";

function AddJobButton({ setJobs, setColumns }) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      <div className="absolute bottom-0 right-0 p-4">
        <PlusCircleIcon
          className="h-14 w-14 text-blue-900 cursor-pointer transform hover:scale-125 duration-300"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <AddJobForm
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        setJobs={setJobs}
        setColumns={setColumns}
      />
    </div>
  );
}

export default AddJobButton;
