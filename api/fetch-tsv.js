import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const jsonPath = path.resolve('./data/gatya.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    res.status(200).json({ success: true, data: jsonData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
