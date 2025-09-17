// api/gatya.js
export default async function handler(req, res) {
  try {
    const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/ishigaki892/rrolls/refs/heads/main/data/gatya.json';

    const response = await fetch(GITHUB_RAW_URL);
    if (!response.ok) throw new Error('Failed to fetch JSON');

    const data = await response.json();

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
