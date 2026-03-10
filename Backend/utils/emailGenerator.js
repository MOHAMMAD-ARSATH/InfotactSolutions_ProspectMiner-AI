export const generateEmail = (website) => {

  if (!website) return "";

  try {

    const domain = new URL(website).hostname.replace("www.", "");

    return `info@${domain}`;

  } catch {

    return "";
  }
};