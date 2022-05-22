// Lib
import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";

// Code
import Job from "./Job";

function Column({ column, jobs }) {
  const [addJob, setAddJob] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-xl font-bold p-2 ">{column["id"]}</div>
      <Droppable droppableId={column["id"]}>
        {(provided, snapshot) => (
          <div
            className={`border-gray-300 border-2 w-80 p-2 rounded-lg transition ease-in-out ${
              snapshot.isDraggingOver ? "bg-gray-200" : "bg-white"
            }`}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {jobs.map((job, index) => (
              <Job key={job["_id"]} job={job} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {column["id"] === "APPLIED" && (
        <button
          onClick={() => setAddJob(!addJob)}
          className="flex justify-center items-center bg-blue-900 rounded-full h-10 w-10 m-4 hover:scale-125 transform ease-in-out duration-300"
        >
          <span className="font-bold text-xl text-white">+</span>
        </button>
      )}
      {addJob && <div>test</div>}
    </div>
  );
}

export default Column;
