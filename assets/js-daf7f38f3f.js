
(() => {
const C = window.OLIMPO, API = "https://api.centralcart.io/v1", DEMO = !C.storeDomain;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const REDUZ = matchMedia("(prefers-reduced-motion: reduce)").matches;
// modo leve: celular/tablet, aparelho fraco ou economia de dados → menos resolução e menos quadros nas animações de fundo
const LEVE = REDUZ || matchMedia("(pointer:coarse)").matches || innerWidth < 820 || (navigator.hardwareConcurrency||8) <= 4 || (navigator.deviceMemory||8) <= 4 || !!(navigator.connection && navigator.connection.saveData);
document.documentElement.classList.toggle("leve", LEVE);
const OCULTO = () => document.hidden;   // aba em segundo plano: tudo para
document.addEventListener("visibilitychange",()=>document.documentElement.classList.toggle("pausa",document.hidden));
// anima só o que está perto da tela
const VISTA = ("IntersectionObserver" in window) ? new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("fora",!e.isIntersecting)),{rootMargin:"120px"}) : null;
addEventListener("DOMContentLoaded",()=>{ if (VISTA) document.querySelectorAll(".vt3-anel").forEach(el=>VISTA.observe(el)); });
const brl = v => (Number(v)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const enc = encodeURIComponent;
// ---- "Apoie um criador": só aceita os códigos da lista "criadores" da configuração
const criadorDe = cod => { const c=String(cod||"").trim().toLowerCase(); return c ? (C.criadores||[]).find(n=>String(n).toLowerCase()===c)||null : null; };
let criadorSalvo=""; try { criadorSalvo=localStorage.getItem("olimpo_criador")||""; } catch {}
const salvarCriador = v => { criadorSalvo=v||""; try { v ? localStorage.setItem("olimpo_criador",v) : localStorage.removeItem("olimpo_criador"); } catch {} };
// liga um campo de criador: mostra o check quando o código é de um criador parceiro e lembra a escolha
function campoCriador(inp, st){
  if (!inp || !st) return;
  const at=()=>{ const v=inp.value.trim(), ok=criadorDe(v);
    inp.classList.toggle("cr-ok",!!ok); inp.classList.toggle("cr-no",!!v && !ok);
    st.className="cr-st"+(ok?" ok":v?" no":"");
    st.innerHTML = ok ? `<span class="cr-check">✓</span>Código de criador aplicado` : v ? "Código de criador não encontrado" : "";
    if (!v || ok) salvarCriador(ok?v:"");
    document.querySelectorAll("[data-criador]").forEach(o=>{ if (o!==inp && document.activeElement!==o && o.value.trim().toLowerCase()!==(ok||"").toLowerCase() && (!v||ok)){ o.value=v; o.dispatchEvent(new Event("sync")); } }); };
  inp.dataset.criador="1"; inp.addEventListener("input",at); inp.addEventListener("sync",at); at();
}
const corpo = n => `https://mc-heads.net/body/${enc(n)}`;
const corpoAlt = n => `https://visage.surgeplay.com/full/320/${enc(n)}`;
const cabeca = (n,s=40) => `https://mc-heads.net/avatar/${enc(n)}/${s}`;
const STEVE = "data:image/svg+xml," + enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shape-rendering="crispEdges"><rect width="8" height="8" fill="#2b1e0f"/><rect y="3" width="8" height="5" fill="#b78a68"/><rect x="1" y="4" width="2" height="1" fill="#fff"/><rect x="5" y="4" width="2" height="1" fill="#fff"/><rect x="2" y="4" width="1" height="1" fill="#4a3a8a"/><rect x="5" y="4" width="1" height="1" fill="#4a3a8a"/><rect x="3" y="6" width="2" height="1" fill="#6a4030"/></svg>`);
const imgHead = (n,s,cls="av") => `<img class="${cls}" src="${cabeca(n,s)}" alt="${esc(n)}" width="${s}" height="${s}" onerror="this.onerror=null;this.src='${STEVE}'">`;
// history pode falhar em pré-visualizações (iframe/srcdoc); nunca deixa o site quebrar
const corVip = nome => { const n=String(nome||"").toLowerCase(); const k=Object.keys(C.vips||{}).find(k=>n.includes(k.toLowerCase())); return k ? C.vips[k] : null; };
const vipStyle = nome => { const c=corVip(nome); return c ? `style="--g1:${c[0]};--g2:${c[1]}"` : ""; };
const semAcento = t => String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const chaveDe = nome => { const n=semAcento(nome); if (!/chave/.test(n)) return null; const k=Object.keys(C.chaves||{}).find(k=>n.includes(semAcento(k))); return k ? C.chaves[k] : null; };
// chaves-relíquia em pixel art: a cabeça é a arma de um deus, o cabo termina numa chave (dentes + argola)
const CABECAS = {
  tridente: [
    "B.....B.....B..",
    "OO....OO....OO.",
    "OLO..OLDO..OLO.",
    "OLO..OLDO..OLO.",
    "OLO..OLDO..OLO.",
    "OMO..OLDO..OMO.",
    "OMO..OLDO..OMO.",
    "OMDO.OLDO.ODMO.",
    "OMMDOOLDOODMMO.",
    ".OMMMMMMMMMMO..",
    "..OOOGGGGOOO...",
    "....OGLGGO....."],
  bidente: [
    "..B.......B....",
    "..OO......OO...",
    "..OLO....OLO...",
    "..OLO....OLO...",
    "..OLO....OLO...",
    "..OMO....OMO...",
    ".OMDO....ODMO..",
    "OMDO......ODMO.",
    ".OMMOOOOOOMMO..",
    "..OMMMMMMMMO...",
    "...OOOGGGOO....",
    ".....OGLGO....."],
  lanca: [
    "......B........",
    "......OO.......",
    ".....OLDO......",
    ".....OLDO......",
    "....OLMMDO.....",
    "....OLMMDO.....",
    "...OLMMMMDO....",
    "...OLMMMMDO....",
    "...OLMMMMDO....",
    "....OLMMDO.....",
    "....OLMMDO.....",
    ".....OLDO......",
    "..OOOGGGGOOO...",
    "..OGGGLGGGGO...",
    "....OOGGOO....."]
};
const _haste = ".....OLDO......", _anel = ".....OGGO......";
const CORPO = [
  _haste,_haste,_haste,_anel,_haste,_haste,_haste,_haste,_haste,_anel,_haste,_haste,_haste,_haste,_haste,_anel,_haste,_haste,_haste,_haste,
  ".....OLDOOOO...", ".....OLMMMMDO..", ".....OLDOODO...", ".....OLDO.OO...", _haste,
  "....OGGGGO.....", "...OLMMMMDO....", "..OLO....ODO...", "..OLO....ODO...", "..OMO....ODO...", "...OMDDDDDO....", "....OOOOOO....."
];
function chaveSVG(k){
  const cores={O:"#070a14",L:`color-mix(in srgb,${k.cor} 45%,#fff)`,M:k.cor,D:k.cor2,G:"#F4C542",B:"#fff"};
  const px=[...(CABECAS[k.arma]||CABECAS.tridente),...CORPO];
  let r="";
  px.forEach((linha,y)=>[...linha].forEach((c,x)=>{ if (cores[c]) r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${cores[c]}"/>`; }));
  return `<svg class="chave-px" viewBox="0 0 15 ${px.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
let chaveSeq=0;
// olhos que observam do escuro: kraken no mar, cérbero no submundo, medusa no templo
const OLHOS = {
  tridente: [[16,22,5],[82,16,4]],
  bidente:  [[12,20,4],[20,16,4],[28,21,4],[86,24,3]],
  lanca:    [[22,30,3],[80,26,4]]
};
const TEMAS = {
  tridente: { ceu:"#020a14,#052434 45%,#0a4a5c 75%,#127482", nuv:"0 0 0 0 .55  0 0 0 0 .85  0 0 0 0 .95  0 0 0 -2.3 1.45", chao:"0 0 0 0 .75  0 0 0 0 .98  0 0 0 0 1  0 0 0 -2.6 1.6", freq:".02 .16" },
  bidente:  { ceu:"#080102,#250504 45%,#5a0d05 75%,#a8320a", nuv:"0 0 0 0 .22  0 0 0 0 .18  0 0 0 0 .2  0 0 0 -2 1.3",  chao:"0 0 0 0 1  0 0 0 0 .55  0 0 0 0 .1  0 0 0 -2.4 1.55", freq:".03 .07" },
  lanca:    { ceu:"#020604,#08180d 45%,#103320 75%,#1c5a2c", nuv:"0 0 0 0 .55  0 0 0 0 .95  0 0 0 0 .6  0 0 0 -2.4 1.4",  chao:"0 0 0 0 .5  0 0 0 0 .9  0 0 0 0 .55  0 0 0 -2.6 1.5", freq:".025 .1" }
};
const chaveArte = (nome) => { const k=chaveDe(nome); if (!k) return "";
  const t=TEMAS[k.arma]||TEMAS.tridente, id="ch"+(++chaveSeq);
  const parts = Array.from({length:10},(_,i)=>`<i class="cv-p" style="left:${(i*29+7)%96}%;--d:${(i*.37).toFixed(2)}s;--t:${(3+(i%4)*.8).toFixed(1)}s"></i>`).join("");
  const colunas = k.arma==="lanca" ? `<i class="cv-col" style="left:6%"></i><i class="cv-col" style="right:6%"></i>` : "";
  return `<div class="chave-arte cv-${k.arma}" style="--k1:${k.cor};--k2:${k.cor2};--ceu:linear-gradient(180deg,${t.ceu})">
    <div class="cv-ceu"></div>
    <svg class="cv-nuv" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <filter id="${id}a" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${t.freq}" numOctaves="5" seed="${4+chaveSeq}"/><feColorMatrix values="${t.nuv}"/></filter>
      <filter id="${id}b" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${t.freq}" numOctaves="4" seed="${11+chaveSeq}"/><feColorMatrix values="${t.chao}"/></filter>
      <linearGradient id="${id}g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${id}g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <mask id="${id}m1"><rect width="100" height="28" fill="url(#${id}g1)"/></mask><mask id="${id}m2"><rect y="40" width="100" height="23" fill="url(#${id}g2)"/></mask>
    </defs>
      <rect width="100" height="28" filter="url(#${id}a)" mask="url(#${id}m1)"/>
      <rect y="40" width="100" height="23" filter="url(#${id}b)" mask="url(#${id}m2)"/>
    </svg>
    <div class="cv-raios"></div>${colunas}
    <div class="cv-olhos">${(OLHOS[k.arma]||[]).map(([x,y,t],i)=>`<i style="left:${x}%;top:${y}%;--t:${t}px;--d:${(i*1.3).toFixed(1)}s"><b></b><b></b></i>`).join("")}</div>
    <div class="cv-aura"></div>
    <div class="cv-arma">${chaveSVG(k)}</div>
    ${parts}
    <div class="cv-vinheta"></div>
    <div class="cv-placa"><span class="cv-nome">${esc(k.nome.toUpperCase())}</span>${k.perigo?`<span class="cv-perigo" title="Perigo ${k.perigo||1} de 3">${[1,2,3].map(n=>`<i class="${n<=(k.perigo||1)?"on":""}">☠</i>`).join("")}</span>`:""}</div>
    <span class="ca-info">NÍVEL ALEATÓRIO · 30s</span>
  </div>`; };

const ehCash = nome => /\bcash\b/.test(semAcento(nome)) && !ehCombo(nome) && !!C.cash;
// cards usam a versão pequena das artes animadas (produtos/mini/...), bem mais leve de desenhar
const mini = u => { const m=String(u||"").match(/^(.*\/)?produtos\/([\w.-]+\.webp)(\?.*)?$/i); return m ? (m[1]||"")+"produtos/mini/"+m[2] : u; };
// desconto do próprio produto: compare_at (preço "de") definido na CentralCart
const deProd = p => { const pr=p?.pricing||{}, a=Number(pr.compare_at)||0, v=Number(pr.price)||0; return a>v ? a : 0; };
const pctProd = p => { const a=deProd(p), v=Number(p?.pricing?.price)||0; return a ? Math.round((1-v/a)*100) : 0; };
const ehCombo = nome => /\bcombo\b/.test(semAcento(nome)) && !!C.combo;
// preço somado dos itens do combo comprados separados (null se algum não estiver na loja)
const avulsoCombo = () => { const it=(C.combo||{}).itens||[]; let t=0;
  for (const n of it){ const q=prods.find(p=>semAcento(p.name)===semAcento(n)); if (!q) return null; t+=Number(q.pricing?.price)||0; } return t; };
const qtdCash = nome => (String(nome).match(/[\d.,]+\s*(k|mil)?/i)||[""])[0].trim();
// moeda em pixel art: círculo com contorno, luz em cima, sombra embaixo e a estrela do cash no meio
function moedaSVG(){
  const N=16, c=7.5, r=7.6, cores={O:"#3a1c00",L:"#FFF1A8",M:"#F4C542",D:"#C26F00",S:"#9A4A00",B:"#ffffff"};
  const estrela=["...S...","...S...","SSSSSSS",".SSSSS.","..SSS..",".SS.SS.",".S...S."];
  let r2="";
  for (let y=0;y<N;y++) for (let x=0;x<N;x++){
    const d=Math.hypot(x+.5-c-.5,y+.5-c-.5); if (d>r) continue;
    let k = d>r-1.15 ? "O" : (d>r-2.3 ? ((x+y)<14 ? "L" : (x+y)>17 ? "D" : "M") : "M");
    const ex=x-4, ey=y-4; if (k==="M" && estrela[ey] && estrela[ey][ex]==="S") k="S";
    if (x===4&&y===3) k="B";
    r2+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${cores[k]}"/>`;
  }
  return `<svg class="moeda-px" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${r2}</svg>`;
}
let cashSeq=0;
// raio em zigue-zague (com galhos) do topo até a moeda
function raioCaminho(x1,y1,x2,y2,seed){
  let r=seed; const rnd=()=>(r=(r*9301+49297)%233280)/233280;
  const pts=[[x1,y1]], n=9;
  for (let i=1;i<n;i++){ const t=i/n; pts.push([x1+(x2-x1)*t+(rnd()-.5)*9, y1+(y2-y1)*t+(rnd()-.5)*2]); }
  pts.push([x2,y2]);
  const galhos=[];
  [3,5,6].forEach(k=>{ const [gx,gy]=pts[k], dir=rnd()<.5?-1:1; galhos.push(`M${gx} ${gy} L${gx+dir*(5+rnd()*5)} ${gy+4+rnd()*4} L${gx+dir*(9+rnd()*6)} ${gy+9+rnd()*5}`); });
  return { tronco:"M"+pts.map(p=>p.map(v=>v.toFixed(1)).join(" ")).join(" L"), galhos };
}
// quanto cash vem no pacote (ex.: "1.250 Cash" -> 1250, "15k" -> 15000)
const valorCash = nome => { const q=qtdCash(nome); if (!q) return 0; const k=/k|mil/i.test(q); const v=Number(q.replace(/k|mil/ig,"").trim().replace(/\./g,"").replace(",","."))||0; return k?v*1000:v; };
// tabela do /kit: com "saldo", mostra só o que dá para pegar com aquele pacote
const tabelaCash = (saldo) => { const T=(C.cash||{}).tabela; if (!T) return ""; const n=v=>Number(v).toLocaleString("pt-BR");
  const lim=saldo>0?saldo:Infinity;
  const grupos=T.map(g=>{
    const nCols=Math.max(...g.itens.map(i=>i.length-1));
    // colunas que pelo menos um item consegue pagar
    const cols=[...Array(nCols).keys()].filter(c=>g.itens.some(i=>i[c+1]!=null&&i[c+1]<=lim));
    const itens=g.itens.filter(i=>cols.some(c=>i[c+1]!=null&&i[c+1]<=lim));
    if (!itens.length) return "";
    const cab=g.cab?`<div class="cs-l cab"><span></span>${cols.map(c=>`<em>${g.cab[c]}</em>`).join("")}</div>`:"";
    return `<div class="cs-g"><b>${esc(g.grupo)}</b>${cab}
    ${itens.map(([nm,...v])=>`<div class="cs-l"><span>${esc(nm)}</span>${cols.map(c=>v[c]!=null&&v[c]<=lim?`<em>${n(v[c])}</em>`:`<em class="nao">—</em>`).join("")}</div>`).join("")}</div>`;
  }).join("");
  const tit=saldo>0?`O QUE DÁ PARA PEGAR COM ${n(saldo)} CASH`:"O QUE DÁ PARA PEGAR NO /KIT";
  return `<div class="cs-tab"><div class="cs-tab-t">${tit}</div>${grupos}<p class="cs-obs">valores em cash</p></div>`; };
const cashArte = (nome) => {
  const q=qtdCash(nome), id="cs"+(++cashSeq), rz=raioCaminho(53,-2,50,37,7+cashSeq*13);
  const est = Array.from({length:16},(_,i)=>`<i class="cs-est" style="left:${(i*37+11)%100}%;top:${(i*23)%38}%;--d:${(i%5)*.6}s"></i>`).join("");
  const fa = Array.from({length:8},(_,i)=>{ const a=i/8*Math.PI*2; return `<i class="cs-fa" style="--dx:${(Math.cos(a)*34).toFixed(0)}px;--dy:${(Math.sin(a)*24-10).toFixed(0)}px;--d:${(i*.08).toFixed(2)}s"></i>`; }).join("");
  return `<div class="cash-arte" style="--k1:${C.cash.cor};--k2:${C.cash.cor2}">
    <div class="cs-ceu"></div>${est}
    <svg class="cs-nuv" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="${id}a" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .09" numOctaves="5" seed="${3+cashSeq}"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .6  0 0 0 0 .78  0 0 0 -2.4 1.55"/></filter>
        <filter id="${id}b" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".03 .11" numOctaves="5" seed="${9+cashSeq}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .82  0 0 0 0 .62  0 0 0 -2.2 1.5"/></filter>
        <linearGradient id="${id}m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <linearGradient id="${id}m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff"/></linearGradient>
        <mask id="${id}k1"><rect width="100" height="30" fill="url(#${id}m1)"/></mask>
        <mask id="${id}k2"><rect y="38" width="100" height="25" fill="url(#${id}m2)"/></mask>
      </defs>
      <rect width="100" height="30" filter="url(#${id}a)" mask="url(#${id}k1)" opacity=".9"/>
      <rect y="38" width="100" height="25" filter="url(#${id}b)" mask="url(#${id}k2)"/>
    </svg>
    <div class="cs-clarao"></div>
    <svg class="cs-raio" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="${rz.tronco}" stroke="var(--k2)" stroke-width="3.2" opacity=".35"/>
        <path d="${rz.tronco}" stroke="var(--k1)" stroke-width="1.4" opacity=".85"/>
        ${rz.galhos.map(g=>`<path d="${g}" stroke="var(--k1)" stroke-width=".7" opacity=".7"/>`).join("")}
        <path d="${rz.tronco}" stroke="#fff" stroke-width=".55"/>
      </g>
    </svg>
    <div class="cs-impacto"></div>
    <div class="cs-moeda">${moedaSVG()}</div>${fa}
    <span class="ca-tipo">${esc((q?q+" ":"")+"CASH")}</span><span class="ca-info">MOEDA PREMIUM</span>
  </div>`; };
const chaveVip = nome => { const n=String(nome||"").toLowerCase(); return Object.keys(C.vips||{}).find(k=>n.includes(k.toLowerCase())) || null; };
const tagHTML = (nome, cls="tag-vip") => { const k=chaveVip(nome), src=k && (window.OLIMPO_TAGS||{})[k]; return src ? `<img class="${cls}" src="${src}" alt="VIP ${esc(k[0].toUpperCase()+k.slice(1))}">` : ""; };
const nomeHTML = nome => { if (!corVip(nome) && !chaveDe(nome) && ehCash(nome)) return `<span class="vip-nome" style="--g1:${C.cash.cor};--g2:${C.cash.cor2}">${esc(nome)}</span>`; const k=chaveDe(nome); if (k && !corVip(nome)) return `<span class="vip-nome" style="--g1:${k.cor};--g2:${k.cor2}">${esc(nome)}</span>`; return nomeHTMLbase(nome); };
// texto que explica cada chave (usado no card, na janela do produto e quando a CentralCart não tiver descrição)
const textoChave = k => `${k.descricao}<ul class="ch-lista"><li><b>Nível:</b> sorteado na hora em que a masmorra abre.</li><li><b>Como usar:</b> clique direito com a chave no mundo principal. A chave só é gasta se o portal puder ser criado.</li><li><b>Entrada:</b> o portal abre 30 segundos depois e aceita entradas por 60 segundos. Até 15 jogadores, de qualquer facção.</li><li><b>PvP:</b> desligado. Masmorras abertas com chave são sempre sem PvP.</li><li><b>Entrega:</b> a chave cai direto no seu nick assim que o pagamento é aprovado.</li></ul>`;
const ICONES = {
  tag:'<path d="M3 3h8l10 10-8 8L3 11z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  back:'<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
  voar:'<path d="M2 16l20-8-7 12-3-5z"/>',
  tempo:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
  kit:'<rect x="3" y="7" width="18" height="13"/><path d="M8 7V4h8v3M3 12h18"/>',
  replay:'<rect x="3" y="5" width="18" height="14"/><path d="M10 9l5 3-5 3z"/>',
  fila:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  global:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  homes:'<path d="M3 11 12 4l9 7v9H3z"/><path d="M9 20v-6h6v6"/>',
  mercado:'<path d="M3 9h18l-2 11H5z"/><path d="M8 9a4 4 0 0 1 8 0"/>',
  bau:'<rect x="3" y="6" width="18" height="14"/><path d="M3 11h18M11 11v3h2v-3"/>',
  morte:'<path d="M12 21s-8-5-8-11a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 11-8 11z"/>',
  xp:'<path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
  vendas:'<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  desconto:'<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>'
};
const ico = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONES[k]||""}</svg>`;
const ORDEM_VIPS = () => Object.keys(C.vips||{});
const valorVip = (chave, k) => { const n=C.vantagens?.niveis?.[chave]; if (!n || n.valores[k]==null) return null; return `${n.mais?"+":""}${n.valores[k]}${n.sufixo}`; };
function resumoVip(k){ return [ `${valorVip("homes",k)} homes`, `${valorVip("mercado",k)} no mercado`, `${valorVip("desconto",k)} de desconto na loja` ].join(" · ").replace(/\+/g,""); }
// prévia do nick com a tag, como aparece no jogo
let nickPrevia = "";
function previaVip(k, nome){
  const cor=C.vips[k], nick = nickPrevia || (conta && conta.nick) || "SeuNick";
  const tag = tagHTML(nome,"pv-tag") || `<b class="vip-nome" style="--g1:${cor[0]};--g2:${cor[1]}">[${k.toUpperCase()}]</b>`;
  return `<div class="pv" style="--g1:${cor[0]};--g2:${cor[1]}">
    <div class="pv-ceu"></div>
    <div class="pv-tagnome">${tag}<span class="pv-nick vip-nome" style="--g1:${cor[0]};--g2:${cor[1]}">${esc(nick)}</span></div>
    <img class="pv-skin" src="https://mc-heads.net/body/${enc(nick)}/240" alt="" onerror="this.style.opacity=.0">
    <div class="pv-chat">
      <div>${tagHTML(nome,"pv-tag-p")||""}<span class="vip-nome" style="--g1:${cor[0]};--g2:${cor[1]}">${esc(nick)}</span><span class="pv-msg">: cheguei no Olimpo 👑</span></div>
      <div class="pv-sis">» ${esc(nick)} entrou no servidor sem enfrentar fila.</div>
    </div>
    <div class="pv-campo"><input id="pv-input" maxlength="16" placeholder="Digite seu nick para ver" value="${esc(nickPrevia || (conta&&conta.nick) || "")}"></div>
  </div>`;
}
function vantagensVip(k){
  const V=C.vantagens||{comuns:[],niveis:{}}, ordem=ORDEM_VIPS(), idx=ordem.indexOf(k);
  const blocos=Object.entries(V.niveis).map(([chave,n])=>{
    const ant = idx>0 ? n.valores[ordem[idx-1]] : null, at=n.valores[k];
    const sobe = ant!=null && at>ant ? `<em>▲ ${at-ant}${n.sufixo.trim()==="%"?"%":""} a mais que o ${ordem[idx-1][0].toUpperCase()+ordem[idx-1].slice(1)}</em>` : "";
    return `<div class="vt">${ico(chave)}<b>${valorVip(chave,k)}</b><span>${n.nome}</span>${sobe}</div>`;
  }).join("");
  const comuns=V.comuns.map(([i,t])=>`<li>${ico(i)}<span>${t}</span></li>`).join("");
  return `<div class="vt-grade" style="--g1:${C.vips[k][0]};--g2:${C.vips[k][1]}">${blocos}</div>
    <div class="vt-sub">INCLUSO EM TODOS OS VIPs</div><ul class="vt-lista">${comuns}</ul>
    <button type="button" class="btn vt-comparar" data-comparar>&gt; COMPARAR TODOS OS VIPs</button>`;
}
function tabelaVips(destaque){
  const V=C.vantagens, ordem=ORDEM_VIPS();
  const cab = ordem.map(k=>`<th class="${k===destaque?"on":""}" style="--g1:${C.vips[k][0]};--g2:${C.vips[k][1]}">${(window.OLIMPO_TAGS||{})[k]?`<img src="${window.OLIMPO_TAGS[k]}" alt="${k}">`:k}</th>`).join("");
  const linhas = Object.entries(V.niveis).map(([chave,n])=>`<tr><td><span class="cmp-n">${ico(chave)}${n.nome}</span></td>${ordem.map(k=>`<td class="${k===destaque?"on":""}">${valorVip(chave,k)}</td>`).join("")}</tr>`).join("")
    + V.comuns.map(([i,t])=>`<tr><td><span class="cmp-n">${ico(i)}${t.replace(/<[^>]+>/g,"")}</span></td>${ordem.map(k=>`<td class="${k===destaque?"on":""}"><span class="ok-x">✓</span></td>`).join("")}</tr>`).join("");
  return `<div class="cmp-wrap"><table class="cmp"><thead><tr><th>VANTAGEM</th>${cab}</tr></thead><tbody>${linhas}</tbody></table></div>`;
}
// ===== arte dos VIPs: emblemas gregos em vetor (sem pixel), um diferente para cada patente =====
function defsVip(id,c){
  return `<defs>
    <linearGradient id="${id}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".28" stop-color="#f7cf55"/><stop offset=".6" stop-color="#b8780e"/><stop offset=".85" stop-color="#f2c04a"/><stop offset="1" stop-color="#7a4a05"/></linearGradient>
    <linearGradient id="${id}oh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5506"/><stop offset=".45" stop-color="#ffe9a0"/><stop offset=".55" stop-color="#f6c94e"/><stop offset="1" stop-color="#8a5506"/></linearGradient>
    <linearGradient id="${id}v" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
    <radialGradient id="${id}e" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#1b2236"/><stop offset="1" stop-color="#03050b"/></radialGradient>
    <filter id="${id}s" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
  </defs>`;
}
const EMBLEMAS = {
  // Cavaleiro: elmo coríntio com crista e lanças cruzadas
  cavaleiro: (id) => `
    <g stroke="url(#${id}o)" stroke-width="5" stroke-linecap="round"><path d="M38 182 L162 22"/><path d="M162 182 L38 22"/></g>
    <path d="M162 22 l-12 6 6 6z M38 22 l12 6 -6 6z" fill="url(#${id}o)"/>
    <path d="M52 76 Q100 -8 148 76 L134 76 Q100 18 66 76 Z" fill="url(#${id}v)" stroke="#0a0c14" stroke-width="2"/>
    <g stroke="#0a0c1455" stroke-width="1.2" fill="none">${Array.from({length:9},(_,i)=>`<path d="M${62+i*9.5} ${74-Math.sin(i/8*Math.PI)*40} l${-2+i*.5} 8"/>`).join("")}</g>
    <path d="M60 78 Q60 34 100 32 Q140 34 140 78 L143 122 Q143 152 128 166 L113 172 L113 128 Q113 120 106 117 L106 100 L94 100 L94 117 Q87 120 87 128 L87 172 L72 166 Q57 152 57 122 Z" fill="url(#${id}o)" stroke="#2a1800" stroke-width="2.4"/>
    <path d="M70 92 Q100 82 130 92 L127 104 Q115 100 106 104 L106 154 L94 154 L94 104 Q85 100 73 104 Z" fill="url(#${id}e)"/>
    <path d="M66 70 Q72 44 100 40" fill="none" stroke="#fff8d8" stroke-width="3" stroke-linecap="round" opacity=".75"/>
    <path d="M60 80 Q100 70 140 80" fill="none" stroke="url(#${id}v)" stroke-width="4"/>
    <g fill="#fff3c4">${[70,82,118,130].map(x=>`<circle cx="${x}" cy="84" r="2"/>`).join("")}</g>`,
  // Lorde: asas de Pégaso em volta de um medalhão com louros
  lorde: (id) => {
    const asa = `<path d="M92 96 C70 62 40 50 8 56 C26 64 36 70 42 76 C24 76 14 82 6 94 C24 92 36 94 46 98 C32 102 24 110 18 122 C40 114 58 110 80 114 Z" fill="url(#${id}v)" stroke="url(#${id}o)" stroke-width="2.4" stroke-linejoin="round"/>
      <g fill="none" stroke="#ffffff55" stroke-width="1.3"><path d="M84 92 C64 74 42 66 20 62"/><path d="M82 100 C62 88 40 84 18 88"/><path d="M80 108 C62 102 46 104 30 112"/></g>`;
    return `<g transform="translate(0 6)">${asa}<g transform="translate(200 0) scale(-1 1)">${asa}</g></g>
      <circle cx="100" cy="102" r="36" fill="url(#${id}o)" stroke="#2a1800" stroke-width="2.4"/>
      <circle cx="100" cy="102" r="28" fill="url(#${id}e)" stroke="url(#${id}oh)" stroke-width="2"/>
      <g fill="url(#${id}v)">${Array.from({length:7},(_,i)=>{const a=(200+i*20)*Math.PI/180, x=100+Math.cos(a)*22, y=104+Math.sin(a)*-22; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="2.4" transform="rotate(${(i*20+110).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/><ellipse cx="${(200-x).toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="2.4" transform="rotate(${(-(i*20+110)).toFixed(0)} ${(200-x).toFixed(1)} ${y.toFixed(1)})"/>`;}).join("")}</g>
      <text x="100" y="114" text-anchor="middle" font-family="Michroma, sans-serif" font-size="30" fill="url(#${id}o)">Ω</text>`;
  },
  // Soberano: o raio de Zeus (keraunos) com energia
  soberano: (id) => { const raio="M88 94 L104 56 L92 56 L113 4 L119 7 L108 48 L122 48 L112 94 Z";
    return `
    <g filter="url(#${id}s)" opacity=".95" transform="translate(100 0) scale(1.75 1.04) translate(-100 -4)"><path d="${raio}" fill="url(#${id}v)"/><path d="${raio}" fill="url(#${id}v)" transform="rotate(180 100 102)"/></g>
    <g fill="none" stroke="url(#${id}v)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity=".95">
      <path d="M118 30 L146 22 L136 36 L166 30"/><path d="M84 72 L56 66 L66 80 L34 78"/><path d="M82 174 L54 182 L64 168 L34 174"/><path d="M116 132 L144 138 L134 124 L166 126"/></g>
    <g transform="translate(100 0) scale(1.6 1) translate(-100 0)">
    <path d="${raio}" fill="url(#${id}o)" stroke="#2a1800" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="${raio}" fill="url(#${id}o)" stroke="#2a1800" stroke-width="1.8" stroke-linejoin="round" transform="rotate(180 100 102)"/>
    <path d="M112 12 L104 46" stroke="#fff8d8" stroke-width="1.8" stroke-linecap="round" opacity=".8"/></g>
    <rect x="84" y="92" width="32" height="20" rx="4" fill="url(#${id}v)" stroke="url(#${id}o)" stroke-width="2.6"/>
    <g stroke="url(#${id}o)" stroke-width="2"><path d="M84 99h32M84 105h32"/></g>
    <circle cx="100" cy="102" r="3" fill="#fff"/>`; },
  // Imperador: o templo do Olimpo com estrela radiante no frontão
  imperador: (id) => `
    <path d="M100 18 L182 64 L18 64 Z" fill="url(#${id}o)" stroke="#2a1800" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M100 32 L156 58 L44 58 Z" fill="url(#${id}e)"/>
    <g transform="translate(100 47)"><path d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z" fill="url(#${id}v)"/><circle r="2.4" fill="#fff"/></g>
    <rect x="22" y="64" width="156" height="12" fill="url(#${id}oh)" stroke="#2a1800" stroke-width="2"/>
    <rect x="22" y="70" width="156" height="3" fill="url(#${id}v)"/>
    ${[36,64,92,120,148].map(x=>`<g><rect x="${x}" y="80" width="16" height="78" fill="url(#${id}oh)" stroke="#2a1800" stroke-width="1.8"/><path d="M${x+5} 84 v70 M${x+11} 84 v70" stroke="#7a4a0577" stroke-width="1.4"/><rect x="${x-3}" y="76" width="22" height="6" fill="url(#${id}o)" stroke="#2a1800" stroke-width="1.4"/></g>`).join("")}
    <rect x="16" y="158" width="168" height="10" fill="url(#${id}oh)" stroke="#2a1800" stroke-width="2"/>
    <rect x="8" y="168" width="184" height="12" fill="url(#${id}o)" stroke="#2a1800" stroke-width="2"/>
    <rect x="8" y="172" width="184" height="3" fill="url(#${id}v)"/>`
};
const NOMES_EMB = { cavaleiro:"Elmo do Cavaleiro", lorde:"Asas de Pégaso", soberano:"Raio de Zeus", imperador:"Templo do Olimpo" };
let vipSeq=0;
function vipArte(nome){
  const k=chaveVip(nome); if (!k || !EMBLEMAS[k]) return "";
  const c=C.vips[k], ordem=ORDEM_VIPS(), n=ordem.indexOf(k)+1, id="va"+(++vipSeq), romano=["I","II","III","IV","V"][n-1]||n;
  const parts=Array.from({length:9},(_,i)=>`<i class="va-p" style="left:${(i*31+9)%94}%;--d:${(i*.45).toFixed(2)}s"></i>`).join("");
  return `<div class="vip-arte va-${k}" style="--g1:${c[0]};--g2:${c[1]};--k1:${c[0]};--k2:${c[1]}">
    <div class="va-ceu"></div>
    <svg class="va-nuv" viewBox="0 0 100 62.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <filter id="${id}f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".028 .12" numOctaves="5" seed="${20+vipSeq}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.5 1.45"/></filter>
      <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <mask id="${id}m"><rect y="34" width="100" height="29" fill="url(#${id}g)"/></mask></defs>
      <rect y="34" width="100" height="29" filter="url(#${id}f)" mask="url(#${id}m)" opacity=".5"/>
    </svg>
    <div class="va-raios"></div>
    <div class="va-halo"></div>
    <svg class="va-emb" viewBox="0 0 200 200" aria-hidden="true">${defsVip(id,c)}${EMBLEMAS[k](id)}</svg>
    <div class="va-faixa"><span>${esc(k.toUpperCase())}</span></div>
    ${parts}
  </div>`;
}
// botão de comprar com efeito do tema: lava (Infernal), água (Santuário), espectro (Calabouço), raio (Cash), brilho (VIPs)
function botaoFx(p, vip, ch, cs){
  const fx = vip ? "vip" : ch ? ({bidente:"lava",tridente:"agua",lanca:"espectro"}[ch.arma]||"") : cs ? "raio" : "";
  // gotas escorrendo por baixo em todos os botões (na cor do tema)
  let extra = fx ? [12,31,58,74,90].map((x,i)=>`<i class="gota" style="left:${x}%;--d:${(i*.7+(p.id%3)*.3).toFixed(1)}s;--h:${8+((i+p.id)*5)%9}px"></i>`).join("") : "";
  if (fx==="agua") extra+=[15,35,55,72,88].map((x,i)=>`<i class="bolha" style="left:${x}%;--d:${(i*.35).toFixed(2)}s"></i>`).join("");
  if (fx==="espectro") extra+=[10,26,44,60,78,92].map((x,i)=>`<i class="chama" style="left:${x}%;--d:${(i*.27).toFixed(2)}s"></i>`).join("");
  if (fx==="raio") extra+=`<svg class="zap z1" viewBox="0 0 10 24"><path d="M6 0 1 13h4l-2 11 6-15H5z"/></svg><svg class="zap z2" viewBox="0 0 10 24"><path d="M6 0 1 13h4l-2 11 6-15H5z"/></svg>`+[20,40,60,80].map((x,i)=>`<i class="moedinha" style="left:${x}%;--d:${(i*.12).toFixed(2)}s"></i>`).join("");
  if (fx==="vip") extra+=[18,50,82].map((x,i)=>`<i class="faisca" style="left:${x}%;--d:${(i*.4).toFixed(1)}s">✦</i>`).join("");
  return `<div class="bt-wrap ${fx?"fx-"+fx:""}"><button class="btn" data-ver="${p.id}"><span class="bt-txt">&gt; COMPRAR</span></button>${extra?`<span class="fx" aria-hidden="true">${extra}</span>`:""}</div>`;
}
const resumoProd = p => { if (ehCombo(p.name)) return C.combo.resumo; const kv=chaveVip(p.name); if (kv && C.vantagens) return resumoVip(kv); const k=chaveDe(p.name); if (k) return k.resumo; if (ehCash(p.name)) return ((C.cash.bonus||{})[p.name] ? C.cash.bonus[p.name]+" · " : "")+C.cash.resumo; const t=String(p.description||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(); return t; };
const nomeHTMLbase = nome => corVip(nome) ? `<span class="vip-nome" ${vipStyle(nome)}>${esc(nome)}</span>` : esc(nome);
const hist = url => { try { history.replaceState(null, "", url); } catch {} };

/* ---------- textos ---------- */
{ const src = C.logo || window.OLIMPO_LOGO; const li=$("#logo-img"); li.src = src; li.alt = C.rede.charAt(0)+C.rede.slice(1).toLowerCase();
  const br=$("#logo-brilho"); br.style.webkitMaskImage = br.style.maskImage = `url("${src}")`; } document.title = C.rede.charAt(0)+C.rede.slice(1).toLowerCase()+" — Servidor de Minecraft"; $("#ip-txt").textContent = C.ip; $("#r-dom").textContent = C.dominio;
$("#ano").textContent = new Date().getFullYear(); $("#p-discord").href = C.discord;


/* ---------- toast / copiar ---------- */
let tt; const toast = m => { const t=$("#toast"); t.textContent=m; t.classList.add("on"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("on"),2400); };
// copia com 2 métodos (API moderna e o método clássico), para funcionar em qualquer navegador/janela
const copiar = async (txt,msg,el) => {
  let ok=false;
  try { if (navigator.clipboard && window.isSecureContext){ await navigator.clipboard.writeText(txt); ok=true; } } catch {}
  if (!ok){ try { const ta=document.createElement("textarea"); ta.value=txt; ta.setAttribute("readonly",""); ta.style.cssText="position:fixed;top:-1000px;left:0;opacity:0";
    document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0,txt.length); ok=document.execCommand("copy"); ta.remove(); } catch {} }
  toast(ok ? msg : `> não deu pra copiar automático: ${txt}`);
  if (el){ el.classList.remove("copiado","falhou"); void el.offsetWidth; el.classList.add(ok?"copiado":"falhou"); clearTimeout(el._cp); el._cp=setTimeout(()=>el.classList.remove("copiado","falhou"),2200); }
  return ok;
};
$("#p-ip").onclick = () => copiar(C.ip, "> IP copiado — cole no Minecraft", $("#p-ip"));

/* ---------- status do servidor ---------- */
fetch(`https://api.mcsrvstat.us/3/${enc(C.ip)}`).then(r=>r.json()).then(d => {
  const s=$("#status");
  if (d.online){ s.classList.add("on"); s.innerHTML=`<i></i>${d.players?.online ?? 0}/${d.players?.max ?? "?"} jogando agora`; $("#status-barra").textContent="ONLINE";
    $("#hi-online").classList.add("on"); const ist=$("#ip-st"); if (ist) ist.textContent=`${d.players?.online ?? 0} jogando agora · clique para copiar`; $("#p-ip")?.classList.add("on"); const bd=$("#ip-badge"); if (bd) bd.textContent="ONLINE"; $("#hi-jog").textContent=`${d.players?.online ?? 0} / ${d.players?.max ?? "?"}`; }
  else { s.innerHTML=`<i></i>servidor offline`; $("#status-barra").textContent="OFFLINE"; $("#hi-jog").textContent="offline"; const bd=$("#ip-badge"); if (bd) bd.textContent="OFFLINE"; }
}).catch(() => { $("#status").innerHTML = `<i></i>status indisponível`; $("#hi-jog").textContent="—"; });

/* ---------- céu realista (WebGL): pôr do sol, estrelas, nuvens altas e mar de nuvens ---------- */
const CEU = { mx:0, my:0 };
(() => {
  const cv=$("#ceu"), gl=cv.getContext("webgl",{antialias:false,alpha:false,premultipliedAlpha:false});
  if (!gl) { cv.remove(); return; }          // sem WebGL: fica o degradê do CSS
  const vs=`attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
  const fs=`precision highp float;
  uniform vec2 R; uniform float T; uniform vec2 M;
  float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
  float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}
  void main(){
    vec2 uv=gl_FragCoord.xy/R; float asp=R.x/R.y;
    vec2 q=vec2((uv.x-.5)*asp, uv.y);
    float hz=.40+M.y*.015;
    vec2 sun=vec2(-M.x*.04, hz+.03);
    float y=q.y-hz, t=clamp(y/(1.-hz),0.,1.);
    vec3 zen=vec3(.016,.04,.11), mid=vec3(.09,.18,.38), hor=vec3(.98,.60,.32);
    vec3 sky=mix(hor,mid,smoothstep(0.,.32,t)); sky=mix(sky,zen,smoothstep(.28,1.,t));
    float ds=length((q-sun)*vec2(1.,1.3));
    sky+=vec3(1.,.66,.36)*exp(-ds*5.)*.55 + vec3(1.,.92,.75)*exp(-ds*38.)*.9;
    vec3 col=sky;
    if (y>0.){
      vec2 gq=q*330.; vec2 g=floor(gq); float h=hash(g); vec2 fq=fract(gq)-.5;
      float st=step(.9972,h)*smoothstep(.45,.0,length(fq))*smoothstep(.18,.7,t)*(.55+.45*sin(T*1.7+h*80.))*1.3;
      col+=vec3(st);
      float z=y+.05; vec2 p=vec2(q.x/z, 1./z)*vec2(.42,.30);
      p.x+=T*.006+M.x*.15; p.y+=T*.002;
      float d=fbm(p*1.4); float d2=fbm(p*1.4+vec2(.05,-.08));
      float dens=smoothstep(.52,.86,d)*smoothstep(0.,.10,y)*smoothstep(1.,.35,t);
      float luz=clamp((d-d2)*5.+.5,0.,1.);
      vec3 base=mix(vec3(.16,.19,.32),vec3(.42,.42,.55),smoothstep(.0,.5,t));
      vec3 borda=vec3(1.,.70,.45)*exp(-abs(q.x-sun.x)*1.2)*smoothstep(.45,.0,y);
      vec3 cc=base+borda*luz*1.1;
      col=mix(col,cc,dens*.85);
    }
    if (y<.012){
      float yy=max(hz-q.y+.014,.014), depth=1./yy;
      vec2 p=vec2(q.x*depth, depth)*vec2(.50,.36);
      p.x+=M.x*.5+T*.004; p.y+=T*.035;
      float d=fbm(p*.85), d2=fbm(p*.85+vec2(.05,.09));
      float d3=fbm(p*.85*2.3+vec2(T*.01,0.));
      float dens=smoothstep(.40,.70,d+d3*.16);
      float luz=clamp((d-d2)*4.5+.45,0.,1.);
      vec3 sombra=vec3(.20,.25,.40), clara=vec3(1.,.84,.64);
      vec3 c=mix(sombra,clara,luz)+vec3(.10,.08,.06)*dens;
      vec3 fundo=vec3(.08,.12,.23);
      vec3 mar=mix(fundo,c,dens*.92+.08);
      float nevoa=exp(-yy*6.5);
      mar=mix(mar,hor*.92+vec3(.04,.03,.05),nevoa*.88);
      mar+=vec3(1.,.66,.38)*exp(-abs(q.x-sun.x)*2.2)*nevoa*.28;
      col=mix(col,mar,smoothstep(.012,-.006,y));
    }
    col*=mix(.72,1.,smoothstep(1.25,.25,length((uv-.5)*vec2(1.1,1.4))));
    col=pow(col,vec3(1.06))*.9;
    gl_FragColor=vec4(col,1.);
  }`;
  const sh=(tipo,src)=>{ const o=gl.createShader(tipo); gl.shaderSource(o,src); gl.compileShader(o); if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o); return o; };
  let pr;
  try { pr=gl.createProgram(); gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs)); gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(pr); gl.useProgram(pr); }
  catch(e){ console.warn("céu WebGL indisponível:",e); cv.remove(); return; }
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const la=gl.getAttribLocation(pr,"a"); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la,2,gl.FLOAT,false,0,0);
  const uR=gl.getUniformLocation(pr,"R"), uT=gl.getUniformLocation(pr,"T"), uM=gl.getUniformLocation(pr,"M");
  // renderiza em resolução reduzida (as nuvens são macias) e o navegador amplia
  const escala = () => LEVE ? .28 : .34;
  const tam=()=>{ const k=escala(); cv.width=Math.round(innerWidth*k); cv.height=Math.round(innerHeight*k); gl.viewport(0,0,cv.width,cv.height); };
  tam(); addEventListener("resize", ()=>{ tam(); if (REDUZ) desenhar(0); });
  let t0=performance.now(), ultimo=0, pmx=0, pmy=0;
  function desenhar(agora){
    pmx+=(CEU.mx-pmx)*.05; pmy+=(CEU.my-pmy)*.05;
    gl.uniform2f(uR,cv.width,cv.height); gl.uniform1f(uT,REDUZ?40:(agora-t0)/1000); gl.uniform2f(uM,pmx,-pmy);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function loop(agora){ if (agora-ultimo>=(LEVE?90:66) && document.body.dataset.view!=="home" && !OCULTO()){ ultimo=agora; desenhar(agora); } requestAnimationFrame(loop); }
  REDUZ ? desenhar(0) : requestAnimationFrame(loop);
})();

/* ---------- camada de cima: ilhas flutuantes em voxel, véus de nuvem e brasas ---------- */
(() => {
  const cv=$("#chuva"), cx=cv.getContext("2d");
  let W=0,H=0,dpr=1, pmx=0,pmy=0, ilhas=[], ilhaSprites=null, veus=[], veuSprites=[], brasas=[];
  const rndSeed = seed => { let r=seed; return () => (r=(r*9301+49297)%233280)/233280; };
  function spriteVeu(seed){
    const w=520,h=200,c=document.createElement("canvas"); c.width=w; c.height=h;
    const g=c.getContext("2d"), rnd=rndSeed(seed);
    for (let i=0;i<22;i++){
      const rad=34+rnd()*58, x=rad+rnd()*(w-rad*2), y=Math.min(h-rad,Math.max(rad,h*.6+(rnd()-.5)*h*.25));
      const gr=g.createRadialGradient(x,y,0,x,y,rad);
      gr.addColorStop(0,"rgba(255,236,215,.7)"); gr.addColorStop(.6,"rgba(220,200,200,.3)"); gr.addColorStop(1,"rgba(200,190,200,0)");
      g.fillStyle=gr; g.beginPath(); g.arc(x,y,rad,0,Math.PI*2); g.fill();
    }
    g.globalCompositeOperation="source-atop";
    const sh=g.createLinearGradient(0,0,0,h); sh.addColorStop(0,"rgba(255,200,140,.4)"); sh.addColorStop(1,"rgba(50,70,120,.55)");
    g.fillStyle=sh; g.fillRect(0,0,w,h);
    return c;
  }
  function spriteIlha(seed, haze){
    const rnd=rndSeed(seed), L=22+Math.floor(rnd()*20), prof=Math.floor(L*.55), cascata=26;
    const topo=8, w=L+2, h=topo+prof+cascata, c=document.createElement("canvas"); c.width=w; c.height=h;
    const g=c.getContext("2d"), px=(x,y,cor)=>{ g.fillStyle=cor; g.fillRect(x,y,1,1); };
    const meio=L/2, base=topo, fundo=[];
    for (let x=0;x<L;x++){
      const dist=Math.abs(x+.5-meio)/meio;
      const d=Math.max(2, Math.round(prof*(1-Math.pow(dist,1.4)) + (rnd()-.5)*3)); fundo.push(d);
      for (let y=0;y<d;y++){
        let cor;
        if (y===0) cor = rnd()>.3 ? "#6FB343" : "#5C9C36";
        else if (y<3) cor = rnd()>.5 ? "#7A5233" : "#6A4529";
        else if (rnd()>.93) cor = "#E0262B";
        else cor = rnd()>.5 ? "#6F6F7A" : "#5B5B67";
        if (y===d-1 && rnd()>.4) cor="#4A4A55";
        g.globalAlpha=1; px(x+1,base+y,cor);
        if (x<meio){ g.globalAlpha=.12; px(x+1,base+y,"#ffb070"); }        // lado virado pro sol
        else { g.globalAlpha=.22; px(x+1,base+y,"#000"); }
      }
    }
    g.globalAlpha=1;
    const arv=2+Math.floor(rnd()*(L*.3));
    for (let y=1;y<=4;y++) px(arv+1,base-y,"#5A3A20");
    for (let dx=-2;dx<=2;dx++) for (let dy=4;dy<=6;dy++) if (Math.abs(dx)+(dy-4)<4) px(arv+1+dx,base-dy,rnd()>.4?"#3E8A2E":"#4FA23A");
    const ru=Math.floor(L*.6)+Math.floor(rnd()*3), alt=2+Math.floor(rnd()*3);
    for (let y=1;y<=alt;y++){ px(ru+1,base-y,"#9A9AA6"); px(ru+3,base-y,"#9A9AA6"); }
    if (alt>2) for (let x=ru;x<=ru+4;x++) px(x+1,base-alt-1,"#B3B3BE");
    const cr=Math.floor(meio)+(rnd()>.5?1:-1);
    px(cr+1,base-1,"#FF3B3B"); px(cr+1,base-2,"#FF6B6B"); px(cr,base-1,"#C81F24"); px(cr+2,base-1,"#C81F24"); px(cr+1,base-3,"#FFB0B0");
    const lado = rnd()>.5 ? Math.floor(L*.18) : Math.floor(L*.8);
    for (let y=fundo[lado]; y<prof+cascata; y++){
      g.globalAlpha=Math.max(0,1-(y-fundo[lado])/(prof+cascata-fundo[lado])); px(lado+1,base+y, y%3===0?"#FF5A5A":"#E0262B");
    }
    g.globalAlpha=1;
    if (haze){ g.globalCompositeOperation="source-atop"; g.fillStyle=haze; g.fillRect(0,0,w,h); }
    return c;
  }
  function novaBrasa(inicio){
    return {x:Math.random()*W, y:inicio?Math.random()*H:H+10, t:1.2+Math.random()*2.4, v:.2+Math.random()*.5, osc:Math.random()*Math.PI*2, vida:0, max:300+Math.random()*400, cor:Math.random()>.4?"255,196,80":"255,226,150"};
  }
  function montar(){
    dpr=LEVE?1:Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight;
    cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+"px"; cv.style.height=H+"px"; cx.setTransform(dpr,0,0,dpr,0,0);
    if (!veuSprites.length) veuSprites=[3,17,31].map(spriteVeu);
    const mob=W<700, b=mob?.7:1;
    // horizonte do céu fica em ~60% da altura (de cima para baixo)
    ilhas=[];   // ilhas em voxel removidas: céu limpo com estrelas cadentes
    veus=[{y:.70,esc:1,vel:.12,alpha:.22,z:.4},{y:.92,esc:1.6,vel:.26,alpha:.30,z:.8}].map((d,k)=>{
      const w=520*d.esc*(mob?.8:1), qtd=Math.ceil(W/(w*.7))+2;
      return {...d,w,h:200*d.esc,n:Array.from({length:qtd},(_,i)=>({x:i*w*.7-w*.3,s:veuSprites[(i+k)%3],dy:(Math.random()-.5)*24*d.esc}))};
    });
    brasas=Array.from({length:LEVE?12:34},()=>novaBrasa(true));
  }
  function ilha(o,t){
    const w=o.s.width*o.bloco, h=o.s.height*o.bloco;
    if (!REDUZ){ o.px-=o.vx; if (o.px<-w) o.px=W+w*.2; }
    const x=o.px-pmx*40*o.z, y=H*o.y+Math.sin(t*.02+o.f)*18*o.z-pmy*30*o.z;
    // sombra difusa sobre as nuvens
    const sg=cx.createRadialGradient(x+w/2,y+h*.75,0,x+w/2,y+h*.75,w*.6);
    sg.addColorStop(0,`rgba(10,15,35,${.22*o.z})`); sg.addColorStop(1,"rgba(10,15,35,0)");
    cx.fillStyle=sg; cx.fillRect(x-w*.2,y+h*.4,w*1.4,h*.7);
    cx.imageSmoothingEnabled=false; cx.drawImage(o.s,Math.round(x),Math.round(y),Math.round(w),Math.round(h)); cx.imageSmoothingEnabled=true;
  }
  function veu(v){
    cx.globalAlpha=v.alpha;
    for (const n of v.n){
      if (!REDUZ){ n.x-=v.vel; if (n.x<-v.w) n.x+=v.n.length*v.w*.7; }
      cx.drawImage(n.s,n.x-pmx*40*v.z,H*v.y-v.h*.6+n.dy-pmy*20*v.z,v.w,v.h);
    }
    cx.globalAlpha=1;
  }
  /* estrelas cadentes: aparecem no alto do céu e riscam na diagonal */
  let cadentes=[], proxCadente=600;
  function meteoros(agora){
    if (REDUZ) return;
    proxCadente -= 33;
    if (proxCadente<=0){
      const n = Math.random()<.25 ? 2 : 1;
      for (let k=0;k<n;k++){
        const ang = (Math.random()<.5 ? 1 : -1) * (.35+Math.random()*.25) + Math.PI/2*0;   // inclinação
        const dir = Math.random()<.5 ? 1 : -1, vel = 9+Math.random()*7;
        cadentes.push({ x: dir>0 ? Math.random()*W*.6 : W*.4+Math.random()*W*.6, y: Math.random()*H*.32,
          vx: dir*vel*Math.cos(.45+Math.random()*.25), vy: vel*Math.sin(.45+Math.random()*.25),
          vida:0, max:38+Math.random()*30, cauda:16+Math.random()*12, larg:1.2+Math.random()*1.3 });
      }
      proxCadente = 1200+Math.random()*2600;
    }
    cx.save(); cx.globalCompositeOperation="lighter"; cx.lineCap="round";
    cadentes = cadentes.filter(c=>c.vida<c.max);
    for (const c of cadentes){
      c.vida++; c.x+=c.vx; c.y+=c.vy;
      const a = Math.sin(Math.PI*c.vida/c.max);                 // acende e apaga suave
      const tx=c.x-c.vx*c.cauda, ty=c.y-c.vy*c.cauda;
      const g=cx.createLinearGradient(c.x,c.y,tx,ty);
      g.addColorStop(0,`rgba(255,255,255,${.95*a})`); g.addColorStop(.25,`rgba(255,230,170,${.45*a})`); g.addColorStop(1,"rgba(255,200,120,0)");
      cx.strokeStyle=g; cx.lineWidth=c.larg; cx.beginPath(); cx.moveTo(c.x,c.y); cx.lineTo(tx,ty); cx.stroke();
      const b=cx.createRadialGradient(c.x,c.y,0,c.x,c.y,8); b.addColorStop(0,`rgba(255,255,255,${.9*a})`); b.addColorStop(1,"rgba(255,255,255,0)");
      cx.fillStyle=b; cx.fillRect(c.x-8,c.y-8,16,16);
    }
    cx.restore();
  }
  let t=0, ultimo=0;
  function quadro(agora){
    if ((agora-ultimo<(LEVE?66:45) || document.body.dataset.view==="home" || OCULTO()) && !REDUZ){ requestAnimationFrame(quadro); return; }
    ultimo=agora; t++;
    pmx+=(CEU.mx-pmx)*.05; pmy+=(CEU.my-pmy)*.05;
    cx.clearRect(0,0,W,H);
    veu(veus[0]);
    veu(veus[1]);
    meteoros(agora);
    cx.save(); cx.globalCompositeOperation="lighter";
    for (let k=0;k<brasas.length;k++){
      const b=brasas[k];
      if (!REDUZ){ b.y-=b.v; b.x+=Math.sin(b.osc+t*.03)*.3; b.vida++; }
      const a=Math.min(1,b.vida/40)*Math.max(0,1-b.vida/b.max)*.7;
      cx.fillStyle=`rgba(${b.cor},${a})`; cx.fillRect(b.x,b.y,b.t,b.t);
      if (b.vida>b.max||b.y<-10) brasas[k]=novaBrasa(false);
    }
    cx.restore();
    if (!REDUZ) requestAnimationFrame(quadro);
  }
  montar();
  addEventListener("resize",()=>{ montar(); if (REDUZ) quadro(1e9); });
  if (matchMedia("(pointer:fine)").matches && !REDUZ)
    addEventListener("pointermove",e=>{ CEU.mx=e.clientX/innerWidth-.5; CEU.my=e.clientY/innerHeight-.5; },{passive:true});
  requestAnimationFrame(quadro);
})();


/* ---------- arte da landing ---------- */
const ARTE = { rect:null };
(() => {
  const el=$("#bg-img"), arteUrl=`url("${C.arteLanding || window.OLIMPO_ARTE}")`; el.style.backgroundImage=arteUrl; $("#bg-blur").style.backgroundImage=arteUrl;
  $("#hero-ip-txt").textContent=C.ip; $("#hi-ver").textContent=C.versao||"";
  $("#hi-tags").innerHTML = Object.keys(C.vips||{}).map(k => (window.OLIMPO_TAGS||{})[k] ? `<img src="${window.OLIMPO_TAGS[k]}" alt="${k}">` : "").join("");
  // posiciona a arte: título "Factions Olimpo" sempre inteiro na tela e logo da Akardia logo acima, sem encostar
  const AW=1600, AH=941*1600/1672, TIT_L=.165, TIT_R=.835, TIT_T=.175;   // área do título na arte (proporções)
  function encaixar(){
    const W=innerWidth, Hh=innerHeight;
    const sCover=Math.max(W/AW, Hh/AH), sFit=(W*.92)/(AW*(TIT_R-TIT_L));
    const sc=Math.min(sCover*.86, sFit*(W<700 ? 1.02 : .86)), w=AW*sc, h=AH*sc;         // um pouco mais distante que "cobrir a tela"
    const centroTitulo = (TIT_T+.56)/2;                                   // meio do título na arte
    const alvo = Hh*(W<700 ? .30 : .34);                                  // onde o título fica na tela
    const top = alvo - centroTitulo*h;
    Object.assign(el.style,{left:((W-w)/2)+"px", top:top+"px", width:w+"px", height:h+"px"});
    el.classList.toggle("solta", true);
    ARTE.rect = {x:(W-w)/2, y:top, w, h, tl:TIT_L, tr:TIT_R, tt:TIT_T};
  }
  const reenc=()=>{ if (document.body.dataset.view==="home" && scrollY<5) encaixar(); };
  addEventListener("resize", reenc); setTimeout(encaixar,60); setTimeout(encaixar,1200); $("#hero-ip").onclick=()=>copiar(C.ip,"> IP copiado — cole no Minecraft",$("#hero-ip"));
  $("#rolar").onclick=e=>{ e.preventDefault(); $("#hub").scrollIntoView({behavior:REDUZ?"auto":"smooth"}); };
  // escurece e desfoca a arte conforme rola, para os painéis ficarem legíveis
  const esc=$("#bg-escuro"), at=()=>{ esc.style.opacity=Math.min(1,scrollY/(innerHeight*.55)); };
  addEventListener("scroll",at,{passive:true}); at();
  if (REDUZ || !matchMedia("(pointer:fine)").matches) return;
  let x=0,y=0;
  const passo=()=>{ x+=((CEU.mx||0)-x)*.05; y+=((CEU.my||0)-y)*.05; if (document.body.dataset.view==="home") el.style.transform=`translate(${-x*18}px,${-y*12}px)`; requestAnimationFrame(passo); };
  requestAnimationFrame(passo);
})();

/* ---------- raios caindo sobre o Factions Olimpo ---------- */
(() => {
  const cv=$("#bg-raios"), cx=cv.getContext("2d"), img=$("#bg-img");
  let W=0,H=0, raios=[], prox=900, ultimo=0;
  const tam=()=>{ const d=LEVE?1:Math.min(devicePixelRatio||1,2); W=innerWidth; H=innerHeight; cv.width=W*d; cv.height=H*d; cx.setTransform(d,0,0,d,0,0); };
  tam(); addEventListener("resize",tam);
  if (REDUZ) return;
  let sujo=false;
  // gera o caminho de um raio por deslocamento do ponto médio, com galhos
  function caminho(x1,y1,x2,y2,desv,prof,galhos){
    if (prof===0) return [[x1,y1],[x2,y2]];
    const mx=(x1+x2)/2+(Math.random()-.5)*desv, my=(y1+y2)/2+(Math.random()-.5)*desv*.25;
    if (galhos && prof<5 && Math.random()<.32){
      const ang=Math.atan2(y2-y1,x2-x1)+(Math.random()<.5?-1:1)*(.4+Math.random()*.5), len=Math.hypot(x2-x1,y2-y1)*(.5+Math.random()*.4);
      galhos.push(caminho(mx,my,mx+Math.cos(ang)*len,my+Math.sin(ang)*len,desv*.55,prof-1,null));
    }
    const a=caminho(x1,y1,mx,my,desv/2,prof-1,galhos), b=caminho(mx,my,x2,y2,desv/2,prof-1,galhos);
    return a.concat(b.slice(1));
  }
  function disparar(){
    const naArte = document.body.dataset.view==="home" && scrollY < innerHeight*.4 && ARTE.rect;
    let ax, ay;
    if (naArte){
      // landing: cai nas laterais do título, onde ficam os louros e os cubos gregos
      const r=ARTE.rect, lado=Math.random()<.5 ? -1 : 1;
      ax = r.x + r.w*(lado<0 ? r.tl - .04 + Math.random()*.12 : r.tr + .04 - Math.random()*.12);
      ay = r.y + r.h*(r.tt + .08 + Math.random()*.32);
    } else {
      // demais telas: cai nas laterais do conteúdo, sobre o céu e as ilhas
      const lado=Math.random()<.5, margem=Math.max(0,(W-1040)/2);
      ax = margem>140 ? (lado ? margem*(.2+Math.random()*.7) : W-margem*(.2+Math.random()*.7)) : Math.random()*W;
      ay = H*(.35+Math.random()*.4);
    }
    const sx = ax + (Math.random()-.5)*W*.25, sy = -20;
    const galhos=[]; const tronco=caminho(sx,sy,ax,ay,Math.max(120,(ay-sy)*.35),7,galhos);
    raios.push({tronco,galhos,vida:0,max:16+Math.random()*10,ax,ay,forte:!!naArte});
    if (naArte){ img.classList.add("relampago"); setTimeout(()=>img.classList.remove("relampago"),120); }
  }
  function linha(pts,larg,cor){ cx.strokeStyle=cor; cx.lineWidth=larg; cx.beginPath(); pts.forEach(([x,y],i)=>i?cx.lineTo(x,y):cx.moveTo(x,y)); cx.stroke(); }
  function quadro(agora){
    requestAnimationFrame(quadro);
    if (agora-ultimo<33 || OCULTO()) return;
    const dt=Math.min(agora-ultimo,200); ultimo=agora;
    if (sujo){ cx.clearRect(0,0,W,H); sujo=false; }
    if ((prox-=dt)<=0){ const casa=document.body.dataset.view==="home"; disparar(); if (Math.random()<(casa?.35:.15)) setTimeout(disparar,140+Math.random()*180); prox = casa ? 1400+Math.random()*3200 : 3000+Math.random()*5000; }
    cx.save(); cx.globalCompositeOperation="lighter"; cx.lineCap="round"; cx.lineJoin="round";
    raios=raios.filter(r=>r.vida<r.max);
    if (raios.length) sujo=true;
    for (const r of raios){
      r.vida++;
      const pisca = r.vida<4 ? 1 : (Math.random()<.35 ? .9 : .35) * (1 - r.vida/r.max);
      if (r.vida<3){ cx.fillStyle=`rgba(255,236,190,${(r.forte?.10:.05)*(3-r.vida)})`; cx.fillRect(0,0,W,H); }   // clarão
      linha(r.tronco,14,`rgba(255,200,80,${.10*pisca})`);
      linha(r.tronco,6,`rgba(255,215,120,${.35*pisca})`);
      linha(r.tronco,2,`rgba(255,255,240,${.95*pisca})`);
      for (const g of r.galhos){ linha(g,4,`rgba(255,210,110,${.28*pisca})`); linha(g,1.2,`rgba(255,250,230,${.7*pisca})`); }
      const gr=cx.createRadialGradient(r.ax,r.ay,0,r.ax,r.ay,90);
      gr.addColorStop(0,`rgba(255,235,170,${.55*pisca})`); gr.addColorStop(1,"rgba(255,200,80,0)");
      cx.fillStyle=gr; cx.fillRect(r.ax-90,r.ay-90,180,180);
    }
    cx.restore();
  }
  requestAnimationFrame(quadro);
})();

/* ---------- nuvens de tempestade da faixa do hero: volume, relâmpagos, chuva e letras em dominó ---------- */
(() => {
  function nuvem(cv, seed){
    const r0=cv.getBoundingClientRect(); if (!r0.width) return;
    const d=Math.min(devicePixelRatio||1,2), W=r0.width, H=r0.height; cv.width=W*d; cv.height=H*d;
    const g=cv.getContext("2d"); g.setTransform(d,0,0,d,0,0); g.clearRect(0,0,W,H);
    let r=seed; const rnd=()=>(r=(r*9301+49297)%233280)/233280;
    // 1) silhueta macia: bolhas grandes sobrepostas, desfocadas para fundir
    const off=document.createElement("canvas"); off.width=W*d; off.height=H*d; const o=off.getContext("2d"); o.setTransform(d,0,0,d,0,0);
    const base=H*.72, ml=W*.1, mr=W*.9, bolas=[];
    for (let x=ml; x<=mr; x+=W*.07) bolas.push([x, base-rnd()*H*.02, H*(.17+rnd()*.04)]);
    const n=4;
    for (let i=0;i<n;i++){ const t=(i+.5)/n, x=ml+W*.08+t*(mr-ml-W*.16)+(rnd()-.5)*W*.05, alt=Math.sin(t*Math.PI);
      bolas.push([x, base-H*(.12+alt*.12), H*(.17+alt*.11+rnd()*.03)]); }
    for (let i=0;i<10;i++){ const t=.08+rnd()*.84, x=ml+t*(mr-ml), alt=Math.sin(t*Math.PI); bolas.push([x, base-H*(.08+alt*.14*rnd()), H*(.1+rnd()*.06)]); }
    o.fillStyle="#fff"; for (const [x,y,rad] of bolas){ o.beginPath(); o.arc(x,y,rad,0,Math.PI*2); o.fill(); }
    g.filter="blur(2.2px)"; g.drawImage(off,0,0,W,H); g.filter="none";
    // 2) volume: escuro embaixo, cinza-azulado no meio, borda de cima iluminada pelo pôr do sol
    g.globalCompositeOperation="source-in";
    const corpo=g.createLinearGradient(0,base-H*.38,0,base+H*.2);
    corpo.addColorStop(0,"#a8a3b4"); corpo.addColorStop(.28,"#6a6f8a"); corpo.addColorStop(.62,"#3a3f58"); corpo.addColorStop(1,"#171a2b");
    g.fillStyle=corpo; g.fillRect(0,0,W,H);
    g.globalCompositeOperation="source-atop";
    // calombos com luz própria (dá relevo)
    for (const [x,y,rad] of bolas){
      const gr=g.createRadialGradient(x-rad*.25,y-rad*.55,rad*.05,x,y-rad*.2,rad*1.05);
      gr.addColorStop(0,"rgba(255,214,160,.38)"); gr.addColorStop(.45,"rgba(190,190,215,.12)"); gr.addColorStop(1,"rgba(0,0,0,0)");
      g.fillStyle=gr; g.beginPath(); g.arc(x,y,rad*1.05,0,Math.PI*2); g.fill();
      const sb=g.createRadialGradient(x,y+rad*.7,0,x,y+rad*.7,rad*.9);
      sb.addColorStop(0,"rgba(8,10,22,.35)"); sb.addColorStop(1,"rgba(8,10,22,0)");
      g.fillStyle=sb; g.beginPath(); g.arc(x,y+rad*.7,rad*.9,0,Math.PI*2); g.fill();
    }
    for (let i=0;i<W*H/10;i++){ g.fillStyle=`rgba(${rnd()<.5?"210,215,240":"6,8,18"},${(rnd()*.08).toFixed(3)})`; g.fillRect(rnd()*W,rnd()*H,1.4,1.4); }
    g.globalCompositeOperation="source-over";
    // a forma da nuvem vira máscara do clarão (o relâmpago acende só dentro dela)
    const fl=cv.parentElement.querySelector(".hi-flash"); if (fl) fl.style.setProperty("--forma",`url(${cv.toDataURL()})`);
  }
  const itens=[...document.querySelectorAll(".hero-info .hi-item")];
  const desenhar=()=>itens.forEach((it,i)=>nuvem(it.querySelector(".hi-cv"), 11+i*37));
  setTimeout(desenhar,50); addEventListener("resize",()=>{ clearTimeout(desenhar._t); desenhar._t=setTimeout(desenhar,150); });

  // trovões aleatórios: clarão dentro da nuvem + raio caindo da base
  function raioPath(){ let x=20, y=0, p=`M${x} ${y}`; for (let k=0;k<5;k++){ x+= (Math.random()-.5)*18; y+=12; p+=` L${x.toFixed(1)} ${y}`; } return p; }
  function trovao(it){
    it.style.setProperty("--fx",(25+Math.random()*50)+"%"); it.style.setProperty("--rx",(25+Math.random()*50)+"%");
    it.querySelector(".hi-raio path").setAttribute("d",raioPath());
    it.classList.remove("trovao"); void it.offsetWidth; it.classList.add("trovao");
  }
  if (!REDUZ){
    const ciclo=()=>{ const it=itens[Math.floor(Math.random()*itens.length)]; trovao(it); if (Math.random()<.35) setTimeout(()=>trovao(it),220); setTimeout(ciclo, 1600+Math.random()*3200); };
    setTimeout(ciclo,1500);
    itens.forEach(it=>it.addEventListener("mouseenter",()=>trovao(it)));
    // barulho de choque ao passar o mouse nos VIPs únicos
    const vipsNuvem=document.querySelector(".hero-info .hi-vips"); let ultimoChoque=0;
    vipsNuvem?.addEventListener("mouseenter",()=>{ const ag=Date.now(); if (ag-ultimoChoque<2500) return; ultimoChoque=ag; try { SOM.trovao(); } catch {} });
  }

  // letras em dominó: caem e se formam uma por uma
  function domino(el){
    const t=el.textContent; el.innerHTML=[...t].map((c,i)=>`<span class="dl" style="--i:${i}">${c===" "?"&nbsp;":esc(c)}</span>`).join("");
    el.classList.remove("cai"); void el.offsetWidth; el.classList.add("cai");
  }
  const els=[...document.querySelectorAll(".hero-info .domino")];
  els.forEach(el=>{ let ultimo=""; new MutationObserver(()=>{ if (el.dataset.ocupado) return; const t=el.textContent; if (t===ultimo) return; ultimo=t; el.dataset.ocupado=1; domino(el); delete el.dataset.ocupado; }).observe(el,{childList:true,characterData:true,subtree:true}); });
  setTimeout(()=>els.forEach(domino),600);
  if (!REDUZ) setInterval(()=>els.forEach((el,i)=>setTimeout(()=>domino(el),i*350)), 9000);
})();

/* ---------- logo: entrada, partículas e inclinação com o mouse ---------- */
(() => {
  const cena=$("#logo-cena"), tilt=$("#logo-tilt"), part=$("#logo-particulas"), img=$("#logo-img");
  const mostrar=()=>requestAnimationFrame(()=>cena.classList.add("pronto"));
  img.complete ? mostrar() : (img.onload = mostrar, img.onerror = mostrar);
  // cubinhos vermelhos caindo da ilha (pontos de origem nas cachoeiras e bordas)
  const origens=[[.17,.62],[.20,.66],[.79,.64],[.83,.66],[.30,.82],[.70,.82],[.50,.92],[.12,.6],[.88,.6],[.40,.88],[.60,.88]];
  const k0 = Math.min(1, (cena.offsetWidth||680)/680);
  part.innerHTML = origens.map(([x,y],k)=>{
    const t=(4+Math.random()*7)*k0;
    return `<i style="left:${x*100}%;top:${y*100}%;width:${t}px;height:${t}px;--d:${(3+Math.random()*3).toFixed(2)}s;--atraso:${(Math.random()*4).toFixed(2)}s;--queda:${((80+Math.random()*90)*k0)|0}px;--giro:${(Math.random()*180-90)|0}deg"></i>`;
  }).join("");
  if (REDUZ || !matchMedia("(pointer:fine)").matches) return;
  let alvoX=0, alvoY=0, x=0, y=0, rodando=false;
  const passo=()=>{ x+=(alvoX-x)*.08; y+=(alvoY-y)*.08; tilt.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`;
    if (Math.abs(alvoX-x)+Math.abs(alvoY-y)>.01) requestAnimationFrame(passo); else rodando=false; };
  addEventListener("pointermove", e => {
    const r=cena.getBoundingClientRect(); if (r.bottom<0) return;
    alvoX=((e.clientX-(r.left+r.width/2))/innerWidth)*14; alvoY=-((e.clientY-(r.top+r.height/2))/innerHeight)*10;
    if (!rodando){ rodando=true; requestAnimationFrame(passo); }
  }, {passive:true});
})();

/* ---------- digitação estilo robô ---------- */
let twToken = 0;
async function digitar(root){
  const meu = ++twToken, els = [...root.querySelectorAll("[data-tw]")];
  els.forEach(e => { if (e.dataset.full == null) e.dataset.full = e.textContent; e.textContent = ""; });
  for (const e of els){
    const t = e.dataset.full, v = +e.dataset.tw || 20;
    if (REDUZ){ e.textContent = t; continue; }
    e.classList.add("digitando");
    // baseado no tempo real: mesmo com a página ocupada (animações), a velocidade não cai
    const ini = performance.now(); let i = 0;
    while (i < t.length){
      if (meu !== twToken){ els.forEach(x => { x.textContent = x.dataset.full; x.classList.remove("digitando"); }); return; }
      await sleep(Math.min(v, 30));
      const n = Math.min(t.length, Math.floor((performance.now()-ini)/(v*1.15)) + 1);
      if (n !== i){ i = n; e.textContent = t.slice(0,i); }
    }
    e.classList.remove("digitando");
  }
}

/* ---------- sanitizador de HTML (conteúdo vindo de fora, ex.: notícias do blog) ---------- */
// só deixa passar tags de texto simples; remove scripts, iframes, eventos on*, style e links javascript:
function limparHTML(html){
  const OK=new Set(["P","BR","B","STRONG","I","EM","U","S","H2","H3","H4","UL","OL","LI","A","IMG","BLOCKQUOTE","CODE","PRE","HR","SPAN","SMALL"]);
  const ATR={A:["href","title"],IMG:["src","alt","title","width","height"]};
  const doc=new DOMParser().parseFromString(`<div>${html}</div>`,"text/html"), raiz=doc.body.firstChild;
  const seguro=u=>{ try { const x=new URL(u,location.href); return ["https:","http:","mailto:"].includes(x.protocol); } catch { return false; } };
  (function andar(no){
    [...no.children].forEach(el=>{
      if (!OK.has(el.tagName)){ if (/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|TEMPLATE|SVG|MATH|FORM|INPUT|BUTTON|LINK|META)$/.test(el.tagName)) el.remove(); else { andar(el); el.replaceWith(...el.childNodes); } return; }
      [...el.attributes].forEach(a=>{ const n=a.name.toLowerCase(); if (!(ATR[el.tagName]||[]).includes(n) || ((n==="href"||n==="src") && !seguro(a.value))) el.removeAttribute(a.name); });
      if (el.tagName==="A"){ el.setAttribute("target","_blank"); el.setAttribute("rel","noopener noreferrer nofollow"); }
      andar(el);
    });
  })(raiz);
  return raiz.innerHTML;
}

/* ---------- navegação entre "pastas" ---------- */
const VIEWS = ["home","loja","blog","guias","dungeons","parceiros","equipe","reembolso","termos","diretrizes"];
function ir(nome, push=true){
  if (!VIEWS.includes(nome)) nome = "home";
  $$(".view").forEach(v => v.classList.toggle("ativa", v.id === "v-"+nome));
  $$(".nav [data-ir]").forEach(b => b.setAttribute("aria-current", b.dataset.ir===nome ? "page" : "false"));
  document.body.dataset.view = nome;
  scrollTo({top:0});
  if (push) hist(nome==="home" ? location.pathname + location.search : "#"+nome);
  if (nome==="loja") iniciarLoja();
  if (nome==="blog") iniciarBlog();
  if (nome==="guias") renderGuias();
  if (nome==="parceiros") renderParceiros();
  if (nome==="dungeons") renderDungeons();
  if (nome==="equipe") mostrarMembro(membro, true);
  $$(".js-faq").forEach(a=>{ a.href=C.faq||C.discord; });
  if (["reembolso","termos","diretrizes"].includes(nome)) $$(".js-discord").forEach(a=>{ a.href=C.discord; a.textContent=C.discord.replace(/^https?:\/\//,""); }), $$(".js-email").forEach(a=>{ a.href="mailto:"+C.email; a.textContent=C.email; });
  digitar($("#v-"+nome));
}
document.addEventListener("click", e => { const b=e.target.closest("[data-ir]"); if (b){ e.preventDefault(); ir(b.dataset.ir); } });
addEventListener("hashchange", () => ir(location.hash.slice(1)||"home", false));

/* ---------- API CentralCart ---------- */
async function api(path, opts={}){
  const r = await fetch(API+path,{...opts,headers:{"Content-Type":"application/json","x-store-domain":C.storeDomain,...(opts.headers||{})}});
  const d = await r.json().catch(()=>({}));
  if (!r.ok) throw new Error(d?.errors?.[0]?.message || `Erro ${r.status} na loja.`);
  return d;
}

/* ================= EQUIPE ================= */
/* A skin é puxada da conta original: o nome vira UUID pela API pública da Mojang
   (via PlayerDB, com Ashcon de reserva) e as imagens são renderizadas a partir do UUID. */
const contas = {};
const contaDe = m => (m.conta || m.nick).trim();
// UUID sem traços funciona em todos os serviços de render; nome também funciona
const idImg = c => /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(c) ? c.replace(/-/g,"").toLowerCase() : c;
async function resolverConta(nome){
  if (contas[nome]) return contas[nome];
  contas[nome] = (async () => {
    let respondeu = false;
    try {
      const r = await fetch(`https://playerdb.co/api/player/minecraft/${enc(nome)}`); respondeu = true;
      const d = await r.json();
      if (d?.success && d.data?.player){ const pl=d.data.player; return { uuid:pl.id, raw:pl.raw_id || pl.id.replace(/-/g,""), nome:pl.username, skin:pl.skin_texture || "" }; }
    } catch {}
    try {
      const r = await fetch(`https://api.ashcon.app/mojang/v2/user/${enc(nome)}`); respondeu = true;
      if (r.ok){ const d=await r.json(); return { uuid:d.uuid, raw:d.uuid.replace(/-/g,""), nome:d.username, skin:d.textures?.skin?.url || "" }; }
    } catch {}
    return respondeu ? null : { offline:true };
  })();
  return contas[nome];
}
// tenta várias fontes de imagem em ordem; se todas falharem usa a reserva
function carregarImg(el, urls, reserva){
  let k = 0;
  const tenta = () => {
    if (k >= urls.length){ if (reserva) el.src = reserva; else el.removeAttribute("src"); el.classList.remove("troca"); return; }
    const im = new Image();
    im.onload = () => { el.src = im.src; el.classList.remove("troca"); };
    im.onerror = () => { k++; tenta(); };
    im.src = urls[k];
  };
  tenta();
}
const urlsCorpo = (id) => [`https://mc-heads.net/body/${enc(id)}/300`, `https://crafatar.com/renders/body/${enc(id)}?overlay&scale=8`, `https://visage.surgeplay.com/full/320/${enc(id)}`, `https://starlightskins.lunareclipse.studio/render/default/${enc(id)}/full`];
const urlsCabeca = (id,s) => [`https://mc-heads.net/avatar/${enc(id)}/${s}`, `https://crafatar.com/avatars/${enc(id)}?size=${s}&overlay`, `https://minotar.net/helm/${enc(id)}/${s}.png`];

// cabeças da equipe (hub e miniaturas) — trocam para a skin real assim que a conta é resolvida
function atualizarCabecas(){
  $$("img[data-conta]").forEach(img => {
    const nome = img.dataset.conta, s = +img.getAttribute("width") || 40;
    if (img.dataset.ok === nome) return; img.dataset.ok = nome;
    carregarImg(img, urlsCabeca(idImg(nome), s), STEVE);
  });
}
const cabecaConta = (m,s,cls) => { const fixa=(window.OLIMPO_SKINS||{})[m.nick];
  return fixa ? `<img class="${cls} cab-fixa" src="${fixa}" alt="${esc(m.nick)}" width="${s}" height="${s}">` : `<img class="${cls}" data-conta="${esc(contaDe(m))}" src="${STEVE}" alt="${esc(m.nick)}" width="${s}" height="${s}">`; };
$("#cabecas").innerHTML = C.equipe.map(m => cabecaConta(m,36,"av")).join("");
atualizarCabecas();

let membro = 0;
const ic = {
  discord:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 9l5 3-5 3z M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill-rule="evenodd"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4l16 16M20 4L4 20"/></svg>'
};
function mostrarMembro(i, primeira){
  const n=C.equipe.length; if (!n) return;
  membro=(i+n)%n; const m=C.equipe[membro], conta=contaDe(m);
  $("#eq-nick").dataset.full = m.nick; $("#eq-bio").dataset.full = m.bio;
  if (!primeira){ $("#eq-nick").textContent = ""; $("#eq-bio").textContent = ""; }
  $("#eq-cargo").textContent = m.cargo;
  const img=$("#eq-img"); img.classList.add("troca"); img.alt = "Skin de "+m.nick;
  const redes = Object.entries(m.redes||{}).filter(([,u])=>u).map(([k,u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}">${ic[k]||""}</a>`).join("");
  $("#eq-redes").innerHTML = redes;
  $("#eq-lista").innerHTML = C.equipe.map((x,j) => `<button class="thumb" data-m="${j}" aria-current="${j===membro}" aria-label="${esc(x.nick)}">${cabecaConta(x,36,"")}</button>`).join("");
  atualizarCabecas();
  { const fixa=(window.OLIMPO_SKINS||{})[m.nick]; carregarImg(img, fixa ? [fixa, ...urlsCorpo(idImg(conta))] : urlsCorpo(idImg(conta)), ""); }
  const st=$("#eq-uuid"); st.textContent = "// verificando conta original...";
  resolverConta(conta).then(c => {
    if (contaDe(C.equipe[membro]) !== conta) return;
    if (c && c.offline){
      st.textContent = `// skin da conta original // uuid ${conta}`;
    } else if (c){
      st.innerHTML = `<span class="ok">● skin original</span> // conta ${esc(c.nome)} // uuid ${esc(c.uuid)}` + (c.skin ? ` // <a href="${esc(c.skin)}" target="_blank" rel="noopener">baixar skin</a>` : "");
      $("#eq-redes").innerHTML = redes + `<a class="namemc" href="https://namemc.com/profile/${enc(c.uuid)}" target="_blank" rel="noopener">NAMEMC</a>`;
    } else {
      st.textContent = `// conta original "${conta}" não encontrada na Mojang — confira o nome em "conta"`;
    }
  });
  if (!primeira) digitar($(".eq-txt"));
}
$("#eq-lista").onclick = e => { const b=e.target.closest("[data-m]"); if (b) mostrarMembro(+b.dataset.m); };
$("#eq-ant").onclick = () => mostrarMembro(membro-1);
$("#eq-prox").onclick = () => mostrarMembro(membro+1);
if (C.formularioEquipe){ $("#eq-insc-link").href=C.formularioEquipe; $("#eq-insc").hidden=false; }
if (C.colaboradores?.length){
  $("#colab-wrap").hidden = false;
  $("#colab").innerHTML = C.colaboradores.map(m => `<div>${cabecaConta(m,88,"")}<span>${esc(m.nick)}</span></div>`).join("");
  atualizarCabecas();
}
if (C.apoiadores?.length){
  $("#apoio-wrap").hidden = false;
  $("#apoio").innerHTML = C.apoiadores.map(n => `<div>${cabecaConta({nick:n},48,"")}<span>${esc(n)}</span></div>`).join("");
  atualizarCabecas();
}

/* ================= HUB: equipe, discord, blog, terminal, inclinação ================= */
(() => {
  // equipe de braços abertos, esperando os jogadores
  const palco=$("#h2-palco");
  if (palco){
    const P=window.OLIMPO_POSE||{};
    const fig=(m,i)=>{ const q=P[m.nick];
      const corpo = q ? `<div class="h2-boneco" style="aspect-ratio:${q.w}/${q.h}">
          <img class="bb be" src="${q.be}" alt="" style="transform-origin:${q.pe[0]}% ${q.pe[1]}%">
          <img class="bb bd" src="${q.bd}" alt="" style="transform-origin:${q.pd[0]}% ${q.pd[1]}%">
          <img class="bb" src="${q.corpo}" alt="${esc(m.nick)}"></div>`
        : `<img class="h2-boneco-img" id="h2p${i}" alt="${esc(m.nick)}">`;
      return `<div class="h2-pessoa2">${corpo}<span class="h2-nome">${esc(m.nick)}<em>${esc((m.cargo||"").split("·")[0].trim())}</em></span></div>`; };
    if (window.OLIMPO_DUPLA){
      const por=n=>C.equipe.find(m=>m.nick===n)||{};
      const nome=m=>`<span class="h2-nome">${esc(m.nick||"")}<em>${esc((m.cargo||"").split("·")[0].trim())}</em></span>`;
      palco.innerHTML = `<span class="h2-convite">Estamos te esperando</span>
        <div class="h2-foto" style="--mascara:url('${window.OLIMPO_DUPLA}')"><img src="${window.OLIMPO_DUPLA}" alt="SrKaio e akahasky de braços abertos"><i class="reflexo"></i></div>
        <div class="h2-nomes">${nome(por("SrKaio"))}${nome(por("akahasky"))}</div>`;
    } else palco.innerHTML = `<span class="h2-convite">Estamos te esperando</span><div class="h2-dupla2">${C.equipe.slice(0,2).map(fig).join("")}</div>`;
    C.equipe.slice(0,2).forEach((m,i)=>{ const el=$("#h2p"+i); if (!el) return; const fixa=(window.OLIMPO_SKINS||{})[m.nick]; if (fixa) el.src=fixa; else carregarImg(el, urlsCorpo(idImg(contaDe(m))), ""); });
  }
  // discord: membros online pelo convite (se o Discord responder)
  const cod=((C.discordConvite||C.faq||"").match(/discord\.gg\/([\w-]+)/)||[])[1];
  if (cod) fetch(`https://discord.com/api/v9/invites/${cod}?with_counts=true`).then(r=>r.ok?r.json():null).then(d=>{
    if (d && d.approximate_member_count) $("#dc-info").innerHTML=`<span class="dc-on"></span>${d.approximate_presence_count} online · ${d.approximate_member_count} membros`;
  }).catch(()=>{});
  // blog: última notícia
  setTimeout(async()=>{ try {
    const lista = DEMO ? demoPosts : ((await api("/webstore/post")).data||[]);
    const p=lista[0]; if (!p){ $("#bl-tit").textContent="Em breve as primeiras notícias"; return; }
    $("#bl-data").textContent=(p.published_at||"NOVO").toUpperCase(); $("#bl-tit").textContent=p.title;
    $("#bl-res").textContent=String(p.content||"").replace(/<[^>]+>/g," ").trim();
  } catch { $("#bl-tit").textContent="Notícias e atualizações do Factions Olimpo"; } }, 0);
  // terminal digitando os comandos dos guias
  const cmds=C.guias.flatMap(g=>g.comandos||[]), linhas=$("#h2-term-l"), c=$("#h2-term-c");
  if (cmds.length && c){
    let k=0;
    const proximo=async()=>{
      const t=cmds[k++%cmds.length]; c.textContent="";
      if (REDUZ){ c.textContent=t; } else for (let i=1;i<=t.length;i++){ c.textContent=t.slice(0,i); await sleep(70+Math.random()*60); }
      await sleep(1100);
      const d=document.createElement("div"); d.textContent="akardia@olimpo:~$ "+t; linhas.appendChild(d); while (linhas.children.length>3) linhas.firstChild.remove();
      c.textContent=""; setTimeout(proximo,250);
    };
    proximo();
  }
  // inclinação 3D leve dos painéis com o mouse
  if (!REDUZ && matchMedia("(pointer:fine)").matches) document.querySelectorAll(".hub2 .painel").forEach(el=>{
    el.addEventListener("pointermove",e=>{ const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-2px)`; });
    el.addEventListener("pointerleave",()=>{ el.style.transform=""; });
  });
})();

/* ================= GUIAS ================= */
let guiasOk=false;
function renderGuias(){
  if (guiasOk) return; guiasOk=true; renderMina();
  $("#guias").innerHTML = C.guias.map((g,i) => `<details class="guia" ${i===0?"open":""}><summary>${esc(g.titulo)}</summary>
    <div class="g">${esc(g.texto)}<div class="cmds">${(g.comandos||[]).map(c=>`<button class="cmd" data-cmd="${esc(c)}">${esc(c)}</button>`).join("")}</div></div></details>`).join("");
}
function renderMina(){
  const I=window.OLIMPO_MOBS||{}, img=(k,alt)=>I[k]?`<img src="${I[k]}" alt="${alt}" loading="lazy">`:"";
  const drop=`Minério garantido conforme a <strong>camada</strong> (veja <a data-gd="gd-garantido">Drop garantido</a>) e chance de <strong>1 recompensa especial</strong> por morte.`;
  const nuc=`<span class="v">0,03% a 0,75%</span> por morte, maior nas camadas mais fundas e nos mobs de nível alto.<br>Com <strong>Caçador de Recompensas</strong> no máximo: <span class="ok">0,045% a 1,125%</span>.`;
  const mobs=[["goblin-bruto","Goblin Bruto"],["goblin-mago","Goblin Mago"],["goblin-guerreiro","Goblin Guerreiro"],["goblin-arqueiro","Goblin Arqueiro"],["goblin-chicoteador","Goblin Chicoteador"],
    ["aranha-guerreira","Aranha Guerreira"],["aranha-armadilheira","Aranha Armadilheira"],["aranha-venenosa","Aranha Venenosa"],["aranha-elite","Aranha Elite"]];
  $("#gd-mina").innerHTML=`
  <h2 class="gd-sub gd-mina-t" id="gd-mina-t">MOBS DA MINA</h2>
  <div class="guias">

  <details class="guia gd-acc" id="gd-nucleo"><summary>Núcleo de Spawner</summary>
    <div class="g gd-box">
    <p>A mina é onde se consegue os <strong>Núcleos de Spawner</strong>, usados para craftar spawners. Hoje o núcleo só é obtido na mina:</p>
    <ul>
      <li><strong>Mobs comuns:</strong> chance entre <span class="v">0,03%</span> e <span class="v">0,75%</span> por morte, aumentando conforme a camada e o nível do mob.</li>
      <li><strong>Com Caçador de Recompensas no nível máximo:</strong> <span class="ok">0,045% a 1,125%</span>.</li>
      <li><strong>Gor’Khan:</strong> <span class="v">6%</span> por recompensa sorteada. Ele entrega de <strong>2 a 5 recompensas</strong> conforme a camada.</li>
      <li>O Gor’Khan tem <span class="v">0,05%</span> de chance de aparecer ao quebrar um bloco, desde que não exista outro ativo naquela camada.</li>
    </ul>
  </div></details>

  <details class="guia gd-acc" id="gd-mobs"><summary>Mobs e drops</summary>
    <div class="g gd-box">
    <div class="gd-wrap"><table class="gd-tab gd-mob">
      <thead><tr><th>MOB</th><th>DROP</th><th>CHANCE DE NÚCLEO</th></tr></thead>
      <tbody>
        <tr class="boss" id="gd-gorkhan"><td><span class="nm">Gor’Khan · CHEFE</span>${img("gorkhan-furia","Gor’Khan")}</td>
          <td data-l="DROP">Entrega de <strong>2 a 5 recompensas</strong> conforme a camada. O talento pode adicionar sorteios extras.<br>Aparece com <span class="v">0,05%</span> de chance ao quebrar um bloco, se não houver outro ativo na camada.</td>
          <td data-l="CHANCE DE NÚCLEO"><span class="v">6%</span> por recompensa sorteada.<br>Veja a chance por camada abaixo.</td></tr>
        ${mobs.map(([k,n])=>`<tr><td><span class="nm">${n}</span>${img(k,n)}</td><td data-l="DROP">${drop}</td><td data-l="CHANCE DE NÚCLEO">${nuc}</td></tr>`).join("")}
      </tbody></table></div>
    <p class="gd-nota">Goblin Bruto, Goblin Mago, Goblin Guerreiro, Goblin Arqueiro, Goblin Chicoteador, Aranha Guerreira, Armadilheira, Venenosa e Elite usam exatamente a mesma tabela de drops.</p>
  </div></details>

  <details class="guia gd-acc"><summary>Gor’Khan: chance de núcleo</summary>
    <div class="g gd-box">
    <div class="gd-hero">${img("gorkhan","Gor’Khan")}</div>
    <p>Chance base de conseguir <strong>pelo menos um núcleo</strong> ao matar o Gor’Khan:</p>
    <div class="gd-wrap"><table class="gd-tab">
      <thead><tr><th>CAMADA</th><th>SORTEIOS</th><th>CHANCE</th></tr></thead>
      <tbody>
        <tr><td>Carvão / Cobre</td><td class="num">2</td><td class="num">11,64%</td></tr>
        <tr><td>Ferro</td><td class="num">3</td><td class="num">16,94%</td></tr>
        <tr><td>Ouro</td><td class="num">4</td><td class="num">21,93%</td></tr>
        <tr><td>Diamante</td><td class="num">5</td><td class="num">26,61%</td></tr>
      </tbody></table></div>
    <p class="gd-nota">O talento pode adicionar sorteios extras ao chefe.</p>
  </div></details>

  <details class="guia gd-acc" id="gd-garantido"><summary>Drop garantido</summary>
    <div class="g gd-box">
    <p>Todo mob comum da mina sempre dropa minério da camada onde morreu:</p>
    <div class="gd-wrap"><table class="gd-tab">
      <thead><tr><th>CAMADA</th><th>DROP</th></tr></thead>
      <tbody>
        <tr><td>Carvão</td><td class="num">2–5 carvões</td></tr>
        <tr><td>Cobre</td><td class="num">3–7 cobres brutos</td></tr>
        <tr><td>Ferro</td><td class="num">4–9 ferros brutos</td></tr>
        <tr><td>Ouro</td><td class="num">6–12 ouros brutos</td></tr>
        <tr><td>Diamante</td><td class="num">10–20 diamantes</td></tr>
      </tbody></table></div>
  </div></details>

  <details class="guia gd-acc" id="gd-especiais"><summary>Recompensas especiais</summary>
    <div class="g gd-box">
    <p>Além do drop garantido, cada morte pode entregar <strong>somente uma</strong> destas recompensas:</p>
    <div class="gd-wrap"><table class="gd-tab">
      <thead><tr><th>RECOMPENSA</th><th>CHANCE MÍNIMA → MÁXIMA</th></tr></thead>
      <tbody>
        <tr><td>Drusa de Ametista</td><td class="num">0,50% → 2,50%</td></tr>
        <tr><td>Caixa</td><td class="num">0,30% → 1,50%</td></tr>
        <tr><td>Molde de Melhoria de Netherite</td><td class="num">0,15% → 1,00%</td></tr>
        <tr><td>Detrito Ancestral</td><td class="num">0,08% → 1,50%</td></tr>
        <tr><td>Jaula de Spawner</td><td class="num">0,05% → 1,00%</td></tr>
        <tr><td><strong>Núcleo de Spawner</strong></td><td class="num"><strong>0,03% → 0,75%</strong></td></tr>
      </tbody></table></div>
  </div></details>

  <details class="guia gd-acc" id="gd-dungeon"><summary>Núcleo na dungeon</summary>
    <div class="g gd-box">
    <ul>
      <li>Ao concluir a dungeon, a <strong>“chuva de recompensas”</strong> do chefe pode gerar Núcleo de Spawner.</li>
      <li>Os <strong>baús pessoais</strong> da dungeon também podem gerar o núcleo.</li>
      <li>Os mobs comuns da dungeon <strong>não</strong> dropam o núcleo diretamente.</li>
    </ul>
    <p>O núcleo faz parte do pool de itens especiais: há <span class="v">12%</span> de chance de a recompensa ser especial, e depois ela é sorteada entre aproximadamente 18 itens. Isso dá cerca de <span class="v">0,67%</span> por recompensa válida, antes do bônus do talento <strong>Relic Hunter</strong>.</p>
    <p>Chance aproximada de aparecer pelo menos um núcleo nos baús:</p>
    <div class="gd-wrap"><table class="gd-tab">
      <thead><tr><th>DIFICULDADE</th><th>CHANCE POR BAÚ</th></tr></thead>
      <tbody>
        <tr><td>Fácil</td><td class="num">3,4%</td></tr>
        <tr><td>Normal</td><td class="num">4,9%</td></tr>
        <tr><td>Difícil</td><td class="num">6,3%</td></tr>
      </tbody></table></div>
  </div></details>
  </div>`;
}
$("#v-guias").addEventListener("click", e => { const a=e.target.closest("[data-gd]"); if (!a) return; e.preventDefault();
  const el=document.getElementById(a.dataset.gd); if (!el) return; const d=el.closest("details"); if (d) d.open=true; el.scrollIntoView({behavior:"smooth",block:"start"}); });
$("#guias").addEventListener("click", e => { const b=e.target.closest("[data-cmd]"); if (b) copiar(b.dataset.cmd, "> copiado: "+b.dataset.cmd); });

/* ================= DUNGEONS ================= */
// regras iguais nas duas masmorras (só muda o tema, os inimigos e o conjunto)
const DG_BASE = {
  chips: [["Até","15 jogadores"],["Limite","45 min"],["PvP com chave","desligado"],["PvP portal aleatório","ativo"],["Dificuldade","sorteada"]],
  difs: [
    { nome:"FÁCIL",   cor:"#7BE07B", monstros:30, vidaMob:100, danoMob:12, vidaBoss:4000,  ataqueBoss:8,  frag:3,  dropFrag:"7%",  slot:"20%", fragBau:"4%" },
    { nome:"NORMAL",  cor:"#F2C230", monstros:50, vidaMob:200, danoMob:17, vidaBoss:7000,  ataqueBoss:13, frag:6,  dropFrag:"14%", slot:"30%", fragBau:"7%" },
    { nome:"DIFÍCIL", cor:"#FF4A2A", monstros:75, vidaMob:300, danoMob:24, vidaBoss:10000, ataqueBoss:19, frag:10, dropFrag:"25%", slot:"40%", fragBau:"10%" }],
  bau: [["Livro de encantamento",60],["Item especial ou caixa",12],["Poção",12],["Detrito ancestral",8],["Drusa",8]],
  custos: [105,125,120,100,48,48,32,28,28],
  bases: ["Capacete","Peitoral","Calças","Botas","Espada","Machado","Picareta","Pá","Enxada"]
};
let dgAtual = null;
const DGI = k => (window.OLIMPO_DG||{})[k] || (window.OLIMPO_MOBS||{})[k] || "";
const DG_SVG = { sonar:`<svg viewBox="0 0 120 120" width="150" height="150" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3">
  <circle cx="60" cy="60" r="14"/><circle cx="60" cy="60" r="28" opacity=".7"/><circle cx="60" cy="60" r="42" opacity=".45"/><circle cx="60" cy="60" r="56" opacity=".25"/></g>
  <circle cx="60" cy="60" r="7" fill="currentColor"/></svg>` };
function chaveProduto(k){ const nm=semAcento(C.chaves[k].nome); return prods.find(p=>/chave/.test(semAcento(p.name)) && semAcento(p.name).includes(nm)); }
function comprarChave(k){
  ir("loja");
  carregarLoja().then(()=>{ const p=chaveProduto(k); if (p) abrirProduto(p.id); }).catch(()=>{});
}
function renderDungeons(){
  const ks = Object.keys(C.chaves||{}).filter(k=>!C.chaves[k].emBreve), DG=C.dungeons||{};
  if (!dgAtual || !ks.includes(dgAtual)) dgAtual = ks.find(k=>DG[k]) || ks[0];
  $("#dg-portais").innerHTML = ks.map(k=>{ const ch=C.chaves[k], dd=DG[k];
    return `<button class="dg-portal ${k===dgAtual?"on":""}" data-dg="${k}" style="--k1:${ch.cor};--k2:${ch.cor2}">
      <span class="ic">${chaveArte("Chave "+ch.nome)}</span>
      <span class="tx"><b>${esc(ch.nome.toUpperCase())}</b><small>${dd?`CONJUNTO: ${esc(dd.efeito.toUpperCase())}`:"EM BREVE"}</small></span></button>`; }).join("");
  const ch=C.chaves[dgAtual], d=DG[dgAtual], pag=$("#dg-pag"), V=$("#v-dungeons");
  const t = d?.tema || { c1:ch.cor, c2:ch.cor2, c3:ch.cor };
  [["--dg1",t.c1],["--dg2",t.c2],["--dg3",t.c3],["--bg1",t.bg1],["--bg2",t.bg2],["--bg3",t.bg3],["--dgT",t.t],["--dgP",t.p],["--dgM",t.m]].forEach(([k,v])=>v?V.style.setProperty(k,v):V.style.removeProperty(k));
  if (!d){
    pag.innerHTML = `<div class="dg-breve" style="--k1:${ch.cor};--k2:${ch.cor2}"><div class="arte">${chaveArte("Chave "+ch.nome)}</div>
      <h3>${esc(ch.nome.toUpperCase())}</h3><p>${ch.resumo||""}<br>Os detalhes desta masmorra chegam em breve.</p>
      <button class="dg-btn" data-dgcompra="${dgAtual}">COMPRAR CHAVE</button></div>`;
    return;
  }
  const B=DG_BASE, M=d.material, p=chaveProduto(dgAtual), preco=p?brl(p.pricing?.price):"";
  const mx=f=>Math.max(...B.difs.map(f));
  const im=(k,alt,cls="")=>DGI(k)?`<img ${cls?`class="${cls}"`:""} src="${DGI(k)}" alt="${esc(alt||"")}" loading="lazy">`:"";
  const passos=[
    `Use a <strong>${d.chaveNome}</strong> com clique direito no mundo principal. A dificuldade é sorteada.`,
    `O portal fica <strong>selado por 30 segundos</strong> e, depois de aberto, aceita entradas por <strong>60 segundos</strong>.`,
    `Até <strong>15 jogadores</strong> na mesma sessão. Aberta com chave, o <strong>PvP é bloqueado</strong> e facções diferentes cooperam normalmente.`,
    `Enfrente ${d.inimigos}: a meta é <strong>30</strong> mortes no Fácil, <strong>50</strong> no Normal ou <strong>75</strong> no Difícil.`,
    `Batida a meta, o <strong>${d.chefe}</strong> surge quando alguém se aproxima da área do chefe.`,
    `Derrotar o chefe <strong>conclui a dungeon</strong> na hora.`,
    `Cada jogador recebe os <strong>${M.plural}</strong> garantidos e pode abrir os baús pessoais.`,
    `A <strong>chuva de recompensas</strong> do chefe pode ser coletada durante <strong>60 segundos</strong>.`,
    `A sessão dura no máximo <strong>45 minutos</strong>. No fim, todos voltam ao servidor.`];
  const brasas = Array.from({length:22},(_,i)=>`<i class="dg-brasa" style="left:${(i*41+9)%100}%;--d:${(i*.43).toFixed(2)}s;--t:${(4+(i%5)*.9).toFixed(1)}s;--x:${((i%7)-3)*14}px"></i>`).join("");
  const bau=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#6b3a12" d="M1 6h14v9H1z"/><path fill="#8a4d1a" d="M1 2h14v5H1z"/><path fill="#3a1d08" d="M1 6h14v1H1zM1 2h1v13H1zM14 2h1v13h-1z"/><path fill="#f2c230" d="M7 5h2v4H7z"/></svg>`;
  pag.innerHTML = `
  <div class="dg-hero">${brasas}
    <div><div class="kick">${d.kick||""}</div><h2>${d.titulo}</h2><p>${d.intro}</p>
      <div class="dg-chips">${B.chips.map(c=>`<span class="dg-chip">${c[0]} <b>${c[1]}</b></span>`).join("")}<span class="dg-chip">Conjunto <b>${esc(d.efeito)}</b></span></div></div>
    <div class="dg-boss-hero">${im(d.boss.img,d.boss.nome)}</div>
  </div>
  <nav class="dg-menu">${[["dg-s-chave","CHAVE"],["dg-s-acesso","PORTAIS E PVP"],["dg-s-como","COMO FUNCIONA"],["dg-s-dif","DIFICULDADES"],["dg-s-mobs","MOBS"],["dg-s-boss","CHEFE"],["dg-s-rec","RECOMPENSAS"],["dg-s-set","CONJUNTO"]]
    .map(([id,tx])=>`<a data-dgir="${id}">${tx}</a>`).join("")}</nav>

  <div class="dg-sec dg-chave" id="dg-s-chave">
    <div class="arte">${chaveArte("Chave "+ch.nome)}</div>
    <div><h4>// CHAVE NECESSÁRIA</h4><div class="nm">${esc(d.chaveNome)}</div>
      <p>Use a chave com <strong>clique direito</strong> no mundo principal. A dificuldade é sorteada entre Fácil, Normal e Difícil, e a chave só é gasta se o portal puder ser criado.</p></div>
    <div class="lado">${preco?`<span class="preco">${preco}</span>`:""}<button class="dg-btn" data-dgcompra="${dgAtual}">COMPRAR CHAVE</button></div>
  </div>

  <div class="dg-sec" id="dg-s-acesso"><h3>PORTAIS E PVP</h3>
    <div class="dg-modos">
      <div class="dg-modo" style="--c:#7BE07B"><h4>COM CHAVE <span class="pvp">PVP DESLIGADO</span></h4>
        <ul><li>Você abre o portal usando a <strong>${esc(d.chaveNome)}</strong>.</li><li>O portal abre 30 segundos depois.</li><li>Lá dentro o <strong>PvP é desligado</strong>: dá para fazer a masmorra com outras facções sem risco.</li></ul></div>
      <div class="dg-modo" style="--c:#FF4A2A"><h4>PORTAL ALEATÓRIO <span class="pvp">PVP ATIVO</span></h4>
        <ul><li>O portal desta masmorra também aparece sozinho em <strong>coordenadas aleatórias</strong> do mundo.</li><li>O chat anuncia o nível e as coordenadas, e a entrada é liberada <strong>5 minutos</strong> depois.</li><li>Não precisa de chave, mas o <strong>PvP fica ativo</strong>.</li></ul></div>
    </div>
    <div class="dg-prints">
      <figure><img src="assets/portal-mundo.webp?v=3" alt="Portal aleatório da Masmorra Infernal no mundo, com PvP ativo" loading="lazy"><figcaption>Portal aleatório no mundo: dificuldade, PvP <b>ativo</b> e contagem para liberar a entrada.</figcaption></figure>
      <figure><img src="assets/portal-anuncio.webp?v=2" alt="Anúncio no chat do portal aleatório com nível e coordenadas" loading="lazy"><figcaption>Anúncio no chat com o nível e as coordenadas do portal.</figcaption></figure>
    </div>
    <p class="dg-alerta"><b>⚠ Cuidado:</b> só as masmorras abertas com <b>chave</b> têm PvP desligado. Nos portais que surgem em coordenadas aleatórias o PvP é <b>ativo</b>, então outras facções podem te atacar na entrada e lá dentro.</p></div>

  <div class="dg-sec" id="dg-s-como"><h3>COMO FUNCIONA</h3><ol class="dg-passos">${passos.map(x=>`<li>${x}</li>`).join("")}</ol></div>

  <div class="dg-sec" id="dg-s-dif"><h3>DIFICULDADES</h3>
    <div class="dg-difs">${B.difs.map((x,n)=>`<div class="dg-dif" style="--c:${x.cor}"><h4>${x.nome}<span class="dg-perigo">${[1,2,3].map(i=>`<i class="${i<=n+1?"on":""}" style="--k1:${x.cor}"></i>`).join("")}</span></h4>
      <dl>
        <dt>Monstros para abrir o chefe</dt><dd>${x.monstros}</dd><span class="dg-barra"><i style="width:${x.monstros/mx(y=>y.monstros)*100}%"></i></span>
        <dt>Vida dos mobs</dt><dd>${x.vidaMob}</dd>
        <dt>Dano dos mobs</dt><dd>${x.danoMob}</dd>
        <dt>Vida do chefe</dt><dd>${x.vidaBoss.toLocaleString("pt-BR")}</dd><span class="dg-barra"><i style="width:${x.vidaBoss/mx(y=>y.vidaBoss)*100}%"></i></span>
        <dt>Ataque do chefe</dt><dd>${x.ataqueBoss}</dd>
        <dt>${esc(M.plural)} garantidos</dt><dd style="color:${x.cor}">${x.frag}</dd>
      </dl></div>`).join("")}</div>
    <p class="dg-nota">A dificuldade é igual nas duas masmorras: o que decide é o nível sorteado ao abrir o portal. Vida e dano dos mobs variam até 5% para mais ou para menos. A vida do chefe aumenta <strong>20% para cada participante</strong> além do primeiro. A 1ª conclusão do dia <strong>dobra</strong> os fragmentos garantidos, a 2ª dá <strong>+50%</strong> e as seguintes dão o valor normal.</p></div>

  <div class="dg-sec" id="dg-s-mobs"><h3>MOBS</h3>
    <div class="dg-mobs">${d.mobs.map(m=>`<div class="dg-mob">${m.tag?`<span class="tag">${m.tag}</span>`:""}<div class="fig">${m.svg?`<span class="dg-svg">${DG_SVG[m.svg]||""}</span>`:im(m.img,m.nome)}</div>
      <div class="tx"><h4>${esc(m.nome)}</h4><p>${m.txt}</p></div></div>`).join("")}</div>
    <p class="dg-nota">Os mobs comuns têm a vida e o dano definidos pela dificuldade (veja a tabela acima).${d.notaMobs?" "+d.notaMobs:""}</p></div>

  <div class="dg-sec dg-boss" id="dg-s-boss">
    <div class="fig">${im(d.boss.img,d.boss.nome)}</div>
    <div><div class="sub">${d.boss.sub}</div><div class="nome">${d.boss.nome}</div>
      <div class="dg-vida"><div class="r"><span>VIDA</span><span>${B.difs.map(x=>x.vidaBoss.toLocaleString("pt-BR")).join(" / ")}</span></div><div class="b"><i></i></div></div>
      <ul><li><strong>Vida:</strong> 4.000 / 7.000 / 10.000, com +20% por participante além do primeiro.</li><li><strong>Ataque-base:</strong> 8 / 13 / 19, antes dos multiplicadores da dificuldade.</li>${d.boss.itens.map(x=>`<li>${x}</li>`).join("")}</ul></div>
  </div>

  <div class="dg-sec" id="dg-s-rec"><h3>RECOMPENSAS</h3>
    <div class="dg-drops">
      <div class="dg-drop"><div class="ic">${im(M.img,"")}<h4>DROP DOS MOBS</h4></div>
        <div class="big">${B.difs.map(x=>x.dropFrag).join(" / ")}</div><p>Chance de <strong>${esc(M.nome)}</strong> a cada mob morto (Fácil / Normal / Difícil). É o material exclusivo desta masmorra.</p></div>
      <div class="dg-drop"><div class="ic">${im(M.img,"")}<h4>AO CONCLUIR</h4></div>
        <div class="big">${B.difs.map(x=>x.frag).join(" / ")}</div><p><strong>${esc(M.plural)}</strong> garantidos para cada jogador, com bônus na 1ª e na 2ª conclusão do dia.</p></div>
      <div class="dg-drop"><div class="ic"><img src="data:image/svg+xml,${encodeURIComponent(bau)}" alt=""><h4>BAÚS E CHUVA DO CHEFE</h4></div>
        <div class="big">${B.difs.map(x=>x.slot).join(" / ")}</div><p>Chance de item em cada espaço dos baús pessoais. O chefe ainda solta uma <strong>chuva de itens</strong> por 60 segundos.</p></div>
    </div>
    <p style="margin:0 0 10px">Itens sorteados nos baús e na chuva do chefe:</p>
    <div class="dg-tabela">${B.bau.map(([n,v])=>`<div class="l"><span>${n}</span><span class="b"><i style="width:${v}%"></i></span><b>${v}%</b></div>`).join("")}</div>
    <p class="dg-nota">Cada baú tem 27 espaços. Em cada espaço preenchido também há chance de sair 1–2 ${esc(M.plural)} (4% / 7% / 10%). A chuva do chefe gera 4 itens, ou 4 por participante, o que for maior.</p></div>

  <div class="dg-sec" id="dg-s-set"><h3>CONJUNTO ${esc(ch.nome.toUpperCase())}</h3>
    <div class="dg-set">${d.conjunto.map(([k,nome,px],i)=>`<div class="dg-item"><div class="fig">${im(k,nome,px?"px":"")}</div>
      <h4>${esc(nome)}</h4><div class="cus">1 ${B.bases[i]} de Netherite<br><span class="q">+ <b>${B.custos[i]}</b> ${im(M.img,"")} fragmentos</span></div></div>`).join("")}
      ${(window.OLIMPO_GIRO||{})[dgAtual]?(()=>{ const G=window.OLIMPO_GIRO[dgAtual], h=104, w=Math.round(G.w*h/G.h);
        return `<div class="dg-item dg-vestido"><span class="tag">360°</span><div class="fig"><div class="dg-giro" data-giro="${dgAtual}" role="img" aria-label="Personagem com o conjunto completo. Arraste para girar."
          style="width:${w}px;height:${h}px;background-image:url(${G.src});background-size:${w*G.n}px ${h}px"></div></div>
        <h4>Conjunto completo</h4><div class="cus">arraste para girar<br><span class="q">efeito: <b>${esc(d.efeito)}</b></span></div></div>`; })():""}</div>
    <p class="dg-nota">Tudo é fabricado em <strong>/receitas</strong>. A peça de Netherite usada como base mantém os encantamentos e dados dela. As armaduras exigem <strong>nível 55</strong>; ferramentas e arma não exigem nível. Com a armadura completa você recebe <strong>${esc(d.efeito)}</strong>. Os três conjuntos têm os mesmos atributos: o que muda é o efeito do conjunto completo (Força II, Resistência II ou Velocidade II).</p></div>`;
  if (!p) carregarLoja().then(()=>{ if (chaveProduto(dgAtual) && document.body.dataset.view==="dungeons") renderDungeons(); }).catch(()=>{});
}
/* giro 360° do personagem vestido: gira sozinho devagar e com o mouse/dedo arrastando */
(() => {
  let q=0, arr=null, ultimo=0;
  const el=()=>document.querySelector("#v-dungeons .dg-giro");
  const pos=g=>{ const G=(window.OLIMPO_GIRO||{})[g.dataset.giro]; if (!G) return; const w=g.offsetWidth; q=((Math.round(q)%G.n)+G.n)%G.n; g.style.backgroundPosition=`${-q*w}px 0`; };
  setInterval(()=>{ const g=el(); if (!g || arr || document.body.dataset.view!=="dungeons" || Date.now()-ultimo<2500) return; q+=1; pos(g); },140);
  document.addEventListener("pointerdown",e=>{ const g=e.target.closest(".dg-giro"); if (!g) return; arr={x:e.clientX,q,g}; g.setPointerCapture?.(e.pointerId); e.preventDefault(); });
  document.addEventListener("pointermove",e=>{ if (!arr) return; q=arr.q-(e.clientX-arr.x)/7; pos(arr.g); ultimo=Date.now(); });
  const solta=()=>{ if (arr){ arr=null; ultimo=Date.now(); } };
  document.addEventListener("pointerup",solta); document.addEventListener("pointercancel",solta);
})();
$("#v-dungeons").addEventListener("click", e => {
  const pt=e.target.closest("[data-dg]"); if (pt){ dgAtual=pt.dataset.dg; renderDungeons(); return; }
  const cp=e.target.closest("[data-dgcompra]"); if (cp){ comprarChave(cp.dataset.dgcompra); return; }
  const a=e.target.closest("[data-dgir]"); if (a){ e.preventDefault(); const el=document.getElementById(a.dataset.dgir); if (el) el.scrollIntoView({behavior:"smooth",block:"start"}); }
});

/* ================= PARCEIROS ================= */
let pcOk=false;
function renderParceiros(){
  if (pcOk) return; pcOk=true;
  const P=C.parceiros||{}, n=v=>Number(v).toLocaleString("pt-BR"), disc=C.discord||"#";
  const loja=location.hostname||"loja.akardia.net";
  const hojeD=new Date(), dias=["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
  const semana=Array.from({length:7},(_,i)=>{ const d=new Date(hojeD); d.setDate(hojeD.getDate()-((hojeD.getDay()+6)%7)+i); return d; });
  const svg={
    yt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8zM9.7 15.1V8.9L15.5 12z"/></svg>',
    tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.6a7.6 7.6 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.7z"/></svg>',
    kick:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 2h6v6h2V6h2V4h2V2h6v7h-2v2h-2v2h2v2h2v7h-6v-2h-2v-2h-2v-2H9v6H3z"/></svg>',
    tw:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 2 2.5 6v14h5v2.5h3L13 20h4l5-5V2zm16 12-3 3h-5l-2.5 2.5V17H5.5V4H20zM15 7.5h2v5h-2zm-5 0h2v5h-2z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
  };
  const com=P.comissoes||[5,10,15,20], maxC=Math.max(...com);
  $("#pc").innerHTML=`
  <div class="pc-hero">
    <div>
      <div class="pc-kick"><i></i>PROGRAMA DE PARCEIROS · ATUALIZAÇÃO</div>
      <h1>Crie conteúdo sobre o <span>Olimpo</span> e seja recompensado</h1>
      <p>O programa de parceiros da Akardia premia quem cria conteúdo de Minecraft sobre o Factions Olimpo. Você ganha um <strong>código de apoiador exclusivo</strong>, recebe <strong>comissão</strong> pelas compras feitas com ele e ainda ganha <strong>Cash por like</strong> nos seus vídeos.</p>
      <span class="pc-autor"><span class="pc-por">Por:</span><img src="${(window.OLIMPO_CABECAS||{})[P.autorSkin]||cabeca(P.autor||"Steve",48)}" alt="" onerror="this.src='${cabeca("Steve",48)}'"><b>${esc(P.autor||"Equipe")}</b><span class="pc-data">${esc(P.data||"")}</span></span>
    </div>
    <div class="pc-tv" aria-hidden="true"><span class="cash">+${n(P.cashPorLike||10)} CASH</span><span class="likes">👍 <em id="pc-tvl">0</em></span><span class="play"></span><span class="barra"><i></i></span></div>
  </div>
  <nav class="pc-menu" id="pc-menu">${[
      ["pc-s-cod","CÓDIGO",'<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>'],
      ["pc-s-com","COMISSÕES",'<path d="M4 20V12M10 20V8M16 20V4M2 20h20"/>'],
      ["pc-s-cash","CASH",'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.6c0 2.4-5 1-5 3.3 0 1 1 1.6 2.5 1.6s2.5-.5 2.5-1.5"/>'],
      ["pc-s-req","REQUISITOS",'<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>'],
      ["pc-s-pag","PAGAMENTOS",'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
      ["pc-s-div","DIVULGAÇÃO",'<path d="M3 11v2a1 1 0 0 0 1 1h3l6 5V5L7 10H4a1 1 0 0 0-1 1zM17 8a5 5 0 0 1 0 8"/>'],
      ["pc-s-quem","QUEM PODE",'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.5.6 4 2.7 4 6"/>'],
      ["pc-s-ent","ENTRAR",'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>']
    ].map(([i,t,ic],k)=>`<a class="pc-mb" data-pcir="${i}" style="--k:${k}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg><span>${t}</span></a>`).join("")}<i class="pc-prog" id="pc-prog"></i></nav>

  <div class="pc-sec" id="pc-s-cod"><h2>COMO FUNCIONA O CÓDIGO</h2><p class="sub">// do seu vídeo até a sua comissão</p>
    <div class="pc-passos">
      <div class="pc-passo"><b>Você recebe um código</b><p>Todo parceiro ganha um código de apoiador só dele, para divulgar nos vídeos e lives.</p><span class="pc-codigo">SEUNICK</span></div>
      <div class="pc-passo"><b>O jogador usa na compra</b><p>Na hora de pagar, ele coloca o seu código no campo <strong>“Apoie um criador”</strong> da loja. O preço não muda para ele.</p></div>
      <div class="pc-passo"><b>Você ganha comissão</b><p>Uma parte de cada compra feita com o seu código vai para você, de acordo com o seu nível de comissão.</p></div>
    </div></div>

  <div class="pc-sec" id="pc-s-com"><h2>NÍVEIS DE COMISSÃO</h2><p class="sub">// quanto mais você cresce, maior a sua parte</p>
    <div class="pc-colunas">${com.map((c,i)=>`<div class="pc-col"><span class="topo">${c}%</span><span class="capitel"></span><span class="fuste" style="--h:${Math.round(60+150*c/maxC)}px;--d:${(i*.12).toFixed(2)}s"></span><span class="base"></span><span class="nome">COMISSÃO ${i+1}</span></div>`).join("")}</div>
    <p style="margin:18px 0 0">Todo parceiro começa na <strong>Comissão 1</strong>. Os critérios para subir de nível serão anunciados em breve.</p></div>

  <div class="pc-sec" id="pc-s-cash"><h2>CASH POR LIKE</h2><p class="sub">// além da comissão, seus vídeos rendem Cash no servidor</p>
    <div class="pc-calc">
      <div><label for="pc-l">ARRASTE PARA SIMULAR OS LIKES DE UM VÍDEO</label><input id="pc-l" type="range" min="0" max="800" step="10" value="100">
        <div class="likes"><span id="pc-lv">100</span> <small>LIKES</small></div>
        <p style="margin:12px 0 0">A cada like no seu vídeo você ganha <strong class="v">${n(P.cashPorLike||10)} de Cash</strong>. Exemplo: 100 likes = <strong class="v">${n(100*(P.cashPorLike||10))} de Cash</strong>.</p></div>
      <div class="pc-res"><small>VOCÊ RECEBE</small><div class="val"><span id="pc-cv">0</span> <small style="display:inline;font-size:14px">CASH</small></div>
        <div class="barra"><i id="pc-cb"></i><b title="limite"></b></div><small>limite por resgate: ${n(P.limiteResgate||4000)} de Cash</small><p class="msg" id="pc-msg"></p></div>
    </div>
    <p style="margin:16px 0 0">O limite por resgate é de <strong>${n(P.limiteResgate||4000)} de Cash</strong>. Isso mantém o equilíbrio do servidor, já que alguns parceiros têm muitos likes e outros têm menos.</p></div>

  <div class="pc-sec" id="pc-s-req"><h2>REQUISITOS DOS VÍDEOS</h2><p class="sub">// para o vídeo contar</p>
    <div class="pc-req">
      <div><b>${P.minLikes||30}+</b><span>likes no mínimo em cada vídeo para ele contar.</span></div>
      <div><b>${P.minVideos||1}+</b><span>vídeo${(P.minVideos||1)>1?"s":""} postado${(P.minVideos||1)>1?"s":""} sobre o servidor para poder receber.</span></div>
      <div><b>100%</b><span>likes orgânicos. Os vídeos passam por análise antes de contar.</span></div>
    </div>
    <p style="margin:16px 0 0">Se identificarmos uso de bots ou qualquer tipo de manipulação, o vídeo não conta e o criador fica sujeito a <strong>perder a parceria</strong> e o acesso ao código de apoiador.</p></div>

  <div class="pc-sec" id="pc-s-pag"><h2>COMO OS PAGAMENTOS FUNCIONAM</h2><p class="sub">// toda semana, sempre na segunda-feira</p>
    <div class="pc-semana">${semana.map(d=>`<div class="pc-dia ${d.getDay()===1?"pg":""}">${dias[d.getDay()]}<b>${String(d.getDate()).padStart(2,"0")}</b></div>`).join("")}</div>
    <p>Os pagamentos são <strong>semanais</strong>. O valor é sempre transferido <strong>toda segunda-feira</strong>. Depois que a transferência é feita, o prazo do banco para o dinheiro cair na sua conta pode variar dentro dessa janela.</p>
    <div class="pc-aviso"><b>AVISO IMPORTANTE</b><p>O pagamento da comissão depende das vendas feitas com o seu código. Não entre no programa contando com uma renda fixa: quem tem um público menor gera valores menores.</p></div></div>

  <div class="pc-sec" id="pc-s-div"><h2>DIVULGAÇÃO</h2><p class="sub">// clique para copiar</p>
    <div class="pc-tags">${(P.hashtags||[]).map(h=>`<button class="pc-tag" data-copia="${esc(h)}"><small>USE NO VÍDEO</small>${esc(h)}</button>`).join("")}</div>
    <p style="margin:0 0 12px">Sempre que divulgar o servidor ou o seu código, deixe claro que você é parceiro:</p>
    <ul class="pc-lista">
      <li><strong>Posts:</strong> nas duas primeiras linhas do texto.</li>
      <li><strong>Stories e carrosséis:</strong> texto em cima de cada quadro, em letra grande e cor que dê para ler.</li>
      <li><strong>Vídeos:</strong> no começo do vídeo e na descrição.</li>
      <li><strong>Lives:</strong> repita com frequência durante a transmissão.</li>
      <li><strong>Links obrigatórios na descrição:</strong> <span class="v">${esc(loja)}</span> e o Discord do servidor.</li>
    </ul></div>

  <div class="pc-sec" id="pc-s-quem"><h2>QUEM PODE PARTICIPAR</h2><p class="sub">// conteúdo de jogos, não precisa ser só Minecraft</p>
    <div class="pc-plats">
      <div class="pc-plat" style="--c:#ff3b3b">${svg.yt}<b>YouTube</b><span>100 inscritos e 300 views no último vídeo</span></div>
      <div class="pc-plat" style="--c:#7ff5ff">${svg.tt}<b>TikTok</b><span>300 seguidores ou 1 mil views de média</span></div>
      <div class="pc-plat" style="--c:#53fc18">${svg.kick}<b>Kick</b><span>20 seguidores</span></div>
      <div class="pc-plat" style="--c:#a970ff">${svg.tw}<b>Twitch</b><span>40 seguidores</span></div>
      <div class="pc-plat" style="--c:#ff5fb0">${svg.ig}<b>Instagram</b><span>400 seguidores com conteúdo de jogos</span></div>
    </div>
    <p style="margin:0 0 10px">Basta cumprir <strong>uma</strong> das plataformas acima. Atividade mínima por semana, só nos formatos que você declarar:</p>
    <div class="pc-ritmo"><div><b>1</b><span>vídeo longo (mais de 3 min)</span></div><div><b>3</b><span>shorts, TikToks ou reels</span></div><div><b>1</b><span>live</span></div></div>
    <ul class="pc-lista">
      <li>Ter <strong>18 anos ou mais</strong> e CPF válido, para receber os pagamentos.</li>
      <li>Não ter banimento permanente no servidor por motivo grave.</li>
      <li>Nada de conteúdo adulto, político ou que quebre as regras das plataformas.</li>
      <li>Se a atividade mínima não for cumprida, o código de apoiador é desativado. Para voltar, retome as postagens e fale com a equipe.</li>
    </ul></div>

  <div class="insc" id="pc-s-ent"><h2>Como se inscrever</h2>
    <p>Preencha o formulário com os dados do seu canal e aguarde a análise da nossa equipe. O processo é rápido e a resposta chega pelo Discord.</p>
    <a class="insc-link" href="${esc(P.formulario||disc)}" target="_blank" rel="noopener">Quero me inscrever <span aria-hidden="true">→</span></a></div>`;
  const cpl=P.cashPorLike||10, lim=P.limiteResgate||4000, minL=P.minLikes||30, r=$("#pc-l");
  const calc=()=>{ const l=+r.value, c=l<minL?0:Math.min(l*cpl,lim); $("#pc-lv").textContent=n(l); $("#pc-cv").textContent=n(c);
    $("#pc-cb").style.width=Math.min(100,l*cpl/lim*100)+"%"; const m=$("#pc-msg");
    if (l<minL){ m.className="msg ruim"; m.textContent=`Abaixo de ${minL} likes o vídeo não conta.`; }
    else if (l*cpl>lim){ m.className="msg teto"; m.textContent=`Chegou no limite: ${n(l*cpl)} viraria ${n(lim)} neste resgate.`; }
    else { m.className="msg"; m.textContent=`${n(l)} likes × ${n(cpl)} de Cash.`; } };
  r.oninput=calc; calc();
  // menu: destaca a parte que está na tela e mostra o progresso da leitura
  const ids=[...document.querySelectorAll("#pc-menu [data-pcir]")].map(a=>a.dataset.pcir);
  const spy=()=>{ if (document.body.dataset.view!=="parceiros") return; let at=ids[0];
    for (const id of ids){ const el=document.getElementById(id); if (el && el.getBoundingClientRect().top < 220) at=id; }
    document.querySelectorAll("#pc-menu .pc-mb").forEach(a=>a.classList.toggle("on", a.dataset.pcir===at));
    const pc=$("#pc"), r=pc.getBoundingClientRect(), tot=r.height-innerHeight, p=Math.min(1,Math.max(0,-r.top/(tot>0?tot:1)));
    $("#pc-prog").style.width=(p*100).toFixed(1)+"%"; };
  addEventListener("scroll",spy,{passive:true}); spy();
  let tv=0; setInterval(()=>{ const e=$("#pc-tvl"); if (!e || document.body.dataset.view!=="parceiros") return; tv=(tv+7)%999; e.textContent=n(tv); },120);
}
$("#v-parceiros").addEventListener("click", e => {
  const a=e.target.closest("[data-pcir]"); if (a){ const el=document.getElementById(a.dataset.pcir); if (el) el.scrollIntoView({behavior:"smooth",block:"start"}); return; }
  const t=e.target.closest("[data-copia]"); if (t) copiar(t.dataset.copia, "> copiado: "+t.dataset.copia);
});

/* ================= BLOG (postagens da configuração: window.OLIMPO.blog) ================= */
const demoPosts=[
  {title:"Inauguração do Factions Olimpo",author:"SrKaio",published_at:"06 out 2026",content:"<p>As portas do Olimpo estão abertas. Primeira temporada valendo, com evento de abertura no spawn.</p>"},
  {title:"Temporada 1: guerra pelos tronos",author:"akahasky",published_at:"06 out 2026",content:"<p>Regras de invasão, premiação da temporada e tudo o que muda no mapa.</p>"}
];
let posts=null;
async function iniciarBlog(){
  $("#leitor").hidden=true; $("#blog-lista").hidden=false;
  if (posts) return;
  $("#posts").innerHTML='<div class="esq"></div><div class="esq"></div>';
  // as postagens ficam na configuração do site (window.OLIMPO.blog), não na CentralCart
  posts = Array.isArray(C.blog) ? C.blog : [];
  if (!posts.length){ $("#posts").innerHTML=""; return; }
  $("#posts").innerHTML = posts.map((p,i) => `<button class="painel post" data-p="${i}">
    <div class="barra"><span class="pontos"><i></i><i></i><i></i></span>${esc(p.published_at||"")}<span class="tag">ATUALIZAÇÃO</span></div>
    <div class="capa">${p.image?`<img src="${esc(p.image)}" alt="" loading="lazy">`:`<span>${esc(p.title)}</span>`}</div>
    <div class="p-info"><h3>${esc(p.title)}</h3><small>Por: ${esc(p.author||"Equipe")}</small><span class="ler">LER &gt;</span></div></button>`).join("");
}
$("#posts").onclick = e => {
  const b=e.target.closest("[data-p]"); if (!b) return; const p=posts[+b.dataset.p];
  $("#blog-lista").hidden=true; $("#leitor").hidden=false; scrollTo({top:0});
  const t=$("#l-titulo"); t.dataset.full=p.title; t.dataset.tw="30";
  const m=$("#l-meta"); m.dataset.full=`// ${p.published_at||""} — por ${p.author||"Equipe"}`; m.dataset.tw="10";
  $("#l-conteudo").innerHTML=(p.image?`<img src="${esc(p.image)}" alt="">`:"")+limparHTML(p.content||"");
  digitar($("#leitor"));
};
$("#voltar-blog").onclick = () => { $("#leitor").hidden=true; $("#blog-lista").hidden=false; };

/* ================= LOJA ================= */
const demoCats=[{id:1,name:"VIPs"},{id:2,name:"Chaves"},{id:3,name:"Cash"}];
const demoProds=[
  {id:1,category_id:1,name:"VIP Cavaleiro",description:"",pricing:{price:21.29},stock:{available:true},fields:[]},
  {id:2,category_id:1,name:"VIP Lorde",description:"",pricing:{price:35.57},stock:{available:true},fields:[]},
  {id:3,category_id:1,name:"VIP Soberano",description:"",pricing:{price:57},stock:{available:true},fields:[]},
  {id:4,category_id:1,name:"VIP Imperador",description:"",pricing:{price:99.86},stock:{available:true},fields:[]},
  {id:5,category_id:2,name:"Chave do Santuário das Profundezas",description:"",pricing:{price:9.9},stock:{available:true},fields:[]},
  {id:6,category_id:2,name:"Chave da Masmorra Infernal",description:"",pricing:{price:9.9},stock:{available:true},fields:[]},
  {id:7,category_id:2,name:"Chave do Calabouço Assombrado",description:"",pricing:{price:9.9},stock:{available:true},fields:[]},
  {id:8,category_id:3,name:"1.000 Cash",description:"",pricing:{price:9.9},stock:{available:true},fields:[]},
  {id:9,category_id:3,name:"2.100 Cash",description:"",pricing:{price:18.05,compare_at:19},stock:{available:true},fields:[]},
  {id:10,category_id:3,name:"4.300 Cash",description:"",pricing:{price:35.91,compare_at:39.9},stock:{available:true},fields:[]},
  {id:11,category_id:3,name:"8.700 Cash",description:"",pricing:{price:67.92,compare_at:79.9},stock:{available:true},fields:[]}
];
let cats=[], prods=[], catAtual="all", resolvidos={}, cupom="", cupomInfo=null, lojaOk=false, lojaP=null;
let cart=[]; try { cart=JSON.parse(localStorage.getItem("olimpo_cart")||"[]"); } catch {}
const salvar=()=>{ try { localStorage.setItem("olimpo_cart",JSON.stringify(cart)); } catch {} };

function carregarLoja(){
  if (lojaP) return lojaP;
  lojaP = (async () => {
    if (DEMO){ cats=demoCats; prods=demoProds; return; }
    const [c,p]=await Promise.all([api("/webstore/category"),api("/webstore/package?category_id=all&limit=100")]);
    cats=Array.isArray(c)?c:(c.data||[]); prods=p.data||[];
  })();
  return lojaP;
}
carregarLoja().then(() => { montarVitrine(); }).catch(()=>{ lojaP=null; });
// vitrine 3D girando na home: os produtos da loja com a arte de cada um
function montarVitrine(){
  const anel=$("#vt3-anel"); if (!anel) return;
  const ordemVip=ORDEM_VIPS(), ordemCh=Object.keys(C.chaves||{});
  const peso=p=>{ const v=chaveVip(p.name); if (v) return ordemVip.indexOf(v); const n=semAcento(p.name); const k=/chave/.test(n)?ordemCh.find(x=>n.includes(semAcento(x))):null; if (k) return 10+ordemCh.indexOf(k); return ehCash(p.name)?20:30; };
  const lista=[...prods].sort((a,b)=>peso(a)-peso(b)).slice(0,10);
  const n=Math.max(lista.length,3), r=Math.round(75/Math.tan(Math.PI/n))+8;
  anel.style.setProperty("--n",n); anel.style.setProperty("--r",r+"px");
  anel.innerHTML=lista.map((p,i)=>{
    const v=chaveVip(p.name), ch=chaveDe(p.name), cs=!v&&!ch&&ehCash(p.name);
    const cor = v ? C.vips[v][0] : ch ? ch.cor : cs ? C.cash.cor : "#F4C542";
    const arte = p.image ? `<img src="${esc(p.image)}" alt="" style="width:100%;height:100%;object-fit:cover">` : (v ? vipArte(p.name) : ch ? chaveArte(p.name) : cs ? cashArte(p.name) : "");
    return `<div class="vt3-item" style="--i:${i};--c:${cor}"><div class="img">${arte}</div><div class="rot"><span>${esc(p.name)}</span><b>${brl(p.pricing?.price)}</b></div></div>`;
  }).join("");
  $("#h2-mini").innerHTML = Object.keys(C.vips||{}).map(k=>(window.OLIMPO_TAGS||{})[k]?`<img src="${window.OLIMPO_TAGS[k]}" alt="${k}">`:"").join("");
}

async function iniciarLoja(){
  $("#aviso").innerHTML = `<div class="selos">
    <div class="selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg><div><b>Entrega automática</b><span>cai direto no seu nick</span></div></div>
    <div class="selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg><div><b>Compra segura</b><span>pagamento protegido</span></div></div>
    <div class="selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg><div><b>Suporte no Discord</b><span>tire dúvidas com a equipe</span></div></div>
    <div class="selo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg><div><b>Apoie um criador</b><span>use o código no checkout</span></div></div>
  </div>`;
  if (lojaOk) return;
  $("#produtos").innerHTML = Array(3).fill('<div class="esq"></div>').join("");
  try { await carregarLoja(); lojaOk=true; renderLoja(); }
  catch(e){ lojaP=null; $("#produtos").innerHTML=""; $("#aviso").innerHTML=`<div class="aviso">// não foi possível carregar a loja: ${esc(e.message)} Confira o <code>storeDomain</code>.</div>`; }
}
function renderLoja(){
  { const bloq=new Set(prods.filter(p=>chaveDe(p.name)?.emBreve).map(p=>p.id));
    if (bloq.size && cart.some(i=>bloq.has(i.id))){ cart=cart.filter(i=>!bloq.has(i.id)); salvar(); atualizarCarrinho(); } }
  $("#cats").innerHTML = [{id:"all",name:"TUDO"},...cats].map(c => `<button class="cat" data-cat="${c.id}" aria-pressed="${String(c.id)===String(catAtual)}">${esc(c.name)}</button>`).join("");
  // ordem fixa: VIPs (Cavaleiro → Imperador), depois as chaves na mesma ordem de cor dos VIPs
  // (Santuário embaixo do Cavaleiro, Calabouço embaixo do Lorde, Infernal embaixo do Soberano), depois o resto
  const ordemVip=ORDEM_VIPS(), ordemCh=Object.keys(C.chaves||{});
  const peso = p => { const v=chaveVip(p.name); if (v) return ordemVip.indexOf(v);
    const n=semAcento(p.name), k=/chave/.test(n) ? ordemCh.find(x=>n.includes(semAcento(x))) : null; if (k) return 10+ordemCh.indexOf(k);
    if (ehCash(p.name)) return 20; if (ehCombo(p.name)) return 25; return 30; };
  // o combo aparece só no destaque em cima, não na grade
  const lista = (catAtual==="all" ? prods : prods.filter(p=>String(p.category_id)===String(catAtual))).filter(p=>!ehCombo(p.name))
    .map((p,i)=>({p,i})).sort((a,b)=>peso(a.p)-peso(b.p) || a.i-b.i).map(x=>x.p);
  // destaque do combo em cima da loja
  { const cb=prods.find(p=>ehCombo(p.name)&&p.stock?.available!==false), el=$("#destaque");
    if (cb && C.combo){ const pr=Number(cb.pricing?.price)||0, av=deProd(cb)||avulsoCombo(), eco=av&&av>pr?av-pr:0, pc=av?Math.round((1-pr/av)*100):0;
      el.innerHTML=`<section class="cb-dest" style="--k1:${C.combo.cor};--k2:${C.combo.cor2}">
        <div class="cb-arte"><img src="${esc(C.combo.arte||cb.image||"")}" alt="${esc(cb.name)}"></div>
        <div class="cb-txt"><span class="cb-tag">★ OFERTA ESPECIAL${pc?` · ${pc}% OFF`:""}</span><h2>${esc(cb.name).toUpperCase()}</h2>
          <ul>${(C.combo.itens||[]).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
          <div class="cb-preco">${eco?`<s>${brl(av)}</s>`:""}<strong>${brl(pr)}</strong>${eco?`<em>economize ${brl(eco)}</em>`:""}</div>
          <button class="btn btn-cheio" data-ver="${cb.id}">&gt; QUERO O COMBO</button></div></section>`;
      el.querySelector("[data-ver]").onclick=()=>abrirProduto(cb.id);
    } else el.innerHTML=""; }
  if (!lista.length){ $("#produtos").innerHTML='<p class="vazio">Nenhum produto nesta categoria ainda.</p>'; return; }
  $("#produtos").innerHTML = lista.map(p => {
    const pr=p.pricing||{}, disp=p.stock?.available!==false;
    const preco = pr.min!=null&&pr.max!=null&&pr.min!==pr.max ? `${brl(pr.min)} – ${brl(pr.max)}` : brl(pr.price);
    const vip = corVip(p.name), rotulo = vip ? Object.keys(C.vips).find(k=>p.name.toLowerCase().includes(k.toLowerCase())).toUpperCase() : "";
    const ch = chaveDe(p.name), cs = !vip && !ch && ehCash(p.name), cb = !vip && !ch && !cs && ehCombo(p.name), breve = !!(ch && ch.emBreve);
    if (cb){ const av=deProd(p)||avulsoCombo(), eco=av&&av>pr.price?av-pr.price:0;
      return `<article class="painel prod chave combo" style="--k1:${C.combo.cor};--k2:${C.combo.cor2}"><div class="img"><img src="${esc(mini(C.combo.arte||p.image))}" alt="" loading="lazy" decoding="async"><span class="cb-fita">COMBO</span></div>
      <div class="info"><h3><span class="cb-nome">${esc(p.name)}</span></h3><p class="resumo">${esc(C.combo.resumo)}</p><div class="preco"><strong>${preco}</strong>${eco?`<s>${brl(av)}</s>`:""}</div>
      ${eco?`<p class="cb-eco">Você economiza ${brl(eco)}</p>`:""}${disp?botaoFx(p, true, null, false):'<span class="esgotado">ESGOTADO</span>'}</div></article>`; }
    return `<article class="painel prod${vip?" vip":""}${ch?" chave":""}${cs?" chave cash":""}${breve?" bloqueado":""}" ${vip?vipStyle(p.name):(ch?`style="--k1:${ch.cor};--k2:${ch.cor2}"`:(cs?`style="--k1:${C.cash.cor};--k2:${C.cash.cor2}"`:""))}><div class="img">${p.image?`<img src="${esc(mini(p.image))}" alt="" loading="lazy" decoding="async">`:(vip?(vipArte(p.name) || tagHTML(p.name) || `<span class="ph vip-nome">${rotulo}</span>`):(ch?chaveArte(p.name):(cs?cashArte(p.name):'<span class="ph">⚡</span>')))}
      ${pctProd(p)?`<span class="selo-desc">${pctProd(p)}% OFF</span>`:""}</div>
      <div class="info"><h3>${nomeHTML(p.name)}</h3>${resumoProd(p)?`<p class="resumo">${esc(resumoProd(p))}</p>`:""}<div class="preco"><strong>${preco}</strong>${pr.compare_at?`<s>${brl(pr.compare_at)}</s>`:""}</div>
      ${breve?'<span class="breve">🔒 EM BREVE</span>':(disp?botaoFx(p, vip, ch, cs):'<span class="esgotado">ESGOTADO</span>')}</div></article>`;
  }).join("");
  window.etReaplicar && window.etReaplicar();
  const temVip = lista.some(p=>chaveVip(p.name));
  $("#cmp-secao").innerHTML = (temVip && C.vantagens) ? `<div class="secao-t" style="margin-top:34px"><h2>COMPARAR VIPs</h2><span>// veja o que cada VIP libera no servidor</span></div>${tabelaVips(null)}` : "";
}
$("#cats").onclick = e => { const b=e.target.closest("[data-cat]"); if (!b) return; catAtual=b.dataset.cat; renderLoja(); };
$("#produtos").onclick = e => { const b=e.target.closest("[data-ver]"); if (b) abrirProduto(+b.dataset.ver); };

/* ---------- modais ---------- */
let poll;
const abrirM = id => { $(id).classList.add("on"); $("#fundo").classList.add("on"); };
function fecharM(){ $$(".modal.on,.gaveta.on").forEach(m=>m.classList.remove("on")); $("#fundo").classList.remove("on"); clearInterval(poll); }
$("#fundo").onclick = fecharM;
document.addEventListener("click", e => { if (e.target.closest("[data-x]")) fecharM(); });
$$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target===m) fecharM(); }));
document.addEventListener("keydown", e => { if (e.key==="Escape") fecharM(); });
document.addEventListener("click", e => { const b=e.target.closest("[data-comparar]"); if (!b) return;
  const atual=$("#m-prod.on") ? chaveVip($("#mp-t").textContent+" "+($("#mp-t img")?.alt||"")) : null;
  fecharM(); $("#cmp-c").innerHTML=tabelaVips(atual); abrirM("#m-cmp"); });

const campoHTML=(f,pre)=>{
  const id=pre+f.name, req=f.required?"required":"", lb=esc(f.label||f.description||f.name);
  if (f.type==="SELECT" && Array.isArray(f.options))
    return `<div class="campo"><label for="${id}">${lb}</label><select id="${id}" name="${esc(f.name)}" ${req}>${f.options.map(o=>`<option>${esc(o.value??o.name??o)}</option>`).join("")}</select></div>`;
  return `<div class="campo"><label for="${id}">${lb}${f.required?"":" (opcional)"}</label><input id="${id}" name="${esc(f.name)}" type="${f.type==="NUMBER"?"number":"text"}" ${req}></div>`;
};
function abrirProduto(id){
  const p=prods.find(x=>x.id===id); if (!p) return;
  if (chaveDe(p.name)?.emBreve){ toast("> chave em breve: ainda não está à venda"); return; }
  $("#mp-t").innerHTML=(tagHTML(p.name) || nomeHTML(p.name.toUpperCase())); const fields=p.fields||[];
  const kv = C.vantagens ? chaveVip(p.name) : null;
  $("#m-prod .caixa").classList.toggle("larga", !!kv);
  const cbx=ehCombo(p.name), cbav=cbx?avulsoCombo():null, cbeco=cbav&&cbav>(p.pricing?.price||0)?cbav-p.pricing.price:0;
  $("#mp-c").innerHTML=`${cbx ? `<img src="${esc(C.combo.arte||p.image||"")}" alt="" style="margin-bottom:14px;border:1px solid var(--ouro-sutil);width:100%">
      <div class="mp-desc" style="margin-bottom:10px"><b>O combo inclui:</b><ul class="ch-lista">${(C.combo.itens||[]).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>${cbeco?`<p style="color:#7be36a;font-weight:700">Separado sai ${brl(cbav)}. No combo você economiza ${brl(cbeco)}.</p>`:""}</div>` : ""}${cbx ? "" : kv ? previaVip(kv,p.name) : (p.image?`<img src="${esc(p.image)}" alt="" style="margin-bottom:14px;border:1px solid var(--ouro-sutil)">`:(chaveDe(p.name)?`<div class="mp-arte">${chaveArte(p.name)}</div>`:(ehCash(p.name)?`<div class="mp-arte">${cashArte(p.name)}</div>`:"")))}
    ${kv ? `<div class="vt-tit">VANTAGENS DO VIP</div>${vantagensVip(kv)}` : ""}
    <div class="mp-desc">${(p.description && limparHTML(p.description)) || (chaveDe(p.name) ? textoChave(chaveDe(p.name)) : (ehCash(p.name) ? C.cash.descricao+`<ul class="ch-lista"><li><b>Onde usar:</b> digite <b>/kit</b> dentro do servidor e troque em <b>Itens valiosos</b> ou <b>Caixas Divinas dos Deuses</b>.</li><li><b>Entrega:</b> o cash cai direto no seu nick assim que o pagamento é aprovado.</li></ul>` : ""))}</div>${ehCash(p.name)?tabelaCash(valorCash(p.name)):""}
    <form id="f-prod">${fields.map(f=>campoHTML(f,"pf-")).join("")}
      <div class="campo"><label for="pf-q">Quantidade</label><input id="pf-q" type="number" min="${p.stock?.min_amount||1}" value="${p.stock?.min_amount||1}"></div>
      <div class="total" style="margin-bottom:14px"><span>PREÇO${pctProd(p)?` <em class="selo-off">${pctProd(p)}% OFF</em>`:""}</span><strong>${deProd(p)?`<s class="de">${brl(deProd(p))}</s>`:""}${brl(p.pricing?.price)}</strong></div>
      <button class="btn btn-cheio" style="width:100%">ADICIONAR AO CARRINHO</button></form>`;
  if (kv){
    const inp=$("#pv-input");
    inp.addEventListener("input",()=>{ clearTimeout(inp._t); inp._t=setTimeout(()=>{
      const n=inp.value.trim(); if (n && !/^[A-Za-z0-9_]{1,16}$/.test(n)) return; nickPrevia=n;
      const box=$("#mp-c .pv"), novo=document.createElement("div"); novo.innerHTML=previaVip(kv,p.name);
      box.querySelector(".pv-tagnome").replaceWith(novo.querySelector(".pv-tagnome"));
      box.querySelector(".pv-chat").replaceWith(novo.querySelector(".pv-chat"));
      box.querySelector(".pv-skin").src=novo.querySelector(".pv-skin").src;
    },350); });
  }
  $("#f-prod").onsubmit=e=>{
    e.preventDefault(); const options={};
    fields.forEach(f=>{ const v=e.target.elements[f.name]?.value?.trim(); if (v) options[f.name]=v; });
    const q=Math.max(1,parseInt($("#pf-q").value)||1);
    const ex=cart.find(i=>i.id===p.id&&JSON.stringify(i.options)===JSON.stringify(options));
    ex?ex.quantity+=q:cart.push({id:p.id,quantity:q,options});
    salvar(); fecharM(); atualizarCarrinho(); toast(`> ${p.name} adicionado ao carrinho`);
  };
  abrirM("#m-prod");
}

/* ---------- carrinho: preço sempre resolvido no servidor ---------- */
async function atualizarCarrinho(){
  $("#badge").textContent=cart.reduce((s,i)=>s+i.quantity,0);
  if (!cart.length){ $("#itens").innerHTML='<p class="vazio">// carrinho vazio</p>'; $("#total").textContent=brl(0); $("#ir-checkout").disabled=true; return; }
  $("#ir-checkout").disabled=false;
  try {
    await carregarLoja().catch(()=>{});
    const res = DEMO ? prods.filter(p=>cart.some(i=>i.id===p.id))
      : await api("/webstore/cart",{method:"POST",body:JSON.stringify({items:cart.map(i=>({id:i.id,quantity:i.quantity}))})});
    resolvidos=Object.fromEntries(res.map(p=>[p.id,p])); cart=cart.filter(i=>resolvidos[i.id]); salvar();
  } catch(e){ toast(e.message); }
  let total=0, deTot=0;
  const dsc=calcDesconto();
  $("#itens").innerHTML=cart.map((i,k)=>{
    const p=resolvidos[i.id]||{name:"Produto",pricing:{price:0}}, sub=(p.pricing?.price||0)*i.quantity; total+=sub;
    const novo=dsc.porItem[i.id]!=null ? sub-dsc.porItem[i.id] : null, deI=deProd(p)*i.quantity; deTot+=deI||sub;
    const o=Object.entries(i.options||{}).map(([a,b])=>`${esc(a)}: ${esc(b)}`).join(" · ");
    return `<div class="item"><span style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">${tagHTML(p.name)}${nomeHTML(p.name)}</span><strong style="color:var(--ouro);text-align:right">${novo!=null&&novo<sub?`<s class="de">${brl(deI||sub)}</s>${brl(novo)}`:deI?`<s class="de">${brl(deI)}</s>${brl(sub)}`:brl(sub)}</strong>${o?`<span class="opts">${o}</span>`:""}
      <div class="qtd"><button data-q="${k}" data-d="-1" aria-label="Diminuir">−</button><span>${i.quantity}</span><button data-q="${k}" data-d="1" aria-label="Aumentar">+</button></div>
      <button class="rem" data-rem="${k}">remover</button></div>`;
  }).join("");
  $("#badge").textContent=cart.reduce((s,i)=>s+i.quantity,0);
  mostrarResumo(total,dsc,deTot);
}
/* ---------- cupom: mostra o desconto antes do pagamento ---------- */
// calcula o desconto do cupom sobre os itens do carrinho (prévia: o valor final é confirmado pela loja no pagamento)
function calcDesconto(){
  const r={valor:0,porItem:{},falta:0,cod:cupom};
  const d=cupomInfo; if (!cupom||!d) return r;
  const num=v=>Number(String(v??"").replace(",","."))||0;
  const val=num(d.value??d.amount??d.discount), tipo=String(d.type||d.discount_type||"PERCENTAGE").toUpperCase();
  // applies_to pode vir como números, textos ou objetos {id}; vazio = vale para tudo
  // -1 na lista = vale para todos os produtos (é assim que a CentralCart manda)
  let lista=(Array.isArray(d.applies_to)?d.applies_to:[]).map(x=>String(x&&typeof x==="object"?(x.id??x.package_id??x.product_id):x));
  if (lista.includes("-1")) lista=[];
  const itens=cart.map(i=>{const p=resolvidos[i.id]||{};return {id:i.id,cat:p.category_id,sub:num(p.pricing?.price)*i.quantity};});
  const subtotal=itens.reduce((a,b)=>a+b.sub,0);
  const elegiveis=itens.filter(i=>!lista.length||lista.includes(String(i.id))||(i.cat!=null&&lista.includes(String(i.cat))));
  const base=elegiveis.reduce((a,b)=>a+b.sub,0);
  if (!base){ r.fora=lista.length>0; return r; }
  const minimo=num(d.min_price);
  if (minimo && subtotal<minimo){ r.falta=minimo-subtotal; return r; }
  if (tipo==="FIXED"||tipo==="AMOUNT"||tipo==="VALUE"){
    const tot=Math.min(val,base);
    elegiveis.forEach(i=>r.porItem[i.id]=(r.porItem[i.id]||0)+tot*i.sub/base);
  } else {
    elegiveis.forEach(i=>r.porItem[i.id]=(r.porItem[i.id]||0)+i.sub*Math.min(val,100)/100);
  }
  r.valor=Object.values(r.porItem).reduce((a,b)=>a+b,0);
  return r;
}
const rotuloCupom=d=>/FIXED|AMOUNT|VALUE/i.test(d?.type||"")?`−${brl(Number(d.value)||0)}`:`−${Number(d?.value)||0}%`;
function mostrarResumo(total,dsc,deTot=0){
  const el=$("#resumo"), final=Math.max(0,total-dsc.valor), ofer=deTot>total?deTot-total:0;
  if (ofer>0 && !(dsc.valor>0)){
    el.innerHTML=`<div class="linha"><span>Preço normal</span><span>${brl(deTot)}</span></div>
      <div class="linha desc"><span>Descontos da loja</span><span>−${brl(ofer)}</span></div>`;
    el.hidden=false; $("#total").innerHTML=`<s class="de">${brl(deTot)}</s>${brl(total)}`;
    $("#total").dataset.final=brl(total); $("#total").dataset.desc=""; return;
  }
  if (dsc.valor>0){
    el.innerHTML=`<div class="linha"><span>Subtotal</span><span>${brl(total)}</span></div>
      <div class="linha desc"><span>Cupom ${esc(cupom)} <em>${rotuloCupom(cupomInfo)}</em></span><span>−${brl(dsc.valor)}</span></div>`;
    el.hidden=false;
    $("#total").innerHTML=`<s class="de">${brl(total)}</s>${brl(final)}`;
  } else if (cupom && cupomInfo && dsc.fora){
    el.innerHTML=`<div class="linha aviso">O cupom ${esc(cupom)} não vale para os itens do carrinho.</div>`; el.hidden=false;
    $("#total").textContent=brl(total);
  } else if (cupom && cupomInfo && dsc.falta>0){
    el.innerHTML=`<div class="linha aviso">Faltam ${brl(dsc.falta)} para o cupom ${esc(cupom)} valer.</div>`; el.hidden=false;
    $("#total").textContent=brl(total);
  } else { el.hidden=true; el.innerHTML=""; $("#total").textContent=brl(total); }
  $("#total").dataset.final=brl(final); $("#total").dataset.desc=dsc.valor>0?brl(dsc.valor):"";
}
async function carregarCupom(code){
  if (!code){ cupomInfo=null; return null; }
  if (DEMO){ const n=parseInt((code.match(/\d+/)||[])[0])||10; cupomInfo={coupon:code,type:"PERCENTAGE",value:n,applies_to:[],min_price:0}; return cupomInfo; }
  cupomInfo=await api(`/webstore/discount/${enc(code)}`);
  return cupomInfo;
}
$("#itens").onclick=e=>{
  const q=e.target.closest("[data-q]"), r=e.target.closest("[data-rem]");
  if (q){ const i=cart[+q.dataset.q]; i.quantity=Math.max(1,i.quantity+ +q.dataset.d); } else if (r) cart.splice(+r.dataset.rem,1); else return;
  salvar(); atualizarCarrinho();
};
$("#abrir-cart").onclick=()=>{ $("#gaveta").classList.add("on"); $("#fundo").classList.add("on"); atualizarCarrinho(); };
// cupom resgatado antes (ex.: o do ET) continua aplicado
$("#cr-cart").value=criadorSalvo; campoCriador($("#cr-cart"),$("#cr-cart-st"));
try { const sv=localStorage.getItem("olimpo_cupom"); if (sv){ cupom=sv; $("#cupom").value=sv; $("#cupom-msg").textContent="// cupom "+sv+" aplicado";
  carregarCupom(sv).then(d=>{ $("#cupom-msg").textContent=`// cupom ${sv} aplicado: ${rotuloCupom(d)}`; atualizarCarrinho(); })
    .catch(()=>{ cupom=""; cupomInfo=null; $("#cupom").value=""; $("#cupom-msg").textContent=""; try { localStorage.removeItem("olimpo_cupom"); } catch {} atualizarCarrinho(); }); } } catch {}
$("#aplicar-cupom").onclick=async()=>{
  const code=$("#cupom").value.trim(), msg=$("#cupom-msg");
  if (!code){ cupom=""; cupomInfo=null; msg.textContent=""; atualizarCarrinho(); return; }
  try { const d=await carregarCupom(code); cupom=code; msg.textContent=`// cupom ${code} aplicado: ${rotuloCupom(d)}`; }
  catch(e){ cupom=""; cupomInfo=null; msg.textContent=e.message; }
  atualizarCarrinho();
};

/* ---------- checkout ---------- */
let gateways=[], checkoutFields=[], gw=null;
$("#ir-checkout").onclick=async()=>{
  fecharM(); abrirM("#m-check"); $("#mc-t").textContent="PAGAMENTO"; $("#mc-c").innerHTML='<div class="esq" style="height:200px"></div>';
  if (DEMO){ gateways=[{gateway:"PIX",display:"PIX"},{gateway:"MERCADOPAGO",display:"Mercado Pago"}]; checkoutFields=[]; }
  else {
    try { [gateways,checkoutFields]=await Promise.all([api("/webstore/gateway"),api("/webstore/checkout_fields").catch(()=>[])]); }
    catch(e){ $("#mc-c").innerHTML=`<div class="erro">${esc(e.message)}</div>`; return; }
    gateways=gateways.filter(g=>g.gateway!=="CREDITCARD"); // cartão direto exige SDK de tokenização
    if (!Array.isArray(checkoutFields)) checkoutFields=checkoutFields.data||[];
  }
  gw=gateways[0]||null; formCheckout();
};
function formCheckout(erro){
  const pre={"c-nick":conta?.nick,"c-email":conta?.email,"c-nome":conta?.name,"c-criador":criadorSalvo||conta?.criador};
  const tipoAtual=document.querySelector('input[name="c-tipo"]:checked')?.value || conta?.tipo || "";
  const g=gw||{}, v=id=>esc(document.getElementById(id)?.value||pre[id]||""), tEl=$("#total"), total=tEl.dataset.final||tEl.textContent, descTxt=tEl.dataset.desc||"";
  $("#mc-c").innerHTML=`${erro?`<div class="erro">${esc(erro)}</div>`:""}
  ${!gateways.length?'<div class="erro">Nenhum método de pagamento ativo. Ative um no painel da CentralCart.</div>':""}
  <form id="f-check" novalidate>
    <div class="campo"><label>Forma de pagamento</label></div>
    <div class="metodos">${gateways.map(x=>`<button type="button" class="metodo" data-gw="${x.gateway}" aria-pressed="${x.gateway===g.gateway}"><strong>${esc(x.display||x.gateway)}</strong>${x.fee?`<small>taxa ${x.is_percentage_fee?x.fee+"%":brl(x.fee)}</small>`:""}</button>`).join("")}</div>
    <div class="campo"><label for="c-nick">Nickname<span class="req">*</span></label><input id="c-nick" required placeholder="Digite seu nickname do Minecraft" value="${v("c-nick")}"><small>O produto é entregue neste nick. Confira as maiúsculas.</small></div>
    <div class="campo"><label>Tipo de conta<span class="req">*</span></label><div class="tipos">
      <label class="tipo"><input type="radio" name="c-tipo" value="original" ${tipoAtual==="original"?"checked":""}><span>Original</span></label>
      <label class="tipo"><input type="radio" name="c-tipo" value="pirata" ${tipoAtual==="pirata"?"checked":""}><span>Pirata</span></label></div></div>
    <div class="duas"><div class="campo"><label for="c-nome">Nome completo</label><input id="c-nome" required value="${v("c-nome")}" autocomplete="name"></div>
      <div class="campo"><label for="c-email">E-mail</label><input id="c-email" type="email" required value="${v("c-email")}" autocomplete="email"></div></div>
    ${g.require_document?`<div class="campo"><label for="c-cpf">CPF</label><input id="c-cpf" inputmode="numeric" required value="${v("c-cpf")}"></div>`:""}
    ${g.require_phone?`<div class="campo"><label for="c-tel">Telefone</label><input id="c-tel" type="tel" required value="${v("c-tel")}" placeholder="+5511999999999"></div>`:""}
    ${g.require_address?`<div class="duas"><div class="campo"><label for="a-cep">CEP</label><input id="a-cep" required></div><div class="campo"><label for="a-rua">Rua</label><input id="a-rua" required></div>
      <div class="campo"><label for="a-num">Número</label><input id="a-num" required></div><div class="campo"><label for="a-bairro">Bairro</label><input id="a-bairro" required></div>
      <div class="campo"><label for="a-cid">Cidade</label><input id="a-cid" required></div><div class="campo"><label for="a-uf">Estado</label><input id="a-uf" required maxlength="2"></div></div>`:""}
    <div class="campo"><label for="c-dc">ID do Discord <span style="color:var(--texto-3);font-weight:400">(recomendado)</span></label><input id="c-dc" inputmode="numeric" placeholder="ex: 123456789012345678" value="${v("c-dc")}">
      <small>Coloque seu ID e receba a <b>tag do VIP no Discord automaticamente</b> junto com a compra. <a href="https://support.discord.com/hc/pt-br/articles/206346498" target="_blank" rel="noopener" style="color:var(--ciano)">Como achar meu ID?</a></small></div>
    <div class="campo"><label for="c-criador">Apoie um criador</label><input id="c-criador" placeholder="código do criador" autocomplete="off" spellcheck="false" value="${v("c-criador")}"><small class="cr-st" id="c-criador-st"></small><small>Digite o código do seu criador favorito. Uma parte da sua compra vai para ele, e o preço continua o mesmo para você.</small></div>
    ${checkoutFields.filter(f=>!campoDuplicado(f)).map(f=>campoHTML(f,"cf-")).join("")}
    ${descTxt?`<div class="resumo" style="margin-top:6px"><div class="linha desc"><span>Cupom ${esc(cupom)} <em>${rotuloCupom(cupomInfo)}</em></span><span>−${descTxt}</span></div></div>`:""}
    <div class="total" style="margin:6px 0 14px"><span>TOTAL</span><strong>${total}</strong></div>
    <p class="termos">Ao realizar uma compra, você concorda com os <a href="#termos" data-ir="termos" data-x>Termos de Serviço</a> e <a href="#reembolso" data-ir="reembolso" data-x>Reembolso</a>.<small>Não é um produto oficial, afiliado ou associado à Microsoft ou Mojang AB.</small></p>
    <button class="btn btn-cheio" id="pagar" style="width:100%" ${gateways.length?"":"disabled"}>COMPRE AGORA · ${total}</button>
  </form>`;
  $$("#f-check [data-gw]").forEach(b=>b.onclick=()=>{ gw=gateways.find(x=>x.gateway===b.dataset.gw); formCheckout(); });
  $("#f-check").onsubmit=pagar;
  campoCriador($("#c-criador"),$("#c-criador-st"));
}
// campo de checkout da loja que pede de novo o nick ou o Discord: não mostra, usa o que a pessoa já digitou
function campoDuplicado(f){ const t=semAcento(`${f.name||""} ${f.label||""} ${f.title||""} ${f.description||""} ${f.placeholder||""}`);
  if (/nick|usuario|username|jogador|minecraft/.test(t)) return "nick";
  if (/discord/.test(t)) return "discord"; return ""; }
async function pagar(e){
  e.preventDefault(); const f=e.target, val=id=>document.getElementById(id)?.value.trim();
  const falta=[...f.querySelectorAll("[required]")].find(i=>!i.value.trim());
  if (falta){ falta.focus(); toast("> preencha os campos obrigatórios"); return; }
  if (!/^\S+@\S+\.\S+$/.test(val("c-email"))){ $("#c-email").focus(); toast("> confira o e-mail"); return; }
  const dcv=(document.getElementById("c-dc")?.value||"").trim();
  if (dcv && !/^\d{17,20}$/.test(dcv)){ toast("> o ID do Discord tem só números (17 a 20 dígitos)"); document.getElementById("c-dc").focus(); return; }
  if (!f.querySelector('input[name="c-tipo"]:checked')){ toast("> escolha o tipo de conta: Original ou Pirata"); return; }
  if (val("c-criador") && !criadorDe(val("c-criador"))){ document.getElementById("c-criador").focus(); toast("> código de criador não encontrado: corrija ou apague o campo"); return; }
  if (DEMO){ toast("> modo demonstração: configure o storeDomain"); return; }
  const body={gateway:gw.gateway,client_name:val("c-nome"),client_email:val("c-email"),client_identifier:val("c-nick"),
    cart:cart.map(i=>({package_id:i.id,quantity:i.quantity,options:i.options})),
    return_url:location.href.split("#")[0].split("?")[0]+"?pedido=ok"};
  if (val("c-cpf")) body.client_document=val("c-cpf").replace(/\D/g,"");
  if (val("c-tel")) body.client_phone=val("c-tel");
  if (val("c-dc")) body.client_discord=val("c-dc");
  if (val("c-criador")) body.affiliate_code=criadorDe(val("c-criador"));
  const tipoSel=f.querySelector('input[name="c-tipo"]:checked')?.value;
  if (C.campoTipoConta){ body.fields=Object.assign(body.fields||{}, {[C.campoTipoConta]: tipoSel==="pirata"?"Pirata":"Original"}); }
  if (cupom) body.coupon=cupom;
  if (gw.require_address) body.client_address={cep:val("a-cep"),street:val("a-rua"),number:val("a-num"),neighborhood:val("a-bairro"),city:val("a-cid"),state:val("a-uf")};
  if (checkoutFields.length){ body.fields=body.fields||{}; checkoutFields.forEach(cf=>{
    const dup=campoDuplicado(cf); const x = dup==="nick" ? val("c-nick") : dup==="discord" ? val("c-dc") : f.elements[cf.name]?.value?.trim();
    if (x) body.fields[cf.name]=x; }); }
  const b=$("#pagar"); b.disabled=true; b.textContent="GERANDO PAGAMENTO...";
  try {
    const r=await api("/webstore/checkout",{method:"POST",body:JSON.stringify(body)});
    if (r.checkout_url){ cart=[]; salvar(); location.href=r.checkout_url; return; }
    if (r.pix_code) return telaPix(r);
    throw new Error("Resposta inesperada da loja.");
  } catch(err){ formCheckout(err.message); }
}
function telaPix(r){
  $("#mc-t").textContent="PAGUE COM PIX";
  let oid=null; try { const u=new URL(r.return_url); oid=u.searchParams.get("order_id")||u.pathname.split("/").filter(Boolean).pop(); } catch {}
  $("#mc-c").innerHTML=`<div class="pix"><p style="color:var(--texto-2)">Escaneie no app do banco ou use o copia e cola.</p>
    <img src="data:image/png;base64,${r.qr_code}" alt="QR Code PIX"><textarea rows="3" readonly>${esc(r.pix_code)}</textarea>
    <button class="btn btn-cheio" id="cp-pix" style="width:100%;margin-top:10px">COPIAR CÓDIGO PIX</button>
    <p style="margin-top:12px;color:var(--ouro)" id="pix-st" class="digitando">// aguardando pagamento</p></div>`;
  $("#cp-pix").onclick=()=>copiar(r.pix_code,"> código PIX copiado");
  cart=[]; salvar(); atualizarCarrinho();
  if (!oid) return; clearInterval(poll);
  poll=setInterval(async()=>{
    try {
      const s=await api(`/webstore/order_status/${enc(oid)}`), st=s.status||s.data?.status;
      if (st==="APPROVED"){ clearInterval(poll);
        $("#mc-c").innerHTML=`<div class="pix"><p style="font-family:var(--pixel);font-size:36px;color:var(--ok);margin:10px 0">APROVADO</p><p style="color:var(--texto-2)">Entre no servidor com o nick informado para receber.</p><button class="btn" data-x style="margin-top:12px">FECHAR</button></div>`; }
      else if (["CANCELED","CANCELLED","REFUSED","EXPIRED"].includes(st)){ clearInterval(poll); const el=$("#pix-st"); el.classList.remove("digitando"); el.textContent="// pagamento não concluído — gere um novo PIX pela loja"; }
    } catch {}
  },4000);
}
if (new URLSearchParams(location.search).get("pedido")==="ok"){
  cart=[]; salvar(); setTimeout(()=>toast("> pedido recebido — assim que aprovar, cai no servidor"),800);
  hist(location.pathname);
}


/* ================= CONTA: criada direto no site (nick + tipo de conta), sem travar em código de e-mail ================= */
const comTempo=(url,ms=6000)=>{ const ac=new AbortController(), t=setTimeout(()=>ac.abort(),ms); return fetch(url,{signal:ac.signal}).finally(()=>clearTimeout(t)); };
// confere se o nick é de uma conta original (Mojang). Responde "sim", "nao" ou "?" (sem resposta)
async function contaOriginal(nick){
  try { const r=await comTempo(`https://playerdb.co/api/player/minecraft/${enc(nick)}`); const d=await r.json(); return d?.success&&d.data?.player ? "sim" : "nao"; }
  catch { return "?"; }
}
let conta=null; try { conta=JSON.parse(localStorage.getItem("olimpo_conta")||"null"); } catch {}
const logado = () => !!(conta && conta.nick);
function salvarConta(c){ conta=c; try { c ? localStorage.setItem("olimpo_conta",JSON.stringify(c)) : localStorage.removeItem("olimpo_conta"); } catch {} uiConta(); document.dispatchEvent(new Event("olimpo:conta")); }
function uiConta(){
  const b=$("#conta-btn");
  b.innerHTML = logado() ? `<img src="${cabeca(conta.nick,18)}" alt="" onerror="this.remove()">${esc(conta.nick)}` : "ENTRAR";
}
function telaConta(_p, erro){
  const c=$("#mk-c"), termos=`<p class="termos">Ao criar sua conta, você concorda com os <a href="#termos" data-ir="termos" data-x>Termos de Serviço</a> e <a href="#reembolso" data-ir="reembolso" data-x>Reembolso</a>.<small>Não é um produto oficial, afiliado ou associado à Microsoft ou Mojang AB.</small></p>`;
  if (logado() && _p!=="editar"){
    $("#mk-t").textContent="MINHA CONTA";
    c.innerHTML=`<div class="conta-ok"><img src="${cabeca(conta.nick,56)}" alt="" onerror="this.src='${STEVE}'"><div><b>${esc(conta.nick)}</b>
        <span>Conta ${conta.tipo==="pirata"?"pirata":"original"}${conta.email?" · "+esc(conta.email):""}${conta.criador?" · apoiando um criador":""}</span></div></div>
      <p style="color:var(--texto-2);margin:0 0 16px;font-size:13px">Seu nick, e-mail e código de criador já vêm preenchidos na hora de comprar.</p>
      <div class="duas"><button class="btn" id="editar">EDITAR</button><button class="btn" id="sair">SAIR</button></div>`;
    $("#editar").onclick=()=>telaConta("editar");
    $("#sair").onclick=()=>{ salvarConta(null); fecharM(); toast("> você saiu da conta"); };
    return;
  }
  const a=conta||{};
  $("#mk-t").textContent = logado() ? "EDITAR CONTA" : "CRIAR CONTA";
  c.innerHTML=`${erro?`<div class="erro">${esc(erro)}</div>`:""}
    <form id="f-conta" novalidate>
      <div class="campo"><label for="k-nick">Nickname<span class="req">*</span></label>
        <div class="nick-linha"><input id="k-nick" placeholder="Digite seu nickname do Minecraft" maxlength="16" autocomplete="nickname" value="${esc(a.nick||"")}"><img id="k-cab" src="${a.nick?cabeca(a.nick,42):STEVE}" alt=""></div>
        <small class="nick-st" id="k-st">É nele que suas compras são entregues.</small></div>
      <div class="campo"><label>Tipo de conta<span class="req">*</span></label>
        <div class="tipos">
          <label class="tipo"><input type="radio" name="k-tipo" value="original" ${a.tipo!=="pirata"&&a.tipo?"checked":""}><span>Original<small>comprada na Mojang</small></span></label>
          <label class="tipo"><input type="radio" name="k-tipo" value="pirata" ${a.tipo==="pirata"?"checked":""}><span>Pirata<small>não-original</small></span></label>
        </div></div>
      <div class="campo"><label for="k-email">E-mail</label><input id="k-email" type="email" autocomplete="email" placeholder="para receber o comprovante" value="${esc(a.email||"")}"></div>
      <div class="campo"><label for="k-criador">Apoie um criador</label><input id="k-criador" placeholder="código do criador" autocomplete="off" spellcheck="false" value="${esc(a.criador||criadorSalvo||"")}"><small class="cr-st" id="k-criador-st"></small>
        <small>Digite o código do seu criador favorito. Uma parte da sua compra vai para ele, e o preço continua o mesmo para você.</small></div>
      ${termos}
      <button class="btn btn-cheio" id="k-ok" style="width:100%">${logado()?"SALVAR":"CRIAR CONTA"}</button>
    </form>`;
  const nk=$("#k-nick"), cab=$("#k-cab"), st=$("#k-st"); let tm;
  const checar=async()=>{
    const n=nk.value.trim(), tipo=document.querySelector('input[name="k-tipo"]:checked')?.value;
    st.className="nick-st"; if (!n){ st.textContent="É nele que suas compras são entregues."; cab.src=STEVE; return; }
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)){ st.className="nick-st no"; st.textContent="Use de 3 a 16 letras, números ou _"; return; }
    cab.onerror=()=>{ cab.onerror=null; cab.src=STEVE; }; cab.src=cabeca(n,42);
    if (tipo!=="original"){ st.textContent="Conta pirata: a skin padrão pode aparecer no site."; return; }
    st.textContent="// verificando conta original..."; const r=await contaOriginal(n);
    if (nk.value.trim()!==n) return;
    if (r==="sim"){ st.className="nick-st ok"; st.textContent="● conta original encontrada"; }
    else if (r==="nao"){ st.className="nick-st no"; st.textContent="Não achamos essa conta original. Confira o nick ou marque Pirata."; }
    else st.textContent="Não deu pra verificar agora — tudo bem, pode continuar.";
  };
  nk.addEventListener("input",()=>{ clearTimeout(tm); tm=setTimeout(checar,450); });
  document.querySelectorAll('input[name="k-tipo"]').forEach(r=>r.addEventListener("change",checar));
  if (a.nick) checar();
  campoCriador($("#k-criador"),$("#k-criador-st"));
  $("#f-conta").onsubmit=async e=>{
    e.preventDefault();
    const nick=nk.value.trim(), tipo=document.querySelector('input[name="k-tipo"]:checked')?.value, email=$("#k-email").value.trim(), criador=$("#k-criador").value.trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(nick)){ nk.focus(); toast("> confira o nickname"); return; }
    if (!tipo){ toast("> escolha o tipo de conta: Original ou Pirata"); return; }
    if (email && !/^\S+@\S+\.\S+$/.test(email)){ $("#k-email").focus(); toast("> confira o e-mail"); return; }
    const b=$("#k-ok"); b.disabled=true; b.textContent="CRIANDO...";
    // conta original: só bloqueia se a Mojang responder que o nick não existe (sem resposta = deixa passar)
    if (tipo==="original"){ const r=await contaOriginal(nick); if (r==="nao"){ b.disabled=false; b.textContent=logado()?"SALVAR":"CRIAR CONTA"; telaConta(_p==="editar"?"editar":1,"Esse nick não é de uma conta original. Confira ou marque Pirata."); return; } }
    // código de criador: só aceita os criadores parceiros da configuração
    if (criador && !criadorDe(criador)){ b.disabled=false; b.textContent=logado()?"SALVAR":"CRIAR CONTA"; telaConta(_p==="editar"?"editar":1,`O código de criador "${criador}" não existe.`); return; }
    salvarConta({ nick, tipo, email, criador:criadorDe(criador)?criador:"", name:(conta&&conta.name)||"" });
    fecharM(); toast(`> conta pronta, ${nick}!`);
  };
}
$("#conta-btn").onclick=()=>{ telaConta(1); abrirM("#m-conta"); };
uiConta();
// confere se a sessão salva ainda vale
if (conta && conta.token && !DEMO){
  api("/webstore/auth/session",{headers:{Authorization:"Bearer "+conta.token}})
    .then(d=>{ const cu=d.customer||d; if (cu?.email){ conta.email=cu.email; conta.name=cu.name||conta.name; salvarConta(conta); } })
    .catch(e=>{ if (/401|403|sess|token|autent/i.test(e.message)) salvarConta(null); });
}

/* ================= SONS DO ET (gerados na hora com Web Audio, sem arquivos) ================= */
const SOM = (() => {
  let ctx=null, mestre=null, estatica=null, ligado=true;
  try { ligado = localStorage.getItem("olimpo_som")!=="0"; } catch {}
  function iniciar(){
    if (!ctx){ const AC=window.AudioContext||window.webkitAudioContext; if (!AC) return null;
      ctx=new AC(); mestre=ctx.createGain(); mestre.gain.value=.32;
      const comp=ctx.createDynamicsCompressor(); mestre.connect(comp); comp.connect(ctx.destination); }
    if (ctx.state==="suspended") ctx.resume();
    return ctx;
  }
  // navegadores só liberam áudio depois de um clique/toque
  ["pointerdown","keydown","touchstart"].forEach(ev=>addEventListener(ev,()=>{ if (ligado) iniciar(); },{passive:true}));
  const ok=()=> !!(ligado && iniciar());
  function ruido(seg){ const b=ctx.createBuffer(1,ctx.sampleRate*seg,ctx.sampleRate), d=b.getChannelData(0); for (let i=0;i<d.length;i++) d[i]=Math.random()*2-1; const n=ctx.createBufferSource(); n.buffer=b; return n; }
  function env(g,t,a,picos){ g.gain.setValueAtTime(0,t); picos.forEach(([dt,v])=>g.gain.linearRampToValueAtTime(v,t+dt)); }
  function tom(tipo,f,t,dur,vol,destino){ const o=ctx.createOscillator(), g=ctx.createGain(); o.type=tipo; o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g); g.connect(destino||mestre); o.start(t); o.stop(t+dur+.05); return o; }
  function eco(){ const d=ctx.createDelay(1), fb=ctx.createGain(), sai=ctx.createGain(); d.delayTime.value=.32; fb.gain.value=.42; sai.gain.value=.5;
    d.connect(fb); fb.connect(d); d.connect(sai); sai.connect(mestre); return d; }

  return {
    get ligado(){ return ligado; },
    alternar(){ ligado=!ligado; try { localStorage.setItem("olimpo_som",ligado?"1":"0"); } catch {} if (!ligado) this.estatica(false); else iniciar(); return ligado; },
    // chegada: zumbido grave, theremin "de filme de ET", chiado de rádio e bips de transmissão
    chegada(){
      if (!ok()) return; const t=ctx.currentTime, e=eco();
      // drone grave
      const lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=260; const gd=ctx.createGain(); env(gd,t,0,[[.8,.22],[2.6,.18],[3.6,0]]);
      [55,55.8,82.4].forEach(f=>{ const o=ctx.createOscillator(); o.type="sawtooth"; o.frequency.value=f; o.connect(lp); o.start(t); o.stop(t+3.7); });
      lp.connect(gd); gd.connect(mestre);
      // theremin com vibrato e glissando
      const th=ctx.createOscillator(), lfo=ctx.createOscillator(), lg=ctx.createGain(), gt=ctx.createGain();
      th.type="sine"; th.frequency.setValueAtTime(380,t+.3); th.frequency.exponentialRampToValueAtTime(960,t+1.4); th.frequency.exponentialRampToValueAtTime(520,t+2.4); th.frequency.exponentialRampToValueAtTime(740,t+3.3);
      lfo.frequency.value=6.5; lg.gain.value=22; lfo.connect(lg); lg.connect(th.frequency);
      env(gt,t,0,[[.3,0],[.9,.16],[2.8,.13],[3.5,0]]); th.connect(gt); gt.connect(mestre); gt.connect(e);
      th.start(t); lfo.start(t); th.stop(t+3.6); lfo.stop(t+3.6);
      // chiado de rádio em rajadas
      const n=ruido(3.6), bp=ctx.createBiquadFilter(), gn=ctx.createGain(); bp.type="bandpass"; bp.frequency.value=2400; bp.Q.value=.9;
      gn.gain.setValueAtTime(0,t); for (let k=0;k<14;k++){ const tt=t+.15+k*.24; gn.gain.setValueAtTime(Math.random()<.5?.09:.015,tt); }
      gn.gain.linearRampToValueAtTime(0,t+3.6); n.connect(bp); bp.connect(gn); gn.connect(mestre); n.start(t); n.stop(t+3.6);
      this.transmissao(t+2.6);
    },
    // bips tipo código morse: "comunicação" com a Terra
    transmissao(quando){
      if (!ok()) return; const t0=quando||ctx.currentTime, e=eco();
      const seq=[[.08,1320],[.08,1320],[.22,990],[.08,1320],[.22,1480],[.08,990]]; let t=t0;
      seq.forEach(([d,f])=>{ tom("square",f,t,d,.05,e); tom("sine",f,t,d,.06); t+=d+.07; });
    },
    // raio trator puxando um item (ou devolvendo, quando desce)
    raio(desce){
      if (!ok()) return; const t=ctx.currentTime, o=ctx.createOscillator(), g=ctx.createGain();
      o.type="sine"; o.frequency.setValueAtTime(desce?1500:220,t); o.frequency.exponentialRampToValueAtTime(desce?260:1500,t+.38);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.07,t+.03); g.gain.exponentialRampToValueAtTime(.0001,t+.42);
      o.connect(g); g.connect(mestre); o.start(t); o.stop(t+.45);
      const n=ruido(.4), hp=ctx.createBiquadFilter(), gn=ctx.createGain(); hp.type="highpass"; hp.frequency.value=3000;
      env(gn,t,0,[[.05,.035],[.4,0]]); n.connect(hp); hp.connect(gn); gn.connect(mestre); n.start(t);
    },
    // "sinal perdido": estática baixinha contínua com falhas, enquanto a loja está abduzida
    estatica(liga){
      if (!liga){ if (estatica){ const {n,g,iv}=estatica; clearInterval(iv); try { g.gain.setTargetAtTime(0,ctx.currentTime,.15); n.stop(ctx.currentTime+.6); } catch {} estatica=null; } return; }
      if (estatica || !ok()) return;
      const n=ruido(2); n.loop=true; const bp=ctx.createBiquadFilter(), g=ctx.createGain(); bp.type="bandpass"; bp.frequency.value=1800; bp.Q.value=.6;
      g.gain.value=0; g.gain.setTargetAtTime(.022,ctx.currentTime,.4); n.connect(bp); bp.connect(g); g.connect(mestre); n.start();
      const iv=setInterval(()=>{ if (!ok()) return; const t=ctx.currentTime;
        g.gain.setValueAtTime(.06,t); g.gain.setTargetAtTime(.022,t+.08,.1);           // falha
        if (Math.random()<.45) tom("sine",[880,1175,1568][Math.random()*3|0],t+.05,.12,.035); }, 1700+Math.random()*1200);
      estatica={n,g,iv};
    },
    // nave tremendo + explosão de luz
    explosao(){
      if (!ok()) return; const t=ctx.currentTime;
      const o=ctx.createOscillator(), g=ctx.createGain(); o.type="sawtooth"; o.frequency.setValueAtTime(60,t); o.frequency.exponentialRampToValueAtTime(30,t+1);
      env(g,t,0,[[.05,.25],[1.1,0]]); o.connect(g); g.connect(mestre); o.start(t); o.stop(t+1.2);
      const n=ruido(1.4), lp=ctx.createBiquadFilter(), gn=ctx.createGain(); lp.type="lowpass"; lp.frequency.setValueAtTime(6000,t); lp.frequency.exponentialRampToValueAtTime(300,t+1.3);
      env(gn,t,0,[[.02,.28],[1.4,0]]); n.connect(lp); lp.connect(gn); gn.connect(mestre); n.start(t);
    },
    tremor(){
      if (!ok()) return; const t=ctx.currentTime, o=ctx.createOscillator(), g=ctx.createGain(), lfo=ctx.createOscillator(), lg=ctx.createGain();
      o.type="square"; o.frequency.value=90; lfo.frequency.value=28; lg.gain.value=40; lfo.connect(lg); lg.connect(o.frequency);
      env(g,t,0,[[.1,.06],[.7,.08],[.75,0]]); o.connect(g); g.connect(mestre); o.start(t); lfo.start(t); o.stop(t+.8); lfo.stop(t+.8);
    },
    // ticket do cupom: brilho em arpejo
    cupom(){
      if (!ok()) return; const t=ctx.currentTime, e=eco();
      [784,988,1175,1568,1976,2349].forEach((f,k)=>{ tom("triangle",f,t+k*.075,.5,.07,e); tom("sine",f*2,t+k*.075,.25,.02); });
    },
    // trovão: estalo seco do raio + ronco grave que rola e vai sumindo (ruído marrom filtrado)
    trovao(){
      if (!ok()) return; const t=ctx.currentTime, dur=4.2, sr=ctx.sampleRate;
      const buf=ctx.createBuffer(2,sr*dur,sr);
      for (let ch=0; ch<2; ch++){ const d=buf.getChannelData(ch); let ult=0;
        for (let i=0;i<d.length;i++){ const b=Math.random()*2-1; ult=(ult+.02*b)/1.02; d[i]=ult*3.5; } }
      // ronco
      const ronco=ctx.createBufferSource(); ronco.buffer=buf;
      const lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.setValueAtTime(900,t); lp.frequency.exponentialRampToValueAtTime(160,t+dur);
      const gr=ctx.createGain(); gr.gain.setValueAtTime(0,t);
      // o ronco "rola": várias ondas de volume, cada vez mais fracas
      let tt=t+.05, v=1;
      for (let k=0;k<7;k++){ gr.gain.linearRampToValueAtTime(.55*v,tt); tt+=.12+Math.random()*.35; gr.gain.linearRampToValueAtTime(.22*v,tt); tt+=.1+Math.random()*.25; v*=.78; }
      gr.gain.exponentialRampToValueAtTime(.0001,t+dur);
      ronco.connect(lp); lp.connect(gr); gr.connect(mestre); ronco.start(t); ronco.stop(t+dur);
      // estalo do raio (bem no começo, agudo e seco)
      const est=ruido(.35), hp=ctx.createBiquadFilter(), ge=ctx.createGain();
      hp.type="highpass"; hp.frequency.value=1200;
      ge.gain.setValueAtTime(0,t); ge.gain.linearRampToValueAtTime(.55,t+.005); ge.gain.exponentialRampToValueAtTime(.08,t+.06); ge.gain.linearRampToValueAtTime(.3,t+.09); ge.gain.exponentialRampToValueAtTime(.0001,t+.35);
      est.connect(hp); hp.connect(ge); ge.connect(mestre); est.start(t); est.stop(t+.36);
      // grave do impacto
      const sub=ctx.createOscillator(), gs=ctx.createGain(); sub.type="sine"; sub.frequency.setValueAtTime(70,t); sub.frequency.exponentialRampToValueAtTime(32,t+1.2);
      gs.gain.setValueAtTime(0,t); gs.gain.linearRampToValueAtTime(.5,t+.03); gs.gain.exponentialRampToValueAtTime(.0001,t+1.4);
      sub.connect(gs); gs.connect(mestre); sub.start(t); sub.stop(t+1.5);
    },
    choque(){ this.trovao(); },
    // nave indo embora
    saida(){
      if (!ok()) return; const t=ctx.currentTime, o=ctx.createOscillator(), g=ctx.createGain(), e=eco();
      o.type="sine"; o.frequency.setValueAtTime(520,t); o.frequency.exponentialRampToValueAtTime(1800,t+.25); o.frequency.exponentialRampToValueAtTime(140,t+1.2);
      env(g,t,0,[[.05,.12],[1.2,0]]); o.connect(g); g.connect(mestre); g.connect(e); o.start(t); o.stop(t+1.3);
    }
  };
})();

/* ================= ET: abduz a loja inteira; clicar na nave liberta tudo com o cupom ================= */
(() => {
  if (!C.cupomET) return;
  const et=$("#et"), nave=$("#et-nave"), feixes=$("#et-feixes"), fala=$("#et-fala");
  const CHAVE="olimpo_cupom_resgatado";
  let estado="parado", timers=[], itens=[], ux=0, uy=0;
  // ?et=reset  -> apaga o resgate do cupom neste navegador (para testar de novo)
  // ?et=1      -> força o ET a aparecer sempre, mesmo logado ou já resgatado (modo teste)
  const qp=new URLSearchParams(location.search).get("et");
  if (qp==="reset"){ try { localStorage.removeItem(CHAVE); localStorage.removeItem("olimpo_cupom"); } catch {} toast("> ET resetado: ele volta na loja"); }
  const TESTE = qp==="1" || C.etTeste===true;
  const resgatado=()=>{ try { return localStorage.getItem(CHAVE)===C.cupomET; } catch { return false; } };
  const pode=()=> document.body.dataset.view==="loja" && (TESTE || (!resgatado() && !logado()));
  const espera=ms=>new Promise(r=>timers.push(setTimeout(r,REDUZ?Math.min(ms,60):ms)));
  const pos=(el,x,y)=>{ el.style.left=x+"px"; el.style.top=y+"px"; };
  const cards=()=>[...document.querySelectorAll("#produtos .prod")];

  function feixe(x1,y1,x2,y2,cls=""){
    const f=document.createElement("div"); f.className="et-feixe "+cls;
    const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy), ang=Math.atan2(dx,dy);
    Object.assign(f.style,{left:(x1-43)+"px",top:y1+"px",height:len+"px",transform:`rotate(${-ang}rad)`});
    feixes.appendChild(f); requestAnimationFrame(()=>f.classList.add("on")); return f;
  }
  function faiscas(x,y,n=16,cores=["#F4C542","#9dff8a","#38e8ff","#fff"]){
    for (let k=0;k<n;k++){
      const d=document.createElement("i"); d.className="et-faisca";
      const a=Math.random()*Math.PI*2, r=40+Math.random()*80;
      d.style.cssText=`left:${x}px;top:${y}px;--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r-30}px;--r:${Math.random()*360}deg;--c:${cores[k%cores.length]}`;
      document.body.appendChild(d); setTimeout(()=>d.remove(),950);
    }
  }
  function limpar(restaurar=true){
    SOM.estatica(false);
    timers.forEach(clearTimeout); timers=[]; feixes.innerHTML=""; itens.forEach(i=>i.el.remove()); itens=[];
    if (restaurar) cards().forEach(c=>c.classList.remove("abduzido"));
    fala.classList.remove("on"); et.classList.remove("esperando","fixo"); nave.classList.remove("treme"); et.hidden=true; estado="parado";
  }
  function falar(txt, x, y){
    const t=$("#et-txt"); t.dataset.full=txt;
    const w=fala.offsetWidth||320, sx=scrollX, W=innerWidth;
    const direita = x+90+w < sx+W-12;
    pos(fala, direita ? x+90 : Math.max(sx+12, x-90-w), y-50);
    fala.classList.add("on"); digitar(fala);
  }
  // enquanto espera o clique, a nave fica PRESA NA TELA (acompanha a rolagem), com o balão logo abaixo
  const TOQUE = matchMedia("(pointer:coarse)").matches;
  function posFixa(){
    if (!et.classList.contains("fixo")) return;
    const W=innerWidth, cel=W<700, nav=(document.querySelector(".nav")?.getBoundingClientRect().bottom)||70;
    const nx = cel ? W-58 : W-120, ny = Math.max(nav,0) + (cel ? 52 : 80);
    pos(nave, nx, ny);
    const fw=fala.offsetWidth||300;
    pos(fala, Math.max(10, Math.min(W-fw-10, nx-fw+40)), ny + (cel ? 44 : 64));
  }
  function fixar(){ const d=fala.querySelector(".et-dica"); if (d) d.textContent = TOQUE ? "▲ toque na nave ou aqui" : "▲ clique na nave ou aqui"; et.classList.add("fixo"); nave.style.transition="none"; posFixa(); void nave.offsetWidth; nave.style.transition=""; }
  function soltar(){
    if (!et.classList.contains("fixo")) return;
    const r=nave.getBoundingClientRect(); ux=r.left+r.width/2+scrollX; uy=r.top+r.height/2+scrollY;
    nave.style.transition="none"; et.classList.remove("fixo"); pos(nave, ux, uy); void nave.offsetWidth; nave.style.transition="";
  }
  addEventListener("resize", posFixa); addEventListener("scroll", ()=>{ if (et.classList.contains("fixo")) posFixa(); }, {passive:true});
  // reaplica o estado abduzido se a loja for re-renderizada (troca de categoria)
  window.etReaplicar=()=>{ if (estado==="abduzido") cards().forEach(c=>c.classList.add("abduzido")); };

  async function chegar(){
    if (estado!=="parado" || !pode()) return;
    const lista=cards(); if (!lista.length) return;
    estado="chegando";
    const g=$("#produtos").getBoundingClientRect(), sx=scrollX, sy=scrollY;
    ux=g.left+g.width/2+sx; uy=Math.max(sy+100, g.top+sy-120);
    et.hidden=false; fala.classList.remove("on");
    nave.style.transition="none"; pos(nave, sx+innerWidth+140, sy+30); void nave.offsetWidth; nave.style.transition="";
    pos(nave, ux, uy); SOM.chegada();
    await espera(1900); if (estado!=="chegando") return;
    // raios tratores em todos os cards, um atrás do outro
    estado="abduzindo";
    for (const [k,card] of lista.entries()){
      if (estado!=="abduzindo") return;
      const cr=card.getBoundingClientRect(), alvo=card.querySelector(".img > img, .img > .vip-arte, .img > .tag-vip, .img > span, .img > .chave-arte, .img > .cash-arte");
      const ax=cr.left+cr.width/2+sx, ay=cr.top+sy+cr.height*.28;
      const f=feixe(ux,uy+18,ax,ay+20); SOM.raio(false);
      if (alvo){
        const ar=alvo.getBoundingClientRect();
        const cl = alvo.cloneNode(true); if (alvo.tagName!=="IMG" && !/chave-arte|cash-arte|vip-arte/.test(alvo.className)) cl.classList.add("et-item-txt");
        cl.classList.add("et-item"); cl.removeAttribute("id");
        Object.assign(cl.style,{left:(ar.left+sx)+"px",top:(ar.top+sy)+"px",width:ar.width+"px",height:ar.height+"px"});
        document.body.appendChild(cl); itens.push({el:cl,card,w:ar.width,h:ar.height});
        card.classList.add("abduzido"); void cl.offsetWidth;
        Object.assign(cl.style,{left:(ux-ar.width/2)+"px",top:(uy-ar.height/2)+"px",transform:`scale(.2) rotate(${(Math.random()-.5)*60}deg)`,opacity:"0"});
      } else card.classList.add("abduzido");
      setTimeout(()=>{ f.classList.remove("on"); setTimeout(()=>f.remove(),400); }, 1000);
      await espera(260);
    }
    await espera(1100); if (estado!=="abduzindo") return;
    estado="abduzido"; et.classList.add("esperando"); SOM.estatica(true); SOM.transmissao();
    falar(`Bip bop! Abduzi TODA a loja do Olimpo 👽 ${TOQUE?"Toque":"Clique"} na minha nave pra libertar os produtos... e eu solto eles com um cupom de desconto pra você.`, ux, uy);
    fixar();
  }

  async function libertar(){
    if (estado!=="abduzido") return;
    estado="libertando"; fala.classList.remove("on"); et.classList.remove("esperando");
    soltar();
    const sx=scrollX, sy=scrollY;
    // nave treme e solta um clarão
    SOM.estatica(false); nave.classList.add("treme"); SOM.tremor(); await espera(700);
    const fl=$("#et-flash"); fl.style.setProperty("--fx",(ux-sx)+"px"); fl.style.setProperty("--fy",(uy-sy)+"px");
    fl.classList.remove("on"); void fl.offsetWidth; fl.classList.add("on"); SOM.explosao();
    nave.classList.remove("treme"); faiscas(ux,uy,28);
    // raios dourados devolvem cada produto, com quique e faíscas
    for (const it of itens){
      const cr=it.card.getBoundingClientRect(), alvo=it.card.querySelector(".img > img, .img > .vip-arte, .img > .tag-vip, .img > span, .img > .chave-arte, .img > .cash-arte");
      const ar=alvo ? alvo.getBoundingClientRect() : cr;
      const f=feixe(ux,uy+18,cr.left+cr.width/2+sx,cr.top+sy+cr.height*.28+20,"dourado"); SOM.raio(true);
      it.el.classList.add("cai");
      Object.assign(it.el.style,{left:(ar.left+sx)+"px",top:(ar.top+sy)+"px",transform:"scale(1) rotate(0)",opacity:"1"});
      const card=it.card, el=it.el;
      setTimeout(()=>{ card.classList.remove("abduzido"); card.classList.add("libertado"); el.remove(); faiscas(cr.left+cr.width/2+sx, cr.top+sy+cr.height*.28, 14);
        setTimeout(()=>card.classList.remove("libertado"),650); f.classList.remove("on"); setTimeout(()=>f.remove(),400); }, 900);
      await espera(170);
    }
    cards().forEach(c=>c.classList.remove("abduzido")); itens=[];
    await espera(900);
    // cupom: aplica no carrinho e mostra o ticket
    $("#cupom").value=C.cupomET; $("#aplicar-cupom").click();
    try { localStorage.setItem(CHAVE,C.cupomET); localStorage.setItem("olimpo_cupom",C.cupomET); } catch {}
    const tk=$("#et-ticket"); $("#tk-code").textContent=C.cupomET;
    Object.assign(tk.style,{left:"50%",top:"50%"}); tk.classList.remove("vai"); void tk.offsetWidth; tk.classList.add("on"); SOM.cupom();
    faiscas(sx+innerWidth/2, sy+innerHeight/2, 36);
    falar(`Pronto, terráqueo! Cupom ${C.cupomET} aplicado. Até a próxima abdução 🛸`, ux, uy);
    await espera(2600);
    // o ticket voa para o carrinho
    const cb=$("#abrir-cart").getBoundingClientRect();
    tk.classList.add("vai"); Object.assign(tk.style,{left:(cb.left+cb.width/2)+"px",top:(cb.top+cb.height/2)+"px"});
    await espera(800); tk.classList.remove("on","vai");
    const carr=$("#abrir-cart"); carr.classList.add("pulsa"); setTimeout(()=>carr.classList.remove("pulsa"),700);
    // e o ET vai embora pro espaço
    await espera(1200); fala.classList.remove("on");
    nave.style.transition="left 1.2s cubic-bezier(.6,0,.9,.4),top 1.2s cubic-bezier(.6,0,.9,.4),width 1.2s";
    pos(nave, ux+(Math.random()<.5?-1:1)*innerWidth*.3, scrollY-200); nave.style.width="40px"; SOM.saida();
    await espera(1300); nave.style.transition=""; nave.style.width=""; limpar(false);
  }
  nave.onclick=()=>{ if (estado==="abduzido") libertar(); };
  // tocar no balão também liberta (no celular a nave pode ficar pequena)
  fala.addEventListener("click", e=>{ if (e.target.closest("#et-x,#et-som")) return; if (estado==="abduzido") libertar(); });
  const somBtn=$("#et-som"), somUI=()=>{ somBtn.textContent=SOM.ligado?"🔊":"🔇"; somBtn.title=SOM.ligado?"Desligar som":"Ligar som"; };
  somBtn.onclick=e=>{ e.stopPropagation(); SOM.alternar(); somUI(); if (SOM.ligado && estado==="abduzido"){ SOM.estatica(true); SOM.transmissao(); } };
  somUI();
  $("#et-x").onclick=async ()=>{
    // fechar sem resgatar: devolve tudo e vai embora (volta na próxima visita à loja)
    if (estado==="libertando") return;
    estado="saindo"; fala.classList.remove("on"); soltar();
    itens.forEach(it=>it.el.remove()); itens=[]; cards().forEach(c=>c.classList.remove("abduzido")); feixes.innerHTML="";
    SOM.estatica(false); SOM.saida(); pos(nave, scrollX+innerWidth+160, scrollY-120); await espera(1500); limpar();
  };
  document.addEventListener("click", e=>{ const b=e.target.closest(".prod.abduzido .btn"); if (b){ e.stopImmediatePropagation(); e.preventDefault(); toast(`> o ET abduziu esse produto — ${matchMedia("(pointer:coarse)").matches?"toque":"clique"} na nave pra libertar`); } }, true);

  let agendado=null;
  function agenda(){
    clearTimeout(agendado);
    if (document.body.dataset.view!=="loja"){ if (estado!=="parado") limpar(); return; }
    if (!pode()){ if (estado!=="parado") limpar(); return; }
    const tenta=()=>{ if (!pode()) return; if (cards().length) chegar(); else agendado=setTimeout(tenta,500); };
    agendado=setTimeout(tenta, 3500);
  }
  new MutationObserver(agenda).observe(document.body,{attributes:true,attributeFilter:["data-view"]});
  document.addEventListener("olimpo:conta", ()=>{ if (!TESTE && logado() && estado!=="parado"){ limpar(); } });
  agenda();
})();


/* ================= MÚSICA AMBIENTE (composta na hora: lira grega + acordes suaves, sem direitos autorais) ================= */
(() => {
  const bt=$("#musica"); if (!bt) return;
  if ((C.musicas||[]).length) return;   // com músicas do YouTube configuradas, quem toca é a Rádio
  let ctx=null, mestre=null, eco=null, tocando=false, timer=null, prox=0, passo=0, acordeI=0;
  let querer = true; try { querer = localStorage.getItem("olimpo_musica")!=="0"; } catch {}
  const VOL=.07;
  // Lá menor modal: Am · F · C · G (e volta)
  const ACORDES=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];
  const ESCALA=[69,72,74,76,79,81,84];  // pentatônica para a lira
  const hz=n=>440*Math.pow(2,(n-69)/12);
  function iniciar(){
    if (ctx) return;
    const AC=window.AudioContext||window.webkitAudioContext; if (!AC) return;
    ctx=new AC(); mestre=ctx.createGain(); mestre.gain.value=0;
    // reverb de salão (resposta de impulso gerada)
    const conv=ctx.createConvolver(), len=ctx.sampleRate*3.2, ir=ctx.createBuffer(2,len,ctx.sampleRate);
    for (let c=0;c<2;c++){ const d=ir.getChannelData(c); for (let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6); }
    conv.buffer=ir; eco=ctx.createGain(); eco.gain.value=.55; eco.connect(conv); conv.connect(mestre);
    const comp=ctx.createDynamicsCompressor(); mestre.connect(comp); comp.connect(ctx.destination);
  }
  function pad(t,notas,dur){
    const lp=ctx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=900; lp.Q.value=.3;
    const g=ctx.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.16,t+2.2); g.gain.setValueAtTime(.16,t+dur-2); g.gain.linearRampToValueAtTime(0,t+dur+.6);
    lp.connect(g); g.connect(mestre); g.connect(eco);
    notas.forEach(n=>[-4,4].forEach(dt=>{ const o=ctx.createOscillator(); o.type="triangle"; o.frequency.value=hz(n-12); o.detune.value=dt; o.connect(lp); o.start(t); o.stop(t+dur+.7); }));
  }
  function lira(t,n,vel){
    const o=ctx.createOscillator(), o2=ctx.createOscillator(), g=ctx.createGain(), lp=ctx.createBiquadFilter();
    o.type="triangle"; o2.type="sine"; o.frequency.value=hz(n); o2.frequency.value=hz(n)*2.005;
    lp.type="lowpass"; lp.frequency.setValueAtTime(3200,t); lp.frequency.exponentialRampToValueAtTime(700,t+1.2);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.22*vel,t+.006); g.gain.exponentialRampToValueAtTime(.0001,t+1.9);
    const g2=ctx.createGain(); g2.gain.value=.25; o2.connect(g2); g2.connect(lp);
    o.connect(lp); lp.connect(g); g.connect(mestre); g.connect(eco);
    o.start(t); o2.start(t); o.stop(t+2); o2.stop(t+2);
  }
  function agendar(){
    while (prox < ctx.currentTime+0.6){
      const t=prox, beat=0.62;
      if (passo%16===0){ pad(t, ACORDES[acordeI%ACORDES.length], beat*16); }
      // lira: arpejo leve, com pausas para respirar
      const ac=ACORDES[acordeI%ACORDES.length];
      if (Math.random()<.62){
        const usaAcorde=Math.random()<.55, n=usaAcorde ? ac[Math.floor(Math.random()*3)]+12 : ESCALA[Math.floor(Math.random()*ESCALA.length)];
        lira(t + (Math.random()-.5)*.02, n, .55+Math.random()*.45);
        if (Math.random()<.12) lira(t+beat/2, n+ (Math.random()<.5?5:7), .4);
      }
      prox += beat; passo++; if (passo%16===0) acordeI++;
    }
  }
  function tocar(){
    iniciar(); if (!ctx) return;
    ctx.resume(); tocando=true; bt.classList.add("on");
    mestre.gain.cancelScheduledValues(ctx.currentTime); mestre.gain.setTargetAtTime(VOL,ctx.currentTime,1.2);
    if (!timer){ prox=ctx.currentTime+.1; timer=setInterval(agendar,150); }
  }
  function parar(){
    tocando=false; bt.classList.remove("on"); if (!ctx) return;
    mestre.gain.setTargetAtTime(0,ctx.currentTime,.5);
    setTimeout(()=>{ if (!tocando){ clearInterval(timer); timer=null; ctx.suspend(); } },1800);
  }
  bt.onclick=e=>{ e.stopPropagation(); querer=!tocando; try { localStorage.setItem("olimpo_musica",querer?"1":"0"); } catch {} querer ? tocar() : parar(); };
  // navegadores só liberam som depois do primeiro clique/toque: começa sozinha nesse momento (se a pessoa não desligou)
  const primeiro=()=>{ if (querer && !tocando) tocar(); ["pointerdown","keydown","touchstart"].forEach(ev=>removeEventListener(ev,primeiro)); };
  ["pointerdown","keydown","touchstart"].forEach(ev=>addEventListener(ev,primeiro,{passive:true}));
  // pausa quando a aba fica escondida
  document.addEventListener("visibilitychange",()=>{ if (!ctx) return; if (document.hidden) ctx.suspend(); else if (tocando) ctx.resume(); });
})();


/* ================= RÁDIO OLIMPO: começa sozinha ao entrar no site ================= */
// Navegadores não deixam tocar com som antes da pessoa interagir. Então: a música já começa (sem som ou tentando com som)
// e o som liga no primeiro clique, toque, tecla ou rolagem da página.
(() => {
  const box=$("#radio"); if (!box) return;
  const arquivos=(C.musicasArquivos||[]).filter(m=>m && m.arquivo);
  const ids=(C.musicas||[]).map(u=>(String(u).match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)||[])[1] || (/^[\w-]{11}$/.test(u)?u:null)).filter(Boolean);
  const total = arquivos.length || ids.length; if (!total) return;
  box.hidden=false; const mus=$("#musica"); if (mus) mus.style.display="none";
  if (arquivos.length) box.classList.add("modo-mp3");
  let faixa=0, querer=true, liberado=false, erros=0;
  try { querer = localStorage.getItem("olimpo_radio")!=="0"; } catch {}
  let vol = (()=>{ try { const v=localStorage.getItem("olimpo_radio_vol"); return v!=null?+v:(C.volumeMusica??15); } catch { return C.volumeMusica??15; } })();
  $("#ra-vol").value=vol;

  // ---- motor: MP3 próprio ou YouTube ----
  let M;
  if (arquivos.length){
    const au=new Audio(); au.preload="auto"; au.volume=vol/100;
    M={ pronto:true,
      tocando:()=>!au.paused,
      titulo:()=>{ const f=arquivos[faixa]; return f.titulo ? f.titulo+(f.credito?` [${f.credito}]`:"") : f.arquivo.split("/").pop(); },
      carregar:i=>{ au.src=arquivos[i].arquivo; },
      play:()=>au.play().catch(()=>{}), pause:()=>au.pause(),
      volume:v=>{ au.volume=v/100; }, mudo:m=>{ au.muted=m; } };
    au.addEventListener("ended",()=>proxima()); au.addEventListener("error",()=>setTimeout(proxima,800));
    ["play","pause","playing"].forEach(ev=>au.addEventListener(ev,ui));
    M.carregar(0);
  } else {
    let player=null;
    M={ pronto:false,
      tocando:()=>{ try { const st=player.getPlayerState(); return st===1||st===3; } catch { return false; } },
      titulo:()=>{ try { return player.getVideoData().title||""; } catch { return ""; } },
      carregar:i=>{ if (M.pronto) player.loadVideoById(ids[i]); },
      play:()=>{ if (M.pronto) player.playVideo(); }, pause:()=>{ if (M.pronto) player.pauseVideo(); },
      volume:v=>{ if (M.pronto) player.setVolume(v); }, mudo:m=>{ if (M.pronto) m ? player.mute() : player.unMute(); } };
    const tag=document.createElement("script"); tag.src="https://www.youtube.com/iframe_api";
    tag.onerror=()=>{ $("#ra-faixa").textContent="não conectou ao YouTube (bloqueador?)"; };
    document.head.appendChild(tag);
    setTimeout(()=>{ if (!M.pronto) $("#ra-faixa").textContent="o YouTube não respondeu — recarregue a página"; },15000);
    const antigo=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{ antigo && antigo();
      player=new YT.Player("yt-radio",{ videoId:ids[0], width:200, height:200, host:"https://www.youtube.com",
        playerVars:{ autoplay:1, mute:1, playsinline:1, rel:0, modestbranding:1, controls:0, iv_load_policy:3, disablekb:1, fs:0, enablejsapi:1, ...(/^https?:/.test(location.origin)?{origin:location.origin}:{}) },
        events:{
          onReady:()=>{ M.pronto=true; player.setVolume(vol); if (liberado) player.unMute(); else player.mute(); if (querer) player.playVideo(); ui(); },
          onStateChange:e=>{ if (e.data===1) erros=0; if (e.data===0) proxima(); ui(); },
          onError:e=>{ erros++; console.warn("Rádio: erro do YouTube", e && e.data, "(101/150 = dono bloqueou tocar fora do YouTube; 2/100 = link inválido; 153 = configuração do player)");
            if (erros>=total){ querer=false; $("#ra-faixa").textContent="o YouTube bloqueou estas músicas no site"; console.warn("Rádio: nenhum vídeo do YouTube pode ser tocado fora do YouTube (o dono bloqueou a incorporação). Troque os links em 'musicas' ou use 'musicasArquivos' com MP3."); return; }
            $("#ra-faixa").textContent="música indisponível, pulando..."; setTimeout(proxima,1200); }
        } });
    };
  }

  function ui(){
    const toca=M.tocando(); box.classList.toggle("on",toca); $("#ra-play").textContent = toca ? "⏸" : "▶";
    const t=M.titulo();
    $("#ra-faixa").textContent = t ? `${faixa+1}/${total} · ${t}` : "sintonizando...";
    $("#ra-mini").textContent = toca ? (liberado ? (t||"tocando agora") : "clique na página p/ ouvir") : (querer ? "sintonizando..." : "pausada");
  }
  function tocarFaixa(i){ faixa=(i+total)%total; M.carregar(faixa); if (querer) M.play(); setTimeout(ui,300); }
  const proxima=()=>tocarFaixa(faixa+1);

  // tenta começar já com som (alguns navegadores deixam para quem visita sempre); se não der, começa sem som
  if (querer && arquivos.length){ M.play(); }

  // primeira interação em qualquer lugar: liga o som
  const liberar=()=>{ if (liberado) return; liberado=true; if (querer){ M.mudo(false); M.volume(vol); M.play(); } ui();
    ["pointerdown","keydown","touchstart","wheel"].forEach(ev=>removeEventListener(ev,liberar,true)); };
  ["pointerdown","keydown","touchstart","wheel"].forEach(ev=>addEventListener(ev,liberar,{passive:true,capture:true}));

  $("#ra-aba").onclick=e=>{ e.stopPropagation(); const ab=!box.classList.contains("aberta"); box.classList.toggle("aberta",ab); $("#ra-aba").setAttribute("aria-expanded",ab);
    $("#ra-aba").setAttribute("aria-label", ab ? "Fechar a Rádio Olimpo" : "Abrir a Rádio Olimpo"); };
  document.addEventListener("click",e=>{ if (box.classList.contains("aberta") && !box.contains(e.target)){ box.classList.remove("aberta"); $("#ra-aba").setAttribute("aria-expanded","false"); } });
  $("#ra-prox").onclick=e=>{ e.stopPropagation(); querer=true; proxima(); };
  $("#ra-ant").onclick=e=>{ e.stopPropagation(); querer=true; tocarFaixa(faixa-1); };
  $("#ra-play").onclick=e=>{ e.stopPropagation(); if (!M.pronto){ querer=true; liberado=true; $("#ra-faixa").textContent="conectando ao YouTube..."; return; } if (M.tocando()){ M.pause(); querer=false; } else { querer=true; M.mudo(false); M.volume(vol); M.play(); }
    try { localStorage.setItem("olimpo_radio",querer?"1":"0"); } catch {} setTimeout(ui,200); };
  $("#ra-vol").oninput=e=>{ vol=+e.target.value; M.volume(vol); try { localStorage.setItem("olimpo_radio_vol",vol); } catch {} };
  setInterval(ui,1500); ui();
})();


/* ---------- tela da rádio: transmissão misteriosa para a Terra (aparece quando não está tocando) ---------- */
(() => {
  const cv=$("#ra-sinal"); if (!cv) return;
  const g=cv.getContext("2d"); let W=0,H=0,t=0,linha=0,txtT=0;
  const msgs=["SINAL → TERRA","TRANSMITINDO...","FREQ 25565 Hz","CÓDIGO: 0L-1MP-0","AGUARDANDO TERRÁQUEO","DECODIFICANDO...","AKARDIA.NET"];
  const morse=".- -.- .- .-. -.. .. .-";
  function tam(){ const r=cv.getBoundingClientRect(), d=Math.min(devicePixelRatio||1,2); W=Math.max(40,r.width); H=Math.max(24,r.height); cv.width=W*d; cv.height=H*d; g.setTransform(d,0,0,d,0,0); }
  function quadro(){
    requestAnimationFrame(quadro);
    if ((t++)%(LEVE?4:2) || OCULTO()) return;
    const tocando=document.getElementById("radio").classList.contains("on");
    const r=cv.getBoundingClientRect(); if (Math.abs(r.width-W)>1||Math.abs(r.height-H)>1) tam();
    g.fillStyle="rgba(2,8,6,.35)"; g.fillRect(0,0,W,H);
    // grade de radar
    g.strokeStyle="rgba(123,227,106,.12)"; g.lineWidth=1;
    for (let x=0;x<W;x+=W/6){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,H); g.stroke(); }
    // onda do osciloscópio
    g.strokeStyle="#7BE36A"; g.shadowColor="#7BE36A"; g.shadowBlur=6; g.lineWidth=Math.max(1,H/40); g.beginPath();
    for (let x=0;x<=W;x+=2){ const k=x/W*Math.PI*4+t*(tocando?.16:.08), burst=tocando?Math.sin(x*.18+t*.3)*.7:(Math.sin(t*.03)>.75?Math.sin(x*.25+t*.2)*.6:0);
      const y=H*.58+Math.sin(k)*H*.13*(1+burst)+Math.sin(k*2.3+t*.05)*H*.04+(Math.random()<.004?(Math.random()-.5)*H*.3:0); x?g.lineTo(x,y):g.moveTo(x,y); }
    g.stroke(); g.shadowBlur=0;
    // barra que varre (sinal subindo)
    linha=(linha+H/60)%H; g.fillStyle="rgba(123,227,106,.08)"; g.fillRect(0,linha,W,H/10);
    // texto e código morse
    if (W>80){
      txtT++; const lista = tocando ? ["RECEBENDO SINAL ♪","FREQ 25565 Hz","TRANSMISSÃO ATIVA","AKARDIA.NET"] : msgs; const m=lista[Math.floor(txtT/90)%lista.length], vis=m.slice(0,Math.min(m.length,(txtT%90)/2|0));
      g.font=`700 ${Math.max(8,H/9)}px "JetBrains Mono",monospace`; g.fillStyle="#b6ff9a"; g.fillText("> "+vis+(t%20<10?"_":""),6,H*.2);
      g.fillStyle="rgba(123,227,106,.75)"; g.font=`${Math.max(7,H/12)}px "JetBrains Mono",monospace`;
      const off=Math.floor(t/4)%morse.length; g.fillText((morse+"   "+morse).slice(off,off+Math.floor(W/7)),6,H*.92);
    } else {
      // na telinha minimizada: só um ponto piscando e o sinal
      if (t%30<15){ g.fillStyle="#ff5fb0"; g.beginPath(); g.arc(W-6,6,2.4,0,Math.PI*2); g.fill(); }
    }
    // chuvisco
    for (let i=0;i<W*H/120;i++){ g.fillStyle=`rgba(180,255,170,${Math.random()*.12})`; g.fillRect(Math.random()*W,Math.random()*H,1,1); }
  }
  tam(); addEventListener("resize",tam); requestAnimationFrame(quadro);
})();

/* ---------- início ---------- */
atualizarCarrinho();
ir(location.hash.slice(1) || "home", false);
})();
