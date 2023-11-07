export const onRequestGet = async () => {
  return new Response("Hello, world!")
}

export const onRequestPost = async (context) => {
  const body = await request.text();
  const json = await (await fetch(body, {mode: 'cors'})).text();
  return new Response(json, {
    headers: {
      'Access-Control-Allow-Origin': 'https://jsonreader.pages.dev/',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Origin',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': 'X-Expose-Header',
    }
  });
  // return new Response("Hello, world!")
  // return new Response(JSON.stringify(context))
}