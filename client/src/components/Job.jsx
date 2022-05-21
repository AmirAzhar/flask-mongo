import { Draggable } from "react-beautiful-dnd";

function Job({ job, index }) {
  return (
    <Draggable draggableId={job["_id"]} index={index}>
      {(provided) => (
        <div
          className="border-gray-300 border-2 p-2 mb-2 rounded-lg"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h1>{job["company"]}</h1>
          <h1>{job["title"]}</h1>
          <h1>{job["link"]}</h1>
        </div>
      )}
    </Draggable>
  );
}

export default Job;
