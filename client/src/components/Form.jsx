import axios from "axios";

function Form({ showSidebar, setShowSidebar }) {
  const handleSubmit = (event) => {
    const newJob = {
      company: event.target.company.value,
      title: event.target.jobTitle.value,
      link: event.target.link.value,
    };
    axios.post("/api/jobs/apply", newJob);

    event.target.reset();
  };
  return (
    <div
      className={`transform top-0 right-0 w-80 p-6 flex flex-col bg-gray-200 fixed h-full ease-in-out duration-300 ${
        showSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="text-right text-3xl opacity-50 hover:opacity-100 transition duration-300"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        x
      </button>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col pb-2">
          <div className="py-1 text-lg">Company</div>
          <input type="text" name="company" className="rounded-md p-1" />
        </label>
        <label className="flex flex-col pb-2">
          <div className="py-1 text-lg">Job Title</div>
          <input type="text" name="jobTitle" className="rounded-md p-1" />
        </label>
        <label className="flex flex-col pb-10">
          <div className="py-1 text-lg">Link</div>
          <input type="text" name="link" className="rounded-md p-1" />
        </label>
        <button className="text-center w-full p-2 text-white bg-blue-900 rounded-md opacity-100 hover:opacity-80 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
