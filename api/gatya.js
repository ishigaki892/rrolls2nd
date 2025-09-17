let cachedData = [];
let lastUpdated = null;
const TSV_URL = "https://shibanban2.github.io/bc-event/token/gatya.tsv";

function getJSTString(date) {
  return new Date(date).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

async function fetchTSV() {
  try {
    const response = await fetch(TSV_URL + "?cache=" + Date.now());
    if (!response.ok) throw new Error("ガチャのデータが取得できなかったのだ" + response.status);
    const text = await response.text();
    cachedData = text.trim().split("\n").map(line => line.split("\t"));
    lastUpdated = new Date();
    console.log("ガチャのデータが取得できたのだ", getJSTString(lastUpdated));
  } catch (err) {
    console.error("ガチャのデータが取得できなかったのだ", err.message);
  }
}

export default async function handler(req, res) {
  const now = Date.now();

  if (!lastUpdated || now - lastUpdated.getTime() > 5 * 60 * 1000) {
    await fetchTSV();
  }
  console.log("ガチャのデータの取得時刻なのだ", lastUpdated ? getJSTString(lastUpdated) : "未取得");

  res.status(200).json(cachedData);
}
