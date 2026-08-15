(() => {
  // Small compatibility cleanup for the rebuilt frontend.
  // Profile pictures belong only to Create Identity, never to Leave a record.
  const submitAvatar = document.querySelector('#submitModal .avatar-field');
  if (submitAvatar) submitAvatar.remove();

  const style = document.createElement('style');
  style.textContent = '.toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,15px);z-index:200;background:var(--ink);color:var(--paper);padding:11px 15px;font:.65rem var(--mono);text-transform:uppercase;opacity:0;pointer-events:none;transition:.2s ease}.toast.show{opacity:1;transform:translate(-50%,0)}';
  document.head.appendChild(style);
})();
