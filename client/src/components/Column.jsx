// Lib
import { Droppable } from "react-beautiful-dnd";

// Code
import JobCard from "./JobCard/JobCard";

function Column({ column, jobs, setJobs }) {
  const columnMap = {
    APPLIED: "✅ Applied ✅",
    INTERVIEW: "📹 Interview 📹",
    OFFER: "🎉 Offer🎉",
    REJECTED: "🥺 Rejected 🥺",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-3xl font-bold p-4 ">
        {columnMap[column["id"]]}
      </div>
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
              <JobCard
                key={job["_id"]}
                job={job}
                index={index}
                setJobs={setJobs}
                jobs={jobs}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
