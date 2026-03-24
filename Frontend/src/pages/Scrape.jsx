import { useState } from "react";
import { startScrape } from "../services/api";

import ScrapeHistory from "../components/ScrapeHistory";

export default function Scrape(){

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [newJob, setNewJob] = useState(null);

  const handleScrape = async () => {

  if (!type.trim() && !location.trim()) {
    setError("Both Business Type and Location are required");
    return;
  }

  if (!type.trim()) {
    setError("Business Type is required");
    return;
  }

  if (!location.trim()) {
    setError("Location is required");
    return;
  }

  setError("");

  const res = await startScrape({
    query: `${type} in ${location}`
  });

  const job = {
    id: res.data.jobId,
    keyword: `${type} in ${location}`,
    status: "Processing",
    addedAt: Date.now()
  };

  setNewJob(job);

  setType("");
  setLocation("");
};

  return (
    <div className="container mt-4">

      <div className="card p-4">

        <h4>Scrape Leads from Google Maps</h4>

        <div className="row mt-3">

          <div className="col">
            <input
              className="form-control"
              placeholder="Business Type"
              value={type}
              onChange={(e)=>setType(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />
          </div>

        </div>

        {error && (
          <p className="text-danger mt-2">{error}</p>
        )}

        <button
          className="btn btn-primary mt-3"
          onClick={handleScrape}
        >
          Scrape Leads
        </button>

      </div>

      <ScrapeHistory newJob={newJob} />

    </div>
  );
}