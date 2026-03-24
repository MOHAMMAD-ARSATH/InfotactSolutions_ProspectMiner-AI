import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobLeads } from "../services/api";

function JobResult() {
  const { id } = useParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [id]);

  const fetchLeads = async () => {
    try {
      const res = await getJobLeads(id);
      setLeads(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Leads for Job #{id}</h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center text-muted">
          <h5>No leads found</h5>
        </div>
      ) : (
        <div className="row">
          {leads.map((lead, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm border-2 rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="fw-semibold mb-1">{lead.name || "N/A"}</h5>
                  {lead.rating && (
                    <span className="badge bg-warning text-dark">
                      ⭐ {lead.rating}
                    </span>
                  )}
                </div>

                <p className="text-muted mb-2">
                  {lead.category || "No Category"}
                </p>

                <hr className="my-2" />

                <p className="mb-1">
                  📍 <small>{lead.address || "No address"}</small>
                </p>

                {lead.phone && (
                  <p className="mb-1">
                    📞{" "}
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-decoration-none"
                    >
                      {lead.phone}
                    </a>
                  </p>
                )}

                {lead.email && (
                  <p className="mb-1">
                    📧{" "}
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-decoration-none"
                    >
                      {lead.email}
                    </a>
                  </p>
                )}

                {lead.website && (
                  <p className="mb-2">
                    🌐{" "}
                    <a href={lead.website} target="_blank" rel="noreferrer">
                      Visit Website
                    </a>
                  </p>
                )}

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span
                    className={`badge 
                    ${
                      lead.leadScore === "High"
                        ? "bg-danger"
                        : lead.leadScore === "Medium"
                          ? "bg-success"
                          : "bg-secondary"
                    }
                  `}
                  >
                    {lead.leadScore || "N/A"}
                  </span>

                  <small className="text-muted">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobResult;
