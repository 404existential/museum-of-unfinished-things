/* Museum of Unfinished Things — public browser configuration. Never put a service_role key here. */
window.MOUT_CONFIG = {
  supabaseUrl: 'https://oyoacuakzwsvxmzcckot.supabase.co',
  supabaseAnonKey: 'sb_publishable_9E_Hf168dkeWJIQbhgHCKg_DEPsWQc7'
};
(function(){
  var css=document.createElement('link');css.rel='stylesheet';css.href='enhancements.css';document.head.appendChild(css);
  var s=document.createElement('script');s.src='enhancements.js';s.onload=function(){var p=document.createElement('script');p.src='finalpatch.js';p.onload=function(){var u=document.createElement('script');u.src='museum-upgrade.js';document.body.appendChild(u)};document.body.appendChild(p)};document.body.appendChild(s);
})();
