import axios from "axios";

const API = axios.create({
 baseURL: "http://localhost:5000/api"
});

export const getLeads = () => API.get("/leads");
export const startScrape = (data) => API.post("/scrape", data);
export const getJobs = () => API.get("/jobs");
export const getJobStatus = (id) => API.get(`/job/${id}`);
export const getJobLeads = (id) => API.get(`/job-leads/${id}`);