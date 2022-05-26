// Lib
import { Draggable } from "react-beautiful-dnd";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

function Job({ job, index }) {
  const [tooltip, showTooltip] = useState(false);

  function disableSorting(style, snapshot) {
    if (!snapshot.isDragging) return {};
    if (snapshot.isDragging)
      return {
        ...style,
        boxShadow: `0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12)`,
      };
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
              className="h-6 w-6 text-gray-300 cursor-pointer"
              onClick={() => showTooltip(!tooltip)}
            />
            {tooltip && (
              <div className="z-10 absolute w-fit h-fit max-w-xs right-0 top-5 bg-gray-200 rounded-md p-2">
                <h1 className="font-bold text-sm">Remarks</h1>
                <h1>{job["remarks"]}</h1>
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
