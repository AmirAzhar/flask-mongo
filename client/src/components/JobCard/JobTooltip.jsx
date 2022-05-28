import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

function JobTooltip({ job }) {
  const [tooltip, showTooltip] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disableEdit, setDisableEdit] = useState(true);

  const setEditHandler = () => {
    if (edit) {
      const remarks = document.getElementById("remarksEdit").value;
      console.log(job["id"]);
      axios.patch(`/api/jobs/remarks/${job["_id"]}`, {
        remarks: remarks,
      });
    }

    setEdit(!edit);
    document.getElementById("remarksEdit").disabled = !disableEdit;
    setDisableEdit(!disableEdit);
  };

  return (
    <div>
      <InformationCircleIcon
        className="h-6 w-6 text-gray-300 cursor-pointer"
        onClick={() => showTooltip(!tooltip)}
      />
      {tooltip && (
        <div className="z-10 absolute w-fit h-fit max-w-xs right-0 top-5 bg-gray-200 rounded-md p-2">
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
          >
            {job["remarks"]}
          </textarea>
        </div>
      )}
    </div>
  );
}

export default JobTooltip;
