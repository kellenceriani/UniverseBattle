// app.js — Battlebound: Multiverse Annihilation Draft

/* =========================
   CORE DATA
========================= */

const ROLE_POOL = [
  { name: "Swordsman", type: "offense", description: "Excels with bladed weapons and precise melee technique." },
  { name: "Martial Artist", type: "offense", description: "Rewards unarmed combat, counters, and close-range mastery." },
  { name: "Shieldbearer", type: "defense", description: "Specializes in blocking, guarding allies, and damage mitigation." },
  { name: "Spellblade", type: "offense", description: "Blends magic and melee but requires setup and resource balance." },
  { name: "Magician", type: "control", description: "Relies on prepared spells, rituals, and battlefield manipulation." },
  { name: "Elementalist", type: "control", description: "Controls terrain and damage through elemental interactions." },
  { name: "Summoner", type: "tactics", description: "Power depends on maintaining and positioning summoned units." },
  { name: "Sniper", type: "offense", description: "Dominates at long range but struggles when pressured." },
  { name: "Grappler", type: "control", description: "Excels at throws, holds, and limiting enemy movement." },
  { name: "Assassin", type: "mobility", description: "Rewards stealth, positioning, and single-target elimination." },
  { name: "Thief", type: "mobility", description: "Focuses on item use, debuffs, and opportunistic strikes." },
  { name: "Trickster", type: "control", description: "Uses feints, illusions, and misdirection to disrupt plans." },
  { name: "Beast Tamer", type: "tactics", description: "Synergizes with animal companions rather than direct combat." },
  { name: "Engineer", type: "tactics", description: "Relies on gadgets, traps, and battlefield preparation." },
  { name: "Alchemist", type: "wildcard", description: "Uses potions and concoctions with volatile effects." },
  { name: "Brawler", type: "offense", description: "Thrives in prolonged close-range exchanges." },
  { name: "Monk", type: "defense", description: "Uses discipline, evasion, and self-buffs to endure fights." },
  { name: "Oracle", type: "control", description: "Predicts actions and manipulates outcomes indirectly." },
  { name: "Hexer", type: "control", description: "Weakens enemies through curses rather than raw damage." },
  { name: "Vanguard Captain", type: "tactics", description: "Boosts allies through formations and positioning." },
  { name: "Skirmisher", type: "mobility", description: "Excels at hit-and-run tactics and spacing control." },
  { name: "Rune Knight", type: "defense", description: "Requires rune setup to unlock defensive and offensive power." },
  { name: "Necromancer", type: "tactics", description: "Grows stronger as battles drag on and units fall." },
  { name: "Chronomancer", type: "control", description: "Manipulates turn order, cooldowns, and timing." },
  { name: "Gunslinger", type: "offense", description: "Relies on ammo management and precision shots." },
  { name: "Duelist", type: "offense", description: "Excels in fair 1v1 scenarios but limited in crowds." },
  { name: "Paladin", type: "defense", description: "Shields allies and punishes enemy advances." },
  { name: "Scout", type: "mobility", description: "Provides vision, information, and early pressure." },
  { name: "Channeler", type: "wildcard", description: "Must remain stationary to unleash high-impact abilities." },
  { name: "Pactbound", type: "wildcard", description: "Powerful but constrained by strict rules or contracts." }
];

const ANOMALY_MUTATIONS = [
  "Chrono-Warden",
  "Void Herald",
  "Eclipse Assassin",
  "Aether Vanguard",
  "Graviton Juggernaut",
  "Phantom Tactician"
];

const UNIVERSES = [
  // Sci-Fi
  "Warhammer 40,000","Star Wars","Dune","Halo","Mass Effect","Star Trek","The Expanse","Blade Runner","The Matrix",
  "Ghost in the Shell","Altered Carbon","Cyberpunk 2077","Akira",

  // Fantasy
  "The Witcher","Elden Ring","Lord of the Rings","Game of Thrones","Harry Potter","The Elder Scrolls",
  "Dark Souls","Percy Jackson","Avatar: The Last Airbender","Alice in Wonderland","Dark Crystal","Labyrinth","Little Nightmares",
  "Spirited Away","The Legend of Zelda","Kingdom Hearts","Super Mario Galaxy","Portal",

  // Anime / Manga
  "Naruto","One Piece","Dragon Ball","Attack on Titan","My Hero Academia","Bleach","Fullmetal Alchemist","Demon Slayer","Berserk (Guts)",

  // Mythology / History
  "Greek Mythology","Roman Empire","Viking Age","Norse Mythology","Egyptian Mythology","Medieval Europe","Samurai Japan","Mayan Civilization","Aztec Empire",

  // Superheroes / Comics
  "Marvel Universe","DC Universe","The Boys","Invincible","The Incredibles",

  // Post-Apocalyptic / Survival
  "Mad Max","Fallout","The Walking Dead","Metro 2033","Horizon Zero Dawn","The Last of Us","Stranger Things","Gravity Falls",

  // Gaming / Misc / Other Worlds
  "Minecraft","Terraria","Roblox","Pokémon","Digimon","Yu-Gi-Oh","Warcraft","Mario","Doctor Strange Multiverse","Noita",

  // US Cartoons
  "The Simpsons","Adventure Time","Gravity Falls","Rick and Morty"
];




/* =========================
   DOM REFERENCES
========================= */

const setupSection = document.getElementById("setup-section");
const executionSection = document.getElementById("execution-section");
const draftSection = document.getElementById("draft-section");
const finalizeSection = document.getElementById("finalize-section");

const setupForm = document.getElementById("setup-form");
const playerCountInput = document.getElementById("player-count");
const playerNamesContainer = document.getElementById("player-names-container");

const executionEntryArea = document.getElementById("execution-entry-area");

const draftTable = document.getElementById("draft-table");
const draftTableHead = draftTable.querySelector("thead tr");
const draftTableBody = draftTable.querySelector("tbody");

const currentPlayerSpan = document.getElementById("current-player");
const currentRoleSpan = document.getElementById("current-role");
const currentUniverseSpan = document.getElementById("current-universe");
const inputRoleSpan = document.getElementById("input-role");

const universeContainer = document.getElementById("universe-container");
const universeDiv = document.getElementById("universe");

const pickForm = document.getElementById("pick-form");
const characterInput = document.getElementById("character-input");

const finalCrewsDiv = document.getElementById("final-crews");
const finalUniverseDiv = document.getElementById("final-universe");
const chatgptPromptPre = document.getElementById("chatgpt-prompt");

const copyPromptBtn = document.getElementById("copy-prompt-btn");
const editPromptBtn = document.getElementById("edit-prompt-btn");

const anomalyContainer = document.getElementById("anomaly-container");
const anomalyMessage = document.getElementById("anomaly-message");
const anomalyCloseBtn = document.getElementById("anomaly-close-btn");

const modeCheckboxes = document.querySelectorAll('input[name="xtra-mode"]');

const categoryInput = document.getElementById("category-input");
const currentCategorySpan = document.getElementById("current-category");
const currentCategoryLabel = document.getElementById("category-label");
const currentCategoryText = document.getElementById("category-text");


/* =========================
   STATE
========================= */
let playerCount = 2;
let players = [];
let roles = [];
let universe = "";
let draftData = [];

let currentRound = 0;
let currentPickInRound = 0;
let universeRevealed = false;

let executionKills = new Set();
let executionIndex = 0;

let anomalyRoleIndex = null;

/* =========================
   UTILITIES
========================= */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(screen) {
  [setupSection, executionSection, draftSection, finalizeSection].forEach(s =>
    s.classList.toggle("active", s === screen)
  );
}

function isModeActive(name) {
  return Array.from(modeCheckboxes).some(cb => cb.checked && cb.value === name);
}

function getPickOrder(round) {
  const order = [...Array(playerCount).keys()];
  return round % 2 === 0 ? order : order.reverse();
}

/* =========================
   SETUP
========================= */

function generateNameInputs() {
  playerNamesContainer.innerHTML = "";
  for (let i = 0; i < playerCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${i + 1} Name`;
    input.required = true;
    playerNamesContainer.appendChild(input);
  }
}

playerCountInput.addEventListener("change", () => {
  playerCount = parseInt(playerCountInput.value, 10);
  generateNameInputs();
});

generateNameInputs();

/* =========================
   EXECUTION ORDER
========================= */

function startExecutionPhase() {
  executionKills.clear();
  executionIndex = 0;
  executionEntryArea.innerHTML = "";
  showScreen(executionSection);
  nextExecutionEntry();
}

function nextExecutionEntry() {
  executionEntryArea.innerHTML = "";

  if (executionIndex >= playerCount) {
    showScreen(draftSection);
    return;
  }

  const p = document.createElement("p");
  p.textContent = `${players[executionIndex]}, enter your executed character:`;

  const input = document.createElement("input");
  input.type = "password";
  input.autocomplete = "off";

  const btn = document.createElement("button");
  btn.textContent = "Confirm & Pass";
  btn.className = "btn-primary";

  btn.onclick = () => {
    if (!input.value.trim()) return;
    executionKills.add(input.value.trim().toLowerCase());
    executionIndex++;
    nextExecutionEntry();
  };

  executionEntryArea.append(p, input, btn);
  input.focus();
}

/* =========================
   DRAFT INITIALIZATION
========================= */

function initRoles() {
  const grouped = {};
  ROLE_POOL.forEach(r => {
    grouped[r.type] = grouped[r.type] || [];
    grouped[r.type].push(r.name);
  });

  const selected = [];
  ["offense", "defense", "control", "tactics", "mobility", "wildcard"].forEach(t => {
    const pool = grouped[t] || ROLE_POOL.map(r => r.name);
    selected.push(pool[Math.floor(Math.random() * pool.length)]);
  });

  roles = shuffle(selected);
}

function initUniverse() {
  universe = UNIVERSES[Math.floor(Math.random() * UNIVERSES.length)];
}

function initDraftData() {
  draftData = Array.from({ length: roles.length }, (_, r) =>
    Array.from({ length: playerCount }, () => ({
      role: roles[r],
      character: "",
      executed: false
    }))
  );
}

/* =========================
   DRAFT TABLE WITH ROLE TOOLTIPS
========================= */

function buildDraftTable() {
  while (draftTableHead.children.length > 1)
    draftTableHead.removeChild(draftTableHead.lastChild);

  draftTableBody.innerHTML = "";

  players.forEach(p => {
    const th = document.createElement("th");
    th.textContent = p;
    draftTableHead.appendChild(th);
  });

  roles.forEach((roleName, r) => {
    const roleObj = ROLE_POOL.find(rp => rp.name === roleName) || { description: "" };

    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = `Round ${r + 1}: ${roleName}`;
    th.title = roleObj.description; // <-- hover tooltip
    tr.appendChild(th);

    players.forEach((_, pIndex) => {
      const td = document.createElement("td");
      td.dataset.round = r;
      td.dataset.player = pIndex;
      tr.appendChild(td);
    });

    draftTableBody.appendChild(tr);
  });
}

/* =========================
   DRAFT FLOW
========================= */

function updateDraftInfo() {
  const order = getPickOrder(currentRound);
  const playerIndex = order[currentPickInRound];

  currentPlayerSpan.textContent = players[playerIndex];
  currentRoleSpan.textContent = roles[currentRound];
  inputRoleSpan.textContent = roles[currentRound];

  // Universe display
  currentUniverseSpan.textContent = universeRevealed ? universe : "???";

  // Category display
  const cat = categoryInput.value.trim();
  if (cat) {
    currentCategoryLabel.textContent = " | Category: ";
    currentCategoryText.textContent = cat;
  } else {
    currentCategoryLabel.textContent = "";
    currentCategoryText.textContent = "";
  }
}



function revealUniverseIfNeeded() {
  if (!universeRevealed && currentRound >= 2) {
    universeRevealed = true;
    universeDiv.textContent = universe;
    universeDiv.classList.remove("hidden");
    universeContainer.classList.remove("hidden");
    currentUniverseSpan.textContent = universe;
  }
}

pickForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = characterInput.value.trim();
  if (!name) return;

  const lower = name.toLowerCase();
  for (const row of draftData) {
    for (const cell of row) {
      if (cell.character.toLowerCase() === lower) return;
    }
  }

  const order = getPickOrder(currentRound);
  const playerIndex = order[currentPickInRound];

  const cell = draftData[currentRound][playerIndex];
  cell.character = name;
  if (executionKills.has(lower)) cell.executed = true;

  const td = draftTableBody.querySelector(
    `td[data-round="${currentRound}"][data-player="${playerIndex}"]`
  );
  td.textContent = name;
  if (cell.executed) td.textContent += " 💀";

  currentPickInRound++;
  if (currentPickInRound >= playerCount) {
    currentPickInRound = 0;
    currentRound++;
  }

  revealUniverseIfNeeded();

  if (currentRound >= roles.length) {
    pickForm.style.display = "none";
    finalizeDraft();
  } else {
    updateDraftInfo();
    characterInput.value = "";
  }
});

/* =========================
   FINALIZATION
========================= */

function applyAnomalyShift() {
  if (!isModeActive("anomaly")) return;
  anomalyRoleIndex = Math.floor(Math.random() * roles.length);
  const mutation = ANOMALY_MUTATIONS[Math.floor(Math.random() * ANOMALY_MUTATIONS.length)];
  roles[anomalyRoleIndex] = mutation;
  draftData[anomalyRoleIndex].forEach(cell => (cell.role = mutation));
  anomalyMessage.textContent = `A role has mutated into "${mutation}".`;
  anomalyContainer.classList.remove("Hider");
}

anomalyCloseBtn.onclick = () => {
  anomalyContainer.classList.add("Hider");
  showFinalizeScreen();
};

function finalizeDraft() {
  if (isModeActive("anomaly")) {
    applyAnomalyShift();
  } else {
    showFinalizeScreen();
  }
}

function showFinalizeScreen() {
  showScreen(finalizeSection);
  finalCrewsDiv.innerHTML = "";

  players.forEach((p, pi) => {
    const block = document.createElement("div");
    block.className = "crew-block";
    block.innerHTML = `<h3>${p}</h3>`;

    roles.forEach((_, r) => {
      const c = draftData[r][pi];
      const line = document.createElement("p");
      line.innerHTML = `<strong>${c.role}:</strong> ${c.character}${c.executed ? " 💀" : ""}`;
      block.appendChild(line);
    });

    finalCrewsDiv.appendChild(block);
  });

  finalUniverseDiv.textContent = universe;
  buildChatGPTPrompt();
}

/* =========================
   CHATGPT PROMPT
========================= */

function buildChatGPTPrompt() {
  let prompt = `Evaluate the following battle groups.\n\n`;
  prompt += `Universe: ${universe}\n\n`;

  const draftCategory = categoryInput.value.trim(); // capture user input
  if (draftCategory) prompt += `Category: ${draftCategory}\n\n`;

  if (executionKills.size > 0) {
    prompt += `☠️ Executed Characters: ${[...executionKills].join(", ")} (−50 effectiveness)\n\n`;
  }

  players.forEach((p, pi) => {
    prompt += `${p}:\n`;
    roles.forEach((_, r) => {
      const c = draftData[r][pi];
      prompt += `- ${c.role}: ${c.character}\n`;
    });
    prompt += "\n";
  });

  prompt += `
Instructions:
1. Assign Combat Effectiveness (0–100) for each unit considering:
   - How well the character fits their role. (~50%)
   - Team chemistry and synergy. (~10%)
   - Adaptability to the universe's rules, terrain, and environment. (~25%)
 -Ability/strength in general. (15%)

2. Rank teams strongest to weakest on paper with team OVRs.

3. Simulate a quick 5-6 sentence cinematic battle between all teams:
   - Include at least one event that could realistically occur in the chosen universe
   - Mix 60% randomness with 40% unit ratings
   - Highlight notable tactical plays, teamwork, and failures 

4. Identify:
   - MVP of the battle
   - Weakest link(s)
   - Best synergy between units and roles

5. Suggest 5–10 Battle Snubs that could have been drafted.

Keep responses narrative, engaging, and structured like a cinematic battle report
`;
  chatgptPromptPre.textContent = prompt;
}

/* =========================
   CONTROLS
========================= */

copyPromptBtn.onclick = () =>
  navigator.clipboard.writeText(chatgptPromptPre.textContent);

editPromptBtn.onclick = () => {
  const e = chatgptPromptPre;
  e.contentEditable = e.contentEditable !== "true";
};

/* =========================
   GAME START
========================= */

setupForm.addEventListener("submit", e => {
  e.preventDefault();

  players = Array.from(playerNamesContainer.querySelectorAll("input")).map(
    (i, idx) => i.value.trim() || `Player ${idx + 1}`
  );

  initRoles();
  initUniverse();
  initDraftData();
  buildDraftTable();

  currentRound = 0;
  currentPickInRound = 0;
  universeRevealed = false;
  currentUniverseSpan.textContent = "???";
  pickForm.style.display = "flex";

  updateDraftInfo();

  if (isModeActive("execution")) startExecutionPhase();
  else showScreen(draftSection);
});
