// Lib
import { Draggable } from "react-beautiful-dnd";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

function Job({ job, index }) {
  const [tooltip, showTooltip] = useState(false);
  console.log(tooltip);

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
          <div className="flex justify-between relative">
            <a
              className="font-bold text-md text-blue-900"
              href={job["link"]}
              target="_blank"
            >
              {job["title"]}
            </a>
            <InformationCircleIcon
              className="h-4 w-4 text-gray-300 cursor-pointer"
              onClick={() => showTooltip(!tooltip)}
            />
            {tooltip && (
              <div className="z-10 absolute w-80 h-20 right-0 top-5 bg-gray-200 rounded-md p-2">
                <h1>Description</h1>
              </div>
            )}
          </div>
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
