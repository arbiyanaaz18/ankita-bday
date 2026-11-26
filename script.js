
(function(){
'use strict';

var $=function(s){return document.querySelector(s)};
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

/* ---------- pink satin bow ---------- */
var BOW='<svg viewBox="0 0 100 70" aria-hidden="true"><defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbb4cb"/><stop offset="1" stop-color="#e2668f"/></linearGradient></defs>'+
'<g class="tl"><path d="M46 36 L30 66 L41 61 L47 69 L54 38Z" fill="url(#sg)" stroke="#c2557c" stroke-width="1.2"/></g>'+
'<g class="tr"><path d="M54 36 L70 66 L59 61 L53 69 L46 38Z" fill="url(#sg)" stroke="#c2557c" stroke-width="1.2"/></g>'+
'<g class="ll"><path d="M48 34 C28 6 4 4 5 26 C6 46 32 44 48 34Z" fill="url(#sg)" stroke="#c2557c" stroke-width="1.2"/><path d="M44 33 C30 20 16 18 14 26" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/></g>'+
'<g class="lr"><path d="M52 34 C72 6 96 4 95 26 C94 46 68 44 52 34Z" fill="url(#sg)" stroke="#c2557c" stroke-width="1.2"/><path d="M56 33 C70 20 84 18 86 26" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/></g>'+
'<g class="kn"><ellipse cx="50" cy="35" rx="8" ry="9" fill="url(#sg)" stroke="#c2557c" stroke-width="1.2"/></g></svg>';

$$('[data-bow]').forEach(function(el){
el.innerHTML=BOW;
});

$$('[data-bow]').forEach(function(el,i){
if(i>0){var d=el.querySelector('defs');if(d)d.remove();}
});

/* ---------- floating butterflies ---------- */
(function(){
var fx=$('#fx'),items=['🦋','✨','🌸','🎀','🦋','💗','✨'];
for(var i=0;i<14;i++){
var s=document.createElement('span');
s.textContent=items[i%items.length];
s.style.left=(Math.random()*95)+'%';
s.style.fontSize=(14+Math.random()*16)+'px';
s.style.animationDuration=(14+Math.random()*16)+'s';
s.style.animationDelay=(-Math.random()*20)+'s';
s.style.setProperty('--dx',(Math.random()*160-80)+'px');
fx.appendChild(s);
}
})();

/* ---------- screens ---------- */
function show(id){
$$('.screen').forEach(function(s){
s.classList.toggle('active',s.id===id);
});
}

/* ---------- music ---------- */
var bgm=$('#bgm'),hbd=$('#hbd'),muted=false,wantBgm=false;

bgm.src='lullaby.mp3';
hbd.src='happybirthday.mp3';

bgm.volume=.5;
hbd.volume=.8;

function playBgm(){
wantBgm=true;
if(!muted)bgm.play().catch(function(){});
}

$('#sound').addEventListener('click',function(){
muted=!muted;
this.textContent=muted?'🔇':'🎵';
if(muted){
bgm.pause();
hbd.pause();
}else if(wantBgm){
bgm.play().catch(function(){});
}
});

$('#openBtn').addEventListener('click',function(){
playBgm();
show('envelope');
});

/* ---------- envelope ---------- */
var env=$('#env'),envBusy=false;

function openEnv(){
if(envBusy)return;
envBusy=true;
env.classList.add('open');
setTimeout(function(){show('letter')},2100);
}

env.addEventListener('click',openEnv);
env.addEventListener('keydown',function(e){
if(e.key==='Enter'||e.key===' '){
e.preventDefault();
openEnv();
}
});

/* ---------- letter ---------- */
var scroll=$('#scroll'),untied=false;

function untie(){
if(untied)return;
untied=true;
$('#scrollBow').classList.add('untied');
$('#letterHint').textContent='Unrolling your letter…';
setTimeout(function(){scroll.classList.add('open')},900);
setTimeout(function(){
$('#letterHint').textContent='Take your time reading ♡';
$('#albumBtn').classList.remove('hidden');
},3800);
}

$('#band').addEventListener('click',untie);
$('#scrollBow').addEventListener('click',untie);

$('#albumBtn').addEventListener('click',function(){
show('album');
});

/* ---------- album ---------- */
function pol(src,cap,r,t,vid,poster){
var m=vid?
'<video src="'+src+'" poster="'+poster+'" controls playsinline preload="metadata"></video>':
'<img src="'+src+'" alt="'+cap+'" loading="eager" decoding="async" onerror="this.style.display=\'none\';this.parentElement.classList.add(\'image-error\')">';
return '<figure class="pol" style="--r:'+r+'deg;--t:'+t+'deg;margin:0">'+m+'<figcaption class="cap">'+cap+'</figcaption></figure>';
}

function st(e,css){
return '<span class="st" style="'+css+'">'+e+'</span>';
}

var pages=[
{
c:'cover',
h:'<h2 class="script">Our Little<br>Scrapbook</h2><div class="bow big" style="width:110px;height:78px">'+BOW.replace(/sg/g,'sgc')+'</div><p>for Ankita, with love ♡</p><p style="font-size:18px">tap the arrow to turn the page</p>'+
st('🌸','top:18px;left:20px')+
st('🦋','top:24px;right:24px')+
st('✨','bottom:26px;left:30px')+
st('🌷','bottom:22px;right:26px')
},
{
h:pol('photo1.jpg','One of my favourite people.',-2,-5)+
st('🎀','top:14px;left:12px;font-size:32px')+
st('🦋','bottom:18px;right:18px')+
st('✨','top:40px;right:20px')
},
{
alt:1,
h:pol('photo2.jpg','A memory worth keeping ♡',2,4)+
st('🌸','top:12px;right:14px;font-size:32px')+
st('💗','bottom:16px;left:20px')+
st('✨','bottom:60px;right:14px')
},
{
h:pol('photo3.jpg','Us being us 😭',-2.5,-3)+
st('🎀','top:14px;right:16px;font-size:32px')+
st('🌷','bottom:14px;left:16px')+
st('🦋','top:60px;left:14px')
},
{
alt:1,
h:pol('photo4.jpg','Some moments never get old.',1.5,5)+
st('🌸','top:12px;left:14px;font-size:32px')+
st('💗','bottom:18px;right:20px')+
st('✨','top:70px;right:16px')
},
{
h:pol('photo3.jpg','My favourite chaos partner.',-1.5,-4)+
st('🎀','top:12px;left:16px;font-size:32px')+
st('🍰','bottom:16px;right:18px')+
st('✨','top:46px;right:16px')
},
{
alt:1,
row:1,
h:pol('clip1.mp4','Tap to play ▶',-3,-4,1,'clip1.jpg')+
pol('clip2.mp4','Tap to play ▶',3,4,1,'clip2.jpg')+
'<p style="width:100%;font:700 22px Caveat,cursive;margin:6px 0 0;color:#c2557c">moving memories ♡</p>'+
st('🌸','top:10px;left:14px')+
st('🦋','bottom:14px;right:18px')
},
{
wide:1,
h:pol('clip3.mp4','Some moments never get old.',-1.5,3,1,'clip3.jpg')+
st('🎀','top:14px;right:16px;font-size:32px')+
st('💗','bottom:16px;left:18px')
},
{
alt:1,
c:'endp',
h:'<h2 class="script" style="font-size:clamp(44px,12vw,60px);color:#c2557c;line-height:1.05">More memories<br>to come...</h2><p>there&rsquo;s one last surprise for you ♡</p><button class="btn page-btn" id="finalBtn">Open your birthday surprise 🎂</button>'+
st('🌸','top:20px;left:20px')+
st('🦋','top:24px;right:24px')+
st('🌷','bottom:24px;left:26px')+
st('✨','bottom:28px;right:28px')
}
];

var book=$('#book'),cur=0;

book.innerHTML=pages.map(function(p,i){
return '<div class="pg '+(p.alt?'alt ':'')+(p.row?'row ':'')+(p.wide?'wide ':'')+(p.c||'')+'" style="z-index:'+(pages.length-i)+'"><div class="pg-in">'+p.h+'</div></div>';
}).join('');

var pgs=$$('.pg');

function pauseAll(){
$$('video').forEach(function(v){v.pause()});
}

document.addEventListener('play',function(e){
if(e.target.tagName==='VIDEO')bgm.pause();
},true);

document.addEventListener('pause',function(e){
if(e.target.tagName==='VIDEO'&&!muted&&wantBgm&&$('#album').classList.contains('active')){
bgm.play().catch(function(){});
}
},true);

function render(){
pgs.forEach(function(p,i){
p.classList.toggle('turned',i<cur);
});
$('#pageNo').textContent=(cur+1)+' / '+pages.length;
$('#prev').disabled=cur===0;
$('#next').disabled=cur===pages.length-1;
}

function go(d){
var n=cur+d;
if(n<0||n>=pages.length)return;
pauseAll();
cur=n;
render();
}

$('#next').addEventListener('click',function(){go(1)});
$('#prev').addEventListener('click',function(){go(-1)});

var tx=null;

book.addEventListener('touchstart',function(e){
tx=e.touches[0].clientX;
},{passive:true});

book.addEventListener('touchend',function(e){
if(tx===null)return;
var dx=e.changedTouches[0].clientX-tx;
tx=null;
if(Math.abs(dx)>60)go(dx<0?1:-1);
});

document.addEventListener('keydown',function(e){
if($('#album').classList.contains('active')){
if(e.key==='ArrowRight')go(1);
if(e.key==='ArrowLeft')go(-1);
}
});

document.addEventListener('click',function(e){
if(e.target&&e.target.id==='finalBtn'){
pauseAll();
show('finale');
setTimeout(function(){burst(2500)},900);
}
});

render();

/* ---------- finale ---------- */
var cv=$('#confetti'),ctx=cv.getContext('2d'),parts=[],running=false;

function size(){
cv.width=innerWidth;
cv.height=innerHeight;
}

size();
addEventListener('resize',size);

function burst(ms){
var cols=['#f48fb1','#fbb4cb','#fff4e3','#e2668f','#ffd6e0','#f9c74f','#ffffff'];
for(var i=0;i<170;i++){
parts.push({
x:Math.random()*cv.width,
y:-20-Math.random()*cv.height*.4,
w:6+Math.random()*7,
h:9+Math.random()*9,
c:cols[i%cols.length],
vy:2+Math.random()*3.5,
vx:Math.random()*2-1,
r:Math.random()*6,
vr:Math.random()*.3-.15
});
}
if(!running){
running=true;
tick();
}
}

function tick(){
ctx.clearRect(0,0,cv.width,cv.height);
parts=parts.filter(function(p){return p.y<cv.height+30});
parts.forEach(function(p){
p.y+=p.vy;
p.x+=p.vx+Math.sin(p.y/30);
p.r+=p.vr;
ctx.save();
ctx.translate(p.x,p.y);
ctx.rotate(p.r);
ctx.fillStyle=p.c;
ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
ctx.restore();
});
if(parts.length)requestAnimationFrame(tick);
else{
running=false;
ctx.clearRect(0,0,cv.width,cv.height);
}
}

$('#blowBtn').addEventListener('click',function(){
$('#cake').classList.add('out');
this.classList.add('hidden');
if(!muted){
bgm.pause();
hbd.currentTime=0;
hbd.play().catch(function(){});
hbd.onended=function(){
if(!muted)bgm.play().catch(function(){});
};
}
burst(3000);
setTimeout(function(){burst(3000)},1400);
var w=$('#wishes');
w.classList.remove('hidden');
setTimeout(function(){
w.scrollIntoView({behavior:'smooth',block:'center'});
},500);
});

/* ---------- replay ---------- */
$('#replayBtn').addEventListener('click',function(){
pauseAll();
hbd.pause();
if(!muted)bgm.play().catch(function(){});
env.classList.remove('open');
envBusy=false;
scroll.classList.remove('open');
untied=false;
$('#scrollBow').classList.remove('untied');
$('#letterHint').textContent='Tap the bow to untie it ♡';
$('#albumBtn').classList.add('hidden');
cur=0;
render();
$('#cake').classList.remove('out');
$('#blowBtn').classList.remove('hidden');
$('#wishes').classList.add('hidden');
$('#finale').scrollTop=0;
parts=[];
show('welcome');
});

})();
