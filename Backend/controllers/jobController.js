import { scrapeQueue } from "../queues/scrapeQueue.js";

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