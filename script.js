/* =====================================================
   Flipbook – plain JavaScript, no libraries needed.
   Works offline: just open index.html in a browser.
   ===================================================== */
(() => {
  'use strict';

  /* ---------- Settings (change these if you reuse this for another book) ---------- */
  const TOTAL     = 160;                 // number of page images in /pages
  const AR        = 515.88 / 728.52;     // page width / page height
  const PAGE_DIR  = 'pages/';            // pages/001.jpg, 002.jpg ...
  const THUMB_DIR = 'thumbs/';           // thumbs/001.jpg, 002.jpg ...
  const ZOOMS     = [1, 1.25, 1.5, 2, 2.5, 3];

  /* ---------- TABLE OF CONTENTS ----------
     t = title shown in the menu, p = flipbook page number (the image number in /pages),
     c = optional sub-topics (any depth). Keep pages in ascending order.
     NOTE: flipbook page = printed page number + 13 (from printed page 7 onward). */
  const TOC = [
    { t: "Cover", p: 1 },
    { t: "University Song", p: 3 },
    { t: "Vision & Mission of the University", p: 5 },
    { t: "University of Ruhuna Map", p: 6 },
    { t: "Contents", p: 7 },
    { t: "Vice Chancellor’s Message", p: 11 },
    { t: "Dean’s Message", p: 13 },
    { t: "Chapter 1 · University of Ruhuna", p: 15, c: [
      { t: "1.1. Introduction", p: 15 },
      { t: "1.2. Location of the University", p: 16 },
      { t: "1.3. Officers of the University", p: 16 },
      { t: "1.4. Contact Information of the University", p: 17, c: [
        { t: "1.4.1. Postal Addresses", p: 17 },
        { t: "1.4.2. Telephone and Fax Numbers of the University", p: 18 },
        { t: "1.4.3. Electronic Mail/Web", p: 19 },
        { t: "1.4.4. Internal Telephone Numbers", p: 19 }
      ]}
    ]},
    { t: "Chapter 2 · Faculty of Humanities and Social Sciences", p: 21, c: [
      { t: "2.1. Introduction", p: 21 },
      { t: "2.2. Vision of the Faculty", p: 21 },
      { t: "2.3. Mission of the Faculty", p: 22 },
      { t: "2.4. Faculty Officers", p: 22 },
      { t: "2.5. Degree Programmes", p: 22 },
      { t: "2.6. Sri Lanka Qualification Framework (SLQF)", p: 22 }
    ]},
    { t: "Chapter 3 · Academic Regulations and Procedures", p: 23 },
    { t: "Chapter 4 · Management Information System", p: 41, c: [
      { t: "4.1. Management Information System", p: 41 },
      { t: "4.2. Learning Management System", p: 41 },
      { t: "4.3. Zoom Facility", p: 42 }
    ]},
    { t: "Chapter 5 · Department of Economics", p: 43, c: [
      { t: "5.1. Introduction", p: 43 },
      { t: "5.2. Members of the Academic Staff", p: 43 },
      { t: "5.3. Bachelor of Arts Honours in Economics", p: 45 },
      { t: "5.4. Bachelor of Arts Honours in Social Statistics", p: 50 }
    ]},
    { t: "Chapter 6 · Department of English and Linguistics", p: 55, c: [
      { t: "6.1. Introduction", p: 55 },
      { t: "6.2. Members of the Academic Staff", p: 55 },
      { t: "6.3. Bachelor of Arts Honours in English", p: 56 }
    ]},
    { t: "Chapter 7 · Department of English Language Teaching", p: 59, c: [
      { t: "7.1. Introduction", p: 59 },
      { t: "7.2. Members of the Academic Staff", p: 59 }
    ]},
    { t: "Chapter 8 · Department of Geography", p: 61, c: [
      { t: "8.1. Introduction", p: 61 },
      { t: "8.2. Members of the Academic Staff", p: 61 },
      { t: "8.3. Bachelor of Arts Honours in Geography", p: 63 }
    ]},
    { t: "Chapter 9 · Department of History and Archaeology", p: 67, c: [
      { t: "9.1. Introduction", p: 67 },
      { t: "9.2. Members of the Academic Staff", p: 67 },
      { t: "9.3. Bachelor of Arts Honours in History", p: 69 },
      { t: "9.4. Bachelor of Arts Honours in Archaeology", p: 73 }
    ]},
    { t: "Chapter 10 · Department of Information Technology", p: 77, c: [
      { t: "10.1. Introduction", p: 77 },
      { t: "10.2. Members of the Academic Staff", p: 77 },
      { t: "10.3. Bachelor of Arts Honours in Information Technology", p: 78 }
    ]},
    { t: "Chapter 11 · Department of Pali and Buddhist Studies", p: 81, c: [
      { t: "11.1. Introduction", p: 81 },
      { t: "11.2. Members of the Academic Staff", p: 81 },
      { t: "11.3. Bachelor of Arts Honours in Buddhist Studies in Buddhist Culture", p: 82 },
      { t: "11.4. Bachelor of Arts Honours in Buddhist Studies in Buddhist Philosophy", p: 86 },
      { t: "11.5. Bachelor of Arts Honours in Pali", p: 89 }
    ]},
    { t: "Chapter 12 · Department of Public Policy", p: 93, c: [
      { t: "12.1. Introduction", p: 93 },
      { t: "12.2. Members of the Academic Staff", p: 93 },
      { t: "12.3. Bachelor of Arts Honours in Political Science", p: 94 }
    ]},
    { t: "Chapter 13 · Department of Sinhala", p: 97, c: [
      { t: "13.1. Introduction", p: 97 },
      { t: "13.2. Members of the Academic Staff", p: 97 },
      { t: "13.3. Bachelor of Arts Honours in Sinhala", p: 99 }
    ]},
    { t: "Chapter 14 · Department of Sociology", p: 103, c: [
      { t: "14.1. Introduction", p: 103 },
      { t: "14.2. Members of the Academic Staff", p: 103 },
      { t: "14.3. Bachelor of Arts Honours in Sociology", p: 105 }
    ]},
    { t: "Chapter 15 · Units & Centres", p: 109, c: [
      { t: "15.1. Centre for Modern Languages and Civilizations (CMLC)", p: 109 },
      { t: "15.2. Natural Disaster Information Centre (NDIC)", p: 109 },
      { t: "15.3. Career Guidance Unit (CGU)", p: 109 },
      { t: "15.4. Cultural Centre", p: 111 }
    ]},
    { t: "Chapter 16 · Library, University of Ruhuna", p: 117, c: [
      { t: "16.1. Introduction", p: 117 },
      { t: "16.2. Staff of the Library System", p: 117 },
      { t: "16.3. Library Opening Hours", p: 119 },
      { t: "16.4. Library Resource Collections", p: 122 },
      { t: "16.5. Sections of the Library", p: 122 },
      { t: "16.6. Organization of Library Materials (Library Resource Classification)", p: 123 },
      { t: "16.7. Library Catalogue", p: 124 },
      { t: "16.8. . Library Services", p: 125 },
      { t: "16.9. Membership of the Library", p: 126 },
      { t: "16.10. Borrowing Library Resources", p: 126 },
      { t: "16.11. General Guidelines", p: 127 }
    ]},
    { t: "Chapter 17 · Sports and Recreation", p: 129, c: [
      { t: "17.1. Department of Physical Education", p: 129 },
      { t: "17.2. Staff Department of Physical Education", p: 129 },
      { t: "17.3. Sports Facilities", p: 130, c: [
        { t: "17.3.1. Indoor Sports", p: 130 },
        { t: "17.3.2. Outdoor Sports", p: 130 },
        { t: "17.3.3. Inter-Faculty and Inter-University Tournaments", p: 131 },
        { t: "17.3.4. University Colors", p: 131 }
      ]}
    ]},
    { t: "Chapter 18 · Examinations", p: 137, c: [
      { t: "18.1. Examination Regulations", p: 137, c: [
        { t: "18.1.1. විභාග අපේක්ෂකයින් සඳහා නියෝග", p: 137 },
        { t: "18.1.2. විභාග අපේක්ෂකයන්ට උපදෙස්", p: 138 }
      ]},
      { t: "18.2. ස්වාධීන නිබන්ධය පිළියෙළ කළ යුතු ආකාරය", p: 139 }
    ]},
    { t: "Chapter 19 · Gold Medals and Awards", p: 145, c: [
      { t: "19.1. Gold Medals", p: 145, c: [
        { t: "19.1.1. Mallika De Mel Memorial Gold Medal", p: 145 },
        { t: "19.1.2. L.W.A. Weerasekara Memorial Gold Medal", p: 145 },
        { t: "19.1.3. Professor R.M. Ranaweera Banda Memorial Gold Medal", p: 145 },
        { t: "19.1.4. Ven. Professor Shaku Go Shin Gold Medal", p: 145 }
      ]},
      { t: "19.2. Vice Chancellor’s Award and List for Overall Performance", p: 147, c: [
        { t: "19.2.1. Application procedure", p: 147 },
        { t: "19.2.2. Eligibility requirements", p: 148 },
        { t: "19.2.3. Selection criteria", p: 148 }
      ]},
      { t: "19.3. Dean’s Awards", p: 150 }
    ]},
    { t: "Chapter 20 · Student Welfare Services", p: 151, c: [
      { t: "20.1. Hostel Facilities and Policy", p: 151 },
      { t: "20.2. Financial Assistance", p: 151, c: [
        { t: "20.2.1. Mahapola Higher Education Scholarships", p: 151 },
        { t: "20.2.2. Bursary Grants", p: 151 },
        { t: "20.2.3. Bursary Grants of the Ministry of Education", p: 152 },
        { t: "20.2.4. Other scholarships offered by the faculty", p: 152 }
      ]},
      { t: "20.3. Student Counselling Service", p: 153, c: [
        { t: "20.3.1. Student counselling service of the Faculty of Humanities and Social Sciences", p: 154 },
        { t: "20.3.3. Student Mentoring Service of the Faculty of Humanities and Social Sciences", p: 155 }
      ]},
      { t: "20.4. Health Services", p: 156, c: [
        { t: "20.4.3. Main Medical Centre", p: 156 },
        { t: "20.4.4. Psychological Counselling Centre", p: 156 },
        { t: "20.4.5. Medical tests for newcomers", p: 156 },
        { t: "20.4.6. Medical certificates", p: 156 },
        { t: "20.4.7. Ayurvedic Medical Centre", p: 157 }
      ]}
    ]},
    { t: "Chapter 21 · Students’ Unions and Societies", p: 159, c: [
      { t: "21.1. Introduction", p: 159 },
      { t: "21.2. Duties and responsibilities of the students’ unions", p: 159 },
      { t: "21.3. University Students’ Union", p: 159 },
      { t: "21.4. Faculty Students’ Union", p: 159 },
      { t: "21.5. Students’ Societies & Associations", p: 159 }
    ]}
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = reduceMotion ? 1 : 800;    // page-turn time in ms
  document.documentElement.style.setProperty('--dur', DUR + 'ms');

  /* ---------- Elements ---------- */
  const $ = (s) => document.querySelector(s);
  const stage = $('#stage'), sizer = $('#sizer'), book = $('#book');
  const blockLeft = $('#blockLeft'), blockRight = $('#blockRight');
  const slider = $('#slider'), pageInput = $('#pageInput');
  const btnPrev = $('#btnPrev'), btnNext = $('#btnNext');
  const btnZoomIn = $('#btnZoomIn'), btnZoomOut = $('#btnZoomOut'), zoomLabel = $('#zoomLabel');
  const btnFull = $('#btnFull'), btnView = $('#btnView'), btnPanel = $('#btnPanel');
  const panel = $('#panel'), thumbs = $('#thumbs'), toc = $('#toc'),
    tabToc = $('#tabToc'), tabPages = $('#tabPages'), app = $('.app'), backdrop = $('#backdrop');
  const btnPrevSide = $('#btnPrevSide'), btnNextSide = $('#btnNextSide');
  const isMobile = () => window.innerWidth < 900;

  $('#total').textContent = TOTAL;
  slider.max = TOTAL;

  /* ---------- State ---------- */
  let single = false;          // true = one page at a time (phones / portrait)
  let forced = null;           // 'single' | 'double' when the user picks a view
  let zoomIndex = 0;
  let zoom = 1;
  let leaves = [];             // [{ el, loaded }]
  let flipped = 0;             // how many leaves are turned to the left
  let maxFlipped = 0;
  let N = 0;                   // number of leaves
  let lastFlip = 0;
  let thumbsBuilt = false;
  let tocRows = [];            // [{ page, row, li }] in reading order
  let flipTimer = 0;
  const animating = new Set();

  const pad = (n) => String(n).padStart(3, '0');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const startPage = (() => {
    const m = /#(\d+)/.exec(location.hash);
    return m ? clamp(parseInt(m[1], 10), 1, TOTAL) : 1;
  })();

  /* ---------- Building the leaves ---------- */

  function makeFace(side, page) {
    const f = document.createElement('div');
    f.className = 'face ' + side;
    if (page) {
      const img = document.createElement('img');
      img.alt = 'Page ' + page;
      img.draggable = false;
      img.decoding = 'async';
      img.dataset.src = PAGE_DIR + pad(page) + '.jpg';
      f.appendChild(img);
    }
    return f;
  }

  function build() {
    book.querySelectorAll('.leaf').forEach((n) => n.remove());
    leaves = [];
    animating.clear();

    if (single) {
      // every page is its own leaf; the leaf turns away to the left
      N = TOTAL;
      maxFlipped = TOTAL - 1;
      for (let p = 1; p <= TOTAL; p++) leaves.push(makeLeaf(p, null));
    } else {
      // front = odd page, back = even page
      N = Math.ceil(TOTAL / 2);
      maxFlipped = N;
      for (let i = 0; i < N; i++) {
        const front = 2 * i + 1;
        const back = 2 * i + 2 <= TOTAL ? 2 * i + 2 : null;
        leaves.push(makeLeaf(front, back));
      }
    }
    leaves.forEach((l) => book.appendChild(l.el));
    book.classList.toggle('single', single);
  }

  function makeLeaf(front, back) {
    const el = document.createElement('div');
    el.className = 'leaf';
    el.appendChild(makeFace('front', front));
    el.appendChild(makeFace('back', back));
    return { el, loaded: false };
  }

  /* ---------- State -> DOM ---------- */

  function setZ() {
    leaves.forEach((l, i) => {
      if (animating.has(l)) return;
      l.el.style.zIndex = i < flipped ? i + 1 : N - i + 1;
    });
  }

  // only keep the leaves near the current page in the page (keeps it smooth)
  function updateWindow() {
    const show = single ? 4 : 3;
    const load = show + 3;
    leaves.forEach((l, i) => {
      const d = i - flipped;
      const near = d >= -show - 1 && d <= show;
      l.el.style.display = near || animating.has(l) ? '' : 'none';
      if (!l.loaded && d >= -load - 1 && d <= load) {
        l.el.querySelectorAll('img[data-src]').forEach((img) => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
        l.loaded = true;
      }
    });
  }

  function applyShift() {
    let shift = 0;
    if (!single && zoom === 1) {
      if (flipped === 0) shift = -25;                 // closed book: cover in the middle
      else if (flipped === maxFlipped) shift = 25;    // back cover in the middle
    }
    book.style.transform = shift ? 'translateX(' + shift + '%)' : '';
    blockLeft.style.opacity = flipped === 0 ? 0 : 1;
    blockRight.style.opacity = !single && flipped === maxFlipped ? 0 : 1;
  }

  function visiblePages() {
    if (single) return [flipped + 1];
    const v = [];
    if (flipped > 0) v.push(Math.min(flipped * 2, TOTAL));
    if (flipped < maxFlipped) v.push(flipped * 2 + 1);
    return v;
  }

  function updateUI() {
    const v = visiblePages();
    const label = v.length === 2 ? v[0] + '–' + v[1] : String(v[0]);
    if (document.activeElement !== pageInput) pageInput.value = label;
    slider.value = v[0];
    slider.style.setProperty('--p', ((v[0] - 1) / (TOTAL - 1)) * 100 + '%');
    btnPrev.disabled = flipped === 0;
    btnNext.disabled = flipped === maxFlipped;
    btnPrevSide.disabled = btnPrev.disabled;
    btnNextSide.disabled = btnNext.disabled;

    try { history.replaceState(null, '', '#' + v[0]); } catch (e) { /* ignore */ }

    updateToc(v[v.length - 1]);

    if (thumbsBuilt) {
      thumbs.querySelectorAll('.thumb').forEach((t) => {
        t.classList.toggle('active', v.includes(+t.dataset.page));
      });
      const a = thumbs.querySelector('.thumb.active');
      if (a && app.classList.contains('side-open') && !thumbs.hidden) a.scrollIntoView({ block: 'nearest' });
    }
  }

  function applyState() {
    leaves.forEach((l, i) => l.el.classList.toggle('flipped', i < flipped));
    setZ();
    updateWindow();
    applyShift();
    updateUI();
  }

  // jump without any animation
  function applyInstant() {
    animating.clear();
    book.classList.add('no-anim');
    applyState();
    void book.offsetWidth;             // flush styles so the change is not animated
    book.classList.remove('no-anim');
  }

  /* ---------- Navigation ---------- */

  function step(dir, force) {
    const now = performance.now();
    if (!force && now - lastFlip < DUR * 0.45) return;          // allow quick repeats, but not a mess
    const target = flipped + dir;
    if (target < 0 || target > maxFlipped) return;
    lastFlip = now;

    const leaf = leaves[dir > 0 ? flipped : target];  // the leaf that turns
    animating.add(leaf);
    leaf.el.style.zIndex = 2 * N + 10 - leaves.indexOf(leaf);   // on top while turning; earlier leaves above later ones
    leaf.el.style.display = '';

    flipped = target;
    leaf.el.classList.toggle('flipped', dir > 0);
    updateWindow();
    applyShift();
    updateUI();

    setTimeout(() => {
      animating.delete(leaf);
      setZ();
      updateWindow();
    }, DUR + 40);
  }

  function goToPage(p) {
    clearTimeout(flipTimer);
    p = clamp(Math.round(p) || 1, 1, TOTAL);
    flipped = clamp(single ? p - 1 : Math.floor(p / 2), 0, maxFlipped);
    applyInstant();
  }

  // animated jump: the last few leaves visibly turn, so the book "flips" to the topic
  function flipTo(p) {
    clearTimeout(flipTimer);
    p = clamp(Math.round(p) || 1, 1, TOTAL);
    const target = clamp(single ? p - 1 : Math.floor(p / 2), 0, maxFlipped);
    let diff = target - flipped;
    if (!diff) return;
    const dir = diff > 0 ? 1 : -1;
    if (reduceMotion || zoom > 1) { goToPage(p); return; }
    const MAXTURNS = 4;
    if (Math.abs(diff) > MAXTURNS) {            // far away: hop close first, then turn
      flipped = target - dir * MAXTURNS;
      applyInstant();
      diff = dir * MAXTURNS;
    }
    let left = Math.abs(diff);
    const run = () => {
      step(dir, true);
      if (--left > 0) flipTimer = setTimeout(run, 150);
    };
    run();
  }

  /* ---------- Layout / sizing ---------- */

  function layout() {
    const r = stage.getBoundingClientRect();
    const cs = getComputedStyle(stage);
    const availW = r.width  - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const availH = r.height - parseFloat(cs.paddingTop)  - parseFloat(cs.paddingBottom);

    const wantSingle = forced ? forced === 'single' : availW / availH < 1.1;
    let rebuilt = false;

    if (!leaves.length || wantSingle !== single) {
      const page = leaves.length ? visiblePages()[0] : startPage;
      single = wantSingle;
      build();
      flipped = clamp(single ? page - 1 : Math.floor(page / 2), 0, maxFlipped);
      rebuilt = true;
    }

    const cols = single ? 1 : 2;
    const ph = Math.max(140, Math.min(availH, availW / (cols * AR)));
    const pw = ph * AR;

    sizer.style.width  = pw * cols * zoom + 'px';
    sizer.style.height = ph * zoom + 'px';
    book.style.perspective = pw * cols * zoom * 4.2 + 'px';

    stage.classList.toggle('zoomed', zoom > 1);
    zoomLabel.textContent = Math.round(zoom * 100) + '%';
    btnZoomOut.disabled = zoomIndex === 0;
    btnZoomIn.disabled = zoomIndex === ZOOMS.length - 1;
    btnView.title = single ? 'Switch to two-page view' : 'Switch to single-page view';

    if (rebuilt) applyInstant();
    else { applyShift(); }
  }

  function setZoom(i) {
    zoomIndex = clamp(i, 0, ZOOMS.length - 1);
    zoom = ZOOMS[zoomIndex];
    book.classList.add('no-anim');
    layout();
    void book.offsetWidth;
    book.classList.remove('no-anim');
    // keep the book centred in the scroll area
    stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
    stage.scrollTop  = (stage.scrollHeight - stage.clientHeight) / 2;
  }

  // re-fit whenever the stage changes size (window resize, rotation, sidebar open/close)
  let resizeRaf = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(layout);
  };
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(stage);
  else window.addEventListener('resize', onResize);

  /* ---------- Buttons ---------- */

  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(1));
  btnPrevSide.addEventListener('click', () => step(-1));
  btnNextSide.addEventListener('click', () => step(1));
  btnZoomIn.addEventListener('click', () => setZoom(zoomIndex + 1));
  btnZoomOut.addEventListener('click', () => setZoom(zoomIndex - 1));

  btnView.addEventListener('click', () => {
    forced = single ? 'double' : 'single';
    layout();
  });

  if (!document.documentElement.requestFullscreen) btnFull.hidden = true;
  btnFull.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  });

  slider.addEventListener('input', () => goToPage(+slider.value));

  pageInput.addEventListener('focus', () => pageInput.select());
  pageInput.addEventListener('blur', updateUI);
  pageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const n = parseInt(pageInput.value, 10);
      if (!isNaN(n)) goToPage(n);
      pageInput.blur();
    } else if (e.key === 'Escape') {
      pageInput.blur();
    }
    e.stopPropagation();
  });

  /* ---------- Thumbnail panel ---------- */

  /* ----- Contents (TOC) ----- */

  const CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function buildToc() {
    tocRows = [];
    const walk = (items) => {
      const ul = document.createElement('ul');
      items.forEach((it) => {
        const li = document.createElement('li');
        const row = document.createElement('div');
        row.className = 'toc-row';
        const kids = it.c && it.c.length;

        if (kids) {
          const tg = document.createElement('button');
          tg.type = 'button';
          tg.className = 'toc-toggle';
          tg.setAttribute('aria-label', 'Show or hide sub-topics of ' + it.t);
          tg.innerHTML = CHEV;
          tg.addEventListener('click', () => li.classList.toggle('open'));
          row.appendChild(tg);
        } else {
          const gap = document.createElement('span');
          gap.className = 'toc-gap';
          row.appendChild(gap);
        }

        const a = document.createElement('button');
        a.type = 'button';
        a.className = 'toc-link';
        const t = document.createElement('span'); t.className = 't'; t.textContent = it.t;
        const n = document.createElement('span'); n.className = 'n'; n.textContent = it.p;
        a.append(t, n);
        a.addEventListener('click', () => {
          if (kids) li.classList.add('open');
          flipTo(it.p);
          if (isMobile()) togglePanel(false);
        });
        row.appendChild(a);
        li.appendChild(row);
        tocRows.push({ page: it.p, row, li });
        if (kids) li.appendChild(walk(it.c));
        ul.appendChild(li);
      });
      return ul;
    };
    toc.appendChild(walk(TOC));
  }

  function updateToc(page) {
    if (!tocRows.length) return;
    let cur = null;
    tocRows.forEach((r) => { if (r.page <= page) cur = r; });   // last topic that starts on/before this page
    tocRows.forEach((r) => r.row.classList.toggle('active', r === cur));
    if (!cur) return;
    for (let p = cur.li.parentElement.closest('li'); p; p = p.parentElement.closest('li')) p.classList.add('open');
    if (app.classList.contains('side-open') && !toc.hidden) cur.row.scrollIntoView({ block: 'nearest' });
  }

  function showTab(which) {
    const isToc = which === 'toc';
    toc.hidden = !isToc;
    thumbs.hidden = isToc;
    tabToc.classList.toggle('active', isToc);
    tabPages.classList.toggle('active', !isToc);
    tabToc.setAttribute('aria-selected', isToc);
    tabPages.setAttribute('aria-selected', !isToc);
    if (!isToc && !thumbsBuilt) buildThumbs();
    if (isToc) updateToc(visiblePages().slice(-1)[0]); else updateUI();
  }
  tabToc.addEventListener('click', () => showTab('toc'));
  tabPages.addEventListener('click', () => showTab('pages'));

  function buildThumbs() {
    const frag = document.createDocumentFragment();
    for (let p = 1; p <= TOTAL; p++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'thumb';
      b.dataset.page = p;
      b.innerHTML =
        '<img loading="lazy" decoding="async" alt="" src="' + THUMB_DIR + pad(p) + '.jpg">' +
        '<span>' + p + '</span>';
      frag.appendChild(b);
    }
    thumbs.appendChild(frag);
    thumbsBuilt = true;
    updateUI();
  }

  function togglePanel(open) {
    const willOpen = open === undefined ? !app.classList.contains('side-open') : open;
    app.classList.toggle('side-open', willOpen);
    btnPanel.setAttribute('aria-expanded', willOpen);
    if (willOpen) {
      const active = (toc.hidden ? thumbs : toc).querySelector('.active');
      if (active) active.scrollIntoView({ block: 'center' });
    }
    onResize();   // a docked sidebar changes the space available to the book
  }

  btnPanel.addEventListener('click', () => togglePanel());
  backdrop.addEventListener('click', () => togglePanel(false));

  thumbs.addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (!t) return;
    flipTo(+t.dataset.page);
    if (isMobile()) togglePanel(false);
  });

  /* ---------- Keyboard ---------- */

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); step(1); break;
      case 'ArrowLeft':  case 'PageUp':               e.preventDefault(); step(-1); break;
      case 'Home': goToPage(1); break;
      case 'End':  goToPage(TOTAL); break;
      case '+': case '=': setZoom(zoomIndex + 1); break;
      case '-': case '_': setZoom(zoomIndex - 1); break;
      case '0': setZoom(0); break;
      case 'f': case 'F': btnFull.click(); break;
      case 'Escape': if (isMobile()) togglePanel(false); break;
    }
  });

  window.addEventListener('hashchange', () => {
    const m = /#(\d+)/.exec(location.hash);
    if (m && +m[1] !== visiblePages()[0]) goToPage(+m[1]);
  });

  /* ---------- Mouse / touch: click zones, swipe, drag-to-pan ---------- */

  let down = null;

  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = {
      x: e.clientX, y: e.clientY,
      sl: stage.scrollLeft, st: stage.scrollTop,
      pan: false,
    };
    try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  });

  stage.addEventListener('pointermove', (e) => {
    if (!down || zoom === 1 || e.pointerType !== 'mouse') return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    if (!down.pan && Math.abs(dx) + Math.abs(dy) > 4) {
      down.pan = true;
      stage.classList.add('panning');
    }
    if (down.pan) {
      stage.scrollLeft = down.sl - dx;
      stage.scrollTop = down.st - dy;
    }
  });

  stage.addEventListener('pointercancel', () => {
    down = null;
    stage.classList.remove('panning');
  });

  stage.addEventListener('pointerup', (e) => {
    if (!down) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    down = null;
    stage.classList.remove('panning');

    // a tap on a small screen first just closes the thumbnail panel
    if (app.classList.contains('side-open') && isMobile()) {
      togglePanel(false);
      return;
    }
    if (zoom > 1) return;                               // when zoomed, drag to look around

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {   // swipe
      step(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {          // tap / click
      const r = sizer.getBoundingClientRect();
      let next;
      if (flipped === 0) next = true;                    // closed book: any click opens it
      else if (flipped === maxFlipped && !single) next = false;
      else if (single) next = e.clientX > r.left + r.width * 0.35;
      else next = e.clientX > r.left + r.width / 2;
      step(next ? 1 : -1);
    }
  });

  // never let the browser start an image drag / context-menu pan on the pages
  stage.addEventListener('dragstart', (e) => e.preventDefault());

  /* ---------- Go! ---------- */
  // navigator starts open on desktop, closed on phones
  if (!isMobile()) { app.classList.add('side-open'); btnPanel.setAttribute('aria-expanded', true); }
  buildToc();
  layout();
})();
