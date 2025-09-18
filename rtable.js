const changemain = document.getElementById("changemain");
const addsub = document.getElementById("addsub");
const delsub = document.getElementById("delsub");
const seedupdate = document.getElementById("buttonUpdate");
const copyButton = document.getElementById('copybutton');
const seedSelect = document.getElementById('seed_select');
const guranteed = document.getElementById("guranteed");
const gacha = document.getElementById("series");
const nextds = document.getElementById("densetu_next");
const addfindnext = document.getElementById("findnextadd");
const findtext = document.getElementById("findtext");
const findnextselect = document.getElementById("findlist");
const findel = document.getElementById("findnextalldel");
const findarea = document.getElementById("findnext");
const addfutureuber = document.getElementById("addfutureuber");
const allsublist  = document.getElementById("allsubactivelist");
const addsubfilter = document.getElementById("addsubfilter");
const allsub = document.getElementById("allsub");
const planarea = document.getElementById("plan_area");
const url = new URL(window.location.href);
const dataget = {
  1: { id: 10, extra: 13, normal: 14, normalFlag: 15, rare: 16, rareFlag: 17, super: 18, superFlag: 19, ultra: 20, ultraFlag: 21, legend: 22, legendFlag: 23, title: 24, pickup: 28 },
  2: { id: 25, extra: 28, normal: 29, normalFlag: 30, rare: 31, rareFlag: 32, super: 33, superFlag: 34, ultra: 35, ultraFlag: 36, legend: 37, legendFlag: 38, title: 39, pickup: 43 },
  3: { id: 40, extra: 43, normal: 44, normalFlag: 45, rare: 46, rareFlag: 47, super: 48, superFlag: 49, ultra: 50, ultraFlag: 51, legend: 52, legendFlag: 53, title: 54, pickup: 58 },
  4: { id: 55, extra: 58, normal: 59, normalFlag: 60, rare: 61, rareFlag: 62, super: 63, superFlag: 64, ultra: 65, ultraFlag: 66, legend: 67, legendFlag: 68, title: 69, pickup: 73 },
  5: { id: 70, extra: 73, normal: 74, normalFlag: 75, rare: 76, rareFlag: 77, super: 78, superFlag: 79, ultra: 80, ultraFlag: 81, legend: 82, legendFlag: 83, title: 84, pickup: 88 },
  6: { id: 85, extra: 88, normal: 89, normalFlag: 90, rare: 91, rareFlag: 92, super: 93, superFlag: 94, ultra: 95, ultraFlag: 96, legend: 97, legendFlag: 98, title: 99, pickup: 103 },
  7: { id: 100, extra: 103, normal: 104, normalFlag: 105, rare: 106, rareFlag: 107, super: 108, superFlag: 109, ultra: 110, ultraFlag: 111, legend: 112, legendFlag: 113, title: 114, pickup: 118 }
};
let gtdata;
let dataif = [];
let plan_all = [];
let startday = [], endday = [], id = [], extra = [], normalR = [], normalFlag = [], rareR = [], rareFlag = [], superR = [], superFlag = [], ultraR = [], ultraFlag = [], legendR = [], legendFlag = [], title = [], pickup = [];
const start = performance.now();  

async function loadTSV() {
  const response = await fetch("https://rrolls.vercel.app/api/gatya");
  gtdata = await response.json();
}
const bango = 16;
function datasetinfo() {
  gtdata.splice(0, bango + 1);
  gtdata.pop();
  dataif = gtdata.map(row => {
    let datacase;
    switch (row.length) {
      case 27:
      case 29:
        datacase = 1;
        break;
      case 44:
        datacase = 2;
        break;
      case 55:
        datacase = 3;
        break;
      case 61:
        datacase = 3;
        break;
      case 70:
        datacase = 5;
        break;
      case 95:
        datacase = 5;
        break;
      case 112:
        datacase = 6;
        break;
      default:
        datacase = null;
    }
    return datacase ? dataget[datacase] : null;
  });
}

function getdays(yyyymmdd) {
  const str = String(yyyymmdd);
  const month = str.slice(4, 6);
  const day   = str.slice(6, 8);

  return `${month}-${day}`;
}
function gtdataget() {
console.log(gtdata)
  datasetinfo();
  gtdata.forEach((row, rowIndex) => {
    const info = dataif[rowIndex];
    const currentId = row[info.id] ?? "";
    if (currentId !== "" && Number(currentId) <= 100) return;

    startday.push(getdays(row[0]));
    endday.push(getdays(row[2]));

    if (info) {
      id.push(row[info.id] ?? "");
      extra.push(row[info.extra] ?? "");
      normalR.push(row[info.normal] ?? "");
      normalFlag.push(row[info.normalFlag] ?? "");
      rareR.push(row[info.rare] ?? "");
      rareFlag.push(row[info.rareFlag] ?? "");
      superR.push(row[info.super] ?? "");
      superFlag.push(row[info.superFlag] ?? "");
      ultraR.push(row[info.ultra] ?? "");
      ultraFlag.push(row[info.ultraFlag] ?? "");
      legendR.push(row[info.legend] ?? "");
      legendFlag.push(row[info.legendFlag] ?? "");
      title.push(row[info.title] ?? "");
      pickup.push(row[info.pickup] ?? "");
    } else {
      console.log(rowIndex);
      id.push("");
      extra.push("");
      normalR.push("");
      normalFlag.push("");
      rareR.push("");
      rareFlag.push("");
      superR.push("");
      superFlag.push("");
      ultraR.push("");
      ultraFlag.push("");
      legendR.push("");
      legendFlag.push("");
      title.push("");
      pickup.push("");
    }
  });

      console.log(startday,endday,id,extra,normalR,normalFlag,rareR,rareFlag,superR,superFlag,ultraR,ultraFlag,legendR,legendFlag,title,pickup);
}


import * as gt from './chara_list-r.js';

class Xorshift32 {
  constructor(seed) { this.seed = seed >>> 0; }
  random() {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >>> 17;
    this.seed ^= this.seed << 15;
    return this.seed >>> 0;
  }
}

let lr, ur, sr, gt_chara, gtname;

const gatyaData = {
  "265": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt265",  
    "name": "実況パワフルプロ野球"
  },
  "297": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt297",
    "name": "ぐでたま"
  },
  "452": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt452",
    "name": "エアバスターズ"
  },
  "482": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt482",
    "name": "ケリ姫スイーツ"
  },
  "505": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt505",
    "name": "消滅都市"
  },
  "523": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt523",
    "name": "波動バスターズ"
  },
  "696": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt696",
    "name": "レッドバスターズ"
  },
  "748": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt748",
    "name": "らんま1/2"
  },
  "763": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt763",
    "name": "ストリートファイターV BLUE TEAM"
  },
  "764": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt764",
    "name": "ストリートファイターV RED TEAM"
  },
  "772": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt523",
    "name": "超生命体バスターズ"
  },
  "785": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt785",
    "name": "バレンタインギャルズ"
  },
  "788": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt788",
    "name": "劇場版 Fate stay night"
  },
  "848": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt848",
    "name": "くにお熱血大運動会〠赤組"
  },
  "850": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt850",
    "name": "初音ミク"
  },
  "861": {
    "lr": 9940,
    "ur": 9440,
    "sr": 6940,
    "gt": "gt861",
    "name": "女王祭"
  },
  "864": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt864",
    "name": "メタルスラッグアタック"
  },
  "875": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt875",
    "name": "イースターカーニバル"
  },
  "887": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt887",
    "name": "ジューンブライド"
  },
  "888": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt888",
    "name": "るろうに剣心"
  },
  "906": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt906",
    "name": "メタルバスターズ"
  },
  "913": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt913",
    "name": "ビックリマン"
  },
  "915": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt915",
    "name": "メタルバスターズ"
  },
  "922": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt922",
    "name": "ハロウィン"
  },
  "924": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt924",
    "name": "りき熱血大運動会 白組"
  },
  "925": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt925",
    "name": "メルクストーリア"
  },
  "936": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt936",
    "name": "ウルトラ4セレクション"
  },
  "937": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt937",
    "name": "ミラクル4セレクション"
  },
  "938": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt938",
    "name": "エクセレント4セレクション"
  },
  "939": {
    "lr": 10000,
    "ur": 9300,
    "sr": 6800,
    "gt": "gt939",
    "name": "バスターズ祭"
  },
  "940": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt940",
    "name": "クリスマスギャルズ"
  },
  "942": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt942",
    "name": "ダイナマイツ"
  },
  "943": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt943",
    "name": "バサラーズ"
  },
  "944": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt944",
    "name": "ギャラクシーギャルズ"
  },
  "945": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt945",
    "name": "ドラゴンエンペラーズ"
  },
  "946": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt946",
    "name": "ウルトラソウルズ"
  },
  "947": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt947",
    "name": "ダークヒーローズ"
  },
  "950": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt950",
    "name": "ギャルズモンスターズ"
  },
  "957": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt957",
    "name": "新年"
  },
  "958": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt958",
    "name": "魔法少女まどか☆マギカ"
  },
  "968": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt968",
    "name": "ホワイトデー"
  },
  "972": {
    "lr": 9970,
    "ur": 8970,
    "sr": 6470,
    "gt": "gt972",
    "name": "超極ネコ祭"
  },
  "974": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt974",
    "name": "アウトレット"
  },
  "975": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt975",
    "name": "超選抜祭"
  },
  "976": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt976",
    "name": "極選抜祭"
  },
  "977": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt977",
    "name": "範馬刃牙"
  },
  "980": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt980",
    "name": "アイアンウォーズ"
  },
  "986": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt986",
    "name": "ネコルガ族"
  },
  "991": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt991",
    "name": "ギガンドゼウス"
  },
  "992": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt992",
    "name": "ギガンドゼウス"
  },
  "993": {
    "lr": 9970,
    "ur": 9070,
    "sr": 6970,
    "gt": "gt993",
    "name": "超ネコ祭"
  },
  "995": {
    "lr": 10000,
    "ur": 0,
    "sr": 0,
    "gt": "gt995",
    "name": "プラチナガチャ"
  },
  "996": {
    "lr": 9500,
    "ur": 0,
    "sr": 0,
    "gt": "gt996",
    "name": "レジェンドガチャ"
  },
  "998": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt998",
    "name": "エヴァンゲリオン"
  },
  "999": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt999",
    "name": "エヴァンゲリオン2nd"
  },
  "1001": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt1001",
    "name": "サマーガールズブルーオーシャン"
  },
  "1002": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt1002",
    "name": "生きろ！マンボウ！"
  },
  "1003": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt1003",
    "name": "ソニック"
  },
  "1005": {
    "lr": 9970,
    "ur": 9470,
    "sr": 6970,
    "gt": "gt1005",
    "name": "エレメンタルピクシーズ"
  },
  "1006": {
    "lr": 9970,
    "ur": 9070,
    "sr": 6470,
    "gt": "gt1006",
    "name": "超ネコ祭"
  },
  "1007": {
    "lr": 9970,
    "ur": 9070,
    "sr": 6470,
    "gt": "gt1007",
    "name": "極ネコ祭"
  },
  "1008": {
    "lr": 10000,
    "ur": 0,
    "sr": 0,
    "gt": "gt1008",
    "name": "プラチナガチャ"
  },
  "1009": {
    "lr": 9500,
    "ur": 0,
    "sr": 0,
    "gt": "gt1009",
    "name": "レジェンドガチャ"
  },
  "1010": {
    "lr": 10000,
    "ur": 9500,
    "sr": 7000,
    "gt": "gt1010",
    "name": "サマーガールズサンシャイン"
  },
  "1011": {
    "lr": 9930,
    "ur": 9430,
    "sr": 6930,
    "gt": "gt1011",
    "name": "億DL記念選抜"
  },
  "1012": {
    "lr": 9970,
    "ur": 9270,
    "sr": 6770,
    "gt": "gt972",
    "name": "超国王祭"
  }
};

function getGatyaInfo(gatya) {
    if (gatyaData[gatya]) {
      const data = gatyaData[gatya];
      return {
        lr: data.lr,
        ur: data.ur,
        sr: data.sr,
        gt_chara: gt[data.gt],
        gtname: data.name
      };
    } else {
      console.log(`キー "${gatya}" に対応するデータが見つかりませんでした。`);
      return null;
    }
}

function dsview(aread,bread,nds,uds) {
  for (let i = 0; i < 300; i++) {
    if (aread[i] > 9970) {
      nds.push(i + 1 + "A"); 
    } else  if (aread[i] > 9940) {
      uds.push(i + 1 + "A");
    }
    if (bread[i] > 9970) {
      nds.push(i + 1 + "B"); 
    } else  if (bread[i] > 9940) {
      uds.push(i + 1 + "B");
    }
  }
}

function setstyle(s1,aread,bread,areadStyles,breadStyles,namesa,namesb,results) {
  let areadStyle,breadStyle;
  for (let i = 0; i < 300; i++) {
    if (aread[i] > s1.lr) {
      areadStyle = "lrstyle";
    } else if (aread[i] > 9940) {
      areadStyle = "uplrstyle";
    } else if (aread[i] > 9070 && aread[i] < 9500) {
      if (s1.gtname !== "レジェンドガチャ" && s1.gtname !== "プラチナガチャ") {
        areadStyle = "upurstyle";
      }
      if (s1.gtname === "超ネコ祭" || s1.gtname === "極ネコ祭") {
        areadStyle = "upursaistyle";
      }
    } else if (aread[i] > s1.ur) {
      areadStyle = "urstyle";
    } else if (aread[i] > 6470) {
      areadStyle = "srstyle";
    } else {
      areadStyle = "nomalstyle";
    }
    if (bread[i] > s1.lr) {
      breadStyle = "lrstyle";
    } else if (bread[i] > 9940 && s1.gtname != "女王祭") {
      breadStyle = "uplrstyle";
    } else if (bread[i] > 9070 && bread[i] < 9500) {
      if (s1.gtname !== "レジェンドガチャ" && s1.gtname !== "プラチナガチャ") {
        breadStyle = "upurstyle";
      }
      if (s1.gtname === "超ネコ祭" || s1.gtname === "極ネコ祭") {
        breadStyle = "upursaistyle";
      }
    } else if (bread[i] > s1.ur) {
      breadStyle = "urstyle";
    } else if (bread[i] > 6470) {
      breadStyle = "srstyle";
    } else {
      breadStyle = "nomalstyle";
    }
    if (s1.gtname === "レジェンドガチャ") {
      if (aread[i] > 9970) {
        areadStyle = "lrstyle";
      } else if (aread[i] > 9940) {
        areadStyle = "uplrstyle";
      } else if (aread[i] > 9500) {
        areadStyle = "lglrstyle";
      } else {
        areadStyle = "nomalstyle";
      }
      if (bread[i] > 9970) {
        breadStyle = "lrstyle";
      } else if (bread[i] > 9940) {
        breadStyle = "uplrstyle";
      } else if (bread[i] > 9500) {
        breadStyle = "lglrstyle";
      } else {
        breadStyle = "nomalstyle";
      }
    }
    if (s1.gtname === "プラチナガチャ") {
      if (aread[i] > 9970) {
        areadStyle = "lrstyle";
      } else if (aread[i] > 9940) {
        areadStyle = "uplrstyle";
      } else {
        areadStyle = "nomalstyle";
      }
      if (bread[i] > 9970) {
        breadStyle = "lrstyle";
      } else if (bread[i] > 9940) {
        breadStyle = "uplrstyle";
      } else {
        breadStyle = "nomalstyle";
      }
    }
    if (namesa[i].includes("ガオ") || namesa[i].includes("ダル") || namesa[i].includes("ミタマ") || namesa[i].includes("キャス") || namesa[i].includes("ガル") || namesa[i].includes("フォノ") || namesa[i].includes("天女") || namesa[i].includes("エマ") || namesa[i].includes("閃雷機兵") || namesa[i].includes("シリウス") || namesa[i].includes("隼さ") || namesa[i].includes("拳パ") || namesa[i].includes("-")) {
      areadStyle = "genteistyle";
    }
    if (namesb[i].includes("ガオ") || namesb[i].includes("ダル") || namesb[i].includes("ミタマ") || namesb[i].includes("キャス") || namesb[i].includes("ガル") || namesb[i].includes("フォノ") || namesb[i].includes("天女") || namesb[i].includes("エマ") || namesb[i].includes("閃雷機兵") || namesb[i].includes("シリウス") || namesb[i].includes("隼さ") || namesb[i].includes("拳パ") || namesb[i].includes("-")) {
      breadStyle = "genteistyle";
    }
    areadStyles.push(areadStyle);
    breadStyles.push(breadStyle);
  }
}

changemain.addEventListener("click", () => { 
  const inputNumber = url.searchParams.get("seed"); 
  let inputkakut = `g${guranteed.value}`; 
  let inputaddf = `a${addfutureuber.value}`;
  if (inputkakut === "g0") inputkakut = ""; 
  if (inputaddf === "a0") inputaddf = ""; 
  const inputGatya = gacha.value + inputkakut + inputaddf; 
  const gts = url.searchParams.get("gt") || ""; 
  const parts = gts.split("s"); 
  parts[0] = inputGatya; 
  const newGt = parts.join("s");
  url.searchParams.set("seed", inputNumber); 
  url.searchParams.set("gt", newGt); 
  location.href = url; 
});

addsub.addEventListener("click", () => {
  let nowgt = url.searchParams.get("gt");
  let inputkakut, inputaddf;
  inputkakut = `g${guranteed.value}`;
  inputaddf = `a${addfutureuber.value}`;
  if (inputkakut === "g0") inputkakut = "";
  if (inputaddf === "a0") inputaddf = "";
  const inputGatya = nowgt + "s" + gacha.value + inputkakut + inputaddf;
  url.searchParams.set("gt", inputGatya);
  location.href = url;

})

seedupdate.addEventListener("click", () => {
  const seed = seedSelect.value;
  url.searchParams.set("seed" , seed);
  seedSelect.value = 0;
  location.href = url;
})

function createGetValueFn(lr, ur, sr) {
  return v => v >= lr ? 3 : v >= ur ? 2 : v >= sr ? 1 : 0;
}

function processGacha(seed, rounds, arr, valueFn, nameList, recordList, densList, labelOffsets, gatya, reado,ifkaburi,kakut) {
  let mae_seed = "";
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i <= rounds; i++) {
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: 13 }, () => xorshift.random());
    const [r1raw, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11,r12] = results;
    const r1 = r1raw % 10000;
    seed = r2;
    const kaburi_shift = new Xorshift32(r2);
    let name;
    name = arr[valueFn(r1)][r2 % arr[valueFn(r1)].length];
    let kaburi = "", targetseedNm = 0, overlapCount = 0;
    if (mae_seed === name && valueFn(r1) === 0) {
      let tempArr = arr[0].slice();
      while (true) {
        overlapCount++; 
        const idx = tempArr.indexOf(name);
        if (idx !== -1) tempArr.splice(idx, 1);
        kaburi = tempArr[kaburi_shift.random() % tempArr.length];
        if (kaburi !== name) break;
      }
    } else {
      kaburi = "";
    }
    let k_seed_link = "", n_seed_link = "", label;
    let targetSeed = overlapCount === 10 ? r12 : overlapCount === 9 ? r11 : overlapCount === 8 ? r10 : overlapCount === 7 ? r9 : overlapCount === 6 ? r8 : overlapCount === 5 ? r7 : overlapCount === 4 ? r6 : overlapCount === 3 ? r5 : overlapCount === 2 ? r4 : r3;
    if (labelOffsets === "A") {
      label = overlapCount === 10 ? "A" : overlapCount === 9 ? "B" : overlapCount === 8 ? "A" : overlapCount === 7 ? "B" : overlapCount === 6 ? "A" : overlapCount === 5 ? "B" : overlapCount === 4 ? "A" : overlapCount === 3 ? "B" : overlapCount === 2 ? "A" : "B";
      switch (overlapCount) {
        case 1:
          targetseedNm = 2;
          break;
        case 2:
        case 3:
          targetseedNm = 3;
          break;
        case 4:
        case 5:
          targetseedNm = 4;
          break;
        case 6:
        case 7:
          targetseedNm = 5;
          break;
        case 8:
        case 9:
          targetseedNm = 6;
          break;
        case 10:
          targetseedNm = 7;
          break;
      }
    } else {
      label = overlapCount === 10 ? "B" : overlapCount === 9 ? "A" : overlapCount === 8 ? "B" : overlapCount === 7 ? "A" : overlapCount === 6 ? "B" : overlapCount === 5 ? "A" : overlapCount === 4 ? "B" : overlapCount === 3 ? "A" : overlapCount === 2 ? "B" : "A";
      switch (overlapCount) {
        case 1:
        case 2:
          targetseedNm = 3;
          break;
        case 3:
        case 4:
          targetseedNm = 4;
          break;
        case 5:
        case 6:
          targetseedNm = 5;
          break;
        case 7:
        case 8:
          targetseedNm = 6;
          break;
        case 9:
        case 10:
          targetseedNm = 7;
          break;
      }
    }
    let gt = gatya;
    if (kakut !== 0) gt = gatya + "g" + kakut;
    gt = url.searchParams.get("gt");
    if (kaburi) k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?gt=${gt}">${kaburi}</a>`;
    if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&gt=${gt}">${name}</a>`;
    nameList.push(n_seed_link + k_seed_link);
    recordList.push(overlapCount,kaburi,name,n_seed_link,k_seed_link);
    ifkaburi.push(overlapCount);
    reado.push(r1);
    mae_seed = name;
  }
}

function getkk(seed,arr,RLa,RLb,nameList,labelOffsets,gatya,rounds,ifkaburi,kakut) {
  function getkab(k_seed_link,n_seed_link,name,labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed) {
    let kaburi = "", targetseedNm = 0, overlapCount = 0;
    let tempArr = arr[0].slice();
    while (true) {
      overlapCount++; 
      const idx = tempArr.indexOf(name);
      if (idx !== -1) tempArr.splice(idx, 1);
      kaburi = tempArr[kaburi_shift.random() % tempArr.length];
      if (kaburi !== name) break;
    }
    let label;
    let targetSeed = overlapCount === 10 ? r12 : overlapCount === 9 ? r11 : overlapCount === 8 ? r10 : overlapCount === 7 ? r9 : overlapCount === 6 ? r8 : overlapCount === 5 ? r7 : overlapCount === 4 ? r6 : overlapCount === 3 ? r5 : overlapCount === 2 ? r4 : r3;
    if (labelOffsets === "A") {
      label = overlapCount === 10 ? "RA" : overlapCount === 9 ? "RB" : overlapCount === 8 ? "RA" : overlapCount === 7 ? "RB" : overlapCount === 6 ? "RA" : overlapCount === 5 ? "RB" : overlapCount === 4 ? "RA" : overlapCount === 3 ? "RB" : overlapCount === 2 ? "RA" : "RB";
      switch (overlapCount) {
        case 1:
          targetseedNm = 2;
          break;
        case 2:
        case 3:
          targetseedNm = 3;
          break;
        case 4:
        case 5:
          targetseedNm = 4;
          break;
        case 6:
        case 7:
          targetseedNm = 5;
          break;
        case 8:
        case 9:
          targetseedNm = 6;
          break;
        case 10:
          targetseedNm = 7;
          break;
      }
    } else {
      label = overlapCount === 10 ? "RB" : overlapCount === 9 ? "RA" : overlapCount === 8 ? "RB" : overlapCount === 7 ? "RA" : overlapCount === 6 ? "RB" : overlapCount === 5 ? "RA" : overlapCount === 4 ? "RB" : overlapCount === 3 ? "RA" : overlapCount === 2 ? "RB" : "RA";
      switch (overlapCount) {
        case 1:
        case 2:
          targetseedNm = 3;
          break;
        case 3:
        case 4:
          targetseedNm = 4;
          break;
        case 5:
        case 6:
          targetseedNm = 5;
          break;
        case 7:
        case 8:
          targetseedNm = 6;
          break;
        case 9:
        case 10:
          targetseedNm = 7;
          break;
      }
    }
    let gt = gatya;
    if (kakut !== 0) gt = gatya + "g" + kakut;
    gt = url.searchParams.get("gt");
    if (kaburi) k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&gt=${gt}">${kaburi}</a>`;
    if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&gt=${gt}">${name}</a>`;
    let link = n_seed_link + k_seed_link;
    ifkaburi.splice(i,1,overlapCount);
    return link;
  }
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i < rounds; i++) {
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: 12 }, () => xorshift.random());
    const [r1raw, r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12] = results;
    const kaburi_shift = new Xorshift32(r2);
    let name, k_seed_link,n_seed_link;
    if (labelOffsets === "A") {
      name = RLa[5 * i + 2];
      k_seed_link = RLa[i * 5 + 4], n_seed_link = RLa[i * 5 + 3];
    } else if (labelOffsets === "B") {
      name = RLb[5 * i + 2];
      k_seed_link = RLb[i * 5 + 4], n_seed_link = RLb[i * 5 + 3];
    }
    let link = n_seed_link + k_seed_link;
    seed = r2;
    if (labelOffsets === "A") {
      if (RLb[(i - 1) * 5 - 30] === 10 && RLb[(i - 1) * 5 - 29] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 25] === 9 && RLa[(i - 1) * 5 - 24] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 25] === 8 && RLb[(i - 1) * 5 - 24] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 20] === 7 && RLa[(i - 1) * 5 - 19] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 20] === 6 && RLb[(i - 1) * 5 - 19] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 15] === 6 && RLa[(i - 1) * 5 - 14] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 15] === 5 && RLb[(i - 1) * 5 - 14] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 10] === 4 && RLa[(i - 1) * 5 - 9] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 10] === 3 && RLb[(i-1) * 5 - 9] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 5] === 2 && RLa[(i-1) * 5 - 4] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      }  else if (RLb[(i - 1) * 5 - 5] === 1 && RLb[(i-1) * 5 - 4] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      }
    } else if (labelOffsets === "B") {
      if (RLa[(i - 1) * 5 - 30] === 10 && RLa[(i - 1) * 5 - 29] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 25] === 9 && RLb[(i - 1) * 5 - 24] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 25] === 8 && RLa[(i - 1) * 5 - 24] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 20] === 7 && RLb[(i - 1) * 5 - 19] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 20] === 6 && RLa[(i - 1) * 5 - 19] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 15] === 6 && RLb[(i - 1) * 5 - 14] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 15] === 5 && RLa[(i - 1) * 5 - 14] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 10] === 4 && RLb[(i - 1) * 5 - 9] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLa[(i - 1) * 5 - 10] === 3 && RLa[(i-1) * 5 - 9] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      } else if (RLb[(i - 1) * 5 - 5] === 2 && RLb[(i-1) * 5 - 4] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      }  else if (RLa[(i - 1) * 5 - 5] === 1 && RLa[(i-1) * 5 - 4] === name) {
        link = getkab(k_seed_link, n_seed_link, name, labelOffsets, kaburi_shift,ifkaburi,i,kakut,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,seed);
      }
    }
    nameList.splice(i,1,link);
  }
}

function kakutei(seed, rounds, arr, kakut, recordList, labelOffsets, gatya, ifkaburia,ifkaburib) {
  if (kakut === "") return;
  const baseUrl = window.location.origin + window.location.pathname;

  for (let i = 0; i <= rounds; i++) {
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: 50 }, () => xorshift.random());
    const r2 = results[1];
    const k7 = results[12];
    const k11 = results[20];
    const k15 = results[28];
    seed = r2;

    let kname, seedlink = "", grr = 0 ,grrk = 0, kkname;
    let ks = kakut === 7 ? k7 : kakut === 11 ? k11 : k15;
    let kks = kakut === 7 ? k7 : kakut === 11 ? k11 : k15;
    let nextsd = 0, nextsdk = 0;
    let sdif, sdifk;
    let onkkks = false;
    let startichi = i;
    if (labelOffsets.add === 2) {
      sdif = 1;
      let Ads = true;
      for (let j = 0; j < kakut - 1; j++) {
        const source = Ads ? ifkaburia : ifkaburib;
        const kabu = source[startichi];

        nextsd += kabu;
        if (j === 0 && kabu !== 0) onkkks = true;

        if (kabu !== 0) {
          sdif += kabu;
          Ads = (kabu % 2 === 0);
          startichi += kabu;
        } else {
          startichi += 1;
        }
      }
    } else if (labelOffsets.add === 3) {
      sdif = 2;
      let Ads = false;
      for (let j = 0; j < kakut - 1; j++) {
        const source = Ads ? ifkaburia : ifkaburib;
        const kabu = source[startichi];

        nextsd += kabu;
        if (j === 0 && kabu !== 0) onkkks = true;

        if (kabu !== 0) {
          sdif += kabu;
          Ads = (kabu % 2 === 1); 
          startichi += kabu;
        } else {
          startichi += 1;
        }
      }
    }
    if (onkkks) {
      if (labelOffsets.add === 2) {
      sdifk = 1;
      startichi = i + 1;
      let Ads = true;
      for (let j = 0; j < kakut - 1; j++) {
        const source = Ads ? ifkaburia : ifkaburib;
        const kabu = source[startichi];

        nextsdk += kabu;

        if (kabu !== 0) {
          sdif += kabu;
          Ads = (kabu % 2 === 0);
          startichi += kabu;
        } else {
          startichi += 1;
        }
      }
      } else if (labelOffsets.add === 3) {
        sdifk = 2;
        startichi = i + 1;
        let Ads = false; 
        for (let j = 0; j < kakut - 1; j++) {
          const source = Ads ? ifkaburia : ifkaburib;
          const kabu = source[startichi];

          nextsdk += kabu;

          if (kabu !== 0) {
            sdifk += kabu;
            Ads = (kabu % 2 === 1); 
            startichi += kabu;
          } else {
            startichi += 1;
          }
        }
      }
    }
    let label = "A",labelk = "A"; 
    const ksIndex = (kakut * 2 - 2) + nextsd;
    const kksindex = (kakut * 2 - 2) + nextsdk;
    ks = results[ksIndex];
    kks = results[kksindex];
    kname = arr[2][ks % arr[2].length];
    kkname = arr[2][kks % arr[2].length];
    grr = kakut + Math.floor(sdif / 2);
    grrk = kakut + Math.floor(sdifk / 2);

    let gt = gatya;
    let gtk = gatya;
    if (kakut !== 0) gt = gatya + "g" + kakut;
    if (labelOffsets.add === 2) {
      label = labelOffsets.nomal;
      if (nextsd % 2 === 0) {
        label = labelOffsets.nomal;
      } else {
        label = labelOffsets.ifkabu;
      }
    } else if (labelOffsets.add === 3) {
      label = labelOffsets.nomal;
      if (nextsd % 2 === 0) {
        label = labelOffsets.nomal;
      } else {
        label = labelOffsets.ifkabu;
      }
    }
    if (onkkks) {
      if (kakut !== 0) gtk = gatya + "g" + kakut;
      if (labelOffsets.add === 2) {
        labelk = labelOffsets.nomal;
        if (nextsdk % 2 === 0) {
          labelk = labelOffsets.nomal;
        } else {
          labelk = labelOffsets.ifkabu;
        }
      } else if (labelOffsets.add === 3) {
        labelk = labelOffsets.nomal;
        if (nextsdk % 2 === 0) {
          labelk = labelOffsets.nomal;
        } else {
          labelk = labelOffsets.ifkabu;
        }
      }
      gtk = url.searchParams.get("gt");
      seedlink += `${labelk}${i + grrk})<a href="${baseUrl}?seed=${kks}&gt=${gtk}">${kkname}</a><br>`;
    }
    gt = url.searchParams.get("gt");
    seedlink += `${label}${i + grr})<a href="${baseUrl}?seed=${ks}&gt=${gt}">${kname}</a>`;
    recordList.push(seedlink);
  }
}


function getfindnext(charas) {
  findnextselect.innerHTML = "";
  const grouplabel = ["Rare:","Super:","Uber:","Legend:"]
  charas.forEach((group, index) => {
    if(group.length === 0 || (group.length === 1 && group[0].trim() === "")) return;
    const optgroup = document.createElement("optgroup");
    optgroup.label = grouplabel[index];
    group.forEach(charName => {
      if(charName.trim() !== "") {
        const option = document.createElement("option");
        option.value = charName;
        option.textContent = charName;
        optgroup.appendChild(option);
      }
    });
    findnextselect.appendChild(optgroup);
  });
}

function setaddallsub() {
  allsublist.innerHTML = "";
  Object.keys(gatyaData).forEach(key => {
    const option = document.createElement("option");
    const numKey = Number(key);
    option.value = numKey;      
    option.textContent = `${numKey} : ${gatyaData[key].name}`;
    allsublist.appendChild(option);
  })
}

function getfindtext(charas) {
  const findnextfilter = document.getElementById("findtext").value.trim();
  const findnextselect = document.getElementById("findlist");

  const flatCharas = charas.flat();
  const firstIndex = flatCharas.findIndex(val => val.includes(findnextfilter));
  findnextselect.innerHTML = "";
  if (firstIndex !== -1) {
    const option = document.createElement("option");
    option.value = flatCharas[firstIndex];
    option.textContent = flatCharas[firstIndex];
    findnextselect.appendChild(option);
  }
}

window.addToPlanAll = function (value, cell) {
  const index = plan_all.indexOf(value);
  const seedd = url.searchParams.get("seed");

  if (index === -1) {
    plan_all.push(value);
    cell.style.backgroundColor = "rgba(170, 170, 170, 0.93)";
  } else {
    plan_all.splice(index, 1);
    cell.style.backgroundColor = "";

    const kakuteiInfo = cell.dataset.kakutei ? decodeURIComponent(cell.dataset.kakutei) : null;
    if (kakuteiInfo) {
      const matches = [...kakuteiInfo.matchAll(/([AB]\d+)\)/g)];
      matches.forEach(m => {
        const seed = m[1];
        const gachaId = value.split("-")[1];
        const linkedId = `cell-${gachaId}-${seed}`;
        const linkedCell = document.getElementById(linkedId);
        if (linkedCell) linkedCell.style.backgroundColor = "";
      });
    }
  }

  let kan = 0;
  let gr = "";
  let current = null;
  let count = 0;
  let kcurrent = null;
  let kcount = 0;
  let grr = null;

  plan_all.forEach((v, i) => {
    if (v.includes("確定")) {
      // --- 確定ガチャ ---
      kan += 1500;
      const gt = v.split("-")[0];
      grr = v.split("-")[3];

      if (gt === kcurrent) {
        kcount++;
      } else {
        if (current !== null) {
          gr += ` ${current} ${count}`;
          current = null;
          count = 0;
        }
        if (kcurrent !== null) {
          gr += ` ${kcurrent} ${grr}g${kcount}`;
        }
        kcurrent = gt;
        kcount = 1;
      }
    } else {
      kan += 150;
      const gt = v.split("-")[0];

      if (gt === current) {
        count++;
      } else {
        if (current !== null) {
          gr += ` ${current} ${count}`;
        }
        if (kcurrent !== null) {
          gr += ` ${kcurrent} ${grr}g${kcount}`;
          kcurrent = null;
          kcount = 0;
        }
        current = gt;
        count = 1;
      }
    }
    if (i === plan_all.length - 1) {
      if (current !== null) {
        gr += ` ${current} ${count}`;
      }
      if (kcurrent !== null) {
        gr += ` ${kcurrent} ${grr}g${kcount}`;
      }
    }
  });

  planarea.innerHTML = `必要缶数 ${kan} 缶<br>------------<br>gr ${seedd} ${gr.trim()}`;
};


function getaddtext() {
  const addsubfilter = document.getElementById("addsubfilter").value.trim();
  const addsubselect = document.getElementById("allsubactivelist");

  addsubselect.innerHTML = "";

  let hitFound = false;

  for (const key in gatyaData) {
    const item = gatyaData[key];
    if (addsubfilter === "") {
      const option = document.createElement("option");
      option.value = Number(key);
      option.textContent = `${key} : ${item.name}`;
      addsubselect.appendChild(option);
    }
    else if (!hitFound && (key.includes(addsubfilter) || item.name.includes(addsubfilter))) {
      const option = document.createElement("option");
      option.value = Number(key);
      option.textContent = `${key} : ${item.name}`;
      addsubselect.appendChild(option);
      hitFound = true;
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadTSV();
  gtdataget()
  allsub.innerHTML = `設定されているガチャ:`;
  const tableBody = document.getElementById("gatya_table");
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(url.searchParams.get("seed"))
      .then(() => alert("コピーしました！"))
      .catch(() => alert("コピーに失敗しました。ブラウザ設定をご確認ください。"));
  });
  let seed = url.searchParams.get("seed") || 1;
  const gts = url.searchParams.get("gt") || "";

  const results = gts.includes("s")
    ? gts.split("s").map(part => {
        const [beforeA, afterA] = part.split("a");
        const [g, k] = beforeA.split("g");
        return {
          gatya: g,
          kakut: k ? Number(k) : 0,
          addf: afterA ? Number(afterA) : 0
        };
      })
    : (() => {
        const [beforeA, afterA] = gts.split("a");
        const [g, k] = beforeA.split("g");
        return [{
          gatya: g,
          kakut: k ? Number(k) : 0,
          addf: afterA ? Number(afterA) : 0
        }];
      })();

  if (results.length > 0) {
    gacha.value = results[0].gatya;
    if (results[0].kakut !== 0) guranteed.value = "0";
    if (results[0].addf !== 0) addfutureuber.value = "";
  }
  getfindnext(getGatyaInfo(results[0].gatya).gt_chara);
  setaddallsub();
  function renderHeader(results, tableBody) {
    const KakutCount = results.filter(r => r.kakut !== 0).length;
    const totalColSpan = results.length + KakutCount;

    let headerRow = `<tr>
      <th style="width:30px"></th>
      <th style="width:48.75%" colspan="${totalColSpan}">A</th>
      ${results.length >= 2 ? `<th style="width:30px"></th>` : ""}
      <th style="width:48.75%" colspan="${totalColSpan}">B</th>
    </tr>`;
    tableBody.innerHTML = headerRow;

    let infoRow = `<tr><th class="nd"></th>`;
    results.forEach((res, index) => {
      const s = getGatyaInfo(res.gatya);

      if (res.addf && res.addf > 0) {
        for (let n = 1; n <= res.addf; n++) {
          s.gt_chara[2].unshift(`-${n}`);
        }
      }

      const fullId =
        `${res.gatya}` +
        (res.kakut ? `g${res.kakut}` : "") +
        (res.addf ? `a${res.addf}` : "");

      infoRow += `<th class="nd" colspan="${res.kakut !== 0 ? 2 : 1}">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span>
            ${res.gatya} ${s.gtname}<br>
            0,${s.sr},${s.ur},${s.lr}
            ${res.kakut ? `<br>guaranteed:${res.kakut}` : ""}
            ${res.addf ? `<br>add:${res.addf}` : ""}
          </span>
          ${
            index > 0
              ? `<button class="remove-sub"
                  data-id="${fullId}"
                  data-index="${index}"
                  style="cursor:pointer;border:none;background:transparent;color:red;font-weight:bold;">✕</button>`
              : ""
          }
        </div>
      </th>`;
    });

    if (results.length >= 2) infoRow += `<th class="nd"></th>`;
    results.forEach(res => {
      const s = getGatyaInfo(res.gatya);
      infoRow += `<th class="nd" colspan="${res.kakut !== 0 ? 2 : 1}">
        <div>${res.gatya} ${s.gtname}</div></th>`;
    });
    infoRow += `</tr>`;
    tableBody.innerHTML += infoRow;
  }
  renderHeader(results, tableBody);

  document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-sub")) {
      const id = e.target.dataset.id;
      const idx = parseInt(e.target.dataset.index, 10);
      const url = new URL(location.href);
      let gt = url.searchParams.get("gt") || "";

      let parts = gt.split("s").filter(p => p !== "");
      parts.splice(idx, 1);

      if (parts.length > 0) {
        url.searchParams.set("gt", parts.join("s"));
      } else {
        url.searchParams.delete("gt");
      }
      location.href = url;
    }
  });

  const infos = results.map(r => getGatyaInfo(r.gatya));
  const getValueFns = infos.map(s => createGetValueFn(s.lr, s.ur, s.sr));
  const namesA = [], namesB = [], aread = [], bread = [],
        ans = [], bns = [], akabu = [], bkabu = [],
        kakuteiA = [], kakuteiB = [],
        areadStyles = [], breadStyles = [];
  function runGacha(seed, info, getValue, res) {
    const na = [], nb = [], ar = [], br = [],
          aa = [], bb = [], ak = [], bk = [],
          ka = [], kb = [];

    processGacha(seed, 300, info.gt_chara, getValue, na, aa, [], "A", res.gatya, ar, ak, res.kakut);
    processGacha(new Xorshift32(seed).random(), 300, info.gt_chara, getValue, nb, bb, [], "B", res.gatya, br, bk, res.kakut);

    getkk(seed, info.gt_chara, aa, bb, na, "A", res.gatya, 300, ak, res.kakut);
    getkk(new Xorshift32(seed).random(), info.gt_chara, aa, bb, nb, "B", res.gatya, 300, bk, res.kakut);

    kakutei(seed, 300, info.gt_chara, res.kakut, ka, { nomal: "B", ifkabu: "A", add: 2 }, res.gatya,ak,bk);
    kakutei(new Xorshift32(seed).random(), 300, info.gt_chara, res.kakut, kb, { nomal: "A", ifkabu: "B", add: 3 }, res.gatya,ak,bk);

    const as = [], bs = [];
    setstyle(info, ar, br, as, bs, na, nb, res);
    namesA.push(na); namesB.push(nb);
    aread.push(ar); bread.push(br);
    ans.push(aa); bns.push(bb);
    akabu.push(ak); bkabu.push(bk);
    kakuteiA.push(ka); kakuteiB.push(kb);
    areadStyles.push(as); breadStyles.push(bs);
  }
  results.forEach((res, i) => runGacha(seed, infos[i], getValueFns[i], res));

  function getFindChars() {
    const text = document.getElementById("findnext")?.innerText || "";
    return text.split("\n")
              .map(line => line.split(":")[0].trim())
              .filter(name => name.length > 0);
  }

  function createRow(i) {
    const findChars = getFindChars();

    const makeSide = (styles, names, kakuteis, kakuts, rowIndex, sideLabel, gachaResults) =>
      styles.map((style, idx) => {
        const gachaId = gachaResults[idx].gatya;   // ガチャ番号
        const charName = names[idx][rowIndex] || "";
        const highlight = findChars.includes(charName) ? ' style="background-color:lightgreen;"' : "";
        const seedLabel = sideLabel + (rowIndex + 1); 
        const cellId = `cell-${gachaId}-${seedLabel}`;

        // 通常セル
        let cell = `<td id="${cellId}" class="${style[rowIndex]} min80"${highlight}
                      oncontextmenu="addToPlanAll('${gachaId}-${seedLabel}', this); return false;">
                      ${charName}
                    </td>`;

        // 確定枠セル（存在する場合のみ）
        if (kakuts[idx] !== 0) {
          const kakuteiName = kakuteis[idx][rowIndex] || "";
          const kHighlight = findChars.includes(kakuteiName) ? ' style="background-color:lightgreen;"' : "";
          const kakuteiLabel = (rowIndex + 1) + sideLabel;
          const kakuteiId = `kakutei-${gachaId}-${kakuteiLabel}`;
          const kakuteiInfo = kakuteis[idx][rowIndex] || "";

          // ★ addToPlanAll に渡す文字列を「ガチャID-確定-ラベル」に統一
          cell += `<td id="${kakuteiId}" class="min80"${kHighlight}
                    data-kakutei="${encodeURIComponent(kakuteiInfo)}"
                    oncontextmenu="addToPlanAll('${gachaId}-確定-${kakuteiLabel}-${kakuts[idx]}', this); return false;">
                    ${kakuteiName}
                  </td>`;
        }

        return cell;
      }).join("");

    let row = `<tr><td class="num-cell">${i + 1}</td>`;
    row += makeSide(areadStyles, namesA, kakuteiA, results.map(r => r.kakut), i, "A", results);
    if (results.length >= 2) row += `<td class="num-cell">${i + 1}</td>`;
    row += makeSide(breadStyles, namesB, kakuteiB, results.map(r => r.kakut), i, "B", results);
    row += `</tr>`;
    return row;
  }

  function updateHighlights() {
    const findChars = getFindChars();
    const table = document.getElementById("gatya_table");
    const cells = table.getElementsByTagName("td");

    for (let cell of cells) {
      const text = cell.textContent.trim();
      if (findChars.includes(text)) {
        cell.style.backgroundColor = "#32CD32";
        cell.style.fontWeight = "bold";
      } else {
        cell.style.backgroundColor = "";
        cell.style.fontWeight = "";
      }
    }
  }

  const nds = [],uds = [];
  let rows = "";
  for (let i = 0; i < 300; i++) {
    rows += createRow(i);
  }
  tableBody.insertAdjacentHTML("beforeend", rows);
  dsview(aread[0],bread[0],nds,uds);
  nextds.innerHTML = `伝説枠:${nds}... 昇格伝説枠:${uds}...`

  delsub.addEventListener("click", () => {
    const inputNumber = url.searchParams.get("seed");
    let inputkakut = guranteed.value === "0" ? "" : `g${guranteed.value}`;
    const inputGatya = gacha.value + inputkakut;
    url.searchParams.set("seed", inputNumber);
    url.searchParams.set("gt", inputGatya);
    location.href = url;
  });
  addfindnext.addEventListener("click", () => {
    const flatNamesA = namesA.flat();
    const flatNamesB = namesB.flat();
    const listA = flatNamesA
    .map((val, i) => val.trim().includes(findnextselect.value) ? { name: val + "A", index: i } : null)
    .filter(x => x !== null);
    const listB = flatNamesB
    .map((val, i) => val.trim().includes(findnextselect.value) ? { name: val + "B", index: i } : null)
    .filter(x => x !== null);
    const merged = [...listA, ...listB].sort((a, b) => a.index - b.index);
    const indicesWithAB = merged.map(item => (item.index + 1) + (item.name.endsWith("A") ? "A" : "B"));
    findarea.innerHTML += `${findnextselect.value}:${indicesWithAB}<br>`;
    getfindnext(getGatyaInfo(results[0].gatya).gt_chara);
    updateHighlights();

  })
  const ADDALL_KEY = "addall";

  function readAddAll() {
    try {
      const raw = localStorage.getItem(ADDALL_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(n => Number(n)).filter(n => !Number.isNaN(n));
      if (typeof parsed === "number") return [parsed];
      if (typeof parsed === "string") {
        return parsed
          .split(/[^0-9]+/)       
          .map(s => parseInt(s, 10))
          .filter(n => !Number.isNaN(n));
      }
      return [];
    } catch {
      const raw = localStorage.getItem(ADDALL_KEY);
      if (!raw) return [];
      return raw
        .split(/[^0-9]+/)
        .map(s => parseInt(s, 10))
        .filter(n => !Number.isNaN(n));
    }
  }

  function writeAddAll(arr) {
    const uniq = [...new Set(arr.map(n => Number(n)).filter(n => !Number.isNaN(n)))];
    localStorage.setItem(ADDALL_KEY, JSON.stringify(uniq));
    return uniq;
  }

  function renderAllSub() {
    const span = document.getElementById("allsub");
    const list = readAddAll();
    const sel = document.getElementById("allsubactivelist");
    const nameByVal = {};
    for (const opt of sel.options) {
      nameByVal[opt.value] = opt.textContent;
    }
    span.innerHTML = "";

    list.forEach(id => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.marginBottom = "4px";
      const label = document.createElement("span");
      label.textContent = nameByVal[String(id)] || id;
      label.style.marginRight = "8px";
      const btn = document.createElement("button");
      btn.textContent = "✕";
      btn.style.cursor = "pointer";
      btn.style.border = "none";
      btn.style.background = "transparent";
      btn.style.color = "red";
      btn.title = "削除";

      btn.addEventListener("click", () => {
        const newList = list.filter(x => x !== id);
        writeAddAll(newList);
        renderAllSub();
      });

      wrapper.appendChild(label);
      wrapper.appendChild(btn);
      span.appendChild(wrapper);
    });
  }
  const allsubAddBtn = document.getElementById("allsubadd");
  const allsubDelBtn = document.getElementById("allsuballdel");
  const addAllSubApplyBtn = document.getElementById("adalsub");
  allsubAddBtn.addEventListener("click", () => {
    const sel = document.getElementById("allsubactivelist");
    const id = Number(sel.value);
    const list = readAddAll();
    if (!list.includes(id)) {
      writeAddAll([...list, id]);
      renderAllSub();
    }
  });
  allsubDelBtn.addEventListener("click", () => {
    localStorage.removeItem(ADDALL_KEY);
    renderAllSub();
  });
  addAllSubApplyBtn.addEventListener("click", () => {
    const url = new URL(location.href);
    const seed = url.searchParams.get("seed") || "0";
    const list = readAddAll();
    if (list.length === 0) return;
    let g = document.getElementById("guranteed").value;
    let a = document.getElementById("addfutureuber").value;
    g = g === "0" ? "" : `g${g}`;
    a = a === "0" ? "" : `a${a}`;

    const gt = list.map(v => `${v}${g}${a}`).join("s");
    url.searchParams.set("seed", seed);
    url.searchParams.set("gt", gt);
    location.href = url;
  });

  renderAllSub();

  findtext.addEventListener("blur", () => {
    getfindtext(getGatyaInfo(results[0].gatya).gt_chara);
    findtext.value = "";
  });
  addsubfilter.addEventListener("blur", () => {
    getaddtext();
  });
  findel.addEventListener("click", () => {
    findarea.innerHTML = ``;
    updateHighlights();
  })

  console.log(`実行速度: ${performance.now() - start}ms`);
});