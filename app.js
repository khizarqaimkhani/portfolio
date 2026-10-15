(function(){
  let VIDEOS = window.VIDEOS || [];
  const PLAY = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z"/></svg>';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const poster = v => v.poster || (v.drive ? `https://drive.google.com/thumbnail?id=${v.drive}&sz=w1000` : '');

  function card(v, i){
    const img = `<img src="${esc(poster(v))}" alt="" loading="lazy" style="object-position:${esc(v.posterPos || 'center')}">`;
    if (v.link){
      return `<a class="clip" href="${esc(v.link)}" target="_blank" rel="noopener">
        <div class="poster">${img}<span class="pbtn">${PLAY}</span></div>
        <h3>${esc(v.title)}</h3><span class="cat">Instagram reel · ${esc(v.views)} views</span></a>`;
    }
    return `<button type="button" class="clip" data-i="${i}" aria-label="Play ${esc(v.title)}">
      <div class="poster">${img}<span class="pbtn">${PLAY}</span></div>
      <h3>${esc(v.title)}</h3><span class="cat">${esc(v.category)}${v.duration ? ' · ' + esc(v.duration) : ''}</span></button>`;
  }

  function render(el, list){
    el.innerHTML = list.map(v => card(v, VIDEOS.indexOf(v))).join('');
  }

  /* player */
  const player = document.getElementById('player');
  let lastFocus = null;
  function open(v){
    lastFocus = document.activeElement;
    player.querySelector('h3').textContent = v.title;
    player.querySelector('.sub').textContent = [v.client || v.category, v.about].filter(Boolean).join(' — ');
    const stage = player.querySelector('.pstage');
    if (v.video){
      stage.innerHTML = `<video controls autoplay playsinline poster="${esc(poster(v))}" src="${esc(v.video)}"></video>`;
    } else {
      stage.innerHTML = `<div class="frame${v.format === '16:9' ? ' land' : ''}" style="background-image:url('${esc(poster(v))}')"><iframe src="https://drive.google.com/file/d/${esc(v.drive)}/preview" allow="autoplay; fullscreen" allowfullscreen title="${esc(v.title)}"></iframe><span class="shield" aria-hidden="true"></span></div>`;
    }
    player.hidden = false;
    document.body.style.overflow = 'hidden';
    player.querySelector('.close').focus();
  }
  function close(){
    player.querySelector('.pstage').innerHTML = '';
    player.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  if (player){
    player.querySelector('.close').addEventListener('click', close);
    player.addEventListener('click', e => { if (e.target === player || e.target.classList.contains('pstage')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !player.hidden) close(); });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('button.clip[data-i]');
    if (b) open(VIDEOS[+b.dataset.i]);
  });

  /* automatic mode: drive.json is rebuilt from the Google Drive folder every few hours */
  async function loadDrive(){
    try {
      const res = await fetch('drive.json', {cache: 'no-store'});
      if (!res.ok) return;
      const data = await res.json();
      const files = data.files || [];
      if (!data.ok || !files.length) return;
      const known = new Set(VIDEOS.filter(v => v.drive).map(v => v.drive));
      const fresh = files.filter(f => !known.has(f.id))
        .sort((x, y) => (y.first_seen || '').localeCompare(x.first_seen || ''))
        .map(f => ({
          id: f.id, title: f.title, category: 'More Work', format: f.format || '9:16',
          about: '', drive: f.id, poster: f.poster || '', isNew: true
        }));
      const inDrive = new Set(files.map(f => f.id));
      const listed = VIDEOS.filter(v => v.drive && inDrive.has(v.drive));
      const reels = VIDEOS.filter(v => !v.drive);
      VIDEOS = [...fresh, ...listed, ...reels];
    } catch (e) { /* keep the list from videos.js */ }
  }

  function start(){
    /* home page: featured grid + counts */
    const featured = document.getElementById('featured');
    if (featured) render(featured, VIDEOS.filter(v => v.isNew || v.featured).slice(0, 6));
    document.querySelectorAll('[data-count]').forEach(el => { el.textContent = VIDEOS.length; });

    /* all-videos page: filters */
    const all = document.getElementById('all');
    if (!all) return;
    const filters = document.getElementById('filters');
    const cats = ['All', ...(window.CATEGORIES || [])].filter(c => c === 'All' || VIDEOS.some(v => v.category === c));
    let current = 'All';
    function draw(){
      filters.innerHTML = cats.map(c => {
        const n = c === 'All' ? VIDEOS.length : VIDEOS.filter(v => v.category === c).length;
        return `<button type="button" class="chip" aria-pressed="${c === current}" data-c="${esc(c)}">${esc(c)}<span>${n}</span></button>`;
      }).join('');
      render(all, current === 'All' ? VIDEOS : VIDEOS.filter(v => v.category === current));
    }
    filters.addEventListener('click', e => {
      const c = e.target.closest('.chip');
      if (!c) return;
      current = c.dataset.c;
      draw();
    });
    draw();

    /* open a video straight from a link like videos.html#esl */
    function fromHash(){
      const key = decodeURIComponent(location.hash.slice(1));
      if (!key) return;
      const v = VIDEOS.find(x => x.id === key || x.drive === key);
      if (!v || v.link) return;
      const el = all.querySelector(`[data-i="${VIDEOS.indexOf(v)}"]`);
      if (el) el.scrollIntoView({block: 'center'});
      open(v);
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  loadDrive().then(start);
})();
