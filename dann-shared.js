(function(){
  var b=document.getElementById('dannTop');
  if(!b)return;
  function u(){b.classList.toggle('show',window.scrollY>600)}
  window.addEventListener('scroll',u,{passive:true});
  u();
  b.addEventListener('click',function(){
    var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0,behavior:r?'auto':'smooth'});
  });
})();
