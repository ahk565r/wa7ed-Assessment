let currentSection = 0;

let answers =
  JSON.parse(localStorage.getItem("wa7edAnswers")) || {};

let notes =
  JSON.parse(localStorage.getItem("wa7edNotes")) || {};

let language =
  localStorage.getItem("wa7edLanguage") || "both";


const questionsContainer =
  document.getElementById("questionsContainer");

const sectionHeader =
  document.getElementById("sectionHeader");

const sectionMenu =
  document.getElementById("sectionMenu");

const previousBtn =
  document.getElementById("previousBtn");

const nextBtn =
  document.getElementById("nextBtn");

const saveBtn =
  document.getElementById("saveBtn");

const languageSelect =
  document.getElementById("languageSelect");

const sectionNotes =
  document.getElementById("sectionNotes");


languageSelect.value = language;


function init() {

  buildMenu();

  applyLanguage();

  renderSection();

}


function buildMenu() {

  sectionMenu.innerHTML = "";

  assessmentSections.forEach((section, index) => {

    const item = document.createElement("div");

    item.className =
      "menu-item" +
      (index === currentSection ? " active" : "");

    item.innerHTML = `
      <div class="ar">${index + 1}. ${section.titleAr}</div>
      <div class="en">${index + 1}. ${section.titleEn}</div>
    `;

    item.onclick = () => {

      saveSectionNotes();

      currentSection = index;

      renderSection();

    };

    sectionMenu.appendChild(item);

  });

}


function renderSection() {

  const section =
    assessmentSections[currentSection];

  buildMenu();

  sectionHeader.innerHTML = `

    <div class="section-title">

      <h2 class="ar">
        ${section.titleAr}
      </h2>

      <h2 class="en">
        ${section.titleEn}
      </h2>

      <p class="ar">
        ${section.descriptionAr || ""}
      </p>

      <p class="en">
        ${section.descriptionEn || ""}
      </p>

    </div>

  `;


  questionsContainer.innerHTML = "";


  section.questions.forEach((question, index) => {

    questionsContainer.appendChild(
      createQuestion(question, index)
    );

  });


  sectionNotes.value =
    notes[section.id] || "";


  previousBtn.disabled =
    currentSection === 0;


  nextBtn.textContent =
    currentSection === assessmentSections.length - 1
      ? "View Results / عرض النتائج"
      : "Next / التالي →";


  updateProgress();

}


function createQuestion(question, index) {

  const div =
    document.createElement("div");

  div.className = "question";


  let html = `

    <div class="question-number">
      ${question.id}
    </div>

    <h3 class="ar">
      ${question.ar}
    </h3>

    <div class="english en">
      ${question.en}
    </div>

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

  const labels = [

    ["1","غير موجود"],
    ["2","محدود"],
    ["3","متوسط"],
    ["4","جيد"],
    ["5","متقدم"],
    ["NA","N/A"]

  ];


  let html =
    `<div class="scale">`;


  labels.forEach(([value,label]) => {

    const checked =
      answers[question.id] == value
        ? "checked"
        : "";


    html += `

      <label>

        <input
          type="radio"
          name="${question.id}"
          value="${value}"
          ${checked}
          onchange="saveAnswer(
            '${question.id}',
            this.value
          )"
        >

        <span>
          ${value}
          <br>
          <small>${label}</small>
        </span>

      </label>

    `;

  });


  html += `</div>`;

  return html;

}


function createSelect(question) {

  let html = `

    <select
      class="form-select"
      onchange="
        saveAnswer('${question.id}',this.value);
        checkOther('${question.id}',this.value);
      "
    >

      <option value="">
        Select / اختر
      </option>

  `;


  question.options.forEach(option => {

    const value = option[0];

    const selected =
      answers[question.id] === value
        ? "selected"
        : "";


    html += `

      <option
        value="${value}"
        ${selected}
      >

        ${option[1]}
        |
        ${option[0]}

      </option>

    `;

  });


  html += `
    </select>

    <input
      id="${question.id}_other"
      class="form-input other-input"
      placeholder="Please specify / يرجى التوضيح"
      value="${answers[question.id + "_other"] || ""}"
      onchange="
        saveAnswer(
          '${question.id}_other',
          this.value
        )
      "
    >
  `;


  setTimeout(() => {

    if (answers[question.id] === "Other") {

      checkOther(
        question.id,
        "Other"
      );

    }

  }, 20);


  return html;

}


function checkOther(questionId, value) {

  const field =
    document.getElementById(
      questionId + "_other"
    );


  if (!field)
    return;


  field.style.display =
    value === "Other"
      ? "block"
      : "none";

}


function saveAnswer(id, value) {

  answers[id] = value;

  localStorage.setItem(
    "wa7edAnswers",
    JSON.stringify(answers)
  );

  updateProgress();

}


function saveSectionNotes() {

  const section =
    assessmentSections[currentSection];

  notes[section.id] =
    sectionNotes.value;

  localStorage.setItem(
    "wa7edNotes",
    JSON.stringify(notes)
  );

}


previousBtn.onclick = () => {

  saveSectionNotes();

  if (currentSection > 0) {

    currentSection--;

    renderSection();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

};


nextBtn.onclick = () => {

  saveSectionNotes();

  if (
    currentSection <
    assessmentSections.length - 1
  ) {

    currentSection++;

    renderSection();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } else {

    showResults();

  }

};


saveBtn.onclick = () => {

  saveSectionNotes();

  alert(
    "Progress saved successfully.\nتم حفظ التقدم."
  );

};


function updateProgress() {

  const allQuestions =
    assessmentSections
      .flatMap(section =>
        section.questions
      );


  const answered =
    allQuestions.filter(
      question =>
        answers[question.id] !== undefined &&
        answers[question.id] !== ""
    ).length;


  const percent =
    Math.round(
      answered /
      allQuestions.length *
      100
    );


  document.getElementById(
    "progressBar"
  ).style.width =
    percent + "%";


  document.getElementById(
    "progressText"
  ).textContent =
    percent + "%";


  const section =
    assessmentSections[currentSection];


  document.getElementById(
    "sectionName"
  ).textContent =
    language === "ar"
      ? section.titleAr
      : language === "en"
        ? section.titleEn
        : section.titleAr +
          " | " +
          section.titleEn;

}


function calculateResults() {

  const results = [];


  assessmentSections
    .filter(section => section.scored)
    .forEach(section => {

      let total = 0;
      let count = 0;


      section.questions.forEach(question => {

        const value =
          answers[question.id];


        if (
          value &&
          value !== "NA"
        ) {

          const numeric =
            Number(value);


          if (!isNaN(numeric)) {

            total += numeric;

            count++;

          }

        }

      });


      if (count > 0) {

        const average =
          total / count;

        results.push({

          id: section.id,

          titleEn:
            section.titleEn,

          titleAr:
            section.titleAr,

          average,

          percentage:
            average / 5 * 100

        });

      }

    });


  return results;

}


function getMaturity(score) {

  if (score <= 1.8)
    return "Initial / مبدئي";

  if (score <= 2.6)
    return "Developing / قيد التطوير";

  if (score <= 3.4)
    return "Defined / مُعرّف";

  if (score <= 4.2)
    return "Managed / مُدار";

  return "Optimized / مُحسن";

}


function showResults() {

  const results =
    calculateResults();


  if (results.length === 0) {

    alert(
      "Please answer some scored questions first.\nيرجى الإجابة على أسئلة التقييم أولاً."
    );

    return;

  }


  const overall =
    results.reduce(
      (sum, result) =>
        sum + result.average,
      0
    ) / results.length;


  const percentage =
    Math.round(
      overall / 5 * 100
    );


  document.querySelector(
    ".assessment-layout"
  ).classList.add("hidden");


  document.querySelector(
    ".hero"
  ).classList.add("hidden");


  const resultPage =
    document.getElementById(
      "resultsPage"
    );


  resultPage.classList.remove(
    "hidden"
  );


  document.getElementById(
    "overallScore"
  ).textContent =
    percentage + "%";


  document.getElementById(
    "maturityLevel"
  ).textContent =
    getMaturity(overall);


  renderDomainScores(results);


  const sorted =
    [...results].sort(
      (a,b) =>
        b.percentage -
        a.percentage
    );


  renderStrengths(
    sorted.slice(0,3)
  );


  renderImprovements(
    [...results]
      .sort(
        (a,b) =>
          a.percentage -
          b.percentage
      )
      .slice(0,3)
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function renderDomainScores(results) {

  const container =
    document.getElementById(
      "domainScores"
    );


  container.innerHTML = "";


  results.forEach(result => {

    const percent =
      Math.round(
        result.percentage
      );


    container.innerHTML += `

      <div class="domain-row">

        <strong>
          ${result.titleAr}
        </strong>

        <br>

        <small>
          ${result.titleEn}
        </small>

        <strong style="float:right">
          ${percent}%
        </strong>

        <div class="domain-bar">

          <div
            class="domain-fill"
            style="
              width:${percent}%
            "
          ></div>

        </div>

      </div>

    `;

  });

}


function renderStrengths(results) {

  const container =
    document.getElementById(
      "strengths"
    );


  container.innerHTML =
    results.map(
      result => `

        <p>
          ✓
          <strong>
            ${result.titleAr}
          </strong>

          <br>

          ${result.titleEn}

          —
          ${Math.round(
            result.percentage
          )}%

        </p>

      `
    ).join("");

}


function renderImprovements(results) {

  const container =
    document.getElementById(
      "improvements"
    );


  container.innerHTML =
    results.map(
      result => `

        <p>
          →
          <strong>
            ${result.titleAr}
          </strong>

          <br>

          ${result.titleEn}

          —
          ${Math.round(
            result.percentage
          )}%

        </p>

      `
    ).join("");

}


languageSelect.onchange =
  function() {

    language =
      this.value;

    localStorage.setItem(
      "wa7edLanguage",
      language
    );

    applyLanguage();

    renderSection();

};


function applyLanguage() {

  document.body.classList.remove(
    "ar-only",
    "en-only"
  );


  if (language === "ar") {

    document.body.classList.add(
      "ar-only"
    );

    document.documentElement.dir =
      "rtl";

  }

  else if (language === "en") {

    document.body.classList.add(
      "en-only"
    );

    document.documentElement.dir =
      "ltr";

  }

  else {

    document.documentElement.dir =
      "ltr";

  }

}


function restartAssessment() {

  const confirmRestart =
    confirm(
      "Delete all answers and restart?\nحذف جميع الإجابات وإعادة التقييم؟"
    );


  if (!confirmRestart)
    return;


  localStorage.removeItem(
    "wa7edAnswers"
  );

  localStorage.removeItem(
    "wa7edNotes"
  );


  answers = {};
  notes = {};

  currentSection = 0;

  location.reload();

}


init();
