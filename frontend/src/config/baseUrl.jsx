const PRODUCTION_URL = "https://navi-8uk4.onrender.com"; // Replace with your actual production URL
const DEVELOPMENT_URL = "http://localhost:3000";

const baseUrl =
  process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;

export const getApiUrl = async () => {
  try {
    // Try the primary URL first
    const response = await fetch(`${baseUrl}/api/health`);
    if (response.ok) {
      return baseUrl;
    }
  } catch (error) {
    console.log("Primary URL failed, trying fallback...");
  }

  try {
    // Try the fallback URL
    const fallbackUrl =
      baseUrl === PRODUCTION_URL ? DEVELOPMENT_URL : PRODUCTION_URL;
    const response = await fetch(`${fallbackUrl}/api/health`);
    if (response.ok) {
      return fallbackUrl;
    }
  } catch (error) {
    console.log("Fallback URL also failed");
  }

  // If both fail, return the default baseUrl
  return baseUrl;
};

export default baseUrl;
