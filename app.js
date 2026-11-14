// Source of truth is commander-template.md; overview.json only adds badge/blurb per section number.
const slug = (t) => t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
const $ = (id) => document.getElementById(id);
const sections = []; // {num, title, html, todo, id}

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
  return d.innerHTML;
}

// One entry per section: the header button opens it. Pillars also list their ### subsections.
function card(s, over, pillar) {
  const o = (s.num && over[s.num]) || {};
  const li = document.createElement("li");
  li.className = "col" + (s.todo ? " todo" : "");
  li.innerHTML = `<button class="head"><span class="badge"></span><strong></strong><span class="blurb"></span></button>`;
  li.querySelector(".badge").textContent = o.badge ?? "";
  li.querySelector("strong").textContent = s.name;
  li.querySelector(".blurb").textContent = s.todo ? "To come." : o.blurb ?? "";
  li.querySelector(".head").addEventListener("click", () => open(s.id));
  if (!pillar) return li;
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
  li.append(subs);
  return li;
}

// Light up one pillar's slots in the deck strip (null clears it). Hover is a bonus; click still opens.
function light(id) {
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
  const slots = document.createElement("div");
  slots.className = "slots";
  slots.setAttribute("aria-hidden", "true");
  const legend = document.createElement("div");
  legend.className = "legend";
  let used = 0;
  pillars.forEach((s, i) => {
    s.color = `var(--p${(i % 3) + 1})`; // three pillar colours in style.css; a fourth would reuse the first
    const n = +(String(over[s.num].badge ?? "").match(/\d+/)?.[0] ?? 0);
    used += n;
    for (let k = 0; k < n; k++) {
      const slot = document.createElement("i");
      slot.dataset.id = s.id;
      slot.style.setProperty("--c", s.color);
      slots.append(slot);
    }
    const b = document.createElement("button");
    b.innerHTML = `<strong></strong> <span class="n"></span>`;
    b.style.setProperty("--c", s.color);
    b.querySelector("strong").textContent = s.name;
    b.querySelector(".n").textContent = over[s.num].badge;
    b.addEventListener("click", () => open(s.id));
    hoverLights(b, s.id);
    legend.append(b);
  });
  slots.insertAdjacentHTML("beforeend", "<i></i>".repeat(Math.max(DECK - used, 0)));
  legend.insertAdjacentHTML("beforeend", `<span>Lands and your own categories, about ${DECK - used}</span>`);
  $("deck").prepend(slots, legend);
  $("deck").querySelector("figcaption").textContent =
    `A Commander deck is 99 cards plus the commander. The pillars take about ${used} of them.`;
}

// Unnumbered sections fold into the header; numbered ones sit above or below the pillar row
// depending on whether they come before or after the first pillar in the template.
function render(over) {
  let seenPillar = false;
  const pillars = sections.filter((s) => s.num && over[s.num]?.pillar);
  deck(pillars, over);
  for (const s of sections) {
    if (!s.num && s.title !== "Glossary") {
      const sec = document.createElement("details");
      sec.innerHTML = `<summary></summary>` + s.html;
      sec.querySelector("summary").textContent = s.title;
      $("intro").append(sec);
      continue;
    }
    const pillar = pillars.includes(s);
    seenPillar ||= pillar;
    const li = card(s, over, pillar);
    if (pillar) { li.style.setProperty("--c", s.color); hoverLights(li, s.id); }
    $(pillar ? "pillars" : seenPillar ? "after" : "before").append(li);
  }
}

function open(id, anchor) {
  const s = sections.find((x) => x.id === id);
  if (!s) return;
  $("panel-body").innerHTML = `<h2 id="panel-title">${s.title}</h2>` + s.html;
  $("panel").style.setProperty("--c", s.color ?? "var(--fg)");
  if (!$("panel").open) $("panel").showModal();
  history.replaceState(null, "", "#" + (anchor || id));
  const t = anchor && $("panel-body").querySelector("#" + CSS.escape(anchor));
  t ? t.scrollIntoView() : ($("panel").scrollTop = 0);
}

// Open whichever section owns an anchor: the one whose HTML holds that id ("27-left-out..." is in section 2).
function route(hash) {
  const a = hash.replace(/^#/, "");
  if (!a) return;
  const s = sections.find((x) => x.id === a) || sections.find((x) => x.html.includes(`id="${a}"`));
  if (s) open(s.id, s.id === a ? undefined : a);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href^='#']");
  if (a) { e.preventDefault(); route(a.getAttribute("href")); }
  // The dialog itself is the target for both backdrop and padding clicks; close only outside its box.
  if (e.target === $("panel")) {
    const r = $("panel").getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $("panel").close();
  }
});
addEventListener("hashchange", () => route(location.hash));
$("panel").addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));

Promise.all([
  fetch("commander-template.md").then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); }),
  fetch("overview.json").then((r) => (r.ok ? r.json() : {})).catch((e) => (console.warn("overview.json ignored:", e), {})),
]).then(([md, over]) => {
  $("banner").innerHTML = parse(md);
  render(over);
  route(location.hash);
}).catch((err) => {
  $("banner").textContent = "Could not load the template (" + err.message + ")." +
    (location.protocol === "file:" ? " Browsers block this on file:// pages: serve the folder instead, e.g. `python3 -m http.server`." : "");
});
