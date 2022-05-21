import { Droppable } from "react-beautiful-dnd";
import Job from "./Job";

function Column({ title, jobs }) {
  return (
    <div>
      <div className="text-center text-lg font-bold p-2 ">{title}</div>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            className={`border-gray-300 border-2 w-80 p-2 rounded-lg transition ease-in-out ${
              snapshot.isDraggingOver ? "bg-gray-200" : "bg-white"
            }`}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {jobs.map((job, index) => (
              <Job key={job["_id"]} job={job} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
