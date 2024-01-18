let url = document.getElementById('url');
let submit = document.getElementById('submit');

// jsonデータ
let jsonList = [];

submit.addEventListener('click', function(e){
  if (!url.value) return;
  const apiUrl = "https://fetch.v-setaria.workers.dev/";
  fetch(apiUrl, {
    method: 'POST',
    body: url.value,
  })
  .then(response => response.text())
  .then(value => {
    const jsonData = JSON.parse(value);
    const notes = jsonData.map((v,i) => ({
      no: i,
      id: v.id,
      cw: v.cw,
      text: v.text,
      date: dayjs(v.createdAt).format('YYYY/MM/DD HH:mm')
    }))
    setData(notes);
    alter();
  })
  .catch(error => console.error('通信に失敗しました', error));
}, false);

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
    layout:"fitData",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [ 10 , 25 , 50 , 100 ],
    columns:[
      {title:"No.", field:"no", headerFilter:true},
      {title:"注釈", field:"cw", tooltip:true, headerFilter:true, headerSort:false, maxWidth:200},
      {title:"本文", field:"text", tooltip:true, headerFilter:true, headerSort:false, maxWidth:600},
      {title:"日付", field:"date", tooltip:true, headerFilter:true, headerSort:false, formatter:"link", formatterParams:{
        url:link,
        labelField:"date",
        target:"_blank",
      }},
    ],
  });
}