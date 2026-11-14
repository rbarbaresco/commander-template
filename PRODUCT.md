# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mixed group of the owner's friends who play Commander (Magic: The Gathering's 100-card, usually four-player format). Some are newer players, some are experienced. Copy must explain the jargon without talking down to the veterans.

They open the page:
- from a link the owner sends in chat, usually on a phone and often to one specific pillar or subsection;
- while building a deck, checking counts and caveats against their own decklist;
- when they ask the owner for tips on building or improving a deck;
- to read the owner's whole method once, in place of the owner explaining it out loud.

## Product Purpose

It shows one person's Commander deck-building template: the three pillars (Ramp, Card advantage, Removal), land drops, categories, and the reasoning and caveats behind every number. It replaces the owner's verbal walkthrough. It succeeds when a friend can build or fix a deck from it without asking the owner to explain the method again.

## Positioning

It is one experienced player's method and reasoning, not a database or an aggregator. Every number is a guide that moves with the commander, colours and table, never a rule. It is non-competitive by design: cEDH staples are left out on purpose.

## Operating Context

- Readers go back and forth between this page and deckbuilding tools such as Moxfield, Archidekt, EDHREC and Scryfall.
- Links into a section arrive through chat apps, so deep links (`#2-ramp`, `#45-board-wipes-always-pack-some`) are a primary entry point, not an extra.
- The owner writes the template by dictating in sessions and updates it over time. Later changes are mostly template edits, not code.

## Capabilities and Constraints

- `commander-template.md` is the single source of truth. The page fetches and renders it at runtime, so a new `## ` section appears without code changes. It is the owner's own writing: tools and agents never edit it, and they raise gaps or contradictions with the owner instead.
- `overview.json` adds only a per-section badge and blurb, and marks which sections are pillars.
- A static site on GitHub Pages, served from the repo root and deployed on every push to `main`. No build step; `marked` and the Literata font are vendored.
- Text only, with no card images. `[[Card Name]]` in the template becomes an exact-name Scryfall link.
- Card names and rules facts are checked on Scryfall, never written from memory.
- English only for now. No colour selector until the template has per-colour guidelines.
- `llms.txt` and the raw Markdown are offered to bots and LLMs.
- Undecided: the land count for section 5 (still a placeholder), and the open questions the owner hasn't answered yet.

## Brand Commitments

- Free and friends-only; nothing is for sale.
- Keep the "Unofficial fan content. Not approved or endorsed by Wizards of the Coast…" footer.
- Credit the owner, Rodrigo Barbaresco, by name, in the owner's voice. The credit goes in the footer only, next to the fan-content notice.
- Numbers are always presented as guides ("~12", "about"), never as fixed rules.

## Evidence on Hand

- The template itself (`commander-template.md`) and the domain glossary (`GLOSSARY.md`).
- No testimonials, usage data, deck examples or screenshots exist. Don't invent them.

## Product Principles

1. The template is the product. The site shows it faithfully and never rewrites or summarises the owner's advice.
2. Whole method at a glance, depth on demand. The overview shows every pillar at once, and the detail opens without losing your place.
3. Guides, not rules. Every number carries its caveat.
4. A link from chat must land exactly where it points, and work on a phone.
5. Explain the jargon without slowing down experienced players.

## Accessibility & Inclusion

WCAG 2.2 AA is a hard floor: text contrast, non-text contrast, keyboard use, screen-reader structure and touch-target size.
