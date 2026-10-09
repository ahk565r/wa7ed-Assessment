/* =========================================================
   WA7ED ASSESSMENT APPLICATION
========================================================= */


/* =========================================================
   STATE
========================================================= */

let currentSection =
  Number(
    localStorage.getItem("wa7edCurrentSection")
  ) || 0;


let answers =
  JSON.parse(
    localStorage.getItem("wa7edAnswers")
  ) || {};


let notes =
  JSON.parse(
    localStorage.getItem("wa7edNotes")
  ) || {};


let language =
  localStorage.getItem("wa7edLanguage")
  || "both";


/* =========================================================
   DOM ELEMENTS
========================================================= */

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


if (languageSelect) {
  languageSelect.value = language;
}


/* =========================================================
   LANGUAGE HELPERS
========================================================= */

/*
  Arabic:
  returns Arabic only

  English:
  returns English only

  Both:
  returns Arabic | English
*/

function textByLanguage(ar, en) {

  if (language === "ar") {
    return ar;
  }

  if (language === "en") {
    return en;
  }

  return `${ar} | ${en}`;
}


/*
  Used when we need HTML
  with separate AR / EN elements.
*/

function bilingualHTML(ar, en, tag = "span") {

  if (language === "ar") {
    return `
      <${tag} class="ar">
        ${ar}
      </${tag}>
    `;
  }

  if (language === "en") {
    return `
      <${tag} class="en">
        ${en}
      </${tag}>
    `;
  }

  return `
    <${tag} class="ar">
      ${ar}
    </${tag}>

    <${tag} class="en">
      ${en}
    </${tag}>
  `;
}


/* =========================================================
   INIT
========================================================= */

function init() {

  if (
    currentSection >=
    assessmentSections.length
  ) {
    currentSection = 0;
  }

  applyLanguage();

  buildMenu();

  renderSection();

}


window.addEventListener(
  "DOMContentLoaded",
  init
);


/* =========================================================
   SECTION MENU
========================================================= */

function buildMenu() {

  if (!sectionMenu) return;


  sectionMenu.innerHTML = "";


  assessmentSections.forEach(
    (section, index) => {

      const item =
        document.createElement("div");


      item.className =
        "menu-item" +
        (
          index === currentSection
            ? " active"
            : ""
        );


      if (language === "ar") {

        item.innerHTML = `
          <div class="ar">
            ${index + 1}. ${section.titleAr}
          </div>
        `;

      }

      else if (language === "en") {

        item.innerHTML = `
          <div class="en">
            ${index + 1}. ${section.titleEn}
          </div>
        `;

      }

      else {

        item.innerHTML = `
          <div class="ar">
            ${index + 1}. ${section.titleAr}
          </div>

          <div class="en">
            ${index + 1}. ${section.titleEn}
          </div>
        `;

      }


      item.onclick = () => {

        saveSectionNotes();

        currentSection = index;

        localStorage.setItem(
          "wa7edCurrentSection",
          currentSection
        );

        renderSection();

        scrollToFirstQuestion();

      };


      sectionMenu.appendChild(item);

    }
  );

}


/* =========================================================
   RENDER SECTION
========================================================= */

function renderSection() {

  const section =
    assessmentSections[currentSection];


  buildMenu();


  if (language === "ar") {

    sectionHeader.innerHTML = `

      <div class="section-title">

        <h2 class="ar">
          ${section.titleAr}
        </h2>

        ${
          section.descriptionAr
            ? `
              <p class="ar">
                ${section.descriptionAr}
              </p>
            `
            : ""
        }

      </div>

    `;

  }

  else if (language === "en") {

    sectionHeader.innerHTML = `

      <div class="section-title">

        <h2 class="en">
          ${section.titleEn}
        </h2>

        ${
          section.descriptionEn
            ? `
              <p class="en">
                ${section.descriptionEn}
              </p>
            `
            : ""
        }

      </div>

    `;

  }

  else {

    sectionHeader.innerHTML = `

      <div class="section-title">

        <h2 class="ar">
          ${section.titleAr}
        </h2>

        <h2 class="en">
          ${section.titleEn}
        </h2>


        ${
          section.descriptionAr
            ? `
              <p class="ar">
                ${section.descriptionAr}
              </p>
            `
            : ""
        }


        ${
          section.descriptionEn
            ? `
              <p class="en">
                ${section.descriptionEn}
              </p>
            `
            : ""
        }

      </div>

    `;

  }


  questionsContainer.innerHTML = "";


  section.questions.forEach(
    (question, index) => {

      questionsContainer.appendChild(
        createQuestion(
          question,
          index
        )
      );

    }
  );


  sectionNotes.value =
    notes[section.id] || "";


  previousBtn.disabled =
    currentSection === 0;


  updateNavigationButtons();

  updateNotesPlaceholder();

  updateProgress();

}


/* =========================================================
   NAVIGATION BUTTON TEXT
========================================================= */

function updateNavigationButtons() {

  if (language === "ar") {

    previousBtn.textContent =
      "السابق";

    saveBtn.textContent =
      "حفظ";

    nextBtn.textContent =
      currentSection ===
      assessmentSections.length - 1
        ? "عرض النتائج"
        : "التالي";

  }

  else if (language === "en") {

    previousBtn.textContent =
      "← Previous";

    saveBtn.textContent =
      "Save";

    nextBtn.textContent =
      currentSection ===
      assessmentSections.length - 1
        ? "View Results"
        : "Next →";

  }

  else {

    previousBtn.textContent =
      "← Previous / السابق";

    saveBtn.textContent =
      "Save / حفظ";

    nextBtn.textContent =
      currentSection ===
      assessmentSections.length - 1
        ? "View Results / عرض النتائج"
        : "Next / التالي →";

  }

}


/* =========================================================
   NOTES PLACEHOLDER
========================================================= */

function updateNotesPlaceholder() {

  if (!sectionNotes) return;


  if (language === "ar") {

    sectionNotes.placeholder =
      "اختياري";

  }

  else if (language === "en") {

    sectionNotes.placeholder =
      "Optional";

  }

  else {

    sectionNotes.placeholder =
      "Optional / اختياري";

  }

}


/* =========================================================
   QUESTION RENDERING
========================================================= */

function createQuestion(
  question,
  index
) {

  const div =
    document.createElement("div");


  div.className = "question";


  let html = `

    <div class="question-number">
      ${question.id}
    </div>

  `;


  if (language === "ar") {

    html += `

      <h3 class="ar">
        ${question.ar}
      </h3>

    `;

  }

  else if (language === "en") {

    html += `

      <h3 class="en">
        ${question.en}
      </h3>

    `;

  }

  else {

    html += `

      <h3 class="ar">
        ${question.ar}
      </h3>

      <div class="english en">
        ${question.en}
      </div>

    `;

  }


  if (
    question.type === "scale"
  ) {

    html +=
      createScale(question);

  }

  else if (
    question.type === "select"
  ) {

    html +=
      createSelect(question);

  }


  div.innerHTML = html;


  return div;

}


/* =========================================================
   SCALE
========================================================= */

function createScale(question) {

  const labels = [

    [
      "1",
      "غير موجود",
      "Not in place"
    ],

    [
      "2",
      "محدود",
      "Partially"
    ],

    [
      "3",
      "متوسط",
      "Inconsistent"
    ],

    [
      "4",
      "جيد",
      "Established"
    ],

    [
      "5",
      "متقدم",
      "Measured"
    ],

    [
      "NA",
      "لا ينطبق",
      "N/A"
    ]

  ];


  let html =
    `<div class="scale">`;


  labels.forEach(
    (
      [
        value,
        arabic,
        english
      ]
    ) => {

      const checked =
        answers[question.id] == value
          ? "checked"
          : "";


      let labelText = "";


      if (language === "ar") {

        labelText = `
          <small class="ar">
            ${arabic}
          </small>
        `;

      }

      else if (language === "en") {

        labelText = `
          <small class="en">
            ${english}
          </small>
        `;

      }

      else {

        labelText = `

          <small class="ar">
            ${arabic}
          </small>

          <small class="en">
            ${english}
          </small>

        `;

      }


      html += `

        <label>

          <input
            type="radio"
            name="${question.id}"
            value="${value}"
            ${checked}
            onchange="
              saveAnswer(
                '${question.id}',
                this.value
              )
            "
          >

          <span>

            <strong>
              ${value}
            </strong>

            <br>

            ${labelText}

          </span>

        </label>

      `;

    }
  );


  html += `</div>`;


  return html;

}


/* =========================================================
   SELECT
========================================================= */

function createSelect(question) {

  const placeholder =
    language === "ar"

      ? "اختر"

      : language === "en"

        ? "Select"

        : "اختر | Select";


  let html = `

    <select
      class="form-select"

      onchange="
        saveAnswer(
          '${question.id}',
          this.value
        );

        checkOther(
          '${question.id}',
          this.value
        );
      "
    >

      <option value="">
        ${placeholder}
      </option>

  `;


  question.options.forEach(
    option => {

      const value =
        option[0];


      const ar =
        option[1];


      const en =
        option[0];


      const selected =
        answers[question.id] === value
          ? "selected"
          : "";


      let optionText;


      if (language === "ar") {

        optionText = ar;

      }

      else if (language === "en") {

        optionText = en;

      }

      else {

        optionText =
          `${ar} | ${en}`;

      }


      html += `

        <option
          value="${value}"
          ${selected}
        >
          ${optionText}
        </option>

      `;

    }
  );


  const otherPlaceholder =
    language === "ar"

      ? "يرجى التوضيح"

      : language === "en"

        ? "Please specify"

        : "يرجى التوضيح / Please specify";


  html += `

    </select>


    <input
      id="${question.id}_other"

      class="
        form-input
        other-input
      "

      placeholder="${otherPlaceholder}"

      value="${
        answers[
          question.id + "_other"
        ] || ""
      }"

      onchange="
        saveAnswer(
          '${question.id}_other',
          this.value
        )
      "
    >

  `;


  setTimeout(
    () => {

      if (
        answers[question.id] ===
        "Other"
      ) {

        checkOther(
          question.id,
          "Other"
        );

      }

    },
    0
  );


  return html;

}


/* =========================================================
   OTHER FIELD
========================================================= */

function checkOther(
  questionId,
  value
) {

  const field =
    document.getElementById(
      questionId + "_other"
    );


  if (!field) return;


  field.style.display =
    value === "Other"
      ? "block"
      : "none";

}


/* =========================================================
   SAVE ANSWERS
========================================================= */

function saveAnswer(
  id,
  value
) {

  answers[id] = value;


  localStorage.setItem(
    "wa7edAnswers",
    JSON.stringify(answers)
  );


  updateProgress();

}


/* =========================================================
   SAVE NOTES
========================================================= */

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


/* =========================================================
   SCROLL TO FIRST QUESTION
========================================================= */

function scrollToFirstQuestion() {

  setTimeout(
    () => {

      const firstQuestion =
        document.querySelector(
          "#questionsContainer .question"
        );


      if (!firstQuestion) return;


      const y =
        firstQuestion
          .getBoundingClientRect()
          .top
        +
        window.pageYOffset
        -
        120;


      window.scrollTo({

        top: y,

        behavior: "smooth"

      });

    },
    50
  );

}


/* =========================================================
   SCROLL TO RESULTS
========================================================= */

function scrollToResults() {

  setTimeout(
    () => {

      const resultPage =
        document.getElementById(
          "resultsPage"
        );


      if (!resultPage) return;


      const y =
        resultPage
          .getBoundingClientRect()
          .top
        +
        window.pageYOffset
        -
        100;


      window.scrollTo({

        top: y,

        behavior: "smooth"

      });

    },
    50
  );

}


/* =========================================================
   NAVIGATION
========================================================= */

previousBtn.onclick =
  () => {

    saveSectionNotes();


    if (
      currentSection > 0
    ) {

      currentSection--;


      localStorage.setItem(
        "wa7edCurrentSection",
        currentSection
      );


      renderSection();

      scrollToFirstQuestion();

    }

  };


nextBtn.onclick =
  () => {

    saveSectionNotes();


    if (
      currentSection <
      assessmentSections.length - 1
    ) {

      currentSection++;


      localStorage.setItem(
        "wa7edCurrentSection",
        currentSection
      );


      renderSection();

      scrollToFirstQuestion();

    }

    else {

      showResults();

    }

  };


saveBtn.onclick =
  () => {

    saveSectionNotes();


    localStorage.setItem(
      "wa7edCurrentSection",
      currentSection
    );


    if (language === "ar") {

      alert(
        "تم حفظ التقدم بنجاح."
      );

    }

    else if (language === "en") {

      alert(
        "Progress saved successfully."
      );

    }

    else {

      alert(
        "Progress saved successfully.\nتم حفظ التقدم بنجاح."
      );

    }

  };


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

  const allQuestions =
    assessmentSections.flatMap(
      section =>
        section.questions
    );


  const answered =
    allQuestions.filter(
      question => {

        return (

          answers[question.id]
          !== undefined

          &&

          answers[question.id]
          !== ""

        );

      }
    ).length;


  const percent =
    allQuestions.length

      ? Math.round(
          (
            answered /
            allQuestions.length
          )
          * 100
        )

      : 0;


  document.getElementById(
    "progressBar"
  ).style.width =
    `${percent}%`;


  document.getElementById(
    "progressText"
  ).textContent =
    `${percent}%`;


  const section =
    assessmentSections[
      currentSection
    ];


  document.getElementById(
    "sectionName"
  ).textContent =
    textByLanguage(
      section.titleAr,
      section.titleEn
    );

}


/* =========================================================
   CALCULATE RESULTS
========================================================= */

function calculateResults() {

  const results = [];


  assessmentSections

    .filter(
      section =>
        section.scored
    )

    .forEach(
      section => {

        let total = 0;

        let count = 0;


        section.questions.forEach(
          question => {

            const value =
              answers[question.id];


            if (
              value
              &&
              value !== "NA"
            ) {

              const numeric =
                Number(value);


              if (
                !Number.isNaN(
                  numeric
                )
              ) {

                total += numeric;

                count++;

              }

            }

          }
        );


        if (
          count > 0
        ) {

          const average =
            total / count;


          results.push({

            id:
              section.id,

            titleEn:
              section.titleEn,

            titleAr:
              section.titleAr,

            average,

            percentage:
              (
                average /
                5
              )
              * 100

          });

        }

      }
    );


  return results;

}


/* =========================================================
   MATURITY
========================================================= */

function getMaturity(score) {

  let ar;
  let en;


  if (
    score <= 1.8
  ) {

    ar = "مبدئي";

    en = "Initial";

  }

  else if (
    score <= 2.6
  ) {

    ar = "قيد التطوير";

    en = "Developing";

  }

  else if (
    score <= 3.4
  ) {

    ar = "مُعرّف";

    en = "Defined";

  }

  else if (
    score <= 4.2
  ) {

    ar = "مُدار";

    en = "Managed";

  }

  else {

    ar = "مُحسن";

    en = "Optimized";

  }


  return {
    ar,
    en,
    display:
      textByLanguage(
        ar,
        en
      )
  };

}


/* =========================================================
   SHOW RESULTS
========================================================= */

function showResults() {

  const results =
    calculateResults();


  if (
    results.length === 0
  ) {

    if (
      language === "ar"
    ) {

      alert(
        "يرجى الإجابة على أسئلة التقييم أولاً."
      );

    }

    else if (
      language === "en"
    ) {

      alert(
        "Please answer some scored questions first."
      );

    }

    else {

      alert(
        "Please answer some scored questions first.\nيرجى الإجابة على أسئلة التقييم أولاً."
      );

    }


    return;

  }


  const overall =
    results.reduce(
      (
        sum,
        result
      ) =>

        sum +
        result.average,

      0
    )
    /
    results.length;


  const percentage =
    Math.round(
      (
        overall /
        5
      )
      * 100
    );


  document.getElementById(
    "assessmentLayout"
  ).classList.add(
    "hidden"
  );


  const hero =
    document.querySelector(".hero");


  if (hero) {

    hero.classList.add(
      "hidden"
    );

  }


  const brandMessage =
    document.querySelector(
      ".brand-message"
    );


  if (brandMessage) {

    brandMessage.classList.add(
      "hidden"
    );

  }


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
    `${percentage}%`;


  const maturity =
    getMaturity(overall);


  document.getElementById(
    "maturityLevel"
  ).textContent =
    maturity.display;


  renderDomainScores(
    results
  );


  const strengths =
    [...results]

      .sort(
        (
          a,
          b
        ) =>
          b.percentage -
          a.percentage
      )

      .slice(
        0,
        3
      );


  const improvements =
    [...results]

      .sort(
        (
          a,
          b
        ) =>
          a.percentage -
          b.percentage
      )

      .slice(
        0,
        3
      );


  renderStrengths(
    strengths
  );


  renderImprovements(
    improvements
  );


  updateEmailLink(
    percentage,
    maturity,
    improvements
  );


  updateResultsStaticText();


  scrollToResults();

}


/* =========================================================
   RESULTS STATIC TEXT
========================================================= */

function updateResultsStaticText() {

  const resultPage =
    document.getElementById(
      "resultsPage"
    );


  if (!resultPage) return;


  /*
    Existing .ar and .en elements
    will automatically respond to
    body.ar-only / body.en-only.
  */

}


/* =========================================================
   DOMAIN RESULTS
========================================================= */

function renderDomainScores(
  results
) {

  const container =
    document.getElementById(
      "domainScores"
    );


  container.innerHTML = "";


  results.forEach(
    result => {

      const percent =
        Math.round(
          result.percentage
        );


      let titleHTML;


      if (
        language === "ar"
      ) {

        titleHTML = `
          <strong class="ar">
            ${result.titleAr}
          </strong>
        `;

      }

      else if (
        language === "en"
      ) {

        titleHTML = `
          <strong class="en">
            ${result.titleEn}
          </strong>
        `;

      }

      else {

        titleHTML = `

          <strong class="ar">
            ${result.titleAr}
          </strong>

          <br>

          <small class="en">
            ${result.titleEn}
          </small>

        `;

      }


      container.innerHTML += `

        <div class="domain-row">

          <div class="domain-heading">

            <div>
              ${titleHTML}
            </div>

            <strong>
              ${percent}%
            </strong>

          </div>


          <div class="domain-bar">

            <div
              class="domain-fill"

              style="
                width:
                ${percent}%
              "
            >
            </div>

          </div>

        </div>

      `;

    }
  );

}


/* =========================================================
   STRENGTHS
========================================================= */

function renderStrengths(
  results
) {

  const container =
    document.getElementById(
      "strengths"
    );


  container.innerHTML =
    results.map(
      result => {

        const title =
          textByLanguage(
            result.titleAr,
            result.titleEn
          );


        return `

          <p>

            ✓

            <strong>
              ${title}
            </strong>

            —
            ${Math.round(
              result.percentage
            )}%

          </p>

        `;

      }
    ).join("");

}


/* =========================================================
   IMPROVEMENTS
========================================================= */

function renderImprovements(
  results
) {

  const container =
    document.getElementById(
      "improvements"
    );


  container.innerHTML =
    results.map(
      result => {

        const title =
          textByLanguage(
            result.titleAr,
            result.titleEn
          );


        return `

          <p>

            →

            <strong>
              ${title}
            </strong>

            —
            ${Math.round(
              result.percentage
            )}%

          </p>

        `;

      }
    ).join("");

}


/* =========================================================
   EMAIL RESULTS REVIEW
========================================================= */

function updateEmailLink(
  percentage,
  maturity,
  improvements
) {

  const button =
    document.getElementById(
      "reviewResultsButton"
    );


  if (!button) return;


  const prioritiesEnglish =
    improvements.map(
      item =>
        `${item.titleEn} (${Math.round(item.percentage)}%)`
    ).join(", ");


  const prioritiesArabic =
    improvements.map(
      item =>
        `${item.titleAr} (${Math.round(item.percentage)}%)`
    ).join("، ");


  let subject;

  let body;


  if (
    language === "ar"
  ) {

    subject =
      encodeURIComponent(
        "طلب مراجعة نتائج تقييم و1حد"
      );


    body =
      encodeURIComponent(

`السلام عليكم،

أرغب في طلب مراجعة نتائج التقييم.

النتيجة الإجمالية: ${percentage}%
مستوى النضج: ${maturity.ar}

مجالات الأولوية:
${prioritiesArabic}

اسم الشركة:
اسم الشخص:
رقم الجوال:

شكراً.`

      );

  }

  else if (
    language === "en"
  ) {

    subject =
      encodeURIComponent(
        "Wa7ed Assessment Results Review"
      );


    body =
      encodeURIComponent(

`Hello Wa7ed Team,

I would like to request a review of my assessment results.

Overall Score: ${percentage}%
Maturity Level: ${maturity.en}

Priority Areas:
${prioritiesEnglish}

Company Name:
Contact Name:
Phone:

Thank you.`

      );

  }

  else {

    subject =
      encodeURIComponent(
        "Wa7ed Assessment Results Review | مراجعة نتائج تقييم و1حد"
      );


    body =
      encodeURIComponent(

`Hello Wa7ed Team,
السلام عليكم،

I would like to request a review of my assessment results.
أرغب في طلب مراجعة نتائج التقييم.

Overall Score / النتيجة الإجمالية:
${percentage}%

Maturity Level / مستوى النضج:
${maturity.en} | ${maturity.ar}

Priority Areas / مجالات الأولوية:
${prioritiesEnglish}
${prioritiesArabic}

Company Name / اسم الشركة:

Contact Name / اسم الشخص:

Phone / رقم الجوال:

Thank you.
شكراً.`

      );

  }


  button.href =
    `mailto:ahk565.work@gmail.com?subject=${subject}&body=${body}`;

}


/* =========================================================
   LANGUAGE SELECTOR
========================================================= */

languageSelect.onchange =
  function() {

    saveSectionNotes();


    language =
      this.value;


    localStorage.setItem(
      "wa7edLanguage",
      language
    );


    applyLanguage();

    renderSection();

  };


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

  document.body.classList.remove(
    "ar-only",
    "en-only"
  );


  /*
    Keep same image for all languages.
  */

  const heroBrandImage =
    document.getElementById(
      "heroBrandImage"
    );


  if (heroBrandImage) {

    heroBrandImage.src =
      "Wa7ed-ar.png";


    heroBrandImage.alt =
      language === "ar"

        ? "و1حد للتقييمات"

        : language === "en"

          ? "Wa7ed Assessment"

          :
          "Wa7ed Assessment | و1حد للتقييمات";

  }


  /*
    Arabic
  */

  if (
    language === "ar"
  ) {

    document.body.classList.add(
      "ar-only"
    );


    document.documentElement.dir =
      "rtl";


    document.documentElement.lang =
      "ar";


    document.title =
      "🛡️ تقييم و1حد | التقنية والذكاء الاصطناعي والأمن السيبراني";

  }


  /*
    English
  */

  else if (
    language === "en"
  ) {

    document.body.classList.add(
      "en-only"
    );


    document.documentElement.dir =
      "ltr";


    document.documentElement.lang =
      "en";


    document.title =
      "🛡️ Wa7ed Assessment | Technology, AI & Cybersecurity";

  }


  /*
    Arabic + English
  */

  else {

    document.documentElement.dir =
      "ltr";


    document.documentElement.lang =
      "en";


    document.title =
      "🛡️ Wa7ed Assessment | تقييم و1حد | Technology, AI & Cybersecurity";

  }

}


/* =========================================================
   RESTART
========================================================= */

function restartAssessment() {

  let message;


  if (
    language === "ar"
  ) {

    message =
      "هل تريد حذف جميع الإجابات وإعادة التقييم؟";

  }

  else if (
    language === "en"
  ) {

    message =
      "Delete all answers and restart the assessment?";

  }

  else {

    message =
      "Delete all answers and restart?\nحذف جميع الإجابات وإعادة التقييم؟";

  }


  const confirmRestart =
    confirm(message);


  if (!confirmRestart) {
    return;
  }


  localStorage.removeItem(
    "wa7edAnswers"
  );


  localStorage.removeItem(
    "wa7edNotes"
  );


  localStorage.removeItem(
    "wa7edCurrentSection"
  );


  answers = {};

  notes = {};

  currentSection = 0;


  window.location.reload();

}
