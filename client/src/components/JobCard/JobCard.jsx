// Lib
import { Draggable } from "react-beautiful-dnd";

// Helpers
import disableSorting from "./helpers/disableSorting";
import JobTitle from "./JobTitle";

// Components
import JobTooltip from "./JobTooltip";

function JobCard({ job, index }) {
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
            <JobTitle job={job} />
            <JobTooltip job={job} />
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

export default JobCard;
