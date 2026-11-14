// Source of truth is commander-template.md; overview.json only adds badge/blurb per section number.
const slug = (t) => t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
const $ = (id) => document.getElementById(id);
const sections = []; // {num, title, html, todo, id, card}
const count = (badge) => +(String(badge ?? "").match(/\d+/)?.[0] ?? 0); // "~12" -> 12
let current = null; // id of the section open in the reader
let opener = null; // the control that opened the reader, to give focus back on close
let terms = []; // [term, meaning] pairs from the template's Glossary table
const toggle = (id) => (current === id ? close() : open(id));
const controls = () => document.querySelectorAll('[aria-controls="reader"]');

function parse(md) {
  const lines = md.split("\n");
  let cur = null, banner = [];
  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    if (h2) { cur = { title: h2[1], body: [] }; sections.push(cur); continue; }
    if (line.startsWith("# ")) { $("title").textContent = line.slice(2); continue; }
    (cur ? cur.body : banner).push(line);
  }
  for (const s of sections) {
    const m = s.title.match(/^(\d+)\.\s+(.*)/);
    s.num = m ? m[1] : null;
    s.name = m ? m[2] : s.title;
    s.id = slug(s.title);
    // [[Card Name]] in the markdown becomes an exact-name Scryfall search link.
    const body = s.body.join("\n").trim().replace(/\[\[([^\]]+)\]\]/g, (_, n) =>
      `[${n}](https://scryfall.com/search?q=${encodeURIComponent('!"' + n + '"')})`);
    s.todo = /^\*To come/.test(body);
    s.html = withIds(marked.parse(body, { gfm: true }));
  }
  return marked.parse(banner.join("\n"));
}

// Give every heading a GitHub-style id so the draft's own #anchors keep working.
// textContent, not the HTML, so &quot; and &#39; don't end up in the slug.
function withIds(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  for (const h of d.querySelectorAll("h3, h4")) h.id = slug(h.textContent);
  // Wide tables scroll inside a wrapper, so the table itself can still fill the column.
  for (const t of d.querySelectorAll("table")) { const w = document.createElement("div"); w.className = "scroll"; t.before(w); w.append(t); }
  return d.innerHTML;
}

// One link per ### subsection: the pillar columns and the reader's contents list.
function toc(s) {
  const subs = document.createElement("ul");
  subs.className = "subs";
  const doc = document.createElement("div");
  doc.innerHTML = s.html;
  for (const h of doc.querySelectorAll("h3")) {
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    subs.append(document.createElement("li"));
    subs.lastChild.append(a);
  }
  return subs;
}

// One entry per section: the heading's button opens it in place (and closes it again). Pillars also list their subsections.
function card(s, over, pillar) {
  const o = (s.num && over[s.num]) || {};
  const n = count(o.badge);
  const li = document.createElement("li");
  li.className = "col" + (s.todo ? " todo" : "");
  li.innerHTML = `<h2><button class="head" aria-expanded="false" aria-controls="reader"><span class="badge" aria-hidden="true"></span><strong></strong><span class="vh"></span></button></h2><p class="blurb"></p>`;
  li.querySelector(".badge").textContent = o.badge ?? "";
  li.querySelector("strong").textContent = s.name;
  li.querySelector(".vh").textContent = n ? `, about ${n} cards` : "";
  li.querySelector(".blurb").textContent = s.todo ? "To come." : o.blurb ?? "";
  const head = li.querySelector(".head");
  head.dataset.id = s.id;
  head.addEventListener("click", () => toggle(s.id));
  if (pillar) li.append(toc(s));
  return li;
}

// Light up one pillar's slots in the deck strip (null clears it). Hover is a bonus; click still opens.
function light(id) {
  id ??= current; // leaving a hover falls back to the section being read
  $("deck").classList.toggle("lit", !!id);
  for (const i of $("deck").querySelectorAll(".slots i")) i.classList.toggle("on", i.dataset.id === id);
}
function hoverLights(el, id) {
  el.addEventListener("mouseenter", () => light(id));
  el.addEventListener("mouseleave", () => light(null));
  el.addEventListener("focusin", () => light(id));
  el.addEventListener("focusout", () => light(null));
}

// The hero: a Commander deck's 99 slots, the pillars' share coloured from their overview.json badge.
function deck(pillars, over) {
  const DECK = 99;
  if (!pillars.length) {
    $("deck").querySelector("figcaption").textContent = "The deck overview didn't load, so the sections are listed plainly below. Reloading the page may bring it back.";
    return;
  }
  const slots = document.createElement("div");
  slots.className = "slots";
  slots.setAttribute("aria-hidden", "true");
  const legend = document.createElement("div");
  legend.className = "legend";
  let used = 0;
  pillars.forEach((s, i) => {
    s.color = `var(--p${(i % 3) + 1})`; // three pillar colours in style.css; a fourth would reuse the first
    const n = count(over[s.num].badge);
    used += n;
    for (let k = 0; k < n; k++) {
      const slot = document.createElement("i");
      slot.dataset.id = s.id;
      slot.style.setProperty("--c", s.color);
      slots.append(slot);
    }
    const b = document.createElement("button");
    b.dataset.id = s.id;
    b.setAttribute("aria-controls", "reader");
    b.setAttribute("aria-expanded", false);
    b.innerHTML = `<strong></strong> <span class="n"></span>`;
    b.style.setProperty("--c", s.color);
    b.querySelector("strong").textContent = s.name;
    b.querySelector(".n").textContent = over[s.num].badge;
    b.setAttribute("aria-label", `${s.name}, about ${n} cards`);
    b.addEventListener("click", () => toggle(s.id));
    hoverLights(b, s.id);
    legend.append(b);
  });
  slots.insertAdjacentHTML("beforeend", "<i></i>".repeat(Math.max(DECK - used, 0)));
  legend.insertAdjacentHTML("beforeend", `<span>Lands and your own categories, about ${DECK - used}</span>`);
  $("deck").prepend(slots, legend);
  $("deck").querySelector("figcaption").textContent =
    `A Commander deck is 99 cards plus the commander. The pillars take about ${used} of them.`;
}

// First mention of each glossary term in the open section links to the glossary, meaning in the tooltip.
function linkTerms(root) {
  const seen = new Set();
  const skip = (n) => n.parentElement.closest("a, code, h2, h3, h4, th");
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walk.nextNode()) if (!skip(walk.currentNode)) nodes.push(walk.currentNode);
  while (nodes.length) {
    const node = nodes.shift();
    for (const [term, meaning] of terms) {
      if (seen.has(term)) continue;
      const m = node.data.match(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:e?s)?\\b`, "i"));
      if (!m) continue;
      seen.add(term);
      const word = node.splitText(m.index);
      nodes.push(node, word.splitText(m[0].length)); // re-scan the text either side for other terms
      const a = document.createElement("a");
      a.href = "#glossary";
      a.className = "term";
      a.title = meaning;
      a.textContent = word.data;
      word.replaceWith(a);
      break;
    }
  }
}

// Unnumbered sections ("How to read the numbers") sit open under the strip. Numbered sections before the
// first pillar explain the strip, so the caption links to them; the rest sit below the pillar row.
function render(over) {
  let seenPillar = false;
  const pillars = sections.filter((s) => s.num && over[s.num]?.pillar);
  deck(pillars, over);
  const glossary = document.createElement("div");
  glossary.innerHTML = sections.find((s) => s.title === "Glossary")?.html ?? "";
  terms = [...glossary.querySelectorAll("tbody tr")].map((tr) => [tr.cells[0].textContent.trim(), tr.cells[1]?.textContent.trim() ?? ""]);
  const lead = [];
  for (const s of sections) {
    if (!s.num && s.title !== "Glossary") {
      const sec = document.createElement("details");
      sec.open = true;
      sec.innerHTML = `<summary></summary>` + s.html;
      sec.querySelector("summary").textContent = s.title;
      $("intro").append(sec);
      continue;
    }
    s.card = true;
    const pillar = pillars.includes(s);
    seenPillar ||= pillar;
    if (!seenPillar && pillars.length) { lead.push(s); continue; }
    const li = card(s, over, pillar);
    if (pillar) { li.style.setProperty("--c", s.color); hoverLights(li, s.id); }
    $(pillar ? "pillars" : seenPillar ? "after" : "before").append(li);
  }
  if (lead.length) {
    const cap = $("deck").querySelector("figcaption");
    cap.append(" More in ");
    lead.forEach((s, i) => {
      const a = document.createElement("a");
      a.href = "#" + s.id;
      a.textContent = s.name;
      cap.append(i ? ", " : "", a);
    });
    cap.append(".");
  }
}

// Where the reader goes: under the row of the section's button (on a phone, the stacked columns mean
// right under the tapped column itself); sections with no button, like the ones the caption links, go under the intro.
// shortcut: placement is decided on open, not on resize; reopen to re-place after rotating a phone.
const slot = document.createElement("li");
slot.className = "reader-slot";
function place(id) {
  const li = document.querySelector(`.head[data-id="${id}"]`)?.closest("li");
  if (!li) return $("intro").after($("reader"));
  if (matchMedia("(max-width: 48rem)").matches) { slot.append($("reader")); li.after(slot); }
  else li.closest("ul").after($("reader"));
}

// Opening from the overview, or moving to another section, adds a history entry (state.reader counts them),
// so phone Back steps back through what you read and then closes the reader instead of leaving the site.
// Jumping to an anchor inside the open section replaces the entry.
function open(id, anchor, fromHistory) {
  const s = sections.find((x) => x.id === id);
  if (!s) return;
  const url = "#" + (anchor || id);
  const depth = history.state?.reader ?? 0;
  // Safari doesn't focus clicked buttons/links, so fall back to the element the click landed on.
  if (!current) opener = document.activeElement !== document.body ? document.activeElement : fromHistory ? null : lastClick;
  if (!fromHistory) current === id ? history.replaceState(history.state, "", url) : history.pushState({ reader: depth + 1 }, "", url);
  const reader = $("reader");
  if (current !== id) {
    $("reader-title").textContent = s.title;
    $("reader-body").innerHTML = s.html;
    if (s.title !== "Glossary") linkTerms($("reader-body"));
    $("reader-toc").replaceChildren(toc(s));
    const cards = sections.filter((x) => x.card);
    const next = cards[cards.indexOf(s) + 1];
    $("reader-next").hidden = !next;
    if (next) { $("reader-next").href = "#" + next.id; $("reader-next").textContent = "Next: " + next.title; }
    reader.style.setProperty("--c", s.color ?? "var(--fg)");
    place(id);
    for (const c of controls()) c.setAttribute("aria-expanded", c.dataset.id === id);
    current = id;
    reader.hidden = false;
    light(id);
  }
  const t = anchor && $("reader-body").querySelector("#" + CSS.escape(anchor));
  (t || reader).scrollIntoView({ block: "start" });
  const f = t || $("reader-title");
  f.tabIndex = -1;
  f.focus({ preventScroll: true });
}

function close(fromHistory) {
  if (!current) return;
  if (!fromHistory && history.state?.reader) return history.go(-history.state.reader); // popstate does the closing
  if (!fromHistory) history.replaceState(null, "", location.pathname + location.search);
  const head = document.querySelector(`.head[data-id="${current}"]`);
  $("reader").hidden = true;
  current = null;
  for (const c of controls()) c.setAttribute("aria-expanded", false);
  light(null);
  // Back to the control you opened it from. Arrived by a link? Show the overview from the top instead.
  if (opener?.isConnected) opener.focus();
  else { scrollTo(0, 0); head?.focus({ preventScroll: true }); }
  opener = null;
}

// Open whichever section owns an anchor: the one whose HTML holds that id ("27-left-out..." is in section 2).
function route(hash, fromHistory) {
  const a = hash.replace(/^#/, "");
  if (!a) return;
  const s = sections.find((x) => x.id === a) || sections.find((x) => x.html.includes(`id="${a}"`));
  if (s) open(s.id, s.id === a ? undefined : a, fromHistory);
}

let lastClick = null;
document.addEventListener("click", (e) => { lastClick = e.target.closest("button, a"); }, true);
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (a) { e.preventDefault(); route(a.getAttribute("href")); }
  if (e.target.closest("[data-close]")) close();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && current) close(); });
// Back/forward and hand-edited hashes. Fragment navigation fires popstate, so no hashchange listener.
addEventListener("popstate", () => (location.hash ? route(location.hash, true) : close(true)));

Promise.all([
  fetch("commander-template.md").then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); }),
  fetch("overview.json").then((r) => (r.ok ? r.json() : {})).catch((e) => (console.warn("overview.json ignored:", e), {})),
]).then(([md, over]) => {
  $("banner").innerHTML = parse(md);
  render(over);
  route(location.hash, true);
}).catch((err) => {
  $("banner").textContent = "The template didn't load (error " + err.message + "). Try reloading the page." +
    (location.protocol === "file:" ? " Browsers block this on file:// pages: serve the folder instead, e.g. `python3 -m http.server`." : "");
});
