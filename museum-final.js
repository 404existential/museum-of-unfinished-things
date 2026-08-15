(()=>{
'use strict';
const q=s=>document.querySelector(s);
// Make anonymity part of the real submission flow, before the existing backend handler reads the form.
document.addEventListener('submit',e=>{if(e.target?.id!=='submitForm')return;const f=e.target;if(f.querySelector('input[name="anonymous"]')?.checked){const name=f.querySelector('input[name="username"]');if(name)name.value='Anonymous';}},true);
// Prevent filtered counts from pretending to be the size of the collection.
setInterval(()=>{const n=window.artifacts?.length;if(typeof n==='number'){q('#artifactCount')&&(q('#artifactCount').textContent=n);q('#statRecords')&&(q('#statRecords').textContent=n)}},800);
// Replace the old clock helper text if an older script re-inserts it.
setInterval(()=>{const x=document.querySelector('#clockDate')?.nextElementSibling;if(x&&/visitor.*local browser/i.test(x.textContent||''))x.remove()},500);
})();