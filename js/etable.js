const copybutton = document.getElementById("copybutton");
const seedinput = document.getElementById("seed_select");
const updatetable = document.getElementById("ok_button");
const gatya_table = document.getElementById("gatya_table");
const url = new URL(window.location.href);
const start = performance.now();
const gatyaData = {
	"41": {
		"lr": 10000,
		"ur": 9200,
		"sr": 7200,
		"nr": 3400,
		"pk": 0,
		"gt": [
			["5千XP","2千XP"],
			["スピダ", "ニャンピュ", "1万XP", "2.5万XP"],
			["ネコボン", "おかめ", "スニャ"],
			["にゃんこバーガー", "ネコまねき", "100万ドルのネコ", "ネココンサルタント"]
		],
		"name": "ねこのなつやすみ　パラダイス"
	},
	"42": {
		"lr": 10000,
		"ur": 9000,
		"sr": 6000,
		"nr": 1000,
		"pk": 500,
		"gt": [
			["5千XP"],
			["スピダ", "ニャンピュ", "1万XP", "3万XP"],
			["ネコボン", "おかめ", "スニャ", "10万XP"],
			["記念ネコ","ねこ農家","石の上にも10年ネコ"]
		],
		"name": "ダウンロード記念　スペシャルイベントガチャ"
	}	
}

class Xorshift32 {
  constructor(seed) { this.seed = seed >>> 0; }
  random() {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >>> 17;
    this.seed ^= this.seed << 15;
    return this.seed >>> 0;
  }
}

addButton.addEventListener("click", function() {
  const inputNumber = seedSelect.value;
  url.searchParams.set("seed", inputNumber);
  url.searchParams.set("type", gttype);
  location.href = url;
});

document.addEventListener("DOMContentLoaded", async () => {
	await loadTSV();
	gtdataget();
})