const STATUS_TEXT = {
  queued: "Antri…",
  processing: "Mengonversi…",
  done: "✓ Selesai — file terunduh",
  error: "Gagal",
};

export default function JobQueue({ jobs }) {
  if (!jobs.length) return null;

  return (
    <div className="queue">
      {jobs.map((job) => (
        <div className="job-card" key={job.jobId}>
          <div className="job-thumb">📄</div>
          <div className="job-body">
            <p className="job-title">{job.filename}</p>
            <p className="job-meta">
              <span className={job.status === "error" ? "job-err" : ""}>
                {job.status === "error" && job.error ? job.error : STATUS_TEXT[job.status]}
              </span>
            </p>
            {job.status !== "error" && (
              <div className="bar">
                <div
                  className={`bar-fill${job.status !== "done" ? " indeterminate" : ""}`}
                  style={job.status === "done" ? { width: "100%" } : undefined}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
