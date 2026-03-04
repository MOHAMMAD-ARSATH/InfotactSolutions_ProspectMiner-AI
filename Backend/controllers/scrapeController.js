import { scrapeGoogleMaps } from "../services/scraperService.js";
import Lead from "../models/Lead.js";

export const scrapeLeads = async (req, res) => {
  try {
    const { query } = req.body;

    const results = await scrapeGoogleMaps(query);

    const savedLeads = await Lead.insertMany(results);

    res.json({
      success: true,
      count: savedLeads.length,
      data: savedLeads
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};