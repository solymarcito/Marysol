// Text in [brackets] shows up highlighted on the page until it's replaced.

const ABOUT_TEXT = `hiii, i'm marysol ✿

electrical & computer engineering + engineering & public policy (and a physics minor) at carnegie mellon, class of '28+

first-gen, from cali, colombia. two summers as a software engineering intern at amazon, first on prime econ engineering, then on kindle e-reader team. external vp of shpe @ cmu

welcome to my desktop. click around to learn more about me!`;

const CONTACT_TEXT = `hi! i'd love to chat about
internships, shpe, or anything.

see you soon,
solecito ✿`;

const CONTACT = {
  email: "marysol.mat1@gmail.com",
  linkedin: "https://www.linkedin.com/in/marysolalape/",
  github: "github.com/solymarcito",
};

const FOLDERS = {
  work: {
    subtitle: "where i've been building",
    items: [
      {
        icon: "✧",
        title: "software development engineer intern · amazon prime",
        year: "summer 2025",
        text: "automated a 3-year prime forecast platform, cutting data retrieval from 150+ minutes to under 60 seconds.",
      },
      {
        icon: "✦",
        title: "software development engineer intern · amazon kindle",
        year: "summer 2026",
        photos: [{ src: "images/amazon-feature.jpg", alt: "marysol holding a first day of amazon sign" }],
        text: "kindle e-reader team. my second summer at amazon. built native ui for kindle's category browsing with react native and typescript, for millions of readers across 12 marketplaces.",
      },
      {
        icon: "☆",
        title: "how it started",
        text: "amazon future engineer scholarship → swe intern → invited back.",
        photos: [{ src: "images/aws.jpg", alt: "marysol at the aws office" }],
      },
      {
        icon: "◆",
        title: "insights program · jane street",
        year: "january 2026",
        text: "alum. modeled firm-wide hypothetical pnl for a risk team with 3 teammates, then presented it to jane street professionals.",
      },
    ],
  },
  shpetinas: {
    subtitle: "community, my familia",
    items: [
      { icon: "♥", title: "founder · shpetinas", text: "cmu's first women-focused shpe initiative, with outreach, mentorship and professional events." },
      {
        icon: "✿",
        title: "external vice president · shpe @ cmu",
        text: "society of hispanic professional engineers. leading chapter strategy, operations and engagement for 100+ members.",
      },
      { icon: "★", title: "jennifer hightower rising star award", year: "2026", text: "carnegie mellon university." },
    ],
  },
  cmu: {
    subtitle: "carnegie mellon university · class of 2028+",
    items: [
      {
        icon: "✎",
        title: "b.s. electrical & computer engineering",
        year: "'28",
        text: "double major with engineering & public policy, minor in physics.",
      },
      {
        icon: "⚒",
        title: "booth",
        text: "measuring, cutting, building. hard hat on ✿",
        photos: [
          { src: "images/booth-1.jpg", alt: "marysol cutting wood with a miter saw" },
          { src: "images/booth-2.jpg", alt: "marysol and a friend building a wall frame" },
        ],
      },
      { icon: "☺", title: "career peer mentor · cpdc", text: "100+ one-on-one sessions a semester on resumes, linkedin and swe interview prep." },
    ],
  },
  cali: {
    subtitle: "cali, colombia → pittsburgh",
    items: [
      { icon: "☀", title: "home", text: "where it all started ✿", photos: [{ src: "images/baby.jpg", alt: "baby marysol looking at a book" }] },
      { icon: "♡", title: "first-gen college student", text: "i came to the us at 18, scared, and the only one in my family here. i was the first in my high school to go out of state. my counselor and i translated the whole common app with google translate, jaja. i learned english watching series, since i went to a public school that wasn't bilingual. my familia always dreamed of living here but never got to take the step, so i did it for them. against all odds, and pa'lante, so they can come too ✿" },
    ],
  },
  goals: {
    subtitle: "manifesting",
    stickies: ["graduate class of '28+ ✓ in progress", "create a non-profit focused on advancing STEM education", "startup?..", { img: "images/note.jpg", alt: "pink note that says estoy en control, mi futuro es brillante" }],
  },
};

const RESUME = {
  name: "Marysol Alape Toro",
  subtitle: "ECE + Engineering & Public Policy · Carnegie Mellon · '28 · malapeto@andrew.cmu.edu",
  sections: [
    {
      heading: "experience",
      items: [
        "Software Development Engineer Intern, Amazon Kindle · 2026",
        "Software Development Engineer Intern, Amazon Prime · 2025",
        "INSIGHT, Jane Street · January 2026",
      ],
    },
    {
      heading: "leadership",
      items: ["External Vice President, SHPE @ CMU", "Founder, SHPEtinas", "Career Peer Mentor, CPDC"],
    },
  ],
  link: "assets/Marysol_Alape_Toro_Resume.pdf",
};

const INTRO_MESSAGES = [
  { from: "bestie", text: "you are SO late" },
  { from: "me", text: "i got distracted looking @ marysol's website.." },
  { from: "bestie", text: "AGAIN??!?" },
];
