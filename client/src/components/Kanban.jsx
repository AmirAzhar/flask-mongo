import { useEffect, useState } from "react";

import Column from "./Column";

function Kanban() {
  const [jobs, setJobs] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((res) => {
        setJobs(res["data"]);
        setColumns(res["columns"]);
        setColumnOrder(res["columnOrder"]);
      });
  }, []);

  return (
    <div>
      {columnOrder.map((columnId) => {
        const jobs = columns[columnId];
        return <Column key={columnId} title={columnId} jobs={jobs} />;
      })}
    </div>
  );
}

export default Kanban;
