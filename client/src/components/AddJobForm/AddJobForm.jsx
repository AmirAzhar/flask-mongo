// Lib
import axios from "axios";

import resetFormValidation from "./helpers/resetFormValidation";
import showFormErrors from "./helpers/showFormErrors";

function AddJobForm({ showSidebar, setShowSidebar, setJobs, setColumns }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    resetFormValidation();
    if (showFormErrors(event)) return;

    const newJob = {
      company: event.target.company.value,
      title: event.target.jobTitle.value,
      link: event.target.link.value,
      remarks: event.target.remarks.value,
    };
    axios.post("/api/jobs/apply", newJob).then(({ data }) => {
      setColumns(data["columns"]);
      setJobs(data["jobs"]);
    });

    event.target.reset();
  };
  return (
    <div
      className={`transform top-0 right-0 w-80 p-6 flex flex-col bg-gray-200 fixed h-full ease-in-out duration-300 ${
        showSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col pb-2">
          <div className="py-1 text-lg">Company</div>
          <input type="text" name="company" className="rounded-md p-1" />
        </label>
        <label className="flex flex-col pb-2">
          <div className="py-1 text-lg">Job Title</div>
          <input type="text" name="jobTitle" className="rounded-md p-1" />
        </label>
        <label className="flex flex-col pb-2">
          <div className="py-1 text-lg">Link</div>
          <input type="text" name="link" className="rounded-md p-1" />
        </label>
        <label className="flex flex-col pb-10">
          <div className="text-lg">Remarks</div>
          <textarea
            type="text"
            name="remarks"
            className="rounded-md p-1 max-h-52"
          />
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            className="text-center w-full p-2 text-white bg-blue-900 rounded-md opacity-100 hover:opacity-80 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            className="text-center w-full p-2 text-white bg-red-500 rounded-md opacity-100 hover:opacity-80 transition duration-300"
            onClick={() => {
              setShowSidebar(!showSidebar);
              resetFormValidation();
            }}
          >
            Cancel
          </button>
        </div>
        <h1
          id="invalidCompany"
          className="hidden text-xs italic text-center text-red-600 p-1"
        >
          Invalid Company (must be at least 1 character)
        </h1>
        <h1
          id="invalidJob"
          className="hidden text-xs italic text-center text-red-600 p-1"
        >
          Invalid Job Title (must be at least 1 character)
        </h1>
        <h1
          id="invalidLink"
          className="hidden text-xs italic text-center text-red-600 p-1"
        >
          Invalid Link (must begin with http[s]:// or www)
        </h1>
        <h1
          id="invalidRemarks"
          className="hidden text-xs italic text-center text-red-600 p-1"
        >
          Remarks cannot be longer than 100 characters
        </h1>
      </form>
    </div>
  );
}

export default AddJobForm;
