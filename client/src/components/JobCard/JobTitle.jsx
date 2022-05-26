import React from "react";

function JobTitle({ job }) {
  return (
    <a
      className="font-bold text-md text-blue-900"
      href={job["link"]}
      target="_blank"
    >
      {job["title"]}
    </a>
  );
}

export default JobTitle;
