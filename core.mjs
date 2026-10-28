export function numbers(count, excluded='') {
  if(!Number.isInteger(count)||count<1||count>500) throw Error('전체 인원은 1~500 사이의 정수로 입력하세요.');
  const tokens=excluded.trim()?excluded.trim().split(/[\s,]+/):[];
  if(tokens.some(x=>!/^\d+$/.test(x)||Number(x)<1||Number(x)>count)) throw Error('제외 번호는 전체 인원 범위에서 쉼표로 구분하세요.');
  const skip=new Set(tokens.map(Number));
  return Array.from({length:count},(_,i)=>i+1).filter(n=>!skip.has(n));
}
function randomInt(n){const limit=4294967296-4294967296%n;const a=new Uint32Array(1);do{crypto.getRandomValues(a);}while(a[0]>=limit);return a[0]%n;}
export function shuffle(input){const a=[...input];for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function makeGroups(input,count){if(!Number.isInteger(count)||count<1||count>input.length)throw Error('모둠 수는 참여 인원 이하의 양의 정수로 입력하세요.');const g=Array.from({length:count},()=>[]);shuffle(input).forEach((n,i)=>g[i%count].push(n));return g;}
export function safeURL(value){let u;try{u=new URL(value);}catch{throw Error('올바른 HTTPS 주소를 입력하세요.');}const h=u.hostname.toLowerCase();if(u.protocol!=='https:'||u.username||u.password||!h.includes('.')||h.includes(':')||/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h)||h.endsWith('.local'))throw Error('인증정보 없는 공개 HTTPS 주소만 추가할 수 있습니다.');let params;try{params=decodeURIComponent(u.search+'&'+u.hash);}catch{throw Error('주소의 인코딩을 확인하세요.');}if(/(?:[?&#]|^)(?:access[_-]?token|refresh[_-]?token|id[_-]?token|api[_-]?key|secret|password|authorization|code)=/i.test(params))throw Error('인증 토큰이나 비밀번호가 포함된 주소는 저장할 수 없습니다.');return u.href;}
