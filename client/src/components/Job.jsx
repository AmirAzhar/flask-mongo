// Lib
import { Draggable } from "react-beautiful-dnd";

function Job({ job, index }) {
  function disableSorting(style, snapshot) {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }

    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  }

  return (
    <Draggable draggableId={job["_id"]} index={index}>
      {(provided, snapshot) => (
        <div
          className={`border-gray-300 border-2 p-2 mb-2 rounded-lg ${
            snapshot.isDragging ? "bg-green-100" : "bg-white"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          style={disableSorting(provided.draggableProps.style, snapshot)}
        >
          <a
            className="font-bold text-md text-blue-900"
            href={job["link"]}
            target="_blank"
          >
            {job["title"]}
          </a>
          <h1>{job["company"]}</h1>
          <h1 className="text-right text-xs italic">
            Updated {job["dateUpdated"]}
          </h1>
        </div>
      )}
    </Draggable>
  );
}

export default Job;
