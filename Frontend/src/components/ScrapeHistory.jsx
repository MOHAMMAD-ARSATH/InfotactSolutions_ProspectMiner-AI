import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getJobs } from "../services/api";

export default function ScrapeHistory({ newJob }) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const recordsPerPage = 5;

  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newJob) {
      loadJobs();
    }

    const interval = setInterval(() => {
      loadJobs();
    });

    return () => clearInterval(interval);
  }, [newJob]);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentJobs = jobs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(jobs.length / recordsPerPage);

  return (
    <div className="card p-3 mt-4">
      <h5>Scrape History</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Status</th>
              <th>Added At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.keyword}</td>

                  <td>
                    {job.status === "Completed" && (
                      <span className="badge bg-success">Completed</span>
                    )}

                    {job.status === "Processing" && (
                      <span className="badge bg-warning text-dark">
                        Processing
                      </span>
                    )}

                    {job.status === "Failed" && (
                      <span className="badge bg-danger">Failed</span>
                    )}
                  </td>

                  <td>{new Date(job.addedAt).toLocaleString()}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
