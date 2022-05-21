import Job from "./Job";

function Column({ title, jobs }) {
  return (
    <div className="bg-blue-500">
      <div>{title}</div>
      {jobs.map((job) => (
        <Job key={job["_id"]} job={job} />
      ))}
    </div>
  );
}

export default Column;
