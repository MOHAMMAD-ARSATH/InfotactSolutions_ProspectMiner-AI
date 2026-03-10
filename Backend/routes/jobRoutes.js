import express from "express";

import { getJobStatus } from "../controllers/jobController.js";

const router = express.Router();

router.get("/job/:id", getJobStatus);

export default router;