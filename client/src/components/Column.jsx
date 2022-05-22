// Lib
import { Droppable } from "react-beautiful-dnd";

// Code
import Job from "./Job";

function Column({ column, jobs }) {
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
    </div>
  );
}

export default Column;
