/* =========================================================
   WA7ED ASSESSMENT APPLICATION
========================================================= */


let currentSection =
  Number(
    localStorage.getItem(
      "wa7edCurrentSection"
    )
  ) || 0;


let answers =
  JSON.parse(
    localStorage.getItem(
      "wa7edAnswers"
    )
  ) || {};


let notes =
  JSON.parse(
    localStorage.getItem(
      "wa7edNotes"
    )
  ) || {};


let language =
  localStorage.getItem(
    "wa7edLanguage"
  ) || "both";



/* =========================================================
   DOM ELEMENTS
========================================================= */


const questionsContainer =
  document.getElementById(
    "questionsContainer"
  );


const sectionHeader =
  document.getElementById(
    "sectionHeader"
  );


const sectionMenu =
  document.getElementById(
    "sectionMenu"
  );


const previousBtn =
  document.getElementById(
    "previousBtn"
  );


const nextBtn =
  document.getElementById(
    "nextBtn"
  );


const saveBtn =
  document.getElementById(
    "saveBtn"
  );


const languageSelect =
  document.getElementById(
    "languageSelect"
  );


const sectionNotes =
  document.getElementById(
    "sectionNotes"
  );


languageSelect.value =
  language;



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


  applyLanguage(const heroBrandImage =
  document.getElementById("heroBrandImage");

if (heroBrandImage) {

  if (language === "ar") {

    heroBrandImage.src =
      "Wa7ed-ar.png";

    heroBrandImage.alt =
      "و1حد للتقييمات";

  }

  else if (language === "en") {

    heroBrandImage.src =
      "Wa7ed-en.png";

    heroBrandImage.alt =
      "Wa7ed Assessment";

  }

  else {

    heroBrandImage.src =
      "Wa7ed-bilingual.png";

    heroBrandImage.alt =
      "Wa7ed Assessment | و1حد للتقييمات";

  }

});

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

  sectionMenu.innerHTML = "";


  assessmentSections.forEach(
    (section,index) => {


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "menu-item" +
        (
          index === currentSection
            ? " active"
            : ""
        );


      item.innerHTML = `

        <div class="ar">
          ${index + 1}.
          ${section.titleAr}
        </div>

        <div class="en">
          ${index + 1}.
          ${section.titleEn}
        </div>

      `;


      item.onclick = () => {

        saveSectionNotes();

        currentSection =
          index;


        localStorage.setItem(
          "wa7edCurrentSection",
          currentSection
        );


        renderSection();

      scrollToFirstQuestion();

      };


      sectionMenu.appendChild(
        item
      );

    }
  );

}



/* =========================================================
   RENDER SECTION
========================================================= */


function renderSection() {

  const section =
    assessmentSections[
      currentSection
    ];


  buildMenu();


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



  questionsContainer.innerHTML =
    "";


  section.questions.forEach(
    (question,index) => {

      questionsContainer.appendChild(
        createQuestion(
          question,
          index
        )
      );

    }
  );



  sectionNotes.value =
    notes[
      section.id
    ] || "";



  previousBtn.disabled =
    currentSection === 0;



  if (
    currentSection ===
    assessmentSections.length - 1
  ) {

    nextBtn.textContent =
      "View Results / عرض النتائج";

  }

  else {

    nextBtn.textContent =
      "Next / التالي →";

  }



  updateProgress();

}



/* =========================================================
   QUESTION RENDERING
========================================================= */


function createQuestion(
  question,
  index
) {


  const div =
    document.createElement(
      "div"
    );


  div.className =
    "question";


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



  if (
    question.type ===
    "scale"
  ) {

    html +=
      createScale(
        question
      );

  }



  else if (
    question.type ===
    "select"
  ) {

    html +=
      createSelect(
        question
      );

  }



  div.innerHTML =
    html;


  return div;

}



/* =========================================================
   SCALE
========================================================= */


function createScale(
  question
) {


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
        answers[
          question.id
        ] == value

        ? "checked"

        : "";



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

            <small class="ar">
              ${arabic}
            </small>

            <small class="en">
              ${english}
            </small>

          </span>

        </label>

      `;

    }
  );



  html +=
    `</div>`;


  return html;

}



/* =========================================================
   SELECT
========================================================= */


function createSelect(
  question
) {


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
        Select / اختر
      </option>

  `;



  question.options.forEach(
    option => {


      const value =
        option[0];


      const selected =
        answers[
          question.id
        ] === value

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

    }
  );



  html += `

    </select>



    <input

      id="${question.id}_other"

      class="
        form-input
        other-input
      "

      placeholder="
        Please specify /
        يرجى التوضيح
      "

      value="${
        answers[
          question.id +
          "_other"
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
        answers[
          question.id
        ] === "Other"
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
      questionId +
      "_other"
    );


  if (!field) {

    return;

  }


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


  answers[id] =
    value;


  localStorage.setItem(
    "wa7edAnswers",
    JSON.stringify(
      answers
    )
  );


  updateProgress();

}



/* =========================================================
   SAVE NOTES
========================================================= */


function saveSectionNotes() {


  const section =
    assessmentSections[
      currentSection
    ];


  notes[
    section.id
  ] =
    sectionNotes.value;


  localStorage.setItem(
    "wa7edNotes",
    JSON.stringify(
      notes
    )
  );

}


function scrollToFirstQuestion() {

  setTimeout(() => {

    const firstQuestion =
      document.querySelector(
        "#questionsContainer .question"
      );

    if (!firstQuestion) return;

    const y =
      firstQuestion.getBoundingClientRect().top +
      window.pageYOffset -
      120;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

  }, 50);

}
/* =========================================================
   NAVIGATION
========================================================= */
function scrollToFirstQuestion() {

  setTimeout(() => {

    const firstQuestion =
      document.querySelector(
        "#questionsContainer .question"
      );

    if (!firstQuestion) return;

    const y =
      firstQuestion.getBoundingClientRect().top +
      window.pageYOffset -
      120;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

  }, 50);

}

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


    alert(
      "Progress saved successfully.\nتم حفظ التقدم بنجاح."
    );

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

          answers[
            question.id
          ] !== undefined

          &&

          answers[
            question.id
          ] !== ""

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

    language === "ar"

      ? section.titleAr

      : language === "en"

        ? section.titleEn

        :
          `${section.titleAr} | ${section.titleEn}`;

}



/* =========================================================
   CALCULATE RESULTS
========================================================= */


function calculateResults() {


  const results =
    [];


  assessmentSections

    .filter(
      section =>
        section.scored
    )

    .forEach(
      section => {


        let total =
          0;


        let count =
          0;



        section.questions.forEach(
          question => {


            const value =
              answers[
                question.id
              ];



            if (
              value

              &&
              value !== "NA"
            ) {


              const numeric =
                Number(
                  value
                );


              if (
                !Number.isNaN(
                  numeric
                )
              ) {

                total +=
                  numeric;


                count++;

              }

            }

          }
        );



        if (
          count > 0
        ) {


          const average =
            total /
            count;


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


function getMaturity(
  score
) {


  if (
    score <= 1.8
  ) {

    return (
      "Initial / مبدئي"
    );

  }


  if (
    score <= 2.6
  ) {

    return (
      "Developing / قيد التطوير"
    );

  }


  if (
    score <= 3.4
  ) {

    return (
      "Defined / مُعرّف"
    );

  }


  if (
    score <= 4.2
  ) {

    return (
      "Managed / مُدار"
    );

  }


  return (
    "Optimized / مُحسن"
  );

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


    alert(

      "Please answer some scored questions first.\nيرجى الإجابة على أسئلة التقييم أولاً."

    );


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

    ) / results.length;



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



  document.querySelector(
    ".hero"
  ).classList.add(
    "hidden"
  );



  document.querySelector(
    ".brand-message"
  ).classList.add(
    "hidden"
  );



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
    getMaturity(
      overall
    );



  document.getElementById(
    "maturityLevel"
  ).textContent =
    maturity;



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



 scrollToFirstQuestion();

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


  container.innerHTML =
    "";



  results.forEach(
    result => {


      const percent =
        Math.round(
          result.percentage
        );



      container.innerHTML += `

        <div class="domain-row">

          <div class="domain-heading">

            <div>

              <strong>
                ${result.titleAr}
              </strong>

              <br>

              <small>
                ${result.titleEn}
              </small>

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


  const priorities =
    improvements.map(
      item =>
        `${item.titleEn} (${Math.round(item.percentage)}%)`
    ).join(
      ", "
    );



  const subject =
    encodeURIComponent(
      "Wa7ed Assessment Results Review"
    );



  const body =
    encodeURIComponent(

`Hello Wa7ed Team,

I would like to request a review of my assessment results.

Overall Score: ${percentage}%
Maturity Level: ${maturity}

Priority Areas:
${priorities}

Company Name:
Contact Name:
Phone:

Thank you.`

    );



  button.href =
    `mailto:ahk565.work@gmail.com?subject=${subject}&body=${body}`;

}



/* =========================================================
   LANGUAGE
========================================================= */


languageSelect.onchange =
  function() {


    language =
      this.value;


    localStorage.setItem(
      "wa7edLanguage",
      language
    );


    applyLanguage(const heroBrandImage =
  document.getElementById("heroBrandImage");

if (heroBrandImage) {

  if (language === "ar") {

    heroBrandImage.src =
      "Wa7ed-ar.png";

    heroBrandImage.alt =
      "و1حد للتقييمات";

  }

  else if (language === "en") {

    heroBrandImage.src =
      "Wa7ed-en.png";

    heroBrandImage.alt =
      "Wa7ed Assessment";

  }

  else {

    heroBrandImage.src =
      "Wa7ed-bilingual.png";

    heroBrandImage.alt =
      "Wa7ed Assessment | و1حد للتقييمات";

  }

});


    renderSection();

  };



function applyLanguage(const heroBrandImage =
  document.getElementById("heroBrandImage");

if (heroBrandImage) {

  if (language === "ar") {

    heroBrandImage.src =
      "Wa7ed-ar.png";

    heroBrandImage.alt =
      "و1حد للتقييمات";

  }

  else if (language === "en") {

    heroBrandImage.src =
      "Wa7ed-en.png";

    heroBrandImage.alt =
      "Wa7ed Assessment";

  }

  else {

    heroBrandImage.src =
      "Wa7ed-bilingual.png";

    heroBrandImage.alt =
      "Wa7ed Assessment | و1حد للتقييمات";

  }

}) {


  document.body.classList.remove(
    "ar-only",
    "en-only"
  );



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

  }



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

  }



  else {


    document.documentElement.dir =
      "ltr";


    document.documentElement.lang =
      "en";

  }

}



/* =========================================================
   RESTART
========================================================= */


function restartAssessment() {


  const confirmRestart =
    confirm(

      "Delete all answers and restart?\nحذف جميع الإجابات وإعادة التقييم؟"

    );



  if (
    !confirmRestart
  ) {

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



  answers =
    {};


  notes =
    {};


  currentSection =
    0;



  window.location.reload();

}
