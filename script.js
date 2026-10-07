/* =========================================================
   SANGRAHA — game script (starter pack, question rounds, shop, bonus rounds, results)
   All on-screen words live in text.js (English + French).
   French card and question text lives in data/*-fr.js.
   Teacher test panel: type the word  teacher  on the keyboard (see the bottom of this file).
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Settings you can change ---------- */
  const CONFIG = {
    setId: "hinduism",
    roundSize: 5,           // questions per round
    coinsPerCorrect: 20,
    streakEvery: 3,         // every 3 correct in a row...
    streakBonus: 10,        // ...earns this bonus
    missedReturnAfter: 1,   // a missed question returns this many rounds later
    activeSections: null,   // null = all units. e.g. ["history","deities","beliefs"]

    /* Shop */
    packs: [
      { id: "small",  name: "Small Pack",  size: 5,  cost: 150 },
      { id: "medium", name: "Medium Pack", size: 8,  cost: 220 },
      { id: "large",  name: "Large Pack",  size: 10, cost: 250 }
    ],
    newCardChance: 0.8,     // chance each card slot is one the student doesn't own yet
    duplicateRefund: 10,    // coins returned for each duplicate

    /* Bonus rounds (rare cards) */
    bonusSize: 3,           // challenge questions per bonus round
    bonusToWin: 2,          // correct answers needed to win the rare card

    /* Card images: each card looks for  <imageFolder><card id>.jpg  (or .png / .jpeg / .webp).
       If no image is found, the card keeps its placeholder. */
    imageFolder: "img/hinduism/",
    imageTypes: ["jpg", "png", "jpeg", "webp"]
  };
  const PACK_COLOR = "#6b3fa0";

  /* ---------- Data ---------- */
  const SET = window.GAME_SETS && window.GAME_SETS[CONFIG.setId];
  const ALL_QUESTIONS = (window.GAME_QUESTIONS && window.GAME_QUESTIONS[CONFIG.setId]) || [];
  if (!SET) {
    document.getElementById("app").textContent = "Card data for '" + CONFIG.setId + "' did not load. Check the data folder.";
    return;
  }
  const QUESTIONS = ALL_QUESTIONS.filter(q => !CONFIG.activeSections || CONFIG.activeSections.includes(q.section));
  const CARD = {};    SET.cards.forEach(c => (CARD[c.id] = c));
  const SECTION = {}; SET.sections.forEach(s => (SECTION[s.id] = s));
  const RARE = {};    SET.rareCards.forEach(r => { if (!r.art) r.art = { style: "symbol", src: null }; RARE[r.id] = r; });
  const SAVE_KEY = "sangraha_" + CONFIG.setId;

  /* ---------- Language (English / French) ---------- */
  const TEXT = window.SANGRAHA_TEXT || { en: {} };
  const I18N = window.GAME_I18N || {};
  const LANG_KEY = "sangraha_lang";
  const LANGS = Object.keys(TEXT);
  let lang = (() => { try { const l = localStorage.getItem(LANG_KEY); return LANGS.includes(l) ? l : null; } catch (e) { return null; } })();

  // t("key", {n: 3}) -> the text for the current language (falls back to English).
  function t(key, vars) {
    const pack = TEXT[lang] || TEXT.en;
    let v = pack[key];
    if (v == null) v = TEXT.en[key];
    if (v == null) return key;
    if (typeof v === "function") return v(vars || {});
    return String(v).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : m));
  }
  function kindLabel(k) { const m = (TEXT[lang] || {}).kinds || {}; return m[k] || k; }

  // Swap card, section and question text to the current language, in place.
  // Anything without a translation stays in English. Answers never change order.
  function keepEnglish(obj, fields) {
    if (!obj._en) { obj._en = {}; fields.forEach(f => (obj._en[f] = obj[f])); }
    return obj._en;
  }
  function applyDataLang() {
    const tr = (lang && lang !== "en" && I18N[lang] && I18N[lang][CONFIG.setId]) || {};
    const en = keepEnglish(SET, ["title"]);
    SET.title = tr.title || en.title;
    SET.sections.forEach(s => {
      const e = keepEnglish(s, ["name", "short"]), o = (tr.sections || {})[s.id] || {};
      s.name = o.name || e.name;
      s.short = o.name ? o.short : e.short;
    });
    const cardText = (c, table) => {
      const e = keepEnglish(c, ["name", "fact", "clues"]), o = (table || {})[c.id] || {};
      c.name = o.name || e.name;
      c.fact = o.fact || e.fact;
      c.clues = Array.isArray(o.clues) && o.clues.length ? o.clues : e.clues;
    };
    SET.cards.forEach(c => cardText(c, tr.cards));
    SET.rareCards.forEach(c => cardText(c, tr.rareCards));
    const same = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length;
    ALL_QUESTIONS.forEach(q => {
      const e = keepEnglish(q, ["prompt", "explain", "options", "pairs", "items", "buckets"]);
      const o = (tr.questions || {})[q.id] || {};
      q.prompt = o.prompt || e.prompt;
      q.explain = o.explain || e.explain;
      if (q.type === "choice") q.options = same(o.options, e.options) ? o.options : e.options;
      if (q.type === "match") q.pairs = same(o.pairs, e.pairs) ? o.pairs : e.pairs;
      if (q.type === "order") q.items = same(o.items, e.items) ? o.items : e.items;
      if (q.type === "sort") {
        q.buckets = same(o.buckets, e.buckets) ? o.buckets : e.buckets;
        q.items = same(o.items, e.items)
          ? e.items.map((it, i) => ({ text: typeof o.items[i] === "string" ? o.items[i] : o.items[i].text, bucket: it.bucket }))
          : e.items;
      }
    });
  }

  /* ---------- Save / load (browser only, no accounts) ---------- */
  function freshState() {
    return {
      coins: 0,
      collection: {},       // cardId -> number owned
      rares: {},            // rareId -> true
      starterOpened: false,
      streak: 0, bestStreak: 0,
      roundsPlayed: 0,
      answered: 0, correct: 0,
      seen: [],             // question ids answered at least once
      missed: {},           // questionId -> round number it is due back
      missCounts: {},       // questionId -> times missed
      lastRound: [],
      packsOpened: 0,
      bonus: {},            // sectionId -> { attempts, lastQs, lockedUntil }
      playerName: "",       // optional, typed on the results screen
      startedAt: null       // when this game was started
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return Object.assign(freshState(), JSON.parse(raw));
    } catch (e) { /* storage unavailable: play without saving */ }
    return freshState();
  }
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  let state = load();

  /* ---------- Helpers ---------- */
  const app = document.getElementById("app");
  const coinsEl = document.getElementById("coins");
  document.getElementById("homeBtn").addEventListener("click", () => showTitle());

  // EN | FR switch in the top bar. It works on screens that can be redrawn safely
  // (title, collection, shop, results); during a round or pack opening it waits.
  let refreshView = null;
  const langToggle = document.createElement("div");
  langToggle.className = "lang-toggle";
  langToggle.setAttribute("role", "group");
  LANGS.forEach(l => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "lang-btn"; b.dataset.lang = l; b.textContent = l.toUpperCase();
    b.setAttribute("aria-label", (TEXT[l] && TEXT[l].langName) || l);
    b.addEventListener("click", () => setLang(l));
    langToggle.append(b);
  });
  coinsEl.parentNode.insertBefore(langToggle, coinsEl);

  function updateChrome() {
    langToggle.style.display = lang ? "" : "none";
    document.documentElement.lang = lang || "en";
    document.getElementById("setName").textContent = t("setLabel", { set: SET.title });
    langToggle.querySelectorAll(".lang-btn").forEach(b => {
      const on = b.dataset.lang === (lang || "en");
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.disabled = !on && !refreshView;
      b.title = b.disabled ? t("langSwitchLocked") : "";
    });
  }
  function setRefresh(fn) { refreshView = fn; updateChrome(); }

  function setLang(l) {
    if (!LANGS.includes(l)) return;
    if (l !== lang && lang && !refreshView) return;          // mid-round: wait
    lang = l;
    try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* ignore */ }
    applyDataLang();
    updateChrome();
    if (panelEl) { toggleTeacherPanel(false); toggleTeacherPanel(true); }
    if (refreshView) refreshView();
  }

  function el(tag, props, ...children) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "style") n.style.cssText = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    children.flat(Infinity).forEach(c => {
      if (c == null || c === false) return;
      n.append(c instanceof Node ? c : document.createTextNode(String(c)));
    });
    return n;
  }
  function render(...nodes) {
    if (zoomEl) closeZoom();
    refreshView = null;          // each redrawable screen sets this again after rendering
    app.replaceChildren(...nodes); window.scrollTo(0, 0);
    updateChrome();
  }

  // Shrink a card's fact text just enough to fit, so nothing is ever cut off.
  function fitCardText(root) {
    root.querySelectorAll(".card-fact").forEach(f => {
      if (!f.clientHeight) return;            // not laid out yet (hidden)
      f.style.fontSize = "";
      let size = parseFloat(getComputedStyle(f).fontSize);
      while (f.scrollHeight > f.clientHeight + 1 && size > 8) {
        size -= 0.5;
        f.style.fontSize = size + "px";
      }
    });
  }
  new MutationObserver(muts => {
    if (muts.some(m => m.addedNodes.length)) requestAnimationFrame(() => fitCardText(app));
  }).observe(app, { childList: true, subtree: true });
  window.addEventListener("resize", () => fitCardText(app));
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // Shuffle so the result is not already in the original order (when possible)
  function shuffleIndexes(n) {
    const base = [...Array(n).keys()];
    if (n < 2) return base;
    let s;
    do { s = shuffle(base); } while (s.every((v, i) => v === i));
    return s;
  }
  function updateCoins() { coinsEl.textContent = state.coins; }
  function owned(id) { return (state.collection[id] || 0) > 0; }
  function sectionCards(sectionId) { return SET.cards.filter(c => c.section === sectionId); }
  function sectionOwnedCount(sectionId) { return sectionCards(sectionId).filter(c => owned(c.id)).length; }
  function totalOwned() { return SET.cards.filter(c => owned(c.id)).length; }

  /* ---------- Card images ---------- */
  // Remembers what was found for each card, so missing images are only looked for once.
  const imageFound = {};   // card id -> image path, or false if none exists

  function imageCandidates(card) {
    if (card.art && card.art.src) return [card.art.src];          // a path set in the card data wins
    return CONFIG.imageTypes.map(ext => CONFIG.imageFolder + card.id + "." + ext);
  }

  // Shows the card's image over the placeholder once it loads; leaves the placeholder if none exists.
  function attachImage(artBox, card) {
    if (imageFound[card.id] === false) return;
    const tries = imageFound[card.id] ? [imageFound[card.id]] : imageCandidates(card);
    let i = 0;
    const img = el("img", { class: "card-img", alt: card.name, decoding: "async" });
    img.addEventListener("load", () => {
      imageFound[card.id] = img.getAttribute("src");
      artBox.classList.add("has-img");
    });
    img.addEventListener("error", () => {
      i++;
      if (i < tries.length) img.src = tries[i];
      else { imageFound[card.id] = false; img.remove(); }
    });
    img.src = tries[0];
    artBox.append(img);
  }

  /* ---------- Card element ---------- */
  function cardEl(card, opts = {}) {
    const sec = SECTION[card.section];
    const artBox = el("div", { class: "card-art" },
      el("div", { class: "art-placeholder" },
        el("span", { class: "art-initial", text: card.name.charAt(0) }),
        el("span", { class: "art-label", text: t("art_" + ((card.art && card.art.style) || "image")) })));
    attachImage(artBox, card);
    const node = el("div", { class: "card" + (opts.rare ? " rare" : "") + (opts.zoom ? " zoomable" : ""), style: "--sec:" + sec.color },
      el("div", { class: "card-band", text: (opts.rare ? t("rarePrefix") : "") + (sec.short || sec.name) }),
      artBox,
      el("div", { class: "card-name", text: card.name }),
      el("div", { class: "card-fact", text: card.fact }),
      opts.big && card.clues && card.clues.length
        ? el("div", { class: "card-clues" },
            el("div", { class: "card-clues-title", text: t("clues") }),
            el("ul", {}, [sec.name].concat(card.clues).map(c => el("li", { text: c }))))
        : null
    );
    if (opts.zoom) {
      node.setAttribute("tabindex", "0");
      node.setAttribute("role", "button");
      node.setAttribute("aria-label", t("readUpClose", { name: card.name }));
      const open = () => {
        const flip = node.closest(".flip");
        if (flip && !flip.classList.contains("revealed")) return;   // still face-down
        openZoom(card, !!opts.rare, node);
      };
      node.addEventListener("click", open);
      node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    }
    return node;
  }

  /* ---------- Enlarged card view (tap a card to read it up close) ---------- */
  let zoomEl = null, zoomReturnFocus = null;

  function openZoom(card, rare, fromEl) {
    if (zoomEl) closeZoomNow();
    zoomReturnFocus = fromEl || null;
    const back = el("button", { class: "btn btn-primary zoom-back", type: "button", onclick: closeZoom }, t("backToCards"));
    const big = cardEl(card, { rare, big: true });
    big.classList.add("card-big");
    // The essentials are set here as well as in style.css, so the popup still appears on screen
    // even if the browser is holding on to an older copy of style.css.
    Object.assign(big.style, { width: "min(380px, calc(100vw - 32px))", height: "auto" });
    const art = big.querySelector(".card-art");
    if (art) Object.assign(art.style, { height: "auto", aspectRatio: "16 / 9" });
    const fact = big.querySelector(".card-fact");
    if (fact) Object.assign(fact.style, { flex: "none", overflow: "visible", fontSize: "1.05rem" });
    const inner = el("div", { class: "zoom-inner" }, big, back);
    Object.assign(inner.style, { margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" });
    zoomEl = el("div", { class: "zoom", role: "dialog", "aria-modal": "true", "aria-label": card.name }, inner);
    Object.assign(zoomEl.style, { position: "fixed", inset: "0", zIndex: "40", display: "flex", overflowY: "auto",
      padding: "20px 16px", background: "rgba(8, 5, 18, 0.86)" });
    zoomEl.addEventListener("click", e => { if (e.target === zoomEl || e.target.classList.contains("zoom-inner")) closeZoom(); });
    document.body.append(zoomEl);
    document.body.classList.add("zoom-open");
    try { history.pushState({ sangrahaZoom: true }, ""); } catch (e) { /* ignore */ }
    back.focus({ preventScroll: true });
  }

  // Back button, Esc and tapping outside all come here. The browser's own Back button also works.
  function closeZoom() {
    if (!zoomEl) return;
    if (history.state && history.state.sangrahaZoom) history.back();   // popstate closes it
    else closeZoomNow();
  }
  function closeZoomNow() {
    if (!zoomEl) return;
    zoomEl.remove();
    zoomEl = null;
    document.body.classList.remove("zoom-open");
    if (zoomReturnFocus && document.contains(zoomReturnFocus)) zoomReturnFocus.focus({ preventScroll: true });
    zoomReturnFocus = null;
  }
  window.addEventListener("popstate", () => { if (zoomEl) closeZoomNow(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && zoomEl) { e.stopPropagation(); closeZoom(); } }, true);

  /* =========================================================
     TITLE SCREEN (shown every time the game opens)
     ========================================================= */
  function hasProgress() { return state.starterOpened; }

  function showLanguagePicker() {
    render(el("section", { class: "screen center title-screen" },
      el("div", { class: "title-mark", "aria-hidden": "true" }, "✦"),
      el("h1", { class: "title-name", text: "Sangraha" }),
      el("p", { class: "title-sub", text: LANGS.map(l => TEXT[l].chooseLang).join(" · ") }),
      el("div", { class: "hub-actions lang-pick" },
        LANGS.map(l => el("button", { class: "btn btn-primary btn-big", type: "button",
          onclick: () => { setLang(l); showTitle(); } }, TEXT[l].langName)))));
  }

  function showTitle() {
    if (!lang) { showLanguagePicker(); return; }
    const have = totalOwned(), total = SET.cards.length;
    const rares = Object.keys(state.rares).length;
    const buttons = hasProgress()
      ? [
          el("button", { class: "btn btn-primary btn-big", type: "button", onclick: showHub }, t("btnContinue")),
          el("button", { class: "btn btn-big", type: "button", onclick: newGame }, t("btnNewGame"))
        ]
      : [el("button", { class: "btn btn-primary btn-big", type: "button", onclick: newGame }, t("btnStart"))];

    render(el("section", { class: "screen center title-screen" },
      el("div", { class: "title-mark", "aria-hidden": "true" }, "✦"),
      el("h1", { class: "title-name", text: "Sangraha" }),
      el("p", { class: "title-sub", text: t("titleSub", { set: SET.title }) }),
      hasProgress()
        ? el("p", { class: "save-info", text: t("savedGame", { have, total, rares, rareTotal: SET.rareCards.length, coins: state.coins }) })
        : null,
      el("div", { class: "hub-actions" }, buttons),
      el("div", { class: "how-to" },
        el("h2", { text: t("howToPlay") }),
        el("ol", {},
          el("li", { text: t("how1", { n: CONFIG.roundSize }) }),
          el("li", { text: t("how2") }),
          el("li", { text: t("how3", { total, sections: SET.sections.length }) }),
          el("li", { text: t("how4") })),
        el("p", { class: "muted small", text: t("howNote") }))
    ));
    setRefresh(showTitle);
  }

  function newGame() {
    if (hasProgress() && !confirm(t("confirmNewGame"))) return;
    state = freshState();
    save();
    updateCoins();
    showStarter();
  }

  /* =========================================================
     PACK ELEMENT + CARD REVEAL (shared by starter pack and shop)
     ========================================================= */
  function packEl(title, sub, count, color) {
    return el("div", { class: "pack", style: "--sec:" + color },
      el("div", { class: "pack-light" }),
      el("div", { class: "pack-strip" }, el("span", { class: "strip-text", text: t("tearHere") })),
      el("div", { class: "pack-title", text: title }),
      sub ? el("div", { class: "pack-sub", text: sub }) : null,
      el("div", { class: "pack-count", text: t("cardsCount", { n: count }) }));
  }

  // items: [{ id, badge: "new" | "dup" | null, rare? }]
  // shownIdx: a card already seen in the walkout, shown face-up straight away
  function revealCards(grid, items, onDone, shownIdx) {
    const step = items.length > 6 ? 180 : 260;
    let k = 0;
    items.forEach((item, i) => {
      const card = item.rare ? RARE[item.id] : CARD[item.id];
      const sec = SECTION[card.section];
      const front = el("div", { class: "face front" }, cardEl(card, { rare: item.rare, zoom: true }),
        item.badge === "new" ? el("span", { class: "badge new", text: t("badgeNew") }) : null,
        item.badge === "dup" ? el("span", { class: "badge dup", text: "+" + CONFIG.duplicateRefund }) : null);
      const flip = el("div", { class: "flip" + (item.badge === "dup" ? " is-dup" : "") + (item.rare ? " is-rare" : "") },
        el("div", { class: "flip-inner" },
          el("div", { class: "face back" + (item.rare ? " rare-back" : ""), style: "--sec:" + sec.color }, el("span", { text: item.rare ? "★" : "?" })),
          front));
      grid.append(flip);
      if (i === shownIdx) flip.classList.add("no-anim", "revealed", "spotlit");
      else { const d = 250 + (k++) * step; setTimeout(() => flip.classList.add("revealed"), d); }
    });
    setTimeout(onDone, 250 + k * step + 450);
  }

  /* =========================================================
     PACK OPENING: tap to tear → walkout (clues → big reveal) → all cards
     ========================================================= */
  // The walkout card is the most useful new card for the student:
  // one that completes a section, otherwise a new card from the section closest to completion.
  // Never based on which deity or concept "matters more".
  function pickSpotlight(items) {
    let best = -1, bestScore = -1;
    items.forEach((it, i) => {
      let score;
      if (it.rare) score = 10;
      else if (it.badge !== "new") return;
      else {
        const sec = CARD[it.id].section;
        score = sectionComplete(sec) ? 2 : sectionOwnedCount(sec) / sectionCards(sec).length;
      }
      score += Math.random() * 0.01;   // break ties randomly
      if (score > bestScore) { best = i; bestScore = score; }
    });
    return best;
  }

  // opts: { items, title, sub, color, noPack, onOpen, onDone }
  function playPack(stage, opts) {
    const items = opts.items;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    let spot = -1, finished = false;

    function showAll() {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      const grid = el("div", { class: "reveal-grid" });
      stage.replaceChildren(grid);
      revealCards(grid, items, opts.onDone, spot);
    }

    function walkout() {
      spot = pickSpotlight(items);
      if (spot < 0) { showAll(); return; }   // all duplicates: no walkout
      const it = items[spot];
      const card = it.rare ? RARE[it.id] : CARD[it.id];
      const sec = SECTION[card.section];
      const clues = [(it.rare ? t("rareCardClue") : "") + sec.name].concat(card.clues || []);
      const clueEls = clues.map((c, i) => el("div", { class: "wo-clue" + (i === 0 ? " wo-first" : ""), text: c }));
      const cardBox = el("div", { class: "wo-card" },
        cardEl(card, { rare: it.rare }),
        it.badge === "new" ? el("span", { class: "badge new", text: t("badgeNew") }) : null);
      const wo = el("div", { class: "walkout" + (it.rare ? " gold" : ""), style: "--sec:" + sec.color },
        el("div", { class: "wo-clues" }, clueEls),
        cardBox,
        el("button", { class: "wo-skip", type: "button", onclick: showAll }, t("skip")));
      stage.replaceChildren(wo);
      later(() => wo.classList.add("on"), 30);
      clueEls.forEach((c, i) => later(() => c.classList.add("show"), 400 + i * 1300));
      const revealAt = 400 + clueEls.length * 1300;
      later(() => { wo.classList.add("revealed"); requestAnimationFrame(() => fitCardText(wo)); }, revealAt);
      later(showAll, revealAt + 2400);
    }

    if (opts.noPack) { walkout(); return; }

    const pk = packEl(opts.title, opts.sub, items.length, opts.color);
    pk.classList.add("tappable");
    pk.setAttribute("role", "button");
    pk.setAttribute("tabindex", "0");
    pk.setAttribute("aria-label", t("tapToTearLabel"));
    const hint = el("div", { class: "tap-hint", text: t("tapToTear") });
    const tear = () => {
      if (pk.classList.contains("tearing")) return;
      pk.classList.add("tearing");
      hint.classList.add("gone");
      if (opts.onOpen) opts.onOpen();
      later(() => pk.classList.add("dropping"), 1350);
      later(walkout, 1850);
    };
    pk.addEventListener("click", tear);
    pk.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tear(); } });
    stage.replaceChildren(el("div", { class: "pack-stage" }, pk, hint));
    pk.focus({ preventScroll: true });
  }

  function completeSections() {
    return SET.sections.filter(s => sectionOwnedCount(s.id) === sectionCards(s.id).length).map(s => s.id);
  }

  function completionBanners(sectionIds) {
    return sectionIds.map(id => el("div", { class: "banner" },
      el("div", {},
        el("strong", { text: t("sectionComplete", { section: SECTION[id].name }) }),
        el("span", { text: t("winRareInBonus") })),
      bonusButton(id, true)));
  }

  /* ---------- Bonus round helpers ---------- */
  function rareFor(sectionId) { return SET.rareCards.find(r => r.section === sectionId); }
  function sectionComplete(id) { return sectionOwnedCount(id) === sectionCards(id).length; }
  // "none" | "ready" | "locked" | "won"
  function bonusStatus(id) {
    const r = rareFor(id);
    if (!r) return "none";
    if (state.rares[r.id]) return "won";
    if (!sectionComplete(id)) return "none";
    const b = state.bonus[id];
    if (b && state.roundsPlayed < b.lockedUntil) return "locked";
    return "ready";
  }
  function readyBonuses() { return SET.sections.filter(s => bonusStatus(s.id) === "ready").map(s => s.id); }
  function bonusButton(id, primary) {
    return el("button", { class: "btn btn-bonus" + (primary ? " btn-primary" : ""), type: "button",
      onclick: () => showBonusIntro(id) }, t("bonusButton", { section: SECTION[id].name }));
  }
  function bonusReadyBox() {
    const ids = readyBonuses();
    if (!ids.length) return null;
    return el("div", { class: "bonus-ready" },
      el("div", { class: "bonus-ready-title", text: t("bonusReady", { n: ids.length }) }),
      el("div", { class: "bonus-ready-list" }, ids.map(id => bonusButton(id, true))));
  }

  /* =========================================================
     STARTER PACK
     ========================================================= */
  function showStarter() {
    const pack = SET.starterPack;
    const sec = SECTION[CARD[pack.cards[0]].section];
    const stage = el("div", { class: "stage" });
    const status = el("div", { class: "reveal-status" });

    render(el("section", { class: "screen center" },
      el("h1", { text: t("welcome", { set: SET.title }) }),
      el("p", { class: "lead", text: t("welcomeGoal") }),
      el("p", { class: "lead", text: t("welcomeFree") }),
      stage, status
    ));

    playPack(stage, {
      title: t("starterPack"), sub: sec.name, color: sec.color,
      items: pack.cards.map(id => ({ id, badge: "new" })),
      onOpen: () => {
        pack.cards.forEach(id => (state.collection[id] = (state.collection[id] || 0) + 1));
        state.starterOpened = true;
        state.startedAt = Date.now();
        save();
      },
      onDone: () => {
          const got = sectionOwnedCount(sec.id), n = sectionCards(sec.id).length;
          status.append(
            el("div", { class: "banner" },
              el("strong", { text: t("starterStarted", { section: sec.name, got, n }) }),
              el("span", { text: t("starterNext") })),
            el("button", { class: "btn btn-primary btn-big", type: "button", onclick: startRound }, t("firstRound")));
      }
    });
  }

  /* =========================================================
     SHOP
     ========================================================= */
  function showShop() {
    const remaining = SET.cards.length - totalOwned();
    const offers = CONFIG.packs.map(p => {
      const afford = state.coins >= p.cost;
      const label = remaining === 0 ? t("setComplete") : afford ? t("buyOpen") : t("needMore", { n: p.cost - state.coins });
      return el("div", { class: "shop-item" },
        packEl(packName(p).toUpperCase(), null, p.size, PACK_COLOR),
        el("div", { class: "shop-price" }, el("span", { class: "coin-icon" }), String(p.cost)),
        el("div", { class: "muted small", text: t("perCard", { n: Math.round(p.cost / p.size) }) }),
        el("button", { class: "btn btn-primary", type: "button", disabled: !afford || remaining === 0,
          onclick: () => buyPack(p) }, label));
    });

    render(el("section", { class: "screen center" },
      el("div", { class: "left" }, el("button", { class: "btn btn-small btn-ghost", type: "button", onclick: showHub }, t("backCollection"))),
      el("h1", { text: t("shopTitle") }),
      el("p", { class: "lead", text: remaining
        ? t("shopLead", { n: remaining, refund: CONFIG.duplicateRefund })
        : t("shopDone") }),
      el("div", { class: "shop-grid" }, offers),
      el("div", { class: "hub-actions" },
        el("button", { class: "btn btn-big", type: "button", onclick: startRound }, t("earnMore")))
    ));
    setRefresh(showShop);
  }
  function packName(p) { return t("pack_" + p.id); }

  // Pick the cards for one pack. No repeats inside a pack; most slots favour cards not yet owned.
  function drawPack(size) {
    const picked = [];
    for (let i = 0; i < size; i++) {
      const avail = SET.cards.filter(c => !picked.includes(c.id));
      if (!avail.length) break;
      const missing = avail.filter(c => !owned(c.id));
      const pool = missing.length && Math.random() < CONFIG.newCardChance ? missing : avail;
      picked.push(pool[Math.floor(Math.random() * pool.length)].id);
    }
    return picked;
  }

  function buyPack(p) {
    if (state.coins < p.cost) return;
    const completeBefore = completeSections();
    state.coins -= p.cost;
    const items = drawPack(p.size).map(id => {
      const isNew = !owned(id);
      state.collection[id] = (state.collection[id] || 0) + 1;
      return { id, badge: isNew ? "new" : "dup" };
    });
    const dups = items.filter(it => it.badge === "dup").length;
    state.coins += dups * CONFIG.duplicateRefund;
    state.packsOpened++;
    save();
    updateCoins();
    const newlyComplete = completeSections().filter(id => !completeBefore.includes(id));
    showPackOpening(p, items, dups, newlyComplete);
  }

  function showPackOpening(p, items, dups, newlyComplete) {
    const stage = el("div", { class: "stage" });
    const status = el("div", { class: "reveal-status" });
    const heading = el("h1", { text: packName(p) });
    render(el("section", { class: "screen center" }, heading, stage, status));

    playPack(stage, {
      title: packName(p).toUpperCase(), color: PACK_COLOR, items,
      onDone: () => {
        heading.textContent = t("packOpened", { pack: packName(p) });
        const newCount = items.length - dups;
        const remaining = SET.cards.length - totalOwned();
        status.append(
          el("p", { class: "pack-result" },
            el("strong", { text: t("newCards", { n: newCount }) }),
            dups ? t("duplicates", { n: dups, coins: dups * CONFIG.duplicateRefund }) : "",
            remaining ? t("leftToCollect", { n: remaining }) : t("setCompleteShort")),
          ...completionBanners(newlyComplete),
          el("div", { class: "hub-actions" },
            el("button", { class: "btn btn-primary btn-big", type: "button", onclick: showShop }, t("backToShop")),
            el("button", { class: "btn btn-big", type: "button", onclick: startRound }, t("playRound")),
            el("button", { class: "btn btn-big", type: "button", onclick: showHub }, t("viewCollection"))));
      }
    });
  }

  /* =========================================================
     HUB
     ========================================================= */
  function showHub() {
    const total = SET.cards.length;
    const have = totalOwned();
    const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;

    const sections = SET.sections.map(s => {
      const n = sectionCards(s.id).length;
      const got = sectionOwnedCount(s.id);
      const done = got === n;
      return el("button", { class: "section-row" + (done ? " done" : ""), style: "--sec:" + s.color, type: "button",
                            onclick: () => showCollection(s.id) },
        el("span", { class: "section-name", text: s.name }),
        el("span", { class: "bar" }, el("span", { class: "bar-fill", style: "width:" + (got / n * 100) + "%" })),
        el("span", { class: "section-count", text: (bonusStatus(s.id) === "won" ? "★ " : done ? "✓ " : "") + got + "/" + n }));
    });

    render(el("section", { class: "screen" },
      el("div", { class: "hub-head" },
        el("div", {},
          el("h1", { text: t("yourCollection") }),
          el("p", { class: "muted", text: t("hubSummary", { have, total, rares: Object.keys(state.rares).length, rareTotal: SET.rareCards.length }) })),
        el("div", { class: "stat-pills" },
          el("span", { class: "pill", text: t("pillRounds", { n: state.roundsPlayed }) }),
          el("span", { class: "pill", text: t("pillAccuracy", { n: accuracy }) }),
          el("span", { class: "pill", text: t("pillBest", { n: state.bestStreak }) }))),
      el("div", { class: "bar big" }, el("span", { class: "bar-fill", style: "width:" + (have / total * 100) + "%" })),
      el("div", { class: "hub-actions" },
        el("button", { class: "btn btn-primary btn-big", type: "button", onclick: startRound }, t("playRoundBtn", { n: CONFIG.roundSize })),
        el("button", { class: "btn btn-big", type: "button", onclick: showShop }, t("shopTitle")),
        el("button", { class: "btn btn-big btn-finish", type: "button", onclick: showResults }, t("finishBtn"))),
      bonusReadyBox(),
      el("h2", { text: t("sections") }),
      el("div", { class: "section-list" }, sections),
      el("div", { class: "hub-foot" },
        el("button", { class: "btn btn-small btn-ghost", type: "button", onclick: resetProgress }, t("resetProgress")))
    ));
    setRefresh(showHub);
  }

  function resetProgress() {
    if (!confirm(t("confirmReset"))) return;
    state = freshState();
    save();
    updateCoins();
    showStarter();
  }

  /* =========================================================
     COLLECTION VIEW (one section)
     ========================================================= */
  function showCollection(sectionId) {
    const sec = SECTION[sectionId];
    const cards = sectionCards(sectionId).map(c => owned(c.id)
      ? cardEl(c, { zoom: true })
      : el("div", { class: "card locked", style: "--sec:" + sec.color },
          el("div", { class: "card-band", text: sec.name }),
          el("div", { class: "locked-mark", text: "?" }),
          el("div", { class: "card-name", text: t("notCollected") })));
    const rare = rareFor(sectionId);
    const status = bonusStatus(sectionId);
    const rareEl = rare && state.rares[rare.id]
      ? cardEl(RARE[rare.id], { rare: true, zoom: true })
      : el("div", { class: "card locked rare-locked", style: "--sec:" + sec.color },
          el("div", { class: "card-band", text: t("rareCard") }),
          el("div", { class: "locked-mark", text: "★" }),
          el("div", { class: "card-name", text: status === "none" ? t("rareLockedNone") : t("rareLockedReady") }));
    const rareAction = status === "ready" ? el("div", { class: "hub-actions" }, bonusButton(sectionId, true))
      : status === "locked" ? el("p", { class: "muted center-text", text: t("bonusLockedNote") })
      : null;

    render(el("section", { class: "screen" },
      el("button", { class: "btn btn-small btn-ghost", type: "button", onclick: showHub }, t("back")),
      el("h1", { style: "color:" + sec.color, text: sec.name }),
      el("p", { class: "muted", text: t("collectedCount", { got: sectionOwnedCount(sectionId), n: sectionCards(sectionId).length }) +
        (sectionOwnedCount(sectionId) ? t("tapToRead") : "") }),
      rareAction,
      el("div", { class: "card-grid" }, cards, rareEl)
    ));
    setRefresh(() => showCollection(sectionId));
  }

  /* =========================================================
     QUESTION ROUND
     ========================================================= */
  let round = null;

  function pickQuestions() {
    const thisRound = state.roundsPlayed + 1;
    const picked = [];
    const take = list => { for (const q of list) { if (picked.length >= CONFIG.roundSize) break; if (!picked.includes(q)) picked.push(q); } };
    const due = shuffle(QUESTIONS.filter(q => state.missed[q.id] != null && state.missed[q.id] <= thisRound));
    const unseen = shuffle(QUESTIONS.filter(q => !state.seen.includes(q.id)));
    const rest = shuffle(QUESTIONS.filter(q => !state.lastRound.includes(q.id)));
    take(due.slice(0, 2));   // at most 2 review questions per round
    take(unseen);
    take(rest);
    take(shuffle(QUESTIONS));
    return shuffle(picked);
  }

  function startRound() {
    if (!QUESTIONS.length) { alert(t("noQuestions")); return; }
    round = { qs: pickQuestions(), i: 0, correct: 0, coins: 0, results: [] };
    showQuestion();
  }

  function showQuestion() {
    const q = round.qs[round.i];
    const sec = SECTION[q.section];
    const body = el("div", { class: "q-body" });
    const feedback = el("div", { class: "q-feedback" });

    const dots = round.qs.map((_, i) => el("span", { class: "dot" +
      (i < round.i ? (round.results[i] ? " ok" : " bad") : i === round.i ? " now" : "") }));

    render(el("section", { class: "screen question", style: "--sec:" + sec.color },
      el("div", { class: "q-top" },
        el("div", { class: "dots" }, dots),
        round.bonus
          ? el("span", { class: "pill bonus-pill", text: t("bonusPill", { need: CONFIG.bonusToWin, n: round.qs.length }) })
          : el("span", { class: "pill streak" + (state.streak >= 2 ? " hot" : ""), text: t("streak", { n: state.streak }) })),
      el("div", { class: "q-tags" },
        el("span", { class: "tag sec", text: sec.name }),
        el("span", { class: "tag", text: kindLabel(q.kind) })),
      el("h2", { class: "q-prompt", text: q.prompt }),
      body, feedback));

    const done = ok => finishQuestion(q, ok, feedback);
    if (q.type === "choice") renderChoice(q, body, done);
    else if (q.type === "match") renderMatch(q, body, done);
    else if (q.type === "order") renderOrder(q, body, done);
    else if (q.type === "sort") renderSort(q, body, done);
  }

  function finishQuestion(q, ok, feedbackEl) {
    const thisRound = state.roundsPlayed + 1;
    const bonusMode = !!round.bonus;   // bonus rounds: no coins, streak untouched
    state.answered++;
    let earned = 0, bonus = 0;
    if (ok) {
      state.correct++;
      round.correct++;
      delete state.missed[q.id];
      if (!bonusMode) {
        state.streak++;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
        earned = CONFIG.coinsPerCorrect;
        if (state.streak % CONFIG.streakEvery === 0) bonus = CONFIG.streakBonus;
        state.coins += earned + bonus;
        round.coins += earned + bonus;
      }
    } else {
      if (!bonusMode) state.streak = 0;
      state.missed[q.id] = thisRound + CONFIG.missedReturnAfter;
      state.missCounts[q.id] = (state.missCounts[q.id] || 0) + 1;
    }
    if (!state.seen.includes(q.id)) state.seen.push(q.id);
    round.results.push(ok);
    save();
    updateCoins();
    if (ok && !bonusMode) bumpCoins();

    const last = round.i === round.qs.length - 1;
    feedbackEl.replaceChildren(el("div", { class: "feedback " + (ok ? "ok" : "bad") },
      el("div", { class: "fb-title" },
        ok ? (bonusMode ? t("correctPlain") : t("correctCoins", { n: earned }))
           : (bonusMode ? t("notQuitePlain") : t("notQuite")),
        bonus ? el("span", { class: "fb-bonus", text: t("streakBonus", { n: bonus }) }) : null),
      el("p", { class: "fb-explain", text: q.explain }),
      el("button", { class: "btn btn-primary", type: "button", onclick: () => {
        if (last) { if (bonusMode) showBonusResult(); else showRoundSummary(); }
        else { round.i++; showQuestion(); }
      } }, last ? t("seeResults") : t("nextQuestion"))));
    feedbackEl.querySelector("button").focus();
  }

  function bumpCoins() {
    coinsEl.classList.remove("bump");
    void coinsEl.offsetWidth;
    coinsEl.classList.add("bump");
  }

  /* ---------- Type: multiple choice ---------- */
  function renderChoice(q, body, done) {
    const order = shuffle([...Array(q.options.length).keys()]);  // any position, including first
    const buttons = order.map(idx => el("button", { class: "option", type: "button", onclick: () => pick(idx) }, q.options[idx]));
    body.append(el("div", { class: "options" }, buttons));
    function pick(idx) {
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (order[i] === q.answer) b.classList.add("correct");
        else if (order[i] === idx) b.classList.add("wrong");
      });
      done(idx === q.answer);
    }
  }

  /* ---------- Type: match pairs ---------- */
  function renderMatch(q, body, done) {
    const n = q.pairs.length;
    const rightOrder = shuffleIndexes(n);
    const link = new Array(n).fill(null);  // left index -> right original index
    let selected = null, checked = false;
    const wrap = el("div", { class: "match" });
    const hint = el("p", { class: "muted small", text: t("hintMatch") });
    const checkBtn = el("button", { class: "btn btn-primary", type: "button", disabled: true, onclick: check }, t("checkAnswer"));
    body.append(hint, wrap, checkBtn);
    draw();

    function draw() {
      const left = q.pairs.map((p, i) => el("button", {
        class: "m-item" + (selected === i ? " selected" : "") + (link[i] != null ? " linked p" + i : "") + resultClass(i),
        type: "button", disabled: checked, onclick: () => { selected = i; draw(); } }, p[0]));
      const right = rightOrder.map(r => {
        const owner = link.indexOf(r);
        return el("button", {
          class: "m-item" + (owner >= 0 ? " linked p" + owner : "") + (owner >= 0 ? resultClass(owner) : ""),
          type: "button", disabled: checked, onclick: () => tapRight(r) }, q.pairs[r][1]);
      });
      wrap.replaceChildren(el("div", { class: "m-col" }, left), el("div", { class: "m-col" }, right));
      checkBtn.disabled = checked || link.includes(null);
    }
    function resultClass(i) { return checked ? (link[i] === i ? " correct" : " wrong") : ""; }
    function tapRight(r) {
      const owner = link.indexOf(r);
      if (selected == null) { if (owner >= 0) link[owner] = null; draw(); return; }
      if (owner >= 0) link[owner] = null;
      link[selected] = r;
      selected = link.indexOf(null) >= 0 ? link.indexOf(null) : null;
      draw();
    }
    function check() {
      checked = true; selected = null; draw(); checkBtn.remove();
      const ok = link.every((r, i) => r === i);
      if (!ok) body.append(solution(q.pairs.map(p => p[0] + " → " + p[1])));
      done(ok);
    }
  }

  /* ---------- Type: put in order ---------- */
  function renderOrder(q, body, done) {
    const pool = shuffleIndexes(q.items.length);
    const seq = [];
    let checked = false;
    const hint = el("p", { class: "muted small", text: t("hintOrder") });
    const seqEl = el("ol", { class: "order-seq" });
    const poolEl = el("div", { class: "order-pool" });
    const checkBtn = el("button", { class: "btn btn-primary", type: "button", disabled: true, onclick: check }, t("checkAnswer"));
    body.append(hint, seqEl, poolEl, checkBtn);
    draw();

    function draw() {
      seqEl.replaceChildren(...q.items.map((_, slot) => {
        const idx = seq[slot];
        if (idx == null) return el("li", { class: "slot empty" }, el("span", { text: "…" }));
        return el("li", { class: "slot" + (checked ? (idx === slot ? " correct" : " wrong") : "") },
          el("button", { class: "slot-btn", type: "button", disabled: checked,
            onclick: () => { seq.splice(slot, 1); pool.push(idx); draw(); } }, q.items[idx]));
      }));
      poolEl.replaceChildren(...pool.map(idx => el("button", { class: "chip", type: "button", disabled: checked,
        onclick: () => { pool.splice(pool.indexOf(idx), 1); seq.push(idx); draw(); } }, q.items[idx])));
      checkBtn.disabled = checked || pool.length > 0;
    }
    function check() {
      checked = true; draw(); checkBtn.remove();
      const ok = seq.every((idx, slot) => idx === slot);
      if (!ok) body.append(solution(q.items.map((t, i) => (i + 1) + ". " + t)));
      done(ok);
    }
  }

  /* ---------- Type: sort into categories ---------- */
  function renderSort(q, body, done) {
    const place = new Array(q.items.length).fill(-1);  // -1 = unsorted
    const order = shuffleIndexes(q.items.length);
    let selected = null, checked = false;
    const hint = el("p", { class: "muted small", text: t("hintSort") });
    const poolEl = el("div", { class: "sort-pool" });
    const bucketsEl = el("div", { class: "sort-buckets" });
    const checkBtn = el("button", { class: "btn btn-primary", type: "button", disabled: true, onclick: check }, t("checkAnswer"));
    body.append(hint, poolEl, bucketsEl, checkBtn);
    draw();

    function chip(i) {
      return el("button", {
        class: "chip" + (selected === i ? " selected" : "") +
          (checked ? (place[i] === q.items[i].bucket ? " correct" : " wrong") : ""),
        type: "button", disabled: checked,
        onclick: e => { e.stopPropagation(); selected = selected === i ? null : i; draw(); } }, q.items[i].text);
    }
    function draw() {
      const unsorted = order.filter(i => place[i] === -1);
      poolEl.replaceChildren(...(unsorted.length ? unsorted.map(chip) : [el("span", { class: "muted small", text: checked ? "" : t("allSorted") })]));
      poolEl.onclick = () => { if (selected != null && !checked) { place[selected] = -1; selected = null; draw(); } };
      bucketsEl.replaceChildren(...q.buckets.map((name, b) => el("div", {
        class: "bucket" + (selected != null ? " ready" : ""),
        onclick: () => { if (selected != null && !checked) { place[selected] = b; selected = null; draw(); } } },
        el("div", { class: "bucket-name", text: name }),
        el("div", { class: "bucket-items" }, order.filter(i => place[i] === b).map(chip)))));
      checkBtn.disabled = checked || place.includes(-1);
    }
    function check() {
      checked = true; selected = null; draw(); checkBtn.remove();
      const ok = q.items.every((it, i) => place[i] === it.bucket);
      if (!ok) body.append(solution(q.buckets.map((name, b) =>
        name + ": " + q.items.filter(it => it.bucket === b).map(it => it.text).join(", "))));
      done(ok);
    }
  }

  function solution(lines) {
    return el("div", { class: "solution" },
      el("div", { class: "solution-title", text: t("correctAnswer") }),
      lines.map(t => el("div", { text: t })));
  }

  /* =========================================================
     BONUS ROUNDS (win a section's rare card)
     ========================================================= */
  // Prefer level-2 (deeper thinking) questions, and avoid repeating the last attempt's questions.
  function pickBonusQuestions(id) {
    const last = (state.bonus[id] && state.bonus[id].lastQs) || [];
    const qs = ALL_QUESTIONS.filter(q => q.section === id);
    const fresh = q => !last.includes(q.id);
    const order = [
      ...shuffle(qs.filter(q => q.level === 2 && fresh(q))),
      ...shuffle(qs.filter(q => q.level !== 2 && fresh(q))),
      ...shuffle(qs.filter(q => q.level === 2 && !fresh(q))),
      ...shuffle(qs.filter(q => q.level !== 2 && !fresh(q)))
    ];
    return order.slice(0, CONFIG.bonusSize);
  }

  function showBonusIntro(id) {
    const sec = SECTION[id];
    const status = bonusStatus(id);
    if (status !== "ready") { showCollection(id); return; }
    const n = Math.min(CONFIG.bonusSize, ALL_QUESTIONS.filter(q => q.section === id).length);
    render(el("section", { class: "screen center bonus-intro", style: "--sec:" + sec.color },
      el("div", { class: "bonus-tag", text: t("bonusTag") }),
      el("h1", { text: sec.name }),
      el("p", { class: "lead", text: t("bonusLead", { n, section: sec.name, need: Math.min(CONFIG.bonusToWin, n) }) }),
      el("div", { class: "card locked rare-locked mystery", style: "--sec:" + sec.color },
        el("div", { class: "card-band", text: t("rareCard") }),
        el("div", { class: "locked-mark", text: "★" }),
        el("div", { class: "card-name", text: "???" })),
      el("p", { class: "muted small", text: t("bonusNoStakes") }),
      el("div", { class: "hub-actions" },
        el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => startBonus(id) }, t("startBonus")),
        el("button", { class: "btn btn-big", type: "button", onclick: showHub }, t("notYet")))
    ));
    setRefresh(() => showBonusIntro(id));
  }

  function startBonus(id) {
    const qs = pickBonusQuestions(id);
    if (!qs.length) { alert(t("noSectionQuestions")); return; }
    round = { qs, i: 0, correct: 0, coins: 0, results: [], bonus: id };
    showQuestion();
  }

  function showBonusResult() {
    const id = round.bonus;
    const sec = SECTION[id];
    const r = rareFor(id);
    const need = Math.min(CONFIG.bonusToWin, round.qs.length);
    const won = round.correct >= need;
    const b = state.bonus[id] || (state.bonus[id] = { attempts: 0, lastQs: [], lockedUntil: 0 });
    b.attempts++;
    b.lastQs = round.qs.map(q => q.id);
    if (won) state.rares[r.id] = true;
    else b.lockedUntil = state.roundsPlayed + 1;   // unlocks after one more regular round
    save();

    const score = el("div", { class: "summary-stats" },
      el("div", { class: "big-stat" }, el("strong", { text: round.correct + "/" + round.qs.length }), el("span", { text: t("correctLabel") })));

    if (!won) {
      render(el("section", { class: "screen center" },
        el("h1", { text: t("notThisTime") }),
        score,
        el("p", { class: "lead", text: t("bonusFailLead", { need, section: sec.name }) }),
        el("div", { class: "hub-actions" },
          el("button", { class: "btn btn-primary btn-big", type: "button", onclick: startRound }, t("playRound")),
          el("button", { class: "btn btn-big", type: "button", onclick: showHub }, t("viewCollection")))));
      return;
    }

    const stage = el("div", { class: "stage" });
    const status = el("div", { class: "reveal-status" });
    render(el("section", { class: "screen center" },
      el("h1", { text: t("rareWon") }), score, stage, status));
    playPack(stage, { noPack: true, items: [{ id: r.id, rare: true }], onDone: () => {
      const got = Object.keys(state.rares).length, total = SET.rareCards.length;
      status.append(
        el("p", { class: "pack-result" },
          el("strong", { text: r.name }), t("joinsRare", { got, total })),
        got === total ? el("div", { class: "banner" }, el("strong", { text: t("allRaresWon") })) : "",
        bonusReadyBox() || "",
        el("div", { class: "hub-actions" },
          el("button", { class: "btn btn-primary btn-big", type: "button", onclick: showHub }, t("viewCollection")),
          el("button", { class: "btn btn-big", type: "button", onclick: startRound }, t("playRound")),
          el("button", { class: "btn btn-big", type: "button", onclick: showShop }, t("packShop"))));
    } });
  }

  /* ---------- Round summary ---------- */
  function showRoundSummary() {
    state.roundsPlayed++;
    state.lastRound = round.qs.map(q => q.id);
    save();
    const list = round.qs.map((q, i) => el("li", { class: round.results[i] ? "ok" : "bad" },
      el("span", { class: "mark", text: round.results[i] ? "✓" : "✗" }),
      el("span", { text: q.prompt })));

    render(el("section", { class: "screen center" },
      el("h1", { text: t("roundComplete") }),
      el("div", { class: "summary-stats" },
        el("div", { class: "big-stat" }, el("strong", { text: round.correct + "/" + round.qs.length }), el("span", { text: t("correctLabel") })),
        el("div", { class: "big-stat" }, el("strong", { text: "+" + round.coins }), el("span", { text: t("coinsEarned") })),
        el("div", { class: "big-stat" }, el("strong", { text: state.coins }), el("span", { text: t("totalCoins") }))),
      el("ul", { class: "summary-list" }, list),
      el("p", { class: "muted", text: t("missedComeBack") }),
      bonusReadyBox(),
      el("div", { class: "hub-actions" },
        el("button", { class: "btn btn-primary btn-big", type: "button", onclick: startRound }, t("playAnother")),
        el("button", { class: "btn btn-big", type: "button", onclick: showShop }, t("shopTitle")),
        el("button", { class: "btn btn-big", type: "button", onclick: showHub }, t("viewCollection")))
    ));
  }

  /* =========================================================
     END-OF-PERIOD RESULTS (exit ticket)
     ========================================================= */
  function answerText(q) {
    if (q.type === "choice") return q.options[q.answer];
    if (q.type === "match") return q.pairs.map(p => p[0] + " → " + p[1]).join(" · ");
    if (q.type === "order") return q.items.join(" → ");
    if (q.type === "sort") return q.buckets.map((b, i) =>
      b + ": " + q.items.filter(it => it.bucket === i).map(it => it.text).join(", ")).join(" | ");
    return "";
  }

  // Most-missed questions first; ones still not answered correctly come before ones fixed later.
  function mostMissed(limit) {
    return Object.keys(state.missCounts)
      .map(id => ({ q: ALL_QUESTIONS.find(x => x.id === id), times: state.missCounts[id], open: state.missed[id] != null }))
      .filter(m => m.q)
      .sort((a, b) => (b.open - a.open) || (b.times - a.times))
      .slice(0, limit);
  }

  function fmtDate(t) {
    return new Date(t).toLocaleDateString(window.SANGRAHA_TEXT && TEXT[lang] ? TEXT[lang].dateLocale : undefined,
      { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  function showResults() {
    const total = SET.cards.length, have = totalOwned();
    const rares = Object.keys(state.rares).length;
    const accuracy = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
    const nameShown = el("span", { class: "rs-name-shown", text: state.playerName || "" });
    const nameInput = el("input", { class: "rs-name-input", type: "text", maxlength: "40",
      placeholder: t("namePlaceholder"), "aria-label": t("nameAria"), value: state.playerName || "" });
    nameInput.addEventListener("input", () => {
      state.playerName = nameInput.value.trim();
      nameShown.textContent = state.playerName;
      save();
    });

    const stat = (value, label) => el("div", { class: "rs-stat" }, el("strong", { text: String(value) }), el("span", { text: label }));

    const sections = SET.sections.map(s => {
      const n = sectionCards(s.id).length, got = sectionOwnedCount(s.id);
      const won = bonusStatus(s.id) === "won";
      return el("li", { class: "rs-sec" + (got === n ? " done" : ""), style: "--sec:" + s.color },
        el("span", { class: "rs-sec-name", text: s.name }),
        el("span", { class: "rs-sec-count", text: got + "/" + n + (won ? " ★" : "") }));
    });

    const missed = mostMissed(5);
    const review = missed.length
      ? el("ol", { class: "rs-missed" }, missed.map(m => el("li", { style: "--sec:" + SECTION[m.q.section].color },
          el("div", { class: "rs-missed-top" },
            el("span", { class: "tag sec", text: SECTION[m.q.section].short || SECTION[m.q.section].name }),
            el("span", { class: "rs-status" + (m.open ? " open" : ""), text: m.open ? t("stillToReview") : t("gotItLater") }),
            m.times > 1 ? el("span", { class: "rs-times", text: t("missedTimes", { n: m.times }) }) : null),
          el("div", { class: "rs-q", text: m.q.prompt }),
          el("div", { class: "rs-a" }, el("strong", { text: t("answerLabel") }), answerText(m.q)),
          el("div", { class: "rs-why", text: m.q.explain }))))
      : el("p", { class: "rs-none", text: state.answered
          ? t("noMisses")
          : t("noAnswers") });

    render(el("section", { class: "screen results" },
      el("div", { class: "rs-sheet" },
        el("div", { class: "rs-head" },
          el("div", {},
            el("div", { class: "rs-kicker", text: t("resultsKicker", { set: SET.title }) }),
            el("h1", { class: "rs-title" }, t("exitTicket")),
            el("div", { class: "rs-meta" },
              el("label", { class: "rs-name-label" }, t("nameLabel"), nameInput, nameShown),
              el("span", { text: fmtDate(Date.now()) })))),
        el("div", { class: "rs-stats" },
          stat(have + "/" + total, t("statCards")),
          stat(rares + "/" + SET.rareCards.length, t("statRares")),
          stat(state.answered, t("statAnswered")),
          stat(accuracy + (lang === "fr" ? " %" : "%"), t("statAccuracy")),
          stat(state.bestStreak, t("statBest")),
          stat(state.packsOpened, t("statPacks"))),
        el("h2", { text: t("sections") }),
        el("ul", { class: "rs-secs" }, sections),
        el("h2", { text: t("conceptsReview") }),
        review),
      el("p", { class: "muted center-text no-print", text: t("handIn") }),
      el("div", { class: "hub-actions no-print" },
        el("button", { class: "btn btn-primary btn-big", type: "button", onclick: () => window.print() }, t("printBtn")),
        el("button", { class: "btn btn-big", type: "button", onclick: showHub }, t("backToGame")))
    ));
    setRefresh(showResults);
    if (!state.playerName) nameInput.focus({ preventScroll: true });
  }

  /* =========================================================
     TEACHER TEST PANEL
     Open it by typing the word  teacher  anywhere (not in a text box),
     or by opening the page with  #teacher  at the end of the address.
     For testing only: it changes the save in this browser.
     ========================================================= */
  function giveCards(ids) { ids.forEach(id => (state.collection[id] = Math.max(1, state.collection[id] || 0))); }

  function addSampleAnswers(n) {
    const qs = shuffle(QUESTIONS);
    for (let i = 0; i < n; i++) {
      const q = qs[i % qs.length];
      const ok = Math.random() < 0.75;
      state.answered++;
      if (!state.seen.includes(q.id)) state.seen.push(q.id);
      if (ok) { state.correct++; delete state.missed[q.id]; }
      else { state.missCounts[q.id] = (state.missCounts[q.id] || 0) + 1; state.missed[q.id] = state.roundsPlayed + 1; }
    }
    state.roundsPlayed += Math.ceil(n / CONFIG.roundSize);
    state.bestStreak = Math.max(state.bestStreak, 6);
  }

  const TEACHER = [
    { label: "tp_coins500", run: () => { state.coins += 500; } },
    { label: "tp_coins2000", run: () => { state.coins += 2000; } },
    { label: "tp_complete", needsSection: true,
      run: id => giveCards(sectionCards(id).map(c => c.id)) },
    { label: "tp_almost", needsSection: true, hint: "tp_almostHint",
      run: id => { const cs = sectionCards(id); giveCards(cs.map(c => c.id)); delete state.collection[cs[cs.length - 1].id]; } },
    { label: "tp_rare", needsSection: true,
      run: id => { giveCards(sectionCards(id).map(c => c.id)); state.rares[rareFor(id).id] = true; } },
    { label: "tp_allCards", run: () => giveCards(SET.cards.map(c => c.id)) },
    { label: "tp_allRares", run: () => { giveCards(SET.cards.map(c => c.id)); SET.rareCards.forEach(r => (state.rares[r.id] = true)); } },
    { label: "tp_skipWait", run: () => Object.values(state.bonus).forEach(b => (b.lockedUntil = 0)) },
    { label: "tp_sample", hint: "tp_sampleHint", run: () => addSampleAnswers(40) },
    { label: "tp_results", go: () => showResults() },
    { label: "tp_reset", danger: true,
      run: () => { state = freshState(); }, go: () => showTitle() }
  ];

  let panelEl = null;
  function toggleTeacherPanel(force) {
    const open = force != null ? force : !panelEl;
    if (!open) { if (panelEl) panelEl.remove(); panelEl = null; return; }
    if (panelEl) return;
    if (!state.starterOpened) { state.starterOpened = true; state.startedAt = state.startedAt || Date.now(); giveCards(SET.starterPack.cards); save(); }
    const pick = el("select", { class: "tp-select", "aria-label": t("tpSection").trim() },
      SET.sections.map(s => el("option", { value: s.id, text: s.name })));
    const note = el("div", { class: "tp-note", "aria-live": "polite" });
    const buttons = TEACHER.map(a => el("button", { class: "tp-btn" + (a.danger ? " danger" : "") + (a.needsSection ? " sec" : ""),
      type: "button", title: a.hint ? t(a.hint) : "", onclick: () => {
        if (a.danger && !confirm(t("tpConfirmReset"))) return;
        if (a.run) a.run(pick.value);
        save(); updateCoins();
        (a.go || showHub)();
        note.textContent = "✓ " + t(a.label) + (a.needsSection ? " : " + SECTION[pick.value].name : "");
      } }, t(a.label) + (a.needsSection ? " ↑" : "")));
    panelEl = el("aside", { class: "teacher-panel", role: "dialog", "aria-label": t("tpTitle") },
      el("div", { class: "tp-head" },
        el("strong", { text: t("tpTitle") }),
        el("button", { class: "tp-close", type: "button", "aria-label": t("tpClose"), onclick: () => toggleTeacherPanel(false) }, "×")),
      el("p", { class: "tp-warn", text: t("tpWarn") }),
      el("label", { class: "tp-label" }, t("tpSection"), pick),
      el("div", { class: "tp-grid" }, buttons),
      note);
    document.body.append(panelEl);
  }

  (function listenForTeacher() {
    const word = "teacher";
    let typed = "";
    document.addEventListener("keydown", e => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
      if (e.key === "Escape" && panelEl) { toggleTeacherPanel(false); return; }
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      typed = (typed + e.key.toLowerCase()).slice(-word.length);
      if (typed === word) { typed = ""; toggleTeacherPanel(); }
    });
    const fromHash = () => { if (location.hash === "#teacher") toggleTeacherPanel(true); };
    window.addEventListener("hashchange", fromHash);
    setTimeout(fromHash, 0);
  })();

  /* ---------- Start ---------- */
  applyDataLang();
  updateCoins();
  showTitle();
})();
