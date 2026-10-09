const assessmentSections = [


/* =========================================================
   1. ORGANIZATION PROFILE
========================================================= */

{
  id: "profile",

  titleEn:
    "Organization Profile",

  titleAr:
    "معلومات المنشأة",

  descriptionEn:
    "Basic information that helps us understand your organization and technology environment.",

  descriptionAr:
    "معلومات أساسية تساعدنا على فهم طبيعة منشأتكم وبيئتكم التقنية.",

  scored:
    false,

  questions: [


    {
      id: "P01",

      type: "select",

      en:
        "What industry does your organization operate in?",

      ar:
        "في أي قطاع تعمل منشأتكم؟",

      options: [

        ["Insurance","التأمين"],

        ["Healthcare","الرعاية الصحية"],

        ["Hospitality","الضيافة"],

        ["Education","التعليم"],

        ["Manufacturing","التصنيع"],

        ["Trading & Services","التجارة والخدمات"],

        ["Technology","التقنية"],

        ["Construction","المقاولات"],

        ["Real Estate","العقار"],

        ["Professional Services","الخدمات المهنية"],

        ["Logistics","الخدمات اللوجستية"],

        ["Other","أخرى"]

      ]
    },


    {
      id: "P02",

      type: "select",

      en:
        "Approximately how many employees work in your organization?",

      ar:
        "كم يبلغ العدد التقريبي لموظفي المنشأة؟",

      options: [

        ["1–20","1–20"],

        ["21–50","21–50"],

        ["51–100","51–100"],

        ["101–250","101–250"],

        ["251–500","251–500"],

        ["501+","501+"]

      ]
    },


    {
      id: "P03",

      type: "select",

      en:
        "How is IT currently managed?",

      ar:
        "كيف تتم إدارة تقنية المعلومات حاليًا؟",

      options: [

        [
          "Internal IT department",
          "إدارة تقنية معلومات داخلية"
        ],

        [
          "Small internal IT team",
          "فريق تقنية داخلي صغير"
        ],

        [
          "One IT employee",
          "موظف تقنية واحد"
        ],

        [
          "External IT provider",
          "مزود خدمات تقنية خارجي"
        ],

        [
          "Internal team + vendors",
          "فريق داخلي مع موردين"
        ],

        [
          "No dedicated IT resource",
          "لا يوجد مسؤول تقنية مخصص"
        ],

        [
          "Other",
          "أخرى"
        ]

      ]
    },


    {
      id: "P04",

      type: "select",

      en:
        "Which technology environment best describes your organization?",

      ar:
        "ما البيئة التقنية الأقرب لوصف منشأتكم؟",

      options: [

        [
          "Mainly on-premises",
          "بشكل رئيسي داخل المنشأة"
        ],

        [
          "Mainly cloud",
          "بشكل رئيسي سحابي"
        ],

        [
          "Hybrid environment",
          "بيئة هجينة"
        ],

        [
          "Mostly SaaS applications",
          "تعتمد بشكل كبير على تطبيقات SaaS"
        ],

        [
          "Not sure",
          "غير متأكد"
        ],

        [
          "Other",
          "أخرى"
        ]

      ]
    }

  ]

},



/* =========================================================
   2. STRATEGY & GOVERNANCE
========================================================= */

{
  id:
    "strategy",

  titleEn:
    "Strategy & Governance",

  titleAr:
    "الاستراتيجية والحوكمة",

  descriptionEn:
    "How technology priorities, investments and decisions are aligned with business direction.",

  descriptionAr:
    "مدى ارتباط الأولويات والاستثمارات والقرارات التقنية بتوجهات المنشأة.",

  scored:
    true,

  questions: [


    {
      id: "SG01",

      type: "scale",

      en:
        "Technology priorities are clearly aligned with business goals.",

      ar:
        "ترتبط أولويات التقنية بشكل واضح بأهداف المنشأة."
    },


    {
      id: "SG02",

      type: "scale",

      en:
        "Management regularly reviews technology performance, risks and investments.",

      ar:
        "تقوم الإدارة بمراجعة أداء التقنية والمخاطر والاستثمارات التقنية بشكل دوري."
    },


    {
      id: "SG03",

      type: "scale",

      en:
        "Technology projects are prioritized based on business value, risk and need.",

      ar:
        "يتم ترتيب المشاريع التقنية بناءً على قيمة العمل والمخاطر والاحتياج."
    },


    {
      id: "SG04",

      type: "scale",

      en:
        "Technology responsibilities and decision authority are clearly defined.",

      ar:
        "مسؤوليات التقنية وصلاحيات اتخاذ القرار محددة بشكل واضح."
    }

  ]

},



/* =========================================================
   3. BUSINESS APPLICATIONS
========================================================= */

{
  id:
    "applications",

  titleEn:
    "Business Applications & Processes",

  titleAr:
    "الأنظمة والتطبيقات والعمليات",

  descriptionEn:
    "How effectively business systems support operations and business processes.",

  descriptionAr:
    "مدى فعالية الأنظمة في دعم العمليات وإجراءات العمل.",

  scored:
    true,

  questions: [


    {
      id:
        "BA01",

      type:
        "scale",

      en:
        "Core business processes are supported by suitable systems.",

      ar:
        "العمليات الأساسية في المنشأة مدعومة بأنظمة مناسبة."
    },


    {
      id:
        "BA02",

      type:
        "scale",

      en:
        "Key systems exchange information effectively and duplicate data entry is minimized.",

      ar:
        "تتكامل الأنظمة الرئيسية ويتم تقليل إدخال البيانات المكرر."
    },


    {
      id:
        "BA03",

      type:
        "scale",

      en:
        "Business systems are reviewed periodically to ensure they still meet operational needs.",

      ar:
        "تتم مراجعة الأنظمة بشكل دوري للتأكد من استمرار ملاءمتها لاحتياجات العمل."
    }

  ]

},



/* =========================================================
   4. CLOUD & INFRASTRUCTURE
========================================================= */

{
  id:
    "cloud",

  titleEn:
    "Cloud & Infrastructure",

  titleAr:
    "السحابة والبنية التحتية",

  descriptionEn:
    "Availability, hosting, performance, lifecycle and infrastructure management.",

  descriptionAr:
    "التوفر والاستضافة والأداء وإدارة دورة حياة البنية التحتية.",

  scored:
    true,

  questions: [


    {
      id:
        "CI01",

      type:
        "scale",

      en:
        "Our hosting model is intentionally selected based on business, security and cost requirements.",

      ar:
        "تم اختيار نموذج الاستضافة بناءً على احتياجات العمل والأمن والتكلفة."
    },


    {
      id:
        "CI02",

      type:
        "scale",

      en:
        "Infrastructure availability and performance are monitored appropriately.",

      ar:
        "تتم مراقبة توفر وأداء البنية التحتية بشكل مناسب."
    },


    {
      id:
        "CI03",

      type:
        "scale",

      en:
        "Infrastructure lifecycle, capacity and technology obsolescence are reviewed proactively.",

      ar:
        "تتم متابعة دورة حياة البنية التحتية والسعة وتقادم التقنية بشكل استباقي."
    }

  ]

},



/* =========================================================
   5. CYBERSECURITY
========================================================= */

{
  id:
    "cyber",

  titleEn:
    "Cybersecurity & Risk",

  titleAr:
    "الأمن السيبراني والمخاطر",

  descriptionEn:
    "Cybersecurity governance, access, incidents and technology risk management.",

  descriptionAr:
    "حوكمة الأمن السيبراني والصلاحيات والحوادث وإدارة المخاطر التقنية.",

  scored:
    true,

  questions: [


    {
      id:
        "CR01",

      type:
        "scale",

      en:
        "Cybersecurity risks are identified and reviewed regularly.",

      ar:
        "يتم تحديد مخاطر الأمن السيبراني ومراجعتها بشكل منتظم."
    },


    {
      id:
        "CR02",

      type:
        "scale",

      en:
        "User access and privileged accounts are controlled and reviewed.",

      ar:
        "تتم إدارة ومراجعة صلاحيات المستخدمين والحسابات ذات الصلاحيات المرتفعة."
    },


    {
      id:
        "CR03",

      type:
        "scale",

      en:
        "Cybersecurity incidents and alerts are tracked and handled through a defined process.",

      ar:
        "تتم متابعة الحوادث والتنبيهات الأمنية ومعالجتها من خلال آلية محددة."
    },


    {
      id:
        "CR04",

      type:
        "scale",

      en:
        "Employees receive appropriate cybersecurity awareness and guidance.",

      ar:
        "يحصل الموظفون على توعية وإرشادات مناسبة في الأمن السيبراني."
    }

  ]

},



/* =========================================================
   6. DATA / BACKUP / CONTINUITY
========================================================= */

{
  id:
    "data",

  titleEn:
    "Data, Database, Backup & Business Continuity",

  titleAr:
    "البيانات وقواعد البيانات والنسخ الاحتياطي واستمرارية الأعمال",

  descriptionEn:
    "Protection, availability and recoverability of critical business information.",

  descriptionAr:
    "حماية وتوفر وقابلية استعادة البيانات والمعلومات الحرجة.",

  scored:
    true,

  questions: [


    {
      id:
        "DB01",

      type:
        "scale",

      en:
        "Critical business data and databases are clearly identified.",

      ar:
        "البيانات وقواعد البيانات الحرجة في المنشأة محددة بوضوح."
    },


    {
      id:
        "DB02",

      type:
        "scale",

      en:
        "Critical data and databases are backed up according to business requirements.",

      ar:
        "يتم نسخ البيانات وقواعد البيانات الحرجة احتياطيًا وفق متطلبات العمل."
    },


    {
      id:
        "DB03",

      type:
        "scale",

      en:
        "Backup restoration is tested periodically.",

      ar:
        "يتم اختبار استعادة النسخ الاحتياطية بشكل دوري."
    },


    {
      id:
        "DB04",

      type:
        "scale",

      en:
        "Recovery priorities, RTO and RPO are defined for critical services.",

      ar:
        "تم تحديد أولويات الاستعادة وRTO وRPO للخدمات الحرجة."
    }

  ]

},



/* =========================================================
   7. AI
========================================================= */

{
  id:
    "ai",

  titleEn:
    "AI & Automation Readiness",

  titleAr:
    "جاهزية الذكاء الاصطناعي والأتمتة",

  descriptionEn:
    "Business value, governance and organizational readiness for AI and automation.",

  descriptionAr:
    "قيمة الأعمال والحوكمة وجاهزية المنشأة للذكاء الاصطناعي والأتمتة.",

  scored:
    true,

  questions: [


    {
      id:
        "AI01",

      type:
        "scale",

      en:
        "The organization can identify processes suitable for automation or AI.",

      ar:
        "تستطيع المنشأة تحديد العمليات المناسبة للأتمتة أو الذكاء الاصطناعي."
    },


    {
      id:
        "AI02",

      type:
        "scale",

      en:
        "Management understands where AI can create business value and where it may create risk.",

      ar:
        "لدى الإدارة فهم للمجالات التي يضيف فيها الذكاء الاصطناعي قيمة أو مخاطر."
    },


    {
      id:
        "AI03",

      type:
        "scale",

      en:
        "Data and internal controls are sufficiently ready for responsible AI adoption.",

      ar:
        "البيانات والضوابط الداخلية جاهزة بشكل كافٍ لتبني مسؤول للذكاء الاصطناعي."
    },


    {
      id:
        "AI04",

      type:
        "scale",

      en:
        "AI tools are evaluated based on business value, data privacy, security and risk.",

      ar:
        "يتم تقييم أدوات الذكاء الاصطناعي بناءً على قيمة العمل والخصوصية والأمن والمخاطر."
    }

  ]

},



/* =========================================================
   8. VENDOR & FINANCIAL MANAGEMENT
========================================================= */

{
  id:
    "vendors",

  titleEn:
    "Vendor & Financial Management",

  titleAr:
    "إدارة الموردين والجانب المالي",

  descriptionEn:
    "How vendors, technology spending and commercial commitments are managed.",

  descriptionAr:
    "كيفية إدارة الموردين والمصروفات والالتزامات التجارية التقنية.",

  scored:
    true,

  questions: [


    {
      id:
        "VF01",

      type:
        "scale",

      en:
        "Technology vendors are evaluated using clear business and technical criteria.",

      ar:
        "يتم تقييم الموردين التقنيين وفق معايير تجارية وتقنية واضحة."
    },


    {
      id:
        "VF02",

      type:
        "scale",

      en:
        "Technology costs, subscriptions and renewals are tracked proactively.",

      ar:
        "تتم متابعة تكاليف التقنية والاشتراكات والتجديدات بشكل استباقي."
    },


    {
      id:
        "VF03",

      type:
        "scale",

      en:
        "Major technology purchases are compared across multiple options before a decision is made.",

      ar:
        "تتم مقارنة أكثر من خيار قبل اتخاذ قرار في المشتريات التقنية المهمة."
    }

  ]

},



/* =========================================================
   9. PEOPLE & SKILLS
========================================================= */

{
  id:
    "people",

  titleEn:
    "People, Skills & Change",

  titleAr:
    "الأشخاص والمهارات وإدارة التغيير",

  descriptionEn:
    "Technology capabilities, responsibilities and organizational readiness for change.",

  descriptionAr:
    "القدرات التقنية والمسؤوليات وجاهزية المنشأة للتغيير.",

  scored:
    true,

  questions: [


    {
      id:
        "PS01",

      type:
        "scale",

      en:
        "Technology roles and responsibilities are clearly defined.",

      ar:
        "الأدوار والمسؤوليات المتعلقة بالتقنية محددة بوضوح."
    },


    {
      id:
        "PS02",

      type:
        "scale",

      en:
        "The organization has access to the skills required for its technology needs.",

      ar:
        "لدى المنشأة إمكانية الوصول إلى المهارات المناسبة لاحتياجاتها التقنية."
    },


    {
      id:
        "PS03",

      type:
        "scale",

      en:
        "Employees are appropriately prepared when new systems or technologies are introduced.",

      ar:
        "يتم إعداد الموظفين بشكل مناسب عند تطبيق أنظمة أو تقنيات جديدة."
    }

  ]

},



/* =========================================================
   10. REGULATORY READINESS
========================================================= */

{
  id:
    "regulatory",

  titleEn:
    "Regulatory Readiness",

  titleAr:
    "الجاهزية التنظيمية",

  descriptionEn:
    "Technology-related regulatory, privacy and licensing readiness.",

  descriptionAr:
    "الجاهزية للمتطلبات التنظيمية والخصوصية وتراخيص التقنية.",

  scored:
    true,

  questions: [


    {
      id:
        "RR01",

      type:
        "scale",

      en:
        "Software and operating systems are properly licensed.",

      ar:
        "البرمجيات وأنظمة التشغيل المستخدمة مرخصة بشكل نظامي."
    },


    {
      id:
        "RR02",

      type:
        "scale",

      en:
        "Relevant regulatory and compliance technology requirements are identified and tracked.",

      ar:
        "يتم تحديد ومتابعة المتطلبات التنظيمية المتعلقة بالتقنية."
    },


    {
      id:
        "RR03",

      type:
        "scale",

      en:
        "Personal data is handled according to defined privacy and protection requirements.",

      ar:
        "تتم معالجة البيانات الشخصية وفق متطلبات واضحة للخصوصية وحماية البيانات."
    },


    {
      id:
        "RR04",

      type:
        "scale",

      en:
        "Evidence of technology compliance can be produced when requested by management, auditors or regulators.",

      ar:
        "يمكن توفير أدلة الالتزام التقني عند طلبها من الإدارة أو المدققين أو الجهات التنظيمية."
    }

  ]

}

];
