export function onRequestGet(context) {
  return new Response("Hello, world!")
}

export function onRequestPost(context) {
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