const addButton = document.getElementById("ok_button");
const copyButton = document.getElementById("copybutton");
const seedSelect = document.getElementById("seed_select");
const lcma = document.getElementById("LC?Ma_blocks");
const lcgca = document.getElementById("LCG?CEa_blocks");
const lcmb = document.getElementById("LC?Mb_blocks");
const lcgcb = document.getElementById("LCG?CEb_blocks");
const darkcatseye_findnext = document.getElementById("next_darkcatseye");
import * as gt from './chara_list-n.js';

let namesca = [], namescb = [], namesga = [], namesgb = [], dca = [], dcb = [];
const url = new URL(window.location.href);
let gttype = url.searchParams.get("type") === "1" ? 1 : 0;
const start = performance.now();

addButton.addEventListener("click", function() {
  const inputNumber = seedSelect.value;
  url.searchParams.set("seed", inputNumber);
  url.searchParams.set("type", gttype);
  location.href = url;
});

function changetype() {
  gttype = gttype ? 0 : 1;
  url.searchParams.set("type", gttype);
  location.href = url;
}
window.changetype = changetype;

function getTextColor(text) {
  const colorGroups = {
    "rgb(0,0,255)": ["お財布", "砲", "仕事効率", "力"],
    "rgb(255,0,0)": ["トレレ", "100万XP", "ビタンC","闇猫目"],
    "rgb(0,255,0)": ["ちび"],
  };
  for (const [color, keywords] of Object.entries(colorGroups)) {
    if (keywords.some(k => text.includes(k))) return color;
  }
  return "black";
}

function getIfYAMIME(text) {
  const YAMIMESTYLE = {
    "16px": ["闇猫目"]
  }
  for (const [fonts, keywords] of Object.entries(YAMIMESTYLE)) {
    if (keywords.some(k => text.includes(k))) return fonts;
  }
  return "";
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

// 閾値から評価関数を作成
function createGetValueFn(lr, ur, sr, nr) {
  return v => v >= lr ? 4 : v >= ur ? 3 : v >= sr ? 2 : v >= nr ? 1 : 0;
}

// 共通処理
function processGacha(seed, rounds, arr, valueFn, nameList, recordList, darkList, labelOffsets, gatya, checkDark = false) {
  let mae_seed = "", kaburi = "";
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i <= rounds; i++) {
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: arr === gt.nomal ? 3 : 5 }, () => xorshift.random());
    const [r1raw, r2, r3, r4, r5] = results;
    const r1 = r1raw % 10000;
    seed = r2;
    
    const kaburi_shift = new Xorshift32(r2);
    let name;
    name = arr[valueFn(r1)][r2 % arr[valueFn(r1)].length];
    const index1 = arr[1].indexOf(name);
    const kaburi1 = arr[1].slice();
    kaburi1.splice(index1,1);
    const index2 = kaburi1.indexOf(name);
    const kaburi2 = kaburi1.slice()
    kaburi2.splice(index2,1);
    const index3 = kaburi2.indexOf(name);
    const kaburi3 = kaburi2.slice()
    kaburi3.splice(index3,1);
    let daburu = "F", tripuru = "F", targetseedNm = 0;
    if (mae_seed === name && valueFn(r1) == 1) {
      kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
      if (kaburi === name) {
        daburu = "T"; 
        kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
        if (kaburi === name) { 
          daburu = "F"; 
          tripuru = "T"; 
          kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
        }
      }
    } else { 
      kaburi = "";
    }
    
    let k_seed_link = "", n_seed_link = "";
    if (labelOffsets.add === 2) {
        if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
        } else {
            targetseedNm = 2;
        }
    } else {
        if (tripuru === "T") {
            targetseedNm = 4;
        } else {
            targetseedNm = 3;
        }
    }
    
    if (kaburi) {
      const color = getTextColor(kaburi);
      const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
      const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
      k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
    }
    if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
    if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    if (checkDark) {
      darkList.push(r1 >= 9900 ? "T" : "F");
      if (r1 >= 9900 && gatya !== "1") k_seed_link += "<br>(CE→闇猫目)";
    }
    nameList.push(n_seed_link + k_seed_link);
    recordList.push(kaburi ? (tripuru === "T" ? "3" : daburu === "T" ? "2" : "1") : "0",kaburi,name,n_seed_link,k_seed_link);
    mae_seed = name;
  }
}

function getKaK(seed, arr, RLa, RLb, nameList, labelOffsets, valueFn, gatya, rounds) {
  let kaburi;
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i < rounds; i++) {
    let k_seed_link = RLa[i * 5 + 4], n_seed_link = RLa[i * 5 + 3];
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: arr === gt.nomal ? 3 : 5 }, () => xorshift.random());
    const [r1raw, r2, r3, r4, r5] = results;
    const r1 = r1raw % 10000;
    const kaburi_shift = new Xorshift32(r2);
    let name = RLa[5 * i + 2];
    seed = r2;
    const index1 = arr[1].indexOf(name);
    const kaburi1 = arr[1].slice();
    kaburi1.splice(index1,1);
    const index2 = kaburi1.indexOf(name);
    const kaburi2 = kaburi1.slice()
    kaburi2.splice(index2,1);
    const index3 = kaburi2.indexOf(name);
    const kaburi3 = kaburi2.slice()
    kaburi3.splice(index3,1);
    let daburu = "F", tripuru = "F", targetseedNm = 0;
    if (RLb[(i - 1) * 5 - 10] === "3" && RLb[(i-1) * 5 - 9] === name) {
      
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    } else if (RLa[(i - 1) * 5 - 5] === "2" && RLa[(i-1) * 5 - 4] === name) {
      
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    } else if (RLb[(i - 1) * 5 - 5] === "1" && RLb[(i-1) * 5 - 4] === name) {
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    }
    nameList.splice(i,1,n_seed_link+k_seed_link);
  }
}

function getKbK(seed, arr, RLa, RLb, nameList, labelOffsets, valueFn, gatya, rounds) {
  let kaburi;
  const baseUrl = window.location.origin + window.location.pathname;
  for (let i = 0; i < rounds; i++) {
    let k_seed_link = RLb[i * 5 + 4], n_seed_link = RLb[i * 5 + 3];
    const xorshift = new Xorshift32(seed);
    const results = Array.from({ length: arr === gt.nomal ? 3 : 5 }, () => xorshift.random());
    const [r1raw, r2, r3, r4, r5] = results;
    const r1 = r1raw % 10000;
    const kaburi_shift = new Xorshift32(r2);
    let name = RLb[5 * i + 2];
    seed = r2;
    const index1 = arr[1].indexOf(name);
    const kaburi1 = arr[1].slice();
    kaburi1.splice(index1,1);
    const index2 = kaburi1.indexOf(name);
    const kaburi2 = kaburi1.slice()
    kaburi2.splice(index2,1);
    const index3 = kaburi2.indexOf(name);
    const kaburi3 = kaburi2.slice()
    kaburi3.splice(index3,1);
    let daburu = "F", tripuru = "F", targetseedNm = 0;
    if (RLa[(i - 1) * 5 - 10] === "3" && RLa[(i-1) * 5 - 9] === name) {
      
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    } else if (RLb[(i - 1) * 5 - 5] === "2" && RLb[(i-1) * 5 - 4] === name) {
      
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    } else if (RLa[(i - 1) * 5 - 5] === "1" && RLa[(i - 1) * 5 - 4] === name) {
      
      if (name) {
        kaburi = kaburi1[kaburi_shift.random() % kaburi1.length];
        if (kaburi === name) {
          daburu = "T"; 
          kaburi = kaburi2[kaburi_shift.random() % kaburi2.length]; 
          if (kaburi === name) { 
            daburu = "F"; 
            tripuru = "T"; 
            kaburi = kaburi3[kaburi_shift.random() % kaburi3.length];
          }
        }
      } else { 
        kaburi = "";
      }
      if (labelOffsets.add === 2) {
          if (tripuru === "T" || daburu === "T") {
            targetseedNm = 3;
          } else {
            targetseedNm = 2;
          }
      } else {
          if (tripuru === "T") {
            targetseedNm = 4;
          } else {
            targetseedNm = 3;
          }
      }
      if (kaburi) {
        const color = getTextColor(kaburi);
        const targetSeed = tripuru === "T" ? r5 : daburu === "T" ? r4 : r3;
        const label = tripuru === "T" ? labelOffsets.triple : daburu === "T" ? labelOffsets.double : labelOffsets.single;
        k_seed_link = `<br>${label}${i + targetseedNm})<a href="${baseUrl}?seed=${targetSeed}&type=${gatya}" style="color:${color};">${kaburi}</a>`;
      }
      if (name) n_seed_link = `<a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a>`;
      if (name === "闇猫目") n_seed_link = `<b><a href="${baseUrl}?seed=${seed}&type=${gatya}" style="color:${getTextColor(name)}; font-size:${getIfYAMIME(name)}">${name}</a></b>  `;
    }
    nameList.splice(i,1,n_seed_link+k_seed_link);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(seedSelect.value).then(() => alert('コピーしました！'))
      .catch(() => alert('コピーに失敗しました。ブラウザ設定をご確認ください。'));
  });

  let seed = url.searchParams.get("seed") || "";
  if (seed) seedSelect.value = seed;

  // gatyaの値で閾値設定
  let sc_lr, sc_ur, sc_sr, sc_nr, th_lr, th_ur, th_sr, th_nr;
  const gatya = url.searchParams.get("type");
  if (gatya === "0") {
    [sc_lr, sc_ur, sc_sr, sc_nr] = [10000, 9500, 7400, 0];
    [th_lr, th_ur, th_sr, th_nr] = [10000, 8600, 5100, 0];
    lcma.innerHTML = "LC"; lcgca.innerHTML = "LCG";
    lcmb.innerHTML = "LC"; lcgcb.innerHTML = "LCG";
  } else {
    [sc_lr, sc_ur, sc_sr, sc_nr] = [9400, 2400, 400, 0];
    [th_lr, th_ur, th_sr, th_nr] = [9900, 9400, 7400, 500];
    lcma.innerHTML = "M"; lcgca.innerHTML = "CE";
    lcmb.innerHTML = "M"; lcgcb.innerHTML = "CE";
  }

  // 関数化したgetValueを作成
  const getValuesc = createGetValueFn(sc_lr, sc_ur, sc_sr, sc_nr);
  const getValueth = createGetValueFn(th_lr, th_ur, th_sr, th_nr);
  const getValuenl = createGetValueFn(10000, 10000, 10000, 0);
  // ノーマル
  const namesa = [], namesb = [], nka = [], nkb = [],ka2 = [],kb2 = [],ka3 = [],kb3 = [];
  processGacha(seed, 100, gt.nomal, getValuenl, namesa, nka, dca, { single: "B", double: "B", triple: "B", add: 2 }, gatya, true);
  processGacha(new Xorshift32(seed).random(), 100, gt.nomal, getValuenl, namesb, nkb, dcb, { single: "A", double: "A", triple: "A", add: 3 }, gatya, true);
  getKaK(seed, gt.nomal, nka, nkb, namesa, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValuenl, gatya, 100);
  getKbK(new Xorshift32(seed).random(), gt.nomal, nka, nkb, namesb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValueth, gatya, 100);
  if (gatya === "0") {
    processGacha(seed, 100, gt.LC, getValuesc, namesca, ka2, [], { single: "B", double: "A", triple: "B", add: 2 }, gatya);
    processGacha(new Xorshift32(seed).random(), 100, gt.LC, getValuesc, namescb, kb2, [], { single: "A", double: "B", triple: "A", add: 3 }, gatya);
    processGacha(seed, 100, gt.LCG, getValueth, namesga, ka3, [], { single: "B", double: "A", triple: "B", add: 2 }, gatya);
    processGacha(new Xorshift32(seed).random(), 100, gt.LCG, getValueth, namesgb, kb3, [], { single: "A", double: "B", triple: "A", add: 3 }, gatya);
    getKaK(seed, gt.LC, ka2, kb2, namesca, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValuenl, gatya, 100);
    getKbK(new Xorshift32(seed).random(), gt.LC, ka2, kb2, namescb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValueth, gatya, 100);
    getKaK(seed, gt.LCG, ka3, kb3, namesga, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValueth, gatya, 100);
    getKbK(new Xorshift32(seed).random(), gt.LCG, ka3, kb3, namesgb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValueth, gatya, 100);
  } else {
    processGacha(seed, 100, gt.M, getValuesc, namesca, ka2, [], { single: "B", double: "A", triple: "B", add: 2 }, gatya);
    processGacha(new Xorshift32(seed).random(), 100, gt.M, getValuesc, namescb, kb2, [], { single: "A", double: "B", triple: "A", add: 3 }, gatya);
    processGacha(seed, 100, gt.CE, getValueth, namesga, ka3, [], { single: "B", double: "A", triple: "B", add: 2 }, gatya);
    processGacha(new Xorshift32(seed).random(), 100, gt.CE, getValueth, namesgb, kb3, [], { single: "A", double: "B", triple: "A", add: 3 }, gatya);
    getKaK(seed, gt.M, ka2, kb2, namesca, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValuenl, gatya, 100);
    getKbK(new Xorshift32(seed).random(), gt.M, ka2, kb2, namescb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValueth, gatya, 100);
    getKaK(seed, gt.CE, ka3, kb3, namesga, { single: "RB", double: "RA", triple: "RB", add: 2 }, getValueth, gatya, 100);
    getKbK(new Xorshift32(seed).random(), gt.CE, ka3, kb3, namesgb, { single: "RA", double: "RB", triple: "RA", add: 3 }, getValueth, gatya, 100);
  }

  // 表描画
  const tableBody = document.getElementById("gatya_table");
  for (let i = 0; i < 100; i++) {
    const areadStyle = dca[i] === "T" ? ' style="background-color:rgb(193, 120, 255);"' : "";
    const breadStyle = dcb[i] === "T" ? ' style="background-color:rgb(193, 120, 255);"' : "";
    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td${areadStyle}>${namesa[i] || ""}</td>
        <td${areadStyle}>${namesca[i] || ""}</td>
        <td${areadStyle}>${namesga[i] || ""}</td>
        <td${breadStyle}>${namesb[i] || ""}</td>
        <td${breadStyle}>${namescb[i] || ""}</td>
        <td${breadStyle}>${namesgb[i] || ""}</td>
      </tr>`;
  }

  // 闇猫目探索
  let darkcatseye_next = [];
  seed = url.searchParams.get("seed");
  for (let i = 0; i <= 500; i++) {
    const xorshift = new Xorshift32(seed);
    const results = [];
    for (let i = 0; i <3; i++) { results.push(xorshift.random()); }
    const [ra, rb] = results;
    seed = rb;
    if ((ra % 10000) >= 9900) darkcatseye_next.push(i + 1 + "A");
    if ((rb % 10000) >= 9900) darkcatseye_next.push(i + 1 + "B");
  }

  if (seed >= 4294967296 || seed <= 0) {
    console.log("%cシード値が不正です\n1~4294967295の範囲に収めてください\n(正しい挙動にならない可能性があります)", "color: rgb(255,0,0)");
  } else {
    console.log("正しく動作しています");
  }
  darkcatseye_findnext.innerHTML = "闇猫目:" + darkcatseye_next + "...";
  console.log("プログラムが正常に終了しました", "seed:", url.searchParams.get("seed"), "type:", url.searchParams.get("type"));
  console.log("最短の闇猫目の位置:", darkcatseye_next[0]);
  console.log(`実行速度: ${performance.now() - start}ms`);
});
