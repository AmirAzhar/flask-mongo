import { useEffect, useState } from "react";

import {reorderApplications, moveApplication} from '../helpers/kanbanModifiers'

function Kanban() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/applications")
      .then((response) => response.json())
      .then((data) => setApplications(data));
  }, []);

  return <div></div>;
}

export default Kanban;
