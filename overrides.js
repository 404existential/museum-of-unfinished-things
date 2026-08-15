(() => {
  const pad=(n,l=2)=>String(n).padStart(l,'0');
  const dates=['07 JANUARY 2026','19 FEBRUARY 2026','03 MARCH 2026','26 MARCH 2026','14 APRIL 2026','29 MAY 2026','08 JUNE 2026','17 JULY 2026','02 AUGUST 2026'];
  const fragments={
    'A—001842':'Chapter Twelve\n\nThe room was quieter than he remembered and for several minutes he simply stood there trying to decide whether the letter had been written before or after the phone call because the dates in the notebook seemed to suggest both\n\nThere was another page after this one but it begins with a sentence that never gets finished',
    'A—002117':'The restaurant was going to be small enough that everyone could hear the kitchen\n\nThe first menu was twelve pages long which was probably the first indication that the restaurant was becoming something else\n\nThe lease was supposed to be signed on Monday and then',
    'A—004218':'The original idea was considerably smaller\n\nIt was supposed to solve one very specific problem and then disappear quietly into the background\n\nBy the third version it had acquired seventeen settings, a completely unnecessary account system and a folder called FINAL which was already the fourth FINAL folder\n\nThere was still one thing left to figure out, which was probably the thing that should have been figured out first\n',
    'A—006021':'Issue four\n\nThis week was supposed to be about cities but the notes keep becoming about memory instead\n\nThere are twelve paragraphs here and the final one begins with the sentence\n\nPerhaps the real problem is that we keep trying to finish',
    'A—009502':'PAGE 38\n\nThe door was open\n\nHe had spent thirty-seven pages trying to get there and now that it was open there was suddenly nothing written about what was inside\n\nThe next page is blank',
    'A—014106':'Entry 17\n\nThe cinema had two entrances although nobody agrees where the second one was\n\nThe photograph is missing\n\nThe next entry was supposed to be the bakery',
    'A—014337':'FINAL\nFINAL2\nFINAL-new\nFINAL-new-2\nFINAL-USE-THIS\n\nThe last file is named actually-final and contains a homepage with no navigation',
    'A—014811':'We started by filming the people preparing the documentary\n\nThen we filmed ourselves preparing to film them\n\nAt some point the camera was pointed at the empty chair and nobody remembered who was supposed to sit there'
  };
  function localDateFor(id){let n=[...String(id)].reduce((s,c)=>s+c.charCodeAt(0),0);return dates[n%dates.length]}
  window.addEventListener('load',()=>{
    if(window.base) window.base.forEach(a=>{if(!a.text)a.text=fragments[a.id]||`The notes for this record continue for several pages and then stop without explaining what was supposed to happen next\n\nThere is another page after this one but it is mostly blank`});
    if(typeof window.artifacts!=='undefined') window.artifacts.forEach(a=>{if(!a.lastWorked)a.lastWorked=localDateFor(a.id)});
    const count=()=>{const n=document.querySelector('#artifactCount'),s=document.querySelector('#statRecords');if(n)n.textContent=window.artifacts?.length||0;if(s)s.textContent=window.artifacts?.length||0};
    setTimeout(count,50);
    const clock=()=>{const d=new Date(),t=document.querySelector('#clockTime'),dt=document.querySelector('#clockDate');if(t)t.textContent=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;if(dt)dt.textContent=`${pad(d.getDate())} ${d.toLocaleString('en',{month:'long'}).toUpperCase()} ${d.getFullYear()}`};
    clock();setInterval(clock,37);
    const oldOpen=window.openArtifact;
    if(oldOpen) window.openArtifact=(id)=>{oldOpen(id);const a=window.artifacts?.find(x=>x.id===id);const text=document.querySelector('#modalText');if(text)text.textContent=fragments[id]||a?.text||a?.description||'No recovered text was supplied';const meta=document.querySelector('#modalMeta');if(meta&&a&&!meta.innerHTML.includes('Last recorded'))meta.innerHTML+=`<div><dt>Last recorded</dt><dd>${a.lastWorked||localDateFor(id)}</dd></div><div><dt>Contributor</dt><dd>${a.username||a.contributor||'Anonymous'}</dd></div>`};
    document.querySelectorAll('.modal-intro').forEach(x=>x.textContent='Published records are public. Your archive identity only helps you return to your own contributions');
  });
})();
