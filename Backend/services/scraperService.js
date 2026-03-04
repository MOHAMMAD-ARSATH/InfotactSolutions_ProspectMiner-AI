import { launchBrowser } from "./stealthBrowser.js";

export const scrapeGoogleMaps = async (query) => {
  const { browser, page } = await launchBrowser();

  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  await page.goto(searchUrl, { waitUntil: "networkidle2" });

  await page.waitForSelector('div[role="article"]');

  const leads = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('div[role="article"]');

    items.forEach(item => {
      const name = item.querySelector("h3")?.innerText || "";
      const address = item.querySelector(".W4Efsd:nth-child(2)")?.innerText || "";

      results.push({
        name,
        address
      });
    });

    return results;
  });

  await browser.close();
  return leads;
};