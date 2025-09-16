async function loadTSV() {
  try {
    // api/fetch-tsv にアクセスしてデータを取得
    const response = await fetch('/api/fetch-tsv');
    if (!response.ok) throw new Error('APIエラー');

    const result = await response.json();

    if (result.success) {
      const array2D = result.data; // これが2次元配列
      console.log("取得データ:", array2D);

      // 例: table要素に表示する処理
      renderTable(array2D);
    } else {
      console.error("APIからエラー:", result.error);
    }
  } catch (err) {
    console.error("fetch失敗:", err);
  }
}

function renderTable(data) {
  const table = document.getElementById("my-table");
  table.innerHTML = ""; // 一旦リセット

  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", loadTSV);
