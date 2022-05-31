// Lib
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

// Code
import Column from "./Column";
import AddJobButton from "./AddJobForm/AddJobButton";
import DeleteJob from "./DeleteJob";

function Kanban() {
  const [jobs, setJobs] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination);
    // if reorder within list or dragged to unknown space, just return
    if (!destination || destination.droppableId === source.droppableId) return;

    // Delete item
    if (destination.droppableId === "DELETE") {
      console.log("DELETE ITEM");
      return;
    }

    // Updated the source col
    const sourceCol = columns[source.droppableId];
    const updatedSourceCol = Array.from(sourceCol.jobs);
    updatedSourceCol.splice(source.index, 1);

    // Update the dest col
    const destCol = columns[destination.droppableId];
    const updatedDestCol = Array.from(destCol.jobs);
    updatedDestCol.push(draggableId);

    // Update react state
    const newColumns = {
      ...columns,
      [source.droppableId]: {
        id: [source.droppableId],
        jobs: updatedSourceCol,
      },
      [destination.droppableId]: {
        id: [destination.droppableId],
        jobs: updatedDestCol,
      },
    };
    setColumns(newColumns);

    // Update on mongo database
    await axios.patch(`/api/jobs/status/${draggableId}`, {
      status: destination.droppableId,
    });
  };

  useEffect(() => {
    axios.get("/api/jobs/all").then(({ data }) => {
      setJobs(data["jobs"]);
    });
    axios.get("/api/jobs/columns").then(({ data }) => {
      setColumns(data["columns"]);
      setColumnOrder(data["columnOrder"]);
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-screen w-screen ">
        <div className="flex justify-evenly mx-5">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const colJobs = column["jobs"].map((jobsId) => jobs[jobsId]);
            return (
              <Column
                key={column["id"]}
                column={column}
                jobs={colJobs}
                setJobs={setJobs}
              />
            );
          })}
        </div>
        <DeleteJob />
        <AddJobButton setJobs={setJobs} setColumns={setColumns} />
      </div>
    </DragDropContext>
  );
}

export default Kanban;
