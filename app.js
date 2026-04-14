/* ============================================================
   CréditPro CI — Application JavaScript
   ============================================================ */

// === CONSTANTES DE COULEUR ===
const GOLD  = "#C9A84C";
const GOLD2 = "#E8C97A";
const NAVY  = "#04101E";

// === UTILITAIRES ===
const fmt    = n  => Math.round(n).toLocaleString("fr-FR") + " FCFA";
const pct    = n  => Math.round(n) + "%";
const getMens = (m, d, t) => {
  const tm = t / 12;
  if (!tm) return m / d;
  return m * (tm * Math.pow(1 + tm, d)) / (Math.pow(1 + tm, d) - 1);
};

// === DONNÉES ===
const BANKS = [
  { n: "SGBCI (Société Générale)",    t: 10.75, tag: "best", q: "Domiciliation salaire obligatoire",    profiles: ["salarie", "fonctionnaire"] },
  { n: "BICICI (BNP Paribas)",        t: 11.0,  tag: "best", q: "Durée max 48 mois",                    profiles: ["salarie", "fonctionnaire"] },
  { n: "SIB",                         t: 11.5,  tag: "mid",  q: "Domiciliation requise",                profiles: ["salarie", "fonctionnaire"] },
  { n: "Ecobank CI",                  t: 12.0,  tag: "mid",  q: "Mobile Money accepté ✅",              profiles: ["salarie", "informel", "pme"] },
  { n: "Banque Atlantique",           t: 12.5,  tag: "mid",  q: "Informel accepté ✅",                  profiles: ["informel", "pme", "salarie"] },
  { n: "NSIA Banque",                 t: 13.0,  tag: "high", q: "Professions libérales",                profiles: ["salarie", "pme"] },
  { n: "BNI",                         t: 13.5,  tag: "high", q: "Fonctionnaire prioritaire",            profiles: ["fonctionnaire"] },
  { n: "UBA CI",                      t: 14.0,  tag: "high", q: "Commerce & transferts",               profiles: ["pme", "informel"] },
];

const DOCS = {
  salarie:       ["🪪 CNI ou passeport valide", "📋 3 derniers bulletins de salaire", "🏢 Attestation de travail / Contrat CDI", "🏦 3 derniers relevés bancaires", "🏠 Justificatif domicile (CIE/SODECI < 3 mois)", "📸 2 photos d'identité récentes", "📝 Formulaire demande crédit (banque)"],
  fonctionnaire: ["🪪 CNI ou passeport valide", "📋 3 derniers bulletins de salaire", "🏛️ Arrêté de nomination ou attestation de service", "🏦 3 derniers relevés bancaires", "🏠 Justificatif domicile (CIE/SODECI < 3 mois)", "📸 2 photos d'identité récentes", "📝 Formulaire demande crédit (banque)"],
  informel:      ["🪪 CNI ou passeport valide", "📱 Relevés Mobile Money 3 derniers mois (MTN/Orange/Wave)", "📒 Carnet de ventes ou journal de caisse (3 mois)", "📦 Registre de Commerce RCCM si disponible", "🏠 Justificatif domicile (CIE/SODECI < 3 mois)", "📸 2 photos d'identité récentes", "💡 Attestation local commercial si disponible"],
  pme:           ["🪪 CNI ou passeport valide", "📦 Registre de Commerce (RCCM) en cours de validité", "📊 2 derniers bilans comptables ou relevés CA", "🏦 6 derniers relevés bancaires entreprise", "📝 Business plan ou note de présentation du projet", "🏠 Justificatif domicile dirigeant", "📸 2 photos d'identité récentes"],
};

const TEMOIGNAGES = [
  { nom: "Koné Aminata",    quartier: "Yopougon", montant: "800 000 FCFA",   duree: "24 mois", profil: "Commerçante",  texte: "Je n'y croyais plus. CréditPro CI a préparé mon dossier avec mes relevés Wave et m'a accompagnée à Ecobank. J'ai eu mon crédit en 8 jours.", note: 5 },
  { nom: "Kouassi Jean-Paul", quartier: "Cocody",   montant: "1 500 000 FCFA", duree: "36 mois", profil: "Salarié privé", texte: "Le simulateur m'a montré exactement ce que je pouvais emprunter. Le courtier a négocié un taux que je n'aurais jamais obtenu seul.", note: 5 },
  { nom: "Diabaté Mariam",  quartier: "Abobo",    montant: "500 000 FCFA",   duree: "12 mois", profil: "Vendeuse ambulante", texte: "J'avais peur d'aller à la banque seule. Avec CréditPro CI j'étais accompagnée. Ils ont su expliquer mon activité mieux que moi.", note: 5 },
];

const ACTU = [
  { date: "Mars 2025", titre: "Ecobank CI accepte les relevés Mobile Money",    resume: "La banque annonce officiellement accepter les historiques MTN MoMo, Orange Money et Wave comme preuve de revenus pour les crédits < 1 million FCFA.",                          tag: "Crédit" },
  { date: "Fév 2025",  titre: "Taux directeur BCEAO maintenu à 3,5%",           resume: "La Banque Centrale stabilise les conditions de crédit dans toute la zone UEMOA pour le premier semestre 2025.",                                                                 tag: "BCEAO" },
  { date: "Jan 2025",  titre: "Wave Bank Africa : 21 millions de comptes",      resume: "La fintech confirme son passage au statut bancaire avec un capital de 20 milliards FCFA — nouvelles perspectives pour l'inclusion financière.",                               tag: "Fintech" },
];

const AGENCES = [
  { nom: "Ecobank CI — Plateau",              quartier: "Plateau",       couleur: "#22C55E", profils: "Informel, Salarié, PME" },
  { nom: "Banque Atlantique — Yopougon",      quartier: "Yopougon",      couleur: "#22C55E", profils: "Informel, Commerçant, PME" },
  { nom: "SGBCI — Plateau",                   quartier: "Plateau",       couleur: GOLD,      profils: "Salarié, Fonctionnaire" },
  { nom: "Ecobank CI — Cocody",               quartier: "Cocody",        couleur: "#22C55E", profils: "Informel, Salarié, PME" },
  { nom: "Banque Atlantique — Abobo",         quartier: "Abobo",         couleur: "#22C55E", profils: "Informel, Commerçant" },
  { nom: "BICICI — Plateau",                  quartier: "Plateau",       couleur: GOLD,      profils: "Salarié, Fonctionnaire" },
  { nom: "SIB — Marcory",                     quartier: "Marcory",       couleur: "#EAB308", profils: "Salarié, Fonctionnaire" },
  { nom: "NSIA Banque — Deux Plateaux",       quartier: "Deux Plateaux", couleur: "#EAB308", profils: "Salarié, PME" },
];

// === ÉTAT DE L'APPLICATION ===
let currentPage  = "home";
let currentProfil = "salarie";
let currentDuree  = null;
let simRes        = null;
let checklistState = {};
let dashTab       = "apercu";

// Canvas / signature
let sigDrawing = false;
let sigHas     = false;
let lastSigPos = { x: 0, y: 0 };

// ============================================================
// NAVIGATION ENTRE PAGES
// ============================================================
function setPage(page) {
  currentPage = page;

  // Masquer toutes les pages
  document.querySelectorAll(".page, .page-flex").forEach(el => el.classList.remove("active"));

  // Afficher la bonne page
  const target = document.getElementById("page-" + page);
  if (target) target.classList.add("active");

  // Actions spécifiques au changement de page
  if (page === "engagement") {
    setTimeout(initCanvas, 100);
  }
  if (page === "dashboard") {
    renderDashboardContent();
  }

  window.scrollTo(0, 0);
}

function scrollToSection(id) {
  setPage("home");
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 80);
}

// ============================================================
// SIMULATEUR — PROFIL
// ============================================================
function selectProfil(profil) {
  currentProfil = profil;
  simRes = null;

  // Mettre à jour les cards de profil
  document.querySelectorAll(".profil-card").forEach(el => {
    el.classList.toggle("active", el.dataset.profil === profil);
  });

  // Afficher/masquer le bloc revenus informel vs fixe
  const infBlock = document.getElementById("rev-informel-block");
  const fixBlock = document.getElementById("rev-fixe-block");
  if (infBlock && fixBlock) {
    if (profil === "informel") {
      infBlock.style.display = "block";
      fixBlock.style.display = "none";
    } else {
      infBlock.style.display = "none";
      fixBlock.style.display = "block";
      // Adapter le placeholder selon le profil
      const revFixeInp = document.getElementById("rev-fixe");
      if (revFixeInp) {
        const ph = profil === "fonctionnaire" ? "250 000" : profil === "pme" ? "800 000" : "200 000";
        revFixeInp.placeholder = ph;
      }
      const revFixeLbl = document.getElementById("rev-fixe-label");
      if (revFixeLbl) {
        revFixeLbl.textContent = "Revenu mensuel net" + (profil === "pme" ? " (chiffre d'affaires moyen)" : "");
      }
    }
  }

  // Masquer les résultats précédents
  const simResultsEl = document.getElementById("sim-results");
  if (simResultsEl) simResultsEl.classList.remove("visible");
}

// ============================================================
// SIMULATEUR — DURÉE
// ============================================================
function selectDuree(d) {
  currentDuree = d;
  document.querySelectorAll(".duree-pill").forEach(el => {
    el.classList.toggle("active", parseInt(el.dataset.duree) === d);
  });
}

// ============================================================
// SIMULATEUR — CALCUL REVENU INFORMEL
// ============================================================
function calcRevInformel() {
  const j = parseFloat(document.getElementById("rev-jour")?.value)  || 0;
  const h = parseFloat(document.getElementById("rev-hebdo")?.value) || 0;
  const m = parseFloat(document.getElementById("rev-mens-inf")?.value) || 0;
  return j * 22 + h * 4.3 + m;
}

function updateRevEstime() {
  const t = calcRevInformel();
  const el = document.getElementById("rev-estime");
  if (el) el.textContent = t > 0 ? fmt(t) : "—";
}

// ============================================================
// SIMULATEUR — ANALYSE
// ============================================================
function analyser() {
  let rev = 0;
  if (currentProfil === "informel") {
    rev = calcRevInformel();
    if (!rev) { alert("⚠️ Entre au moins un revenu (journalier, hebdomadaire ou mensuel)."); return; }
  } else {
    rev = parseFloat(document.getElementById("rev-fixe")?.value) || 0;
    if (!rev) { alert("⚠️ Entre ton revenu mensuel net."); return; }
  }

  const dep  = parseFloat(document.getElementById("sim-dep")?.value)  || 0;
  const mont = parseFloat(document.getElementById("sim-mont")?.value) || 0;

  if (!mont || !currentDuree) { alert("⚠️ Entre le montant et sélectionne une durée."); return; }

  const mens  = getMens(mont, currentDuree, 0.12);
  const total = mens * currentDuree;
  const reste = rev - dep - mens;
  const tx    = (mens / rev) * 100;

  simRes = { rev, dep, mont, duree: currentDuree, mens, total, int: total - mont, reste, tx, profil: currentProfil };
  renderSimResults();
}

// ============================================================
// SIMULATEUR — RÉSULTATS
// ============================================================
function renderSimResults() {
  const container = document.getElementById("sim-results");
  if (!container || !simRes) return;

  const { mens, total, int: interet, reste, tx, profil, mont, duree } = simRes;
  const clr = (tx < 30 && reste > 0) ? "#22C55E" : (tx < 40 && reste > 0) ? "#EAB308" : "#EF4444";

  const banquesFiltrees = BANKS.filter(b => b.profiles.includes(profil));
  const profilLabel = { informel: "Commerçant / Informel", pme: "PME / Entrepreneur", fonctionnaire: "Fonctionnaire", salarie: "Salarié" }[profil];

  const verdictOK  = tx < 30 && reste > 0;
  const verdictMid = tx < 40 && reste > 0;
  const verdictIcon  = verdictOK ? "✅" : verdictMid ? "⚠️" : "🚫";
  const verdictTitle = verdictOK ? "Dossier Finançable" : verdictMid ? "Dossier à Optimiser" : reste <= 0 ? "Dossier Non Finançable" : "Dossier Très Risqué";
  const verdictDesc  = verdictOK
    ? "Ton profil est solide. Je peux défendre ce dossier auprès de nos banques partenaires."
    : verdictMid
    ? "Possible mais limite. On va renforcer quelques points du dossier ensemble."
    : "Trop risqué. Réduisons le montant ou allongeons la durée.";

  const metriques = [
    { v: fmt(mens),    l: "Mensualité",       c: GOLD },
    { v: fmt(reste),   l: "Reste / mois",     c: reste > 0 ? "#22C55E" : "#EF4444" },
    { v: fmt(total),   l: "Total remboursé",  c: "#fff" },
    { v: fmt(interet), l: "Intérêts",         c: GOLD },
    { v: pct(tx),      l: "Taux endettement", c: clr },
    { v: tx < 30 ? "Faible ✅" : tx < 40 ? "Moyen ⚠️" : "Élevé 🚫", l: "Niveau risque", c: clr },
  ];

  const metriquesHTML = metriques.map(m => `
    <div class="metric-card">
      <div class="metric-val" style="color:${m.c}">${m.v}</div>
      <div class="metric-lbl">${m.l}</div>
    </div>
  `).join("");

  const banksHTML = banquesFiltrees.map(b => {
    const m  = getMens(mont, duree, b.t / 100);
    const tc = { best: "#22C55E", mid: "#EAB308", high: "#EF4444" }[b.tag];
    const tl = { best: "Top",    mid: "Moyen",   high: "Élevé"   }[b.tag];
    return `
      <div class="bank-row">
        <div class="bank-info">
          <div class="bank-name">🏦 ${b.n}</div>
          <div class="bank-note">${b.q}</div>
        </div>
        <div class="bank-rate">${b.t}%</div>
        <div class="bank-mens">${fmt(m)}/mois</div>
        <span class="bank-tag" style="background:${tc}18;color:${tc}">${tl}</span>
      </div>
    `;
  }).join("");

  const docsHTML = DOCS[profil].map(d => `<div class="doc-item">${d}</div>`).join("");

  container.innerHTML = `
    <div class="metrics-grid">${metriquesHTML}</div>

    <div class="verdict-box" style="border:1px solid ${clr}33;background:${clr}0A">
      <span class="verdict-icon">${verdictIcon}</span>
      <div>
        <div class="verdict-title" style="color:${clr}">${verdictTitle}</div>
        <div class="verdict-desc">${verdictDesc}</div>
      </div>
    </div>

    <div class="gauge-wrap">
      <div class="gauge-header">
        <span>Taux d'endettement</span>
        <span style="color:${clr}">${pct(tx)}</span>
      </div>
      <div class="gauge-bar-bg">
        <div class="gauge-bar-fill" style="width:${Math.min(tx, 100)}%;background:${clr}"></div>
      </div>
      <div class="gauge-labels">
        <span>✅ &lt;30%</span><span>⚠️ 30–40%</span><span>🚫 &gt;40%</span>
      </div>
    </div>

    <div class="banks-section">
      <div class="sub-label">Banques recommandées pour ton profil</div>
      ${banksHTML}
      <div class="banks-disclaimer">⚠️ Taux indicatifs 2025 — les conditions réelles varient. CréditPro CI négocie les meilleures conditions pour chaque dossier.</div>
    </div>

    <div class="docs-section mb-18">
      <div class="sub-label">Documents à préparer — ${profilLabel}</div>
      ${docsHTML}
    </div>

    <button class="btn-gold btn-full" onclick="setPage('engagement')">🤝 Prendre mon engagement &amp; être accompagné →</button>
  `;

  container.classList.add("visible");
}

// ============================================================
// CHECKLIST
// ============================================================
function renderChecklist() {
  const container = document.getElementById("checklist-content");
  if (!container) return;

  const labels = { salarie: "👔 Salarié", fonctionnaire: "🏛️ Fonctionnaire", informel: "🛒 Commerçant / Informel", pme: "🏢 PME / Entrepreneur" };

  container.innerHTML = Object.entries(DOCS).map(([type, docs]) => {
    const itemsHTML = docs.map((d, i) => {
      const k = type + i;
      const checked = !!checklistState[k];
      return `
        <div class="cl-item" onclick="toggleChecklist('${k}', this)" data-key="${k}">
          <div class="cl-checkbox ${checked ? "checked" : ""}">${checked ? "✓" : ""}</div>
          <span class="cl-text ${checked ? "checked" : ""}">${d}</span>
        </div>
      `;
    }).join("");

    const done = docs.filter((_, i) => checklistState[type + i]).length;

    return `
      <div class="card">
        <div class="cl-section-title">${labels[type]}</div>
        ${itemsHTML}
        <div class="cl-progress">
          ✅ <strong style="color:var(--green)">${done}/${docs.length}</strong> documents prêts ${done === docs.length && done > 0 ? "🎉 Dossier complet !" : ""}
        </div>
      </div>
    `;
  }).join("");
}

function toggleChecklist(key, itemEl) {
  checklistState[key] = !checklistState[key];
  const cb   = itemEl.querySelector(".cl-checkbox");
  const text = itemEl.querySelector(".cl-text");
  cb.classList.toggle("checked", checklistState[key]);
  cb.textContent = checklistState[key] ? "✓" : "";
  text.classList.toggle("checked", checklistState[key]);

  // Mettre à jour le compteur dans la card parente
  const card = itemEl.closest(".card");
  if (!card) return;
  const allItems = card.querySelectorAll(".cl-item");
  let done = 0;
  allItems.forEach(it => {
    if (it.querySelector(".cl-checkbox.checked")) done++;
  });
  const total   = allItems.length;
  const progress = card.querySelector(".cl-progress");
  if (progress) {
    progress.innerHTML = `✅ <strong style="color:var(--green)">${done}/${total}</strong> documents prêts ${done === total && total > 0 ? "🎉 Dossier complet !" : ""}`;
  }
}

// ============================================================
// TÉMOIGNAGES
// ============================================================
function renderTemoignages() {
  const container = document.getElementById("temoignages-content");
  if (!container) return;

  container.innerHTML = TEMOIGNAGES.map(t => `
    <div class="card temoignage-card">
      <div class="temoignage-stars">${"⭐".repeat(t.note)}</div>
      <p class="temoignage-text">"${t.texte}"</p>
      <div class="temoignage-footer">
        <div class="temoignage-nom">${t.nom}</div>
        <div class="temoignage-meta">${t.profil} · ${t.quartier}</div>
        <div class="temoignage-tags">
          <span class="tag-green">${t.montant}</span>
          <span class="tag-gold">${t.duree}</span>
        </div>
      </div>
    </div>
  `).join("");
}

// ============================================================
// ACTUALITÉS
// ============================================================
function renderActu() {
  const container = document.getElementById("actu-content");
  if (!container) return;

  container.innerHTML = ACTU.map(a => `
    <div class="card actu-card">
      <div class="actu-header">
        <span class="actu-tag">${a.tag}</span>
        <span class="actu-date">${a.date}</span>
      </div>
      <h4 class="actu-title">${a.titre}</h4>
      <p class="actu-resume">${a.resume}</p>
    </div>
  `).join("");
}

// ============================================================
// AGENCES
// ============================================================
function renderAgences() {
  const container = document.getElementById("agences-content");
  if (!container) return;

  container.innerHTML = AGENCES.map(a => `
    <div class="card agence-item">
      <div class="agence-dot" style="background:${a.couleur};box-shadow:0 0 8px ${a.couleur}"></div>
      <div class="agence-info">
        <div class="agence-nom">${a.nom}</div>
        <div class="agence-profils">${a.profils}</div>
      </div>
      <button class="agence-btn" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(a.nom + " Abidjan")}')">Voir →</button>
    </div>
  `).join("");
}

// ============================================================
// SIGNATURE CANVAS
// ============================================================
function initCanvas() {
  const canvas = document.getElementById("sig-canvas");
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = 130 * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth   = 2.5;
  ctx.lineCap     = "round";
  ctx.lineJoin    = "round";

  sigDrawing = false;
  sigHas     = false;

  const getPos = e => {
    const r   = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  };

  const draw = p => {
    ctx.beginPath();
    ctx.moveTo(lastSigPos.x, lastSigPos.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastSigPos = p;
    sigHas = true;
  };

  canvas.onmousedown  = e => { sigDrawing = true; lastSigPos = getPos(e); };
  canvas.onmousemove  = e => { if (sigDrawing) draw(getPos(e)); };
  canvas.onmouseup    = () => { sigDrawing = false; };
  canvas.onmouseleave = () => { sigDrawing = false; };

  canvas.ontouchstart = e => { e.preventDefault(); sigDrawing = true; lastSigPos = getPos(e); };
  canvas.ontouchmove  = e => { e.preventDefault(); if (sigDrawing) draw(getPos(e)); };
  canvas.ontouchend   = () => { sigDrawing = false; };
}

function clearSig() {
  const canvas = document.getElementById("sig-canvas");
  if (!canvas) return;
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  sigHas = false;
}

// ============================================================
// SOUMISSION ENGAGEMENT
// ============================================================
async function submitEng() {
  const nom = document.getElementById("eg-nom")?.value?.trim();
  const tel = document.getElementById("eg-tel")?.value?.trim();
  const qrt = document.getElementById("eg-quartier")?.value?.trim();
  const pro = document.getElementById("eg-profession")?.value?.trim();
  const prj = document.getElementById("eg-projet")?.value?.trim();

  if (!nom || !tel || !qrt || !pro || !prj) { alert("⚠️ Remplis tous les champs."); return; }
  if (!document.getElementById("cb1")?.checked ||
      !document.getElementById("cb2")?.checked ||
      !document.getElementById("cb3")?.checked) { alert("⚠️ Accepte les 3 clauses."); return; }
  if (!sigHas) { alert("⚠️ Signe d'abord."); return; }

  const num = "CP-2026-" + String(Math.floor(Math.random() * 9000) + 1000);

  try {
    await fetch("https://formspree.io/f/mykdaqay", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        "Numéro":          num,
        "Nom":             nom,
        "Téléphone":       tel,
        "Quartier":        qrt,
        "Profession":      pro,
        "Projet":          prj,
        "Montant":         simRes ? fmt(simRes.mont) : "—",
        "Durée":           simRes ? simRes.duree + " mois" : "—",
        "Revenu mensuel":  simRes ? fmt(simRes.rev) : "—",
        "Profil":          currentProfil,
      }),
    });
  } catch (e) { /* ignorer les erreurs réseau */ }

  window._dossierNum = num;
  setPage("confirmation");

  // Afficher le numéro de dossier
  const numEl = document.getElementById("confirmation-num");
  if (numEl) numEl.textContent = num;
}

// ============================================================
// SUIVI DE DOSSIER
// ============================================================
function checkSuivi() {
  const code = document.getElementById("suivi-code")?.value?.trim().toUpperCase();
  const container = document.getElementById("suivi-result");
  if (!container) return;

  if (code === "CP-2026-TEST") {
    const suiviRes = { nom: "Koné Aminata", statut: "en_cours", banque: "Ecobank CI", date: "15 Mars 2025", montant: "800 000 FCFA" };
    const statuts = {
      recu:     { label: "Dossier reçu ✅",             color: "#22C55E", desc: "Ton dossier a été reçu et est en cours d'examen." },
      en_cours: { label: "En cours d'analyse ⏳",        color: "#EAB308", desc: "Analyse en cours. Un rendez-vous banque sera fixé très prochainement." },
      rdv:      { label: "Rendez-vous fixé 📅",          color: "#1E90FF", desc: "Ton rendez-vous en banque est confirmé. Prépare tes documents." },
      accepte:  { label: "Crédit accordé 🎉",            color: "#22C55E", desc: "Félicitations ! Ton crédit a été accordé." },
      refuse:   { label: "Dossier refusé ❌",            color: "#EF4444", desc: "Ton dossier n'a pas été retenu. Contacte-nous pour explorer d'autres options." },
    };
    const s = statuts[suiviRes.statut];

    container.innerHTML = `
      <div class="card suivi-result" style="border:1px solid ${s.color}33;background:${s.color}08">
        <div class="suivi-status-label" style="color:${s.color}">${s.label}</div>
        <div class="suivi-status-desc">${s.desc}</div>
        ${[["Client", suiviRes.nom], ["Banque", suiviRes.banque], ["Montant", suiviRes.montant], ["Soumis le", suiviRes.date]].map(([l, v]) => `
          <div class="suivi-detail-row">
            <span class="suivi-detail-lbl">${l}</span>
            <span class="suivi-detail-val">${v}</span>
          </div>
        `).join("")}
        <button class="btn-gold btn-full" style="margin-top:14px;padding:11px;font-size:0.78rem" onclick="window.open('https://wa.me/2250700000000')">📱 Contacter mon courtier sur WhatsApp</button>
      </div>
    `;
    container.style.display = "block";
  } else {
    alert("Dossier introuvable. Vérifiez votre numéro de dossier.");
    container.style.display = "none";
  }
}

// ============================================================
// DASHBOARD
// ============================================================
function selectDashTab(tab) {
  dashTab = tab;
  document.querySelectorAll(".dash-tab").forEach(el => {
    el.classList.toggle("active", el.dataset.tab === tab);
  });
  renderDashboardContent();
}

function renderDashboardContent() {
  const data = {
    total: 47, enCours: 12, acceptes: 28, refuses: 7,
    revenuMois: 560000, revenuTotal: 2340000, tauxSucces: 80,
    dossiers: [
      { nom: "Koné A.",    montant: "800K",  statut: "accepté",  date: "15 Mar", profil: "Commerçant" },
      { nom: "Kouassi J.", montant: "1.5M",  statut: "accepté",  date: "12 Mar", profil: "Salarié" },
      { nom: "Diabaté M.", montant: "500K",  statut: "en cours", date: "10 Mar", profil: "Informel" },
      { nom: "Bamba O.",   montant: "300K",  statut: "refusé",   date: "08 Mar", profil: "Informel" },
      { nom: "Traoré F.",  montant: "1.2M",  statut: "en cours", date: "05 Mar", profil: "PME" },
    ],
  };

  const content = document.getElementById("dash-content");
  if (!content) return;

  if (dashTab === "apercu") {
    const kpis = [
      { v: data.total,    l: "Total",    i: "📋", c: GOLD },
      { v: data.enCours,  l: "En cours", i: "⏳", c: "#EAB308" },
      { v: data.acceptes, l: "Acceptés", i: "✅", c: "#22C55E" },
      { v: data.refuses,  l: "Refusés",  i: "❌", c: "#EF4444" },
    ];

    content.innerHTML = `
      <div class="kpi-grid">
        ${kpis.map(k => `
          <div class="card kpi-card">
            <div class="kpi-icon">${k.i}</div>
            <div class="kpi-val" style="color:${k.c}">${k.v}</div>
            <div class="kpi-lbl">${k.l}</div>
          </div>
        `).join("")}
      </div>
      <div class="dash-2col">
        <div class="card">
          <div style="font-size:0.65rem;font-weight:800;color:${GOLD};text-transform:uppercase;letter-spacing:0.07em;margin-bottom:12px">Taux de succès</div>
          <div class="success-rate-val">${data.tauxSucces}%</div>
          <div class="gauge-bar-bg" style="margin-bottom:6px">
            <div class="gauge-bar-fill" style="width:${data.tauxSucces}%;background:#22C55E"></div>
          </div>
          <div style="font-size:0.72rem;color:var(--text-muted)">Objectif 75% · <span style="color:#22C55E">Dépassé ✅</span></div>
        </div>
        <div class="card">
          <div style="font-size:0.65rem;font-weight:800;color:${GOLD};text-transform:uppercase;letter-spacing:0.07em;margin-bottom:12px">Revenu ce mois</div>
          <div class="revenue-val">${fmt(data.revenuMois)}</div>
          <div class="revenue-sub">Total cumulé : <strong style="color:#fff">${fmt(data.revenuTotal)}</strong></div>
          <div class="revenue-avg">Moy. / dossier : <strong style="color:${GOLD}">~20 000 FCFA</strong></div>
        </div>
      </div>
    `;
  } else if (dashTab === "dossiers") {
    const statusColors = { "accepté": "#22C55E", "en cours": "#EAB308", "refusé": "#EF4444" };
    content.innerHTML = `
      <div class="card">
        <div style="font-size:0.65rem;font-weight:800;color:${GOLD};text-transform:uppercase;letter-spacing:0.07em;margin-bottom:14px">Derniers dossiers</div>
        ${data.dossiers.map(d => {
          const sc = statusColors[d.statut] || "#fff";
          return `
            <div class="dossier-row">
              <div class="dossier-avatar">${d.nom.charAt(0)}</div>
              <div class="dossier-info">
                <div class="dossier-nom">${d.nom}</div>
                <div class="dossier-meta">${d.profil} · ${d.date}</div>
              </div>
              <div class="dossier-montant">${d.montant} FCFA</div>
              <span class="status-badge" style="background:${sc}18;color:${sc}">${d.statut}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else if (dashTab === "revenus") {
    const items = [
      { l: "Commission banques (0,5%/dossier)", v: "140 000 FCFA", d: "35 dossiers × 4 000 FCFA" },
      { l: "Frais courtage clients (2%/dossier)", v: "420 000 FCFA", d: "35 dossiers × 12 000 FCFA" },
      { l: "Forfaits dossiers PME", v: "75 000 FCFA", d: "3 dossiers × 25 000 FCFA" },
      { l: "Total du mois", v: "635 000 FCFA", d: "Mars 2025 — Données illustratives", highlight: true },
    ];
    content.innerHTML = `
      <div class="revenue-grid">
        ${items.map(item => `
          <div class="card" ${item.highlight ? `style="border-color:rgba(201,168,76,0.3)"` : ""}>
            <div class="rev-item-lbl">${item.l}</div>
            <div class="rev-item-val" style="color:${item.highlight ? GOLD : "#fff"}">${item.v}</div>
            <div class="rev-item-detail">${item.d}</div>
          </div>
        `).join("")}
      </div>
    `;
  }
}

// ============================================================
// TOGGLE CHECKBOX (engagement form)
// ============================================================
function toggleCb(id) {
  const cb = document.getElementById(id);
  if (cb) cb.checked = !cb.checked;
}

// ============================================================
// WHATSAPP
// ============================================================
function openWhatsApp() {
  window.open("https://wa.me/2250700000000?text=Bonjour%20CréditPro%20CI,%20je%20voudrais%20des%20informations.");
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderChecklist();
  renderTemoignages();
  renderActu();
  renderAgences();

  // Afficher la page home au démarrage
  setPage("home");
});
