import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";

function Kanban() {
  const [jobs, setJobs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);

  const onDragEnd = (result) => {
    console.log(result);
  };

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((res) => {
        setJobs(res["data"]);
        setColumns(res["columns"]);
        setColumnOrder(res["columnOrder"]);
      });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-evenly m-5">
        {columnOrder.map((columnId) => {
          const jobs = columns[columnId];
          return <Column key={columnId} title={columnId} jobs={jobs} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
