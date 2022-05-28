// Lib
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

function JobTooltip({ job, setJobs, jobs }) {
  const [tooltip, showTooltip] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disableEdit, setDisableEdit] = useState(true);

  const updateRemarks = async () => {
    const remarks = document.getElementById("remarksEdit").value;
    if (remarks === job["remarks"]) return;
    await axios.patch(`/api/jobs/remarks/${job["_id"]}`, {
      remarks: remarks,
    });

    // const updatedJob = { ...job, remarks: remarks };
    // const filteredJobs = jobs.filter((job) => job["_id"] !== updatedJob["_id"]);
    // setJobs(...filteredJobs, updatedJob);
  };

  const setEditHandler = () => {
    if (edit) updateRemarks();

    document.getElementById("remarksEdit").disabled = !disableEdit;
    document.getElementById("remarksEdit").style.resize = edit
      ? "none"
      : "vertical";
    setDisableEdit(!disableEdit);
    setEdit(!edit);
  };

  return (
    <div>
      <InformationCircleIcon
        className="h-6 w-6 text-gray-300 cursor-pointer"
        onClick={() => showTooltip(!tooltip)}
      />
      {tooltip && (
        <div className="z-10 absolute w-fit h-fit max-w-xs right-0 top-5 bg-gray-200 rounded-md p-2 my-2">
          <div className="flex justify-between p-1">
            <h1 className="font-bold text-sm">Remarks</h1>
            <h1
              className="underline text-sm text-gray-500"
              onClick={() => setEditHandler()}
            >
              {edit ? "Submit" : "Edit"}
            </h1>
          </div>
          <textarea
            disabled
            id="remarksEdit"
            className="focus:border-none text-sm focus:outline-none rounded-sm p-1 max-h-20 h-16"
            style={{ resize: "none" }}
          >
            {job["remarks"]}
          </textarea>
        </div>
      )}
    </div>
  );
}

export default JobTooltip;
