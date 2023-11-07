// ドラッグ&ドロップエリアの取得
let fileArea = document.getElementById('dropArea');

// input[type=file]の取得
let fileInput = document.getElementById('uploadFile');

// jsonデータ
let jsonList = [];

// ドラッグオーバー時の処理
fileArea.addEventListener('dragover', function(e){
    e.preventDefault();
    fileArea.classList.add('dragover');
});

// ドラッグアウト時の処理
fileArea.addEventListener('dragleave', function(e){
    e.preventDefault();
    fileArea.classList.remove('dragover');
});

// ドロップ時の処理
fileArea.addEventListener('drop', function(e){
  e.preventDefault();
  fileArea.classList.remove('dragover');

  // ドロップしたファイルの取得
  var files = e.dataTransfer.files;
  // 取得したファイルをinput[type=file]へ
  fileInput.files = files;
  
  if(typeof files[0] !== 'undefined') {
    readFile(files[0])
  } else {
    //ファイルが受け取れなかった際の処理
  }
});

// input[type=file]に変更があれば実行
// もちろんドロップ以外でも発火します
fileInput.addEventListener('change', function(e){
  var file = e.target.files[0];
  
  if(typeof e.target.files[0] !== 'undefined') {
    readFile(file)
  } else {
    // ファイルが受け取れなかった際の処理
  }
}, false);

function readFile(file) {
  const reader = new FileReader();
  let json = null;
  reader.onload = (event) => {
    const content = event.target?.result;
    try {
      const jsonData = JSON.parse(content);
      const notes = jsonData.map((v,i) => ({ no: i, id: v.id, text: v.text, date: dayjs(v.createdAt).format('YYYY/MM/DD HH:mm') }))
      setData(notes);
      alter();
    } catch (error) {
      console.error("JSONファイルを解析できませんでした。", error);
    }
  };
  reader.readAsText(file);
}

function alter() {
  document.getElementById('upFileWrap').classList.add('hide');
  document.getElementById('target').classList.remove('hide');
}

function link(cell, formatterParams){
  let cd = cell.getData();
  let domain = document.getElementById('domain').value;
  if (!domain) {
    domain = "misskey.gamelore.fun";
  }
  return "https://" + domain +"/notes/" + cd.id;
}

function setData(notes) {
  let table = new Tabulator('#target', {
    data: notes,
    tooltips: true,
    layout:"fitDataTable",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [ 10 , 25 , 50 , 100 ],
    columns:[
      {title:"No.", field:"no", headerFilter:true},
      {title:"本文", field:"text", tooltip:true, headerFilter:true, headerSort:false, maxWidth:800},
      {title:"日付", field:"date", tooltip:true, headerFilter:true, headerSort:false, formatter:"link", formatterParams:{
        url:link,
        labelField:"date",
        target:"_blank",
      }},
    ],
  });
}


const apiUrl = "https://jsonreader.pages.dev/helloworld";
fetch(apiUrl, {
  method: 'POST',
  body: 'https://misskey.gamelore.fun/storage/files/6cff3461-2293-4f83-959f-f89d1e32aba5',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.text())
.then(value => {
  console.log(value);
})
.catch(error => console.error('通信に失敗しました', error));