// app.js — Battlebound: Multiverse Annihilation Draft

/* =========================
   CORE DATA
========================= */

const ROLE_POOL = [
  { name: "Swordsman", type: "offense", description: "Fights with blades using trained melee technique and timing." },
  { name: "Martial Artist", type: "offense", description: "Uses unarmed combat, strikes, and counters at close range." },
  { name: "Shieldbearer", type: "defense", description: "Blocks attacks and protects allies with defensive positioning." },
  { name: "Spellblade", type: "offense", description: "Combines weapon combat with limited magical enhancement." },
  { name: "Magician", type: "control", description: "Casts prepared spells to alter enemies and terrain." },
  { name: "Elementalist", type: "control", description: "Manipulates fire, ice, lightning, or earth to control battle flow." },
  { name: "Summoner", type: "tactics", description: "Calls and commands creatures to fight on their behalf." },
  { name: "Sniper", type: "offense", description: "Eliminates targets from extreme range with precision shots." },
  { name: "Grappler", type: "control", description: "Restrains enemies through throws, holds, and clinches." },
  { name: "Assassin", type: "mobility", description: "Uses stealth and positioning to eliminate priority targets." },
  { name: "Thief", type: "mobility", description: "Relies on speed, tools, and opportunistic attacks." },
  { name: "Trickster", type: "control", description: "Disrupts enemies using deception, feints, and illusions." },
  { name: "Beast Tamer", type: "tactics", description: "Fights alongside trained animals or creatures." },
  { name: "Engineer", type: "tactics", description: "Uses machines, traps, and devices to shape combat." },
  { name: "Alchemist", type: "wildcard", description: "Employs chemical mixtures with varied combat effects." },
  { name: "Brawler", type: "offense", description: "Engages enemies with raw strength and durability." },
  { name: "Monk", type: "defense", description: "Uses discipline and technique to endure and evade attacks." },
  { name: "Hexer", type: "control", description: "Inflicts curses that weaken or hinder enemies." },
  { name: "Skirmisher", type: "mobility", description: "Fights with speed, spacing, and repeated engagements." },
  { name: "Rune Knight", type: "defense", description: "Uses inscribed runes to enhance armor and weapons." },
  { name: "Necromancer", type: "tactics", description: "Controls undead forces and benefits from battlefield deaths." },
  { name: "Gunslinger", type: "offense", description: "Specializes in firearms and rapid precision fire." },
  { name: "Duelist", type: "offense", description: "Specializes in single-target melee combat." },
  { name: "Paladin", type: "defense", description: "Defensive warrior who protects allies and holds the line." },
  { name: "Scout", type: "mobility", description: "Gathers information and harasses enemies with speed." },
  { name: "Pactbound", type: "wildcard", description: "Gains power through binding agreements with higher forces." },
  { name: "Archer", type: "offense", description: "Uses bows to attack enemies from mid to long range." },
  { name: "Spearman", type: "offense", description: "Controls distance with long-reaching melee weapons." },
  { name: "Berserker", type: "offense", description: "Trades defense for overwhelming aggressive power." },
  { name: "Knight", type: "defense", description: "Heavily armored frontline combatant." },
  { name: "Guardian", type: "defense", description: "Prioritizes ally protection over dealing damage." },
  { name: "Healer", type: "support", description: "Restores health and sustains allies in battle." },
  { name: "Medic", type: "support", description: "Provides rapid battlefield treatment and recovery." },
  { name: "Commander", type: "tactics", description: "Directs allies and improves coordination." },
  { name: "Warlord", type: "tactics", description: "Leads through force, presence, and battlefield control." },
  { name: "Raider", type: "mobility", description: "Specializes in fast attacks and disruption." },
  { name: "Saboteur", type: "control", description: "Weakens enemies through traps and infrastructure damage." },
  { name: "Pyromancer", type: "offense", description: "Uses fire-based attacks for damage and area denial." },
  { name: "Cryomancer", type: "control", description: "Slows and restricts enemies using ice." },
  { name: "Pirate", type: "mobility", description: "Fights with agility, improvisation, and aggressive close combat." },  
  { name: "Illusionist", type: "control", description: "Confuses enemies by manipulating perception." },
  { name: "Shaman", type: "support", description: "Uses spiritual magic to aid allies and hinder foes." },
  { name: "Ninja", type: "mobility", description: "Uses speed, stealth, and precision strikes to control fights." },
  { name: "Esper", type: "control", description: "Uses psychic powers to manipulate enemies and the battlefield." },  
  { name: "Sentinel", type: "defense", description: "Holds strategic positions and denies enemy advances." },
  { name: "Artillery", type: "offense", description: "Delivers long-range area damage with heavy weapons." },
  { name: "Ki Warrior", type: "offense", description: "Channels inner energy to enhance strikes and unleash powerful attacks." },
  { name: "Tactician", type: "tactics", description: "Wins battles through planning and adaptive strategy." },
  { name: "Juggernaut", type: "defense", description: "Absorbs massive damage while advancing steadily." }
];


const ANOMALY_MUTATIONS = [
"Pack Mule",
"Arrow Sponge",
"Door Kicker",
"Meat Shield",
"Loot Goblin",
"Button Presser",
"Map Guy",
"Banner Holder",
"Trap Tester",
"Backup Healer",
"Potion Chugger",
"Last Resort",
"Frontline Filler",
"Distraction Unit",
"Emergency Tank",
"Scout Who Dies First",
"Morale Booster",
"Ammo Carrier",
"Rear Guard",
"Cleanup Crew"
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
   Highlight player
========================= */

function highlightActivePlayer(playerIndex) {
  // Clear old highlights
  document.querySelectorAll('.active-player')
    .forEach(el => el.classList.remove('active-player'));

  // Highlight header (player name)
  const header = draftTableHead.children[playerIndex + 1];
  if (header) header.classList.add('active-player');

  // Highlight column cells
  draftTableBody
    .querySelectorAll(`td[data-player="${playerIndex}"]`)
    .forEach(td => td.classList.add('active-player'));
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
  currentPlayerSpan.classList.add("current-player");
  currentRoleSpan.classList.add("current-role");
  highlightActivePlayer(playerIndex);
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
1. Assign Ratings (0–100) for each individual considering:
   - How well the character fits their role. (~60%) <--IMPORTANT!
   - Adaptability to the universe's rules, terrain, and environment. (~20%)
   - Team chemistry and synergy. (~10%)
   - Ability/strength in general. (~10%)

2. Rank teams strongest to weakest on paper with team OVRs.

3. Simulate a quick 5-6 sentence cinematic battle between all teams:
   - Include at least one event that could realistically occur in the chosen universe
   - Mix 60% randomness with 40% unit ratings
   - Highlight notable tactical plays, teamwork, and failures 

4. Identify:
   - MVP of the battle
   - Weakest link(s)
   - Best synergy between individuals and roles

5. Suggest 5–10 Battle Snubs that could have been drafted.

Keep responses narrative, engaging, and structured like a cinematic battle report
`;

// ====== Append compact role descriptions used in this draft ======
prompt += `\nRole Descriptions (for reference):\n`;

// Use the roles as they appear in the draft, mapping to descriptions if available
const finalRoles = [...new Set(draftData.map(row => row[0].role))]; // unique roles from first player in each row
finalRoles.forEach(roleName => {
  const roleObj = ROLE_POOL.find(r => r.name === roleName);
  if (roleObj) prompt += `- ${roleObj.name}: ${roleObj.description}\n`;
  else prompt += `- ${roleName}: (Anomalous role, use your interpretation.)\n`;
});



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
