function JobList({
  jobs,
  onDelete,
  onStatusChange,
}) {
  if (!jobs.length) {
    return (
      <div className="mt-8 text-zinc-500">
        No jobs added yet.
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="
            bg-zinc-900
            rounded-2xl
            p-5
            flex
            justify-between
            items-center
          "
        >
          <div>
            <h3 className="font-semibold">
              {job.company}
            </h3>

            <p className="text-zinc-400">
              {job.role}
            </p>
          </div>

          <div className="flex gap-3 items-center rounded-lg bg-zinc-900/30 px-3 py-2 border border-zinc-800/60">

            <select
              value={job.status}
              onChange={(e) =>
                onStatusChange(
                  job.id, e.target.value
                )
              }
              className="
                bg-zinc-800
                p-2
                rounded
              "
            >
              <option value="Applied">
                Applied
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

            <button
              onClick={() =>
                onDelete(job.id)
              }
              className="text-red-400"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}

export default JobList