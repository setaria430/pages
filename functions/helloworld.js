export const onRequestGet = async () => {
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
    return new Response(value);
  })
  .catch(error => console.error('通信に失敗しました', error));
  // return new Response("Hello, world!")
}

export const onRequestPost = async (context) => {
  const body = await request.text();
  const json = await (await fetch(body)).text();
  return new Response(json, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
  // return new Response(JSON.stringify(context))
}