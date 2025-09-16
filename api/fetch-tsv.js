const TSV_URL = 'https://shibanban2.github.io/bc-event/token/gatya.tsv'; // 取得するTSVのURL

export default async function handler(req, res) {
  try {
    const response = await fetch(TSV_URL);
    if (!response.ok) throw new Error('ネットワークエラー');

    const tsvText = await response.text();
    const array2D = tsvText.trim().split('\n').map(line => line.split('\t'));

    const now = new Date();
    console.log(`[${now.toLocaleString()}] TSV取得成功`);
    console.table(array2D);

    res.status(200).json({ success: true, fetchedAt: now.toISOString(), data: array2D });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}