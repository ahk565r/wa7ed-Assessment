/* ==========================================================
   Wa7ed Assessment — app.js
   Navigation, storage, scoring and results (front-end only)
   ========================================================== */

const STORAGE_KEYS = {
  answers: "wa7edAnswers",
  notes: "wa7edNotes",
  language: "wa7edLanguage"
};

/* ---------- Safe localStorage helpers ----------
   localStorage can throw (privacy modes, blocked storage) and stored
   JSON can be corrupted; neither should break the page. */

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    /* ignore */
  }
}

function loadJSON(key) {
  try {
    const parsed = JSON.parse(storageGet(key));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}


/* ---------- State ---------- */

let currentSection = 0;

let answers = loadJSON(STORAGE_KEYS.answers);

let notes = loadJSON(STORAGE_KEYS.notes);

let language = storageGet(STORAGE_KEYS.language);

if (!["both", "ar", "en"].includes(language)) {
  language = "both";
}


/* ---------- Scoring scale ---------- */

const SCALE = [
  { value: "1",  en: "Not in place",                    ar: "غير موجود" },
  { value: "2",  en: "Partially in place",              ar: "موجود بشكل محدود" },
  { value: "3",  en: "In place but inconsistent",       ar: "موجود ولكن غير منتظم" },
  { value: "4",  en: "Well established",                ar: "مطبق بشكل جيد" },
  { value: "5",  en: "Fully established and measured",  ar: "مطبق بالكامل ويتم قياسه" },
  { value: "NA", en: "Not applicable / Not sure",       ar: "لا ينطبق / غير متأكد" }
];

const MATURITY_LEVELS = [
  { max: 1.80, en: "Initial",    ar: "مبدئي" },
  { max: 2.60, en: "Developing", ar: "قيد التطوير" },
  { max: 3.40, en: "Defined",    ar: "مُعرّف" },
  { max: 4.20, en: "Managed",    ar: "مُدار" },
  { max: 5.00, en: "Optimized",  ar: "مُحسن" }
];


/* ---------- DOM ---------- */

const questionsContainer = document.getElementById("questionsContainer");
const sectionHeader      = document.getElementById("sectionHeader");
const sectionMenu        = document.getElementById("sectionMenu");
const previousBtn        = document.getElementById("previousBtn");
const nextBtn            = document.getElementById("nextBtn");
const saveBtn            = document.getElementById("saveBtn");
const languageSelect     = document.getElementById("languageSelect");
const sectionNotes       = document.getElementById("sectionNotes");
const reviewBtn          = document.getElementById("reviewBtn");
const backBtn            = document.getElementById("backBtn");

languageSelect.value = language;


/* ---------- Helpers ---------- */

// Escape any text inserted into HTML (user input and data alike)
function escapeHTML(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Pick a string for the current language mode
function t(en, ar, separator = " / ") {
  if (language === "ar") return ar;
  if (language === "en") return en;
  return en + separator + ar;
}

function isAnswered(id) {
  return answers[id] !== undefined && answers[id] !== "";
}


/* ---------- Init ---------- */

function init() {
  applyLanguage();
  renderSection();
}


/* ---------- Sidebar ---------- */

function buildMenu() {

  sectionMenu.innerHTML = "";

  assessmentSections.forEach((section, index) => {

    const total = section.questions.length;
    const done = section.questions.filter(q => isAnswered(q.id)).length;

    const item = document.createElement("button");
    item.type = "button";

    item.className =
      "menu-item" +
      (index === currentSection ? " active" : "") +
      (done === total ? " complete" : "");

    item.innerHTML = `
      <span class="menu-num">${index + 1}</span>
      <span class="menu-text">
        <span class="ar">${escapeHTML(section.titleAr)}</span>
        <span class="en">${escapeHTML(section.titleEn)}</span>
      </span>
      <span class="menu-count">${done}/${total}</span>
    `;

    item.onclick = () => goToSection(index);

    sectionMenu.appendChild(item);

  });

}


/* ---------- Section rendering ---------- */

function goToSection(index) {

  saveSectionNotes();

  currentSection = index;

  renderSection();

  window.scrollTo({ top: 0, behavior: "smooth" });

}


function renderSection() {

  const section = assessmentSections[currentSection];

  buildMenu();

  const descAr = section.descriptionAr
    ? `<p class="ar">${escapeHTML(section.descriptionAr)}</p>` : "";

  const descEn = section.descriptionEn
    ? `<p class="en">${escapeHTML(section.descriptionEn)}</p>` : "";

  sectionHeader.innerHTML = `
    <div class="section-title">
      <span class="section-step">
        <span class="ar">المحور ${currentSection + 1} من ${assessmentSections.length}</span>
        <span class="sep">|</span>
        <span class="en">Section ${currentSection + 1} of ${assessmentSections.length}</span>
      </span>
      <h2 class="ar">${escapeHTML(section.titleAr)}</h2>
      <h2 class="en">${escapeHTML(section.titleEn)}</h2>
      ${descAr}
      ${descEn}
    </div>
  `;

  questionsContainer.innerHTML = "";

  section.questions.forEach((question, index) => {
    questionsContainer.appendChild(createQuestion(question, index));
  });

  sectionNotes.value = notes[section.id] || "";

  previousBtn.disabled = currentSection === 0;

  previousBtn.textContent = t("Previous", "السابق");

  saveBtn.textContent = t("Save", "حفظ");

  const isLast = currentSection === assessmentSections.length - 1;

  nextBtn.textContent = isLast
    ? t("View results", "عرض النتائج")
    : t("Next", "التالي");

  updateProgress();

}


function createQuestion(question) {

  const div = document.createElement("div");

  div.className = "question";

  let html = `
    <div class="question-number">${escapeHTML(question.id)}</div>
    <h3 class="ar">${escapeHTML(question.ar)}</h3>
    <div class="english en">${escapeHTML(question.en)}</div>
  `;

  if (question.type === "scale") {
    html += createScale(question);
  }

  if (question.type === "select") {
    html += createSelect(question);
  }

  div.innerHTML = html;

  return div;

}


function createScale(question) {

  const current = answers[question.id];

  let html = `<div class="scale" role="radiogroup" aria-label="${escapeHTML(question.en)}">`;

  SCALE.forEach(option => {

    const isNA = option.value === "NA";
    const checked = current === option.value ? "checked" : "";

    html += `
      <label class="step ${isNA ? "step-na" : "step-" + option.value}"
             title="${escapeHTML(option.en)} / ${escapeHTML(option.ar)}">
        <input
          type="radio"
          name="${question.id}"
          value="${option.value}"
          ${checked}
          onchange="saveAnswer('${question.id}', this.value); updateReadout('${question.id}');"
        >
        <span class="bar"><b>${isNA ? "N/A" : option.value}</b></span>
        <span class="cap">
          <small class="ar">${escapeHTML(option.ar)}</small>
          <small class="en">${escapeHTML(option.en)}</small>
        </span>
      </label>
    `;

  });

  html += `</div>
    <div class="scale-readout" id="readout-${question.id}">${readoutText(current)}</div>`;

  return html;

}


// Text under the ladder describing the chosen answer
function readoutText(value) {

  const option = SCALE.find(o => o.value === value);

  if (!option) {
    return `<span class="muted">${t("Not answered yet", "لم تتم الإجابة بعد")}</span>`;
  }

  const num = option.value === "NA" ? "N/A" : option.value;

  return `<b>${num}</b> ${escapeHTML(t(option.en, option.ar))}`;

}


function updateReadout(questionId) {

  const el = document.getElementById("readout-" + questionId);

  if (el) el.innerHTML = readoutText(answers[questionId]);

}


function createSelect(question) {

  let html = `
    <select
      class="form-select"
      aria-label="${escapeHTML(question.en)}"
      onchange="saveAnswer('${question.id}', this.value); checkOther('${question.id}', this.value);"
    >
      <option value="">${t("Select", "اختر")}</option>
  `;

  question.options.forEach(([valueEn, labelAr]) => {

    const selected = answers[question.id] === valueEn ? "selected" : "";

    const label = valueEn === labelAr
      ? valueEn
      : t(valueEn, labelAr, " | ");

    html += `
      <option value="${escapeHTML(valueEn)}" ${selected}>
        ${escapeHTML(label)}
      </option>
    `;

  });

  const otherVisible = answers[question.id] === "Other";

  html += `
    </select>

    <input
      id="${question.id}_other"
      type="text"
      class="form-input other-input"
      style="display:${otherVisible ? "block" : "none"}"
      placeholder="${t("Please specify", "يرجى التوضيح")}"
      value="${escapeHTML(answers[question.id + "_other"] || "")}"
      oninput="saveAnswer('${question.id}_other', this.value)"
    >
  `;

  return html;

}


function checkOther(questionId, value) {

  const field = document.getElementById(questionId + "_other");

  if (!field) return;

  field.style.display = value === "Other" ? "block" : "none";

}


/* ---------- Saving ---------- */

function saveAnswer(id, value) {

  answers[id] = value;

  storageSet(STORAGE_KEYS.answers, JSON.stringify(answers));

  updateProgress();

  buildMenu();

}


function saveSectionNotes() {

  const section = assessmentSections[currentSection];

  notes[section.id] = sectionNotes.value;

  return storageSet(STORAGE_KEYS.notes, JSON.stringify(notes));

}

// Save notes as the user types, so nothing is lost on refresh or language change
sectionNotes.addEventListener("input", saveSectionNotes);


/* ---------- Navigation ---------- */

previousBtn.onclick = () => {
  if (currentSection > 0) goToSection(currentSection - 1);
};


nextBtn.onclick = () => {

  if (currentSection < assessmentSections.length - 1) {
    goToSection(currentSection + 1);
  } else {
    saveSectionNotes();
    showResults();
  }

};


saveBtn.onclick = () => {

  const ok =
    saveSectionNotes() &&
    storageSet(STORAGE_KEYS.answers, JSON.stringify(answers));

  alert(
    ok
      ? "Progress saved successfully.\nتم حفظ التقدم."
      : "Your browser is blocking local storage. Progress will be lost when this page is closed.\nالمتصفح يمنع الحفظ المحلي، وسيتم فقدان التقدم عند إغلاق الصفحة."
  );

};


backBtn.onclick = () => {

  document.getElementById("resultsPage").classList.add("hidden");
  document.querySelector(".assessment-layout").classList.remove("hidden");
  document.querySelector(".hero").classList.remove("hidden");

  renderSection();

  window.scrollTo({ top: 0, behavior: "smooth" });

};


reviewBtn.onclick = () => {

  alert(
    "Results review requests will be connected in the next release. Please contact your Wa7ed advisor directly for now.\n" +
    "سيتم ربط طلبات مراجعة النتائج في الإصدار القادم. يرجى التواصل مع مستشار و1حد مباشرة حاليًا."
  );

};


/* ---------- Progress ---------- */

function updateProgress() {

  const allQuestions = assessmentSections.flatMap(section => section.questions);

  const answered = allQuestions.filter(q => isAnswered(q.id)).length;

  const percent = Math.round(answered / allQuestions.length * 100);

  document.getElementById("progressBar").style.width = percent + "%";

  document.getElementById("progressText").textContent = percent + "%";

  const segments = document.getElementById("progressSegments");

  segments.setAttribute("aria-valuenow", percent);

  segments.innerHTML = assessmentSections.map((sec, i) => {

    const done = sec.questions.filter(q => isAnswered(q.id)).length;
    const fill = Math.round(done / sec.questions.length * 100);
    const name = t(sec.titleEn, sec.titleAr);

    return `<span class="seg${i === currentSection ? " current" : ""}" title="${escapeHTML(name)}: ${done}/${sec.questions.length}">
      <i style="width:${fill}%"></i>
    </span>`;

  }).join("");

  const section = assessmentSections[currentSection];

  document.getElementById("sectionName").textContent =
    t(section.titleEn, section.titleAr, " | ");

}


/* ---------- Scoring ----------
   - Only "scored" sections count.
   - N/A and unanswered questions are excluded (they never reduce a score).
   - Domain % = domain average / 5 × 100.
   - A domain with no numeric answers is excluded from the results. */

function calculateResults() {

  const results = [];

  assessmentSections
    .filter(section => section.scored)
    .forEach(section => {

      let total = 0;
      let count = 0;

      section.questions.forEach(question => {

        const value = answers[question.id];

        if (!value || value === "NA") return;

        const numeric = Number(value);

        if (Number.isFinite(numeric) && numeric >= 1 && numeric <= 5) {
          total += numeric;
          count++;
        }

      });

      if (count > 0) {

        const average = total / count;

        results.push({
          id: section.id,
          titleEn: section.titleEn,
          titleAr: section.titleAr,
          average,
          answeredCount: count,
          questionCount: section.questions.length,
          percentage: average / 5 * 100
        });

      }

    });

  return results;

}


// Maturity bands use two-decimal boundaries (1.80 / 2.60 / 3.40 / 4.20).
// Rounding first avoids gaps such as 1.805 falling between bands.
function getMaturityLevel(score) {

  const rounded = Math.round(score * 100) / 100;

  return MATURITY_LEVELS.find(level => rounded <= level.max)
    || MATURITY_LEVELS[MATURITY_LEVELS.length - 1];

}


function getMaturity(score) {
  const level = getMaturityLevel(score);
  return t(level.en, level.ar);
}


/* ---------- Results ---------- */

let lastResults = null;

function showResults() {

  const results = calculateResults();

  if (results.length === 0) {
    alert(
      "Please answer some scored questions first.\nيرجى الإجابة على أسئلة التقييم أولاً."
    );
    return;
  }

  lastResults = results;

  document.querySelector(".assessment-layout").classList.add("hidden");
  document.querySelector(".hero").classList.add("hidden");
  document.getElementById("resultsPage").classList.remove("hidden");

  renderResults(results);

  window.scrollTo({ top: 0, behavior: "smooth" });

}


function renderResults(results) {

  // Overall = average of domain averages (each domain weighted equally)
  const overall =
    results.reduce((sum, r) => sum + r.average, 0) / results.length;

  document.getElementById("overallScore").textContent =
    Math.round(overall / 5 * 100) + "%";

  document.getElementById("maturityLevel").textContent =
    getMaturity(overall);

  renderLadder(overall);

  renderDomainScores(results);

  const strongestFirst =
    [...results].sort((a, b) => b.percentage - a.percentage);

  renderList("strengths", strongestFirst.slice(0, 3), "✓", "strength");

  const weakestFirst =
    [...results].sort((a, b) => a.percentage - b.percentage);

  renderList("improvements", weakestFirst.slice(0, 3), "→", "improve");

}


function renderLadder(overall) {

  const levelIndex = MATURITY_LEVELS.indexOf(getMaturityLevel(overall));

  document.getElementById("maturityLadder").innerHTML = MATURITY_LEVELS.map((level, i) => {

    const min = i === 0 ? 1 : MATURITY_LEVELS[i - 1].max + 0.01;
    const state = i < levelIndex ? "passed" : i === levelIndex ? "current" : "";

    return `
      <li class="rung ${state}" style="--i:${i}"${i === levelIndex ? ' aria-current="step"' : ""}>
        <span class="rung-bar"></span>
        <span class="rung-name">
          <span class="ar">${level.ar}</span>
          <span class="en">${level.en}</span>
        </span>
        <span class="rung-range">${min.toFixed(2)}–${level.max.toFixed(2)}</span>
      </li>
    `;

  }).join("");

}


function domainName(result) {
  return `
    <strong class="ar">${escapeHTML(result.titleAr)}</strong>
    <small class="en">${escapeHTML(result.titleEn)}</small>
  `;
}


function renderDomainScores(results) {

  const container = document.getElementById("domainScores");

  container.innerHTML = results.map(result => {

    const percent = Math.round(result.percentage);
    const level = getMaturityLevel(result.average);

    return `
      <div class="domain-row">
        <div class="domain-head">
          <div class="domain-name">${domainName(result)}</div>
          <div class="domain-score">
            <strong>${percent}%</strong>
            <small>${escapeHTML(t(level.en, level.ar))}</small>
          </div>
        </div>
        <div class="domain-bar">
          <div class="domain-fill" style="width:${percent}%"></div>
          ${[36, 52, 68, 84].map(p => `<span class="tick" style="inset-inline-start:${p}%"></span>`).join("")}
        </div>
      </div>
    `;

  }).join("");

}


function renderList(containerId, results, icon, modifier) {

  const container = document.getElementById(containerId);

  container.innerHTML = results.map(result => `
    <div class="result-item ${modifier}">
      <span class="result-icon">${icon}</span>
      <div class="domain-name">${domainName(result)}</div>
      <strong class="result-pct">${Math.round(result.percentage)}%</strong>
    </div>
  `).join("");

}


/* ---------- Language ---------- */

languageSelect.onchange = function () {

  language = this.value;

  storageSet(STORAGE_KEYS.language, language);

  applyLanguage();

  renderSection();

  if (lastResults && !document.getElementById("resultsPage").classList.contains("hidden")) {
    renderResults(lastResults);
  }

};


function applyLanguage() {

  document.body.classList.remove("ar-only", "en-only", "both-mode");

  if (language === "ar") {
    document.body.classList.add("ar-only");
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  } else if (language === "en") {
    document.body.classList.add("en-only");
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  } else {
    // Bilingual: LTR page shell, Arabic blocks render RTL individually
    document.body.classList.add("both-mode");
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "ar";
  }

  sectionNotes.placeholder = t("Optional", "اختياري");

}


/* ---------- Restart ---------- */

function restartAssessment() {

  const confirmRestart = confirm(
    "Delete all answers and restart?\nحذف جميع الإجابات وإعادة التقييم؟"
  );

  if (!confirmRestart) return;

  storageRemove(STORAGE_KEYS.answers);
  storageRemove(STORAGE_KEYS.notes);

  answers = {};
  notes = {};
  currentSection = 0;

  location.reload();

}


init();
