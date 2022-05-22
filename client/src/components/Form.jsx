import axios from "axios";

function Form({ showSidebar, setShowSidebar }) {
  const handleSubmit = (event) => {
    event.preventDefault();
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
        <label className="flex flex-col">
          Company
          <input type="text" name="company" />
        </label>
        <label className="flex flex-col">
          Job Title
          <input type="text" name="jobTitle" />
        </label>
        <label className="flex flex-col">
          Link
          <input type="text" name="link" />
        </label>
        <button className="text-center w-full">Submit</button>
      </form>
    </div>
  );
}

export default Form;
