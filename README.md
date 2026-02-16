# 🌌 LineupWars: Universe Battle

**LineupWars: Universe Battle** is a browser-based multiplayer drafting game where players assemble dream teams of characters across fictional universes and generate a fully-structured battle simulation prompt for AI evaluation.

This is a fast, chaotic, party-style draft experience designed for groups who enjoy debating matchups, building lineups, and letting AI simulate the ultimate showdown.

No install. No backend. Just open and play.

---

## 🎮 What This Is

A local multiplayer drafting game where players:

* Draft characters into combat roles
* Discover the battle universe mid-draft
* Navigate chaos modifiers
* Generate a polished AI battle prompt
* Paste into ChatGPT (or any LLM) for a cinematic simulation

Think of it as:

> Fantasy sports draft + fictional characters + AI battle engine

---

## 🚀 Quick Start

1. Clone or download the repo
2. Open `index.html` in any modern browser
3. Enter player count and names
4. Enable optional modes
5. Draft your teams
6. Copy the generated prompt into ChatGPT
7. Enjoy the battle simulation

No build tools. No dependencies. Runs entirely in the browser.

---

## 🧠 Core Gameplay

Each match consists of:

### 1. Role Selection

Six combat roles are randomly chosen from a larger role pool, covering:

* Offense
* Defense
* Control
* Tactics
* Mobility
* Wildcard

Each role has:

* Name
* Description
* Tactical purpose

Players must draft characters that best fit each role.

---

### 2. Snake Draft

* 2–6 players supported
* Snake order each round
* One character per role slot
* Characters can be from any universe

The universe is **hidden at first**.

---

### 3. Universe Reveal

Mid-draft, a random fictional universe is revealed:

* Sci-fi
* Fantasy
* Anime
* Comics
* Mythology
* Games
* Cartoons

The universe determines:

* Power scaling
* Physics rules
* Evaluation context
* AI prompt framing

This dramatically changes draft strategy.

---

### 4. Final Battle Prompt

When drafting ends, the game generates a detailed AI prompt containing:

* Universe rules
* Teams
* Roles
* Executed characters
* Evaluation rubric
* Simulation instructions

Players copy this prompt into ChatGPT to generate a full battle narrative and winner.

---

## 🧩 Optional Game Modes

### 🔫 Execution Order

Each player secretly submits one character name.

If that character is drafted by anyone:

* They are considered “executed”
* Their effectiveness is reduced in evaluation

Adds bluffing, mind games, and sabotage.

---

### 🌀 Anomaly Shift

After the draft completes:

* One role randomly mutates
* It becomes a chaotic modifier like:

  * Meat Shield
  * Scout Who Dies First
  * Potion Chugger
  * Comic Relief

This alters team evaluation and adds absurdity.

---

### 🎲 Chaos Draft (Advanced Mode)

The most unpredictable variant.

Instead of normal snake order:

* Pick positions can randomize
* Players may draft out of order
* Certain rounds can be forced chaos
* Picks can be restricted by column or round

This transforms the draft into controlled madness.

Chaos settings include:

* Enabled rounds
* Player targeting
* Full randomization
* Hybrid draft modes

---

## 🏗 Architecture

This project is intentionally simple and self-contained.

```
index.html   → UI structure and screens  
app.js       → All game logic  
style.css    → Base styles  
extra.css    → Additional UI styling  
```

No frameworks.
No build pipeline.
No backend.

Everything runs client-side in vanilla JavaScript.

---

## 🧮 Key Systems

### Draft Engine

Handles:

* Player order
* Role assignment
* Snake logic
* Chaos overrides
* UI updates

### Universe System

Randomly selects and reveals a universe mid-draft.

### Role System

Roles are pulled from a master pool and grouped by type.

### Chaos Engine

Builds a pool of randomized pick positions and injects them into the draft flow.

### Prompt Generator

Constructs a detailed AI-ready battle simulation prompt with:

* Rules
* Teams
* Scoring rubric
* Narrative instructions

---

## 📦 Data Structures

### ROLE_POOL

Master list of roles:

```js
{
  name,
  type,
  description,
  icon
}
```

### UNIVERSES

Large list of fictional settings used for battle context.

### draftData

2D array:

```
draftData[round][player]
```

Stores:

* role
* character
* execution status

---

## 🧠 Design Philosophy

This project was built around:

* Pass-the-device multiplayer
* Zero setup friction
* Maximum replayability
* Chaos and humor
* AI-assisted storytelling

It’s designed for:

* Friend groups
* Discord calls
* Party nights
* Character debates
* Content creation

---

## ✏️ Customization

Everything is easy to tweak directly in `app.js`.

### Add a Role

Find `ROLE_POOL` and add:

```js
{
  name: "Role Name",
  type: "offense",
  description: "What they do",
  icon: "⚔️"
}
```

### Add a Universe

Find `UNIVERSES` and add:

```js
"Star Trek"
```

### Add Anomaly Mutations

Edit `ANOMALY_MUTATIONS`.

---

## 🖥 Browser Support

Works in all modern browsers:

* Chrome
* Firefox
* Edge
* Safari

No mobile issues — designed for phone-passing play.

---

## 🔮 Future Ideas

Possible expansions:

* Save/load drafts
* Online multiplayer
* Character database
* Image support
* Auto-AI integration
* Draft history
* Role balancing
* Tournament mode

---

## 🧑‍💻 Author

Created, designed, and developed entirely by **Kellen Ceriani**.

This is a solo project built for fun, experimentation, and AI-assisted game experiences.


---

## ⚔️ Final Note

The goal of LineupWars isn’t perfect balance.

It’s arguments.
Chaos.
Ridiculous matchups.
And letting AI decide who wins.
