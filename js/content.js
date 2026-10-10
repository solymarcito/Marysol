// Text in [brackets] shows up highlighted on the page until it's replaced.

const ABOUT_TEXT = `hi! i'm marysol alape toro ✿

electrical & computer engineering + engineering & public policy at carnegie mellon, class of '28.

first-gen, from cali, colombia. two summers at amazon on the kindle team. founder of shpetinas.

this is my desktop. click around, everything opens.`;

const CONTACT_TEXT = `hi! i'd love to chat about
internships, shpe, or anything.

see you soon,
marysol ✿`;

const CONTACT = {
  email: "[your email]",
  linkedin: "[linkedin url]",
  github: "github.com/solymarcito",
};

const FOLDERS = {
  work: {
    subtitle: "where i've been building",
    items: [
      {
        icon: "✦",
        title: "software engineering intern · amazon",
        year: "summer 2026",
        text: "kindle e-reader team. my second summer at amazon. [one line about what you built]",
      },
      {
        icon: "☆",
        title: "how it started",
        text: "amazon future engineer scholarship → swe intern → invited back.",
      },
      {
        icon: "◆",
        title: "insights program · jane street",
        year: "winter 2026",
        text: "alum. [what you took away from it]",
      },
    ],
  },
  shpetinas: {
    subtitle: "community, but make it ours",
    items: [
      { icon: "♥", title: "founder · shpetinas", text: "[what shpetinas is, in one sentence]" },
      {
        icon: "✿",
        title: "vice president · shpe @ cmu",
        text: "society of hispanic professional engineers. [a win you're proud of]",
      },
      { icon: "★", title: "jennifer hightower rising star award", year: "2026", text: "carnegie mellon university." },
    ],
  },
  cmu: {
    subtitle: "carnegie mellon university · class of 2028",
    items: [
      {
        icon: "✎",
        title: "b.s. electrical & computer engineering",
        year: "'28",
        text: "with an additional major in engineering & public policy.",
      },
      { icon: "☺", title: "career peer mentor · cpdc", text: "helping other students figure out the recruiting maze." },
      { icon: "✧", title: "forté campus ambassador", text: "[one line about it]" },
    ],
  },
  cali: {
    subtitle: "cali, colombia → pittsburgh",
    items: [
      { icon: "☀", title: "home", text: "[a photo of home + why it matters to you]" },
      { icon: "♡", title: "first-gen college student", text: "[your story, in your own words]" },
    ],
  },
  goals: {
    subtitle: "manifesting, but with a plan",
    stickies: ["graduate class of '28 ✓ in progress", "[goal #2]", "[goal #3]"],
  },
};

const RESUME = {
  name: "Marysol Alape Toro",
  subtitle: "ECE + Engineering & Public Policy · Carnegie Mellon · '28 · [email]",
  sections: [
    {
      heading: "experience",
      items: [
        "Software Engineering Intern, Amazon (Kindle) · 2026",
        "[earlier amazon internship]",
        "INSIGHTS, Jane Street · Winter 2026",
      ],
    },
    {
      heading: "leadership",
      items: ["Vice President, SHPE @ CMU", "Founder, SHPEtinas", "Career Peer Mentor, CPDC", "Forté Campus Ambassador"],
    },
    {
      heading: "honors",
      items: ["Jennifer Hightower Rising Star Award · 2026", "Amazon Future Engineer Scholar"],
    },
  ],
  link: "[link to your real resume pdf here]",
};

const INTRO_MESSAGES = [
  { from: "bestie", text: "you are SO late" },
  { from: "me", text: "i got distracted looking @ marysol's website.." },
  { from: "bestie", text: "AGAIN??!?" },
];
