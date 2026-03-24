import { useState } from "react";

export default function LeadTable({ leads }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentLeads = leads.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(leads.length / recordsPerPage);

  return (
    <div className="card p-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Lead Score</th>
          </tr>
        </thead>

        <tbody>
          {currentLeads.length > 0 ? (
            currentLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.category}</td>
                <td>{lead.address}</td>
                <td>{lead.rating}</td>
                <td>{lead.phone}</td>
                <td>{lead.email}</td>
                <td>
                  <span
                    className={`badge 
                    ${
                      lead.leadScore === "High"
                        ? "bg-danger"
                        : lead.leadScore === "Medium"
                          ? "bg-success"
                          : "bg-warning"
                    }
                  `}
                  >
                    {lead.leadScore}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}