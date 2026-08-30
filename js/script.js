/* ---------- Mobile nav toggle ---------- */
(function(){
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', function(){
    const open = nav.classList.toggle('nav-open');
    if(open){
      nav.style.display='flex';
      nav.style.position='absolute';
      nav.style.top='76px';
      nav.style.left='0';
      nav.style.right='0';
      nav.style.flexDirection='column';
      nav.style.background='#faf5ef';
      nav.style.padding='20px 24px';
      nav.style.borderBottom='1px solid rgba(58,46,44,.08)';
    } else {
      nav.style.display='';
    }
  });
  nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(window.innerWidth<=980){ nav.style.display='none'; nav.classList.remove('nav-open'); }
    });
  });
})();

/* ---------- Canvas texture helpers ---------- */
function makeInviteTexture(){
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');

  // background
  const grad = ctx.createLinearGradient(0,0,512,512);
  grad.addColorStop(0,'#fdf9f4');
  grad.addColorStop(1,'#f2e3d8');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,512,512);

  // border
  ctx.strokeStyle = '#c3a05a';
  ctx.lineWidth = 6;
  ctx.strokeRect(24,24,464,464);
  ctx.strokeStyle = 'rgba(195,160,90,.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40,40,432,432);

  // heart mark
  ctx.fillStyle = '#a8595f';
  ctx.font = '54px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('♥', 256, 170);

  // names
  ctx.fillStyle = '#3a2e2c';
  ctx.font = 'italic 64px Georgia';
  ctx.fillText('Merve & Ahmet', 256, 270);

  ctx.font = '22px Georgia';
  ctx.fillStyle = '#6b5a56';
  ctx.fillText('sizi düğünlerine davet ediyor', 256, 310);

  ctx.font = '20px Georgia';
  ctx.fillStyle = '#a8595f';
  ctx.fillText('20 Temmuz 2026  ·  Samsun', 256, 400);

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function makeQRTexture(){
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0,256,256);
  ctx.fillStyle = '#2a2220';
  const cell = 16;
  // deterministic pseudo-random QR-like pattern
  let seed = 42;
  function rnd(){ seed = (seed*9301+49297)%233280; return seed/233280; }
  for(let y=0;y<256/cell;y++){
    for(let x=0;x<256/cell;x++){
      if(rnd() > 0.56) ctx.fillRect(x*cell,y*cell,cell-2,cell-2);
    }
  }
  // finder squares
  function finder(px,py){
    ctx.fillStyle = '#2a2220';
    ctx.fillRect(px,py,64,64);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px+10,py+10,44,44);
    ctx.fillStyle = '#2a2220';
    ctx.fillRect(px+20,py+20,24,24);
  }
  finder(10,10);
  finder(256-74,10);
  finder(10,256-74);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* ---------- 3D Scene ---------- */
(function(){
try{
  const canvas = document.getElementById('scene3d');
  if(!canvas || typeof THREE === 'undefined') return;

  const stage = canvas.parentElement;
  let width = stage.clientWidth, height = stage.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, width/height, 0.1, 100);
  camera.position.set(0, 0.4, 7.2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  // lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(4,5,6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc98d8d, 0.6);
  rim.position.set(-5,-2,-4);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  // --- invitation card ---
  const cardGeo = new THREE.BoxGeometry(2.7, 3.6, 0.06, 1, 1, 1);
  const inviteTex = makeInviteTexture();
  const cardMatFront = new THREE.MeshStandardMaterial({ map: inviteTex, roughness:.5, metalness:.05 });
  const cardMatSide = new THREE.MeshStandardMaterial({ color:0xe8d3ad, roughness:.6 });
  const card = new THREE.Mesh(cardGeo, [cardMatSide,cardMatSide,cardMatSide,cardMatSide,cardMatFront,cardMatSide]);
  card.position.set(-0.5,0,0);
  card.rotation.y = 0.25;
  group.add(card);

  // --- QR floating tile ---
  const qrGeo = new THREE.BoxGeometry(1.35,1.35,0.08);
  const qrTex = makeQRTexture();
  const qrMatFace = new THREE.MeshStandardMaterial({ map:qrTex, roughness:.4 });
  const qrMatSide = new THREE.MeshStandardMaterial({ color:0xffffff, roughness:.5 });
  const qr = new THREE.Mesh(qrGeo, [qrMatSide,qrMatSide,qrMatSide,qrMatSide,qrMatFace,qrMatSide]);
  qr.position.set(1.7, 1.1, 0.9);
  qr.rotation.set(0.15,-0.5,0.08);
  group.add(qr);

  // --- floating ring (wedding ring) ---
  const ringGeo = new THREE.TorusGeometry(0.42, 0.06, 24, 64);
  const ringMat = new THREE.MeshStandardMaterial({ color:0xc3a05a, metalness:0.85, roughness:0.25 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(1.55,-1.35,0.6);
  ring.rotation.set(1.3,0.2,0);
  group.add(ring);

  // --- soft petal particles ---
  const petals = new THREE.Group();
  const petalGeo = new THREE.CircleGeometry(0.06,8);
  const petalMat = new THREE.MeshBasicMaterial({ color:0xc98d8d, transparent:true, opacity:.55, side:THREE.DoubleSide });
  for(let i=0;i<26;i++){
    const p = new THREE.Mesh(petalGeo, petalMat);
    p.position.set((Math.random()-0.5)*6, (Math.random()-0.5)*5, (Math.random()-0.5)*4);
    p.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    petals.add(p);
  }
  scene.add(petals);

  // --- interaction: drag to rotate, auto-rotate otherwise ---
  let dragging = false, lastX=0, lastY=0;
  let targetRotY = 0.15, targetRotX = 0.05;
  let curRotY = targetRotY, curRotX = targetRotX;
  let autoRotate = true;

  function pointerDown(e){
    dragging = true; autoRotate = false;
    const p = e.touches ? e.touches[0] : e;
    lastX = p.clientX; lastY = p.clientY;
  }
  function pointerMove(e){
    if(!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - lastX, dy = p.clientY - lastY;
    lastX = p.clientX; lastY = p.clientY;
    targetRotY += dx * 0.006;
    targetRotX += dy * 0.006;
    targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
  }
  function pointerUp(){
    dragging = false;
    setTimeout(()=>{ if(!dragging) autoRotate = true; }, 2200);
  }

  canvas.addEventListener('mousedown', pointerDown);
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);
  canvas.addEventListener('touchstart', pointerDown, {passive:true});
  canvas.addEventListener('touchmove', pointerMove, {passive:true});
  canvas.addEventListener('touchend', pointerUp);

  function onResize(){
    width = stage.clientWidth; height = stage.clientHeight;
    if(!width || !height) return;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if(autoRotate){ targetRotY += 0.0026; }
    curRotY += (targetRotY - curRotY) * 0.08;
    curRotX += (targetRotX - curRotX) * 0.08;
    group.rotation.y = curRotY;
    group.rotation.x = curRotX;

    card.position.y = Math.sin(t*0.8) * 0.08;
    qr.position.y = 1.1 + Math.sin(t*1.1 + 1) * 0.12;
    qr.rotation.z = 0.08 + Math.sin(t*0.6)*0.05;
    ring.rotation.z = t*0.4;
    ring.position.y = -1.35 + Math.cos(t*0.9)*0.1;

    petals.children.forEach((p,i)=>{
      p.position.y -= 0.0032 + (i%5)*0.0004;
      p.rotation.z += 0.003;
      if(p.position.y < -2.6) p.position.y = 2.6;
    });

    renderer.render(scene, camera);
  }
  animate();
  onResize();
}catch(err){
  console.warn('3D sahne yüklenemedi, geri düşüş görseline geçiliyor:', err);
  const canvas = document.getElementById('scene3d');
  const stage = canvas && canvas.parentElement;
  if(stage){
    canvas.style.display = 'none';
    const hint = stage.querySelector('.drag-hint');
    if(hint) hint.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'stage-fallback';
    fallback.innerHTML = '<span>💌</span><p>Dijital Davetiye</p>';
    stage.appendChild(fallback);
  }
}
})();

/* ---------- Header shadow on scroll ---------- */
(function(){
  const header = document.getElementById('header');
  if(!header) return;
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 10) header.style.boxShadow = '0 8px 24px -18px rgba(58,46,44,.4)';
    else header.style.boxShadow = 'none';
  });
})();

/* Note: an earlier scroll-reveal animation was removed on purpose — it could
   leave content permanently invisible if a script error occurred anywhere
   above this point in the file. Content is always visible by default now. */
