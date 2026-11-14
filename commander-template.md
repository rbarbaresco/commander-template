# Commander Deck Template

> **Status:** draft v1. Only the Ramp pillar is written so far. Card Advantage, Removal and Land Drops are still to come.
> **Scope:** non-competitive Commander decks. Competitive (cEDH) staples are left out on purpose (see [2.7](#27-left-out-of-v1-free-and-positive-mana-artifacts)).

## How to read the numbers

Deckbuilding here is not an exact science, but it isn't pure artistic talent either. The numbers in this template ("12 of each pillar", "2 to 4 of these", "about 8 of those") come from experience and some calculation. They are **guides, not deterministic values**. Many of them will change from deck to deck. Read every number as advice you adjust to your commander, colors and table.

## 1. The three pillars

Every deck built with this template rests on three pillars:

| Pillar | The problem it solves | Rule of thumb |
|---|---|---|
| **Ramp** | You can't cast your spells | 12 cards |
| **Card advantage** | You run out of things to cast | 12 cards |
| **Removal** | You die before your deck does anything | 12 cards |

With about 12 of each, your deck should *function*: you can cast your spells, you have mana for the cards you draw, and you don't die too fast. That does **not** make it a good or strong deck. It only makes it very unlikely that you never get to see your deck perform.

**The pillars are categories, but they are the ones that hold the deck up.** A deck can, and should, have more categories for other jobs. Which ones is personal to each builder and fits each deck differently. Examples (not a fixed list):
- **Counterspells**: spells that stop another spell.
- **Tutors**: cards that search your library for a specific card.
- **Win conditions**: the cards that actually end the game.
- **Redundancy**: several cards that do the same job, so losing one doesn't break the plan.
- **Engine** cards: cards that generate value every turn.

**12 is a guideline, not a hard rule.** Start from 12/12/12: with that, your deck will function no matter what. You will still have unlucky games where you brick, but in general you won't have problems playing it. Then adjust as you build. By the end, it doesn't need to be 12/12/12: each pillar can land anywhere from about 8 to about 12, in any combination. It all depends on what your commander covers and what your other categories cover. Still, fewer than 30 cards across the three pillars combined only makes sense in very specific cases.

A pillar can run lighter when the commander covers it. For example, a commander with an efficient draw engine can run fewer than 12 card-advantage cards. The freed slots go to the other two pillars, or to extra categories such as tutors, counters or "engine" cards.

Each pillar also has to be **well built**: having 12 cards isn't enough if they're the wrong 12. The sections below say what the right cards look like, starting with ramp.

## 2. Ramp

**Ramp** is anything that gives you more mana than lands alone would: mana rocks, mana creatures, and spells that put lands onto the battlefield.

**Ramp means getting ahead of the curve.** The normal curve is one land per turn (a **land drop**: the one land you may play each turn). Ramp puts you *ahead* of that.
- **More lands is not ramp.** Extra lands in the deck help you not miss land drops, which is also great, but they don't put you ahead on mana.
- **Don't use ramp to repair a land shortage.** If you are ramping just to stay on the curve, the deck doesn't have enough lands. Add lands, don't count it as ramp.
- **Track land drops to check your land count.** Many decks want to hit every land drop, whether that's the 5th turn or the 10th. No deck should "brick" on lands (get stuck without land drops) before turn 7.
- **A low curve is not a reason to skip ramp.** Ramp is also for casting *more spells per turn*, not only bigger ones. Spending more mana and casting more spells is usually how a player wins the game.

Land counts get their own section later ([5](#5-land-drops)); the overlap is intentional.

### 2.1 The main rule: get half of it back

The ideal ramp card gives you back about **half the mana you spent on it**.

| Card | Cost | Mana back | Verdict |
|---|---|---|---|
| Arcane Signet | 2 | 1 | Ideal |
| Hedron Archive | 4 | 2 | Ideal |
| Chromatic Lantern | 3 | 1 | Below the rule. Needs to be really good in the deck, such as a budget deck in 4 or 5 colors |
| Sol Ring | 1 | 2 | Above the rule, so it is an exception (see 2.2) |

Two other things make a ramp card better:
- **It comes in untapped.** A card that enters tapped needs a payoff to make up for it (Farseek, Cultivate and Kodama's Reach below are examples).
- **It does something extra**, for example it fixes colors or puts a card in your hand.

### 2.2 Artifacts (mana rocks)

An artifact that taps for mana is a **mana rock**.

- **Sol Ring is in almost every deck, period.** It costs 1 and gives 2, so it beats the half rule.
- **Then add as many 2-mana colored rocks as you can**, in your commander's colors. Izzet (blue and red) example: Izzet Signet, Arcane Signet, Izzet Talisman, plus other 2-mana artifacts as the deck calls for.
  - A **Signet** costs 1 to activate and gives two mana of its colors. A **Talisman** gives colorless mana, or one mana of one of its colors.
- **Aim for about 8 of these 2-mana rocks.** With Sol Ring that makes 9, and adding a 4-mana rock such as Thran Dynamo or Hedron Archive brings it to 10 or 11. This target is for decks outside green. Green decks run far fewer rocks (see 2.5).

Why 8 matters: more cheap rocks makes the fast starts more likely. Artifacts can tap the turn they enter, so:
- **Turn 1:** a land, Sol Ring, then a 2-mana artifact in the same turn.
- **Turn 2:** a 2-mana artifact.
- **Turn 3:** three lands plus a Signet give 4 mana. Cast Hedron Archive, tap it for 2, and cast another 2-mana artifact.

Either way you are ahead on mana by turn 3.

### 2.3 Mana creatures (dorks)

A **mana dork** is a creature that taps for mana. Because of **summoning sickness** (a creature can't use a tap ability the turn it enters), a dork can't help you the turn you play it. Dorks are also fragile. So they get a stricter bar than rocks:

| Dork cost | Mana made | Verdict |
|---|---|---|
| 1 | 1 | Good |
| 2 | 1 | Only if it makes mana of all colors, or has another real payoff |
| 3 | 2 or more | Or it must have another, bigger payoff |

**Rarely use dorks as your only ramp.** In a Commander game (4 or more players, with lots of removal and board wipes) creatures die eventually, unlike in 1-vs-1 formats where a creature can last the whole game. Dorks get hit as collateral damage. Use them to speed up the early game, and use other ramp to set up the long game.

### 2.4 Ramp spells

Spells that fetch lands. The standard ones cost 2 and return 1 land: **Rampant Growth, Nature's Lore, Three Visits, Farseek**.

- **Prefer the ones that enter untapped.** Nature's Lore and Three Visits fetch a Forest that enters untapped.
- **Payoffs that make a tapped one worth it:**
  - **Farseek** can fetch a non-basic land (a dual land, for example).
  - **Cultivate** and **Kodama's Reach** cost 3. One land enters tapped and the other goes to your hand. A land in hand is nearly a free card draw, and it helps you hit your land drop. They are great despite the cost.
- **Rampant Growth** (tapped, basic land only) is the budget pick, or for decks that want a lot of ramp cards.
- **Enchantment ramp** follows the same rule: judge it by the mana it costs against the mana it returns.

In green decks these spells pair well with dork ramp, because they hold up when your dorks get removed.

### 2.5 Mixing the types

There's no single recipe. You can run:
- spells only, with no dorks at all,
- dorks, artifacts and spells together,
- any mix in between.

Pick the mix that fits the colors and the commander. The rule from 2.3 still holds: dorks should rarely be the whole plan.

**Explore the best ramp options in your colors first.** What your colors offer decides the mix:
- **Outside green:** you must rely on rocks, because your colors have few other good ramp options.
- **In green:** keep artifact rocks for the best ones, such as Sol Ring and maybe a couple of 2-mana rocks. Rely mainly on dorks and ramp spells.

### 2.6 "It's not a ramp" cards

Most decks also run **2 to 4 cards that help mana production but that I don't call ramp spells**. They still count toward the ramp pillar.

Examples:
- **Rituals** such as **Dark Ritual**, which give you extra mana for one turn only. **Lotus Petal** counts as a ritual in this template.
- **Smothering Tithe**, which makes **Treasure** tokens (a token you can sacrifice for one mana) when opponents draw.
- **Land Tax**, which puts basic lands into your hand.

### 2.7 Left out of v1: free and positive-mana artifacts

This version leaves out artifacts that cost 0 mana, and artifacts that return more than they cost (other than Sol Ring). They are very powerful, but usually have a big price: discarding a card, or exiling a card from your hand. Because v1 is meant for non-competitive commanders, they're out for now.

If you want them, they are fine to treat as ordinary ramp.

### 2.8 A check before you add a card: does it help *this* deck?

When you build for a given **bracket** (Wizards' scale of how strong a deck is, from 1 to 5), ask whether adding a strong card helps your deck, or just moves it into a stronger category without giving you an advantage you need.

Example: people add **Smothering Tithe** because "it's a good card", but their deck lacks enough card draw to have spells to cast, and has no **mana sink** (a place to spend mana, such as a big activated ability) for all the Treasures. The card then makes the deck stronger on paper and does nothing in play.

Also note that Smothering Tithe is on Wizards' **Game Changers** list (cards that count toward bracket limits). That list changes over time, so check the current one on Scryfall (`is:gamechanger`) or on Wizards' site for the bracket you're aiming at.

## 3. Card advantage

### 3.1 What card advantage means here

In this template, **card advantage** means that after a card's effect happens, you end up with **more options to play than before you played the card**.

- **Examples:** **Divination** (you spend one card and draw two) and **Wrenn's Resolve** (you spend one card and may play the top two cards of your library).
- **Not card advantage:** **Archmage Emeritus** draws a card each time you cast an instant or sorcery, which is one card for one card. It can work in storm strategies, but don't count it as a card-advantage spell. The author has a hard time making this card, or similar ones, work in any deck. A simple test: if Archmage Emeritus is the only card in your hand and you need to draw cards, playing it doesn't help at all, because you have nothing left to cast that would trigger it.

### 3.2 Cantrips also fit here

A **cantrip** is a cheap spell that replaces itself by drawing a card. Cantrips such as **Preordain** and **Opt** aren't card advantage, but they let you filter for the right cards, which is better than just playing whatever you top-deck (draw off the top of your library). This is why many cantrips are included in this category.

### 3.3 Building the 12 draw cards

A guide, keeping the rate of 12:

| What | How many | Notes |
|---|---|---|
| **Cantrips** | about 8 | Filter your draws |
| **Consistent draw** | together about 4 | Doesn't necessarily draw right away, but builds value over time. Examples: **Bident of Thassa** and **Rhystic Study** |
| **Massive draw** | | Spells that can draw more than 3 cards when they resolve |

The 4 non-cantrip cards are a mix of consistent and massive draw.

Rhystic Study is on Wizards' Game Changers list (see 2.8), so check it against the bracket you're aiming for.

## 4. Removal

**Removal** is anything that answers a threat: a dangerous creature, a combo piece, or something else that would beat you or the table.

### 4.1 Prefer instant speed

As much as possible, removal should be an **instant** (a spell you can cast at any time, including on another player's turn). A **sorcery** can only be cast on your own turn, so we call that **sorcery speed**.

Why this matters more in Commander than in 1-vs-1:
- In a 1-vs-1 game you get every other turn, so you are watching 50% of the time.
- In a 4-player game you get one turn in four, so **you are watching 75% of the turns**.
- If you can't react to something dangerous coming your way, or to a combo piece, you lose more games. In Commander, reaction spells are much more valuable.

### 4.2 Sorcery-speed removal has to be really good

A sorcery-speed removal spell needs to be really good to earn a slot, and "really good" doesn't only mean mana-efficient.

Example: **Fell** is a very efficient, unconditional creature removal (it can hit any creature), but it is a sorcery. In a 60-card 1-vs-1 format it can be great. In Commander it is much weaker, because you can only use it on your own turn, once every four turns.

### 4.3 Sorcery-speed removal that earns its slot

Two examples of when sorcery speed is worth it.

**Neutralizing instead of destroying.** **Witness Protection** is a good example of sorcery-speed removal that is worth it. It is an Aura (an enchantment attached to a creature) that turns the creature into a 1/1 with no abilities. It doesn't technically remove the creature from the battlefield, but it is usually better than removing it:
- Commander decks often have **recursion** (bringing cards back from the graveyard), so destroying a creature doesn't always mean destroying it for good.
- A commander that is destroyed can always go back to the command zone.
- Witness Protection makes any creature on the battlefield useless, and leaves nothing to bring back.

**Why enchantment-based answers hold up:** there's less interaction aimed at enchantments than at creatures. Before an opponent can destroy the enchantment and free the creature, the creature will likely die first, either to a board wipe or in combat, for example while blocking.

**Conditional removal that fits the deck.** **Reclamation Sage** is a creature with an enters-the-battlefield (ETB) effect that destroys an artifact or enchantment. It is sorcery speed, but it becomes a good option when the deck is built around creatures, around elves, or around ETB effects, because it is already doing what the deck wants.

**The trap:** don't fill the deck with ETB-destroy creatures or with enchantments that imprison creatures. You would end up unable to react at instant speed (see 4.1). Pick these sorcery-speed answers carefully, one at a time, for the deck you are building.

### 4.4 The opposite case: a "downside" that barely matters in Commander

Some cards look worse in 1-vs-1 than they are in Commander. **Pongify** and **Rapid Hybridization** are 1-mana instants that destroy any creature, but the creature's owner gets a 3/3 creature in return. That 3/3 is often bigger than the creature you destroyed.

- **In 1-vs-1:** it can cost you a lot of life, because after removing the creature you still have to deal with a 3/3.
- **In Commander:** it is a very small price. The downside is usually just giving the opponent a vanilla blocker (a creature with no abilities), and it rarely becomes an issue. Combat doesn't have the same weight in Commander as in a 1-vs-1 game.

So the rule runs both ways: judge removal by how Commander is played, not by how it performs in a 1-vs-1 game.

### 4.5 Board wipes: always pack some

A **board wipe** (also called a wrath or sweeper) removes many permanents at once. Board wipes are the exception to the instant-speed rule in 4.1: they are rarely instant speed, but they do so much work that the pay-off is great. **Always pack board wipes.**

**The rule:** always have a way to clear the board of creatures, **and** a way to answer multiple noncreature targets (artifacts, enchantments). Two cards that meet those two criteria are already good shape.

- **Minimum 2 in any deck:** one that removes all creatures, one that removes all artifacts and/or enchantments.
- **They can overlap.** **Cleansing Nova** covers both jobs, but it is not enough on its own: add another way to wipe the board of creatures.
- **Pack more when:**
  - you are in a more control matchup, or
  - your deck is slow to gain traction.
- **Up to 4 is a lot already.** It's acceptable if they're conditional, meaning you control what they hit and avoid destroying your own permanents. Examples:
  - **Split Up**, which lets you avoid destroying your own stuff.
  - **Austere Command**, where you choose the modes that affect you least.
  - An X spell, where you choose what gets targeted.
- **More than 4 is also acceptable, but unfun.** Your deck feels like it does nothing but wipe the board. That is unfun for opponents, and you aren't advancing the game either, which usually stalls it longer.
  - It is especially acceptable when your "wipes" aren't really wipes but multiple-target answers, such as **Moment of Reckoning**. You choose what gets hit, so it doesn't flatten the board.

### 4.6 Building the 12 removal cards

A guide for the 12 cards of the removal pillar:

| What | How many | Notes |
|---|---|---|
| **Instant speed** | about 8 | Mainly aimed at creatures |
| **Answers to noncreature targets** | at least 2 | Preferably "permanent" answers, meaning cards that can hit any type of permanent |
| **Mana cost** | 0 to 3 | No more than 2 of the cards may cost 3 |

### 4.7 Budget is not an obstacle

Magic has a lot of removal options, including budget ones, so there's rarely a reason to settle for a worse speed.

## 5. Land drops

*To come. Notes so far, also stated in the Ramp section:*
- *Lands protect your land drops; they are not ramp.*
- *Land drops are a way to check you have enough lands: no deck should "brick" on lands before turn 7.*

## 6. Categories

### 6.1 How many categories

A healthy deck has **7 to 10 categories** (the three pillars count as categories).

- **Fewer than 7** is not a big issue. Competitive decks are often narrow, with 5 or 6 categories. Non-competitive decks can have that few too, but it is less common.
- **Around 10 is already a lot.** More than that and the deck starts feeling all over the place, with no clear objective. Each card you draw goes in a different direction, and it is hard to build your strategy or your board around anything.

### 6.2 How to sort a deck into categories

1. **Pick every card you want to add.**
2. **Divide them into categories, starting with the pillars.** Split 12 for each pillar first.
3. **Work out the rest of the categories** from what is left (counterspells, tutors, win conditions, redundancy, engine cards, or your own).

Warning signs while sorting:
- **A card that fits no category.**
- **Many categories with only 1 or 2 cards.**

**Sorting is also where you find out whether you need all 12 cards in each pillar.** It's where you spot **overlaps**: a card that does a job in two categories. Example: your deck has an "Elves" category, and Reclamation Sage (an Elf that destroys an artifact or enchantment) sits in both Elves and Removal. You can then cut 1 or 2 of the removal spells that hit artifacts and enchantments, because the Elves category already covers that.

*More on overlap to come.*

Both warning signs above mean you should make a cut, or move the cards into a different category. Moving cards between categories is also useful on its own: it helps you understand the strategy of your deck, the role each card plays, and whether the card really fits.

### 6.3 How many cards in a category

The right number depends on how often you want to *see* a card from that category during a game. These tiers apply to any category or subcategory, not only the pillars.

| Cards | What it means | Examples |
|---|---|---|
| **1** | If you draw it, it's useful. If you don't, you can live without it. | Recursion such as **Unburial Rites**, **Sevinne's Reclamation** or **Eternal Witness**. The first two are especially good because they can also be cast from the graveyard. **Omniscience** is another: you won't have many cards like it, and you probably wouldn't add all of them. |
| **Up to 4** | You want to see one of them during the game. You'd be fine without, but the game is better if you find one. | **Board wipes**: you don't want to draw all four, but one or two (if the game lasts) is very helpful. **Counterspells**: being counterspell-heavy isn't healthy for a non-competitive deck, so run enough to save you from a dangerous situation without becoming "the annoying blue player" who draws attention to your table. **Tutors**: they also raise the power level a lot, so they fit here too. |
| **Up to 8** | You want to see 1 to 3 of them during the game. | **Ramp, removal and card draw** all fit here, even though that is below the pillar target of 12. A controlling deck can run 8 counterspells, but watch how often you draw them. *More to come.* |
| **Up to 12** | A pillar: the deck needs them to function, and you need to draw them consistently. | The three pillars. |
| **More than 12** | The **engine**: not necessarily the strategy itself, but what holds the strategy together. | See below. |

**Examples of engines** (the author's own decks):
- **Jodah, Archmage Eternal:** 17 land-ramp pieces. The deck needs enough mana to cast big spells, and it also needs mana fixing (getting the right colors). Ramp isn't the strategy, it's the engine that makes the strategy work.
- **Will and Rowan Kenrith (partners):** about 20 artifact ramp pieces. The strategy is superfriends (a deck full of planeswalkers) that is always ultimating them, and that takes a lot of mana.
- **Kykar, Wind's Fury:** a storm deck that generates mana, and sacrifices Spirits for red mana. It needs a lot of **cantrips** (cheap spells that replace themselves by drawing a card) to keep digging through the top of the deck until it finds what it needs. 15 or more.

**Watch out when a category approaches 30 cards.** A tribal deck (built around one creature type) might seem to "obviously" need all the creatures of that type, but that often isn't the case. *More examples of this to come.*

### 6.4 Individual categories

*To come: rules for each category beyond the three pillars, and how to spend slots freed up by a lighter pillar.*

## Glossary

| Term | Meaning |
|---|---|
| **Commander** | The format: 100 cards, one of them your commander, played by usually 4 players |
| **Bracket** | Wizards' 1–5 scale of deck strength, used to agree on what kind of game you're playing |
| **Game Changers** | A list of strong cards that bracket limits count |
| **Mana rock** | An artifact that taps for mana |
| **Mana dork** | A creature that taps for mana |
| **Summoning sickness** | A creature can't use a tap ability the turn it enters |
| **Ritual** | A one-shot card that gives extra mana for that turn only |
| **Treasure** | A token you can sacrifice for one mana |
| **Mana sink** | A place to spend lots of mana |
