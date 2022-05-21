import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";

function Kanban() {
  const [jobs, setJobs] = useState({});
  const [columns, setColumns] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);

  const onDragEnd = (result) => {
    console.log(result);
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
          const colJobs = column["jobs"].map((jobsId) => jobs[jobsId[1]]);
          return <Column key={column["id"]} column={column} jobs={colJobs} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
