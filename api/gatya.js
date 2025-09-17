export default async function handler(req, res) {
  try {
    const GITHUB_API_URL =
      "https://api.github.com/repos/ishigaki892/rrolls/contents/data/gatya.json?ref=main";

    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3.raw"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json(); // raw JSON がそのまま返る
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
