import { Worker } from "bullmq";

import redisConnection from "../../config/redis.js";

import { scrapeGoogleMaps } from "../../services/scraperService.js";

import Lead from "../../models/Lead.js";

import { generateEmail } from "../../utils/emailGenerator.js";

import { calculateLeadScore } from "../../utils/leadScore.js";

const worker = new Worker(

  "scrapeQueue",

  async job => {

    const { query } = job.data;

    console.log("Processing Job:", query);

    const leads = await scrapeGoogleMaps(query);

    const enriched = leads.map(lead => {

      const email = generateEmail(lead.website);

      const leadScore = calculateLeadScore(lead);

      return {

        ...lead,

        email,

        leadScore
      };
    });

    await Lead.insertMany(enriched);

    return enriched.length;
  },

  { connection: redisConnection }

);

worker.on("completed", job => {
  console.log(`Job ${job.id} Completed`);
});

worker.on("failed", (job, err) => {
  console.log("Job Failed", err);
});