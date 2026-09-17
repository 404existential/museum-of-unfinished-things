/**
 * The Museum of Unfinished Things — Application Engine
 * Curated digital archive of abandoned projects, drafts, and human intentions.
 */

(() => {
  'use strict';

  /* ==========================================================================
     DOM SELECTORS & HELPERS
     ========================================================================== */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const esc = (str) => {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  /* Categories Configuration */
  const CATEGORIES = [
    'All',
    'Writing',
    'Software',
    'Business',
    'Music',
    'Art',
    'Film',
    'Personal',
    'Research',
    'Invention'
  ];

  const CATEGORY_COLORS = {
    Writing: 'vis-paper',
    Software: 'vis-red',
    Business: 'vis-dark',
    Music: 'vis-blue',
    Art: 'vis-yellow',
    Film: 'vis-green',
    Personal: 'vis-paper',
    Research: 'vis-blue',
    Invention: 'vis-yellow'
  };

  /* ==========================================================================
     INITIAL ARCHIVAL DATASET
     ========================================================================== */
  const FOUNDATIONAL_RECORDS = [
    {
      id: 'A—9835263',
      title: 'My Unfinished Book',
      category: 'Writing',
      year: '2024',
      status: 'Published',
      visual: 'vis-paper',
      description: 'A psychological thriller stopped around chapter nine when academic examinations took priority.',
      text: `I started writing the book coz I deep down knew I had the potential to write one and I was genuinely interested in doing so.

The book was a psychological thriller which had the tone to keep the reader hooked throughout. I even created the entire outline, and wrote around 8-9 chapters. I also took reviews of everyone around me!

But as exams approached and as I was moving ahead in 10th grade, I couldn't keep up. My writing time reduced and reduced until it completely disappeared.

So yes, that is the entire thing. The outline still exists in a brown notebook on the second shelf.`,
      note: 'Stopped mid-book due to academics and board examinations that required absolute focus.',
      username: '404',
      tributes: 34
    },
    {
      id: 'A—001842',
      title: 'The Third Version of a Novel',
      category: 'Writing',
      year: '2018',
      status: 'Unattended',
      visual: 'vis-paper',
      description: 'Eleven chapters survived, along with character maps and a final sentence that was never decided.',
      text: `Chapter twelve was going to explain the whole arrangement.

The room had already been described twice, although the second description was better and the first one was still in the document because removing it felt too final.

At some point the narrator was supposed to leave the house and meet the person mentioned in chapter four.

There is a note in the margin that says "return to this when the ending is known."

The ending was never known.`,
      note: 'The last recorded revision was made at 02:41 AM on a Tuesday in November.',
      username: 'Anonymous',
      tributes: 28
    },
    {
      id: 'A—002117',
      title: 'A Restaurant That Was Never Opened',
      category: 'Business',
      year: '2020',
      status: 'Shelved',
      visual: 'vis-red',
      description: 'A complete identity system, menu, floor plan and opening budget for a restaurant that remained on paper.',
      text: `The menu was finished first because it was the easiest part to make look real.

There were six tables, two menus, a name that everyone liked and a spreadsheet containing the exact number of plates required for opening week.

The lease was discussed for three months.

The final version of the floor plan has a small pencil mark beside table four which says "move this if possible."

Nothing was moved.`,
      note: 'The restaurant had an approved name, printed sample coasters, but never had a first customer.',
      username: 'Anonymous',
      tributes: 19
    },
    {
      id: 'A—002904',
      title: 'Six Songs for an Album',
      category: 'Music',
      year: '2017',
      status: 'Unresolved',
      visual: 'vis-blue',
      description: 'Six recordings, four album covers and a seventh track that was repeatedly mentioned but never recorded.',
      text: `Track one was finished on a Sunday.

Track two was rewritten because the first version sounded too optimistic.

Track three had a chorus that everyone liked.

Track four was supposed to be shorter.

Track five became a different song halfway through.

Track six was recorded twice and both versions were kept.

The folder contains a text file called "seventh song ideas" which begins with a chord progression and ends mid-sentence.`,
      note: 'No release date was ever set. The master stems reside on an unlabelled USB thumb drive.',
      username: 'Anonymous',
      tributes: 42
    },
    {
      id: 'A—003186',
      title: 'The Personal Website',
      category: 'Personal',
      year: '2021',
      status: 'Unattended',
      visual: 'vis-paper',
      description: 'A personal website revised fourteen times before the domain registration quietly expired.',
      text: `The first homepage said hello.

The second homepage explained too much.

The third homepage was minimal.

The fourth homepage was even more minimal and therefore contained almost nothing.

By version fourteen the site had a bespoke serif typeface, an interactive archive, a page explaining the philosophy of the archive, and a single button leading to an unlinked page that was still being considered.

The domain expired before the button was given a destination.`,
      note: 'The final design screenshot folder is still named "website_v14_final_final_PROD".',
      username: 'Anonymous',
      tributes: 65
    },
    {
      id: 'A—003721',
      title: 'A Small Clothing Label',
      category: 'Business',
      year: '2019',
      status: 'Shelved',
      visual: 'vis-yellow',
      description: 'Fabric samples, a brand identity, twelve logo variations and an unusually ambitious spreadsheet.',
      text: `The name was chosen in April.

By May there were twelve logo variants and three potential neck tag geometries.

By June there were seven possible suppliers and a spreadsheet calculating the landed cost of every button down to four decimal places.

The first sample jacket arrived in a box that was much smaller than expected.

There was a meeting about fabric quality.

After the meeting a new spreadsheet tab called "revised_production_model_v2" was created.

That tab remains empty.`,
      note: 'One prototype sample jacket hangs in a guest room closet.',
      username: 'Anonymous',
      tributes: 22
    },
    {
      id: 'A—004802',
      title: 'A Short Film About Tuesday',
      category: 'Film',
      year: '2022',
      status: 'Unresolved',
      visual: 'vis-green',
      description: 'Sixteen minutes of footage survive from an independent film intended to run forty minutes.',
      text: `The opening shot was supposed to last twelve seconds.

It lasted forty-two seconds.

The main character enters a bakery, forgets what they came in for, and then notices someone standing outside in the rain who is never properly introduced.

There was meant to be a pivotal second scene in a railway carriage.

The script notes say: "The second scene explains why they never spoke."

The video camera battery died during rehearsal, and the director moved cities two weeks later.`,
      note: 'Sixteen minutes of color-graded ProRes footage survive on an external LaCie hard drive.',
      username: 'Anonymous',
      tributes: 31
    },
    {
      id: 'A—005667',
      title: 'The Modular Board Game',
      category: 'Invention',
      year: '2016',
      status: 'Unattended',
      visual: 'vis-red',
      description: 'A complete rulebook, provisional scoring cards, and an unresolved disagreement about dice mechanics.',
      text: `The object of the game was to construct a medieval cathedral city without running out of masonry tiles.

The first playtest took three hours.

The second playtest took five hours.

A handwritten note beside rule 14 reads: "This is becoming a severe psychological problem."

There are detailed rules for roads, guilds, flooding, weather, and one event card titled "Unexpected Meeting at the Gates."

The rules for "Unexpected Meeting" were never written.`,
      note: 'Hand-carved wooden prototype pieces still exist inside an old biscuit tin.',
      username: 'Anonymous',
      tributes: 27
    },
    {
      id: 'A—006914',
      title: 'The Cantilever Chair',
      category: 'Art',
      year: '2021',
      status: 'Unresolved',
      visual: 'vis-yellow',
      description: 'An attempt to combine traditional Japanese joinery with a very optimistic understanding of structural physics.',
      text: `The first chair stood for approximately three weeks.

It was comfortable as long as the occupant did not lean backwards by more than five degrees.

The second prototype was made taller and used European walnut.

The third version was intended to resolve the structural weakness with an angled internal steel rod.

A technical drawing in pencil shows the rod clearly.

The steel rod was never ordered.

There is a sticky note attached to the drawing: "Remember to call the metal fabrication workshop tomorrow."`,
      note: 'One walnut chair exists. It currently serves as an elevated plant stand.',
      username: 'Anonymous',
      tributes: 39
    },
    {
      id: 'A—007201',
      title: 'The Language Learning Method',
      category: 'Research',
      year: '2019',
      status: 'Unattended',
      visual: 'vis-green',
      description: 'A personal language-acquisition methodology abandoned after twelve months and 1,842 recorded cards.',
      text: `The method began with ten words a day.

After two weeks the daily requirement increased to fifteen.

After one month there were color-coded grammatical tags.

After three months there was a multi-tab relational database with columns for recognition, spoken recall, phonetic pronunciation, and "words remembered only while walking."

The final index card contains twenty new vocabulary items.

None of them have their English translations written on the back.`,
      note: '1,842 physical index cards bound with rubber bands in an archival shoe box.',
      username: 'Anonymous',
      tributes: 18
    },
    {
      id: 'A—007643',
      title: 'The Architectural Monograph',
      category: 'Research',
      year: '2020',
      status: 'Unresolved',
      visual: 'vis-dark',
      description: 'An exhaustive introduction, complete bibliography, and an unwritten conclusion.',
      text: `The abstract was drafted first and was exceptionally promising.

The introduction became the strongest part of the manuscript entirely by accident.

There are references to thirty-two peer-reviewed sources and an annotated note: "Find the 1964 Tokyo conference transcript."

The findings section contains a comprehensive comparative table followed by the sentence: "These findings require further phenomenological analysis."

The discussion chapter begins.

The discussion chapter does not continue.`,
      note: 'The bibliography is pristine and meticulously formatted in Chicago Manual of Style.',
      username: 'Anonymous',
      tributes: 24
    },
    {
      id: 'A—008391',
      title: 'Train Stations at Dusk',
      category: 'Art',
      year: '2017',
      status: 'Unattended',
      visual: 'vis-blue',
      description: 'Forty-eight 35mm photographs arranged into a photographic book that never reached the print shop.',
      text: `The photographs were taken across fourteen provincial railway stations in late autumn.

First they were arranged chronologically.

Then they were sequenced by tone and shadow density.

Then the sequence was abandoned because photograph number one felt too conclusive.

The cover layout was designed in five distinct typography treatments.

The finalized InDesign package spans forty-eight pages.

Page forty-nine is completely white.`,
      note: 'The photographic negatives survived the project in archival slide sleeves.',
      username: 'Anonymous',
      tributes: 53
    }
  ];

  /* ==========================================================================
     APPLICATION STATE
     ========================================================================== */
  let records = [...FOUNDATIONAL_RECORDS];
  let activeFilter = 'All';
  let activeSort = 'accession-desc';
  let currentRecord = null;
  let supabaseClient = null;
  let soundEnabled = false;
  let audioCtx = null;

  /* ==========================================================================
     TACTILE WEB AUDIO SYNTHESIS
     Pure programmatic audio — zero external file dependencies!
     ========================================================================== */
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTactileSound(type = 'click') {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'click') {
        // Soft tactile card click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'paper') {
        // Paper shuffle noise burst
        const bufferSize = audioCtx.sampleRate * 0.06;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1400;
        filter.Q.value = 2.5;
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start(now);
      } else if (type === 'tribute') {
        // Gentle museum chime (tribute witness)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn('Audio synthesis note:', e);
    }
  }

  /* ==========================================================================
     TOAST SYSTEM
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    const toast = $('#toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     MODAL CONTROLLERS
     ========================================================================== */
  function openModal(modalId) {
    const modal = $(modalId);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playTactileSound('paper');
  }

  function closeModal(modalId) {
    const modal = modalId ? $(modalId) : $('.modal-backdrop.active');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    $$('.modal-backdrop').forEach((m) => {
      m.classList.remove('active');
      m.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

  /* ==========================================================================
     SUPABASE & LOCAL STORAGE REPOSITORIES
     ========================================================================== */
  function initSupabase() {
    if (window.supabase && window.MOUT_CONFIG?.supabaseUrl && window.MOUT_CONFIG?.supabaseAnonKey) {
      try {
        supabaseClient = window.supabase.createClient(
          window.MOUT_CONFIG.supabaseUrl,
          window.MOUT_CONFIG.supabaseAnonKey
        );
      } catch (err) {
        console.warn('Supabase initialization note:', err);
      }
    }
  }

  function getLocalTributes() {
    try {
      return JSON.parse(localStorage.getItem('mout-tributes') || '{}');
    } catch {
      return {};
    }
  }

  function saveLocalTributes(map) {
    try {
      localStorage.setItem('mout-tributes', JSON.stringify(map));
    } catch {}
  }

  async function loadArchiveData() {
    // 1. Load local custom deposited stories
    let localStories = [];
    try {
      localStories = JSON.parse(localStorage.getItem('mout-local-stories') || '[]');
    } catch {}

    // Merge foundational with local
    let combined = [...localStories, ...FOUNDATIONAL_RECORDS];

    // 2. Fetch from Supabase if online
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('artifacts')
          .select('accession, title, category, year, status, reason, visual, description, contributor_note, contributor_username, record_text')
          .eq('status', 'Published')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data) && data.length > 0) {
          const supaRecords = data.map((item) => ({
            id: item.accession,
            title: item.title,
            category: item.category || 'Writing',
            year: item.year || '2024',
            status: item.status || 'Published',
            visual: item.visual?.startsWith('vis-') ? item.visual : CATEGORY_COLORS[item.category] || 'vis-paper',
            description: item.description || item.reason || 'A preserved record in the public collection.',
            text: item.record_text || item.description || '',
            note: item.reason || item.contributor_note || 'The circumstances were not documented.',
            username: item.contributor_username || 'Anonymous',
            tributes: 10
          }));

          // Merge without duplicate IDs
          const existingIds = new Set(supaRecords.map((r) => r.id));
          combined = [...supaRecords, ...combined.filter((r) => !existingIds.has(r.id))];
        }
      } catch (e) {
        console.warn('Could not sync with Supabase, relying on cache/local dataset:', e);
      }
    }

    // Apply locally incremented tribute counts
    const tributeMap = getLocalTributes();
    records = combined.map((r) => {
      const extra = tributeMap[r.id] || 0;
      return {
        ...r,
        tributes: (r.tributes || 0) + extra
      };
    });

    renderCollection();
    updateMetrics();
  }

  /* ==========================================================================
     RENDER COLLECTION & METRICS
     ========================================================================== */
  function renderFilters() {
    const container = $('#categoryFilters');
    if (!container) return;

    container.innerHTML = CATEGORIES.map((cat) => {
      const isSelected = cat === activeFilter;
      return `<button type="button" class="filter-chip ${isSelected ? 'active' : ''}" data-category="${esc(cat)}">${esc(cat)}</button>`;
    }).join('');

    $$('.filter-chip', container).forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.category;
        playTactileSound('click');
        renderFilters();
        renderCollection();
      });
    });
  }

  function renderCollection() {
    const grid = $('#collectionGrid');
    const emptyState = $('#emptyState');
    const searchInput = $('#archiveSearchInput');
    const countDisplay = $('#artifactTotalCount');
    if (!grid) return;

    const query = (searchInput?.value || '').toLowerCase().trim();

    // Filter
    let filtered = records.filter((r) => {
      const matchesCategory = activeFilter === 'All' || r.category.toLowerCase() === activeFilter.toLowerCase();
      const searchableText = `${r.id} ${r.title} ${r.category} ${r.year} ${r.description} ${r.text} ${r.username} ${r.status}`.toLowerCase();
      const matchesQuery = !query || searchableText.includes(query);
      return matchesCategory && matchesQuery;
    });

    // Sort
    if (activeSort === 'accession-desc') {
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    } else if (activeSort === 'year-asc') {
      filtered.sort((a, b) => parseInt(a.year || '0', 10) - parseInt(b.year || '0', 10));
    } else if (activeSort === 'year-desc') {
      filtered.sort((a, b) => parseInt(b.year || '0', 10) - parseInt(a.year || '0', 10));
    } else if (activeSort === 'tributes') {
      filtered.sort((a, b) => (b.tributes || 0) - (a.tributes || 0));
    }

    if (countDisplay) {
      countDisplay.textContent = records.length;
    }

    if (filtered.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.hidden = true;

    grid.innerHTML = filtered.map((record) => {
      const visualClass = record.visual?.startsWith('vis-') ? record.visual : CATEGORY_COLORS[record.category] || 'vis-paper';
      return `
        <article class="artifact-card" data-id="${esc(record.id)}" tabindex="0" role="button" aria-label="Inspect ${esc(record.title)}">
          <div class="card-visual-header ${esc(visualClass)}">
            <span class="card-accession-tag">${esc(record.id)}</span>
            <h3 class="card-display-title">${esc(record.title)}</h3>
          </div>
          <div class="card-body">
            <div>
              <div class="card-meta-row">
                <span class="card-category-year">${esc(record.category)} / ${esc(record.year)}</span>
                <span class="card-status-badge">${esc(record.status || 'Unattended')}</span>
              </div>
              <h4 class="card-headline">${esc(record.title)}</h4>
              <p class="card-excerpt">${esc(record.description || record.text)}</p>
            </div>
            <div class="card-footer">
              <span>By ${esc(record.username || 'Anonymous')}</span>
              <span class="card-tribute-count">🕯️ ${record.tributes || 0} witnessed</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card click handlers
    $$('.artifact-card', grid).forEach((card) => {
      const id = card.dataset.id;
      const selectCard = () => {
        playTactileSound('click');
        openReadingRoom(id);
      };
      card.addEventListener('click', selectCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCard();
        }
      });
    });
  }

  function updateMetrics() {
    const metricTotal = $('#metricTotal');
    if (metricTotal) {
      metricTotal.textContent = records.length;
    }
  }

  /* ==========================================================================
     READING ROOM MODAL
     ========================================================================== */
  function openReadingRoom(id) {
    const record = records.find((r) => r.id === id);
    if (!record) return;
    currentRecord = record;

    $('#readingAccession').textContent = `ACCESSION ${record.id}`;
    $('#readingTitle').textContent = record.title;
    $('#readingCategory').textContent = record.category;
    $('#readingYear').textContent = record.year || 'Unknown';
    $('#readingStatus').textContent = record.status || 'Unattended';
    $('#readingContributor').textContent = record.username || 'Anonymous';

    // Format story paragraphs
    const formattedStory = (record.text || record.description || '')
      .split('\n\n')
      .map((p) => `<p>${esc(p.trim())}</p>`)
      .join('');
    $('#readingStory').innerHTML = formattedStory || '<p>No recorded fragments survive.</p>';

    // Marginalia
    $('#readingReason').textContent = record.note || record.description || 'The circumstances were not documented.';

    // Tribute label
    $('#readingTributeLabel').textContent = `Witness Intention (${record.tributes || 0})`;

    // Update URL hash for clean deep linking
    try {
      history.replaceState(null, '', `#record=${encodeURIComponent(record.id)}`);
    } catch {}

    openModal('#readingModal');
  }

  function witnessCurrentRecord() {
    if (!currentRecord) return;
    playTactileSound('tribute');

    currentRecord.tributes = (currentRecord.tributes || 0) + 1;
    $('#readingTributeLabel').textContent = `Witness Intention (${currentRecord.tributes})`;

    // Save to local storage
    const map = getLocalTributes();
    map[currentRecord.id] = (map[currentRecord.id] || 0) + 1;
    saveLocalTributes(map);

    showToast(`🕯️ You witnessed intention for "${currentRecord.title}"`);
    renderCollection();
  }

  /* ==========================================================================
     SHARE MODAL & CANVAS ARCHIVAL CERTIFICATE GENERATOR
     ========================================================================== */
  function openShareCertificate() {
    if (!currentRecord) return;
    renderCanvasCertificate(currentRecord);
    openModal('#shareModal');
  }

  function renderCanvasCertificate(record) {
    const canvas = $('#certificateCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background: Dark Parchment / Vault slate
    const isDark = document.body.classList.contains('nocturne-mode');
    ctx.fillStyle = isDark ? '#141418' : '#f8f5ee';
    ctx.fillRect(0, 0, w, h);

    // Subtle Archival Border
    ctx.strokeStyle = isDark ? 'rgba(238, 232, 220, 0.25)' : 'rgba(20, 19, 18, 0.25)';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    ctx.strokeStyle = isDark ? 'rgba(238, 232, 220, 0.12)' : 'rgba(20, 19, 18, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Corner decorative marks
    ctx.fillStyle = isDark ? '#c84334' : '#8c2d23';
    ctx.fillRect(26, 26, 12, 12);
    ctx.fillRect(w - 38, 26, 12, 12);
    ctx.fillRect(26, h - 38, 12, 12);
    ctx.fillRect(w - 38, h - 38, 12, 12);

    // Watermark Header
    ctx.fillStyle = isDark ? '#b0aa9e' : '#66625b';
    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('THE MUSEUM OF UNFINISHED THINGS • OFFICIAL ACCESSION', 60, 85);

    // Accession Code Badge
    ctx.fillStyle = isDark ? '#c84334' : '#8c2d23';
    ctx.font = '700 28px "JetBrains Mono", monospace';
    ctx.fillText(record.id, 60, 140);

    // Record Title
    ctx.fillStyle = isDark ? '#eee8dc' : '#141312';
    ctx.font = 'bold 54px "Playfair Display", serif';
    let displayTitle = record.title;
    if (displayTitle.length > 36) displayTitle = displayTitle.slice(0, 34) + '...';
    ctx.fillText(displayTitle, 60, 220);

    // Category & Year
    ctx.fillStyle = isDark ? '#a29d92' : '#58544d';
    ctx.font = '500 22px "JetBrains Mono", monospace';
    ctx.fillText(`CATEGORY: ${record.category.toUpperCase()}   •   STARTED: ${record.year}   •   STATUS: ${record.status?.toUpperCase() || 'UNATTENDED'}`, 60, 275);

    // Horizontal Rule
    ctx.strokeStyle = isDark ? 'rgba(238, 232, 220, 0.15)' : 'rgba(20, 19, 18, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, 310);
    ctx.lineTo(w - 60, 310);
    ctx.stroke();

    // Narrative Quote Excerpt
    ctx.fillStyle = isDark ? '#ddd6ca' : '#2b2927';
    ctx.font = 'italic 26px "Playfair Display", Georgia, serif';
    const rawQuote = record.description || record.note || record.text || '';
    const cleanQuote = rawQuote.replace(/\n/g, ' ').slice(0, 140) + '...';
    ctx.fillText(`"${cleanQuote}"`, 60, 375, w - 120);

    // Why it stopped annotation
    ctx.fillStyle = isDark ? '#c84334' : '#8c2d23';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText('MARGINALIA NOTE:', 60, 445);

    ctx.fillStyle = isDark ? '#a29d92' : '#58544d';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    const noteText = (record.note || 'Circumstances not documented. Intention preserved in archive.').slice(0, 95);
    ctx.fillText(noteText, 60, 480);

    // Seal and Footer Credo
    ctx.fillStyle = isDark ? '#b0aa9e' : '#66625b';
    ctx.font = '500 18px "JetBrains Mono", monospace';
    ctx.fillText(`PRESERVED BY CONTRIBUTOR: ${record.username?.toUpperCase() || 'ANONYMOUS'}`, 60, 560);
    ctx.fillText('EVERY UNFINISHED THING IS EVIDENCE OF INTENTION • EST. 2026', 60, 588);

    // Wax Seal / Stamp Graphic
    const sealX = w - 150;
    const sealY = 500;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 55, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? '#c84334' : '#8c2d23';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? 'rgba(200, 67, 52, 0.4)' : 'rgba(140, 45, 35, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = isDark ? '#c84334' : '#8c2d23';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ARCHIVAL', sealX, sealY - 14);
    ctx.fillText('EVIDENCE', sealX, sealY + 4);
    ctx.fillText('SEAL', sealX, sealY + 22);
    ctx.textAlign = 'left';
  }

  function downloadCertificate() {
    const canvas = $('#certificateCanvas');
    if (!canvas || !currentRecord) return;
    const link = document.createElement('a');
    link.download = `museum-accession-${currentRecord.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Archival certificate downloaded');
  }

  function copyCitationLink() {
    if (!currentRecord) return;
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(currentRecord.id)}`;
    navigator.clipboard?.writeText(url).then(() => {
      showToast('Citation link copied to clipboard');
    }).catch(() => {
      showToast(`Link: ${url}`);
    });
  }

  function shareToX() {
    if (!currentRecord) return;
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(currentRecord.id)}`;
    const text = `"${currentRecord.title}" (${currentRecord.id}) — preserved in The Museum of Unfinished Things. Everything here was once intended to become something else.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener');
  }

  function shareToWhatsApp() {
    if (!currentRecord) return;
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(currentRecord.id)}`;
    const text = `*${currentRecord.title}* (${currentRecord.id})\nPreserved in The Museum of Unfinished Things:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  /* ==========================================================================
     DEPOSIT INTAKE FORM WITH REAL-TIME PREVIEW
     ========================================================================== */
  function setupDepositForm() {
    const form = $('#depositForm');
    if (!form) return;

    const titleInput = $('#inputTitle');
    const catInput = $('#inputCategory');
    const yearInput = $('#inputYear');
    const reasonInput = $('#inputReason');
    const storyInput = $('#inputStory');
    const authorInput = $('#inputAuthor');
    const anonCheck = $('#checkAnonymous');

    // Live preview elements
    const previewHeader = $('#previewHeader');
    const previewTitle = $('#previewTitleDisplay');
    const previewMeta = $('#previewMeta');
    const previewExcerpt = $('#previewExcerpt');
    const previewAuthor = $('#previewAuthorDisplay');

    function updateLivePreview() {
      const title = titleInput.value.trim() || 'Untitled Record';
      const cat = catInput.value || 'Writing';
      const year = yearInput.value || new Date().getFullYear();
      const reason = reasonInput.value.trim();
      const story = storyInput.value.trim();
      const isAnon = anonCheck.checked;
      const author = isAnon ? 'Anonymous' : (authorInput.value.trim() || 'Anonymous');

      previewTitle.textContent = title;
      previewMeta.textContent = `${cat} / ${year}`;
      previewExcerpt.textContent = reason || story || 'Your story summary will appear here as you type...';
      previewAuthor.textContent = `By ${author}`;

      // Update color class
      previewHeader.className = `card-visual-header ${CATEGORY_COLORS[cat] || 'vis-paper'}`;
    }

    [titleInput, catInput, yearInput, reasonInput, storyInput, authorInput].forEach((el) => {
      el.addEventListener('input', updateLivePreview);
    });
    anonCheck.addEventListener('change', updateLivePreview);

    // Form Submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = $('#depositSubmitBtn');
      const statusMsg = $('#depositStatusMsg');

      const title = titleInput.value.trim();
      const category = catInput.value;
      const year = yearInput.value.trim() || String(new Date().getFullYear());
      const reason = reasonInput.value.trim();
      const story = storyInput.value.trim();
      const isAnon = anonCheck.checked;
      const author = isAnon ? 'Anonymous' : (authorInput.value.trim() || 'Anonymous');

      if (!title || !category || !story || !reason) {
        statusMsg.textContent = 'Please provide a title, category, reason, and story fragment.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Stamping accession...';
      statusMsg.textContent = '';

      // Generate Accession ID: A—XXXXXXX (7 digits)
      const accessionCode = 'A—' + String(Math.floor(1000000 + Math.random() * 9000000));
      const visualClass = CATEGORY_COLORS[category] || 'vis-paper';

      const newRecord = {
        id: accessionCode,
        title,
        category,
        year,
        status: 'Published',
        visual: visualClass,
        description: reason,
        text: story,
        note: reason,
        username: author,
        tributes: 1
      };

      // 1. Save to Local Storage
      try {
        const local = JSON.parse(localStorage.getItem('mout-local-stories') || '[]');
        local.unshift(newRecord);
        localStorage.setItem('mout-local-stories', JSON.stringify(local));
      } catch {}

      // 2. Persist to Supabase if connected
      if (supabaseClient) {
        try {
          await supabaseClient.from('artifacts').insert({
            accession: accessionCode,
            title,
            category,
            year,
            status: 'Published',
            reason,
            visual: visualClass,
            description: reason,
            contributor_note: reason,
            record_text: story,
            contributor_username: author
          });
        } catch (err) {
          console.warn('Supabase remote insert fallback to local cache:', err);
        }
      }

      // Prepend to active memory records
      records.unshift(newRecord);
      renderCollection();
      updateMetrics();
      playTactileSound('tribute');

      // Show Receipt View
      $('#depositFormView').hidden = true;
      $('#depositReceiptView').hidden = false;
      $('#receiptAccession').textContent = accessionCode;

      $('#viewNewRecordBtn').onclick = () => {
        closeModal('#depositModal');
        openReadingRoom(accessionCode);
      };

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Add to Permanent Archive</span><span>↗</span>';
      form.reset();
    });
  }

  function resetDepositModal() {
    $('#depositFormView').hidden = false;
    $('#depositReceiptView').hidden = true;
    $('#depositStatusMsg').textContent = '';
  }

  /* ==========================================================================
     CONTRIBUTOR IDENTITY & CURATOR DESK
     ========================================================================== */
  function setupAccountModal() {
    const tabMyRecords = $('#tabMyRecords');
    const tabCurator = $('#tabCuratorDesk');
    const myView = $('#accountRecordsView');
    const curatorView = $('#curatorDeskView');

    tabMyRecords.addEventListener('click', () => {
      tabMyRecords.classList.add('active');
      tabCurator.classList.remove('active');
      myView.hidden = false;
      curatorView.hidden = true;
      renderMyRecords();
    });

    tabCurator.addEventListener('click', () => {
      tabCurator.classList.add('active');
      tabMyRecords.classList.remove('active');
      myView.hidden = true;
      curatorView.hidden = false;
    });

    // Curator Login
    const passInput = $('#curatorPassInput');
    const loginBtn = $('#curatorLoginBtn');
    const logoutBtn = $('#curatorLogoutBtn');
    const authArea = $('#curatorAuthArea');
    const adminTable = $('#curatorAdminTable');

    loginBtn.addEventListener('click', () => {
      const pass = passInput.value.trim();
      if (pass === '404existential' || pass === 'curator2026' || pass === 'curator') {
        authArea.hidden = true;
        adminTable.hidden = false;
        renderCuratorRecords();
        showToast('Curator governance access granted');
      } else {
        showToast('Access key invalid');
      }
    });

    logoutBtn.addEventListener('click', () => {
      authArea.hidden = false;
      adminTable.hidden = true;
      passInput.value = '';
    });
  }

  function renderMyRecords() {
    const list = $('#myRecordsList');
    if (!list) return;

    let local = [];
    try {
      local = JSON.parse(localStorage.getItem('mout-local-stories') || '[]');
    } catch {}

    if (local.length === 0) {
      list.innerHTML = `
        <div style="padding: 2rem; border: 1px dashed var(--border); text-align: center; border-radius: var(--radius-sm);">
          <p style="color: var(--ink-muted); margin-bottom: 1rem;">You have not deposited any records from this browser yet.</p>
          <button type="button" class="btn btn-outline" id="myDepositShortcut">Deposit Your First Record ＋</button>
        </div>
      `;
      $('#myDepositShortcut')?.addEventListener('click', () => {
        closeModal('#accountModal');
        resetDepositModal();
        openModal('#depositModal');
      });
      return;
    }

    list.innerHTML = local.map((r) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--border); margin-bottom: 0.75rem; border-radius: var(--radius-sm);">
        <div>
          <strong style="font-family: var(--font-serif); font-size: 1.1rem;">${esc(r.title)}</strong>
          <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--ink-muted); margin-top: 0.2rem;">
            ${esc(r.id)} • ${esc(r.category)} (${esc(r.year)}) • ${r.tributes || 0} witnessed
          </div>
        </div>
        <button type="button" class="btn btn-outline" style="padding: 0.4rem 0.8rem;" data-view-id="${esc(r.id)}">Read</button>
      </div>
    `).join('');

    $$('[data-view-id]', list).forEach((b) => {
      b.addEventListener('click', () => {
        closeModal('#accountModal');
        openReadingRoom(b.dataset.viewId);
      });
    });
  }

  function renderCuratorRecords() {
    const tbody = $('#curatorTableBody');
    if (!tbody) return;

    tbody.innerHTML = records.map((r) => `
      <tr>
        <td><strong>${esc(r.id)}</strong></td>
        <td>${esc(r.title)}</td>
        <td>${esc(r.category)}</td>
        <td>${esc(r.status || 'Published')}</td>
        <td>
          <button type="button" class="table-action-btn" data-curator-view="${esc(r.id)}">View</button>
          <button type="button" class="table-action-btn delete" data-curator-delete="${esc(r.id)}">Withdraw</button>
        </td>
      </tr>
    `).join('');

    $$('[data-curator-view]', tbody).forEach((b) => {
      b.addEventListener('click', () => {
        closeModal('#accountModal');
        openReadingRoom(b.dataset.curatorView);
      });
    });

    $$('[data-curator-delete]', tbody).forEach((b) => {
      b.addEventListener('click', async () => {
        const id = b.dataset.curatorDelete;
        if (!confirm(`Are you sure you want to withdraw record ${id} from public display?`)) return;

        records = records.filter((x) => x.id !== id);

        // Remove from local storage
        try {
          const local = JSON.parse(localStorage.getItem('mout-local-stories') || '[]');
          const updated = local.filter((x) => x.id !== id);
          localStorage.setItem('mout-local-stories', JSON.stringify(updated));
        } catch {}

        // Supabase soft delete or status update
        if (supabaseClient) {
          try {
            await supabaseClient.from('artifacts').update({ status: 'Withdrawn' }).eq('accession', id);
          } catch {}
        }

        renderCuratorRecords();
        renderCollection();
        updateMetrics();
        showToast(`Record ${id} withdrawn from exhibition.`);
      });
    });
  }

  /* ==========================================================================
     TIME CLOCK & AMBIENCE
     ========================================================================== */
  function updateClock() {
    const clockEl = $('#clockDisplay');
    if (!clockEl) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    clockEl.textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;
  }

  function setupTheme() {
    const themeBtn = $('#themeToggleBtn');
    const themeIcon = $('#themeIcon');
    const themeText = $('#themeStatusText');

    const savedTheme = localStorage.getItem('mout-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (isDark) {
      document.body.classList.add('nocturne-mode');
      if (themeIcon) themeIcon.textContent = '☀';
      if (themeText) themeText.textContent = 'Paper';
    } else {
      document.body.classList.remove('nocturne-mode');
      if (themeIcon) themeIcon.textContent = '☾';
      if (themeText) themeText.textContent = 'Nocturne';
    }

    themeBtn?.addEventListener('click', () => {
      const currentlyDark = document.body.classList.contains('nocturne-mode');
      if (currentlyDark) {
        document.body.classList.remove('nocturne-mode');
        localStorage.setItem('mout-theme', 'light');
        if (themeIcon) themeIcon.textContent = '☾';
        if (themeText) themeText.textContent = 'Nocturne';
      } else {
        document.body.classList.add('nocturne-mode');
        localStorage.setItem('mout-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀';
        if (themeText) themeText.textContent = 'Paper';
      }
      playTactileSound('click');
    });
  }

  function setupAudioToggle() {
    const audioBtn = $('#audioToggleBtn');
    const audioText = $('#audioStatusText');

    audioBtn?.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        initAudio();
        audioBtn.querySelector('.tool-icon').textContent = '🔊';
        if (audioText) audioText.textContent = 'Sound On';
        playTactileSound('tribute');
        showToast('Tactile audio enabled');
      } else {
        audioBtn.querySelector('.tool-icon').textContent = '🔇';
        if (audioText) audioText.textContent = 'Sound Off';
        showToast('Audio muted');
      }
    });
  }

  /* ==========================================================================
     GLOBAL EVENT LISTENERS & INITIALIZATION
     ========================================================================== */
  function initEvents() {
    // Mobile navigation drawer
    const mobileBtn = $('#mobileMenuBtn');
    const nav = $('#siteNav');
    mobileBtn?.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
    $$('#siteNav a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('mobile-active'));
    });

    // Curated Exhibition Wings
    $$('.exhibition-card').forEach((card) => {
      card.addEventListener('click', () => {
        const wing = card.dataset.wingFilter;
        if (wing) {
          activeFilter = wing;
          playTactileSound('click');
          renderFilters();
          renderCollection();
          $('#collection')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Search bar input
    const searchInput = $('#archiveSearchInput');
    const searchClear = $('#searchClearBtn');
    searchInput?.addEventListener('input', () => {
      searchClear.classList.toggle('visible', !!searchInput.value);
      renderCollection();
    });
    searchClear?.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.classList.remove('visible');
      renderCollection();
    });

    // Sort select
    $('#sortSelect')?.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderCollection();
    });

    // Reset filters button
    $('#resetFiltersBtn')?.addEventListener('click', () => {
      activeFilter = 'All';
      if (searchInput) searchInput.value = '';
      searchClear?.classList.remove('visible');
      renderFilters();
      renderCollection();
    });

    // Modal Close Triggers
    $$('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal());
    });

    $$('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Reading Room buttons
    $('#readingTributeBtn')?.addEventListener('click', witnessCurrentRecord);
    $('#readingShareBtn')?.addEventListener('click', openShareCertificate);

    // Share Modal buttons
    $('#downloadCertBtn')?.addEventListener('click', downloadCertificate);
    $('#copyCitationBtn')?.addEventListener('click', copyCitationLink);
    $('#shareXBtn')?.addEventListener('click', shareToX);
    $('#shareWhatsAppBtn')?.addEventListener('click', shareToWhatsApp);

    // Deposit triggers
    const openDeposit = () => {
      resetDepositModal();
      openModal('#depositModal');
    };
    $('#heroDepositBtn')?.addEventListener('click', openDeposit);
    $('#floatingDepositBtn')?.addEventListener('click', openDeposit);
    $('#footerDepositLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      openDeposit();
    });

    // Contributor / Curator Desk triggers
    const openDesk = () => {
      renderMyRecords();
      openModal('#accountModal');
    };
    $('#openAccountBtn')?.addEventListener('click', openDesk);
    $('#footerDeskLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      openDesk();
    });

    // Hero 3D Paper Stack interactive click
    $('#heroPaperStack')?.addEventListener('click', () => {
      openReadingRoom('A—004218');
    });
  }

  /* Deep Link Hash Checker */
  function checkHashNavigation() {
    const hash = decodeURIComponent(window.location.hash || '');
    if (hash.startsWith('#record=')) {
      const targetId = hash.slice(8).trim();
      setTimeout(() => {
        openReadingRoom(targetId);
      }, 350);
    }
  }

  /* Boot Sequence */
  function boot() {
    initSupabase();
    setupTheme();
    setupAudioToggle();
    renderFilters();
    initEvents();
    setupDepositForm();
    setupAccountModal();

    // Clock ticker
    updateClock();
    setInterval(updateClock, 1000);

    // Load initial archive + sync Supabase
    loadArchiveData();

    // Check deep links
    checkHashNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
