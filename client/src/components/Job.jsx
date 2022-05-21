function Job({ job }) {
  return (
    <div>
      <h1>{job["company"]}</h1>
      <h1>{job["title"]}</h1>
      <h1>{job["link"]}</h1>
    </div>
  );
}

export default Job;
