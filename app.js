// Source of truth is commander-template.md; overview.json only adds badge/blurb/pillar per section number.
// Two states on one page: the overview (the deck as a ring) and the reader (one section, docs-style).
// The URL hash picks the state, so chat deep links and the Back button need no extra code.
const $ = (id) => document.getElementById(id);
const slug = (t) => t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
const count = (badge) => +(String(badge ?? "").match(/\d+/)?.[0] ?? 0); // "~12" -> 12
const calm = matchMedia("(prefers-reduced-motion: reduce)");
const wide = matchMedia("(min-width: 60rem)");
const SVG = "http://www.w3.org/2000/svg";
const DECK = 100, CX = 280, CY = 230, R1 = 124, R2 = 156;
const sections = []; // {title, num, name, id, html, todo, pillar, badge, blurb, color}
let terms = []; // [term, meaning] from the template's Glossary table
let current = null; // id of the section in the reader, null on the overview
let overviewY = 0; // scroll position to restore when coming back to the overview
const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

function parse(md) {
  let cur = null;
  const banner = [];
  for (const line of md.split("\n")) {
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

// GitHub-style heading ids so the template's own #anchors keep working; wide tables scroll in a wrapper.
function withIds(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  for (const h of d.querySelectorAll("h3, h4")) h.id = slug(h.textContent);
  for (const t of d.querySelectorAll("table")) { const w = document.createElement("div"); w.className = "scroll"; t.before(w); w.append(t); }
  return d.innerHTML;
}

const subs = (s) => [...new DOMParser().parseFromString(s.html, "text/html").querySelectorAll("h3")]
  .map((h) => ({ id: h.id, text: h.textContent }));
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const link = (href, text, cls) => { const a = el("a", cls, text); a.href = href; return a; };

// The ring: slot 0 is the commander, then each pillar's ~N slots in template order, then everything else.
function ring(pillars) {
  const svg = $("ring");
  const slot = (i, cls, id) => {
    const a = ((i + 0.5) / DECK) * 2 * Math.PI - Math.PI / 2;
    const l = document.createElementNS(SVG, "line");
    const [c, s] = [Math.cos(a), Math.sin(a)];
    l.setAttribute("x1", (CX + R1 * c).toFixed(1)); l.setAttribute("y1", (CY + R1 * s).toFixed(1));
    l.setAttribute("x2", (CX + R2 * c).toFixed(1)); l.setAttribute("y2", (CY + R2 * s).toFixed(1));
    l.setAttribute("class", "slot " + cls);
    l.style.setProperty("--i", i);
    if (id) l.dataset.id = id;
    return l;
  };
  const felt = document.createElementNS(SVG, "circle");
  Object.entries({ cx: CX, cy: CY, r: R1 - 14, class: "felt" }).forEach(([k, v]) => felt.setAttribute(k, v));
  svg.append(felt);
  // Four seats, yours at the bottom, nearest the reader. The turn pointer lights each one as it passes.
  [["You", 180], ["", 270], ["", 0], ["", 90]].forEach(([label, deg], k) => {
    const a = (deg - 90) * Math.PI / 180, r = R2 + 30;
    const g = document.createElementNS(SVG, "g");
    g.setAttribute("class", "seat");
    g.style.setProperty("--t", deg / 360); // fraction of the pointer's lap when it reaches this seat
    g.setAttribute("transform", `translate(${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}) rotate(${deg})`);
    g.innerHTML = `<rect x="-22" y="-5" width="44" height="10" rx="5"/>`;
    svg.append(g);
    if (label) {
      const t = document.createElementNS(SVG, "text");
      Object.entries({ x: CX, y: CY + r + 26, class: "seat-label", "text-anchor": "middle" }).forEach(([k2, v]) => t.setAttribute(k2, v));
      t.textContent = label;
      svg.append(t);
    }
  });
  let i = 0;
  svg.append(slot(i++, "cmd"));
  for (const s of pillars) {
    const n = count(s.badge);
    const a = document.createElementNS(SVG, "a");
    a.setAttribute("href", "#" + s.id);
    a.setAttribute("class", "arc");
    a.setAttribute("aria-label", `${s.name}, about ${n} cards`);
    a.dataset.id = s.id;
    a.style.setProperty("--c", s.color);
    const start = i;
    for (let k = 0; k < n; k++) a.append(slot(i++, "", s.id));
    // A wide invisible band over the arc, so the whole arc is one easy target, not 12 thin lines.
    const a0 = (start / DECK) * 2 * Math.PI - Math.PI / 2, a1 = (i / DECK) * 2 * Math.PI - Math.PI / 2;
    const pt = (r, t) => `${(CX + r * Math.cos(t)).toFixed(1)} ${(CY + r * Math.sin(t)).toFixed(1)}`;
    const hit = document.createElementNS(SVG, "path");
    hit.setAttribute("d", `M${pt(R1 - 18, a0)} L${pt(R2 + 18, a0)} A${R2 + 18} ${R2 + 18} 0 0 1 ${pt(R2 + 18, a1)} L${pt(R1 - 18, a1)} A${R1 - 18} ${R1 - 18} 0 0 0 ${pt(R1 - 18, a0)}Z`);
    hit.setAttribute("class", "hit");
    a.prepend(hit);
    // Label outside the arc's middle: big numeral, name under it.
    const mid = (a0 + a1) / 2, lr = R2 + 34, right = Math.cos(mid) >= 0;
    const t = document.createElementNS(SVG, "text");
    t.setAttribute("class", "arc-label");
    t.setAttribute("x", (CX + lr * Math.cos(mid)).toFixed(1));
    t.setAttribute("y", (CY + lr * Math.sin(mid)).toFixed(1));
    t.setAttribute("text-anchor", right ? "start" : "end");
    t.innerHTML = `<tspan class="arc-n"></tspan><tspan class="arc-name" dy="18"></tspan>`;
    t.firstChild.textContent = s.badge;
    t.lastChild.textContent = s.name;
    t.lastChild.setAttribute("x", t.getAttribute("x"));
    a.append(t);
    svg.append(a);
    hover(a, s);
  }
  const rest = DECK - i;
  while (i < DECK) svg.append(slot(i++, "rest"));
  const turn = document.createElementNS(SVG, "g");
  turn.setAttribute("class", "turn");
  turn.innerHTML = `<path d="M${CX} ${CY - R2 - 12} l-7 -12 h14z"/>`;
  svg.append(turn);
  const flag = document.createElementNS(SVG, "g");
  flag.setAttribute("class", "flag");
  flag.id = "flag";
  svg.append(flag);
  $("ring-cap").textContent = pillars.length
    ? `The pillars take about ${DECK - 1 - rest} of the 99. The other ${rest} are lands and your own categories.`
    : "The deck overview didn't load, so the sections are listed plainly. Reloading may bring it back.";
}

// Hovering or focusing a pillar (its arc or its row) lifts its arc and names it in the centre.
function hover(node, s) {
  const on = () => focusArc(s), off = () => focusArc(null);
  node.addEventListener("pointerenter", on); node.addEventListener("pointerleave", off);
  node.addEventListener("focusin", on); node.addEventListener("focusout", off);
}
function focusArc(s) {
  s ??= sections.find((x) => x.id === current && x.pillar) ?? null; // leaving a hover falls back to the open section
  document.body.toggleAttribute("data-lit", !!s);
  for (const a of $("ring").querySelectorAll(".arc")) a.classList.toggle("on", a.dataset.id === s?.id);
  $("center-n").textContent = s ? s.badge : "99";
  $("center-l").textContent = s ? s.name : "+ your commander";
}

// The last section you read gets a small flag on the ring and a note on its row (kept between visits).
function flag() {
  const id = store.get("lastRead");
  const s = sections.find((x) => x.id === id);
  for (const r of document.querySelectorAll(".row")) r.classList.toggle("last", r.dataset.id === id);
  const arc = s && $("ring").querySelector(`.arc[data-id="${id}"] .slot`);
  $("flag").innerHTML = arc ? `<circle cx="${arc.getAttribute("x2")}" cy="${arc.getAttribute("y2")}" r="5"/>` : "";
  $("flag").setAttribute("transform", "");
}

// First mention of each glossary term in a section links to the glossary, meaning in the tooltip.
function linkTerms(root) {
  const seen = new Set();
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walk.nextNode()) if (!walk.currentNode.parentElement.closest("a, code, h2, h3, h4, th")) nodes.push(walk.currentNode);
  while (nodes.length) {
    const node = nodes.shift();
    for (const [term, meaning] of terms) {
      if (seen.has(term)) continue;
      const m = node.data.match(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:e?s)?\\b`, "i"));
      if (!m) continue;
      seen.add(term);
      const word = node.splitText(m.index);
      nodes.push(node, word.splitText(m[0].length)); // re-scan the text either side for other terms
      const a = link("#glossary", word.data, "term");
      a.title = meaning;
      word.replaceWith(a);
      break;
    }
  }
}

function render(over, bannerHtml) {
  const pal = ["var(--ramp)", "var(--draw)", "var(--kill)"];
  let p = 0;
  for (const s of sections) {
    const o = (s.num && over[s.num]) || {};
    Object.assign(s, { pillar: !!o.pillar && count(o.badge) > 0, badge: o.badge, blurb: o.blurb });
    if (s.pillar) s.color = pal[p++ % pal.length]; // a fourth pillar would reuse the first colour
  }
  const pillars = sections.filter((s) => s.pillar);
  $("banner").innerHTML = bannerHtml;
  ring(pillars);

  // Overview text: the first blurb as the opening.
  const lead = sections.find((s) => s.num && !s.pillar && s.blurb);
  if (lead) $("lede").append(el("p", "lede", lead.blurb));
  for (const s of pillars) {
    const li = el("li", "row pillar");
    li.dataset.id = s.id;
    li.style.setProperty("--c", s.color);
    const a = link("#" + s.id, null, "row-link");
    a.append(el("span", "n", s.badge), el("strong", null, s.name), el("span", "blurb", s.blurb ?? ""));
    a.setAttribute("aria-label", `${s.name}, about ${count(s.badge)} cards. ${s.blurb ?? ""}`);
    li.append(a);
    const list = subs(s);
    if (list.length) {
      const ul = el("ul", "subs");
      ul.setAttribute("aria-label", `${s.name} subsections`);
      for (const h of list) ul.append(el("li")), ul.lastChild.append(link("#" + h.id, h.text));
      li.append(ul);
    }
    $("pillars").append(li);
    hover(a, s);
  }
  // Then the unnumbered sections ("How to read the numbers") in full, right under the pillars they qualify.
  for (const s of sections.filter((x) => !x.num && x.title !== "Glossary")) {
    const box = el("section", "note");
    box.append(el("h2", null, s.title));
    box.insertAdjacentHTML("beforeend", s.html);
    $("pillars").after(box);
  }
  for (const s of sections.filter((x) => (x.num || x.title === "Glossary") && !x.pillar)) {
    const li = el("li", "row" + (s.todo ? " todo" : ""));
    li.dataset.id = s.id;
    const a = link("#" + s.id, null, "row-link");
    a.append(el("span", "k", s.num ?? "A–Z"), el("strong", null, s.name), el("span", "blurb", s.todo ? "To come." : s.blurb ?? ""));
    li.append(a);
    $("others").append(li);
  }

  // Reader contents: every readable section; the open one expands to its subsections.
  for (const s of sections.filter((x) => x.num || x.title === "Glossary")) {
    const li = el("li");
    li.dataset.id = s.id;
    if (s.color) li.style.setProperty("--c", s.color);
    li.append(link("#" + s.id, s.num ? `${s.num}. ${s.name}` : s.name));
    const list = subs(s);
    if (list.length) {
      const ol = el("ol");
      for (const h of list) ol.append(el("li")), ol.lastChild.append(link("#" + h.id, h.text));
      li.append(ol);
    }
    $("toc-list").append(li);
  }

  const glossary = document.createElement("div");
  glossary.innerHTML = sections.find((s) => s.title === "Glossary")?.html ?? "";
  terms = [...glossary.querySelectorAll("tbody tr")].map((tr) => [tr.cells[0].textContent.trim(), tr.cells[1]?.textContent.trim() ?? ""]);
  flag();
}

// The sections the reader pages through, in template order.
const readable = () => sections.filter((s) => s.num || s.title === "Glossary");

function show(id, anchor) {
  const s = sections.find((x) => x.id === id);
  const body = document.body;
  if (!s) {
    // Back to the overview: restore where you were, then focus the row you opened.
    const was = current;
    current = null;
    body.dataset.view = "overview";
    $("doc").hidden = true;
    for (const n of document.querySelectorAll(".back")) n.hidden = true;
    focusArc(null);
    flag();
    scrollTo(0, overviewY);
    document.querySelector(`.row[data-id="${was}"] .row-link`)?.focus({ preventScroll: true });
    return;
  }
  if (!current) overviewY = scrollY;
  const changed = current !== id;
  current = id;
  body.dataset.view = "reader";
  for (const n of document.querySelectorAll(".back")) n.hidden = false;
  if (changed) {
    $("doc-num").textContent = s.num ?? "";
    $("doc-name").textContent = s.name;
    $("doc").style.setProperty("--c", s.color ?? "var(--ink)");
    $("doc-body").innerHTML = s.html;
    if (s.title !== "Glossary") linkTerms($("doc-body"));
    const list = readable(), k = list.indexOf(s);
    for (const [a, t, label] of [[$("prev"), list[k - 1], "Previous"], [$("next"), list[k + 1], "Next"]]) {
      a.hidden = !t;
      if (t) { a.href = "#" + t.id; a.innerHTML = `<small>${label}</small><span></span>`; a.lastChild.textContent = t.num ? `${t.num}. ${t.name}` : t.name; }
    }
    for (const li of $("toc-list").children) {
      li.classList.toggle("open", li.dataset.id === id);
      if (li.dataset.id === id) li.firstChild.setAttribute("aria-current", "page");
      else li.firstChild.removeAttribute("aria-current");
    }
    $("crumb").textContent = s.num ? `${s.num}. ${s.name}` : s.name;
    $("doc").hidden = false;
    $("doc").classList.remove("enter"); void $("doc").offsetWidth; $("doc").classList.add("enter");
    $("toc").open = wide.matches;
    store.set("lastRead", id);
    spy();
  }
  focusArc(null);
  const t = anchor && $("doc-body").querySelector("#" + CSS.escape(anchor));
  if (t) t.scrollIntoView({ block: "start" });
  else if (changed) scrollTo(0, 0);
  const f = t || $("doc-title");
  f.tabIndex = -1;
  f.focus({ preventScroll: true });
}

// Which section owns a hash: the section itself, or the one whose HTML holds that heading id.
function route(first) {
  const a = decodeURIComponent(location.hash.replace(/^#/, ""));
  const s = a && (sections.find((x) => x.id === a) || sections.find((x) => x.html.includes(`id="${a}"`)));
  if (a && !s) return; // a hash that isn't a section or heading (the skip link, a typo): stay where you are
  const apply = () => show(s?.id, s && s.id !== a ? a : undefined);
  const toReader = !!s !== !!current;
  // The ring morphs between the table and the sidebar; same-state moves (section to section) just swap.
  if (toReader && first !== true && document.startViewTransition && !calm.matches) document.startViewTransition(apply);
  else apply();
}

// Mark the subsection in view in the contents, so the sidebar always says where you are.
let observer;
function spy() {
  observer?.disconnect();
  const heads = [...$("doc-body").querySelectorAll("h3")];
  const links = new Map(heads.map((h) => [h, $("toc-list").querySelector(`a[href="#${CSS.escape(h.id)}"]`)]));
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      for (const l of links.values()) l?.classList.remove("here");
      links.get(e.target)?.classList.add("here");
    }
  }, { rootMargin: "0px 0px -70% 0px" });
  heads.forEach((h) => observer.observe(h));
}

// In-page links: a link into the open section only scrolls; the rest go through the hash.
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (!a || e.metaKey || e.ctrlKey) return;
  if (a.matches(".skip")) return;
  if (!wide.matches && a.closest(".toc")) $("toc").open = false;
  const h = a.getAttribute("href");
  if (h === "#") { e.preventDefault(); if (current) history.pushState(null, "", location.pathname + location.search); route(); return; }
  if (h === location.hash) { e.preventDefault(); route(); }
});
addEventListener("hashchange", route);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && current) { history.pushState(null, "", location.pathname + location.search); route(); }
});
wide.addEventListener("change", () => { if (current) $("toc").open = wide.matches; });

Promise.all([
  fetch("commander-template.md").then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); }),
  fetch("overview.json").then((r) => (r.ok ? r.json() : {})).catch((e) => (console.warn("overview.json ignored:", e), {})),
]).then(([md, over]) => {
  render(over, parse(md));
  document.body.classList.add("ready");
  route(true); // arriving from a link: land straight on the section, no transition
}).catch((err) => {
  $("lede").textContent = "The template didn't load (error " + err.message + "). Try reloading the page." +
    (location.protocol === "file:" ? " Browsers block this on file:// pages: serve the folder instead, e.g. python3 -m http.server." : "");
});
