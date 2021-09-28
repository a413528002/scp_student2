export function getWsUrl(){
  // console.log(NODE_API)
  const loc = window.location
  if (loc.protocol === 'http:') {
    return `ws://${loc.host}${NODE_API}/scp-ws`
    // "ws://" + loc.host + "/scp-api/scp-ws"
  } else if(loc.protocol === 'https:') {
    return `wss://${loc.host}${NODE_API}/scp-ws`
    // "wss://" + loc.host + "/scp-api/scp-ws"
  } else throw new Error('Protocol not supported');
}
