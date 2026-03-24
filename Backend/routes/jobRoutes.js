import express from "express";

import { getJobStatus, getJobs, getJobLeads } from "../controllers/jobController.js";

const router = express.Router();

router.get("/job/:id", getJobStatus);
router.get("/job-leads/:id", getJobLeads);
router.get("/jobs", getJobs);


export default router;