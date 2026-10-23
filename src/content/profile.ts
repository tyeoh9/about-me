// Everything the About Me page says lives here. Components only render it.

/** A run of text, optionally linked. A link with no `href` renders as plain text. */
export type Span = string | { text: string; href?: string };

/** A paragraph is a list of spans rendered in order. */
export type Paragraph = Span[];

export type FigureKind = "apple-cache" | "zoofi-onboarding" | "clearo-thread" | "validate-llm";

export type Chapter = {
  id: string;
  title: string;
  body: Paragraph[];
  meta: string;
  figure: FigureKind;
  caption: string;
};

export type Logo = {
  name: string;
  src: string;
  /** Rendered height in px; width follows from the aspect ratio. */
  height: number;
  /** Source SVG width / height. */
  aspect: number;
};

export type AlongTheWayRow = {
  name: string;
  body: Paragraph;
};

export const links = {
  apple: "https://www.apple.com",
  clearo: "https://clearoapp.com/",
  validateLlm: "https://tyeoh9.github.io/llm-validation-framework/",
  inky: "https://inky-254095790852.us-central1.run.app/",
  repometrics: "https://github.com/tyeoh9/repometrics",
  email: "mailto:tyeoh@berkeley.edu",
  github: "https://github.com/tyeoh9",
  linkedin: "https://www.linkedin.com/in/yeoh",
  resume: "https://tyeoh9.github.io/tyeoh/Resume.pdf",
} as const;

export const profile = {
  name: "Thomas Yeoh",
  role: "Software engineer",
  description:
    "Thomas Yeoh is a software engineer who builds agents that do real work, and the systems that keep them standing up in production.",
  statement:
    "I build agents that do real work, and the systems that keep them standing up in production. Usually it starts as a small experiment to see if the idea holds. Then I ship it and keep going.",
} as const;

/** "/about-me" in the GitHub Pages build, "" otherwise (see next.config.ts). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const logos: Logo[] = [
  { name: "Apple", src: `${basePath}/logos/apple.svg`, height: 31, aspect: 1 },
  { name: "UC Berkeley", src: `${basePath}/logos/uc-berkeley.svg`, height: 30, aspect: 215.125 / 67.592 },
  { name: "UC Irvine", src: `${basePath}/logos/uc-irvine.svg`, height: 20, aspect: 254.2325 / 108.87875 },
];

export const chapters: Chapter[] = [
  {
    id: "apple-maps",
    title: "Faster ads in Apple Maps",
    body: [
      [
        "At ",
        { text: "Apple", href: links.apple },
        " I worked on how ads reach Apple Maps Search. Before touching anything, I simulated real traffic to see where requests were going. That pointed to a cache.",
      ],
      [
        "The Redis cache I designed answers 95% of requests and saves 36 million API calls a day. Together with a high-throughput Java service on Kubernetes, ads now arrive 37.5% faster.",
      ],
    ],
    meta: "Apple, 2026",
    figure: "apple-cache",
    caption: "Most requests never reach the ad service",
  },
  {
    id: "zoofi",
    title: "Automated client onboarding at Zoofi AI",
    body: [
      [
        "At ",
        // No public URL is known for Zoofi AI, so it renders as plain text.
        { text: "Zoofi AI" },
        ", a fintech startup, I built the backend and the agent infrastructure for the first product. I owned client onboarding: documents come in, agents parse them, and clean fields come out through the APIs the rest of the product runs on.",
      ],
      ["We shipped fast and iterated with our first users. Onboarding took 60% less manual work."],
    ],
    meta: "Zoofi AI, 2025",
    figure: "zoofi-onboarding",
    caption: "An onboarding document, parsed into the fields the product needs",
  },
  {
    id: "clearo",
    title: "Clearo: buying and selling over iMessage",
    body: [
      [
        "Selling a desk shouldn’t take forty messages. With ",
        { text: "Clearo", href: links.clearo },
        ", you text what you want to buy or sell. An agent running in the cloud finds the other side, handles the back and forth and sets up the pickup, then texts you when it’s your turn.",
      ],
      [
        "The whole exchange happens in iMessage. There’s no app to download, and the agent only texts you when there’s a decision to make.",
      ],
    ],
    meta: "Clearo, my own project",
    figure: "clearo-thread",
    caption: "The agent handles the back and forth",
  },
  {
    id: "validate-llm",
    title: "Validate-LLM: catching bad AI answers",
    body: [
      [
        "Agents are only useful if you can trust what they say. ",
        { text: "Validate-LLM", href: links.validateLlm },
        " is a Python package that puts a second model in front of the first one, acting as a judge, so bad answers get caught before a user ever sees them.",
      ],
    ],
    meta: "Validate-LLM, open source",
    figure: "validate-llm",
    caption: "A made-up claim gets stopped before it reaches the user",
  },
];

export const alongTheWay: AlongTheWayRow[] = [
  {
    name: "Inky",
    body: ["An ", { text: "AI writing companion", href: links.inky }, " that thinks alongside you as you write."],
  },
  {
    name: "Repometrics",
    body: ["A ", { text: "command-line tool", href: links.repometrics }, " that checks a repository’s health."],
  },
  {
    name: "Keysight",
    body: ["Shipped an NLP tool that cut human review time by 25%, on a pipeline handling 120,000 records a day."],
  },
  {
    name: "Berkeley research",
    body: ["Made the lab’s model pre-computation 44% faster and ran its analyses on HPC clusters."],
  },
  {
    name: "School",
    body: ["EECS at UC Berkeley. Master’s in Computer Science at UC Irvine, finishing December 2026."],
  },
];

export const sayHello = {
  title: "Say hello",
  pitch:
    "If you’re building something fast and want someone who will own it from the first experiment to production, I’d like to hear about it.",
  contacts: [
    { text: "tyeoh@berkeley.edu", href: links.email },
    ", ",
    { text: "GitHub", href: links.github },
    ", ",
    { text: "LinkedIn", href: links.linkedin },
    " and my ",
    { text: "resume", href: links.resume },
    ".",
  ] satisfies Paragraph,
};
