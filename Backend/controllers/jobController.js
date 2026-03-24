import { scrapeQueue } from "../queues/scrapeQueue.js";
import Lead from "../models/Lead.js";

export const getJobStatus = async (req, res) => {
  try {

    const jobId = req.params.id;

    const job = await scrapeQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const state = await job.getState();

    res.json({
      id: job.id,
      state
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getJobs = async (req, res) => {

  const jobs = await scrapeQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed",
    "paused"
  ]);

  const history = jobs.map(job => {

    let status = "Processing";

    if (job.failedReason) {
      status = "Failed";
    } else if (job.finishedOn) {
      status = "Completed";
    }

    return {
      id: job.id,
      keyword: job.data.query,
      status,
      addedAt: job.timestamp
    };
  });

  history.sort((a, b) => b.addedAt - a.addedAt);

  res.json(history);
};

export const getJobLeads = async (req, res) => {

  try {

    const jobId = Number(req.params.id);

    const leads = await Lead.find({ jobId: jobId });

    if (!leads || leads.length === 0) {
      return res.status(200).json([]);
    }

    res.json(leads);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};