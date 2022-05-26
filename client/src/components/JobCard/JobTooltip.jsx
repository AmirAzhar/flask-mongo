import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

function JobTooltip({ remarks }) {
  const [tooltip, showTooltip] = useState(false);
  return (
    <div>
      <InformationCircleIcon
        className="h-6 w-6 text-gray-300 cursor-pointer"
        onClick={() => showTooltip(!tooltip)}
      />
      {tooltip && (
        <div className="z-10 absolute w-fit h-fit max-w-xs right-0 top-5 bg-gray-200 rounded-md p-2">
          <h1 className="font-bold text-sm">Remarks</h1>
          <h1>{remarks}</h1>
        </div>
      )}
    </div>
  );
}

export default JobTooltip;
