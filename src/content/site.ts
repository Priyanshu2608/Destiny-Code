/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — the single source of truth for all copy.
 * ─────────────────────────────────────────────────────────────
 *  Anything in [SQUARE BRACKETS] is a placeholder that the client
 *  still needs to supply. Components never contain copy of their
 *  own — edit this file to change what the website says.
 */

/* ── Types ─────────────────────────────────────────────────── */

export type Discipline = "numerology" | "astrology" | "combo";

export type Service = {
  /** Used in URLs: /services#slug and /booking?service=slug */
  slug: string;
  discipline: Discipline;
  name: string;
  /** One line, shown on the home page overview */
  tagline: string;
  description: string;
  price: string;
  duration: string;
  format: string[];
  included: string[];
  whoFor: string;
  /** Compatibility readings collect birth details for two people */
  compatibility?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  service: string;
};

export type FAQ = { question: string; answer: string };

/* ── Business details ──────────────────────────────────────── */

export const site = {
  businessName: "[BUSINESS NAME]",
  tagline: "[TAGLINE]",
  consultantName: "[CLIENT NAME]",
  /** Used for page titles and search engines */
  seoDescription:
    "Personal numerology and astrology readings online with [CLIENT NAME]. Guidance for self-reflection on relationships, career, timing and the year ahead.",
  /** [YOUR DOMAIN]: replace once the custom domain is connected */
  url: "https://example.com",
  email: "[EMAIL]",
  phoneDisplay: "[PHONE NUMBER]",
  /** Country code + number, digits only, e.g. 919876543210 */
  whatsappNumber: "[NUMBER]",
  whatsappMessage: "Hi! I'd like to know more about booking a reading.",
  instagramHandle: "@[INSTAGRAM HANDLE]",
  instagramUrl: "https://instagram.com/[INSTAGRAM HANDLE]",
  location: "[CITY, COUNTRY] · Sessions held online worldwide",
  responseTime: "[24–48 hours]",
  copyrightYear: 2026,
};

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

/* ── Astrology terminology ─────────────────────────────────────
 * Not yet confirmed whether the client practises Vedic or
 * Western astrology. Change these to adjust wording site-wide.
 * Vedic example:   chart: "Kundli", matching: "Kundli matching (Guna Milan)"
 * Western example: chart: "natal chart", matching: "synastry"
 */
export const astro = {
  tradition: "[VEDIC / WESTERN]",
  chart: "birth chart",
  chartTitle: "Birth Chart (Natal / Kundli)",
  matching: "chart matching",
  transits: "planetary transits",
  periods: "current planetary periods",
};

/* ── Navigation ────────────────────────────────────────────── */

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
];

export const ctas = {
  primary: "Book a Reading",
  short: "Book Now",
  explore: "Explore Services",
  whatsapp: "Chat on WhatsApp",
  instagram: "Follow on Instagram",
};

/* ── Disciplines ───────────────────────────────────────────── */

export const disciplines: Record<
  Discipline,
  { label: string; title: string; intro: string; numeral: string }
> = {
  numerology: {
    label: "Numerology",
    title: "Numerology",
    numeral: "I",
    intro:
      "The numbers in your birth date and name, read as a map of your strengths, patterns and personal cycles.",
  },
  astrology: {
    label: "Astrology",
    title: "Astrology",
    numeral: "II",
    intro: `Your ${astro.chart}, the sky at the moment you were born, read for character, relationships and timing.`,
  },
  combo: {
    label: "Combined",
    title: "Numerology + Astrology",
    numeral: "III",
    intro: "Both disciplines read side by side, for the fullest picture.",
  },
};

/* ── Services ──────────────────────────────────────────────── */

export const services: Service[] = [
  // Numerology
  {
    slug: "personal-numerology",
    discipline: "numerology",
    name: "Personal Numerology Reading",
    tagline: "Your core numbers and what they reveal about you.",
    description:
      "A complete reading of your Life Path, Destiny, Soul Urge and Personality numbers, and how they work together in your life right now.",
    price: "[PRICE]",
    duration: "[60 min]",
    format: ["Video call", "Audio call"],
    included: [
      "Core numbers calculated from your birth date and full birth name",
      "Your natural strengths, challenges and recurring patterns",
      "Your current personal year and what it asks of you",
      "Written summary notes after the session",
    ],
    whoFor:
      "Anyone wanting a clearer sense of who they are and what drives them.",
  },
  {
    slug: "numerology-compatibility",
    discipline: "numerology",
    name: "Relationship Compatibility",
    tagline: "How two sets of numbers meet, support and challenge each other.",
    description:
      "A side-by-side reading of both partners' core numbers, looking at how you communicate, where you complement each other and where friction tends to arise.",
    price: "[PRICE]",
    duration: "[75 min]",
    format: ["Video call", "Audio call"],
    included: [
      "Core numbers for both people",
      "Areas of natural harmony and likely friction",
      "Communication and emotional-needs comparison",
      "Practical reflections for growing together",
    ],
    whoFor:
      "Couples, partners considering marriage, or anyone reflecting on a close relationship.",
    compatibility: true,
  },
  {
    slug: "career-numerology",
    discipline: "numerology",
    name: "Career & Business Numerology",
    tagline: "Work that fits your numbers, and timing for your next move.",
    description:
      "Looks at your numbers through the lens of work: the environments you thrive in, your natural working style and the cycles that suit change or consolidation.",
    price: "[PRICE]",
    duration: "[60 min]",
    format: ["Video call", "Audio call"],
    included: [
      "Career-relevant strengths from your core numbers",
      "Working style and ideal environments",
      "Favourable cycles for change, launches or growth",
      "Optional review of a business name or launch date",
    ],
    whoFor:
      "Professionals at a crossroads, founders, and anyone planning a career change.",
  },
  {
    slug: "name-numerology",
    discipline: "numerology",
    name: "Name Numerology",
    tagline: "Personal and business names, analysed and refined.",
    description:
      "An analysis of the vibration of a personal or business name, with suggestions for spelling adjustments or alternatives where helpful.",
    price: "[PRICE]",
    duration: "[45 min] + written report",
    format: ["Video call", "Written report"],
    included: [
      "Numerological analysis of the current name",
      "How the name aligns with the birth date (or the founding date for businesses)",
      "Up to [3] alternative spellings or names evaluated",
      "Written report with recommendations",
    ],
    whoFor:
      "New parents, people considering a name change, and businesses choosing or reviewing a brand name.",
  },
  {
    slug: "personal-year-forecast",
    discipline: "numerology",
    name: "Personal Year Forecast",
    tagline: "The themes of your year ahead, month by month.",
    description:
      "A forward-looking reading of your personal year cycle, highlighting the themes, opportunities and quieter periods ahead.",
    price: "[PRICE]",
    duration: "[45 min]",
    format: ["Video call", "Audio call", "Written report"],
    included: [
      "Your personal year number and its central theme",
      "Month-by-month overview of the year",
      "Periods suited to action, rest and reflection",
      "A one-page planning summary",
    ],
    whoFor:
      "Anyone who likes to plan their year with intention, ideal around birthdays or New Year.",
  },

  // Astrology
  {
    slug: "birth-chart-reading",
    discipline: "astrology",
    name: astro.chartTitle + " Reading",
    tagline: "The full story of your chart, read in depth.",
    description: `An in-depth reading of your ${astro.chart}, covering your core nature, emotional world, relationships, work and the life themes your chart emphasises.`,
    price: "[PRICE]",
    duration: "[90 min]",
    format: ["Video call", "Audio call"],
    included: [
      `Full ${astro.chart} prepared from your exact birth details`,
      "Personality, emotional needs and core motivations",
      "Key life areas: relationships, career, home and growth",
      `Overview of ${astro.periods}`,
      "Session recording on request and summary notes",
    ],
    whoFor: "Anyone wanting a deep, foundational understanding of themselves.",
  },
  {
    slug: "astrology-compatibility",
    discipline: "astrology",
    name: "Relationship & Marriage Compatibility",
    tagline: `${capitalise(astro.matching)} for couples and families.`,
    description: `A ${astro.matching} reading comparing both charts, looking at emotional compatibility, shared values and how each person's timing interacts.`,
    price: "[PRICE]",
    duration: "[90 min]",
    format: ["Video call", "Audio call", "Written report"],
    included: [
      `Both ${astro.chart}s prepared and compared`,
      "Emotional, intellectual and practical compatibility",
      "Strengths of the match and areas needing care",
      "Guidance on favourable periods for commitments",
    ],
    whoFor:
      "Couples, families exploring a marriage match, and partners wanting deeper understanding.",
    compatibility: true,
  },
  {
    slug: "career-finance-astrology",
    discipline: "astrology",
    name: "Career & Finance Astrology",
    tagline: "Vocation, money patterns and timing for decisions.",
    description: `Focuses on the career and wealth indicators in your ${astro.chart}, and how current ${astro.transits} affect work and financial decisions.`,
    price: "[PRICE]",
    duration: "[60 min]",
    format: ["Video call", "Audio call"],
    included: [
      "Vocational strengths and suitable fields",
      "Patterns around money, risk and stability",
      `Current and upcoming ${astro.transits} for work`,
      "Timing considerations for job changes or ventures",
    ],
    whoFor:
      "Professionals, business owners and anyone facing a work or money decision.",
  },
  {
    slug: "yearly-transit-forecast",
    discipline: "astrology",
    name: "Yearly Forecast / Transit Reading",
    tagline: "What the next twelve months are likely to emphasise.",
    description: `A 12-month look ahead based on ${astro.transits} and ${astro.periods}, so you can plan with awareness rather than guesswork.`,
    price: "[PRICE]",
    duration: "[60 min]",
    format: ["Video call", "Audio call", "Written report"],
    included: [
      `Major ${astro.transits} for the year ahead`,
      "Life areas that will be most active",
      "Supportive and challenging windows by month",
      "Written timeline summary",
    ],
    whoFor:
      "Anyone wanting to plan the year ahead, especially around birthdays.",
  },
  {
    slug: "specific-question",
    discipline: "astrology",
    name: "Specific Question Reading",
    tagline: "One focused question, answered in depth.",
    description:
      "A concise, focused reading on a single question you're weighing up, such as a move, a decision or a relationship, examined through your chart.",
    price: "[PRICE]",
    duration: "[30 min]",
    format: ["Video call", "Audio call", "Written report"],
    included: [
      "One clearly defined question, agreed before the session",
      "Focused chart analysis for that question",
      "Clear, practical reflections to help you decide",
    ],
    whoFor:
      "Anyone facing a specific decision who wants focused guidance rather than a full reading.",
  },

  // Combined
  {
    slug: "numerology-astrology-combo",
    discipline: "combo",
    name: "Numerology + Astrology Combo Reading",
    tagline: "Both disciplines, one complete and cohesive reading.",
    description: `Our most comprehensive session. Your core numbers and your ${astro.chart} are read together, with each discipline confirming and deepening the other.`,
    price: "[PRICE]",
    duration: "[120 min] + written report",
    format: ["Video call", "Written report"],
    included: [
      "Full personal numerology profile",
      `Complete ${astro.chart} reading`,
      "Where both systems agree, and what that emphasises",
      "Year-ahead outlook combining personal year and transits",
      "Detailed written report and session recording on request",
      "[1] follow-up question by email within [14] days",
    ],
    whoFor:
      "Those wanting the fullest possible picture, ideal at major life transitions.",
  },
];

export const servicesBy = (d: Discipline) =>
  services.filter((s) => s.discipline === d);

export const getService = (slug?: string | null) =>
  services.find((s) => s.slug === slug);

/* ── Home page ─────────────────────────────────────────────── */

export const home = {
  hero: {
    eyebrow: "Numerology · Astrology · Online Readings",
    title: ["Your numbers.", "Your stars.", "Your next step, clearer."],
    intro: `Thoughtful, personal readings with ${site.consultantName}: guidance for self-reflection on who you are, the relationships you're in and the timing of what comes next.`,
    secondaryCta: "Explore Services",
    trust: ["Sessions held online", "Personal, one-to-one", "Notes after every reading"],
  },
  help: {
    eyebrow: "Where readings help",
    title: "How Numerology & Astrology Can Help",
    intro:
      "Not predictions to wait on, but a lens for understanding yourself and choosing with more confidence.",
    items: [
      {
        icon: "self",
        title: "Self-understanding",
        text: "See your natural strengths, recurring patterns and inner motivations more clearly.",
      },
      {
        icon: "relationships",
        title: "Relationships",
        text: "Understand how you and the people close to you connect, communicate and grow.",
      },
      {
        icon: "career",
        title: "Career decisions",
        text: "Reflect on work that suits your nature and the timing of changes or new ventures.",
      },
      {
        icon: "timing",
        title: "Timing & life cycles",
        text: "Recognise the cycles you're moving through, and when to act or pause.",
      },
      {
        icon: "names",
        title: "Names & business names",
        text: "Choose or refine a personal or brand name with its numerology in mind.",
      },
      {
        icon: "yearly",
        title: "Yearly planning",
        text: "Start each year knowing its themes, so you can plan with intention.",
      },
    ],
  },
  services: {
    eyebrow: "Readings",
    title: "Two disciplines, one purpose",
    intro:
      "Choose a focused reading from either discipline, or combine both for the complete picture.",
    fromLabel: "from",
  },
  testimonials: {
    eyebrow: "Kind words",
    title: "What clients say",
  },
  instagram: {
    eyebrow: "Daily guidance",
    title: "Numbers & stars, every week",
    text: "Follow along for personal-year insights, transit notes and reflections, plus first notice of new booking slots.",
  },
};

/* ── Testimonials (PLACEHOLDERS — replace with real, consented reviews) ── */

export const testimonials: Testimonial[] = [
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] A real client review about their personal numerology reading will go here, roughly two to three sentences long.",
    name: "[CLIENT NAME]",
    detail: "[CITY]",
    service: "Personal Numerology Reading",
  },
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] A real client review about their birth chart reading will go here, describing what they found most helpful.",
    name: "[CLIENT NAME]",
    detail: "[CITY]",
    service: "Birth Chart Reading",
  },
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] A real review from a couple who booked a compatibility reading will go here.",
    name: "[CLIENT NAMES]",
    detail: "[CITY]",
    service: "Relationship Compatibility",
  },
  {
    quote:
      "[PLACEHOLDER TESTIMONIAL] A real review from a business owner about their name numerology report will go here.",
    name: "[CLIENT NAME]",
    detail: "[BUSINESS / CITY]",
    service: "Name Numerology",
  },
];

export const testimonialNote =
  "Placeholder testimonials, to be replaced with real client reviews (with permission).";

/* ── About page ────────────────────────────────────────────── */

export const about = {
  eyebrow: "About",
  title: `Hello, I'm ${site.consultantName}`,
  intro:
    "[ONE-LINE INTRODUCTION, e.g. Numerologist and astrologer helping people understand themselves and their timing.]",
  photoAlt: `Portrait of ${site.consultantName}`,
  story: {
    title: "My story",
    paragraphs: [
      "[YOUR STORY, PARAGRAPH 1: how you first encountered numerology and astrology, and what drew you in.]",
      "[YOUR STORY, PARAGRAPH 2: how your study and practice developed over the years.]",
      "[YOUR STORY, PARAGRAPH 3: why you began offering readings to others, and who you love working with.]",
    ],
  },
  approach: {
    title: "My approach",
    intro:
      "I see numerology and astrology as tools for reflection, not fixed fate. A good reading should leave you feeling clearer and more capable, never more anxious.",
    points: [
      {
        title: "Grounded",
        text: "Practical, plain-language guidance you can actually use, without jargon or fear.",
      },
      {
        title: "Personal",
        text: "Every reading is prepared from your own details. Nothing is generic or automated.",
      },
      {
        title: "Empowering",
        text: "You stay in charge of your choices. The reading offers perspective, not instructions.",
      },
      {
        title: "Confidential",
        text: "Your details and conversations stay private, always.",
      },
    ],
  },
  qualifications: {
    title: "Training & qualifications",
    groups: [
      {
        discipline: "Numerology",
        items: [
          { title: "[QUALIFICATION / COURSE NAME]", meta: "[INSTITUTION] · [YEAR]" },
          { title: "[QUALIFICATION / COURSE NAME]", meta: "[INSTITUTION] · [YEAR]" },
          { title: "[YEARS] years of practice", meta: "[NUMBER]+ readings given" },
        ],
      },
      {
        discipline: "Astrology",
        items: [
          { title: "[QUALIFICATION / COURSE NAME]", meta: "[INSTITUTION] · [YEAR]" },
          { title: "[QUALIFICATION / COURSE NAME]", meta: "[INSTITUTION] · [YEAR]" },
          { title: `Tradition: ${astro.tradition} astrology`, meta: "[TEACHER / LINEAGE, if any]" },
        ],
      },
    ],
  },
  process: {
    eyebrow: "The process",
    title: "What to expect from a reading",
    steps: [
      {
        title: "Book",
        text: "Choose a reading and request a time that suits you through the booking form.",
      },
      {
        title: "Share details",
        text: "Send your birth details (and your partner's, for compatibility). I prepare everything before we meet.",
      },
      {
        title: "Session",
        text: "We meet on a video or audio call. Bring your questions; there's always time for them.",
      },
      {
        title: "Follow-up notes",
        text: `You receive written summary notes within ${site.responseTime} to revisit whenever you need.`,
      },
    ],
  },
  cta: {
    title: "Ready when you are",
    text: "Find the reading that fits your question, or get in touch if you're not sure where to start.",
  },
};

/* ── Services page ─────────────────────────────────────────── */

export const servicesPage = {
  eyebrow: "Services",
  title: "Readings & prices",
  intro:
    "Every reading is personal and prepared in advance from your details. All sessions are held online, wherever you are.",
  labels: {
    price: "Price",
    duration: "Duration",
    format: "Format",
    included: "What's included",
    whoFor: "Who it's for",
  },
};

/* ── Booking page ──────────────────────────────────────────── */

export const booking = {
  eyebrow: "Booking & contact",
  title: "Book your reading",
  intro: `Fill in the form below and I'll confirm your session within ${site.responseTime}. Payment details are shared with your confirmation.`,
  modes: [
    { value: "video", label: "Video call" },
    { value: "audio", label: "Audio call" },
    { value: "whatsapp", label: "WhatsApp call" },
  ],
  form: {
    sections: {
      you: "Your details",
      reading: "Your reading",
      birth: "Birth details",
      partner: "Partner's birth details",
      schedule: "Preferred time",
      notes: "Anything else",
    },
    fullName: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    phoneHint: "Include your country code, e.g. +91",
    service: "Reading",
    servicePlaceholder: "Select a reading",
    birthName: "Full name at birth",
    birthNameHint: "Exactly as on your birth certificate. Numerology uses every letter.",
    dob: "Date of birth",
    tob: "Exact time of birth",
    tobUnknown: "I don't know my exact birth time",
    tobUnknownNote:
      "That's okay. I can still prepare a reading, with some limitations. We'll discuss it when I confirm.",
    pob: "Place of birth",
    pobPlaceholder: "City, State, Country",
    partnerName: "Partner's full name",
    partnerBirthName: "Partner's full name at birth",
    date: "Preferred date",
    time: "Preferred time",
    timeHint: "Times are in [TIME ZONE, e.g. IST]. I'll confirm the exact slot.",
    mode: "Preferred mode",
    message: "Your questions or message",
    messageOptional: "optional",
    messagePlaceholder: "Is there a particular question or area you'd like to focus on?",
    consent: "I understand that readings are for guidance and self-reflection only, and I have read the",
    consentLink: "disclaimer",
    noService: "Choose a reading above and the form will ask only for the birth details it needs.",
    partnerIntro: "Compatibility readings need the same details for the second person.",
    submit: "Request booking",
    submitting: "Sending…",
    required: "Required",
  },
  errors: {
    fullName: "Please enter your full name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number, including country code.",
    service: "Please choose a reading.",
    birthName: "Please enter the full name at birth.",
    dob: "Please enter a valid date of birth.",
    tob: "Please enter the time of birth, or tick the box if it's unknown.",
    pob: "Please enter the place of birth.",
    partnerName: "Please enter your partner's name.",
    date: "Please choose a date from today onwards.",
    time: "Please choose a preferred time.",
    consent: "Please confirm you've read the disclaimer.",
    summary: "Please check the highlighted fields.",
  },
  success: {
    title: "Thank you, your request is in",
    text: `I've received your booking request and will be in touch within ${site.responseTime} by email or WhatsApp to confirm your time and share payment details.`,
    again: "Make another booking",
    summaryTitle: "Your request",
    labels: { service: "Reading", when: "Preferred time", mode: "Mode" },
  },
  consultation: {
    title: "Online consultations",
    items: [
      { label: "Platform", text: "Zoom, Google Meet or WhatsApp, whichever you prefer." },
      { label: "Your link", text: "Sent by email and WhatsApp once payment is confirmed, plus a reminder [1 hour] before." },
      { label: "Prepare", text: "A quiet space, good connection, and your questions written down. Headphones help." },
    ],
  },
  payment: {
    title: "Payment",
    methods: ["[UPI]", "[Credit / Debit card]", "[Bank transfer]"],
    text: "[PAYMENT TERMS, e.g. Full payment is due within 24 hours of confirmation to secure your slot.]",
  },
  contact: {
    title: "Prefer to talk first?",
    text: "Message me on WhatsApp or email with any questions before booking.",
  },
  faqTitle: "Frequently asked questions",
  policy: {
    title: "Rescheduling & cancellation",
    items: [
      "[RESCHEDULING POLICY, e.g. Sessions can be rescheduled once, free of charge, with at least 24 hours' notice.]",
      "[CANCELLATION POLICY, e.g. Cancellations made more than 48 hours before the session receive a full refund.]",
      "[LATE / NO-SHOW POLICY, e.g. Sessions missed without notice cannot be refunded.]",
      "[WRITTEN REPORTS, e.g. Once preparation of a written report has begun, it is non-refundable.]",
    ],
  },
};

export const faqs: FAQ[] = [
  {
    question: "How accurate are numerology and astrology readings?",
    answer:
      "Readings offer perspective and patterns for self-reflection. They aren't guarantees or predictions of fixed outcomes. Most clients find them most valuable as a way to understand themselves and think through decisions more clearly.",
  },
  {
    question: "What details do I need to provide?",
    answer:
      "For numerology: your full name at birth and date of birth. For astrology: your date, exact time and place of birth. For compatibility readings, the same details for both people.",
  },
  {
    question: "What if I don't know my exact time of birth?",
    answer:
      "A numerology reading doesn't need it at all. For astrology, much can still be read without an exact time, though some parts of the chart become less precise. Tick the box on the form and we'll talk through the options.",
  },
  {
    question: "How long is a session?",
    answer:
      "Between [30 and 120] minutes depending on the reading. The duration is listed with each service on the Services page.",
  },
  {
    question: "Can I record the session?",
    answer:
      "[RECORDING POLICY, e.g. Yes. Sessions can be recorded on request and the recording is shared with you privately after the call.]",
  },
  {
    question: "What is your refund policy?",
    answer:
      "[REFUND POLICY SUMMARY]. Please see the rescheduling and cancellation policy below for full details.",
  },
  {
    question: "Is my personal information kept private?",
    answer:
      "Yes. Your birth details and anything you share are used only to prepare your reading. They are never shared or sold. [DATA RETENTION, e.g. Details are deleted after 12 months unless you ask me to keep them.]",
  },
  {
    question: "Do you offer readings in other languages?",
    answer: "[LANGUAGES OFFERED, e.g. Readings are available in English and Hindi.]",
  },
];

/* ── Disclaimer ────────────────────────────────────────────── */

export const disclaimer = {
  short:
    "Readings are offered for guidance and self-reflection only and are not a substitute for medical, legal, financial or psychological advice.",
  title: "Disclaimer",
  updated: "Last updated: [DATE]",
  pendingTag: "Final wording pending",
  paragraphs: [
    `The numerology and astrology readings offered by ${site.businessName} are intended for guidance, self-reflection and personal insight only.`,
    "Readings do not predict guaranteed outcomes and should not be relied on as the sole basis for important decisions. You remain fully responsible for the choices you make.",
    "Readings are not a substitute for professional medical, legal, financial or psychological advice. If you are dealing with a health, legal, financial or mental-health concern, please consult a qualified professional.",
    "If you are in crisis or feel unsafe, please contact your local emergency services or a crisis helpline immediately.",
    "By booking a reading, you confirm that you are at least 18 years old (or have the consent of a parent or guardian) and that you understand the nature of the service.",
    "[ANY ADDITIONAL LEGAL TEXT REQUIRED BY THE CLIENT]",
  ],
};

/* ── Footer & 404 ──────────────────────────────────────────── */

export const footer = {
  blurb:
    "Personal numerology and astrology readings, offered online with care, clarity and confidentiality.",
  navTitle: "Explore",
  contactTitle: "Contact",
  socialTitle: "Follow",
  legal: [{ label: "Disclaimer", href: "/disclaimer" }],
};

export const notFound = {
  metaTitle: "Page not found",
  title: "This path isn't in the stars",
  text: "The page you were looking for doesn't exist or has moved.",
  cta: "Back to home",
};

/* ── Helpers ───────────────────────────────────────────────── */

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Small interface labels ────────────────────────────────── */

export const ui = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  homeLabel: "home",
  disclaimerLead: "Please note:",
  disclaimerLink: "Read the full disclaimer",
  rights: "All rights reserved.",
  viewDetails: "Details",
  bookThis: "Book this reading",
  mostComplete: "Most complete",
  prevTestimonial: "Previous testimonial",
  nextTestimonial: "Next testimonial",
  goToTestimonial: "Show testimonial",
  instagramPost: "Instagram post placeholder",
  photoPlaceholder: "Photo",
  logoPlaceholder: "Logo",
  jumpTo: "Jump to",
  serviceCategories: "Service categories",
};
