import fetch from "node-fetch";

let cachedData = [];
let lastUpdated = null;
const TSV_URL = "https://shibanban2.github.io/bc-event/token/gatya.tsv";

async function fetchTSV() {
  try {
    const response = await fetch(TSV_URL + "?cache=" + Date.now());
    if (!response.ok) throw new Error("TSV取得失敗: " + response.status);
    const text = await response.text();
    cachedData = text.trim().split("\n").map(line => line.split("\t"));
    lastUpdated = new Date().toISOString();
    console.log("TSV取得:", lastUpdated);
  } catch (err) {
    console.error("TSV取得エラー:", err.message);
  }
}

export default async function handler(req, res) {
  const now = Date.now();
  if (!lastUpdated || now - new Date(lastUpdated).getTime() > 5 * 60 * 1000) {
    await fetchTSV();
  }
  res.status(200).json(cachedData);
}
