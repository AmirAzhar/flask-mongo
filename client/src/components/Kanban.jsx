import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";

function Kanban() {
  const [jobs, setJobs] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // if reorder within list or dragged to unknown space, just return
    if (!destination || destination.droppableId === source.droppableId) return;

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
  };

  useEffect(() => {
    fetch("/api/jobs/all")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data["jobs"]);
      });
    fetch("/api/jobs/columns")
      .then((res) => res.json())
      .then((data) => {
        setColumns(data["columns"]);
        setColumnOrder(data["columnOrder"]);
      });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-evenly m-5">
        {columnOrder.map((columnId) => {
          console.log(jobs);
          const column = columns[columnId];
          const colJobs = column["jobs"].map((jobsId) => jobs[jobsId]);
          return <Column key={column["id"]} column={column} jobs={colJobs} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
