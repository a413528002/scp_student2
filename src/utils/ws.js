export function getWsUrl(){
  const loc = window.location
  if (loc.protocol === 'http:') {
    return "ws://" + loc.host + "/api/scp-ws"
  } else if(loc.protocol === 'https:') {
    return "wss://" + loc.host + "/api/scp-ws"
  } else throw new Error('Protocol not supported');
}
