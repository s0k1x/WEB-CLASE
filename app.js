/* Unuvia · lógica de la aplicación (generado a partir de index.html) */

(function(){try{if(window.crypto&&!crypto.randomUUID&&crypto.getRandomValues){crypto.randomUUID=function(){var b=crypto.getRandomValues(new Uint8Array(16));b[6]=b[6]&15|64;b[8]=b[8]&63|128;var h=Array.prototype.map.call(b,function(x){return ('0'+x.toString(16)).slice(-2)}).join('');return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20)}}}catch(e){}})();

const SB_URL='https://akbhcirarjnfajqzafci.supabase.co',SB_KEY='sb_publishable_7C9FD22lEBpBuuKYDeYGiA_ZXGtDJWY';
const sb=window.supabase?window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true}}):null;
let authUid=null,authEmail='';
const $=id=>document.getElementById(id);
document.body.appendChild($('chat'));
function showError(){$('splash')?.remove();$('errorScreen')?.classList.remove('hidden')}
window.addEventListener('error',e=>{if(e.error)showError()});if(location.hash==='#error')setTimeout(showError,400);window.addEventListener('unhandledrejection',showError);
/* Sin zoom */
['gesturestart','gesturechange','gestureend'].forEach(e=>document.addEventListener(e,ev=>{if(!settings.zoomOK)ev.preventDefault()}));
var zgOn=false,zg=function(ev){if(ev.touches.length>1)ev.preventDefault()};function zoomGuard(on){if(on===zgOn)return;zgOn=on;if(on)document.addEventListener('touchmove',zg,{passive:false});else document.removeEventListener('touchmove',zg)}
document.addEventListener('wheel',ev=>{if(!settings.zoomOK&&ev.ctrlKey)ev.preventDefault()},{passive:false});
document.addEventListener('keydown',ev=>{if(!settings.zoomOK&&(ev.ctrlKey||ev.metaKey)&&['+','-','=','0'].includes(ev.key))ev.preventDefault()});

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MES=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
const MESL='Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre'.split(' ');
const DIAS=['Lunes','Martes','Miércoles','Jueves','Viernes'];
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const uid=()=>(window.crypto&&crypto.randomUUID)?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)});
const hm=ts=>new Date(ts).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});
const fmt=d=>{const p=d.split('-');return +p[2]+' '+MES[p[1]-1]};
let user='Alumno',calY=new Date().getFullYear(),calM=new Date().getMonth(),mType='',searchQ='',classes=[],cur=0;
const blank=()=>({events:[],photos:[],messages:[],tasks:[],sched:[],members:[],posts:[],work:[],topics:[]});
let data=blank(),role='Administrador';
const match=t=>!searchQ||String(t).toLowerCase().includes(searchQ);
function setCur(i){cur=i;const c=classes[i];data=Object.assign(blank(),c.data);c.data=data;role=c.role||'Administrador';
 Object.values(data).forEach(a=>a.forEach(x=>{if(x&&typeof x==='object'&&!x.id)x.id=uid()}));
 c.emoji=c.emoji||'📚';c.color=/^#[0-9a-f]{3,8}$/i.test(c.color||'')?c.color:'#008cff';
 $('className').textContent=c.name;$('classCode').textContent=c.code;$('classEmoji').innerHTML=okImg(c.icon)?`<img src="${c.icon}" alt="">`:esc(c.emoji);$('classDesc').textContent=c.desc||'Todo el curso, organizado en un solo lugar.';$('classView').style.setProperty('--ccol',c.color);$('chat').style.setProperty('--ccol',c.color);document.body.style.setProperty('--ccol',c.color);applyRole();const hr=document.querySelector('#classView .hero');hr.classList.toggle('hasbanner',okImg(c.banner));(okImg(c.banner)?hr.style.setProperty('--bn',`url(${c.banner})`):hr.style.removeProperty('--bn'))}
function addClass(c){classes.push(c);setCur(classes.length-1);renderAll();confetti();if(!settings.toured)setTimeout(showTour,700)}
const t0=Date.now();let splashDone=false;
function hideSplash(){if(splashDone)return;splashDone=true;const sp=$('splash');['splashUnder','splashOver'].forEach(i=>{const su=$(i);if(su){su.style.opacity='0';setTimeout(()=>su.remove(),600)}});setTimeout(()=>$('themeSlot')&&$('themeSlot').classList.add('show'),sp?250:0);if(!sp)return;sp.style.transition='opacity .45s ease';sp.style.opacity='0';setTimeout(()=>{sp.remove();showCookies()},500)}
let pageOK=false,authOK=false;
function tryHide(){if(!pageOK||!authOK)return;const rest=Math.max(0,700-(Date.now()-t0));setTimeout(hideSplash,rest)}
function pageReady(){pageOK=true;tryHide()}
function authReady(){authOK=true;tryHide()}
Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,1200))]).then(pageReady,pageReady);
setTimeout(hideSplash,10000);
let toastT;function toastErr(m){toast(String(m),'err')}
function toast(m,k){const t=$('toast');t.textContent=m;t.classList.remove('ok','err','info');if(k)t.classList.add(k);t.setAttribute('role',k==='err'?'alert':'status');t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),3400)}
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch(x){}a.remove();return ok}}
function delItem(kind,id){data[kind]=data[kind].filter(x=>x.id!==id);saveState();renderAll()}
function doSearch(q){searchQ=q.trim().toLowerCase();renderAll()}
function renderEvents(){
 const today=iso(new Date()),all=[...data.events,...workEv()].sort((a,b)=>a.d.localeCompare(b.d)),up=all.filter(e=>e.d>=today),past=all.filter(e=>e.d<today).reverse();
 const row=(e,p)=>`<div class="item${p?' past':''}"><div class="icon">${e.i}</div><main><b>${esc(e.t)}</b><p>${esc(e.s)}</p></main><span class="badge${p?'':relClass(e.d)}">${p?fmt(e.d):relBadge(e.d)}</span><button type="button" class="del adm-only" aria-label="Eliminar" onclick="delItem('events','${e.id}')">×</button></div>`;
 const show=[...up.map(e=>[e,0]),...(settings.showPast===false?[]:past.map(e=>[e,1]))].filter(([e])=>match(e.t+' '+e.s));
 const grp=([e,p])=>{if(p)return 'Ya pasado';const n=Math.round((new Date(e.d+'T12:00:00')-new Date(today+'T12:00:00'))/864e5);return n===0?'Hoy':n<=6?'Esta semana':'Más adelante'};let lastG='';
 $('items').innerHTML=show.length?show.map(x=>{const g=grp(x),h=g!==lastG?`<div class="ev-grp">${g}</div>`:'';lastG=g;return h+row(x[0],x[1])}).join(''):'<div class="empty">'+(searchQ?'Sin resultados.':'No tienes nada pendiente.')+'</div>';
 $('mini').innerHTML=up.length?up.slice(0,3).map(e=>`<div class="member"><div class="ma">${+e.d.slice(8)}</div><div>${esc(e.t)}<small>${fmt(e.d)}</small></div></div>`).join(''):'<div class="muted">Sin entregas.</div>';
 renderCal();
}
let calSel=null;
const cap1=t=>t?t[0].toUpperCase()+t.slice(1):t;
function relDay(k){const t=new Date(iso(new Date())+'T12:00:00'),d=new Date(k+'T12:00:00'),n=Math.round((d-t)/864e5);return n===0?'Hoy':n===1?'Mañana':n===-1?'Ayer':n>1&&n<7?'En '+n+' días':n<0&&n>-7?'Hace '+(-n)+' días':''}
function relBadge(k){const r=relDay(k);return (r&&!/^Hace|Ayer/.test(r))?r:fmt(k)}
function relClass(k){const r=relDay(k);return r==='Hoy'?' b-hoy':(r==='Mañana'||/^En [2-3] /.test(r))?' b-pronto':''}
function dayItems(k){
 const wd=(new Date(k+'T12:00:00').getDay()+6)%7,out=[];
 data.sched.filter(x=>x.day===wd).sort((a,b)=>a.h.localeCompare(b.h)).forEach(x=>out.push({k:'clase',pill:x.h,t:x.t,s:x.r||'Clase',min:toMin(x.h)}));
 data.events.filter(e=>e.d===k).forEach(e=>out.push({k:'evento',pill:'Evento',t:e.t,s:e.s||'',min:9998}));
 data.work.filter(w=>w.due===k&&w.type!=='material').forEach(w=>{const m=isStaff()?null:subOf(w,user);out.push({k:'entrega',pill:'Entrega',t:w.title,s:WN[w.type]||'',min:9999,done:!!(m&&m.st!=='pendiente')})});
 data.tasks.filter(t=>t.d===k).forEach(t=>out.push({k:'tarea',pill:'Tarea',t:t.t,s:'',min:9999,done:!!t.done,id:t.id}));
 return out;
}
function activeRanges(){
 const td=iso(new Date());
 return data.work.filter(w=>w.type!=='material'&&w.due&&w.ts&&w.due>=td&&!(isStaff()?false:(subOf(w,user)&&subOf(w,user).st!=='pendiente'))).map(w=>[iso(new Date(w.ts)),w.due]).filter(r=>r[0]<r[1]).sort((a,b)=>a[1].localeCompare(b[1])).slice(0,3);
}
function renderCal(){
 const sun=settings.weekStart==='sun',dim=new Date(calY,calM+1,0).getDate(),off=sun?new Date(calY,calM,1).getDay():(new Date(calY,calM,1).getDay()+6)%7,today=iso(new Date()),ym=calY+'-'+pad(calM+1);
 if(!calSel||calSel.slice(0,7)!==ym)calSel=today.slice(0,7)===ym?today:ym+'-01';
 const evs=data.events,wk=data.work.filter(w=>w.due&&w.type!=='material'),tk=data.tasks;
 const rg=activeRanges(),inR=k=>rg.some(r=>k>=r[0]&&k<=r[1]);
 const cells=[];
 const pm=new Date(calY,calM,0),pmDays=pm.getDate();
 for(let i=off;i>0;i--){const d=pmDays-i+1;cells.push({k:pm.getFullYear()+'-'+pad(pm.getMonth()+1)+'-'+pad(d),d,out:1})}
 for(let d=1;d<=dim;d++)cells.push({k:ym+'-'+pad(d),d,out:0});
 const nm=new Date(calY,calM+1,1);let nd=1;while(cells.length%7)cells.push({k:nm.getFullYear()+'-'+pad(nm.getMonth()+1)+'-'+pad(nd),d:nd++,out:1});
 let h=(sun?['D','L','M','X','J','V','S']:['L','M','X','J','V','S','D']).map(d=>`<div class="dow">${d}</div>`).join('');
 cells.forEach((c,i)=>{
  const col=i%7,we=sun?(col===0||col===6):(col>=5),a=evs.some(e=>e.d===c.k),b=wk.some(w=>w.due===c.k),v=tk.some(t=>t.d===c.k&&!t.done),r=inR(c.k);
  const cl=r&&!(col>0&&inR(cells[i-1].k)),cr=r&&!(col<6&&cells[i+1]&&inR(cells[i+1].k));
  h+=`<button type="button" class="cd${(a||b||v)&&!c.out?' has':''}${c.out?' out':''}${c.k===today?' today':''}${c.k===calSel?' sel':''}${we?' we':''}${r?' rng':''}${cl?' cl':''}${cr?' cr':''}" onclick="pickDay('${c.k}')" aria-label="${c.d}"><span class="cdn">${c.d}</span><span class="cdd">${a?'<i></i>':''}${b?'<i class="w"></i>':''}${v?'<i class="v"></i>':''}</span></button>`;
 });
 $('calendarGrid').innerHTML=h;$('calTitle').innerHTML='<span class="cm-m">'+MESL[calM]+'</span> <span class="cm-y">'+calY+'</span>';renderDayPanel();
 let ag=$('calAgenda');if(!ag){ag=document.createElement('div');ag.id='calAgenda';ag.className='cal-agenda';const lg=document.querySelector('.cal-legend');(lg||$('calendarGrid')).after(ag)}ag.innerHTML=calAgendaHTML();
}
function renderDayPanel(){
 const el=$('calSide');if(!el||!calSel)return;
 const D=new Date(calSel+'T12:00:00'),today=iso(new Date()),isT=calSel===today,items=dayItems(calSel),now=new Date(),nowMin=now.getHours()*60+now.getMinutes(),r=relDay(calSel);
 const wdn=cap1(D.toLocaleDateString('es-ES',{weekday:'long'})),mon=cap1(D.toLocaleDateString('es-ES',{month:'long',year:'numeric'}));
 const li=items.map(x=>{const past=isT&&x.k==='clase'&&x.min+60<=nowMin;return `<li class="cs-it k-${x.k}${x.done?' done':''}${past?' past':''}${x.id?' tap':''}"${x.id?` onclick="toggleTask('${x.id}');renderCal()"`:''}><span class="cs-pill">${esc(x.pill)}</span><span class="cs-t"><b>${esc(x.t)}</b>${x.s?`<small>${esc(x.s)}</small>`:''}</span></li>`}).join('');
 el.innerHTML=`<div class="cs-top"><div class="cs-big">${D.getDate()}</div><div class="cs-dt"><b>${esc(wdn)}</b><span>${esc(mon)}</span>${r?`<em>${r}</em>`:''}</div></div><div class="cs-h">${isT?'Tus tareas de hoy:':'Para este día:'}</div>${items.length?`<ul class="cs-list">${li}</ul>`:`<div class="cs-empty">${isT?'Nada para hoy. ¡Día libre!':'No hay nada este día.'}</div>`}${isStaff()?`<div class="cs-foot"><button type="button" onclick="newEventOn('${calSel}')">+ Añadir evento</button></div>`:''}`;
}
function pickDay(k){const y=+k.slice(0,4),m=+k.slice(5,7)-1;if(y!==calY||m!==calM){calY=y;calM=m}calSel=k;renderCal()}
function calToday(){const n=new Date();calY=n.getFullYear();calM=n.getMonth();calSel=iso(n);renderCal()}
function newEventOn(k){modal('event');setTimeout(()=>{const f=$('f2');if(f)f.value=k},0)}
(function(){let x0=null,y0=null;const g=()=>$('calendarGrid');document.addEventListener('touchstart',e=>{const t=e.target.closest&&e.target.closest('#calendarGrid');if(!t){x0=null;return}x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 document.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)moveCal(dx<0?1:-1)},{passive:true})})();
function moveCal(n){calM+=n;if(calM<0){calM=11;calY--}if(calM>11){calM=0;calY++}renderCal()}
function renderTasks(){
 const pend=data.tasks.filter(t=>!t.done).length;
 $('taskInfo').textContent=pend?pend+(pend===1?' pendiente':' pendientes'):'Todo al día';
 const l=data.tasks.filter(t=>match(t.t)).sort((a,b)=>(a.done-b.done)||((a.d||'9')>(b.d||'9')?1:-1));
 $('taskList').innerHTML=l.length?l.map(t=>`<label class="item task${t.done?' done':''}"><input type="checkbox" ${t.done?'checked':''} onchange="toggleTask('${t.id}')"><main><b>${esc(t.t)}</b>${t.d?`<p>${fmt(t.d)}</p>`:''}</main><button type="button" class="del" aria-label="Eliminar" onclick="event.preventDefault();delItem('tasks','${t.id}')">×</button></label>`).join(''):'<div class="empty">'+(searchQ?'Sin resultados.':'No hay tareas.')+'</div>';
}
function toggleTask(id){const t=data.tasks.find(x=>x.id===id);if(t){t.done=!t.done;saveState();renderTasks()}}
const toMin=h=>{const m=/^(\d{1,2}):(\d{2})/.exec(h||'');return m?(+m[1])*60+(+m[2]):-1};
const shortSubj=t=>{t=(t||'').trim();if(t.length<=7)return t;const w=t.split(/\s+/).filter(x=>!/^(y|de|del|la|el|los|las|e)$/i.test(x));if(w.length>1)return w.map(x=>x[0].toUpperCase()).join('').slice(0,3)+(w.length>1&&w[1].length>2?'':'');return t.slice(0,6)+'.'};
const subjHue=t=>{let h=0;const x=(t||'').toLowerCase();for(let i=0;i<x.length;i++)h=(h*31+x.charCodeAt(i))%360;return h};
function schedDays(){
 const now=new Date(),wd=(now.getDay()+6)%7,nm=now.getHours()*60+now.getMinutes();
 return DIAS.map((d,i)=>{const l=data.sched.filter(x=>x.day===i&&match(x.t+' '+(x.r||''))).sort((a,b)=>a.h.localeCompare(b.h));if(!l.length)return '';
  let nowId=null,nextId=null;
  if(i===wd){l.forEach((x,j)=>{const s0=toMin(x.h),s1=j+1<l.length?toMin(l[j+1].h):s0+60;if(s0<=nm&&nm<s1)nowId=x.id});const nx=l.find(x=>toMin(x.h)>nm);if(nx)nextId=nx.id}
  return `<div class="sday${i===wd?' today':''}"><div class="side-title">${d.toUpperCase()}${i===wd?' · HOY':''}</div><div class="items">${l.map(x=>`<div class="item${x.id===nowId?' s-now':''}"><div class="icon sj" style="--h:${subjHue(x.t)}">${esc((x.t||'?').trim().charAt(0).toUpperCase())}</div><main><b>${esc(x.t)}</b><p>${x.h.slice(0,5)}${x.r?' · Aula '+esc(x.r):''}</p></main>${x.id===nowId?'<span class="stag">Ahora</span>':x.id===nextId?'<span class="stag next">Siguiente</span>':''}<button type="button" class="del adm-only" aria-label="Eliminar" onclick="delItem('sched','${x.id}')">×</button></div>`).join('')}</div></div>`}).join('');
}
function schedGrid(){
 const now=new Date(),wd=(now.getDay()+6)%7,nm=now.getHours()*60+now.getMinutes(),k5=h=>(h||'').slice(0,5);
 const times=[...new Set(data.sched.filter(x=>x.day>=0&&x.day<5).map(x=>k5(x.h)))].sort();if(!times.length)return '';
 const mon=new Date(now);mon.setDate(now.getDate()-wd+(wd>4?7:0));const head='<tr><th class="ttv-h"></th>'+DIAS.map((d,i)=>{const dd=new Date(mon);dd.setDate(mon.getDate()+i);return `<th class="${i===wd?'tdy':''}"><span class="dn">${d.slice(0,3).toUpperCase()}</span><span class="dd">${dd.getDate()}</span></th>`}).join('')+'</tr>';
 const rows=times.map((h,ri)=>{const s0=toMin(h),s1=times[ri+1]?toMin(times[ri+1]):s0+55;
  const e1=times[ri+1]||(pad(Math.floor((s0+55)/60))+':'+pad((s0+55)%60));
  return `<tr><th class="ttv-h"><b>${h}</b><small>${e1}</small></th>${[0,1,2,3,4].map(d=>{const l=data.sched.filter(x=>x.day===d&&k5(x.h)===h);
   if(!l.length)return `<td class="ttv-e${d===wd?' tdy':''}"></td>`;
   const t=l.map(x=>x.t).join(' / '),r=l.map(x=>x.r).filter(Boolean).join(' / '),nowC=d===wd&&s0<=nm&&nm<s1;
   return `<td class="ttv-c${d===wd?' tdy':''}${nowC?' now':''}" style="--h:${subjHue(l[0].t)}" onclick="toast('${esc((t+(r?' · '+r:'')+' · '+DIAS[d]+' '+h).replace(/'/g,'’'))}')"><b><span class="full">${esc(t)}</span><span class="sh">${esc(l.length>1?t:shortSubj(t))}</span></b>${r?`<small>${esc(r)}</small>`:''}${nowC?'<span class="ttv-nowtag">AHORA</span>':''}</td>`}).join('')}</tr>`}).join('');
 return `<table class="ttv"><thead>${head}</thead><tbody>${rows}</tbody></table>`;
}
/* ===================== Calendario: agenda del mes · Horario: tarjeta "ahora" ===================== */
function calAgendaHTML(){
 const ym=calY+'-'+pad(calM+1),today=iso(new Date()),cur=today.slice(0,7)===ym,dim=new Date(calY,calM+1,0).getDate(),rows=[];
 for(let d=1;d<=dim;d++){const k=ym+'-'+pad(d);if(cur&&k<today)continue;dayItems(k).filter(x=>x.k!=='clase'&&!x.done).forEach(x=>rows.push({k,x}))}
 const KN={evento:'Evento',entrega:'Entrega',tarea:'Tarea'};
 const list=rows.slice(0,8).map(({k,x})=>{const D=new Date(k+'T12:00:00'),r=relDay(k);return `<button type="button" class="ag-row k-${x.k}" onclick="pickDay('${k}')"><span class="ag-d"><b>${D.getDate()}</b><small>${D.toLocaleDateString('es-ES',{weekday:'short'}).replace('.','')}</small></span><span class="ag-t"><b>${esc(x.t)}</b><small>${KN[x.k]||''}${r?' · '+r:''}${x.s?' · '+esc(x.s):''}</small></span></button>`}).join('');
 return `<div class="ag-h"><b>${cur?'Lo que queda este mes':'En '+MESL[calM].toLowerCase()}</b><span>${rows.length?rows.length+(rows.length===1?' cosa':' cosas'):''}</span></div>`+(rows.length?list+(rows.length>8?`<div class="ag-more">y ${rows.length-8} más</div>`:''):`<div class="ag-empty">${cur?'Nada más este mes. ¡A disfrutar!':'Nada programado este mes.'}</div>`);
}
function schedNowHTML(){
 const now=new Date(),wd=(now.getDay()+6)%7,nm=now.getHours()*60+now.getMinutes();
 const dayL=d=>data.sched.filter(x=>x.day===d).sort((a,b)=>a.h.localeCompare(b.h)),endOf=(l,j)=>j+1<l.length?toMin(l[j+1].h):toMin(l[j].h)+55;
 const fmtM=m=>pad(Math.floor(m/60))+':'+pad(m%60),inM=m=>m<60?m+' min':Math.floor(m/60)+' h'+(m%60?' '+m%60+' min':'');
 let lab='',main='',sub='',prog=null;
 if(wd<5){const l=dayL(wd);const j=l.findIndex((x,i)=>toMin(x.h)<=nm&&nm<endOf(l,i)),nx=l.find(x=>toMin(x.h)>nm);
  if(j>=0){const x=l[j],s=toMin(x.h),e=endOf(l,j);lab='Ahora';main=x.t;sub=(x.r?'Aula '+x.r+' · ':'')+'hasta las '+fmtM(e)+(nx?' · después '+nx.t:'');prog=Math.round((nm-s)/(e-s)*100)}
  else if(nx){lab='Siguiente';main=nx.t;sub='A las '+nx.h.slice(0,5)+' ('+'en '+inM(toMin(nx.h)-nm)+')'+(nx.r?' · Aula '+nx.r:'')}
  else if(l.length){lab='Hoy';main='Ya no hay más clases';sub='Has terminado las '+l.length+' de hoy'}}
 if(!lab){let d=(wd+1)%7,guard=0;while(guard++<7&&(d>4||!dayL(d).length))d=(d+1)%7;const l=dayL(d);
  if(l.length){lab=d===(wd+1)%7?'Mañana':'El '+DIAS[d].toLowerCase();main='Empiezas con '+l[0].t;sub='A las '+l[0].h.slice(0,5)+(l[0].r?' · Aula '+l[0].r:'')+' · '+l.length+(l.length===1?' clase':' clases')}}
 if(!lab)return '';
 return `<div class="tt-now"><div class="tn-l"><span class="tn-tag">${lab}</span><b>${esc(main)}</b><small>${esc(sub)}</small>${prog!=null?`<div class="tn-bar" role="progressbar" aria-valuenow="${prog}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de la clase"><i style="width:${prog}%"></i></div>`:''}</div><svg class="ulm tn-ulm" viewBox="0 0 474 542" aria-hidden="true"><use href="#ul-mark" width="474" height="542"/></svg></div>`;
}
(function(){try{const s=document.createElement('div');s.className='sb-shade';s.setAttribute('aria-hidden','true');document.body.appendChild(s)}catch(e){}})();

function renderSched(){
 const view=searchQ?'days':(settings.schedView||'week'),has=data.sched.length>0;
 const tog=has?`<div class="seg ttv-seg" data-key="schedView"><button type="button" data-v="week" class="${view==='week'?'on':''}">Semana</button><button type="button" data-v="days" class="${view==='days'?'on':''}">Por días</button></div>`:'';
 let body=has?(view==='week'?schedGrid():schedDays()):'';
 if(!body)body=`<div class="${has?'empty':'ttv-empty'}">${has?(searchQ?'Sin resultados.':'Aún no hay clases en el horario.'):(isStaff()?'Todavía no hay horario.<br>Créalo de golpe, de lunes a viernes.<br><button type="button" class="add" onclick="openTimetable()">Crear el horario</button>':'Tu profesor aún no ha añadido el horario.')}</div>`;
 $('schedList').innerHTML=(has?schedNowHTML():'')+tog+body;
}
let ttRows=[];
function openTimetable(){
 if(!isStaff()){toast('Solo los profesores pueden editar el horario');return}
 const map={};
 data.sched.forEach(x=>{const h=(x.h||'08:00').slice(0,5);const row=map[h]=map[h]||{h,c:[null,null,null,null,null]};if(x.day>=0&&x.day<5){const c=row.c[x.day];row.c[x.day]=c?{t:c.t+' / '+x.t,r:[c.r,x.r].filter(Boolean).join(' / ')}:{t:x.t,r:x.r||''}}});
 ttRows=Object.values(map).sort((a,b)=>a.h.localeCompare(b.h));
 if(!ttRows.length)['08:30','09:25','10:20','11:45','12:40','13:35'].forEach(h=>ttRows.push({h,c:[null,null,null,null,null]}));
 modal('timetable');
}
function timetableHTML(){
 const head='<tr><th></th>'+DIAS.map(d=>'<th>'+d.slice(0,3).toUpperCase()+'</th>').join('')+'<th></th></tr>';
 const rows=ttRows.map((r,i)=>`<tr><td class="tt-h"><input type="time" class="tt-time" value="${esc(r.h)}" aria-label="Hora"></td>${r.c.map((c,d)=>`<td class="tt-c"><input class="tt-t" data-d="${d}" placeholder="Materia" maxlength="40" value="${esc(c?c.t:'')}" aria-label="Materia ${DIAS[d]}"><input class="tt-r" data-d="${d}" placeholder="Aula" maxlength="24" value="${esc(c?c.r:'')}" aria-label="Aula ${DIAS[d]}"></td>`).join('')}<td><button type="button" class="tt-del" onclick="ttDel(${i})" aria-label="Quitar franja">×</button></td></tr>`).join('');
 return `<div class="tt-scroll"><table class="tt-ed"><thead>${head}</thead><tbody>${rows}</tbody></table></div><div class="tt-bar"><button type="button" class="mini-btn" onclick="ttAdd()">+ Añadir franja</button><button type="button" class="mini-btn" onclick="ttCopyMon()">Copiar el lunes a toda la semana</button></div><div class="gl-sub">Los huecos vacíos no se guardan. Los alumnos solo ven el horario, no pueden cambiarlo.</div>`;
}
function ttCollect(){ttRows=[...document.querySelectorAll('.tt-ed tbody tr')].map(tr=>({h:tr.querySelector('.tt-time').value||'',c:[0,1,2,3,4].map(d=>{const t=tr.querySelector('.tt-t[data-d="'+d+'"]').value.trim(),r=tr.querySelector('.tt-r[data-d="'+d+'"]').value.trim();return t||r?{t,r}:null})}))}
function ttRefresh(){$('modalFields').innerHTML=timetableHTML()}
function ttAdd(){ttCollect();const last=ttRows[ttRows.length-1];let h='08:30';if(last&&last.h){const p=last.h.split(':').map(Number),m=p[0]*60+p[1]+55;h=pad(Math.floor(m/60)%24)+':'+pad(m%60)}ttRows.push({h,c:[null,null,null,null,null]});ttRefresh();const ins=document.querySelectorAll('.tt-ed tbody tr:last-child .tt-t');if(ins[0])ins[0].focus()}
function ttDel(i){ttCollect();ttRows.splice(i,1);ttRefresh()}
function ttCopyMon(){ttCollect();let n=0;ttRows.forEach(r=>{const m=r.c[0];if(m&&m.t){for(let d=1;d<5;d++)r.c[d]={t:m.t,r:m.r};n++}});ttRefresh();toast(n?'Lunes copiado a toda la semana':'Primero escribe algo en la columna del lunes')}function renderFeed(){const l=[...data.photos].sort((a,b)=>(b.fav?1:0)-(a.fav?1:0)).filter(p=>match(p.t+' '+p.s+' '+p.g));
 $('feed').innerHTML=l.map(p=>`<div class="post"><div class="photo"${p.img?` onclick="viewPhoto('${p.id}')" style="cursor:zoom-in"`:''}>${p.img?`<img src="${p.img}" alt="">`:p.i}</div><div style="flex:1"><b>${p.fav?'⭐ ':''}${esc(p.t)}</b><p>${esc(p.s)}</p><span class="tag">${esc(p.g)}</span></div><button type="button" class="del" aria-label="Opciones" onclick="photoMenu('${p.id}')">⋯</button></div>`).join('')||'<div class="empty">'+(searchQ?'Sin resultados.':'Aún no hay fotos.')+'</div>'}
/* Chat tipo WhatsApp: texto, emojis, stickers, notas de voz, fotos, respuestas y borrado */
const STK=['😂','🤣','😍','🥳','😎','🤯','😭','🙏','👍','👏','🔥','💯','❤️','🎉','🤔','😴','🥲','😡','🤝','🫶','🧠','📚','✏️','🎓','☕','🍕','😅','🤩','🫡','💪','🙌','😬'];
const EMJ='😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 😉 😍 🥰 😘 😋 😛 😜 🤪 🤗 🤔 🤨 😐 😑 😶 🙄 😏 😴 😪 😷 🤒 🤕 🤢 🥵 🥶 😎 🤓 😕 😟 🙁 😮 😲 😳 🥺 😢 😭 😱 😖 😞 😤 😡 🤬 💀 👍 👎 👌 ✌️ 🤞 🤟 🤘 👋 🙌 👏 🙏 💪 ❤️ 🧡 💛 💚 💙 💜 🖤 💔 ✨ 🔥 ⭐ 🎉 🎓 📚 ✏️ 📝 💡 ⏰ ☕ 🍕'.split(' ');
let replyTo=null,panelTab='emo',audio=null,audioId=null,rec=null,recChunks=[],recT0=0,recTick=null,recStream=null;
const dayLabel=ts=>{const d=new Date(ts),k=x=>x.toDateString();return k(d)===k(new Date())?'Hoy':k(d)===k(new Date(Date.now()-864e5))?'Ayer':d.toLocaleDateString('es-ES',{day:'numeric',month:'long'})};
const fmtDur=n=>Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0');
function bars(id){let h=0;for(const ch of String(id))h=(h*31+ch.charCodeAt(0))>>>0;return Array.from({length:30},()=>{h=(h*1103515245+12345)>>>0;return 20+(h%70)}).map(v=>`<i style="height:${v}%"></i>`).join('')}
function renderChat(){
 paintChatHead();const m=$('messages'),list=data.messages.filter(x=>match((x.t||'')+(x.type==='audio'?' nota de voz':'')));let last='';
 m.innerHTML=list.map(x=>{
  const d=x.ts?dayLabel(x.ts):'',sep=d&&d!==last?`<div class="wa-day"><span>${esc(d)}</span></div>`:'';last=d||last;
  const q=x.reply?`<div class="wa-q"><b>${esc(x.reply.n)}</b><span>${esc(x.reply.t)}</span></div>`:'',tm=x.ts?hm(x.ts):'';
  if(x.type==='sticker')return sep+`<div class="msg stk${x.me?' me':''}" data-id="${x.id}">${q}<div class="wa-sticker">${esc(x.t)}</div><small class="wa-t">${tm}</small></div>`;
  let body;
  if(x.type==='audio')body=`<div class="wa-audio"><button type="button" class="wa-play" data-play="${x.id}" aria-label="Reproducir">▶</button><div class="wa-wave" data-wave="${x.id}">${bars(x.id)}<span class="wa-prog"></span></div><span class="wa-dur">${fmtDur(x.dur||0)}</span></div>`;
  else if(x.type==='image')body=`<img class="wa-img" src="${x.src}" alt="Foto">${x.t?`<div>${esc(x.t)}</div>`:''}`;
  else body=esc(x.t);
  return sep+`<div class="msg${x.me?' me':''}" data-id="${x.id}">${x.me?'':`<small class="wa-n">${esc(x.n)}</small>`}${q}${body}<small class="wa-t">${tm}</small></div>`;
 }).join('')||'<div class="empty">'+(searchQ?'Sin resultados.':'Aún no hay mensajes.')+'</div>';
 m.scrollTop=m.scrollHeight;
}
function pushMsg(o){if(iAmMuted()){toastErr('Un profesor te ha silenciado en esta clase');return}
 data.messages.push(Object.assign({id:uid(),n:user,me:1,ts:Date.now()},o,replyTo?{reply:replyTo}:{}));
 clearReply();renderChat();saveState();
}
function sendMessage(){const i=$('chatInput'),t=i.value.trim();if(!t)return;pushMsg({type:'text',t});i.value='';updateComposer();closePanel();i.focus()}
function updateComposer(){const has=$('chatInput').value.trim().length>0;$('sendBtn').classList.toggle('hidden',!has);$('micBtn').classList.toggle('hidden',has)}
$('chatInput').addEventListener('input',updateComposer);
$('chatInput').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(settings.enterSend!==false)sendMessage()}});
$('chatInput').addEventListener('focus',()=>closePanel());
function drawPanel(){
 $('stkPanel').innerHTML=`<div class="wa-tabs"><button type="button" class="${panelTab==='emo'?'on':''}" onclick="panelTab='emo';drawPanel()">Emoji</button><button type="button" class="${panelTab==='stk'?'on':''}" onclick="panelTab='stk';drawPanel()">Stickers</button></div><div class="wa-grid ${panelTab}">`+(panelTab==='emo'?EMJ.map(e=>`<button type="button" onclick="addEmoji('${e}')">${e}</button>`):STK.map(e=>`<button type="button" onclick="sendSticker('${e}')">${e}</button>`)).join('')+'</div>';
}
function togglePanel(){const p=$('stkPanel');if(!p.classList.contains('hidden')){p.classList.add('hidden');return}drawPanel();p.classList.remove('hidden')}
function closePanel(){$('stkPanel').classList.add('hidden')}
function addEmoji(e){const i=$('chatInput'),a=i.selectionStart==null?i.value.length:i.selectionStart,b=i.selectionEnd==null?a:i.selectionEnd;i.value=i.value.slice(0,a)+e+i.value.slice(b);updateComposer()}
function sendSticker(e){pushMsg({type:'sticker',t:e});closePanel()}
function viewImg(src){$('lbImg').src=src;$('lb').classList.remove('hidden')}
$('chatImg').addEventListener('change',e=>{const f=e.target.files[0];e.target.value='';if(!f)return;shrink(f,900,.7).then(u=>pushMsg({type:'image',src:u,t:''}),()=>toast('No se pudo leer la imagen'))});
function setReply(x){
 const t=x.type==='audio'?'🎤 Nota de voz':x.type==='image'?'📷 Foto':(x.t||'').slice(0,70);
 replyTo={n:x.me?'Tú':x.n,t,id:x.id};
 $('replyBar').innerHTML=`<div><b>${esc(replyTo.n)}</b><span>${esc(t)}</span></div><button type="button" aria-label="Quitar respuesta" onclick="clearReply()">✕</button>`;
 $('replyBar').classList.remove('hidden');$('chatInput').focus();
}
function clearReply(){replyTo=null;$('replyBar').classList.add('hidden')}
function msgMenu(id){
 const x=data.messages.find(m=>m.id===id);if(!x)return;
 if(!NZ.reply)NZ.reply='<polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>';
 const items=[{k:'act',label:'Responder',icon:'reply',fn:()=>setReply(x)}];
 if(x.t&&x.type!=='audio')items.push({k:'act',label:'Copiar',icon:'copy',fn:()=>copyText(x.t).then(ok=>toast(ok?'Copiado':'No se pudo copiar'))});
 if(x.type==='image')items.push({k:'act',label:'Ver foto',icon:'eye',fn:()=>viewImg(x.src)},{k:'act',label:'Descargar foto',icon:'dl',fn:()=>downloadImg(x.src,'foto-chat')});
 if(x.type==='audio')items.push({k:'act',label:'Descargar audio',icon:'dl',fn:()=>downloadAudio(x.id)});
 items.push({k:'sep'},{k:'hold',label:'Eliminar mensaje',icon:'trash',fn:()=>{data.messages=data.messages.filter(m=>m.id!==id);saveState();renderChat();toast('Mensaje eliminado')}});
 openMenu(items);
}
$('messages').addEventListener('click',e=>{
 const pl=e.target.closest('[data-play]');if(pl){playAudio(pl.dataset.play);return}
 const im=e.target.closest('.wa-img');if(im){viewImg(im.src);return}
 const b=e.target.closest('.msg');if(b)msgMenu(b.dataset.id);
});
function paintAudio(id,p){
 const w=document.querySelector('[data-wave="'+id+'"]'),b=document.querySelector('[data-play="'+id+'"]');if(!w)return;
 w.style.setProperty('--p',Math.min(1,p||0)*100+'%');
 if(b)b.textContent=(audio&&audioId===id&&!audio.paused&&!audio.ended)?'❚❚':'▶';
}
function playAudio(id){
 const x=data.messages.find(m=>m.id===id);if(!x||!x.src)return;
 if(audio&&audioId===id){audio.paused?audio.play():audio.pause();return}
 if(audio){audio.pause();paintAudio(audioId,0)}
 audio=new Audio(x.src);audioId=id;
 const upd=()=>paintAudio(id,audio.currentTime/((isFinite(audio.duration)&&audio.duration)||x.dur||1));
 audio.ontimeupdate=upd;audio.onplay=upd;audio.onpause=upd;audio.onended=()=>paintAudio(id,0);
 audio.play().catch(()=>toast('No se pudo reproducir el audio'));
}
async function startRec(){
 if(rec)return;
 if(!navigator.mediaDevices||!window.MediaRecorder){toast('Este navegador no permite grabar audio');return}
 try{recStream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('No se pudo usar el micrófono. Revisa el permiso o abre la web en el navegador.');return}
 const mt=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||'';
 try{rec=new MediaRecorder(recStream,mt?{mimeType:mt}:undefined)}catch(e){recStream.getTracks().forEach(t=>t.stop());rec=null;toast('No se pudo iniciar la grabación');return}
 recChunks=[];rec.ondataavailable=e=>{if(e.data&&e.data.size)recChunks.push(e.data)};
 rec.start();recT0=Date.now();closePanel();$('composer').classList.add('hidden');$('recBar').classList.remove('hidden');$('recTime').textContent='0:00';
 recTick=setInterval(()=>{const n=(Date.now()-recT0)/1000;$('recTime').textContent=fmtDur(n);if(n>=60)stopRec(true)},250);
}
function stopRec(send){
 if(!rec)return;const r=rec,dur=(Date.now()-recT0)/1000,type=r.mimeType||'audio/webm';rec=null;clearInterval(recTick);
 r.onstop=()=>{if(recStream)recStream.getTracks().forEach(t=>t.stop());recStream=null;
  if(send&&dur>=1&&recChunks.length){const fr=new FileReader();fr.onload=()=>pushMsg({type:'audio',src:fr.result,dur:Math.round(dur)});fr.readAsDataURL(new Blob(recChunks,{type}))}
  else if(send)toast('Audio demasiado corto');
  recChunks=[]};
 try{r.stop()}catch(e){}
 $('recBar').classList.add('hidden');$('composer').classList.remove('hidden');
}
updateComposer();
function renderClass(){
 const has=classes.some(c=>!c.archived);
 $('noClass').classList.toggle('hidden',has);$('classView').classList.toggle('hidden',!has);
 if(!has)return;
 const arch=classes.filter(c=>c.archived).length,items=classes.map((c,i)=>({c,i})).filter(o=>!o.c.archived).map(o=>({l:(o.c.emoji?o.c.emoji+' ':'')+o.c.name,cur:o.i===cur,fn:()=>switchClass(String(o.i))})).concat([{sep:1},{l:'＋ Añadir o unirse…',fn:()=>modal('add')}],arch?[{l:'📦 Archivadas ('+arch+')',fn:()=>modal('archived')}]:[]);
 BM.cls={items};$('classSel').innerHTML=popupHTML(items,'Mis clases','cls','1.9em')+`<span class="cls-name">${esc((classes[cur].emoji||"")+" "+classes[cur].name)}</span>`;
 $('memberList').innerHTML=data.members.map((m,i)=>`<div class="member clickable" onclick="showProfile(${i})">${mAv(m)}<div>${esc(m.n)}<small>${esc(m.r)}${m.b?' · '+esc(m.b):''}</small></div></div>`).join('');
}
/* Banner difuminado "horneado": se dibuja en un canvas con transparencia real en los bordes */
function paintBanner(){
 const bg=$('classBg'),hr=document.querySelector('#classView .hero'),c=classes[cur];
 if(!bg||!hr)return;
 const show=!!(c&&okImg(c.banner)&&$('classShell').classList.contains('visible'));document.body.classList.toggle('hasbn',show);
 if(!show){bg.style.backgroundImage='';bg.style.display='none';hr.style.paddingTop='';paintBanner.k='';return}
 const vw=document.documentElement.clientWidth,sc=Math.min(2,window.devicePixelRatio||1),W=Math.round(vw*sc),maxH=Math.round(Math.min(520,Math.max(300,vw*.82))*sc);
 const tag=cur+'|'+c.banner.length+c.banner.slice(-24)+'|'+W+'v4';
 const im=new Image();
 im.onload=()=>{
  /* la imagen CUBRE todo el ancho; si es muy alta se recorta por abajo (nunca por los lados) */
  const k=W/im.width,H=Math.round(Math.min(im.height*k,maxH));
  hr.style.paddingTop='0px';
  const top=hr.getBoundingClientRect().top+window.scrollY;
  hr.style.paddingTop=Math.max(8,Math.round(H/sc-96-top))+'px';
  const key=tag+'|'+H;
  if(paintBanner.k===key){bg.style.display='block';return}
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
  const srcH=H/k,sy=Math.max(0,(im.height-srcH)*.22);
  x.drawImage(im,0,sy,im.width,srcH,0,0,W,H);
  /* un poco de oscuridad, más abajo para que el texto se lea */
  x.globalCompositeOperation='source-atop';
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,0,0,.12)');g.addColorStop(.55,'rgba(0,0,0,.14)');g.addColorStop(1,'rgba(0,0,0,.62)');x.fillStyle=g;x.fillRect(0,0,W,H);
  /* difuminado suave: solo el borde inferior se funde con el fondo */
  x.globalCompositeOperation='destination-in';
  g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#000');g.addColorStop(.74,'#000');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  bg.style.backgroundImage='url('+cv.toDataURL('image/png')+')';bg.style.height=Math.round(H/sc)+'px';bg.style.display='block';paintBanner.k=key;
 };
 im.crossOrigin='anonymous';im.src=c.banner;
}
window.addEventListener('resize',()=>{clearTimeout(paintBanner.t);paintBanner.t=setTimeout(paintBanner,250)});
function renderAll(){applyRole();renderEvents();renderTasks();renderSched();renderFeed();renderChat();renderStream();renderWork();renderPeople();renderGrades();renderClass();requestAnimationFrame(paintBanner);updateFab()}
function switchClass(v){if(v==='new'){renderClass();modal('add');return}setCur(+v);renderAll();saveState()}
function showLogin(){$('welcome').classList.add('hidden');$('login').classList.remove('hidden');window.scrollTo(0,0);$('emailInput')?.focus()}
function launchApp(b){
 if(!canStore()){showCookies();return}
 b.classList.add('go');const r=b.getBoundingClientRect(),fx=document.createElement('div');fx.className='fx';
 fx.style.left=(r.left+r.width/2)+'px';fx.style.top=(r.top+r.height/2)+'px';fx.innerHTML='<b></b><i></i><i></i><i></i>';document.body.appendChild(fx);
 document.querySelector('.welcome-box').classList.add('out');setTimeout(showLogin,950);setTimeout(()=>fx.remove(),2400);
}
function showWelcome(){document.querySelector('.welcome-box').classList.remove('out');$('startLogin').classList.remove('go');hideOtpStep();$('login').classList.add('hidden');$('welcome').classList.remove('hidden');window.scrollTo(0,0)}
function dueCount(){const today=iso(new Date()),lim=iso(new Date(Date.now()+(settings.remDays||1)*864e5));let n=0;classes.forEach(c=>{n+=c.data.events.filter(e=>e.d>=today&&e.d<=lim).length+c.data.tasks.filter(t=>!t.done&&t.d>=today&&t.d<=lim).length});return n}
function enter(name){
 document.body.classList.add('in-app');
 user=(name||'Alumno').trim()||'Alumno';user=user[0].toUpperCase()+user.slice(1);
 $('welcome').classList.add('hidden');$('login').classList.add('hidden');$('classShell').classList.add('visible');
 $('profile').classList.add('on');$('topName').textContent=user;paintAvatar();
 if(classes.length){if(!classes[cur])cur=0;setCur(cur)}syncMe();
 renderAll();window.scrollTo(0,0);saveState();if(settings.startTab&&settings.startTab!=='Inicio'&&classes.length)setTimeout(()=>goTab(settings.startTab),0);
 if(!settings.toured&&canStore()&&classes.some(c=>!c.archived))setTimeout(showTour,1200);updateFab();const n=dueCount();if(n)setTimeout(()=>toast('Tienes '+n+(n===1?' cosa':' cosas')+' para hoy o mañana'),600);
}
function showView(id,btn){
 document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
 document.querySelectorAll('.ib-tabs .ib-btn').forEach(b=>b.classList.toggle('active',b===btn));
 document.body.classList.toggle('chat-open',id==='chat');if(id==='chat')renderChat();updateFab();
}
function goTab(name){const id={Inicio:'home',Calendario:'calendar',Trabajo:'tasks',Horario:'sched',Ahora:'now',Notas:'grades',Personas:'people',Chat:'chat'}[name];showView(id,[...document.querySelectorAll('.ib-tabs .ib-btn')].find(b=>b.textContent.trim()===name))}
function copyCode(){const btn=document.querySelector('.copy');copyText($('classCode').textContent).then(ok=>{btn.textContent=ok?'¡Copiado!':'Error';setTimeout(()=>btn.textContent='Copiar',1500)})}
const FILE_ICON='<svg viewBox="0 0 24 24"><path d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"/></svg>';
const SW=id=>`<label class="switch"><input type="checkbox" id="${id}"><div class="slider"><div class="circle"><svg class="cross" viewBox="0 0 10 10"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="2" fill="none"/></svg><svg class="checkmark" viewBox="0 0 10 10"><path d="M1 5l3 3 5-6" stroke="currentColor" stroke-width="2" fill="none"/></svg></div></div></label>`;
function adminHTML(){
 const adm=isStaff();
 return data.members.map((m,i)=>`<div class="member">${mAv(m)}<div style="flex:1">${esc(m.n)}<small>${rbadge(m.r)}${m.b?' · '+esc(m.b):''}</small></div>${adm&&i>0?`<button type="button" class="mini-btn" aria-label="Opciones" onclick="memberMenu(${i})">⋯</button>`:''}</div>`).join('')
 +(adm?`<button type="button" class="secondary" onclick="modal('editclass')">🎨 Personalizar clase</button>${DL('Exportar clase','Copia en .json','exportClass()')}${permHTML()}<div class="cp-row"><span>Código de clase · <b>${esc(classes[cur].code)}</b></span>${CP('classes[cur].code','Copiar código')}</div><button type="button" class="secondary" onclick="copyClass()">Copiar clase</button><button type="button" class="secondary" onclick="archiveClass()">📦 Archivar clase</button><button type="button" class="secondary danger" onclick="deleteClass()">Eliminar clase</button>`:`<button type="button" class="secondary danger" onclick="deleteClass()">Salir de la clase</button>`);
}
function refreshAdmin(){$('modalFields').innerHTML=adminHTML();bindPerm();saveState();renderAll()}
function addMember(){const n=$('newMember').value.trim();if(!n)return;data.members.push({n,r:'Alumno'});refreshAdmin()}
function rmMember(i){const m=data.members[i];if(!m)return;if(m.u&&m.u===(classes[cur]||{}).owner){toast('No se puede quitar a quien creó la clase');return}if(m.u&&m.u===authUid){toast('Para salir de la clase usa «Salir de la clase»');return}if(role!=='Administrador'&&STAFFR.includes(m.r)){toast('Solo un administrador puede quitar a un profesor');return}data.members.splice(i,1);if($('modal').classList.contains('show')&&mType==='admin')refreshAdmin();else{saveState();renderAll()}toast(m.n+' ya no está en la clase')}
function shareClass(){const c=classes[cur],o={n:c.name,c:c.code,ic:c.emoji,co:c.color,d:c.desc,e:data.events,t:data.tasks,s:data.sched,m:data.members};
 const tk='MTX:'+btoa(unescape(encodeURIComponent(JSON.stringify(o))));
 copyText(tk).then(ok=>{if(ok)toast('Código copiado. Pásalo a tu clase para que lo pegue en "Unirme con código"');else prompt('Copia este código:',tk)})}
async function deleteClass(){
 const c=classes[cur];if(!c)return;const owner=c.owner===authUid;
 if(!await ask({icon:owner?'🗑️':'🚪',title:owner?'¿Eliminar esta clase para todos?':'¿Salir de esta clase?',text:owner?'Se borrarán la clase y todo su contenido para todos sus miembros. No se puede deshacer.':'Dejarás de ver esta clase. Podrás volver a unirte con su código.',ok:owner?'Eliminar':'Salir',danger:true}))return;
 const r=owner?await sb.from('classes').delete().eq('id',c.id):await sb.from('members').delete().eq('class_id',c.id).eq('user_id',authUid);
 if(r.error){toast(dbErr(r.error));return}
 closeModal();await pullAll(true);toast(owner?'Clase eliminada':'Has salido de la clase');
}
async function wipeData(){if(!await ask({icon:'🗑️',title:'¿Borrar todos tus datos?',text:'Se cerrará tu sesión y se borrarán los datos guardados en este dispositivo. Tus clases siguen en tu cuenta.',ok:'Borrar todo',danger:true}))return;wipeNow()}
/* Menú desplegable — From Uiverse.io by Galahhad (burger popup) */
const BM={};let bmN=0;
const COUNTRIES=[["34", "🇪🇸 +34"],["1", "🇺🇸 +1"], ["44", "🇬🇧 +44"], ["61", "🇦🇺 +61"], ["91", "🇮🇳 +91"], ["49", "🇩🇪 +49"], ["33", "🇫🇷 +33"], ["39", "🇮🇹 +39"], ["52", "🇲🇽 +52"], ["54", "🇦🇷 +54"], ["55", "🇧🇷 +55"], ["81", "🇯🇵 +81"]];
function popupHTML(items,title,key,sz){
 return `<label class="popup"${sz?` style="--burger-diameter:${sz}"`:''}><input type="checkbox"><div class="burger" tabindex="0" role="button" aria-label="${esc(title)}"><span></span><span></span><span></span></div><nav class="popup-window"><div class="pw-title">${esc(title)}</div><ul>${items.map((it,i)=>it.sep?'<hr>':`<li><button type="button" class="${it.cur?'cur':''}" data-bm="${key}" data-i="${i}">${it.icon||''}<span>${esc(it.l)}</span></button></li>`).join('')}</ul></nav></label>`;
}
function bsel(id,title,items,val,sz){
 const key='b'+(++bmN),cur=items.find(x=>x.v===val)||items[0];
 items.forEach(x=>x.cur=x.v===cur.v);
 BM[key]={items,fn:it=>{$(id).value=it.v;$(id+'L').textContent=it.l;document.querySelectorAll('[data-bm="'+key+'"]').forEach(b=>b.classList.toggle('cur',items[+b.dataset.i]===it))}};
 return `<span class="bsel"><input type="hidden" id="${id}" value="${esc(cur.v)}">${popupHTML(items,title,key,sz)}<span class="bsel-val" id="${id}L">${esc(cur.l)}</span></span>`;
}
/* El menú se mueve a <body> al abrirse: así ningún contenedor con blur/filter lo descoloca */
function closePopups(except){
 document.querySelectorAll('.menu-open').forEach(h=>h.classList.remove('menu-open','menu-up'));
 document.querySelectorAll('.popup input:checked').forEach(c=>{if(c!==except)c.checked=false});
 document.querySelectorAll('.popup-window.open').forEach(n=>{if(!except||!n._pop||n._pop.querySelector('input')!==except)n.classList.remove('open')});
}
document.addEventListener('click',e=>{
 const t=e.target,b=t.closest&&t.closest('[data-bm]');
 if(b){const m=BM[b.dataset.bm],it=m.items[+b.dataset.i];closePopups();(it.fn||m.fn)(it);return}
 const host=t.closest&&t.closest('.country-box,.bsel,div.classsel,.gl-pick');
 if(host&&!t.closest('.popup,.popup-window')){const c=host.querySelector('.popup input');if(c){c.checked=!c.checked;c.dispatchEvent(new Event('change',{bubbles:true}));return}}
 if(!(t.closest&&t.closest('.popup,.popup-window')))closePopups();
});
document.addEventListener('change',e=>{
 const c=e.target;if(!c.matches||!c.matches('.popup input'))return;
 const pop=c.closest('.popup');
 if(!c.checked){if(pop._nav)pop._nav.classList.remove('open');document.querySelectorAll('.menu-open').forEach(h=>h.classList.remove('menu-open','menu-up'));return}
 closePopups(c);
 document.querySelectorAll('body>.popup-window').forEach(n=>{if(n._pop&&!n._pop.isConnected)n.remove()});
 let nav=pop._nav||pop.querySelector('.popup-window');
 if(!pop._nav){pop._nav=nav;nav._pop=pop;document.body.appendChild(nav)}
 const hostEl=pop.closest('.country-box')||pop.closest('.bsel,div.classsel,.gl-pick'),att=!!hostEl&&hostEl.matches('.country-box,.bsel'),host=hostEl||pop.querySelector('.burger'),r=host.getBoundingClientRect();
 nav.classList.toggle('attached',att);nav.style.minWidth=Math.round(r.width)+'px';nav.style.maxWidth=(att&&hostEl.matches('.country-box,.bsel'))?Math.round(r.width)+'px':'';
 const h=nav.offsetHeight,w=nav.offsetWidth,gap=att?-1:6,below=r.bottom+gap+h<=innerHeight-8;
 nav.style.top=(below?r.bottom+gap:Math.max(8,r.top-gap-h))+'px';
 nav.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+'px';
 nav.dataset.dir=below?'down':'up';nav.style.transformOrigin=att?(below?'top center':'bottom center'):(Math.round(r.left+r.width/2-parseFloat(nav.style.left))+'px '+(below?'-6px':'calc(100% + 6px)'));nav.querySelectorAll('li').forEach((li,i)=>li.style.setProperty('--i',i));
 if(att){host.classList.add('menu-open');if(!below)host.classList.add('menu-up')}
 void nav.offsetWidth;nav.classList.add('open');
});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape')closePopups();
 if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('.burger')){e.preventDefault();const c=e.target.parentElement.querySelector('input');c.checked=!c.checked;c.dispatchEvent(new Event('change',{bubbles:true}))}
});
window.addEventListener('scroll',e=>{const t=e.target;if(t&&t.nodeType===1&&t.closest&&t.closest('.popup-window'))return;closePopups()},true);
window.addEventListener('resize',()=>closePopups());
$('countryPop').innerHTML=bsel('country-code','Prefijo del país',COUNTRIES.map(([v,l])=>({v,l})),'34','2.3em');
/* Menú de acciones — From Uiverse.io by nazar-gavrylyk */
const NZ={
 lock:'<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
 edit:'<path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>',
 star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
 pencil:'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path>',
 copy:'<line y2="18" y1="12" x2="15" x1="15"></line><line y2="15" y1="15" x2="18" x1="12"></line><rect ry="2" rx="2" y="8" x="8" height="14" width="14"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>',
 tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>',
 eye:'<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle>',
 palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
 settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line>',
 swap:'<path d="m3 16 4 4 4-4"></path><path d="M7 20V4"></path><path d="m21 8-4-4-4 4"></path><path d="M17 4v16"></path>',
 trash:'<path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line>',
 check:'<path d="M20 6 9 17l-5-5"></path>',
 x:'<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
};
const nzSvg=(k,c)=>`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${c?` class="${c}"`:''}>${NZ[k]}</svg>`;
let amItems=[];
function nzItem(it,i){
 if(it.k==='toggle')return `<li class="nz-item nz-fav"><input type="checkbox" class="nz-chk" data-i="${i}" ${it.on?'checked':''}><span class="nz-label">${esc(it.label)}</span><span class="nz-label nz-favlabel">${esc(it.label2)}</span>${nzSvg(it.icon)}</li>`;
 if(it.k==='rename')return `<li class="nz-item nz-rename"><span class="nz-label">${esc(it.label)}</span><input class="nz-tog" type="checkbox" data-i="${i}"><label class="nz-ic"><input class="nz-in" type="text" maxlength="60" value="${esc(it.value)}"><div class="nz-icons">${nzSvg('check','nz-ok')}${nzSvg('x','nz-no')}</div></label>${nzSvg('pencil')}</li>`;
 if(it.k==='hold')return `<li class="nz-item nz-del" data-hold="${i}"><span class="nz-label">${esc(it.label)}</span><span class="nz-label nz-action">${esc(it.action||'Mantén para confirmar')}</span>${nzSvg(it.icon||'trash')}</li>`;
 return `<li class="nz-item" data-act="${i}"><span class="nz-label">${esc(it.label)}</span>${nzSvg(it.icon)}</li>`;
}
function openMenu(items,anchor){
 amItems=items;const seg=[[]];
 items.forEach((it,i)=>{if(it.k==='sep')seg.push([]);else seg[seg.length-1].push(nzItem(it,i))});
 const card=$('amCard');card.innerHTML=seg.map(g=>'<ul class="nz-list">'+g.join('')+'</ul>').join('<div class="nz-sep"></div>');
 card.querySelectorAll('.nz-chk').forEach(c=>c.onchange=()=>amItems[c.dataset.i].fn(c.checked));
 card.querySelectorAll('.nz-rename').forEach(li=>{
  const tog=li.querySelector('.nz-tog'),inp=li.querySelector('.nz-in'),it=amItems[tog.dataset.i];
  const ok=()=>{const v=inp.value.trim();if(!v)return;closeMenu();it.fn(v)};
  tog.onchange=()=>{if(tog.checked){inp.focus();inp.select()}};
  li.querySelector('.nz-ok').onclick=e=>{e.preventDefault();e.stopPropagation();ok()};
  li.querySelector('.nz-no').onclick=e=>{e.preventDefault();e.stopPropagation();tog.checked=false};
  inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();ok()}if(e.key==='Escape'){e.stopPropagation();tog.checked=false}};
 });
 card.querySelectorAll('[data-act]').forEach(li=>li.onclick=()=>{const it=amItems[li.dataset.act];closeMenu();it.fn()});
 card.querySelectorAll('[data-hold]').forEach(li=>{
  const it=amItems[li.dataset.hold];let t;
  li.addEventListener('pointerdown',()=>{t=setTimeout(()=>{closeMenu();it.fn()},1700)});
  ['pointerup','pointerleave','pointercancel'].forEach(e=>li.addEventListener(e,()=>clearTimeout(t)));
 });
 card.style.transition='none';const an=!!anchor;card.classList.toggle('anchored',an);$('amBack').classList.toggle('anchored',an);
 if(an){const r=anchor.getBoundingClientRect(),w=Math.min(236,innerWidth-20);const L=Math.max(10,Math.min(r.right-w,innerWidth-w-10));card.style.left=L+'px';card.style.top=(r.bottom+10)+'px';card.style.transformOrigin=Math.round(r.left+r.width/2-L)+'px -8px'}else{card.style.left='';card.style.top='';card.style.transformOrigin=''}
 card.querySelectorAll('.nz-item').forEach((li,i)=>li.style.setProperty('--i',i));
 void card.offsetWidth;card.style.transition='';$('amBack').classList.add('show');card.classList.add('show');
}
function closeMenu(){$('amBack').classList.remove('show');$('amCard').classList.remove('show')}
$('amBack').addEventListener('click',closeMenu);
$('amCard').addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('touchstart',()=>{},{passive:true});
function viewPhoto(id){const p=data.photos.find(x=>x.id===id);if(!p||!p.img)return;$('lbImg').src=p.img;$('lb').classList.remove('hidden')}
function photoMenu(id){
 const p=data.photos.find(x=>x.id===id);if(!p)return;const TAGS=['CLASE','EXAMEN','OTRO'];
 openMenu([
  {k:'toggle',label:'Añadir a favoritos',label2:'Quitar de favoritos',icon:'star',on:!!p.fav,fn:v=>{p.fav=v;saveState();renderFeed()}},
  {k:'rename',label:'Editar descripción',value:p.s,fn:v=>{p.s=v;saveState();renderFeed();toast('Descripción actualizada')}},
  {k:'act',label:'Etiqueta: '+p.g,icon:'tag',fn:()=>{p.g=TAGS[(TAGS.indexOf(p.g)+1)%3];saveState();renderFeed();toast('Etiqueta: '+p.g)}},
  ...(p.img?[{k:'act',label:'Ver foto',icon:'eye',fn:()=>viewPhoto(id)},{k:'act',label:'Descargar foto',icon:'dl',fn:()=>downloadPhoto(id)}]:[]),
  {k:'act',label:'Duplicar',icon:'copy',fn:()=>{data.photos.unshift({...p,id:uid(),fav:false});saveState();renderFeed();toast('Foto duplicada')}},
  {k:'sep'},
  {k:'hold',label:'Eliminar foto',icon:'trash',fn:()=>{delItem('photos',id);toast('Foto eliminada')}}
 ]);
}
const AVC=['#008cff','#8b5cf6','#10b981','#f59e0b','#ef4444','#ec4899'];
function userMenu(a){
 openMenu([
  {k:'rename',label:'Editar nombre',value:user,icon:'pencil',fn:v=>setName(v)},
  {k:'act',label:'Ver mi perfil',icon:'eye',fn:()=>showProfile({n:user,r:'Mi perfil',e:settings.emoji,c:settings.avatar,b:settings.bio})},
  {k:'act',label:'Pendientes de todas mis clases',icon:'check',fn:()=>modal('todo')},
  {k:'act',label:'Personalizar perfil',icon:'palette',fn:()=>{modal('settings');settingsPage('profile')}},
  {k:'act',label:'Ajustes',icon:'settings',fn:()=>modal('settings')},
  {k:'sep'},
  {k:'act',label:'Cerrar sesión',icon:'logout',fn:logout},
  {k:'hold',label:'Borrar mis datos',icon:'trash',fn:wipeNow}
 ],a||$('topAvatar'));
}
const ROLES=[
 {r:'Administrador',ic:'👑',d:'Gestiona la clase: personaliza, permisos, archivar y eliminar. Cambia los roles de los demás. Puede hacer todo lo de un profesor.'},
 {r:'Profesor',ic:'🎓',d:'Publica anuncios, crea tareas, preguntas y materiales, califica entregas y gestiona eventos y horario.'},
 {r:'Delegado',ic:'⭐',d:'Es como un alumno, pero con una insignia para que la clase sepa quién ayuda al profesor. No tiene permisos de gestión.'},
 {r:'Alumno',ic:'🎒',d:'Entrega trabajos, ve sus notas y participa en el tablón y el chat según los permisos de la clase.'}];
const RBADGE={Administrador:'👑',Profesor:'🎓',Delegado:'⭐',Alumno:''};
const rbadge=r=>RBADGE[r]?`<span class="rbadge r-${esc(r.toLowerCase())}">${RBADGE[r]} ${esc(r)}</span>`:esc(r);
let roleSel='';
function roleBlock(m){
 const c=classes[cur]||{};
 if(role!=='Administrador')return 'Solo un administrador puede cambiar roles.';
 if(m.u&&m.u===authUid)return 'No puedes cambiar tu propio rol. Si quieres dejar de ser administrador, pídeselo a otro administrador.';
 if(m.u&&m.u===c.owner)return 'No se puede cambiar el rol de quien creó la clase.';
 return '';
}
function roleOpen(i){const m=data.members[i];if(!m)return;const why=roleBlock(m);if(why){toast(why);return}modalArg=i;roleSel=m.r;modal('role')}
function roleHTML(){
 const m=data.members[modalArg];if(!m)return '';
 return `<div class="rl-who">${mAv(m)}<div><b>${esc(m.n)}</b><small>Ahora es ${esc(m.r)}</small></div></div>`
  +ROLES.map(x=>`<button type="button" class="rl-card${x.r===roleSel?' on':''}" data-role="${x.r}" onclick="pickRole('${x.r}')"><span class="rl-ic">${x.ic}</span><span class="rl-t"><b>${x.r}</b><small>${x.d}</small></span><span class="rl-chk">✓</span></button>`).join('')
  +`<div class="rl-warn" id="rlWarn"></div>`;
}
function pickRole(r){
 roleSel=r;const m=data.members[modalArg];
 document.querySelectorAll('.rl-card').forEach(b=>b.classList.toggle('on',b.dataset.role===r));
 const w=$('rlWarn');if(!w)return;
 w.textContent=r==='Administrador'?'Un administrador tendrá control total de la clase, incluido cambiar roles y eliminarla para todos.':(m&&m.r==='Administrador'&&r!==m.r?'Dejará de ser administrador y perderá esos permisos.':'');
 w.classList.toggle('show',!!w.textContent);
}
function memberMenu(i){
 const m=data.members[i];if(!m)return;const items=[];
 if(role==='Administrador'&&!roleBlock(m))items.push({k:'act',label:'Cambiar rol…',icon:'swap',fn:()=>roleOpen(i)});
 if(isStaff()&&!STAFFR.includes(m.r))items.push({k:'act',label:m.mu?'Quitar silencio':'Silenciar en tablón y chat',icon:'lock',fn:()=>toggleMute(i)});
 items.push({k:'act',label:'Ver perfil',icon:'eye',fn:()=>{closeModal();showProfile(i)}});
 if(role==='Administrador'||(role==='Profesor'&&!STAFFR.includes(m.r)))items.push({k:'sep'},{k:'hold',label:'Quitar de la clase',icon:'trash',fn:()=>rmMember(i)});
 openMenu(items);
}
/* Personalización de clases y perfiles */
const EMO=['📚','🎓','🧪','💻','🎨','⚽','🌍','🎵','🧮','🚀'],COL=['#008cff','#e11d48','#f472b6','#fb923c','#facc15','#84cc16','#10b981','#0ea5e9','#8b5cf6','#a78bfa'];
const okCol=c=>/^#[0-9a-f]{3,8}$/i.test(c||'');
const meM=r=>({n:user,r,e:settings.emoji||'',c:settings.avatar,b:settings.bio||''});
const okImg=u=>typeof u==='string'&&(u.startsWith('data:image/')||u.startsWith(SB_URL+'/storage/'));
const mAv=m=>{const ph=(m.n===user&&okImg(settings.photo))?settings.photo:(okImg(m.ph)?m.ph:'');return `<div class="ma"${ph?` style="background:center/cover no-repeat url(${ph})!important"`:okCol(m.c)?` style="background:${m.c}!important;color:#fff"`:''}>${ph?'':esc(m.e||(m.n||'?')[0].toUpperCase())}</div>`};
const IMG={icon:'',banner:'',pIcon:'',pBanner:''};
const imgPick=(k,u,shape)=>`<div class="imgrow"><div class="imgprev ${shape}" id="prev_${k}"${okImg(u)?` style="background-image:url(${u})"`:''}></div><label class="imgbtn" for="in_${k}">Elegir foto</label><input type="file" id="in_${k}" accept="image/*" hidden><button type="button" class="imgx" onclick="clearImg('${k}')">Quitar</button></div>`;
function paintPrev(k){const e=$('prev_'+k);if(e)e.style.backgroundImage=IMG[k]?`url(${IMG[k]})`:''}
function clearImg(k){IMG[k]='';paintPrev(k)}
function bindImgs(){['icon','banner','pIcon','pBanner'].forEach(k=>{const e=$('in_'+k);if(e)e.onchange=()=>{const f=e.files[0];if(!f)return;shrink(f,/anner/.test(k)?900:220,.6).then(u=>{IMG[k]=u;paintPrev(k)},()=>toast('No se pudo leer la imagen'))}})}
function showProfile(x){
 const m=typeof x==='number'?data.members[x]:x;if(!m)return;
 const me=m.n===user,col=okCol(m.c)?m.c:'#008cff',ph=me&&okImg(settings.photo)?settings.photo:(okImg(m.ph)?m.ph:''),bn=me&&okImg(settings.banner)?settings.banner:'';
 $('pcBody').innerHTML=`<div class="pc-banner" style="${bn?`background-image:url(${bn})`:`background:linear-gradient(135deg,${col},var(--pcb,#0b1220))`}"></div><div class="pc-av" style="${ph?`background-image:url(${ph})`:`background:${col}`}">${ph?'':esc(m.e||(m.n||'?')[0].toUpperCase())}</div><div class="pc-name">${esc(m.n)}</div><div class="pc-role">${rbadge(m.r||'')}</div>${m.b?`<div class="pc-bio">${esc(m.b)}</div>`:''}${(typeof x==='number'&&role==='Administrador'&&!roleBlock(m))?`<button type="button" class="gl-btn pc-rolebtn" onclick="$('pc').classList.add('hidden');roleOpen(${x})">Cambiar rol</button>`:''}<div class="pc-pad"></div>`;
 $('pc').classList.remove('hidden');
}
function pk(id,list,val,kind){
 const col=kind==='col';
 return `<input type="hidden" id="${id}" value="${esc(val)}"><div class="pks${col?' cb-row':''}" data-for="${id}">${list.map(v=>col?`<button type="button" class="cb-item${v===val?' on':''}" style="--color:${v}" aria-color="${v}" data-v="${esc(v)}" aria-label="${esc(v)}"></button>`:`<button type="button" class="pk ${kind}${v===val?' on':''}" data-v="${esc(v)}" aria-label="${esc(v||'Inicial')}">${kind==='emo'?(v||'Aa'):''}</button>`).join('')}</div>`
}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.pk,.cb-item');if(!b)return;const g=b.parentElement;g.querySelectorAll('.pk,.cb-item').forEach(x=>x.classList.toggle('on',x===b));$(g.dataset.for).value=b.dataset.v});
function classForm(c){c=c||{};return '<input id="f1" placeholder="Nombre de la clase" maxlength="40" value="'+esc(c.name||'')+'"><div class="fl">Foto de icono</div>'+imgPick('icon',c.icon,'sq')+'<div class="fl">Icono (si no hay foto)</div>'+pk('f2',EMO,c.emoji||'📚','emo')+'<div class="fl">Banner</div>'+imgPick('banner',c.banner,'wide')+'<div class="fl">Color</div>'+pk('f3',COL,okCol(c.color)?c.color:'#008cff','col')+'<div class="fl">Descripción</div><input id="f4" placeholder="Opcional" maxlength="80" value="'+esc(c.desc||'')+'">'}
function paintAvatar(){const a=$('topAvatar');if(a)a.textContent=okImg(settings.photo)?'':(settings.emoji||user[0].toUpperCase())}
function syncMe(){classes.forEach(c=>(c.data.members||[]).forEach(m=>{if(m.n===user){m.e=settings.emoji||'';m.c=settings.avatar;m.b=settings.bio||''}}))}
function saveProfile(){
 const n=$('stgName').value.trim();if(!n){toastErr('Escribe un nombre.');return}
 settings.photo=IMG.pIcon;settings.banner=IMG.pBanner;settings.emoji=$('stgEmoji').value;settings.avatar=$('stgColor').value;settings.bio=$('stgBio').value.trim().slice(0,60);
 setName(n);syncMe();paintAvatar();applyTheme();saveState();renderAll();toast('Perfil actualizado');settingsPage('menu');
}
/* Descargas — botón From Uiverse.io by satyamchaudharydev */
NZ.dl='<path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>';
const DLSVG='<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>';
const DL=(l,tip,fn)=>`<div class="dl-btn" role="button" tabindex="0" aria-label="${esc(l)}" data-tooltip="${esc(tip)}" onclick="${fn}"><div class="dl-wrap"><div class="dl-text">${esc(l)}</div><span class="dl-icon">${DLSVG}</span></div></div>`;
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('dl-btn'))e.target.click()});
const slug=t=>String(t||'archivo').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,40)||'archivo';
function dataToBlob(u){
 const m=/^data:([^;,]+)?(;base64)?,([\s\S]*)$/.exec(u||'');if(!m)return null;
 const raw=m[2]?atob(m[3]):decodeURIComponent(m[3]),a=new Uint8Array(raw.length);
 for(let i=0;i<raw.length;i++)a[i]=raw.charCodeAt(i);
 return new Blob([a],{type:m[1]||'application/octet-stream'});
}
/* En una página publicada solo se puede guardar con la capacidad "downloads"; fuera de ella se usa un enlace normal */
async function saveFile(name,data,mime){
 const blob=data instanceof Blob?data:new Blob([data],{type:mime||'text/plain'});
 let dl=null;try{dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null}catch(e){}
 if(dl){
  try{const r=await dl.save({filename:name,data:blob});toast(r&&r.status==='saved'?'Guardado: '+name:'Archivo enviado')}
  catch(e){toast(e&&e.code==='declined'?'Descarga cancelada':'No se pudo descargar en esta vista')}
  return;
 }
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('Descargando '+name);
}
async function getBlob(src){let b=dataToBlob(src);if(!b&&/^(https?:|data:)/.test(src||'')){try{b=await (await fetch(src)).blob()}catch(e){}}return b}
async function downloadImg(src,name){const b=await getBlob(src);if(!b){toast('No se pudo preparar la imagen');return}saveFile(slug(name||'foto')+'.jpg',b)}
function downloadPhoto(id){const p=data.photos.find(x=>x.id===id);if(p&&p.img)downloadImg(p.img,'foto-'+slug(p.s))}
function downloadLb(){downloadImg($('lbImg').src,'foto')}
async function downloadAudio(id){
 const x=data.messages.find(m=>m.id===id);if(!x||!x.src)return;const b=await getBlob(x.src);if(!b){toast('No se pudo preparar el audio');return}
 saveFile('nota-de-voz-'+new Date(x.ts||Date.now()).toISOString().slice(0,16).replace(/[:T]/g,'-')+'.'+(/webm/.test(b.type)?'webm':'mp4'),b);
}
function exportChat(){
 const c=classes[cur];if(!c||!data.messages.length){toast('No hay mensajes que exportar');return}
 const t=data.messages.map(x=>{
  const d=x.ts?new Date(x.ts).toLocaleString('es-ES',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'';
  const b=x.type==='audio'?'[Nota de voz '+fmtDur(x.dur||0)+']':x.type==='image'?'[Foto]'+(x.t?' '+x.t:''):x.type==='sticker'?'[Sticker] '+x.t:x.t;
  return '['+d+'] '+(x.me?'Tú':x.n)+': '+b;
 }).join('\n');
 saveFile('chat-'+slug(c.name)+'.txt',t,'text/plain');
}
const noData=(k,v)=>typeof v==='string'&&v.startsWith('data:')?undefined:v;
function exportClass(){const c=classes[cur];if(!c)return;saveFile('clase-'+slug(c.name)+'.json',JSON.stringify(c,noData,2),'application/json')}
function exportMyData(){saveFile('mis-datos-mariotools.json',JSON.stringify({perfil:{nombre:user,estado:settings.bio,icono:settings.emoji},clases:classes},noData,2),'application/json')}
function exportCsv(){
 const c=classes[cur];if(!c){toast('Primero crea o únete a una clase');return}
 const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"',rows=[['tipo','titulo','fecha','detalle']];
 data.events.forEach(e=>rows.push(['evento',e.t,e.d,e.s]));
 data.tasks.forEach(t=>rows.push(['tarea',t.t,t.d||'',t.done?'hecha':'pendiente']));
 data.sched.forEach(x=>rows.push(['horario',x.t,DIAS[x.day],x.h+(x.r?' · '+x.r:'')]));
 saveFile('calendario-'+slug(c.name)+'.csv','\ufeff'+rows.map(r=>r.map(q).join(',')).join('\n'),'text/csv');
}
/* Botón de copiar — From Uiverse.io by Galahhad */
const CPSVG='<svg xml:space="preserve" viewBox="0 0 6.35 6.35" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="cp-clip"><g><path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path></g></svg><svg xml:space="preserve" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg" class="cp-ok"><g><path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path></g></svg>';
/* CP(expr,tip): botón de copiar para cualquier texto; expr es una expresión JS que devuelve el texto */
const CP=(expr,tip)=>`<button class="cp-btn" type="button" aria-label="${esc(tip||'Copiar')}" onclick="copyBtn(this,()=>${expr})"><span class="cp-tip" data-text-initial="${esc(tip||'Copiar')}" data-text-end="¡Copiado!"></span><span>${CPSVG}</span></button>`;
async function copyBtn(b,get){
 const t=String(typeof get==='function'?get():get);
 const ok=await copyText(t);
 b.classList.remove('done','fail');b.classList.add(ok?'done':'fail');
 clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('done','fail'),1700);
}
function classToken(){
 const c=classes[cur];if(!c)return '';
 return 'MTX:'+btoa(unescape(encodeURIComponent(JSON.stringify({n:c.name,c:c.code,ic:c.emoji,co:c.color,d:c.desc,e:data.events,t:data.tasks,s:data.sched,w:data.work,tp:data.topics,po:data.posts.map(x=>Object.assign({},x,{img:''})),m:data.members}))));
}
/* Estilo Google Classroom: tablón, trabajo de clase, personas, notas, permisos y chat a pantalla completa */
const isStaff=()=>role==='Administrador'||role==='Profesor';
const perm=()=>Object.assign({post:false,comment:true,chat:true},(classes[cur]||{}).perm||{});
function applyRole(){document.body.classList.toggle('staff',isStaff())}
let modalArg=null,workType='tarea',workEditId=null,wkTopic='';
const when=ts=>new Date(ts).toLocaleDateString('es-ES',{day:'numeric',month:'short'})+' · '+hm(ts);
const avOf=n=>mAv(data.members.find(m=>m.n===n)||{n});
const safeUrl=u=>/^https:\/\//i.test(u||'')?u:'';
const WI={tarea:'📝',material:'📎',pregunta:'❓'},WN={tarea:'Tarea',material:'Material',pregunta:'Pregunta'};
const STAFFR=['Administrador','Profesor'];
const students=()=>data.members.filter(m=>!STAFFR.includes(m.r));
const subOf=(w,n)=>(w.subs||{})[n]||null;
const workEv=()=>(data.work||[]).filter(w=>w.due&&visibleWork(w)).map(w=>({id:'w'+w.id,i:WI[w.type],t:w.title,s:WN[w.type]+(w.pts!=null?' · '+w.pts+' pts':''),d:w.due}));
/* --- Tablón --- */
function renderStream(){
 const el=$('stream'),c=classes[cur];if(!el)return;if(!c){el.innerHTML='';return}
 const _mu=iAmMuted(),canPost=!_mu&&(isStaff()||perm().post),canCom=!_mu&&(isStaff()||perm().comment),meet=safeUrl(c.meet);
 const posts=[...data.posts].sort((a,b)=>(settings.sortPosts==='recent'?0:(b.pin?1:0)-(a.pin?1:0))||b.ts-a.ts).filter(p=>match(p.t+' '+p.n));
 el.innerHTML=`<div class="stream-h"><h3>Tablón</h3>${meet?`<a class="meet-btn" href="${esc(meet)}" target="_blank" rel="noopener noreferrer">📹 Unirse a Meet</a>`:''}</div>`
 +pushBannerHTML()+(_mu?'<div class="mute-note">Un profesor te ha silenciado en esta clase: puedes verlo todo y entregar tareas, pero no publicar, comentar ni escribir en el chat.</div>':'')+(canPost?`<div class="post-box" onclick="modal('post')"><div class="pb-av">${avOf(user)}</div><span>Anuncia algo a tu clase…</span></div>`:'')
 +(posts.length?posts.map(p=>`<div class="pcard${p.pin?' pinned':''}"><div class="pc-h">${avOf(p.n)}<div class="pc-i"><b>${esc(p.n)}</b><small>${when(p.ts)}${p.pin?' <span class="pin-pill">Fijado</span>':''}</small></div>${(isStaff()||p.n===user)?`<button type="button" class="del" aria-label="Opciones" onclick="postMenu('${p.id}')">⋯</button>`:''}</div><div class="pc-t">${esc(p.t)}</div>${p.img?`<img class="pc-img" src="${p.img}" alt="" onclick="viewImg(this.src)">`:''}<div class="pc-cm">${(p.comments||[]).map(k=>`<div class="cm"><div class="cm-av">${avOf(k.n)}</div><div class="cm-b"><b>${esc(k.n)}</b> <small>${when(k.ts)}</small><div>${esc(k.t)}</div></div></div>`).join('')}${canCom?`<div class="cm-new"><input placeholder="Añadir comentario a la clase…" maxlength="300" onkeydown="if(event.key==='Enter'){addComment('${p.id}',this)}"><button type="button" aria-label="Enviar comentario" onclick="addComment('${p.id}',this.previousElementSibling)">➤</button></div>`:''}</div></div>`).join(''):`<div class="empty st-empty">${searchQ?'Sin resultados.':(canPost?'Aún no hay anuncios.<br><button type="button" class="add" onclick="modal(\'post\')">Publicar el primero</button>':'Aún no hay anuncios. Cuando tu profesor publique algo, aparecerá aquí.')}</div>`);
}
function addComment(id,inp){const t=inp.value.trim(),p=data.posts.find(x=>x.id===id);if(!t||!p)return;(p.comments=p.comments||[]).push({id:uid(),n:user,t,ts:Date.now()});saveState();renderStream()}
function postMenu(id){
 const p=data.posts.find(x=>x.id===id);if(!p)return;const it=[];
 if(isStaff())it.push({k:'act',label:p.pin?'Quitar de fijados':'Fijar arriba',icon:'star',fn:()=>{p.pin=!p.pin;saveState();renderStream()}});
 if(isStaff()||p.au===authUid||p.n===user)it.push({k:'act',label:'Editar',icon:'edit',fn:()=>{modalArg=id;modal('postedit')}});
 it.push({k:'act',label:'Copiar texto',icon:'copy',fn:()=>copyText(p.t).then(ok=>toast(ok?'Copiado':'No se pudo copiar'))},{k:'sep'},{k:'hold',label:'Eliminar anuncio',icon:'trash',fn:()=>{data.posts=data.posts.filter(x=>x.id!==id);saveState();renderStream();toast('Anuncio eliminado')}});
 openMenu(it);
}
/* --- Trabajo de clase --- */
function createMenu(){
 openMenu([{k:'act',label:'Tarea',icon:'pencil',fn:()=>newWork('tarea')},{k:'act',label:'Pregunta',icon:'eye',fn:()=>newWork('pregunta')},{k:'act',label:'Material',icon:'copy',fn:()=>newWork('material')},{k:'sep'},{k:'act',label:'Tema',icon:'tag',fn:()=>modal('topic')}]);
}
function newWork(t){workEditId=null;workType=t;workDraft={id:uid(),files:[],orig:[]};modal('work')}
function workForm(){return workForm0()+workExtraHTML()+rubricHTML()+'<div class="fl">Archivos adjuntos</div><div id="workFiles">'+fileChips(workDraft&&workDraft.files,true,'delWorkFile')+'</div>'+uploaderHTML('work')}
function workForm0(){
 const w=workEditId?data.work.find(x=>x.id===workEditId):null,t=workType;
 const tp=[{v:'',l:'Sin tema'},...(data.topics||[]).map(x=>({v:x,l:x}))];
 return '<input id="f1" placeholder="Título" maxlength="80" value="'+esc(w?w.title:'')+'"><textarea id="f6" rows="4" placeholder="Instrucciones (opcional)">'+esc(w?w.desc:'')+'</textarea><div class="fl">Tema</div>'+bsel('f2','Tema',tp,w?w.topic:'')
 +(t!=='material'?'<div class="fl">Fecha de entrega</div><input id="f3" type="date" value="'+esc(w?w.due:'')+'">':'')
 +(t==='tarea'?'<input id="f7" type="text" inputmode="decimal" autocomplete="off" placeholder="Puntos (opcional)" value="'+esc(w&&w.pts!=null?w.pts:'')+'">':'')
 +'<input id="f8" placeholder="Enlace https:// (opcional)" value="'+esc(w?w.link:'')+'">';
}
function setWkTopic(i){wkTopic=i<0?'':(data.topics[i]||'');renderWork()}
function stOf(w,n){
 if(w.type==='material')return '';
 const s=subOf(w,n);if(s&&s.grade!=null)return '<span class="wk-st ok">'+s.grade+(w.pts!=null?'/'+w.pts:'')+'</span>';
 if(s&&s.st==='tarde')return '<span class="wk-st late">Con retraso</span>';if(s&&s.st==='entregada')return '<span class="wk-st done">Entregada</span>';
 return w.due&&w.due<iso(new Date())?'<span class="wk-st late">Atrasada</span>':'<span class="wk-st">Pendiente</span>';
}
function renderWork(){
 const el=$('workList');if(!el)return;
 const tops=data.topics||[];
 $('wkChips').innerHTML=tops.length?['Todos',...tops].map((t,i)=>`<button type="button" class="chip${(i===0&&!wkTopic)||(i>0&&tops[i-1]===wkTopic)?' on':''}" onclick="setWkTopic(${i-1})">${esc(t)}</button>`).join(''):'';
 const doneBy=(w,n)=>{const x=subOf(w,n);return !!(x&&x.st!=='pendiente')};
 const list=data.work.filter(w=>visibleWork(w)&&(!wkTopic||w.topic===wkTopic)&&match(w.title+' '+(w.desc||''))&&(isStaff()||wkFilt==='todo'||(w.type!=='material'&&(wkFilt==='pend'?!doneBy(w,user):doneBy(w,user)))));
 let top='';
 if(isStaff()){const tc=data.work.filter(w=>w.type!=='material').map(w=>({w,n:students().filter(m=>{const x=subOf(w,m.n);return x&&x.st!=='pendiente'&&x.grade==null}).length})).filter(x=>x.n);
  const tot=tc.reduce((a,x)=>a+x.n,0);
  if(tot)top=`<div class="tocorrect"><div class="tc-h"><b>Pendiente de corregir</b><span class="tc-n">${tot}</span></div>${tc.map(x=>`<button type="button" class="tc-row" onclick="openWork('${x.w.id}')"><span class="tc-t">${esc(x.w.title)}</span><span class="tc-c">${x.n} ${x.n===1?'entrega sin nota':'entregas sin nota'}</span><span class="tc-go" aria-hidden="true">›</span></button>`).join('')}</div>`;
 }else{
  const cnt=k=>data.work.filter(w=>w.type!=='material'&&(k==='pend'?!doneBy(w,user):doneBy(w,user))).length;
  top=`<div class="seg wk-filt" aria-label="Filtrar trabajo"><button type="button" class="${wkFilt==='todo'?'on':''}" onclick="setWkFilt('todo')">Todo</button><button type="button" class="${wkFilt==='pend'?'on':''}" onclick="setWkFilt('pend')">Pendientes (${cnt('pend')})</button><button type="button" class="${wkFilt==='done'?'on':''}" onclick="setWkFilt('done')">Entregadas (${cnt('done')})</button></div>`;
 }
 const pend=isStaff()?0:data.work.filter(w=>visibleWork(w)&&w.type!=='material'&&!(subOf(w,user)&&subOf(w,user).st!=='pendiente')).length;
 $('workInfo').textContent=isStaff()?data.work.length+(data.work.length===1?' elemento':' elementos'):(pend?pend+(pend===1?' pendiente':' pendientes'):'Todo al día');
 const row=w=>{
  const meta=WN[w.type]+(w.due?' · Entrega: '+dueTxt(w):'')+(w.pts!=null?' · '+w.pts+' pts':'');
  let due='';if(w.due&&w.type!=='material'){const td=iso(new Date()),mine=isStaff()?null:subOf(w,user),done=mine&&mine.st!=='pendiente';
   if(done)due='<span class="due-b b-ok">Entregada</span>';else if(isPastDue(w))due='<span class="due-b b-late">'+(isStaff()?'Plazo cerrado':'Vencida')+'</span>';else{const r=relDay(w.due);if(r)due='<span class="due-b'+relClass(w.due)+'">'+r+'</span>'}}
  const rt=isStaff()?(w.type==='material'?'':'<span class="wk-st">'+students().filter(m=>assignedTo(w,m)&&(()=>{const s=subOf(w,m.n);return s&&s.st!=='pendiente'})()).length+'/'+students().filter(m=>assignedTo(w,m)).length+'</span>'):stOf(w,user);
  if(isStaff()){if(w.pubAt&&w.pubAt>Date.now())due+='<span class="due-b b-pronto">Programada · '+new Date(w.pubAt).toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</span>';if(w.assg&&w.assg.length)due+='<span class="due-b">Para '+w.assg.length+(w.assg.length===1?' alumno':' alumnos')+'</span>'}
  return `<div class="wk-item" onclick="openWork('${w.id}')"><div class="wk-ic">${WI[w.type]}</div><div class="wk-b"><b>${esc(w.title)}</b><small>${esc(meta)}${due}</small></div>${rt}</div>`;
 };
 const groups=['',...tops].map(t=>({t,l:list.filter(w=>(w.topic||'')===t)})).filter(g=>g.l.length);
 el.innerHTML=top+(groups.length?groups.map(g=>(g.t?`<div class="side-title wk-t">${esc(g.t)}</div>`:(groups.length>1?'<div class="side-title wk-t">SIN TEMA</div>':''))+g.l.sort((a,b)=>{if(!isStaff()){const da=!!(subOf(a,user)&&subOf(a,user).st!=='pendiente'),db=!!(subOf(b,user)&&subOf(b,user).st!=='pendiente');if(da!==db)return da?1:-1}return (a.due||'9')>(b.due||'9')?1:-1}).map(row).join('')).join(''):'<div class="empty">'+(searchQ?'Sin resultados.':(isStaff()?'Crea la primera tarea, pregunta o material con "+ Crear".':'Aún no hay trabajo en esta clase.'))+'</div>');
}
let wkFilt='todo';
function setWkFilt(k){wkFilt=k;renderWork()}
function openWork(id){modalArg=id;modal('workview')}
function workViewHTML(id){
 const w=data.work.find(x=>x.id===id);if(!w)return '<div class="empty">No encontrado.</div>';
 let h=`<div class="wv-meta">${WI[w.type]} ${WN[w.type]}${w.topic?' · '+esc(w.topic):''}${w.due?' · Entrega: '+dueTxt(w):''}${w.pts!=null?' · '+w.pts+' puntos':''}</div>`+(w.desc?`<div class="wv-d">${esc(w.desc)}</div>`:'')+(safeUrl(w.link)?`<a class="meet-btn" href="${esc(w.link)}" target="_blank" rel="noopener noreferrer">🔗 Abrir enlace</a>`:'')+(w.files&&w.files.length?'<div class="fl">Archivos</div>'+fileChips(w.files,false):'');
 if(isStaff()){
  if(w.type!=='material'){
   if(w.opts&&w.opts.length)h+=mcqResults(w);
   h+='<div class="fl">Entregas</div>'+(students().length?students().filter(m=>assignedTo(w,m)).map(m=>{
    const s=subOf(w,m.n),i=data.members.indexOf(m),done=s&&s.st!=='pendiente';
    return `<div class="sg-row"><div class="sg-n">${mAv(m)}<div><b>${esc(m.n)}</b><small>${s?(s.st==='tarde'?'Con retraso':done?'Entregada':'Pendiente'):'Pendiente'}${s&&s.comment?' · "'+esc(s.comment)+'"':''}</small>${s&&s.files&&s.files.length?fileChips(s.files,false):''}</div></div><div class="sg-in"><input class="sg-g" id="g_${i}" type="text" inputmode="decimal" autocomplete="off" placeholder="Nota${w.pts!=null?' /'+w.pts:''}" value="${s&&s.grade!=null?s.grade:''}"><input class="sg-f" id="f_${i}" placeholder="Comentario" maxlength="120" value="${esc(s?s.fb||'':'')}">${T7_OK&&w.rub&&w.rub.length?`<button type="button" class="mini-btn" onclick="closeModal();gradeCell('${w.id}',${i})">Rúbrica</button>`:''}<button type="button" class="mini-btn" onclick="toggleSub('${w.id}',${i})">${done?'↩ Anular':'✓ Entregada'}</button></div></div>`;
   }).join('')+(CR2_OK?`<div class="gr-btns"><button type="button" class="gl-btn soft" onclick="saveGrades('${w.id}',false)">Guardar borrador</button><button type="button" class="gl-btn" onclick="saveGrades('${w.id}',true)">Devolver notas</button></div>`:`<button type="button" class="gl-btn" onclick="saveGrades('${w.id}',true)">Guardar calificaciones</button>`):'<div class="empty">Aún no hay alumnos.</div>');
  }
  h+=`<div class="wv-act"><button type="button" class="secondary" onclick="editWork('${w.id}')">${svgI('pencil')}Editar</button><button type="button" class="secondary" onclick="dupWork('${w.id}')">Reutilizar</button><button type="button" class="secondary danger" onclick="delWork('${w.id}')">Eliminar</button></div>`;
 }else if(w.type!=='material'){
  const s=subOf(w,user),done=s&&s.st!=='pendiente',td=iso(new Date());
  if(done)h+=`<div class="wv-state ok"><b>${s.st==='tarde'?'Entregada con retraso':'Entregada'}</b>${s.ts?'<span>'+new Date(s.ts).toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+'</span>':''}</div>`;
  else if(isPastDue(w))h+=`<div class="wv-state late"><b>El plazo terminó el ${dueTxt(w)}</b><span>Si entregas ahora, quedará marcada como entrega con retraso.</span></div>`;
  else if(w.due){const r=relDay(w.due);h+=`<div class="wv-state"><b>Pendiente</b><span>Entrega ${r?r.toLowerCase():'el '+fmt(w.due)}${w.dueTime?' a las '+String(w.dueTime).slice(0,5):''}</span></div>`}
  if(s&&s.grade!=null&&s.ret!==false&&w.rub&&w.rub.length&&s.rs&&Object.keys(s.rs).length)h+=rubricView(w,s);
  if(s&&s.grade!=null&&s.ret!==false)h+=`<div class="wv-grade"><b>${s.grade}${w.pts!=null?' / '+w.pts:''}</b><span>${esc(s.fb||'Calificada')}</span></div>`;
  h+='<div class="fl">Tu trabajo</div>'+(w.type==='pregunta'&&w.opts&&w.opts.length?'<div class="fl">Elige una respuesta</div><div class="mcq">'+w.opts.map((o,i)=>'<label class="mcq-o"><input type="radio" name="mcq" value="'+i+'" '+(s&&s.answer===o?'checked':'')+(s&&s.grade!=null?' disabled':'')+'> <span>'+esc(o)+'</span></label>').join('')+'</div>':'')+(w.type==='pregunta'&&!(w.opts&&w.opts.length)?'<textarea id="sbA" rows="3" placeholder="Tu respuesta">'+esc(s?s.answer||'':'')+'</textarea>':'')+'<input id="sbC" placeholder="Comentario privado para el profesor (opcional)" maxlength="200" value="'+esc(s?s.comment||'':'')+'">'
  +'<div class="fl">Tus archivos</div><div id="subFiles">'+fileChips(s&&s.files,!(s&&s.grade!=null),'delSubFile')+'</div>'+((s&&s.grade!=null)?'':uploaderHTML('sub'))
  +`<button type="button" class="gl-btn" onclick="submitWork('${w.id}')">${s&&s.st!=='pendiente'?'Actualizar entrega':'Entregar'}</button>`+(s&&s.st!=='pendiente'?`<button type="button" class="gl-btn danger" onclick="unsubmitWork('${w.id}')">Anular entrega</button>`:'')+privBox(w.id,user,'pcIn');
 }
 return h;
}
function submitWork(id){
 const w=data.work.find(x=>x.id===id);if(!w)return;
 const _r=document.querySelector('input[name=mcq]:checked');if(w.opts&&w.opts.length&&!_r){toastErr('Elige una respuesta.');return}
 const _ans=w.opts&&w.opts.length?w.opts[+_r.value]:($('sbA')?$('sbA').value.trim():'');
 if(!w.subs)w.subs={};const late=isPastDue(w),old=w.subs[user]||{};
 w.subs[user]=Object.assign(old,{st:late?'tarde':'entregada',ts:Date.now(),comment:$('sbC').value.trim(),answer:_ans});
 saveState();renderAll();$('modalFields').innerHTML=workViewHTML(id);toast(late?'Entregada con retraso':'¡Entregada!');if(!late)confetti();
}
async function unsubmitWork(id){const w=data.work.find(x=>x.id===id);if(!w||!w.subs)return;if(!await ask({icon:'↺',title:'¿Anular la entrega?',text:'Tu trabajo volverá a quedar pendiente. Podrás entregarlo otra vez.',ok:'Anular entrega',danger:true}))return;if(w.subs[user])w.subs[user].st='pendiente';saveState();renderAll();$('modalFields').innerHTML=workViewHTML(id);toast('Entrega anulada')}
function toggleSub(id,i){
 const w=data.work.find(x=>x.id===id),m=data.members[i];if(!w||!m)return;
 if(!w.subs)w.subs={};const s=w.subs[m.n]||(w.subs[m.n]={st:'pendiente'});
 s.st=s.st==='pendiente'?'entregada':'pendiente';saveState();renderAll();$('modalFields').innerHTML=workViewHTML(id);
}

/* ===================== ARCHIVOS ADJUNTOS (tareas del profesor y entregas del alumno) ===================== */
let FILES_OK=null,workDraft=null;
async function checkFilesCol(){try{const {error}=await sb.from('work').select('files').limit(1);FILES_OK=!error}catch(e){FILES_OK=false}}
const FMAX=10*1024*1024;
const SAFE_MIME=new Set(['image/jpeg','image/png','image/webp','image/gif','image/heic','image/heif','audio/mp4','audio/webm','audio/mpeg','audio/ogg','audio/aac','video/mp4','video/webm','video/quicktime','application/pdf','text/plain','application/zip','application/x-zip-compressed','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.oasis.opendocument.text','application/vnd.oasis.opendocument.spreadsheet','application/vnd.oasis.opendocument.presentation']);
const BLOCK_EXT=/\.(exe|msi|bat|cmd|com|scr|pif|ps1|vbs|vbe|js|mjs|jse|wsf|wsh|jar|apk|aab|ipa|app|dmg|pkg|deb|rpm|sh|bash|run|bin|html?|xhtml|svgz?|php|hta|lnk|reg|dll|sys|iso|img)$/i;
const ctypeOf=f=>SAFE_MIME.has(f.type)?f.type:'application/octet-stream';
const fsize=n=>n<1024?n+' B':n<1048576?Math.round(n/1024)+' KB':(n/1048576).toFixed(1).replace('.',',')+' MB';
const safeName=n=>(n||'archivo').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9._-]+/g,'_').slice(-60);
function fileChips(list,canDel,delFn){if(!list||!list.length)return '';return '<div class="fchips">'+list.map((f,i)=>{const u=urlOf(CF,f.p);return `<span class="fchip"><a ${u?`href="${esc(u)}" target="_blank" rel="noopener"`:`href="#" onclick="openFileP(event,'${esc(f.p)}')"`}>${svgI('clip')}<span class="fn">${esc(f.n)}</span><small>${fsize(f.s||0)}</small></a>${canDel?`<button type="button" class="fx" aria-label="Quitar ${esc(f.n)}" onclick="${delFn}(${i})">×</button>`:''}</span>`}).join('')+'</div>'}
function openFileP(ev,p){ev.preventDefault();const win=window.open('','_blank');sb.storage.from(CF).createSignedUrl(p,3600).then(({data,error})=>{if(error||!data){if(win)win.close();toastErr('No se pudo abrir el archivo');return}urlCache.set(CF+'/'+p,{url:data.signedUrl,exp:Date.now()+3600e3});if(win)win.location=data.signedUrl;else location.href=data.signedUrl}).catch(()=>{if(win)win.close();toastErr('No se pudo abrir el archivo')})}
function uploaderHTML(kind){
 if(FILES_OK===false)return '<div class="gl-sub">Los archivos aún no están activados: el administrador debe ejecutar el SQL 08 en Supabase.</div>';
 return `<label class="fup">${svgI('clip')}<span>Adjuntar archivo</span><input type="file" multiple onchange="pickFiles(this,'${kind}')"></label><div class="fprog" id="fprog_${kind}" aria-live="polite"></div><div class="gl-sub">Hasta 10 MB por archivo. Casi cualquier formato: documentos, Pages, Keynote, Numbers, PDF, fotos, audio, vídeo, comprimidos… Por seguridad no se admiten programas ni páginas web.</div>`;
}
function uploadErr(e){const m=((e&&(e.message||e.error))||'').toLowerCase();if(m.includes('mime')||m.includes('type'))return 'Tipo de archivo no permitido';if(m.includes('size')||m.includes('large')||m.includes('exceed'))return 'Pesa demasiado (máx. 10 MB)';if(m.includes('policy')||m.includes('row-level')||m.includes('unauthorized'))return 'Sin permiso para subirlo';return 'No se pudo subir. Inténtalo otra vez'}
async function pickFiles(inp,kind){
 const files=[...inp.files];inp.value='';if(!files.length)return;
 if(!sb||!navigator.onLine){toastErr('Necesitas conexión para subir archivos');return}
 const c=classes[cur];if(!c)return;
 const w=kind==='sub'?data.work.find(x=>x.id===modalArg):null,wid=kind==='sub'?(w&&w.id):(workDraft&&workDraft.id);if(!wid)return;
 const prog=$('fprog_'+kind);
 for(const f of files){
  if(f.size>FMAX){toastErr(f.name+': pesa más de 10 MB');continue}
  if(BLOCK_EXT.test(f.name)){toastErr(f.name+': por seguridad no se admiten programas ni páginas web');continue}
  if(!f.size){toastErr(f.name+': el archivo está vacío');continue}
  const row=document.createElement('div');row.className='fp-row';row.innerHTML=`<span class="spin" aria-hidden="true"></span><span class="fn">${esc(f.name)}</span><small>Subiendo…</small>`;if(prog)prog.appendChild(row);
  const path=(kind==='sub'?`${c.id}/subs/${wid}/${authUid}/`:`${c.id}/work/${wid}/`)+uid().slice(0,8)+'-'+safeName(f.name);
  try{
   const {error}=await sb.storage.from(CF).upload(path,f,{contentType:ctypeOf(f),upsert:false});if(error)throw error;
   try{await signUrls(CF,[path])}catch(e){}
   const meta={p:path,n:String(f.name).slice(0,120),s:f.size,t:f.type||''};
   if(kind==='sub'){if(!w.subs)w.subs={};const sb2=w.subs[user]||(w.subs[user]={st:'pendiente'});(sb2.files=sb2.files||[]).push(meta);saveState()}
   else workDraft.files.push(meta);
   row.remove();
  }catch(e){row.classList.add('err');const sp=row.querySelector('.spin');if(sp)sp.remove();row.querySelector('small').textContent=uploadErr(e)}
 }
 refreshFiles(kind);
}
function refreshFiles(kind){
 if(kind==='sub'){const box=$('subFiles');if(box){const w=data.work.find(x=>x.id===modalArg),x=w&&subOf(w,user);box.innerHTML=fileChips(x&&x.files,true,'delSubFile')}}
 else{const box=$('workFiles');if(box)box.innerHTML=fileChips(workDraft&&workDraft.files,true,'delWorkFile')}
}
async function delSubFile(i){const w=data.work.find(x=>x.id===modalArg),x=w&&subOf(w,user);if(!x||!x.files||!x.files[i])return;const f=x.files.splice(i,1)[0];saveState();refreshFiles('sub');try{await sb.storage.from(CF).remove([f.p])}catch(e){}}
function delWorkFile(i){if(!workDraft)return;workDraft.files.splice(i,1);refreshFiles('work')}


/* ===================== CLASSROOM (SQL 09): hora límite, opción múltiple, comentarios privados, programar, asignar, devolver ===================== */
let CR2_OK=null;
async function checkCr2(){try{const [a,b]=await Promise.all([sb.from('work').select('due_time,options,publish_at,assignees').limit(1),sb.from('submissions').select('thread,returned').limit(1)]);CR2_OK=!a.error&&!b.error}catch(e){CR2_OK=false}}
const dueEnd=w=>w&&w.due?new Date(w.due+'T'+String(w.dueTime||'23:59').slice(0,5)+':59'):null;
const isPastDue=w=>{const e=dueEnd(w);return !!e&&Date.now()>e.getTime()};
const dueTxt=w=>w.due?fmt(w.due)+(w.dueTime?' · '+String(w.dueTime).slice(0,5):''):'';
const assignedTo=(w,m)=>!(w.assg&&w.assg.length)||w.assg.includes(m&&m.u);
const visibleWork=w=>isStaff()||((!w.pubAt||w.pubAt<=Date.now())&&assignedTo(w,{u:authUid}));
function workExtraHTML(){
 if(CR2_OK===false)return '<div class="gl-sub">Hora límite, opción múltiple, programar y asignar a alumnos concretos se activan al ejecutar el SQL 09 en Supabase.</div>';
 const w=workEditId?data.work.find(x=>x.id===workEditId):null,t=workType,as=(w&&w.assg)||[];
 let h='';
 if(t!=='material')h+='<div class="fl">Hora límite (opcional)</div><input id="f9" type="time" value="'+esc(w&&w.dueTime||'')+'">';
 if(t==='pregunta')h+='<div class="fl">Opción múltiple (opcional, una respuesta por línea)</div><textarea id="f10" rows="4" placeholder="Opción A&#10;Opción B&#10;Opción C">'+esc(w&&w.opts?w.opts.join('\n'):'')+'</textarea>';
 h+='<div class="fl">Asignar a</div><div class="asg"><label class="asg-all"><input type="checkbox" id="asgAll" '+(as.length?'':'checked')+' onchange="document.querySelectorAll(\'.asg-one input\').forEach(x=>x.disabled=this.checked)"> Toda la clase</label>'+students().map(m=>`<label class="asg-one"><input type="checkbox" value="${esc(m.u)}" ${as.includes(m.u)?'checked':''} ${as.length?'':'disabled'}> ${esc(m.n)}</label>`).join('')+'</div>';
 const pv=w&&w.pubAt&&w.pubAt>Date.now()?new Date(w.pubAt-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,16):'';
 h+='<div class="fl">Publicar</div><input id="f11" type="datetime-local" value="'+pv+'" aria-label="Programar publicación"><div class="gl-sub">Vacío = se publica ahora. Con fecha y hora, los alumnos no la verán hasta entonces.</div>';
 return h;
}
function threadHTML(th){return (th&&th.length)?'<div class="thr">'+th.map(x=>`<div class="thr-m${x.a===authUid?' me':''}"><b>${esc(x.n)}</b><span>${esc(x.t)}</span><small>${new Date(x.ts).toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</small></div>`).join('')+'</div>':'<div class="gl-sub">Solo lo veis el alumno y los profesores.</div>'}
function privBox(wid,who,id){return CR2_OK?'<div class="fl">Comentarios privados</div>'+threadHTML(((data.work.find(x=>x.id===wid)||{}).subs||{})[who]&&data.work.find(x=>x.id===wid).subs[who].thread)+`<div class="pc-new"><input id="${id}" maxlength="300" placeholder="${who===user?'Escribe al profesor…':'Escribe a '+esc(who)+'…'}" onkeydown="if(event.key==='Enter'){event.preventDefault();addPriv('${wid}','${esc(who).replace(/'/g,'')}','${id}')}"><button type="button" class="mini-btn" onclick="addPriv('${wid}','${esc(who).replace(/'/g,'')}','${id}')">Enviar</button></div>`:''}
function addPriv(wid,who,inpId){const inp=$(inpId),t=inp&&inp.value.trim();if(!t)return;const w=data.work.find(x=>x.id===wid);if(!w)return;if(who!==user&&!isStaff())return;if(!w.subs)w.subs={};const s=w.subs[who]||(w.subs[who]={st:'pendiente'});(s.thread=s.thread||[]).push({a:authUid,n:user,t:t.slice(0,300),ts:Date.now()});saveState();$('modalFields').innerHTML=mType==='grade1'?grade1HTML():workViewHTML(wid);toast('Comentario enviado','ok')}
function mcqResults(w){const st=students().filter(m=>assignedTo(w,m)),c=w.opts.map(o=>st.filter(m=>{const s=subOf(w,m.n);return s&&s.st!=='pendiente'&&s.answer===o}).length),tot=c.reduce((a,b)=>a+b,0);return '<div class="fl">Respuestas ('+tot+'/'+st.length+')</div><div class="mcq-res">'+w.opts.map((o,i)=>{const p=tot?Math.round(c[i]/tot*100):0;return `<div class="mr-row"><span class="mr-t">${esc(o)}</span><span class="mr-bar"><i style="width:${p}%"></i></span><b>${c[i]}</b></div>`}).join('')+'</div>'}

/* ===================== TANDA 7: copiar clase, silenciar, rúbricas, estado de envío del chat ===================== */
let T7_OK=null;
async function checkT7(){try{const [a,b,c]=await Promise.all([sb.from('members').select('muted').limit(1),sb.from('work').select('rubric').limit(1),sb.from('submissions').select('rscores').limit(1)]);T7_OK=!a.error&&!b.error&&!c.error}catch(e){T7_OK=false}}
const iAmMuted=()=>!!(data&&data.members&&(data.members.find(x=>x.u===authUid)||{}).mu);
async function toggleMute(i){const m=data.members[i];if(!m||!isStaff()||STAFFR.includes(m.r))return;if(!T7_OK){toastErr('Para silenciar hay que ejecutar el SQL 10 en Supabase');return}
 if(!m.mu&&!await ask({icon:'🔒',title:'¿Silenciar a '+m.n+'?',text:'No podrá publicar, comentar ni escribir en el chat de esta clase hasta que se lo quites. Podrá seguir viendo todo y entregando tareas.',ok:'Silenciar'}))return;
 m.mu=!m.mu;saveState();renderAll();toast(m.mu?m.n+' está silenciado':m.n+' ya puede volver a participar','ok')}
async function copyClass(){
 const c=classes[cur];if(!c||!isStaff())return;
 if(!await ask({icon:'📦',title:'¿Copiar esta clase?',text:'Se crea una clase nueva con sus temas, el trabajo (sin entregas ni fechas) y el horario. No se copian alumnos, anuncios, fotos ni chat.',ok:'Copiar clase'}))return;
 const before=new Set(classes.map(x=>x.id)),src=JSON.parse(JSON.stringify(c.data)),desc=c.desc||'';
 closeModal();await cloudCreate({name:(c.name+' (copia)').slice(0,60),emoji:c.emoji||'📚',color:c.color||'#008cff',desc,icon:'',banner:''});
 const nc=classes.find(x=>!before.has(x.id));if(!nc){toastErr('No se pudo copiar la clase');return}
 toast('Copiando el trabajo…');
 const work=[];for(const w of (src.work||[])){const id=uid(),files=[];for(const f of (w.files||[])){const p=nc.id+'/work/'+id+'/'+String(f.p).split('/').pop();try{const {error}=await sb.storage.from(CF).copy(f.p,p);if(!error)files.push(Object.assign({},f,{p}))}catch(e){}}
  work.push(Object.assign({},w,{id,subs:{},due:'',dueTime:'',pubAt:0,assg:[],ts:Date.now(),files}))}
 nc.data.topics=[...(src.topics||[])];nc.data.sched=(src.sched||[]).map(x=>Object.assign({},x,{id:uid()}));nc.data.work=work;
 saveState();renderAll();toast('Clase copiada: '+work.length+' elementos de trabajo','ok');
}
function rubricHTML(){if(workType!=='tarea')return '';if(T7_OK===false)return '';const w=workEditId?data.work.find(x=>x.id===workEditId):null,r=(w&&w.rub)||[];
 return '<div class="fl">Rúbrica (opcional): un criterio por línea, «Criterio | puntos»</div><textarea id="f12" rows="4" placeholder="Presentación | 2&#10;Contenido | 5&#10;Ortografía | 3">'+esc(r.map(x=>x.c+' | '+x.p).join('\n'))+'</textarea><div class="gl-sub">Si pones rúbrica, los puntos de la tarea serán la suma de los criterios y calificarás criterio a criterio.</div>'}
function parseRubric(t){const out=[];for(const line of String(t||'').split('\n')){const l=line.trim();if(!l)continue;const m=/^(.*?)[|:;]\s*([0-9]+(?:[.,][0-9]+)?)\s*$/.exec(l);if(!m||!m[1].trim())return {err:'Revisa la línea «'+l.slice(0,30)+'»: usa «Criterio | puntos».'};const p=+m[2].replace(',','.');if(!(p>0))return {err:'Los puntos de cada criterio deben ser mayores que 0.'};out.push({c:m[1].trim().slice(0,60),p})}return {list:out.slice(0,12)}}
function rubricInputs(w,s){const rs=(s&&s.rs)||{};return '<div class="fl">Rúbrica</div><div class="rub">'+w.rub.map((r,i)=>`<label class="rub-r"><span>${esc(r.c)}</span><input id="rb_${i}" type="text" inputmode="decimal" autocomplete="off" value="${rs[i]!=null?rs[i]:''}" oninput="rubSum()" aria-label="${esc(r.c)}, de 0 a ${r.p}"><small>/${r.p}</small></label>`).join('')+'</div>'}
function rubSum(){const w=data.work.find(x=>x.id===(gradeArg&&gradeArg.wid));if(!w)return;let t=0,any=false;w.rub.forEach((r,i)=>{const v=($('rb_'+i)||{}).value;if(v&&v.trim()!==''){any=true;t+=+v.replace(',','.')||0}});const g=$('gr1');if(g)g.value=any?String(Math.round(t*100)/100).replace('.',','):''}
function rubricView(w,s){return '<div class="rub-view">'+w.rub.map((r,i)=>`<div><span>${esc(r.c)}</span><b>${s.rs[i]!=null?fmtN(+s.rs[i]):'–'}/${r.p}</b></div>`).join('')+'</div>'}
function paintTicks(){const c=classes[cur];if(!c||typeof snap==='undefined')return;const sm=(snap[c.id]&&snap[c.id].messages)||{};document.querySelectorAll('#messages .msg.me[data-id]').forEach(el=>{const t=el.querySelector('.wa-t');if(!t)return;let k=t.querySelector('.wa-tick');if(!k){k=document.createElement('span');k.className='wa-tick';t.appendChild(k)}const ok=!!sm[el.dataset.id];if(k.dataset.ok!==String(ok)){k.dataset.ok=String(ok);k.textContent=ok?' ✓':' 🕓';k.setAttribute('aria-label',ok?'Enviado':'Enviando…');k.title=ok?'Enviado':(navigator.onLine?'Enviando…':'Se enviará al recuperar la conexión')}})}
setInterval(()=>{if(document.body.classList.contains('chat-open'))paintTicks()},1500);

/* ===================== FUNCIONES TIPO CLASSROOM ===================== */
/* Enlace de invitación: unuvia.es/?unirse=CODIGO */
const inviteUrl=()=>{const c=classes[cur];return c?'https://unuvia.es/?unirse='+encodeURIComponent(c.code):''};
function shareInvite(){const c=classes[cur];if(!c)return;const u=inviteUrl(),d={title:'Únete a '+c.name+' en Unuvia',text:'Únete a mi clase «'+c.name+'» en Unuvia:',url:u};if(navigator.share)navigator.share(d).catch(()=>{});else copyText(u).then(ok=>toast(ok?'Enlace copiado':'No se pudo copiar',ok?'ok':'err'))}
(function(){try{const q=new URLSearchParams(location.search).get('unirse');if(q)sessionStorage.setItem('unuvia_join',q.trim().toUpperCase())}catch(e){}})();
async function joinFromLink(){let jc='';try{jc=sessionStorage.getItem('unuvia_join')||'';sessionStorage.removeItem('unuvia_join')}catch(e){}if(!jc)return;
 const have=classes.findIndex(c=>c.code===jc);if(have>=0){setCur(have);renderAll();toast('Ya estás en esta clase');return}
 if(await ask({icon:'👋',title:'¿Unirte a la clase?',text:'Te han invitado con el código '+jc+'.',ok:'Unirme'}))await cloudJoin(jc)}
/* Reutilizar: duplicar una tarea, pregunta o material */
function dupWork(id){const w=data.work.find(x=>x.id===id);if(!w||!isStaff())return;const n=JSON.parse(JSON.stringify(w));n.id=uid();n.title=(w.title+' (copia)').slice(0,80);n.subs={};n.ts=Date.now();data.work.push(n);saveState();renderAll();closeModal();toast('Copia creada: edítala si quieres cambiar algo','ok');setTimeout(()=>editWork(n.id),150)}
/* Pendientes de TODAS mis clases (alumno) y por corregir (profesor) */
function todoHTML(){
 const td=iso(new Date()),me=[],rev=[];
 classes.forEach((c,ci)=>{if(c.archived)return;const st=STAFFR.includes(c.role),works=(c.data.work||[]).filter(w=>w.type!=='material');
  if(st){works.forEach(w=>{const n=Object.values(w.subs||{}).filter(x=>x&&x.st!=='pendiente'&&x.grade==null).length;if(n)rev.push({ci,c,w,n})})}
  else works.forEach(w=>{if(w.pubAt&&w.pubAt>Date.now())return;if(w.assg&&w.assg.length&&!w.assg.includes(authUid))return;const x=(w.subs||{})[user];if(!(x&&x.st!=='pendiente'))me.push({ci,c,w,late:isPastDue(w)})})});
 me.sort((a,b)=>(a.w.due||'9999').localeCompare(b.w.due||'9999'));
 const row=(o,sub)=>`<button type="button" class="todo-row" onclick="goTodo(${o.ci},'${o.w.id}')"><span class="todo-c">${esc(o.c.emoji||'📚')}</span><span class="todo-t"><b>${esc(o.w.title)}</b><small>${esc(o.c.name)} · ${sub}</small></span><span class="tc-go" aria-hidden="true">›</span></button>`;
 let h='';
 if(me.length)h+='<div class="fl">Por entregar</div>'+me.map(o=>row(o,o.w.due?(o.late?'<span class="due-b b-late">Vencida · '+fmt(o.w.due)+'</span>':(relDay(o.w.due)?'<span class="due-b'+relClass(o.w.due)+'">'+relDay(o.w.due)+'</span>':'Entrega '+fmt(o.w.due))):'Sin fecha')).join('');
 if(rev.length)h+='<div class="fl">Por corregir</div>'+rev.map(o=>row(o,o.n+(o.n===1?' entrega sin nota':' entregas sin nota'))).join('');
 return h||'<div class="empty">¡Todo al día! No tienes nada pendiente en ninguna clase.</div>';
}
function goTodo(ci,wid){closeModal();setCur(ci);renderAll();goTab('Trabajo');setTimeout(()=>openWork(wid),120)}

/* Calificar una sola entrega desde la tabla de Calificaciones */
let gradeArg=null;
function gradeCell(wid,i){if(!isStaff())return;const w=data.work.find(x=>x.id===wid),m=data.members[i];if(!w||!m)return;gradeArg={wid,i};modal('grade1');setTimeout(()=>$('gr1')?.focus(),60)}
function grade1HTML(){
 if(!gradeArg)return '';const w=data.work.find(x=>x.id===gradeArg.wid),m=data.members[gradeArg.i];if(!w||!m)return '<div class="empty">No encontrado.</div>';
 const s=subOf(w,m.n),st=!s||s.st==='pendiente'?'Pendiente':s.st==='tarde'?'Entregada con retraso':'Entregada';
 return `<div class="g1-who">${mAv(m)}<div><b>${esc(m.n)}</b><small>${esc(w.title)} · ${st}${s&&s.ts&&s.st!=='pendiente'?' · '+new Date(s.ts).toLocaleDateString('es-ES',{day:'numeric',month:'short'}):''}</small></div></div>`
  +(s&&s.answer?`<div class="fl">Respuesta</div><div class="wv-d">${esc(s.answer)}</div>`:'')+(s&&s.comment?`<div class="fl">Comentario del alumno</div><div class="wv-d">${esc(s.comment)}</div>`:'')+(s&&s.files&&s.files.length?'<div class="fl">Archivos entregados</div>'+fileChips(s.files,false):'')
  +(T7_OK&&w.rub&&w.rub.length?rubricInputs(w,s):'')+`<div class="fl">Nota${w.pts!=null?' (de 0 a '+w.pts+')':''}</div><input id="gr1" type="text" inputmode="decimal" autocomplete="off" ${T7_OK&&w.rub&&w.rub.length?'readonly':''} value="${s&&s.grade!=null?s.grade:''}" placeholder="Sin nota">`
  +`<div class="fl">Comentario para ${esc(m.n)}</div><input id="gr1f" maxlength="120" value="${esc(s&&s.fb||'')}" placeholder="Opcional">`+privBox(w.id,m.n,'pcIn2');
}
function saveGrades(id,ret){
 const w=data.work.find(x=>x.id===id);if(!w)return;if(!w.subs)w.subs={};
const bad=[];data.members.forEach((m,i)=>{const g=$('g_'+i);if(!g)return;g.classList.remove('bad');const v=g.value.trim();if(v==='')return;const n=+v.replace(',','.');if(!isFinite(n)||n<0||(w.pts!=null&&n>w.pts)){g.classList.add('bad');bad.push(m.n)}});
 if(bad.length){toastErr('Revisa la nota de '+bad.join(', ')+(w.pts!=null?': debe estar entre 0 y '+w.pts+'.':': debe ser un número de 0 en adelante.'));return}
 data.members.forEach((m,i)=>{
  const g=$('g_'+i),f=$('f_'+i);if(!g)return;
  const s=w.subs[m.n]||(w.subs[m.n]={st:'pendiente'});
  const _pg=s.grade;s.grade=g.value.trim()===''?null:+g.value.trim().replace(',','.');s.fb=f.value.trim();if(CR2_OK){if(ret)s.ret=true;else if(s.grade!==_pg)s.ret=false}
  if(s.grade!=null&&s.st==='pendiente')s.st='entregada';
 });
 saveState();renderAll();$('modalFields').innerHTML=workViewHTML(id);toast(ret?'Notas devueltas a los alumnos':(CR2_OK?'Guardado como borrador: los alumnos aún no lo ven':'Calificaciones guardadas'),'ok');if(ret||!CR2_OK)confetti();
}
function editWork(id){const w=data.work.find(x=>x.id===id);if(!w)return;workEditId=id;workType=w.type;workDraft={id,files:[...(w.files||[])],orig:(w.files||[]).map(f=>f.p)};modal('work')}
async function delWork(id){if(!await ask({icon:'🗑️',title:'¿Eliminar este elemento?',text:'Se borrarán también todas sus entregas.',ok:'Eliminar',danger:true}))return;data.work=data.work.filter(x=>x.id!==id);saveState();closeModal();renderAll()}
/* --- Personas --- */
function renderPeople(){
 const el=$('peopleBody');if(!el||!classes[cur])return;
 const all=data.members.map((m,i)=>({m,i})).filter(o=>match(o.m.n)),st=all.filter(o=>STAFFR.includes(o.m.r)),sd=all.filter(o=>!STAFFR.includes(o.m.r));
 $('peopleInfo').textContent=data.members.length+(data.members.length===1?' persona':' personas');
 const row=o=>`<div class="pp-row" onclick="showProfile(${o.i})">${mAv(o.m)}<div class="pp-b"><b>${esc(o.m.n)}</b><small>${o.m.mu?'<span class="rbadge r-mute">Silenciado</span> ':''}${rbadge(o.m.r)}${o.m.b?' · '+esc(o.m.b):''}</small></div>${isStaff()&&o.m.n!==user?`<button type="button" class="del" aria-label="Opciones" onclick="event.stopPropagation();memberMenu(${o.i})">⋯</button>`:''}</div>`;
 const sec=(t,l)=>`<div class="pp-sec"><h3>${t}</h3><span>${l.length}</span></div>`+(l.length?l.map(row).join(''):'<div class="empty">Nadie por aquí.</div>');
 el.innerHTML=`<div class="cp-row pp-code"><span>Código de clase · <b>${esc(classes[cur].code)}</b></span>${CP('classes[cur].code','Copiar código')}</div>`+sec('Profesores',st)+sec('Alumnos',sd);
}
/* --- Calificaciones --- */
function stBadge(w,s){const td=iso(new Date());if(s&&s.grade!=null&&(isStaff()||s.ret!==false))return '<span class="due-b b-ok">Calificada</span> ';if(s&&s.st==='tarde')return '<span class="due-b b-pronto">Con retraso</span> ';if(s&&s.st!=='pendiente')return '<span class="due-b">Entregada · sin nota</span> ';if(isPastDue(w))return '<span class="due-b b-late">Vencida</span> ';return '<span class="due-b">Pendiente</span> '}
const fmtN=n=>Math.round(n*10)/10===Math.round(n)?String(Math.round(n)):(Math.round(n*10)/10).toString().replace('.',',');
function classPct(works){const l=students().map(m=>pctOf(works,m.n)).filter(x=>x!=null);return l.length?Math.round(l.reduce((a,b)=>a+b,0)/l.length):null}
function workAvg(w){const g=students().map(m=>subOf(w,m.n)).filter(x=>x&&x.grade!=null).map(x=>x.grade);return {avg:g.length?g.reduce((a,b)=>a+b,0)/g.length:null,n:g.length}}
function studentSummary(works){
 const td=iso(new Date()),mine=works.map(w=>({w,s:subOf(w,user)})),done=mine.filter(x=>x.s&&x.s.st!=='pendiente').length,late=mine.filter(x=>x.s&&x.s.st==='tarde').length,over=mine.filter(x=>!(x.s&&x.s.st!=='pendiente')&&x.w.due&&x.w.due<td).length,pc=pctOf(works,user);
 const gr=mine.filter(x=>x.s&&x.s.grade!=null&&x.s.ret!==false&&x.w.pts).sort((a,b)=>(a.w.due||'').localeCompare(b.w.due||'')||(a.w.ts||0)-(b.w.ts||0));
 const bars=gr.length?`<div class="gs-evo" role="img" aria-label="Evolución de tus notas"><div class="gs-bars">${gr.map(x=>{const p=Math.max(4,Math.round(x.s.grade/x.w.pts*100));return `<div class="gs-bar" title="${esc(x.w.title)}: ${fmtN(x.s.grade)}/${x.w.pts}"><span style="height:${p}%" class="${p>=50?'ok':'low'}"></span><small>${esc(x.w.title.slice(0,8))}</small></div>`}).join('')}</div></div>`:'';
 return `<div class="gsum"><div class="gs-main"><div class="gs-pc"><b>${pc==null?'—':pc+'%'}</b><small>${pc==null?'Sin notas todavía':'Tu media'}</small></div><div class="gs-stats"><span><b>${done}/${works.length}</b> entregadas</span><span class="${over?'warn':''}"><b>${over}</b> vencidas</span><span><b>${late}</b> con retraso</span></div></div>${bars}</div>`;
}
function pctOf(works,n){let g=0,p=0;works.forEach(w=>{const s=subOf(w,n);if(s&&s.grade!=null&&w.pts&&(isStaff()||s.ret!==false)){g+=s.grade;p+=w.pts}});return p?Math.round(g/p*100):null}
function renderGrades(){
 const el=$('gradeBody');if(!el)return;
 const works=data.work.filter(w=>w.type!=='material'&&visibleWork(w)),stu=students();
 if(!works.length){el.innerHTML='<div class="empty">Aún no hay tareas calificables.</div>';$('gradeInfo').textContent='';$('gradeAct').innerHTML='';return}
 if(isStaff()){
  $('gradeInfo').textContent=works.length+' trabajos · '+stu.length+' alumnos'+(classPct(works)!=null?' · media de la clase '+classPct(works)+'%':'');$('gradeAct').innerHTML=DL('Exportar','Notas · .csv','exportGrades()');
  el.innerHTML='<div class="gr-wrap"><table class="gr"><thead><tr><th>Alumno</th>'+works.map(w=>`<th title="${esc(w.title)}">${esc(w.title.slice(0,12))}<small>${w.pts!=null?'/'+w.pts:''}</small></th>`).join('')+'<th>Media</th></tr></thead><tbody>'+(stu.length?stu.map(m=>{const pc=pctOf(works,m.n);return '<tr><td>'+esc(m.n)+'</td>'+works.map(w=>{if(!assignedTo(w,m))return '<td class="na" title="No asignada">n/a</td>';const s=subOf(w,m.n),k=s&&s.grade!=null?(s.ret===false?'g draft':'g'):s&&s.st==='tarde'?'late':s&&s.st!=='pendiente'?'sub':'';const v=s&&s.grade!=null?s.grade:(s&&s.st!=='pendiente'?'✓':'–');return '<td class="'+k+'"><button type="button" class="gr-cell" onclick="gradeCell(\''+w.id+'\','+data.members.indexOf(m)+')" aria-label="Calificar '+esc(w.title)+' de '+esc(m.n)+'">'+v+'</button></td>'}).join('')+'<td><b>'+(pc==null?'–':pc+'%')+'</b></td></tr>'}).join(''):'<tr><td colspan="'+(works.length+2)+'">Sin alumnos</td></tr>')+'</tbody>'+(stu.length?'<tfoot><tr><th>Media de la clase</th>'+works.map(w=>{const a=workAvg(w);return '<td>'+(a.avg==null?'–':fmtN(a.avg)+(w.pts!=null?'<small>/'+w.pts+'</small>':''))+'<small class="gr-cnt">'+a.n+'/'+stu.length+'</small></td>'}).join('')+'<td><b>'+(classPct(works)==null?'–':classPct(works)+'%')+'</b></td></tr></tfoot>':'')+'</table></div>';
 }else{
  const pc=pctOf(works,user);$('gradeAct').innerHTML='';$('gradeInfo').textContent=pc==null?'Sin notas todavía':'Media: '+pc+'%';
  el.innerHTML=studentSummary(works)+works.map(w=>{const s=subOf(w,user);return `<div class="wk-item" onclick="openWork('${w.id}')"><div class="wk-ic">${WI[w.type]}</div><div class="wk-b"><b>${esc(w.title)}</b><small>${stBadge(w,s)}${s&&s.fb&&s.ret!==false?esc(s.fb):(w.due?'Entrega: '+fmt(w.due):WN[w.type])}</small></div>${stOf(w,user)}</div>`}).join('');
 }
}
function exportGrades(){
 const works=data.work.filter(w=>w.type!=='material'),q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"',num=n=>n==null||n===''?'':String(Math.round(n*100)/100).replace('.',',');
 const rows=[['Alumno',...works.map(w=>w.title+(w.pts!=null?' (/'+w.pts+')':'')),'Entregadas','Media %']];
 students().forEach(m=>{const pc=pctOf(works,m.n),d=works.filter(w=>{const x=subOf(w,m.n);return x&&x.st!=='pendiente'}).length;rows.push([m.n,...works.map(w=>{const x=subOf(w,m.n);return x&&x.grade!=null?num(x.grade):''}),d+'/'+works.length,pc==null?'':pc])});
 const cp=classPct(works);rows.push(['Media de la clase',...works.map(w=>num(workAvg(w).avg)),'',cp==null?'':cp]);
 saveFile('notas-'+slug(classes[cur].name)+'.csv','\ufeff'+rows.map(r=>r.map(q).join(';')).join('\r\n'),'text/csv');
}
/* --- Permisos y archivo (solo profesores) --- */
function permHTML(){
 const c=classes[cur];
 return '<div class="fl">Permisos de los alumnos</div><div class="setrow"><span>Publicar en el tablón</span>'+SW('pmPost')+'</div><div class="setrow"><span>Comentar</span>'+SW('pmCom')+'</div><div class="setrow"><span>Escribir en el chat</span>'+SW('pmChat')+'</div><div class="fl">Videollamada (Meet)</div><input id="pmMeet" placeholder="https://meet.google.com/…" value="'+esc(c&&c.meet||'')+'">';
}
function bindPerm(){
 const c=classes[cur];if(!c)return;
 [['pmPost','post'],['pmCom','comment'],['pmChat','chat']].forEach(([id,k])=>{const e=$(id);if(!e)return;e.checked=!!perm()[k];e.onchange=()=>{c.perm=Object.assign(perm(),{[k]:e.checked});saveState();renderAll()}});
 const m=$('pmMeet');if(m)m.onchange=()=>{const u=m.value.trim();if(u&&!safeUrl(u)){toast('El enlace debe empezar por https://');m.value=c.meet||'';return}c.meet=u;saveState();renderAll();toast(u?'Enlace guardado':'Enlace quitado')};
}
async function archiveClass(){
 if(!await ask({icon:'📦',title:'¿Archivar esta clase?',text:'Dejará de salir en el selector, pero podrás restaurarla cuando quieras.',ok:'Archivar'}))return;
 classes[cur].archived=true;const nx=classes.findIndex(c=>!c.archived);closeModal();if(nx>=0)setCur(nx);renderAll();saveState();toast('Clase archivada');
}
function archivedHTML(){
 const l=classes.map((c,i)=>({c,i})).filter(o=>o.c.archived);
 return l.length?l.map(o=>`<div class="member"><div class="ma">${esc(o.c.emoji||'📚')}</div><div style="flex:1">${esc(o.c.name)}<small>${esc(o.c.code)}</small></div><button type="button" class="mini-btn" onclick="restoreClass(${o.i})">Restaurar</button></div>`).join(''):'<div class="empty">No hay clases archivadas.</div>';
}
function restoreClass(i){classes[i].archived=false;setCur(i);closeModal();renderAll();saveState();toast('Clase restaurada')}
/* --- Chat a pantalla completa --- */
function paintChatHead(){
 const c=classes[cur];if(!c||!$('chatName'))return;
 $('chatName').textContent=c.name;
 $('chatSub').textContent=(data.members||[]).length+' miembros · '+(isStaff()?'Eres profesor':perm().chat===false?'Solo lectura':'Chat de clase');
 $('chatAv').innerHTML=okImg(c.icon)?'<img src="'+c.icon+'" alt="">':esc(c.emoji||'📚');
 const lock=!isStaff()&&perm().chat===false;$('composer').classList.toggle('hidden',lock||!!rec);$('chatLock').classList.toggle('hidden',!lock);
}
function closeChat(){goTab('Inicio')}
/* Botón flotante contextual, confeti y guía de bienvenida */
let fabFn=null;
function fabCfg(){
 const v=(document.querySelector('.view.active')||{}).id,st=isStaff();
 const m={home:(st||perm().post)&&!iAmMuted()?['📣','Anuncio',()=>modal('post')]:null,calendar:st?['📅','Evento',()=>modal('event')]:null,tasks:st?['✨','Crear',createMenu]:['✅','Tarea',()=>modal('task')],sched:st?['🕘','Editar horario',openTimetable]:null,now:['📸','Foto',()=>modal('photo')],people:st?['👋','Invitar',()=>modal('invite')]:null};
 return m[v]||null;
}
function updateFab(){
 const b=$('fab');if(!b)return;
 const on=classes.some(c=>!c.archived)&&$('classShell').classList.contains('visible'),cfg=on?fabCfg():null;
 if(!cfg){b.classList.add('hidden');fabFn=null;return}
 $('fabI').textContent='+';$('fabT').textContent='';b.title=cfg[1];b.setAttribute('aria-label',cfg[1]);fabFn=cfg[2];
 b.classList.remove('hidden','pop');void b.offsetWidth;b.classList.add('pop');
}
function fabGo(){if(fabFn)fabFn()}
window.addEventListener('scroll',()=>{const b=$('fab');if(b)b.classList.toggle('mini',window.scrollY>140)},{passive:true});
function confetti(){
 const box=document.createElement('div');box.className='confetti';const cols=['#ff4d6d','#ffd166','#06d6a0','#118ab2','#8b5cf6','#f472b6'];
 for(let i=0;i<40;i++){const p=document.createElement('i');p.style.cssText='--x:'+((Math.random()-.5)*360)+'px;--y:'+(-140-Math.random()*220)+'px;--r:'+(Math.random()*720-360)+'deg;--c:'+cols[i%6]+';--d:'+(.9+Math.random()*.8)+'s;left:50%;top:62%';box.appendChild(p)}
 document.body.appendChild(box);setTimeout(()=>box.remove(),2200);
 try{if(navigator.vibrate)navigator.vibrate(15)}catch(e){}
}
const TOUR=[
 {e:'👋',t:'¡Bienvenido a tu clase!',d:'Aquí vive todo: anuncios, tareas, notas y chat. Te lo enseño en 20 segundos.'},
 {e:'📣',t:'El tablón',d:'Los profesores publican anuncios y todos comentan. Toca el botón de abajo a la derecha para publicar.'},
 {e:'📝',t:'Trabajo de clase',d:'Tareas, preguntas y materiales con fecha. Entrega con un toque y mira tus notas en la pestaña 🏅.'},
 {e:'💬',t:'Chat a pantalla completa',d:'Texto, stickers, notas de voz y fotos. Toca un mensaje para responder, copiar o eliminar.'},
 {e:'🎨',t:'Hazla tuya',d:'Cambia el color, el icono y el banner de la clase, y personaliza tu perfil. Pellizca para hacer zoom cuando quieras.'}
];
let tourI=0;
/* ===================== GUÍA DE BIENVENIDA EN MODO VÍDEO (con Nuvia, foco y dedo animado) ===================== */
let GD=null;
function gdTab(n){return [...document.querySelectorAll('.ib-tabs .ib-btn')].find(b=>b.textContent.trim()===n)}
function gdFit(e){if(!e)return null;const r=e.getBoundingClientRect();if(r.height<=innerHeight*.55)return e;const kids=[...e.children].filter(k=>{const q=k.getBoundingClientRect();return q.height>20});return kids.length?kids[0]:e}
function gdBtn(txt,root){return [...(root||document).querySelectorAll('button')].find(b=>b.textContent.trim()===txt&&b.getClientRects().length)}
function gdSteps(){
 const inClass=classes.some(c=>!c.archived)&&$('classShell')&&$('classShell').classList.contains('visible');
 if(!inClass)return [
  {t:'¡Hola! Soy Nuvia',p:'Te enseño Unuvia en menos de un minuto. Toca a la derecha para avanzar o a la izquierda para volver.'},
  {spot:()=>document.querySelector('#noClass .primary,.noclass .primary'),t:'Empieza por aquí',p:'Crea tu clase si eres profesor, o únete con el código que te den.'},
  {t:'¡Listo para empezar!',p:'Cuando estés dentro de una clase, vuelve a ver esta guía desde Ajustes → Ayuda: te enseñaré lo que puedes hacer según tu rol.'}];
 const R=role==='Administrador'?'admin':role==='Profesor'?'prof':role==='Delegado'?'dele':'alum',st=R==='admin'||R==='prof';
 const T={
  intro:{admin:'Eres administrador de esta clase: puedes gestionarlo todo. Te enseño lo más importante en un minuto.',prof:'Eres profesor de esta clase. Te enseño cómo publicar, crear trabajo y calificar en un minuto.',dele:'Eres delegado de esta clase: ayudas al profesor con algunos permisos. Te enseño tu aula en un minuto.',alum:'Te enseño tu aula en un minuto. Toca a la derecha para avanzar, a la izquierda para volver, o deja que siga sola.'}[R],
  code:st?'Compártelo para que tus alumnos se unan. También puedes invitar con un enlace desde Personas.':'Es el código de tu clase. Pásaselo a un compañero que aún no esté dentro.',
  inicio:st?'Publica anuncios para toda la clase y fíjalos arriba. Aquí también verás lo próximo de la semana.':'Lo próximo que tienes, ordenado por hoy, esta semana y más adelante. Debajo están los anuncios del profesor.',
  cal:st?'Toca un día para ver lo que hay o añadir un evento, como un examen o una excursión.':'Toca cualquier día para ver sus eventos, entregas y tareas. Debajo tienes lo que queda del mes.',
  work:st?'Crea tareas, preguntas tipo test y materiales, con archivos, hora límite, rúbrica o solo para algunos alumnos. Arriba verás lo pendiente de corregir.':'Tus tareas, preguntas y materiales. Ábrelas para entregar, adjuntar archivos y escribir en privado al profesor.',
  tt:st?'Rellena el horario de toda la semana de una vez con «Editar horario». Tus alumnos verán qué clase toca ahora.':'Tu semana de lunes a viernes. Aquí arriba siempre sabrás qué clase tienes ahora y cuál viene después.',
  notas:st?'Toca cualquier casilla para calificar, también con rúbrica. Guarda en borrador y devuelve las notas cuando quieras.':'Tu media, tus entregas y cómo van tus notas. Solo las ves tú.',
  chat:R==='alum'?'Habla con tu clase en tiempo real, si el profesor lo permite: mensajes, fotos, audios y stickers.':'Habla con la clase en tiempo real: mensajes, fotos, audios y stickers.',
  fab:st?'Crea lo que necesites según la pestaña en la que estés: anuncios, eventos, tareas, clases del horario…':'Añade fotos, tareas personales y más, según la pestaña en la que estés.',
  avatar:st?'Tu perfil, los ajustes y lo que tienes por corregir en todas tus clases.':'Tu perfil, los ajustes y tus pendientes de todas tus clases en un solo sitio.',
  fin:{admin:'Ya puedes gestionar tu clase. Vuelve a ver esta guía cuando quieras desde Ajustes → Ayuda.',prof:'Ya puedes dar tu clase en Unuvia. Vuelve a ver esta guía desde Ajustes → Ayuda.',dele:'¡A ayudar a tu clase! Vuelve a ver esta guía desde Ajustes → Ayuda.',alum:'Puedes volver a ver esta guía cuando quieras desde Ajustes → Ayuda. ¡A por ello!'}[R]};
 const S=[
  {t:'¡Hola! Soy Nuvia',p:T.intro,go:'Inicio'},
  {spot:()=>{const c=$('classCode');return c&&(c.closest('[class*=code]')||c)},t:'El código de la clase',p:T.code},
  {spot:()=>document.querySelector('.ib-tabs'),t:'Todo, a un toque',p:'Aquí están las secciones de la clase. Vamos a verlas.'},
  {tap:()=>gdTab('Inicio'),go:'Inicio',spot:()=>{const i=$('items');if(!i)return null;const c=i.closest('.card');return c&&c.getBoundingClientRect().height<innerHeight*.5?c:i},t:'Inicio',p:T.inicio},
  {tap:()=>gdTab('Calendario'),go:'Calendario',spot:()=>document.querySelector('.calx-side'),t:'Calendario',p:T.cal},
  {tap:()=>gdTab('Trabajo'),go:'Trabajo',spot:()=>gdFit($('workList')),t:'Trabajo',p:T.work},
  {tap:()=>gdTab('Horario'),go:'Horario',spot:()=>(st&&gdBtn('Editar horario',$('sched')))||document.querySelector('.tt-now')||gdFit($('schedList')),t:'Horario',p:T.tt},
  {tap:()=>gdTab('Notas'),go:'Notas',spot:()=>gdFit($('gradeBody')),t:'Calificaciones',p:T.notas}];
 if(st)S.push({tap:()=>gdTab('Personas'),go:'Personas',spot:()=>gdFit($('peopleBody')),t:'Personas',p:R==='admin'?'Toca a cualquier persona para cambiar su rol (administrador, profesor, delegado o alumno) o silenciarla en el tablón y el chat.':'Invita a tus alumnos con el código o un enlace, y silencia a quien no participe bien.'});
 if(R==='admin')S.push({go:'Inicio',spot:()=>gdBtn('Admin',$('classView')),t:'Administrar la clase',p:'Cambia el nombre y los permisos, copia la clase para el curso que viene, archívala o elimínala.'});
 S.push(
  {go:'Inicio',spot:()=>gdTab('Chat'),t:'Chat de la clase',p:T.chat},
  {spot:()=>$('fab'),t:'El botón +',p:T.fab},
  {spot:()=>$('topAvatar'),t:'Tu perfil y ajustes',p:T.avatar},
  {go:'Inicio',t:R==='admin'?'¡Tu clase está lista!':'¡Ya lo sabes todo!',p:T.fin});
 return S;
}
const GD_PAUSE='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',GD_PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
function startGuide(){
 if(GD)return;try{closeModal()}catch(e){}try{closeMenu()}catch(e){}
 const steps=gdSteps(),el=document.createElement('div');el.id='guide';el.className='gd';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Guía de bienvenida');
 el.innerHTML=`<div class="gd-hole"></div><div class="gd-finger" aria-hidden="true"><i></i></div>
 <div class="gd-tap gd-prev" aria-hidden="true"></div><div class="gd-tap gd-next" aria-hidden="true"></div>
 <div class="gd-card"><div class="gd-prog">${steps.map(()=>'<span><i></i></span>').join('')}</div>
  <div class="gd-row"><svg class="ulm gd-ulm" viewBox="0 0 474 542" aria-hidden="true"><use href="#ul-mark" width="474" height="542"/></svg><div class="gd-txt" aria-live="polite"><b></b><p></p></div></div>
  <div class="gd-ctl"><span class="gd-n"></span><button type="button" class="gd-pp" aria-label="Pausar">${GD_PAUSE}</button><button type="button" class="gd-x">Saltar</button></div></div>`;
 document.body.appendChild(el);document.body.classList.add('guide-open');document.documentElement.classList.add('guide-lock');
 const stop=e=>{e.preventDefault()};el.addEventListener('touchmove',stop,{passive:false});el.addEventListener('wheel',stop,{passive:false});
 GD={el,steps,i:-1,el0:0,paused:false,raf:0,timers:[],prevFocus:document.activeElement,DUR:6200,busy:false};
 el.querySelector('.gd-x').onclick=()=>endGuide();el.querySelector('.gd-pp').onclick=()=>gdPause(!GD.paused);
 el.querySelector('.gd-prev').onclick=()=>gdGo(GD.i-1);el.querySelector('.gd-next').onclick=()=>gdGo(GD.i+1);
 document.addEventListener('keydown',gdKey);window.addEventListener('resize',gdReflow);
 requestAnimationFrame(()=>el.classList.add('on'));gdGo(0);el.querySelector('.gd-x').focus();GD.raf=requestAnimationFrame(gdTick);
}
function gdKey(e){if(!GD)return;if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(e.key)){e.preventDefault();return}if(e.key==='Escape'){e.preventDefault();endGuide()}else if(e.key==='ArrowRight'){gdGo(GD.i+1)}else if(e.key==='ArrowLeft'){gdGo(GD.i-1)}else if(e.key===' '&&e.target.tagName!=='BUTTON'){e.preventDefault();gdPause(!GD.paused)}}
function gdPause(p){if(!GD)return;GD.paused=p;const b=GD.el.querySelector('.gd-pp');b.innerHTML=p?GD_PLAY:GD_PAUSE;b.setAttribute('aria-label',p?'Continuar':'Pausar');GD.el.classList.toggle('paused',p)}
function gdTick(ts){if(!GD)return;if(!GD.last)GD.last=ts;const dt=ts-GD.last;GD.last=ts;if(!GD.paused&&!GD.busy&&!document.hidden)GD.el0+=dt;
 GD.el.querySelectorAll('.gd-prog i').forEach((s,j)=>{s.style.width=(j<GD.i?100:j>GD.i?0:Math.min(100,GD.el0/GD.DUR*100))+'%'});
 if(GD.el0>=GD.DUR){if(GD.i>=GD.steps.length-1){endGuide();return}gdGo(GD.i+1)}
 GD.raf=requestAnimationFrame(gdTick)}
function gdClear(){GD.timers.forEach(clearTimeout);GD.timers=[]}
function gdAt(ms,fn){GD.timers.push(setTimeout(()=>{if(GD)fn()},ms))}
const gdSat=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sat'))||0;
function gdFixed(e){for(let n=e;n&&n!==document.body;n=n.parentElement){const p=getComputedStyle(n).position;if(p==='fixed'||p==='sticky')return true}return false}
/* coloca la tarjeta (arriba, abajo o centro) y devuelve la zona libre donde puede ir el foco */
function gdPlace(s,e){const c=GD.el.querySelector('.gd-card');let mode='mid';
 if(e){const r=e.getBoundingClientRect();mode=gdFixed(e)&&(r.top+r.height/2)>innerHeight*.5?'up':'down'}
 c.classList.toggle('up',mode==='up');c.classList.toggle('mid',mode==='mid');
 c.querySelector('b').textContent=s.t;c.querySelector('p').textContent=s.p;GD.el.querySelector('.gd-n').textContent=(GD.i+1)+' / '+GD.steps.length;
 if(GD.cardFor!==GD.i){GD.cardFor=GD.i;c.classList.remove('in');void c.offsetWidth;c.classList.add('in')}
 const cr=c.getBoundingClientRect(),sat=gdSat();
 return mode==='up'?{top:cr.bottom+16,bottom:innerHeight-10}:{top:sat+12,bottom:(mode==='mid'?innerHeight:cr.top)-16}}
/* desplaza la página (si hace falta) para que el elemento quede dentro de la zona libre */
function gdEnsure(e,z,then){if(!e){then();return}const r=e.getBoundingClientRect(),zh=z.bottom-z.top;
 if(gdFixed(e)){then();return}
 let y=r.height>zh?scrollY+r.top-z.top-8:scrollY+r.top-(z.top+(zh-r.height)/2);
 y=Math.max(0,Math.min(y,document.documentElement.scrollHeight-innerHeight));
 if(Math.abs(y-scrollY)<4){then();return}
 window.scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});gdAt(520,then)}
function gdRect(e,z,pad){if(!e)return null;const r=e.getBoundingClientRect();if(!r.width&&!r.height)return null;const p=pad==null?8:pad,vw=innerWidth;
 const top=Math.max(z?z.top-4:6,r.top-p),bot=Math.min(z?z.bottom+4:innerHeight-6,r.bottom+p);if(bot-top<12)return null;
 return {x:Math.max(6,r.left-p),y:top,w:Math.min(vw-12,r.width+p*2),h:bot-top}}
function gdHole(r){const h=GD.el.querySelector('.gd-hole');if(!r){h.style.cssText=`left:${innerWidth/2}px;top:${innerHeight/2}px;width:0;height:0;border-radius:50%`;return}
 h.style.cssText=`left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;border-radius:${Math.min(22,r.h/2)}px`}
function gdFinger(r,tap){const f=GD.el.querySelector('.gd-finger');if(!r){f.classList.remove('show');return}f.classList.add('show');f.style.left=(r.x+r.w/2)+'px';f.style.top=(r.y+r.h/2)+'px';if(tap){f.classList.remove('tap');void f.offsetWidth;f.classList.add('tap')}}
function gdSpot(s){const e=s.spot&&s.spot();const z=gdPlace(s,e);gdFinger(null);
 gdEnsure(e,z,()=>{const z2=gdPlace(s,e);GD.cur=e;GD.zone=z2;gdHole(gdRect(e,z2));GD.busy=false})}
function gdGo(i){if(!GD)return;if(i<0)i=0;if(i>=GD.steps.length){endGuide();return}gdClear();GD.i=i;GD.el0=0;GD.busy=true;GD.cur=null;const s=GD.steps[i];
 const tapEl=s.tap&&s.tap();
 if(tapEl){const z=gdPlace(s,tapEl);
  gdEnsure(tapEl,z,()=>{const tr=gdRect(tapEl,null,4);gdHole(tr);gdFinger(tr,false);
   gdAt(620,()=>gdFinger(gdRect(tapEl,null,4),true));
   gdAt(880,()=>{if(s.go)goTab(s.go)});
   gdAt(1150,()=>gdSpot(s))})}
 else{if(s.go){const tb=gdTab(s.go);if(!tb||!tb.classList.contains('active'))goTab(s.go)}
  if(!s.spot){window.scrollTo({top:0,behavior:'smooth'})}
  gdSpot(s)}}
function gdReflow(){if(GD&&GD.cur&&GD.zone)gdHole(gdRect(GD.cur,GD.zone))}
function endGuide(){if(!GD)return;gdClear();cancelAnimationFrame(GD.raf);document.removeEventListener('keydown',gdKey);window.removeEventListener('resize',gdReflow);
 const el=GD.el,pf=GD.prevFocus;GD=null;el.classList.remove('on');document.body.classList.remove('guide-open');document.documentElement.classList.remove('guide-lock');setTimeout(()=>el.remove(),350);
 try{if($('classShell')&&$('classShell').classList.contains('visible'))goTab('Inicio');scrollTo({top:0,behavior:'smooth'})}catch(e){}
 settings.toured=true;try{saveState()}catch(e){}try{pf&&pf.focus&&pf.focus()}catch(e){}}

function showTour(){$('tour')&&$('tour').classList.add('hidden');startGuide()}
function paintTour(){
 const s=TOUR[tourI];$('tourE').textContent=s.e;$('tourT').textContent=s.t;$('tourD').textContent=s.d;
 $('tourDots').innerHTML=TOUR.map((_,i)=>'<i class="'+(i===tourI?'on':'')+'"></i>').join('');
 $('tourNext').textContent=tourI===TOUR.length-1?'¡Vamos!':'Siguiente';
 const e=$('tourE');e.style.animation='none';void e.offsetWidth;e.style.animation='';
}
function nextTour(){if(tourI<TOUR.length-1){tourI++;paintTour()}else endTour(true)}
function endTour(fin){$('tour').classList.add('hidden');settings.toured=true;saveState();if(fin)confetti()}
/* Aviso de confirmación bonito (sustituye al confirm del navegador) */
function ask(o){
 return new Promise(res=>{
  const el=$('ask');
  $('askIc').textContent=o.icon||'❓';$('askIc').className='ask-ic'+(o.danger?' danger':'');
  $('askT').textContent=o.title||'';$('askD').textContent=o.text||'';
  $('askOk').textContent=o.ok||'Aceptar';$('askOk').className='ask-ok'+(o.danger?' danger':'');$('askNo').textContent=o.no||'Cancelar';
  const key=e=>{if(e.key==='Escape')done(false)},done=v=>{el.classList.add('hidden');document.removeEventListener('keydown',key);res(v)};
  $('askOk').onclick=()=>done(true);$('askNo').onclick=()=>done(false);el.onclick=e=>{if(e.target===el)done(false)};
  document.addEventListener('keydown',key);el.classList.remove('hidden');
 });
}
async function wipeNow(){
 try{if(sb)await sb.auth.signOut()}catch(e){}try{[SKEY,RKEY,CKEY].forEach(k=>localStorage.removeItem(k))}catch(e){}location.reload()}
const IC={profile:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m1.5 13v1a.5.5 0 0 0 .3379.4731 18.9718 18.9718 0 0 0 6.1621 1.0269 18.9629 18.9629 0 0 0 6.1621-1.0269.5.5 0 0 0 .3379-.4731v-1a6.5083 6.5083 0 0 0 -4.461-6.1676 3.5 3.5 0 1 0 -4.078 0 6.5083 6.5083 0 0 0 -4.461 6.1676zm4-9a2.5 2.5 0 1 1 2.5 2.5 2.5026 2.5026 0 0 1 -2.5-2.5zm2.5 3.5a5.5066 5.5066 0 0 1 5.5 5.5v.6392a18.08 18.08 0 0 1 -11 0v-.6392a5.5066 5.5066 0 0 1 5.5-5.5z" fill="#7D8590"></path></svg>',account:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m17.074 30h-2.148c-1.038 0-1.914-.811-1.994-1.846l-.125-1.635c-.687-.208-1.351-.484-1.985-.824l-1.246 1.067c-.788.677-1.98.631-2.715-.104l-1.52-1.52c-.734-.734-.78-1.927-.104-2.715l1.067-1.246c-.34-.635-.616-1.299-.824-1.985l-1.634-.125c-1.035-.079-1.846-.955-1.846-1.993v-2.148c0-1.038.811-1.914 1.846-1.994l1.635-.125c.208-.687.484-1.351.824-1.985l-1.068-1.247c-.676-.788-.631-1.98.104-2.715l1.52-1.52c.734-.734 1.927-.779 2.715-.104l1.246 1.067c.635-.34 1.299-.616 1.985-.824l.125-1.634c.08-1.034.956-1.845 1.994-1.845h2.148c1.038 0 1.914.811 1.994 1.846l.125 1.635c.687.208 1.351.484 1.985.824l1.246-1.067c.787-.676 1.98-.631 2.715.104l1.52 1.52c.734.734.78 1.927.104 2.715l-1.067 1.246c.34.635.616 1.299.824 1.985l1.634.125c1.035.079 1.846.955 1.846 1.993v2.148c0 1.038-.811 1.914-1.846 1.994l-1.635.125c-.208.687-.484 1.351-.824 1.985l1.067 1.246c.677.788.631 1.98-.104 2.715l-1.52 1.52c-.734.734-1.928.78-2.715.104l-1.246-1.067c-.635.34-1.299.616-1.985.824l-.125 1.634c-.079 1.035-.955 1.846-1.993 1.846zm-5.835-6.373c.848.53 1.768.912 2.734 1.135.426.099.739.462.772.898l.18 2.341 2.149-.001.18-2.34c.033-.437.347-.8.772-.898.967-.223 1.887-.604 2.734-1.135.371-.232.849-.197 1.181.089l1.784 1.529 1.52-1.52-1.529-1.784c-.285-.332-.321-.811-.089-1.181.53-.848.912-1.768 1.135-2.734.099-.426.462-.739.898-.772l2.341-.18h-.001v-2.148l-2.34-.18c-.437-.033-.8-.347-.898-.772-.223-.967-.604-1.887-1.135-2.734-.232-.37-.196-.849.089-1.181l1.529-1.784-1.52-1.52-1.784 1.529c-.332.286-.81.321-1.181.089-.848-.53-1.768-.912-2.734-1.135-.426-.099-.739-.462-.772-.898l-.18-2.341-2.148.001-.18 2.34c-.033.437-.347.8-.772.898-.967.223-1.887.604-2.734 1.135-.37.232-.849.197-1.181-.089l-1.785-1.529-1.52 1.52 1.529 1.784c.285.332.321.811.089 1.181-.53.848-.912 1.768-1.135 2.734-.099.426-.462.739-.898.772l-2.341.18.002 2.148 2.34.18c.437.033.8.347.898.772.223.967.604 1.887 1.135 2.734.232.37.196.849-.089 1.181l-1.529 1.784 1.52 1.52 1.784-1.529c.332-.287.813-.32 1.18-.089z" fill="#7D8590"></path><path d="m16 23c-3.859 0-7-3.141-7-7s3.141-7 7-7 7 3.141 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" fill="#7D8590"></path></svg>',appearance:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="m109.9 20.63a6.232 6.232 0 0 0 -8.588-.22l-57.463 51.843c-.012.011-.02.024-.031.035s-.023.017-.034.027l-4.721 4.722a1.749 1.749 0 0 0 0 2.475l.341.342-3.16 3.16a8 8 0 0 0 -1.424 1.967 11.382 11.382 0 0 0 -12.055 10.609c-.006.036-.011.074-.015.111a5.763 5.763 0 0 1 -4.928 5.41 1.75 1.75 0 0 0 -.844 3.14c4.844 3.619 9.4 4.915 13.338 4.915a17.14 17.14 0 0 0 11.738-4.545l.182-.167a11.354 11.354 0 0 0 3.348-8.081c0-.225-.02-.445-.032-.667a8.041 8.041 0 0 0 1.962-1.421l3.16-3.161.342.342a1.749 1.749 0 0 0 2.475 0l4.722-4.722c.011-.011.018-.025.029-.036s.023-.018.033-.029l51.844-57.46a6.236 6.236 0 0 0 -.219-8.589zm-70.1 81.311-.122.111c-.808.787-7.667 6.974-17.826 1.221a9.166 9.166 0 0 0 4.36-7.036 1.758 1.758 0 0 0 .036-.273 7.892 7.892 0 0 1 9.122-7.414c.017.005.031.014.048.019a1.717 1.717 0 0 0 .379.055 7.918 7.918 0 0 1 4 13.317zm5.239-10.131c-.093.093-.194.176-.293.26a11.459 11.459 0 0 0 -6.289-6.286c.084-.1.167-.2.261-.3l3.161-3.161 6.321 6.326zm7.214-4.057-9.479-9.479 2.247-2.247 9.479 9.479zm55.267-60.879-50.61 56.092-9.348-9.348 56.092-50.61a2.737 2.737 0 0 1 3.866 3.866z" fill="#7D8590"></path></svg>',access:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g transform="translate(-33.022 -30.617)"><path d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z" fill="#7D8590"></path></g></svg>',notif:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none"><path fill-rule="evenodd" fill="#7D8590" d="m11.9572 4.31201c-3.35401 0-6.00906 2.59741-6.00906 5.67742v3.29037c0 .1986-.05916.3927-.16992.5576l-1.62529 2.4193-.01077.0157c-.18701.2673-.16653.5113-.07001.6868.10031.1825.31959.3528.67282.3528h14.52603c.2546 0 .5013-.1515.6391-.3968.1315-.2343.1117-.4475-.0118-.6093-.0065-.0085-.0129-.0171-.0191-.0258l-1.7269-2.4194c-.121-.1695-.186-.3726-.186-.5809v-3.29037c0-1.54561-.6851-3.023-1.7072-4.00431-1.1617-1.01594-2.6545-1.67311-4.3019-1.67311zm-8.00906 5.67742c0-4.27483 3.64294-7.67742 8.00906-7.67742 2.2055 0 4.1606.88547 5.6378 2.18455.01.00877.0198.01774.0294.02691 1.408 1.34136 2.3419 3.34131 2.3419 5.46596v2.97007l1.5325 2.1471c.6775.8999.6054 1.9859.1552 2.7877-.4464.795-1.3171 1.4177-2.383 1.4177h-14.52603c-2.16218 0-3.55087-2.302-2.24739-4.1777l1.45056-2.1593zm4.05187 11.32257c0-.5523.44772-1 1-1h5.99999c.5523 0 1 .4477 1 1s-.4477 1-1 1h-5.99999c-.55228 0-1-.4477-1-1z" clip-rule="evenodd"></path></svg>'};
/* Menú de ajustes — From Uiverse.io by reglobby */
function stgMenu(){
 const it=[['profile','Perfil público'],['account','Cuenta'],['appearance','Apariencia'],['access','Accesibilidad'],['notif','Notificaciones'],['chat','Chat'],['class','Clase y calendario'],['data','Datos y fotos'],['about','Ayuda y acerca de']];
 return '<div class="stg">'+it.map(([k,l])=>`<button type="button" class="stg-item" onclick="settingsPage('${k}')">${IC[k]||''}${l}</button>`).join('')+'</div>';
}
IC.chat='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7D8590" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';IC.class='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7D8590" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';IC.data='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7D8590" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>';IC.about='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7D8590" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
const SEC=[['menu','Ajustes'],['profile','Perfil público'],['account','Cuenta'],['appearance','Apariencia'],['access','Accesibilidad'],['notif','Notificaciones'],['chat','Chat'],['class','Clase y calendario'],['data','Datos y fotos'],['about','Ayuda y acerca de']];
const glGrp=(l,h)=>`<div class="gl-group"><label class="gl-label">${l}</label><div class="gl-box">${h}</div></div>`;
const glSld=(l,id,min,max,val,u)=>`<div class="gl-srow"><label>${l}</label><div class="gl-scontent"><div class="gl-swrap"><input type="range" class="gl-slider" id="${id}" min="${min}" max="${max}" value="${val}"></div><div class="gl-sdiv"></div><span class="gl-sval" id="${id}V">${val}${u}</span></div></div>`;
/* Tarjeta de cristal — From Uiverse.io by byllzz */
function glassWrap(cur,body){
 const name=SEC.find(x=>x[0]===cur)[1];
 const back=cur==='menu'?'':`<button type="button" class="gl-back" aria-label="Volver a Ajustes" onclick="settingsPage('menu')"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></button>`;
 return `<div class="gl-head">${back}<span class="gl-title">${name}</span><button type="button" class="gl-close" aria-label="Cerrar" onclick="closeModal()">✕</button></div><hr class="gl-div">${body}`;
}
const ACC=['#008cff','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#06b6d4','#64748b'];
const seg=(key,list,val)=>`<div class="seg" data-key="${key}">${list.map(([v,l])=>`<button type="button" data-v="${esc(String(v))}" class="${String(v)===String(val)?'on':''}">${esc(l)}</button>`).join('')}</div>`;
const row=(l,id)=>`<div class="gl-row"><span>${l}</span>${SW(id)}</div>`;
document.addEventListener('click',e=>{
 const b=e.target.closest&&e.target.closest('.seg button');
 if(b){const g=b.parentElement,k=g.dataset.key;let v=b.dataset.v;if(/^-?\d+(\.\d+)?$/.test(v))v=+v;settings[k]=v;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));applyTheme();saveState();if(['weekStart','sortPosts','showPast','remDays','startTab','schedView'].includes(k))renderAll();return}
 const c=e.target.closest&&e.target.closest('.pks[data-for="stgAccent"] .cb-item');
 if(c){settings.accent=c.dataset.v;applyTheme();saveState()}
});
function shareApp(){const d={title:'Unuvia',text:'Unuvia · tu aula, organizada',url:'https://unuvia.es'};if(navigator.share){navigator.share(d).catch(()=>{})}else copyText(d.url).then(ok=>toast(ok?'Enlace copiado':'No se pudo copiar'))}
function reviewCookies(){try{localStorage.removeItem(CKEY)}catch(e){}ckOK=false;closeModal();showCookies()}
async function signOutAll(){if(!await ask({icon:'🔒',title:'¿Cerrar sesión en todos los dispositivos?',text:'Tendrás que volver a entrar con tu correo en cada uno.',ok:'Cerrar en todos',danger:true}))return;try{if(sb)await sb.auth.signOut({scope:'global'})}catch(e){}try{localStorage.removeItem(SKEY)}catch(e){}location.reload()}
async function resetSettings(){if(!await ask({icon:'↺',title:'¿Restablecer los ajustes?',text:'Vuelven a sus valores originales en este dispositivo. Tu perfil y tus clases no cambian.',ok:'Restablecer'}))return;Object.assign(settings,DEFSET);setPref('auto');applyPref();saveState();renderAll();settingsPage('menu');toast('Ajustes restablecidos')}
function syncNow(){toast('Actualizando…');pullAll(true).then(()=>{toast('Todo al día');settingsPage('data')})}

/* Iconos sociales — From Uiverse.io by Itskrish01 (créditos de todos los componentes en los comentarios del código) */
const SOCIAL={github:'https://github.com/s0k1x',linkedin:'',youtube:'',discord:''};
const SOC_IC={
 github:'<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>',
 linkedin:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>',
 youtube:'<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>',
 discord:'<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"></path>'};
function socialDock(){
 const it=[['github','gh','GitHub'],['linkedin','li','LinkedIn'],['youtube','yt','YouTube'],['discord','dc','Discord']];
 return '<div class="sdock-wrap"><div class="sdock-cap">Síguenos</div><div class="sdock"><div class="sdock-bg"></div><div class="sdock-row">'+it.map(([k,c,l])=>{const u=SOCIAL[k],svg='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+SOC_IC[k]+'</svg>';
  return u?`<a class="sdock-i ${c}" href="${esc(u)}" target="_blank" rel="noopener" aria-label="${l}">${svg}</a>`:`<button type="button" class="sdock-i ${c}" aria-label="${l}" onclick="toast('${l}: muy pronto')">${svg}</button>`}).join('')+'</div></div></div>';
}

function settingsPage(k){
 IMG.pIcon=settings.photo||'';IMG.pBanner=settings.banner||'';
 const sync=window.__lastSync?new Date(window.__lastSync).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}):'—';
 const B={
  menu:stgMenu(),
  profile:glGrp('Nombre','<input id="stgName" class="gl-input" maxlength="24" value="'+esc(user)+'" placeholder="Tu nombre">')+glGrp('Foto',imgPick('pIcon',settings.photo,'sq'))+glGrp('Banner',imgPick('pBanner',settings.banner,'wide'))+glGrp('Icono',pk('stgEmoji',['',...EMO],settings.emoji||'','emo'))+glGrp('Color',pk('stgColor',COL,settings.avatar,'col'))+glGrp('Estado','<input id="stgBio" class="gl-input" maxlength="60" value="'+esc(settings.bio||'')+'" placeholder="Ej: delegado, me gusta dibujar">')+'<button type="button" class="gl-btn" onclick="saveProfile()">Guardar perfil</button>',
  account:glGrp('Sesión','<div class="gl-text">Iniciada como <b>'+esc(user)+'</b></div>'+(authEmail?'<div class="gl-sub">Correo de la cuenta: '+esc(authEmail)+'</div>':''))+'<div class="dl-row">'+DL('Mis datos','Copia en .json','exportMyData()')+DL('Calendario','Eventos y tareas · .csv','exportCsv()')+'</div><button type="button" class="gl-btn" onclick="logout()">Cerrar sesión</button><button type="button" class="gl-btn" onclick="signOutAll()">Cerrar sesión en todos los dispositivos</button><button type="button" class="gl-btn danger" onclick="wipeData()">Borrar los datos de este dispositivo</button><div class="gl-sub">Para eliminar tu cuenta y todo lo que has compartido, escribe a unuviasupport@gmail.com.</div>',
  appearance:glGrp('Tema de este dispositivo','<div class="gl-row"><span>Seguir el tema del móvil</span>'+SW('optAuto')+'</div><div class="gl-row"><span>Claro / oscuro</span>'+THEME_SW('optLight',true)+'</div><div class="gl-text gl-note">Cada dispositivo guarda su propio tema. Tu elección aquí no cambia el de otros móviles.</div>')
   +glGrp('Color de acento',pk('stgAccent',ACC,settings.accent||'#008cff','col')+'<div class="gl-sub">Cambia el color de botones, enlaces y destacados.</div>')
   +glGrp('Efectos',row('Efecto cristal (desenfoque)','optGlass')+'<div class="gl-sub">Desactívalo si tu móvil va lento o se calienta. En Android modestos viene desactivado de serie.</div>')
   +'<hr class="gl-div">'+glSld('Cuadrícula del fondo','slGrid',0,40,settings.grid,'%'),
  access:glSld('Tamaño del texto','slText',100,140,settings.text,'%')+'<hr class="gl-div">'
   +glGrp('Lectura',row('Alto contraste','optHc')+row('Texto en negrita','optBold')+row('Más espacio entre letras y líneas','optSpaced')+row('Subrayar los enlaces','optLinks'))
   +glGrp('Manejo',row('Botones y filas más grandes','optBigtap')+row('Zoom con los dedos','optZoom'))
   +glGrp('Movimiento',row('Reducir animaciones','optCalm')),
  notif:notifPageHTML(),
  chat:glGrp('Escribir',row('Enviar con la tecla Enter','optEnter'))
   +glGrp('Mensajes',row('Mostrar la hora','optChatTime')+row('Mostrar el nombre de quien escribe','optChatNames'))
   +glGrp('Tamaño del texto del chat',seg('chatSize',[['s','Pequeño'],['m','Normal'],['l','Grande']],settings.chatSize||'m')),
  class:glGrp('Al abrir Unuvia, ir a',seg('startTab',[['Inicio','Inicio'],['Calendario','Calendario'],['Trabajo','Trabajo'],['Chat','Chat']],settings.startTab||'Inicio'))
   +glGrp('La semana empieza en',seg('weekStart',[['mon','Lunes'],['sun','Domingo']],settings.weekStart||'mon'))
   +glGrp('Orden del tablón',seg('sortPosts',[['pin','Fijados primero'],['recent','Más recientes']],settings.sortPosts||'pin'))
   +glGrp('Próximamente',row('Mostrar también lo ya pasado','optPast')),
  data:glGrp('Calidad de las fotos que subes',seg('photoQ',[['low','Baja'],['mid','Media'],['high','Alta']],settings.photoQ||'mid')+'<div class="gl-sub">Baja ahorra datos y sube más rápido. Alta se ve mejor pero pesa más.</div>')
   +glGrp('Sincronización','<div class="gl-text">Última actualización: <b>'+sync+'</b></div><button type="button" class="gl-btn soft" onclick="syncNow()">Sincronizar ahora</button>')
   +'<div class="dl-row">'+DL('Mis datos','Copia en .json','exportMyData()')+DL('Calendario','Eventos y tareas · .csv','exportCsv()')+'</div>'
   +'<button type="button" class="gl-btn danger" onclick="resetSettings()">Restablecer los ajustes</button>',
  about:glGrp('Unuvia','<div class="gl-text">Versión 1.0 · tu aula, organizada</div><div class="gl-sub">unuvia.es</div>')
   +'<button type="button" class="gl-btn" onclick="closeModal();showTour()">✨ Ver la guía de bienvenida</button><button type="button" class="gl-btn" onclick="installHelp()">📲 Instalar Unuvia en el móvil</button><button type="button" class="gl-btn" onclick="shareApp()">📤 Compartir Unuvia</button><a class="gl-btn" style="text-align:center;text-decoration:none" href="mailto:unuviasupport@gmail.com?subject=Ayuda%20con%20Unuvia">✉️ Contactar con soporte</a><a class="gl-btn" style="text-align:center;text-decoration:none" href="mailto:unuviasupport@gmail.com?subject=Problema%20en%20Unuvia&body=Cu%C3%A9ntanos%20qu%C3%A9%20ha%20pasado%3A">🐞 Informar de un problema</a><button type="button" class="gl-btn" onclick="reviewCookies()">🍪 Revisar las cookies</button>'
   +socialDock()
 }[k];
 $('modalFields').innerHTML=glassWrap(k,B);bindImgs();syncTheme();if(k==='notif')bindNotifPage();
 const on=(id,key,inv)=>{const e=$(id);if(!e)return;e.checked=inv?settings[key]!==false:!!settings[key];e.onchange=ev=>{settings[key]=ev.target.checked;applyTheme();saveState();if(['showPast'].includes(key))renderAll()}};
 on('optCalm','calm');on('optZoom','zoomOK');(()=>{const e=$('optGlass');if(e){e.checked=!(settings.glass===false||(LOWPERF&&!settings.glassUser));e.onchange=ev=>{settings.glass=ev.target.checked;settings.glassUser=true;applyTheme();saveState()}}})();on('optHc','contrast');on('optBold','bold');on('optSpaced','spaced');on('optLinks','links');on('optBigtap','bigtap');
 on('optEnter','enterSend',1);on('optChatTime','chatTime',1);on('optChatNames','chatNames',1);on('optPast','showPast',1);
 const au=$('optAuto');if(au){au.checked=getPref()==='auto';au.onchange=e=>{setPref(e.target.checked?'auto':(settings.light?'light':'dark'));applyPref()}}
 if($('optNotif')){$('optNotif').checked=settings.notif;$('optNotif').onchange=toggleNotif}
 const sl=(id,key,u)=>{const e=$(id);if(!e)return;e.oninput=()=>{settings[key]=+e.value;$(id+'V').textContent=e.value+u;applyTheme()};e.onchange=saveState};
 sl('slGrid','grid','%');sl('slText','text','%');
}
function setName(n){
 n=(n||'').trim().slice(0,24);if(!n){toast('Escribe un nombre');return}
 const old=user;user=n[0].toUpperCase()+n.slice(1);
 classes.forEach(c=>c.data.members.forEach(m=>{if(m.n===old)m.n=user}));
 $('topName').textContent=user;paintAvatar();
 saveState();renderAll();toast('Nombre actualizado');
}
function saveName(){const n=$('stgName').value.trim();if(!n){toastErr('Escribe un nombre.');return}setName(n);modal('settings')}
function applyTheme(){
 const h=document.documentElement;syncTheme();const tc=document.querySelector('meta[name=theme-color]');if(tc)tc.content=settings.light?'#eef1f6':'#000000';h.classList.toggle('light',!!settings.light);h.classList.toggle('calm',!!settings.calm);try{zoomGuard(settings.zoomOK===false)}catch(e){}
 const ac=/^#[0-9a-f]{6}$/i.test(settings.accent||'')?settings.accent:'#008cff';h.style.setProperty('--accent',ac);h.style.setProperty('--accent-rgb',[1,3,5].map(i=>parseInt(ac.slice(i,i+2),16)).join(','));
 h.classList.toggle('noglass',settings.glass===false||(LOWPERF&&!settings.glassUser));h.classList.toggle('hc',!!settings.contrast);h.classList.toggle('bold',!!settings.bold);h.classList.toggle('spaced',!!settings.spaced);h.classList.toggle('bigtap',!!settings.bigtap);h.classList.toggle('links',!!settings.links);
 h.classList.toggle('notime',settings.chatTime===false);h.classList.toggle('nonames',settings.chatNames===false);h.classList.toggle('chat-s',settings.chatSize==='s');h.classList.toggle('chat-l',settings.chatSize==='l');
 const av=$('topAvatar');if(av)av.style.setProperty('background',okImg(settings.photo)?`center/cover no-repeat url(${settings.photo})`:(settings.avatar||'#008cff'),'important');
 h.style.zoom=settings.text>100?settings.text/100:'';h.style.setProperty('--gridA',(settings.grid==null?20:settings.grid)/100);
 const m=document.querySelector('meta[name=viewport]');
 const ios=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 /* en iPhone/iPad, maximum-scale=1 evita el zoom automático al tocar casillas y aun así deja ampliar con dos dedos */
 if(m)m.content=settings.zoomOK?(ios?'width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover':'width=device-width,initial-scale=1,viewport-fit=cover'):'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover';
}

function toggleNotif(e){
 if(!e.target.checked){settings.notif=false;saveState();return}
 if(!('Notification' in window)){toast('Tu navegador no admite avisos del sistema');e.target.checked=false;return}
 Notification.requestPermission().then(p=>{settings.notif=p==='granted';e.target.checked=settings.notif;if(!settings.notif)toast('Permiso denegado');saveState();checkReminders()}).catch(()=>{e.target.checked=false})
}
const fired=new Set();
function fire(k,b){if(fired.has(k))return;fired.add(k);try{new Notification('Unuvia',{body:b})}catch(e){}}
function checkReminders(){
 if(!settings.notif||!('Notification' in window)||Notification.permission!=='granted')return;
 const today=iso(new Date()),lim=iso(new Date(Date.now()+(settings.remDays||1)*864e5)),tom=iso(new Date(Date.now()+864e5));
 const when=d=>d===today?'Hoy: ':d===tom?'Mañana: ':'Pronto ('+fmt(d)+'): ';
 classes.forEach(c=>{
  c.data.events.forEach(e=>{if(e.d>=today&&e.d<=lim)fire('e'+e.id+e.d,when(e.d)+e.t)});
  c.data.tasks.forEach(t=>{if(!t.done&&t.d>=today&&t.d<=lim)fire('t'+t.id+t.d,'Tarea · '+when(t.d)+t.t)})});
}
setInterval(checkReminders,60000);
function shrink(f,mx=520,q=.6){const pf={low:.7,mid:1,high:1.5}[settings.photoQ||'mid']||1;mx=Math.round(mx*pf);q=Math.min(.92,pf>1?q*1.2:pf<1?q*.85:q);return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,mx/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};im.onerror=rej;im.src=r.result};r.onerror=rej;r.readAsDataURL(f)})}
function modal(t){
 mType=t;
 const c={
  event:['Nuevo evento','Añade una entrega, examen o ficha.','<input id="f1" placeholder="Título"><input id="f2" type="date" value="'+iso(new Date())+'"><input id="f3" placeholder="Detalle (hora, aula…)">'+bsel('f4','Tipo de evento',[{v:'📄',l:'📄 Ficha / PDF'},{v:'📝',l:'📝 Examen'},{v:'📎',l:'📎 Otro'}])],
  task:['Nueva tarea','Algo que tienes que hacer.','<input id="f1" placeholder="Tarea"><input id="f2" type="date" aria-label="Fecha límite (opcional)">'],
  sched:['Nueva clase en el horario','Se repite cada semana.','<input id="f1" placeholder="Asignatura">'+bsel('f2','Día de la semana',DIAS.map((d,i)=>({v:String(i),l:d})))+'<input id="f3" type="time" value="08:00"><input id="f4" placeholder="Aula (opcional)">'],
  photo:['Foto rápida','Comparte una foto con la clase.','<input id="f1" placeholder="Descripción (pizarra, examen…)">'+bsel('f4','Etiqueta',[{v:'CLASE',l:'CLASE'},{v:'EXAMEN',l:'EXAMEN'},{v:'OTRO',l:'OTRO'}])+'<label class="custum-file-upload" for="f5"><span class="icon">'+FILE_ICON+'</span><span class="text"><span>Elegir foto</span></span><input type="file" id="f5" accept="image/*"></label><div class="file-upload-name" id="fname"></div>'],
  post:['Nuevo anuncio','Compártelo con toda la clase.','<textarea id="f1" rows="4" placeholder="Anuncia algo a tu clase…" maxlength="1000"></textarea><label class="custum-file-upload" for="f5"><span class="icon">'+FILE_ICON+'</span><span class="text"><span>Añadir foto (opcional)</span></span><input type="file" id="f5" accept="image/*"></label><div class="file-upload-name" id="fname"></div>'+(isStaff()?'<div class="setrow"><span>'+svgI('pin')+'Fijar arriba</span>'+SW('pinSw')+'</div>':'')],
  work:[(workEditId?'Editar ':'Nueva ')+{tarea:'tarea',material:'material',pregunta:'pregunta'}[workType],'Visible para toda la clase.',workForm()],
  topic:['Nuevo tema','Agrupa el trabajo por temas.','<input id="f1" placeholder="Nombre del tema" maxlength="40">'],
  invite:['Invitar a la clase','Comparte el enlace: al abrirlo e iniciar sesión, entran directamente a la clase. También vale el código.','<div class="cp-row pp-code"><span>Código · <b>'+esc((classes[cur]||{}).code||'')+'</b></span>'+CP('classes[cur].code','Copiar código')+'</div><div class="inv-link"><span>'+esc(inviteUrl())+'</span></div><button type="button" class="gl-btn" onclick="shareInvite()">📤 Compartir enlace de invitación</button>'],
  role:['Cambiar rol','Elige qué puede hacer en esta clase.',roleHTML()],
  notifs:['Avisos','Lo último de tus clases.',notifsHTML()],
  postedit:['Editar anuncio','Los cambios los verá toda la clase.',t==='postedit'?(()=>{const p=data.posts.find(x=>x.id===modalArg);return p?'<textarea id="f1" rows="5" maxlength="1500">'+esc(p.t)+'</textarea>':''})():''],
  todo:['Pendientes','De todas tus clases.',t==='todo'?todoHTML():''],
  grade1:['Calificar','Al guardar se devuelve al alumno. Solo la verá él.',t==='grade1'?grade1HTML():''],
  workview:['Trabajo','',''],
  archived:['Clases archivadas','Restáuralas cuando quieras.',''],
  add:['Añadir o unirse a clase','¿Qué quieres hacer?','<div class="ib-bar ib-add"><button class="ib-btn" type="button" onclick="modal(\'class\')"><svg class="ib-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg><span>Crear clase</span></button><button class="ib-btn" type="button" onclick="modal(\'join\')"><svg class="ib-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="5.5"></circle><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"></path></svg><span>Unirme con código</span></button></div>'],
  join:['Unirse a una clase','Escribe el código que te pasó tu profesor o el administrador, por ejemplo MT-A1B2C3.','<input id="f1" placeholder="MT-A1B2C3" autocapitalize="characters">'],
  class:['Crear clase','Personalízala a tu gusto; el código se genera solo.',classForm()],
  editclass:['Personalizar clase','Cambia el nombre, el icono, el color y la descripción.',classForm(classes[cur])],
  admin:['Administrar clase',role==='Administrador'?'Gestiona los miembros de la clase.':'Miembros de la clase.',classes.length?adminHTML():''],
  timetable:['Editar horario','Escribe la materia de cada hora. Se repite cada semana.',t==='timetable'?timetableHTML():''],
  settings:['Ajustes','',stgMenu()]
 }[t];
 $('modalTitle').textContent=c[0];$('modalDesc').textContent=c[1];$('modalFields').innerHTML=c[2];
 if(t==='workview'){$('modalTitle').textContent=(data.work.find(x=>x.id===modalArg)||{}).title||'Trabajo';$('modalFields').innerHTML=workViewHTML(modalArg)}
 if(t==='archived')$('modalFields').innerHTML=archivedHTML();
 if(t==='admin')bindPerm();
 $('f5')?.addEventListener('change',e=>{$('fname').textContent=e.target.files[0]?.name||''});
 if(t==='class'){IMG.icon='';IMG.banner=''}if(t==='editclass'&&classes[cur]){IMG.icon=classes[cur].icon||'';IMG.banner=classes[cur].banner||''}bindImgs();
 document.querySelector('#modal .primary').style.display=['add','admin','settings','workview','archived','invite','notifs','todo'].includes(t)?'none':'';if(t==='role')document.querySelector('#modal .primary').textContent='Guardar rol';else document.querySelector('#modal .primary').textContent='Guardar';
 $('modal').classList.toggle('glass',t==='settings');document.querySelector('#modal .modalbox').classList.toggle('wide',t==='timetable');if(t==='settings')settingsPage('menu');
 $('modal').classList.add('show');if(!['admin','settings','add','workview','archived','timetable'].includes(t))$('f1')?.focus();
}
function closeModal(){$('modal').classList.remove('show')}
$('modal').addEventListener('click',e=>{if(e.target===$('modal'))closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeModal();toggleReviews(false)}});
function newCode(){let c;do{c='MT-'+(1000+Math.floor(Math.random()*9000))}while(classes.some(x=>x.code===c));return c}
function saveModal(){
 const v=id=>$(id)?.value.trim()||'';
 if(mType==='event'){
  if(!v('f1')){toastErr('Escribe un título.');return}
  if(!v('f2')){toastErr('Elige una fecha.');return}
  data.events.push({id:uid(),i:v('f4'),t:v('f1'),s:v('f3')||'Sin detalle',d:v('f2')});renderAll();
 }else if(mType==='task'){
  if(!v('f1')){toastErr('Escribe la tarea.');return}
  data.tasks.push({id:uid(),t:v('f1'),d:v('f2'),done:false});renderAll();goTab('Trabajo');
 }else if(mType==='sched'){
  if(!v('f1')){toastErr('Escribe la asignatura.');return}
  data.sched.push({id:uid(),t:v('f1'),day:+v('f2'),h:v('f3')||'08:00',r:v('f4')});renderAll();goTab('Horario');
 }else if(mType==='postedit'){
  const p=data.posts.find(x=>x.id===modalArg);if(!p)return;
  if(!(isStaff()||p.au===authUid||p.n===user)){toastErr('Solo el autor o un profesor puede editarlo');return}
  const t=$('f1').value.trim();if(!t&&!p.img){toastErr('El anuncio no puede quedar vacío.');return}
  p.t=t;renderAll();toast('Anuncio actualizado','ok');
 }else if(mType==='grade1'){
  if(!isStaff()||!gradeArg){toastErr('Solo los profesores pueden calificar');return}
  const w=data.work.find(x=>x.id===gradeArg.wid),m=data.members[gradeArg.i];if(!w||!m)return;
  let _rs=null;if(T7_OK&&w.rub&&w.rub.length){_rs={};for(let k=0;k<w.rub.length;k++){const e=$('rb_'+k),t=e?e.value.trim():'';if(e)e.classList.remove('bad');if(t==='')continue;const x=+t.replace(',','.');if(!isFinite(x)||x<0||x>w.rub[k].p){e.classList.add('bad');toastErr('«'+w.rub[k].c+'» debe estar entre 0 y '+w.rub[k].p+'.');return}_rs[k]=x}rubSum()}
  const g=$('gr1'),v=g.value.trim(),n=v===''?null:+v.replace(',','.');
  if(n!=null&&(!isFinite(n)||n<0||(w.pts!=null&&n>w.pts))){g.classList.add('bad');toastErr(w.pts!=null?'La nota debe estar entre 0 y '+w.pts+'.':'La nota debe ser un número de 0 en adelante.');return}
  if(!w.subs)w.subs={};const s=w.subs[m.n]||(w.subs[m.n]={st:'pendiente'});s.grade=n;s.fb=$('gr1f').value.trim();if(CR2_OK)s.ret=true;if(_rs)s.rs=_rs;if(n!=null&&s.st==='pendiente')s.st='entregada';
  renderAll();toast(n==null?'Nota quitada':'Nota guardada','ok');
 }else if(mType==='timetable'){
  if(!isStaff()){toast('Solo los profesores pueden editar el horario');return}
  ttCollect();
  for(const r of ttRows){if(r.c.some(c=>c&&c.t)&&!r.h){toastErr('Pon la hora en todas las franjas que tengan clases.');return}}
  const old={};data.sched.forEach(x=>{old[x.day+'|'+(x.h||'').slice(0,5)]=x});
  const out=[];ttRows.forEach(r=>r.c.forEach((c,d)=>{if(c&&c.t){const o=old[d+'|'+r.h];out.push({id:o?o.id:uid(),t:c.t,day:d,h:r.h,r:c.r||''})}}));
  data.sched=out;renderAll();goTab('Horario');toast('Horario guardado');
 }else if(mType==='photo'){
  const f=$('f5')?.files[0];
  if(!f&&!v('f1')){toastErr('Añade una foto o una descripción.');return}
  const add=img=>{data.photos.unshift({id:uid(),i:'📷',t:user+' ha compartido una foto',s:(v('f1')||'Foto')+' · '+new Date().toLocaleDateString('es-ES',{day:'numeric',month:'short'}),g:v('f4'),img});renderFeed();goTab('Ahora');saveState();closeModal()};
  if(f)shrink(f).then(add,()=>toastErr('No se pudo leer la imagen.'));else add('');
  return;
 }else if(mType==='join'){
  const raw=$('f1').value.trim();if(!raw){toastErr('Escribe el código de la clase.');return}
  cloudJoin(raw);return;
 }else if(mType==='role'){
  const m=data.members[modalArg];if(!m)return;
  if(role!=='Administrador'){toast('Solo un administrador puede cambiar roles');return}
  const why=roleBlock(m);if(why){toast(why);return}
  if(roleSel===m.r){closeModal();return}
  m.r=roleSel;renderAll();toast(m.n+' ahora es '+roleSel);
 }else if(['event','sched','work','topic','invite','editclass'].includes(mType)&&!isStaff()){
  toast('Solo los profesores pueden hacer esto');return;
 }else if(mType==='post'){
  const txt=v('f1'),f=$('f5')?.files[0];
  if(!txt&&!f){toastErr('Escribe algo o añade una foto.');return}
  const add=img=>{data.posts.unshift({id:uid(),n:user,t:txt,ts:Date.now(),pin:!!$('pinSw')?.checked,img:img||'',comments:[]});renderAll();goTab('Inicio');saveState();closeModal();confetti()};
  if(f)shrink(f,900,.7).then(add,()=>toastErr('No se pudo leer la imagen.'));else add('');
  return;
 }else if(mType==='work'){
  if(!v('f1')){toastErr('Escribe un título.');return}
  const _pt=v('f7')===''?null:+String(v('f7')).replace(',','.');if(_pt!=null&&(!isFinite(_pt)||_pt<=0)){toastErr('Los puntos deben ser un número mayor que 0.');return}
  const o={title:v('f1'),desc:$('f6')?$('f6').value.trim():'',topic:v('f2'),due:v('f3'),pts:_pt,link:safeUrl(v('f8'))};
  if(CR2_OK){o.dueTime=$('f9')?$('f9').value:'';if(o.dueTime&&!o.due){toastErr('Pon también la fecha de entrega.');return}
   if($('f10')){o.opts=$('f10').value.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,10);if(o.opts.length===1){toastErr('Pon al menos dos opciones, o deja el campo vacío.');return}}
   const all=$('asgAll');o.assg=all&&!all.checked?[...document.querySelectorAll('.asg-one input:checked')].map(x=>x.value):[];if(all&&!all.checked&&!o.assg.length){toastErr('Elige al menos un alumno o marca «Toda la clase».');return}
   const pv=$('f11')?$('f11').value:'';o.pubAt=pv?new Date(pv).getTime():0}
  if(T7_OK&&$('f12')){const pr=parseRubric($('f12').value);if(pr.err){toastErr(pr.err);return}o.rub=pr.list;if(o.rub.length)o.pts=Math.round(o.rub.reduce((a,r)=>a+r.p,0)*100)/100}
  const _wd=workDraft||{id:uid(),files:[],orig:[]};o.files=_wd.files.slice();const _rm=(_wd.orig||[]).filter(p=>!o.files.some(f=>f.p===p));if(_rm.length&&sb)sb.storage.from(CF).remove(_rm).catch(()=>{});
  if(workEditId){Object.assign(data.work.find(x=>x.id===workEditId),o)}else data.work.push(Object.assign({id:_wd.id,type:workType,ts:Date.now(),subs:{}},o));
  renderAll();goTab('Trabajo');
 }else if(mType==='topic'){
  const n=v('f1');if(!n){toastErr('Escribe el nombre del tema.');return}
  if(!data.topics.includes(n))data.topics.push(n);renderAll();
 }else if(mType==='invite'){
  const n=v('f1');if(!n){toastErr('Escribe un nombre.');return}
  toast('Pásale el código de la clase para que se una.');
 }else if(mType==='editclass'){
  const c=classes[cur];if(!c)return;if(!v('f1')){toastErr('Escribe el nombre de la clase.');return}
  c.name=v('f1');c.emoji=v('f2')||'📚';c.color=v('f3')||'#008cff';c.desc=v('f4');c.icon=IMG.icon;c.banner=IMG.banner;setCur(cur);renderAll();
 }else if(mType==='class'){
  if(!v('f1')){toastErr('Escribe el nombre de la clase.');return}
  cloudCreate({name:v('f1'),emoji:v('f2')||'📚',color:v('f3')||'#008cff',desc:v('f4'),icon:IMG.icon,banner:IMG.banner});closeModal();return;
 }
 saveState();closeModal();
}
/* ===================== NUBE · Supabase (todo compartido) ===================== */
const RL={admin:'Administrador',teacher:'Profesor',delegate:'Delegado',student:'Alumno'},RR={Administrador:'admin',Profesor:'teacher',Delegado:'delegate',Alumno:'student'};
const CF='class-files',AV='avatars';
const cap=s=>{s=String(s||'').trim()||'Alumno';return s[0].toUpperCase()+s.slice(1)};
const isData=u=>typeof u==='string'&&u.startsWith('data:');
const jeq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
let cloudOn=false,pushing=false,dirty=false,pullAgain=false,pulling=false,pushT=null,pullT=null,rt=null,snap={},profSnap='',lastSig='';
const urlCache=new Map();
const urlOf=(b,p)=>{const e=p&&urlCache.get(b+'/'+p);return e?e.url:''};
async function signUrls(bucket,paths){
 const need=[...new Set(paths.filter(Boolean))].filter(p=>{const e=urlCache.get(bucket+'/'+p);return !(e&&e.exp>Date.now()+3600e3)});
 for(let i=0;i<need.length;i+=100){
  const {data,error}=await sb.storage.from(bucket).createSignedUrls(need.slice(i,i+100),86400);
  if(error||!data)continue;
  data.forEach(r=>{if(r.signedUrl)urlCache.set(bucket+'/'+r.path,{url:r.signedUrl,exp:Date.now()+86400e3})});
 }
}
async function upload(bucket,folder,dataUrl,name){
 const blob=await (await fetch(dataUrl)).blob(),mime=(blob.type||'application/octet-stream').split(';')[0];
 const ext=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','audio/mp4':'m4a','audio/webm':'webm','audio/ogg':'ogg','audio/mpeg':'mp3','audio/aac':'aac'})[mime]||'bin';
 const path=folder+'/'+(name||uid())+'.'+ext;
 const {error}=await sb.storage.from(bucket).upload(path,blob,{contentType:mime,upsert:true});
 if(error)throw error;return path;
}
const dbErr=e=>{const m=((e&&e.message)||'').toLowerCase();return (e&&e.code==='42501')||/row-level security|permission/.test(m)?'No tienes permiso para hacer eso':'No se pudo guardar; se ha restablecido lo que había'};

/* Filas que la base de datos tendría para una clase, a partir de lo que ves en pantalla */
function rowsOf(c){
 const d=c.data,cid=c.id,me=authUid,R={},tp=(c._tp=c._tp||{});
 const mk=(arr,f)=>{const o={};(arr||[]).forEach(x=>{const r=f(x);if(r)o[r.id]=r});return o};
 R.topics=mk(d.topics,n=>({id:tp[n]||(tp[n]=uid()),class_id:cid,name:n}));
 R.events=mk(d.events,e=>({id:e.id,class_id:cid,title:e.t,detail:e.s||'',icon:e.i||'📄',date:e.d,created_by:e.by||me}));
 R.schedule=mk(d.sched,x=>({id:x.id,class_id:cid,subject:x.t,day:x.day,time:x.h||'08:00',room:x.r||''}));
 R.photos=mk(d.photos,p=>({id:p.id,class_id:cid,author_id:p.au||me,title:p.t||'',subtitle:p.s||'',tag:p.g||'OTRO',icon:p.i||'📷',image_path:p.img?(p._p||null):null}));
 R.favs=mk(d.photos.filter(p=>p.fav),p=>({id:p.id,photo_id:p.id,user_id:me}));
 R.posts=mk(d.posts,p=>({id:p.id,class_id:cid,author_id:p.au||me,body:p.t||'',image_path:p.img?(p._p||null):null,pinned:!!p.pin,...(p.ts?{created_at:new Date(p.ts).toISOString()}:{})}));
 R.comments={};d.posts.forEach(p=>(p.comments||[]).forEach(k=>{R.comments[k.id]={id:k.id,post_id:p.id,class_id:cid,author_id:k.au||me,body:k.t,...(k.ts?{created_at:new Date(k.ts).toISOString()}:{})}}));
 R.work=mk(d.work,w=>({id:w.id,class_id:cid,type:w.type,title:w.title,description:w.desc||'',topic_id:w.topic?(tp[w.topic]||null):null,due:w.due||null,points:w.pts==null?null:w.pts,link:w.link||'',created_by:w.by||me,...(FILES_OK?{files:w.files||[]}:{}),...(T7_OK?{rubric:w.rub||[]}:{}),...(CR2_OK?{due_time:w.dueTime||null,options:w.opts||[],publish_at:w.pubAt?new Date(w.pubAt).toISOString():null,assignees:w.assg||[]}:{})}));
 R.submissions={};const uidOf={};d.members.forEach(m=>{uidOf[m.n]=m.u});
 d.work.forEach(w=>Object.entries(w.subs||{}).forEach(([n,s])=>{
  const su=uidOf[n];if(!su||!s)return;
  if(!s.id&&(s.st||'pendiente')==='pendiente'&&s.grade==null&&!s.comment&&!s.answer&&!s.fb&&!(s.files&&s.files.length)&&!(s.thread&&s.thread.length))return;
  if(!s.id)s.id=uid();
  R.submissions[s.id]={id:s.id,work_id:w.id,class_id:cid,student_id:su,status:s.st||'pendiente',comment:s.comment||'',answer:s.answer||'',grade:s.grade==null?null:s.grade,feedback:s.fb||null,...(FILES_OK?{files:s.files||[]}:{}),...(CR2_OK?{thread:s.thread||[],returned:s.ret!==false}:{}),...(T7_OK?{rscores:s.rs||{}}:{})};
 }));
 R.messages=mk(d.messages,m=>({id:m.id,class_id:cid,author_id:m.au||me,type:m.type||'text',body:m.t||'',file_path:m.src?(m._p||null):null,duration:m.dur==null?null:Math.round(m.dur),reply_to:(m.reply&&m.reply.id)||null,...(m.ts?{created_at:new Date(m.ts).toISOString()}:{})}));
 R.my_tasks=mk(d.tasks,t=>({id:t.id,user_id:me,class_id:cid,title:t.t,due:t.d||null,done:!!t.done}));
 R.members={};d.members.forEach(m=>{R.members[m.u]={id:m.u,class_id:cid,user_id:m.u,role:RR[m.r]||'student',...(T7_OK?{muted:!!m.mu}:{})}});
 const pm=c.perm||{};
 R.meta={[cid]:{id:cid,name:c.name,emoji:c.emoji||'📚',color:c.color||'#008cff',description:c.desc||'',meet_url:c.meet||'',icon_path:c.icon?(c._pi||null):null,banner_path:c.banner?(c._pb||null):null,perm_post:!!pm.post,perm_comment:pm.comment!==false,perm_chat:pm.chat!==false,archived:!!c.archived}};
 return R;
}
const ORDER=[['topics','topics'],['events','events'],['schedule','schedule'],['photos','photos'],['posts','posts'],['comments','comments'],['work','work'],['submissions','submissions'],['messages','messages'],['my_tasks','my_tasks']];
const NOUPD=new Set(['messages','comments']);
async function pushClass(c){
 for(const m of c.data.messages)if(isData(m.src)&&!m._p)m._p=await upload(CF,c.id,m.src);
 for(const p of c.data.posts)if(isData(p.img)&&!p._p)p._p=await upload(CF,c.id,p.img);
 for(const p of c.data.photos)if(isData(p.img)&&!p._p)p._p=await upload(CF,c.id,p.img);
 if(isData(c.icon)&&c._iUp!==c.icon){c._pi=await upload(CF,c.id,c.icon,'icon-'+uid().slice(0,8));c._iUp=c.icon}
 if(isData(c.banner)&&c._bUp!==c.banner){c._pb=await upload(CF,c.id,c.banner,'banner-'+uid().slice(0,8));c._bUp=c.banner}
 const now=rowsOf(c),old=snap[c.id]||(snap[c.id]={});
 for(const [k,tbl] of ORDER){
  const n=now[k]||{},o=old[k]||{},ins=[],upd=[];
  for(const id in n){if(!o[id])ins.push(n[id]);else if(!NOUPD.has(k)&&!jeq(n[id],o[id]))upd.push(n[id])}
  if(ins.length){const {error}=await sb.from(tbl).insert(ins);if(error)throw error}
  for(const r of upd){const {id,...rest}=r;const {error}=await sb.from(tbl).update(rest).eq('id',id);if(error)throw error}
 }
 {const n=now.favs,o=old.favs||{};
  const ins=Object.keys(n).filter(id=>!o[id]).map(id=>({photo_id:id,user_id:authUid}));
  if(ins.length){const {error}=await sb.from('photo_favs').insert(ins);if(error)throw error}
  for(const id of Object.keys(o).filter(id=>!n[id])){await sb.from('photo_favs').delete().eq('photo_id',id).eq('user_id',authUid)}}
 {const n=now.members,o=old.members||{};
  for(const id in n)if(o[id]&&n[id].role!==o[id].role){const {error}=await sb.from('members').update({role:n[id].role}).eq('class_id',c.id).eq('user_id',id);if(error)throw error}
   if(T7_OK)for(const id in n)if(o[id]&&!!n[id].muted!==!!o[id].muted){const {error}=await sb.from('members').update({muted:!!n[id].muted}).eq('class_id',c.id).eq('user_id',id);if(error)throw error}
  for(const id in o)if(!n[id]){const {error}=await sb.from('members').delete().eq('class_id',c.id).eq('user_id',id);if(error)throw error}}
 {const n=now.meta[c.id],o=(old.meta||{})[c.id];if(o&&!jeq(n,o)){const {id,...rest}=n;const {error}=await sb.from('classes').update(rest).eq('id',id);if(error)throw error}}
 for(const [k,tbl] of [...ORDER].reverse()){
  const n=now[k]||{},o=old[k]||{},del=Object.keys(o).filter(id=>!n[id]);
  if(del.length){const {error}=await sb.from(tbl).delete().in('id',del);if(error)throw error}
 }
 snap[c.id]=now;
}
async function pushProfile(){
 const s=settings;
 if(isData(s.photo)&&s._ppUp!==s.photo){s._pp=await upload(AV,authUid,s.photo,'avatar');s._ppUp=s.photo}
 if(isData(s.banner)&&s._pbUp!==s.banner){s._pbn=await upload(AV,authUid,s.banner,'banner');s._pbUp=s.banner}
 const row={name:user,emoji:s.emoji||'',color:s.avatar||'#008cff',bio:s.bio||'',photo_path:s.photo?(s._pp||null):null,banner_path:s.banner?(s._pbn||null):null};
 const sg=JSON.stringify(row);if(sg===profSnap)return;
 const {error}=await sb.from('profiles').update(row).eq('id',authUid);if(error)throw error;profSnap=sg;
}
function schedulePush(){if(!cloudOn)return;dirty=true;clearTimeout(pushT);pushT=setTimeout(pushAll,350)}
async function pushAll(){
 if(pushing){dirty=true;return}
 pushing=true;dirty=false;let bad=false;
 try{for(const c of classes)if(c.id)await pushClass(c);await pushProfile()}
 catch(e){console.warn('push',e);toast(dbErr(e));bad=true}
 finally{pushing=false;if(dirty)schedulePush();else if(bad||pullAgain){pullAgain=false;pullAll(true)}}
}
const typing=()=>{const a=document.activeElement;return !!(a&&a.tagName==='INPUT'&&a.closest&&a.closest('#stream,#workList,#modal'))};
async function pullAll(force){
 if(!sb||!authUid)return;
 if(pushing||dirty||pulling){pullAgain=true;return}
 if(!force&&typing()){clearTimeout(pullT);pullT=setTimeout(()=>pullAll(),2500);return}
 pulling=true;
 try{await buildFromServer(force)}
 catch(e){console.warn('pull',e);if(force)toast('No se pudo actualizar. Revisa tu conexión')}
 finally{pulling=false;if(pullAgain&&!pushing&&!dirty){pullAgain=false;setTimeout(()=>pullAll(),300)}}
}
async function buildFromServer(force){
 const mem=await sb.from('members').select('class_id,role').eq('user_id',authUid);
 if(mem.error)throw mem.error;
 const myRole={},ids=(mem.data||[]).map(m=>{myRole[m.class_id]=m.role;return m.class_id});
 const L=r=>(r&&!r.error&&r.data)||[];
 let out=[];
 if(ids.length){
  const inn=t=>sb.from(t).select('*').in('class_id',ids);
  const [cl,mm,tp,ev,sc,ph,po,co,wk,su,ms,tk,fv]=await Promise.all([
   sb.from('classes').select('*').in('id',ids),inn('members'),inn('topics'),inn('events'),inn('schedule'),inn('photos'),inn('posts'),inn('comments'),inn('work'),inn('submissions'),
   sb.from('messages').select('*').in('class_id',ids).order('created_at',{ascending:false}).limit(400),
   sb.from('my_tasks').select('*').eq('user_id',authUid),sb.from('photo_favs').select('photo_id').eq('user_id',authUid)]);
  if(cl.error)throw cl.error;if(mm.error)throw mm.error;
  const uids=[...new Set(L(mm).map(m=>m.user_id))];
  const pr=await sb.from('profiles').select('id,name,emoji,color,bio,photo_path').in('id',uids);
  const P={};L(pr).forEach(p=>{P[p.id]=p});
  await signUrls(CF,[...L(wk).flatMap(w=>Array.isArray(w.files)?w.files.map(f=>f.p):[]),...L(su).flatMap(x=>Array.isArray(x.files)?x.files.map(f=>f.p):[]),...L(ms).map(m=>m.file_path),...L(po).map(p=>p.image_path),...L(ph).map(p=>p.image_path),...L(cl).flatMap(c=>[c.icon_path,c.banner_path])]);
  await signUrls(AV,Object.values(P).map(p=>p.photo_path));
  const favs=new Set(L(fv).map(f=>f.photo_id));
  out=L(cl).map(row=>{
   const cid=row.id,mine=x=>x.class_id===cid;
   const mrows=L(mm).filter(mine).sort((a,b)=>(a.role==='admin'?0:1)-(b.role==='admin'?0:1)||String(a.joined_at).localeCompare(String(b.joined_at)));
   const names={},used=new Set();
   [authUid,...mrows.map(m=>m.user_id)].forEach(u=>{if(names[u]||!P[u]&&u!==authUid)return;let n=u===authUid?user:cap((P[u]||{}).name),k=n,i=2;while(used.has(k.toLowerCase()))k=n+' ('+i++ +')';used.add(k.toLowerCase());names[u]=k});
   const nm=u=>names[u]||'?';
   const members=mrows.map(m=>{const p=P[m.user_id]||{};return {mu:!!m.muted,id:m.user_id,u:m.user_id,n:nm(m.user_id),r:RL[m.role]||'Alumno',e:p.emoji||'',c:p.color||'#008cff',b:p.bio||'',ph:urlOf(AV,p.photo_path)}});
   const _tp={},topics=L(tp).filter(mine).map(t=>{_tp[t.name]=t.id;return t.name});
   const tname={};Object.entries(_tp).forEach(([n,id])=>{tname[id]=n});
   const comments={};L(co).filter(mine).sort((a,b)=>String(a.created_at).localeCompare(String(b.created_at))).forEach(k=>{(comments[k.post_id]=comments[k.post_id]||[]).push({id:k.id,n:nm(k.author_id),au:k.author_id,t:k.body,ts:Date.parse(k.created_at)})});
   const posts=L(po).filter(mine).map(p=>({id:p.id,n:nm(p.author_id),au:p.author_id,t:p.body,ts:Date.parse(p.created_at),pin:!!p.pinned,img:urlOf(CF,p.image_path),_p:p.image_path||null,comments:comments[p.id]||[]}));
   const subs={};L(su).filter(mine).forEach(s=>{(subs[s.work_id]=subs[s.work_id]||{})[nm(s.student_id)]={rs:(s.rscores&&typeof s.rscores==='object'&&!Array.isArray(s.rscores))?s.rscores:{},thread:Array.isArray(s.thread)?s.thread:[],ret:s.returned!==false,files:Array.isArray(s.files)?s.files:[],id:s.id,st:s.status,ts:Date.parse(s.submitted_at),comment:s.comment||'',answer:s.answer||'',grade:s.grade==null?null:+s.grade,fb:s.feedback||''}});
   const work=L(wk).filter(mine).map(w=>({rub:Array.isArray(w.rubric)?w.rubric:[],dueTime:w.due_time||'',opts:Array.isArray(w.options)?w.options:[],pubAt:w.publish_at?Date.parse(w.publish_at):0,assg:Array.isArray(w.assignees)?w.assignees:[],files:Array.isArray(w.files)?w.files:[],id:w.id,type:w.type,title:w.title,desc:w.description||'',topic:w.topic_id?(tname[w.topic_id]||''):'',due:w.due||'',pts:w.points==null?null:+w.points,link:w.link||'',ts:Date.parse(w.created_at),by:w.created_by,subs:subs[w.id]||{}}));
   const mmap={};const msgsAll=L(ms).filter(mine).slice().reverse();msgsAll.forEach(m=>{mmap[m.id]=m});
   const messages=msgsAll.map(m=>{const q=m.reply_to&&mmap[m.reply_to];return {id:m.id,n:nm(m.author_id),au:m.author_id,me:m.author_id===authUid?1:0,ts:Date.parse(m.created_at),type:m.type,t:m.body||'',src:urlOf(CF,m.file_path),_p:m.file_path||null,dur:m.duration||0,...(q?{reply:{id:q.id,n:q.author_id===authUid?'Tú':nm(q.author_id),t:q.type==='audio'?'🎤 Nota de voz':q.type==='image'?'📷 Foto':(q.body||'').slice(0,70)}}:{})}});
   const photos=L(ph).filter(mine).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at))).map(p=>({id:p.id,au:p.author_id,i:p.icon||'📷',t:p.title,s:p.subtitle,g:p.tag,img:urlOf(CF,p.image_path),_p:p.image_path||null,fav:favs.has(p.id)}));
   return {id:cid,owner:row.owner_id,name:row.name,code:row.code,role:RL[myRole[cid]]||'Alumno',emoji:row.emoji||'📚',color:row.color||'#008cff',desc:row.description||'',meet:row.meet_url||'',archived:!!row.archived,
    perm:{post:!!row.perm_post,comment:row.perm_comment!==false,chat:row.perm_chat!==false},icon:urlOf(CF,row.icon_path),banner:urlOf(CF,row.banner_path),_pi:row.icon_path||null,_pb:row.banner_path||null,_tp,
    data:{members,topics,events:L(ev).filter(mine).map(e=>({id:e.id,i:e.icon||'📄',t:e.title,s:e.detail||'Sin detalle',d:e.date,by:e.created_by})),sched:L(sc).filter(mine).map(x=>({id:x.id,t:x.subject,day:x.day,h:String(x.time||'08:00').slice(0,5),r:x.room||''})),
     photos,posts,work,messages,tasks:L(tk).filter(mine).map(t=>({id:t.id,t:t.title,d:t.due||'',done:!!t.done}))}};
  });
 }
 window.__lastSync=Date.now();
 const sig=JSON.stringify(out);
 if(!force&&sig===lastSig&&classes.length===out.length)return;
 lastSig=sig;
 const keepId=(classes[cur]&&classes[cur].id)||window.__curId;
 classes=out;snap={};classes.forEach(c=>{snap[c.id]=rowsOf(c)});
 let i=classes.findIndex(c=>c.id===keepId);if(i<0)i=Math.max(0,classes.findIndex(c=>!c.archived));
 cur=i;if(classes.length){setCur(cur);syncMe()}
 if($('classShell').classList.contains('visible'))renderAll();
}
function subscribe(){
 try{if(rt)sb.removeChannel(rt);rt=sb.channel('unuvia-rt');
  ['messages','posts','comments','work','submissions','events','schedule','members','photos','topics','classes'].forEach(t=>rt.on('postgres_changes',{event:'*',schema:'public',table:t},schedPull));
  rt.subscribe()}catch(e){console.warn(e)}
}
function schedPull(){clearTimeout(pullT);pullT=setTimeout(()=>pullAll(),500)}
setInterval(()=>{if(cloudOn&&document.visibilityState==='visible')pullAll()},30000);
document.addEventListener('visibilitychange',()=>{if(cloudOn&&document.visibilityState==='visible')pullAll()});

/* Clases: crear, unirse, salir */
async function selectClassById(id){const i=classes.findIndex(c=>c.id===id);if(i>=0){setCur(i);renderAll()}return i}
async function cloudCreate(o){
 toast('Creando clase…');
 const {data,error}=await sb.rpc('create_class',{p_name:o.name,p_emoji:o.emoji,p_color:o.color,p_desc:o.desc||''});
 if(error){toastErr('No se pudo crear la clase: '+(error.message||'error'));return}
 const row=Array.isArray(data)?data[0]:data;
 await pullAll(true);
 const i=classes.findIndex(c=>c.id===row.id);
 if(i>=0){const c=classes[i];if(o.icon)c.icon=o.icon;if(o.banner)c.banner=o.banner;setCur(i);renderAll();saveState();confetti();if(!settings.toured)setTimeout(showTour,700)}
}
async function cloudJoin(code){
 toast('Buscando la clase…');
 const {data,error}=await sb.rpc('join_class',{p_code:code});
 if(error){toastErr(/válido/i.test(error.message||'')?'Ese código no es válido. Revísalo con quien te lo dio.':'No se pudo unir: '+(error.message||'error'));return}
 const row=Array.isArray(data)?data[0]:data;
 await pullAll(true);await selectClassById(row.id);closeModal();toast('¡Te has unido a la clase!');confetti();
}


const PRK='unuvia_pending_review';
async function pullReviews(){try{if(!sb)return;const {data,error}=await sb.from('reviews').select('rating,body,created_at').order('created_at',{ascending:false}).limit(200);if(error||!data)return;rvMem=data.map(r=>({n:r.rating,t:r.body||'',d:Date.parse(r.created_at)})).reverse();renderReviews()}catch(e){}}
function queueReview(r){try{localStorage.setItem(PRK,JSON.stringify({n:r.n,t:r.t}))}catch(e){}if(authUid)flushReview()}
async function flushReview(){try{const raw=localStorage.getItem(PRK);if(!raw||!sb||!authUid)return;const r=JSON.parse(raw);const {error}=await sb.from('reviews').upsert({user_id:authUid,rating:r.n,body:r.t||''},{onConflict:'user_id'});if(!error){localStorage.removeItem(PRK);pullReviews()}}catch(e){}}

const THEME_SW=(id,big)=>`<label class="theme-switch${big?' big':''}" aria-label="Cambiar entre tema claro y oscuro"><input class="theme-switch__checkbox" type="checkbox"${id?' id="'+id+'"':''}><div class="theme-switch__container"><div class="theme-switch__clouds"></div><div class="theme-switch__stars-container"><svg fill="none" viewBox="0 0 144 55" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></div><div class="theme-switch__circle-container"><div class="theme-switch__sun-moon-container"><div class="theme-switch__moon"><div class="theme-switch__spot"></div><div class="theme-switch__spot"></div><div class="theme-switch__spot"></div></div></div></div><div class="theme-switch__shooting-star"></div><div class="theme-switch__shooting-star-2"></div><div class="theme-switch__meteor"></div><div class="theme-switch__stars-cluster"><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div></div><div class="theme-switch__aurora"></div><div class="theme-switch__comets"><div class="comet"></div><div class="comet"></div></div></div></label>`;
/* Tema por dispositivo: 'auto' (sigue el del móvil), 'light' o 'dark'. Se guarda solo en este dispositivo. */
let __themePref=null;
const sysDark=()=>!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
function getPref(){if(__themePref)return __themePref;let v=null;try{v=localStorage.getItem('unuvia_theme')}catch(e){}return(v==='light'||v==='dark')?v:'auto'}
function setPref(v){__themePref=v;try{if(canStore()||true)localStorage.setItem('unuvia_theme',v)}catch(e){}}
function applyPref(){const p=getPref();settings.light=p==='light'||(p==='auto'&&!sysDark());applyTheme()}
try{const mq=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)');if(mq){const f=()=>{if(getPref()==='auto')applyPref()};mq.addEventListener?mq.addEventListener('change',f):mq.addListener&&mq.addListener(f)}}catch(e){}
function syncTheme(){document.querySelectorAll('.theme-switch__checkbox').forEach(c=>{c.checked=!settings.light});const au=document.getElementById('optAuto');if(au)au.checked=getPref()==='auto'}
document.addEventListener('change',e=>{const c=e.target;if(!c||!c.classList||!c.classList.contains('theme-switch__checkbox'))return;
 setPref(c.checked?'dark':'light');applyPref();saveState()});

/* ===================== AVISOS: móvil + correo + centro ===================== */
const VAPID_PUBLIC='BEYRczjUtIaaJmhMhffDg85MqWus5rLypaws6ApfdilPy79lnw6LPpbwF-h_KOpsrACvDs3NgcaBYFeqEUa5W2c';
const NP_DEF={push:true,email:true,cats:{anuncio:{push:true,email:true},trabajo:{push:true,email:true},evento:{push:true,email:true},nota:{push:true,email:true},recordatorio:{push:true,email:true},comentario:{push:true,email:false},chat:{push:false,email:false},entrega:{push:true,email:false},miembro:{push:true,email:false}}};
const NCATS=[['anuncio','megaphone','Anuncios del profesor',0],['trabajo','pencil','Tareas, preguntas y materiales',0],['evento','calendar','Eventos nuevos',0],['nota','award','Notas y correcciones',0],['recordatorio','alarm','Recordatorio de entregas',0],['comentario','chat','Comentarios en tus anuncios',0],['chat','chat','Mensajes del chat',0],['entrega','inbox','Entregas de alumnos',1],['miembro','users','Nuevos miembros y cambios de rol',1]];
const KIND_IC={anuncio:'📣',trabajo:'📝',evento:'📅',nota:'🏅',entrega:'📥',comentario:'💬',chat:'💭',miembro:'👥',recordatorio:'⏰',prueba:'✅'};
let notifPrefs=null,notifs=[],notifCh=null,swReg=null;
const ago=ts=>{const s=(Date.now()-Date.parse(ts))/1000;if(s<60)return 'ahora';if(s<3600)return Math.floor(s/60)+' min';if(s<86400)return Math.floor(s/3600)+' h';return new Date(ts).toLocaleDateString('es-ES',{day:'numeric',month:'short'})};
function mergePrefs(p){const o=JSON.parse(JSON.stringify(NP_DEF));if(p){if(typeof p.push==='boolean')o.push=p.push;if(typeof p.email==='boolean')o.email=p.email;Object.entries(p.cats||{}).forEach(([k,v])=>{o.cats[k]=Object.assign(o.cats[k]||{push:true,email:false},v)})}return o}
async function loadNotifPrefs(){notifPrefs=mergePrefs(null);try{const {data}=await sb.from('notif_prefs').select('prefs').eq('user_id',authUid).maybeSingle();if(data)notifPrefs=mergePrefs(data.prefs)}catch(e){}}
let npT=null;
function saveNotifPrefs(){clearTimeout(npT);npT=setTimeout(async()=>{try{const {error}=await sb.from('notif_prefs').upsert({user_id:authUid,prefs:notifPrefs,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error}catch(e){toast('No se pudieron guardar tus avisos')}},400)}
/* --- avisos al móvil (Web Push) --- */
const pushSupported=()=>('serviceWorker' in navigator)&&('PushManager' in window)&&('Notification' in window);
const isStandalone=()=>(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
const isIOS=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const b64ToU8=b=>{const p='='.repeat((4-b.length%4)%4),r=atob((b+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...r].map(c=>c.charCodeAt(0)))};
async function registerSW(){try{if('serviceWorker' in navigator&&location.protocol==='https:'){swReg=await navigator.serviceWorker.register('sw.js');navigator.serviceWorker.addEventListener('message',e=>{if(e.data&&e.data.type==='open')openUrl(e.data.url)})}}catch(e){console.warn('sw',e)}}
async function pushState(){
 if(isIOS()&&!isStandalone())return 'ios-install';
 if(!pushSupported())return 'unsupported';
 if(Notification.permission==='denied')return 'denied';
 try{const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();return sub&&Notification.permission==='granted'?'on':'off'}catch(e){return 'off'}
}
function installHelp(){return ask({icon:'📲',title:'Instala Unuvia en tu móvil',text:isIOS()?'iPhone: 1) Toca Compartir en Safari. 2) Elige «Añadir a pantalla de inicio». 3) Abre Unuvia desde el nuevo icono. Los avisos del móvil solo funcionan así.':'Android: abre el menú ⋮ de Chrome y elige «Instalar app» o «Añadir a la pantalla de inicio». iPhone: Compartir → «Añadir a pantalla de inicio».',ok:'Entendido'})}
async function enablePush(){
 const st=await pushState();
 if(st==='ios-install'){await installHelp();return}
 if(st==='unsupported'){toast('Este navegador no permite avisos al móvil');return}
 if(st==='denied'){toast('Los avisos están bloqueados: actívalos en los ajustes del navegador o del móvil');return}
 try{
  const perm=await Notification.requestPermission();
  if(perm!=='granted'){toast('No has dado permiso para los avisos');return}
  if(!swReg)swReg=await navigator.serviceWorker.register('sw.js');
  const reg=await navigator.serviceWorker.ready;
  let sub=await reg.pushManager.getSubscription();
  if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64ToU8(VAPID_PUBLIC)});
  const j=sub.toJSON();
  const {error}=await sb.from('push_subscriptions').upsert({user_id:authUid,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth,ua:navigator.userAgent.slice(0,200)},{onConflict:'endpoint'});
  if(error)throw error;
  toast('¡Avisos activados en este dispositivo!');
 }catch(e){console.warn(e);toast('No se pudieron activar los avisos')}
 refreshNotifPage();
}
async function disablePush(){try{const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();if(sub){const ep=sub.endpoint;await sub.unsubscribe();await sb.from('push_subscriptions').delete().eq('endpoint',ep)}toast('Avisos desactivados en este dispositivo')}catch(e){toast('No se pudo desactivar')}refreshNotifPage()}
async function syncPushSub(){try{if(!pushSupported()||Notification.permission!=='granted')return;const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();if(!sub)return;const j=sub.toJSON();await sb.from('push_subscriptions').upsert({user_id:authUid,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth,ua:navigator.userAgent.slice(0,200)},{onConflict:'endpoint'})}catch(e){}}
async function removePushRow(){try{if(!pushSupported())return;const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();if(sub&&sb)await sb.from('push_subscriptions').delete().eq('endpoint',sub.endpoint)}catch(e){}}
/* --- centro de avisos --- */
async function loadNotifs(){try{const {data}=await sb.from('notifications').select('*').order('created_at',{ascending:false}).limit(60);notifs=data||[]}catch(e){notifs=[]}paintBell()}
const unreadN=()=>notifs.filter(n=>!n.read_at).length;
function paintBell(){const b=$('bellBtn'),d=$('bellDot');if(!b)return;const n=unreadN();b.classList.toggle('has',n>0);if(d)d.textContent=n>9?'9+':String(n||'')}
function subscribeNotifs(){try{if(notifCh)sb.removeChannel(notifCh);notifCh=sb.channel('unuvia-notifs').on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications',filter:'user_id=eq.'+authUid},p=>{const n=p.new;if(!n)return;onNotifIn(n)}).subscribe()}catch(e){}}
function onNotifIn(n){notifs.unshift(n);paintBell();if($('modal').classList.contains('show')&&mType==='notifs')$('modalFields').innerHTML=notifsHTML();if(document.visibilityState==='visible')toast(n.title+(n.body?' — '+n.body:''))}
function notifsHTML(){
 const head='<div class="nt-bar"><button type="button" class="mini-btn" onclick="markAllRead()">Marcar todo como leído</button><button type="button" class="mini-btn" onclick="modal(\'settings\');settingsPage(\'notif\')">Ajustes de avisos</button></div>';
 if(!notifs.length)return head+'<div class="empty">Aún no tienes avisos. Cuando un profesor publique algo, aparecerá aquí.</div>';
 return head+notifs.map(n=>`<button type="button" class="nt-item${n.read_at?'':' unread'}" onclick="openNotif('${n.id}')"><span class="nt-ic">${KIND_IC[n.kind]||'🔔'}</span><span class="nt-t"><b>${esc(n.title)}</b><small>${esc(n.body)}</small><em>${ago(n.created_at)}</em></span></button>`).join('');
}
function openNotifs(){modal('notifs')}
async function markRead(ids){const now=new Date().toISOString();notifs.forEach(n=>{if(ids.includes(n.id)&&!n.read_at)n.read_at=now});paintBell();try{await sb.from('notifications').update({read_at:now}).in('id',ids)}catch(e){}}
function openNotif(id){const n=notifs.find(x=>x.id===id);if(!n)return;markRead([id]);closeModal();openUrl(n.url)}
async function markAllRead(){const ids=notifs.filter(n=>!n.read_at).map(n=>n.id);if(!ids.length)return;await markRead(ids);$('modalFields').innerHTML=notifsHTML()}
function openUrl(u){try{const x=new URL(u||'/',location.origin),c=x.searchParams.get('c'),t=x.searchParams.get('t');if(!$('classShell').classList.contains('visible'))return;if(c){const i=classes.findIndex(k=>k.id===c);if(i>=0&&i!==cur){setCur(i);renderAll()}}if(t&&['Inicio','Calendario','Trabajo','Horario','Ahora','Notas','Personas','Chat'].includes(t))goTab(t)}catch(e){}}
function handleDeepLink(){const q=location.search;if(!q)return;if(/[?&]c=/.test(q))openUrl(location.href);try{history.replaceState(null,'',location.pathname)}catch(e){}}

/* ===== invitación a activar los avisos (Inicio) ===== */
let PUSH_ST=null;
async function refreshPushBanner(){try{PUSH_ST=await pushState()}catch(e){PUSH_ST=null}try{renderStream()}catch(e){}}
function pushBannerHTML(){if(settings.pushNag||!['off','ios-install'].includes(PUSH_ST))return '';const ios=PUSH_ST==='ios-install';
 return `<div class="push-ban"><svg class="ulm pb-ulm" viewBox="0 0 474 542" aria-hidden="true"><use href="#ul-mark" width="474" height="542"/></svg><div class="pb-t"><b>${ios?'Recibe avisos en tu iPhone':'Activa los avisos'}</b><small>${ios?'Instala Unuvia en tu pantalla de inicio y te avisaré de tareas, notas y anuncios.':'Te avisaré de tareas nuevas, notas y anuncios aunque tengas la app cerrada.'}</small><div class="pb-b"><button type="button" class="add" onclick="${ios?'installHelp()':'enablePush().then(refreshPushBanner)'}">${ios?'Cómo instalarla':'Activar avisos'}</button><button type="button" class="pb-x" onclick="settings.pushNag=1;saveState();renderStream()">Ahora no</button></div></div></div>`}
async function sendTestNotif(){const {error}=await sb.rpc('send_test_notification');toast(error?'No se pudo enviar la prueba. ¿Has ejecutado el SQL de notificaciones?':'Prueba enviada: llega en unos segundos')}
/* --- página de ajustes: Notificaciones --- */
function notifPageHTML(){
 const rows=NCATS.map(([k,ic,l,st])=>`<div class="np-row"><span class="np-l">${svgI(ic)}${l}${st?'<small>Para profesores</small>':''}</span>${SW('np_'+k+'_push')}${SW('np_'+k+'_email')}</div>`).join('');
 return glGrp('Este dispositivo','<div class="gl-text" id="npStatus">Comprobando…</div><div id="npBtns"></div><div class="gl-sub" id="npHelp"></div>')
  +glGrp('Recibir',row('Avisos en el móvil','np_master_push')+row('Avisos por correo','np_master_email')+'<div class="gl-sub">Interruptores generales de tu cuenta. Abajo eliges qué avisos quieres en cada canal.</div>')
  +glGrp('Qué avisos quieres','<div class="np-head"><span></span><span>Móvil</span><span>Correo</span></div>'+rows)
  +glGrp('Con la web abierta',row('Avisos del navegador de entregas próximas','optNotif')+'<div class="gl-sub">Aviso de entregas y eventos que llegan pronto, mientras tienes Unuvia abierta.</div>'+seg('remDays',[[1,'1 día'],[2,'2 días'],[3,'3 días'],[7,'1 semana']],settings.remDays||1))
  +'<button type="button" class="gl-btn soft" onclick="sendTestNotif()">Enviar una notificación de prueba</button>';
}
function bindNotifPage(){
 const P=notifPrefs||(notifPrefs=mergePrefs(null));
 const set=(id,get,put)=>{const e=$(id);if(!e)return;e.checked=!!get();e.onchange=ev=>{put(ev.target.checked);saveNotifPrefs();paintNotifPage()}};
 set('np_master_push',()=>P.push,v=>{P.push=v});set('np_master_email',()=>P.email,v=>{P.email=v});
 NCATS.forEach(([k])=>{set('np_'+k+'_push',()=>P.cats[k].push,v=>{P.cats[k].push=v});set('np_'+k+'_email',()=>P.cats[k].email,v=>{P.cats[k].email=v})});
 paintNotifPage();refreshNotifPage();
}
function paintNotifPage(){const P=notifPrefs;if(!P)return;NCATS.forEach(([k])=>{const a=$('np_'+k+'_push'),b=$('np_'+k+'_email');if(a)a.disabled=!P.push;if(b)b.disabled=!P.email})}
async function refreshNotifPage(){
 const el=$('npStatus');if(!el)return;const st=await pushState();
 el.textContent={on:'Avisos activados en este dispositivo',off:'Avisos desactivados en este dispositivo',denied:'El navegador tiene los avisos bloqueados',unsupported:'Este navegador no admite avisos al móvil','ios-install':'Instala Unuvia en tu pantalla de inicio para recibir avisos'}[st]||'';el.className='gl-text np-st '+st;
 const b=$('npBtns');if(b)b.innerHTML=st==='on'?'<button type="button" class="gl-btn soft" onclick="disablePush()">Desactivar en este dispositivo</button>':(st==='off'?'<button type="button" class="gl-btn" onclick="enablePush()">Activar avisos en este dispositivo</button>':(st==='ios-install'?'<button type="button" class="gl-btn" onclick="installHelp()">Cómo instalar la app</button>':''));
 const h=$('npHelp');if(h)h.textContent=st==='denied'?'Para volver a activarlos, permite las notificaciones de Unuvia en los ajustes del navegador o del móvil.':(st==='ios-install'?'En iPhone: Compartir → Añadir a pantalla de inicio. Abre Unuvia desde ese icono y vuelve aquí.':'');
}

let otpMethod='';
let otpEmail='',otpBusy=false;
function otpErrorMsg(e){const m=((e&&e.message)||'').toLowerCase();
 if(e&&e.status===429||m.includes('rate')||m.includes('seconds'))return 'Has pedido demasiados códigos. Espera un minuto e inténtalo de nuevo.';
 if(m.includes('invalid')&&m.includes('email'))return 'Ese correo no es válido.';
 if(m.includes('expired')||m.includes('invalid')||m.includes('token'))return 'El código no es correcto o ha caducado. Pide uno nuevo.';
 if(m.includes('fetch')||m.includes('network')||m.includes('load failed'))return 'No se pudo conectar con el servidor ('+((e&&e.message)||'sin detalle')+'). Si abriste el archivo suelto desde el móvil, tiene que estar publicado en una dirección web.';
 return 'No se pudo completar. Detalle: '+((e&&e.status)||'')+' '+((e&&e.code)||'')+' '+((e&&e.message)||'sin detalle')}
async function sendOtp(type){
  if(type==='mobile'){toastErr('El acceso por móvil no está disponible. Usa tu correo.');return}
  if(!sb){toastErr('No se pudo cargar el servicio de acceso. Recarga la página.');return}
  const email=$('emailInput').value.trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toastErr('Escribe un correo válido.');return}
  if(otpBusy)return;otpBusy=true;otpMethod='email';
  const b=$('emailOtpButton'),t=b.textContent;b.textContent='Enviando…';b.disabled=true;
  try{
    const {error}=await sb.auth.signInWithOtp({email,options:{shouldCreateUser:true}});
    if(error)throw error;
    otpEmail=email;
    $('otpLabel').textContent='Te hemos enviado un código a '+email;clearOtpInputs();otpClearErr();otpCooldown(60);showOtpStep();
  }catch(e){toastErr(otpErrorMsg(e))}
  finally{otpBusy=false;b.textContent=t;b.disabled=false}
}

function getOtpCode(){
  return ['otp-input1','otp-input2','otp-input3','otp-input4','otp-input5','otp-input6']
    .map(id=>$(id)?.value||'').join('');
}
function clearOtpInputs(){
  document.querySelectorAll('.otp-input').forEach(i=>i.classList.remove('filled','pop'));
  ['otp-input1','otp-input2','otp-input3','otp-input4','otp-input5','otp-input6']
    .forEach(id=>{ if($(id)) $(id).value=''; });
  $('otp-input1')?.focus();
}

/* ===== Paso del código: la tarjeta del correo sale y entra la del código (con Nuvia y su sobre) ===== */
function showOtpStep(){const card=document.querySelector('.login-card'),f=$('authForm'),box=$('otpBox');if(!card||!box)return;
 const go=()=>{f&&f.classList.remove('leaving');card.classList.add('otp-mode');$('login')&&$('login').classList.add('otp-on');box.classList.remove('hidden');box.classList.remove('ok');const c=$('otpBoxes');if(c)c.classList.remove('ok');setTimeout(()=>$('otp-input1')?.focus(),380)};
 if(card.classList.contains('otp-mode')){go();return}
 if(f&&!document.documentElement.classList.contains('calm')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){f.classList.add('leaving');setTimeout(go,260)}else go()}
function resetOtpStep(){const card=document.querySelector('.login-card');if(card)card.classList.remove('otp-mode');$('login')&&$('login').classList.remove('otp-on');$('otpBox')?.classList.add('hidden');$('otpBoxes')?.classList.remove('ok')}
function hideOtpStep(){const card=document.querySelector('.login-card'),f=$('authForm');if(card)card.classList.remove('otp-mode');$('login')&&$('login').classList.remove('otp-on');$('otpBox')?.classList.add('hidden');if(f){f.classList.remove('leaving');f.classList.add('back');setTimeout(()=>f.classList.remove('back'),500)}}
document.addEventListener('input',e=>{const i=e.target;if(!i.classList||!i.classList.contains('otp-input'))return;i.classList.toggle('filled',!!i.value);if(i.value){i.classList.remove('pop');void i.offsetWidth;i.classList.add('pop')}});
async function verifyOtp(){
  const code=getOtpCode();
  if(code.length!==6){otpShowErr('Escribe el código completo de 6 dígitos.');return}
  if(!sb||!otpEmail){otpShowErr('Primero pide un código a tu correo.');return}
  if(otpBusy)return;otpBusy=true;
  const btn=document.querySelector('#otpForm .verifyButton'),bt=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent='Comprobando…'}
  try{
    const {data,error}=await sb.auth.verifyOtp({email:otpEmail,token:code,type:'email'});
    if(error)throw error;
    const ob=$('otpBoxes');if(ob){ob.classList.add('ok')}if(btn)btn.textContent='¡Dentro!';
    await new Promise(r=>setTimeout(r,700));
    await afterLogin((data.session&&data.session.user)||data.user);
    resetOtpStep();
  }catch(e){otpShowErr(otpErrorMsg(e))}
  finally{otpBusy=false;if(btn){btn.disabled=false;btn.textContent=bt}}
}
async function afterLogin(u){
 if(!u||!sb)return;authUid=u.id;authEmail=u.email||'';
 try{const r=localStorage.getItem(SKEY);if(r){const st=JSON.parse(r);if(st&&st.uid===u.id){if(st.settings)settings=Object.assign(settings,st.settings);window.__curId=st.curId||null}}}catch(e){}
 applyPref();
 let p=null;try{const r=await sb.from('profiles').select('*').eq('id',u.id).maybeSingle();p=r.data}catch(e){}
 user=cap((p&&p.name)||(u.email||'Alumno').split('@')[0]);
 if(p){settings.emoji=p.emoji||'';settings.avatar=p.color||settings.avatar;settings.bio=p.bio||'';
  await signUrls(AV,[p.photo_path,p.banner_path]);
  settings.photo=urlOf(AV,p.photo_path);settings._pp=p.photo_path||null;settings._ppUp=settings.photo;
  settings.banner=urlOf(AV,p.banner_path);settings._pbn=p.banner_path||null;settings._pbUp=settings.banner;
  profSnap=JSON.stringify({name:user,emoji:settings.emoji,color:settings.avatar||'#008cff',bio:settings.bio,photo_path:settings._pp,banner_path:settings._pbn})}
 await Promise.all([checkFilesCol(),checkCr2(),checkT7()]);
 await pullAll(true);cloudOn=true;subscribe();setTimeout(refreshPushBanner,1500);flushReview();applyTheme();
 await loadNotifPrefs();loadNotifs();subscribeNotifs();syncPushSub();
 enter(user);handleDeepLink();setTimeout(joinFromLink,400);
}
/* Esta versión solo entra con correo + código */
const ap=$('appleLogin');if(ap)ap.style.display='none';
const gg=$('googleLogin');if(gg){gg.style.width='100%';gg.style.flex='1 1 100%';gg.style.justifyContent='center'}
document.querySelectorAll('.login-mode-switch,.auth-method-note').forEach(e=>e.style.display='none');
document.querySelectorAll('.p.line').forEach(e=>e.textContent='o continúa con');



/* OTP de 6 casillas */
const otpIds=['otp-input1','otp-input2','otp-input3','otp-input4','otp-input5','otp-input6'];
let otpCdT=null;
function otpClearErr(){const e=$('otpErr');if(e){e.textContent='';e.classList.remove('show')}}
function otpShowErr(msg){const e=$('otpErr');if(e){e.textContent=msg;e.classList.add('show')}const c=$('otpBoxes');if(c){c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake')}clearOtpInputs();$('otp-input1')?.focus()}
function otpFill(start,digits){digits=(digits||'').replace(/\D/g,'').slice(0,6-start);if(!digits)return;digits.split('').forEach((c,j)=>{const el=$(otpIds[start+j]);if(el)el.value=c});$(otpIds[Math.min(start+digits.length,5)])?.focus();otpClearErr();if(getOtpCode().length===6)setTimeout(verifyOtp,60)}
function otpCooldown(sec){const b=$('resendOtp');if(!b)return;clearInterval(otpCdT);let n=sec;const tick=()=>{if(n<=0){clearInterval(otpCdT);b.disabled=false;b.textContent='Reenviar código';return}b.disabled=true;b.textContent='Reenviar en '+n+' s';n--};tick();otpCdT=setInterval(tick,1000)}
otpIds.forEach((id,i)=>{
  const input=$(id);if(!input)return;
  input.addEventListener('focus',()=>{try{input.select()}catch(e){}});
  input.addEventListener('input',e=>{
    const v=e.target.value.replace(/\D/g,'');
    if(v.length>1){e.target.value='';otpFill(v.length===6?0:i,v);return}   // autorrelleno del iPhone o pegado en un cuadro
    e.target.value=v;otpClearErr();
    if(v&&i<otpIds.length-1)$(otpIds[i+1])?.focus();
    if(getOtpCode().length===6)setTimeout(verifyOtp,60);
  });
  input.addEventListener('keydown',e=>{
    if(e.key==='Backspace'&&!e.target.value&&i>0){e.preventDefault();const p=$(otpIds[i-1]);p.value='';p.focus()}
    if(e.key==='ArrowLeft'&&i>0){e.preventDefault();$(otpIds[i-1])?.focus()}
    if(e.key==='ArrowRight'&&i<otpIds.length-1){e.preventDefault();$(otpIds[i+1])?.focus()}
  });
  input.addEventListener('paste',e=>{
    const t=(e.clipboardData?.getData('text')||'').replace(/\D/g,'');
    if(t.length){e.preventDefault();otpFill(t.length>=6?0:i,t)}
  });
});
$('otpForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  verifyOtp();
});
$('otpClose')?.addEventListener('click',()=>{
  hideOtpStep();
  clearOtpInputs();setTimeout(()=>$('emailInput')?.focus(),300);
});
$('resendOtp')?.addEventListener('click',()=>{
  if(!otpMethod||$('resendOtp').disabled){ return; }
  const type=otpMethod;
  sendOtp(type);
  clearOtpInputs();
});


/* Login visual Uiverse: correo y móvil siguen usando el OTP real de la demo */
$('emailOtpButton')?.addEventListener('click',()=>sendOtp('email'));
$('mobileOtpButton')?.addEventListener('click',()=>sendOtp('mobile'));
$('googleLogin')?.addEventListener('click',async()=>{
  if(!sb){toastErr('No se pudo cargar el servicio de acceso. Recarga la página.');return}
  const b=$('googleLogin');b.disabled=true;
  try{const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname,queryParams:{prompt:'select_account'}}});if(error)throw error}
  catch(e){b.disabled=false;toastErr('No se pudo iniciar con Google. Inténtalo de nuevo o usa tu correo.')}
});
$('appleLogin')?.addEventListener('click',()=>toastErr('Inicio con Apple: disponible cuando conectemos el backend.'));


/* Selector Uiverse para los modos de acceso */
document.querySelectorAll('input[name="loginMode"]').forEach(radio=>{
  radio.addEventListener('change',()=>{
    const mode=radio.value;
    document.querySelectorAll('.login-method-panel').forEach(panel=>panel.classList.remove('active'));
    const panel=$(mode+'LoginPanel');
    if(panel) panel.classList.add('active');
  });
});
$('localLoginButton')?.addEventListener('click',()=>{
  const name=$('localName')?.value.trim();
  if(!name){
    toastErr('Escribe tu nombre primero.');
    $('localName')?.focus();
    return;
  }
  enter(name);
});


document.querySelectorAll('input[name="loginMode"]').forEach(r=>r.addEventListener('change',()=>{hideOtpStep()}));
$('authForm').addEventListener('submit',e=>{e.preventDefault();document.querySelector('.login-method-panel.active .button-submit')?.click()});
/* Sesión guardada: una vez iniciada, no vuelve a salir inicio ni login */
const SKEY='mariotools_session';const LOWPERF=/Android/i.test(navigator.userAgent)&&(((navigator.deviceMemory||8)<=4)||((navigator.hardwareConcurrency||8)<=4));
const DEFSET={accent:'#008cff',glass:true,contrast:false,bold:false,spaced:false,bigtap:false,links:false,remDays:1,enterSend:true,chatTime:true,chatNames:true,chatSize:'m',weekStart:'mon',startTab:'Inicio',sortPosts:'pin',showPast:true,photoQ:'mid',notif:false,calm:false,zoomOK:true,grid:20,text:100};
let settings=Object.assign({light:false,toured:false,avatar:'#008cff',emoji:'',bio:'',photo:'',banner:''},DEFSET);
function saveState(){schedulePush();if(!canStore())return;try{localStorage.setItem(SKEY,JSON.stringify({v:3,user,uid:authUid,curId:(classes[cur]||{}).id||null,settings:Object.assign({},settings)}))}catch(e){}}
function restoreSession(){try{const r=localStorage.getItem(SKEY);if(!r)return;const st=JSON.parse(r);if(!st||!st.user)return;
 if(st.v===2){classes=st.classes||[];cur=st.cur||0;settings=Object.assign(settings,st.settings||{})}
 else if(st.hasClass){classes=[{name:st.cls||'Mi clase',code:st.code||'MT-0000',role:st.role||'Administrador',data:Object.assign(blank(),{events:st.events||[],photos:st.photos||[],messages:st.messages||[],members:[{n:st.user,r:st.role||'Administrador'}]})}]}
 applyTheme();enter(st.user)}catch(e){}}
async function logout(){if(!await ask({icon:'👋',title:'¿Cerrar sesión?',text:'Se cerrará tu sesión en este dispositivo. Tus clases siguen guardadas en tu cuenta.',ok:'Cerrar sesión',danger:true}))return;await removePushRow();try{if(sb)await sb.auth.signOut()}catch(e){}try{localStorage.removeItem(SKEY)}catch(e){}location.reload()}
/* El botón de salir termina de desplegarse y, justo después, aparece el aviso */
function logoutAnim(b){if(!b){logout();return}b.classList.add('go');setTimeout(()=>{logout().finally(()=>b.classList.remove('go'))},650)}
/* Reseñas en la pantalla principal */
const RKEY='mariotools_reviews';let rvMem=[],rvStars=0;
try{rvMem=JSON.parse(localStorage.getItem(RKEY))||[]}catch(e){}
function renderReviews(){
 const r=rvMem,avg=r.length?r.reduce((a,x)=>a+x.n,0)/r.length:0;
 $('rvMeta').textContent=r.length?avg.toFixed(1)+' ★ · '+r.length+(r.length===1?' reseña':' reseñas'):'Sé el primero en valorar';
 $('rvList').innerHTML=r.slice(-3).reverse().map(x=>`<div class="rv-item"><span class="rv-stars">${'★'.repeat(x.n)}${'☆'.repeat(5-x.n)}</span>${x.t?`<span class="rv-text">${esc(x.t)}</span>`:''}</div>`).join('');
}
document.querySelectorAll('input[name="star-radio"]').forEach(i=>i.addEventListener('change',()=>{rvStars=+i.value;$('rvForm').classList.remove('hidden')}));
function toggleReviews(on){$('rvBack').classList.toggle('hidden',!on);$('reviews').classList.toggle('hidden',!on)}
function sendReview(){
 if(!rvStars)return;
 rvMem.push({n:rvStars,t:$('rvText').value.trim().slice(0,80),d:Date.now()});queueReview(rvMem[rvMem.length-1]);
 if(canStore()){try{localStorage.setItem(RKEY,JSON.stringify(rvMem))}catch(e){}}
 $('rvText').value='';$('rvForm').classList.add('hidden');rvStars=0;
 document.querySelectorAll('input[name="star-radio"]').forEach(i=>i.checked=false);
 toggleReviews(false);renderReviews();$('rvMeta').textContent='¡Gracias por tu reseña!';setTimeout(renderReviews,2200);
}
/* Cookies necesarias */
const CKEY='mariotools_cookies';
let ckOK=false;function canStore(){if(ckOK)return true;try{return localStorage.getItem(CKEY)==='ok'}catch(e){return false}}
function showCookies(){if(!canStore())setTimeout(()=>{$('ckBack')?.classList.add('show');$('ckCard')?.classList.add('show')},300)}
function acceptCookies(){
 ckOK=true;try{localStorage.setItem(CKEY,'ok')}catch(e){}
 $('ckCard').classList.remove('show');$('ckBack').classList.remove('show');
 if($('classShell').classList.contains('visible'))saveState();
 try{localStorage.setItem(RKEY,JSON.stringify(rvMem))}catch(e){}
}
function declineCookies(){}
renderReviews();
$('themeSlot').innerHTML=THEME_SW('themeSw');applyPref();
const endNT=()=>document.documentElement.classList.remove('no-trans');setTimeout(endNT,350);try{requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(endNT,120)))}catch(e){}
window.addEventListener('pageshow',()=>applyPref());window.addEventListener('load',()=>applyPref());

/* ===== el logo mueve los ojos: mira a su alrededor, parpadea, sigue tu dedo y guiña al tocarlo ===== */
(function(){
 const L=document.getElementById('ul-eyeL'),R=document.getElementById('ul-eyeR');if(!L||!R)return;
 const cL=[256,646],cR=[368,644],MX=18,MY=12;
 let bigC=null,bigT=0,x=0,y=0,tx=0,ty=0,blinkAt=0,blinkN=0,winkAt=0,nextBlink=performance.now()+2500,nextGlance=performance.now()+1800,holdUntil=0,ptr=null;
 const still=()=>document.documentElement.classList.contains('calm')||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 const closed=(t0,t,dur)=>{const k=(t-t0)/dur;return k<0||k>1?0:(k<.5?k*2:(1-k)*2)};
 const tf=(c,sy)=>`translate(${x.toFixed(2)} ${y.toFixed(2)}) translate(${c[0]} ${c[1]}) scale(1 ${sy.toFixed(3)}) translate(${-c[0]} ${-c[1]})`;
 function logoRect(){let best=null;document.querySelectorAll('svg.ulm').forEach(e=>{const r=e.getBoundingClientRect();if(r.width<30||r.height<30||r.bottom<0||r.top>innerHeight)return;if(!best||r.width>best.width)best=r});return best}
 const GL=[[-1,0],[1,0],[0,-.8],[-.8,.7],[.8,.7],[1,-.5],[-1,-.5]];
 function frame(t){
  requestAnimationFrame(frame);
  if(document.hidden)return;
  if(still()){if(x||y){x=y=0;L.removeAttribute('transform');R.removeAttribute('transform')}return}
  if(document.body.classList.contains('in-app'))return;
  if(t-bigT>400){bigC=logoRect();bigT=t}
  const big=bigC;if(!big)return;
  if(ptr&&t-ptr.t<2600){
   const r=big;
   if(r){const cx=r.left+r.width/2,cy=r.top+r.height*.55,dx=ptr.x-cx,dy=ptr.y-cy,dist=Math.hypot(dx,dy)||1,k=Math.min(1,dist/160);tx=dx/dist*MX*k;ty=dy/dist*MY*k}
  }else{
   if(t>nextGlance){const sp=!!document.getElementById('splash'),g=GL[Math.floor(Math.random()*GL.length)];tx=g[0]*MX;ty=g[1]*MY;holdUntil=t+(sp?450:900)+Math.random()*(sp?350:900);nextGlance=t+(sp?950:2600)+Math.random()*(sp?700:2600)}
   if(t>holdUntil&&holdUntil){tx=0;ty=0;holdUntil=0}
  }
  if(t>nextBlink){blinkAt=t;blinkN=Math.random()<.22?1:0;nextBlink=t+3200+Math.random()*3200}
  let b=closed(blinkAt,t,150);if(blinkN&&t>blinkAt+200)b=Math.max(b,closed(blinkAt+200,t,150));
  const w=closed(winkAt,t,520);
  x+=(tx-x)*.2;y+=(ty-y)*.2;
  L.setAttribute('transform',tf(cL,1-.92*Math.max(b,w)));
  R.setAttribute('transform',tf(cR,1-.92*b));
 }
 requestAnimationFrame(frame);
 const mv=e=>{ptr={x:e.clientX,y:e.clientY,t:performance.now()}};
 window.addEventListener('pointermove',mv,{passive:true});window.addEventListener('pointerdown',mv,{passive:true});
 document.addEventListener('click',e=>{const el=e.target.closest&&e.target.closest('.welcome-logo,.login-logo,.splash-logo,.brand-ic');if(el){winkAt=performance.now();el.style.animation='none';el.offsetWidth;el.style.animation=''}});
})();



/* ===== Iconos de interfaz: un único set de línea (estilo Lucide, 24px, trazo 2) ===== */
const ICO={
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
 pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 clip:'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
 help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 megaphone:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 sparkles:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>',
 check:'<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
 crown:'<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/>',
 cap:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
 star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
 backpack:'<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M8 14h8M8 18h8"/>',
 archive:'<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
 palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
 phone:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
 share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4M12 2v13"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
 bug:'<rect x="8" y="6" width="8" height="14" rx="4"/><path d="m19 7-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/>',
 cookie:'<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
 chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
 camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
 lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 rotate:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
 inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
 pin:'<path d="M12 17v5"/><path d="M9 10.76V6h6v4.76a2 2 0 0 0 1.11 1.79l1.78.9A2 2 0 0 1 19 15.24V17H5v-1.76a2 2 0 0 1 1.11-1.79l1.78-.9A2 2 0 0 0 9 10.76z"/><path d="M8 2h8"/>',
 alarm:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3"/>',
 wave:'<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'};
const EMO2={'📄':'file','📝':'pencil','📎':'clip','❓':'help','🕘':'clock','📣':'megaphone','📅':'calendar','✨':'sparkles','✅':'check','👑':'crown','🎓':'cap','⭐':'star','🎒':'backpack','📦':'archive','🎨':'palette','🗑':'trash','🚪':'logout','📲':'phone','📤':'share','✉':'mail','🐞':'bug','🍪':'cookie','🏅':'award','💬':'chat','👥':'users','📸':'camera','📷':'camera','🔒':'lock','↺':'rotate','👋':'wave'};
const svgI=n=>'<svg class="ui-i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICO[n]+'</svg>';
function iconize(root){
 const R=root||document,norm=t=>(t||'').replace(/\uFE0F/g,'').trim();
 R.querySelectorAll('.icon,.wk-ic,#askIc,#tourE,.noclass-icon,.rl-ic').forEach(el=>{if(el.querySelector('svg'))return;const k=norm(el.textContent);if(EMO2[k])el.innerHTML=svgI(EMO2[k])});
 R.querySelectorAll('.gl-btn,.secondary,.mini-btn,.nz-item span,.popup-window li,.bsel-val,.rbadge,.wv-meta,.cs-foot button').forEach(el=>{const n=el.firstChild;if(!n||n.nodeType!==3)return;const m=/^\s*(\S)\uFE0F?\s+/u.exec(n.nodeValue);if(!m||!EMO2[m[1]])return;n.nodeValue=n.nodeValue.slice(m[0].length);el.insertAdjacentHTML('afterbegin',svgI(EMO2[m[1]]))});
}
/* Accesibilidad: todo campo sin etiqueta recibe un nombre accesible (placeholder o rótulo anterior) */
function labelize(root){(root||document).querySelectorAll('input:not([type=hidden]):not([aria-label]):not([aria-labelledby]),textarea:not([aria-label]),select:not([aria-label])').forEach(e=>{if(e.id&&document.querySelector('label[for="'+e.id+'"]'))return;if(e.closest('label'))return;let t=e.placeholder||'';for(let n=e,k=0;n&&!t&&k<3;n=n.parentElement,k++){let p=n.previousElementSibling;while(p&&!t){if(p.classList&&p.classList.contains('fl'))t=p.textContent.trim();p=p.previousElementSibling}}if(!t&&e.type==='date')t='Fecha';if(!t&&e.type==='time')t='Hora';if(t)e.setAttribute('aria-label',t.replace(/…$/,''))})}
(function(){let tm=null;const run=()=>{tm=null;labelize()};try{new MutationObserver(()=>{try{iconize()}catch(e){}if(!tm)tm=setTimeout(run,250)}).observe(document.body,{childList:true,subtree:true})}catch(e){}try{iconize()}catch(e){}run()})();

/* Estado de la conexión: aviso discreto y sincronización al volver */
const NB_NUVIA='<span class="nb-nuvia" aria-hidden="true"><svg class="ulm nb-ulm" viewBox="0 0 474 542"><use href="#ul-mark" width="474" height="542"/></svg><span class="nb-badge">';
const NB_WIFI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01M8.5 16.43a5 5 0 0 1 7 0M5 12.86a10 10 0 0 1 5.17-2.69M19 12.86a10 10 0 0 0-2.01-1.45M2 8.82a15 15 0 0 1 4.18-2.65M22 8.82a15 15 0 0 0-11.29-3.76M2 2l20 20"/></svg>';
const NB_OK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
function nbHTML(off){return NB_NUVIA+(off?NB_WIFI:NB_OK)+'</span></span><span class="nb-txt"><b>'+(off?'Sin conexión':'¡Conexión recuperada!')+'</b><small>'+(off?'Nuvia busca señal… tus cambios se enviarán al volver':'Todo vuelve a sincronizarse')+'</small></span>'}
function netState(first){const bar=$('netBar');if(!bar)return;if(!navigator.onLine){bar.innerHTML=nbHTML(true);bar.className='netbar off show'}else if(!first){bar.innerHTML=nbHTML(false);bar.className='netbar on show';setTimeout(()=>bar.classList.remove('show'),2600);try{if(cloudOn){pullAll(true);if(dirty&&!pushing)pushAll()}}catch(e){}}}
window.addEventListener('online',()=>netState(false));window.addEventListener('offline',()=>netState(false));netState(true);
registerSW();
pullReviews();
(async()=>{try{if(!sb)return;const {data}=await sb.auth.getSession();if(data&&data.session)await afterLogin(data.session.user);sb.auth.onAuthStateChange(ev=>{if(ev==='SIGNED_OUT'&&cloudOn)location.reload()})}catch(e){console.warn(e)}finally{authReady()}})();
