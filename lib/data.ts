export const site = {
  name: "Yash Sawant",
  title: "AI Engineer for inference and infra",
  headline: "Can't let an AI mog me",
  email: "yasawant@asu.edu",
  linkedin: "https://www.linkedin.com/in/yash-ajay-sawant",
  github: "https://github.com/YASHSAWANTTT",
  cal: "https://cal.com/yash-sawant-vyg7it",
  followers: "1.5K+",
  location: "San Francisco, CA",
  bio: [
    "I work on AI infrastructure and the unglamorous parts of inference: latency, scheduling, evals, and agents that fail the moment they reach for a tool. From serving systems to products in production. That gap is the whole job.",
    "When I am not doing that, I run, climb, and race on Gran Turismo.",
    "If that resonates, I'd love to hear more about what you're building.",
  ],
};

export type WorkProject = {
  title: string;
  tags: string[];
  image?: { src: string; alt: string; href?: string };
};

export type MarkId =
  | "sol"
  | "zoom"
  | "svl"
  | "cognition"
  | "nowhere"
  | "hindsight"
  | "tango"
  | "pit"
  | "bartender"
  | "cliff";

export type WorkItem = {
  id: string;
  company: string;
  role: string;
  dates: string;
  where: string;
  icon: MarkId;
  dialogTitle: string;
  summary: string;
  note: string;
  stats: { value: string; label: string }[];
  meta: { role: string; when: string; where: string };
  projects: WorkProject[];
  links: { label: string; href: string }[];
};

export const work: WorkItem[] = [
  {
    id: "sol",
    company: "SOL",
    role: "Founder",
    dates: "2025 to Now",
    where: "Tempe, AZ",
    icon: "sol",
    dialogTitle: "Quizzes that grade themselves, almost",
    summary:
      "I grew SOL, a full stack AI quiz and grading platform, to 216 active learners across 16 sections through word of mouth and cold outreach demos to faculty. I built the product end to end, from RAG grading infrastructure to the Next.js and React frontend, in Python (LangChain). Grading time dropped 60%, automatically scoring 3,200+ quizzes with a human reviewable reasoning trace, and I extended access to external AI agents by shipping an MCP server.",
    note: "Live product used in real courses. Visit the site to see SOL in action.",
    stats: [
      { value: "216", label: "active learners" },
      { value: "16", label: "course sections" },
      { value: "60%", label: "less grading time" },
      { value: "3,200+", label: "quizzes scored" },
    ],
    meta: {
      role: "Founder and Engineer",
      when: "May 2025 to Present",
      where: "Tempe, AZ",
    },
    projects: [
      {
        title: "SOL landing page",
        tags: ["Next.js", "React", "Python", "LangChain", "RAG", "MCP"],
        image: {
          src: "/images/sol-landing.png",
          alt: "SOL landing page: Coursework for everyone at the table",
          href: "https://www.strat-ops.net/learning",
        },
      },
    ],
    links: [
      { label: "Visit website", href: "https://www.strat-ops.net/learning" },
    ],
  },
  {
    id: "cognition",
    company: "Cognition",
    role: "AI Researcher",
    dates: "2025 to Now",
    where: "Tempe, AZ",
    icon: "cognition",
    dialogTitle: "Making medical agents fail in public, on purpose",
    summary:
      "At the Cognition & Intelligence Lab I raised frontier model diagnostic accuracy from 66% to 72% across 310 clinical reasoning cases by designing a multi agent evaluation pipeline: working memory, question planner, critic, and devil's advocate agents, in Python, LangGraph, and REST APIs. I caught recurring agent failures before they reached evaluation by building LLM as judge infrastructure and RAG retrieval (pgvector) over 700K+ records across 1,500+ automated executions used as regression coverage.",
    note: "Ongoing research at CogInt Lab, Arizona State University. Evaluation numbers describe current failure modes, not a deployed clinical product.",
    stats: [
      { value: "66% to 72%", label: "diagnostic accuracy" },
      { value: "310", label: "clinical reasoning cases" },
      { value: "700K+", label: "records in RAG" },
      { value: "1,500+", label: "automated executions" },
    ],
    meta: {
      role: "AI Researcher",
      when: "August 2025 to Present",
      where: "Cognition & Intelligence Lab, Tempe, AZ",
    },
    projects: [
      {
        title: "Medical agent evals",
        tags: [
          "Python",
          "LangGraph",
          "REST APIs",
          "RAG",
          "pgvector",
          "LLM as judge",
        ],
      },
    ],
    links: [{ label: "Visit lab", href: "https://cogintlab-asu.github.io/" }],
  },
  {
    id: "zoom",
    company: "Zoom",
    role: "AI Engineer",
    dates: "2025 to 2026",
    where: "Tempe, AZ",
    icon: "zoom",
    dialogTitle: "Emma, live, under 300 milliseconds",
    summary:
      "As an AI Engineer and Zoom Fellow at Zoom X Next Lab, I delivered a full stack AI agent (Emma) to 100+ live users at sub 300 millisecond latency. I built the RAG backend and the Next.js frontend end to end, then hardened reliability with a context adaptation service validated through structured testing.",
    note: "Shipped inside Zoom X Next Lab. Emma ran in live sessions, not a slide deck.",
    stats: [
      { value: "100+", label: "live users" },
      { value: "sub 300ms", label: "end to end latency" },
    ],
    meta: {
      role: "AI Engineer, Zoom Fellow",
      when: "November 2025 to May 2026",
      where: "Zoom X Next Lab, Tempe, AZ",
    },
    projects: [
      {
        title: "Emma",
        tags: ["Next.js", "RAG", "AI agents", "Structured testing"],
      },
    ],
    links: [
      {
        label: "Visit program",
        href: "https://nextlab-zoom-fellows.vercel.app/",
      },
    ],
  },
  {
    id: "svl",
    company: "SVL",
    role: "Software Engineer",
    dates: "2025 to 2026",
    where: "Tempe, AZ",
    icon: "svl",
    dialogTitle: "Classroom software that has to stay up",
    summary:
      "At the Sonoran Visualization Lab I sustained 100% uptime for 150+ concurrent users on NSF VizCoach, a $300K funded platform. I built backend microservices in Python and Go with Kafka streaming and WebSocket connections on AWS, Docker, and Kubernetes, backed by CI/CD pipelines in GitHub Actions and Terraform.",
    note: "VizCoach is an SVL project under a $300K NSF initiative. This entry is the product engineering work, not the Cognition Lab research.",
    stats: [
      { value: "100%", label: "uptime" },
      { value: "150+", label: "concurrent users" },
      { value: "$300K", label: "NSF funded" },
    ],
    meta: {
      role: "Software Engineer",
      when: "August 2025 to January 2026",
      where: "Sonoran Visualization Lab, Tempe, AZ",
    },
    projects: [
      {
        title: "VizCoach",
        tags: [
          "Python",
          "Go",
          "Kafka",
          "WebSockets",
          "AWS",
          "Docker",
          "Kubernetes",
          "Terraform",
        ],
      },
    ],
    links: [{ label: "Visit lab", href: "https://svl-at-asu.github.io/" }],
  },
  {
    id: "nowhere",
    company: "Nowhere",
    role: "Engineering Intern",
    dates: "2024",
    where: "Chicago, IL",
    icon: "nowhere",
    dialogTitle: "Matching leftover materials to the people who want them",
    summary:
      "As a Software Engineering Intern at Nowhere Collective I supported matching quality for 100+ users and 50+ vendors by developing ranking algorithms, tuning MySQL and MongoDB queries, and maintaining AWS deployments with Docker and CI/CD.",
    note: "A community experiment at the intersection of entrepreneurship, design, and environmental responsibility.",
    stats: [
      { value: "100+", label: "users matched" },
      { value: "50+", label: "vendors on the platform" },
    ],
    meta: {
      role: "Software Engineering Intern",
      when: "January 2024 to December 2024",
      where: "Chicago, IL",
    },
    projects: [
      {
        title: "Trashy Markets",
        tags: ["MySQL", "MongoDB", "AWS", "Docker", "CI/CD"],
      },
    ],
    links: [
      {
        label: "Visit website",
        href: "https://www.nowhere-collective.com/",
      },
    ],
  },
];

export const quests: WorkItem[] = [
  {
    id: "hindsight",
    company: "Hindsight",
    role: "Backtesting engine",
    dates: "",
    where: "Independent",
    icon: "hindsight",
    dialogTitle: "A backtester that is not allowed to cheat",
    summary:
      "I built a vectorized backtester with lookahead bias prevention, slippage and transaction cost modeling, and walkforward validation, then pointed it at momentum and mean reversion strategies on SPY tick data. It computes a full performance suite (Sharpe, Sortino, Calmar, max drawdown) benchmarked against buy and hold. The C++ execution layer processes 1M+ bar events/sec versus the Python baseline.",
    note: "Independent systems work. No live product link. The interesting part is in the numbers.",
    stats: [
      { value: "1M+", label: "bar events/sec in C++" },
      { value: "Walkforward", label: "no peeking allowed" },
    ],
    meta: {
      role: "Quant systems",
      when: "Side quest",
      where: "Independent",
    },
    projects: [
      {
        title: "Vectorized Backtesting Engine",
        tags: ["Python", "C++", "NumPy", "Pandas", "Polygon.io"],
      },
    ],
    links: [],
  },
  {
    id: "tango",
    company: "Tango",
    role: "Pairs trading",
    dates: "",
    where: "Independent",
    icon: "tango",
    dialogTitle: "Two names, one trade, try not to step on toes",
    summary:
      "I identified cointegrated equity pairs via Engle Granger and ADF tests, then built z score entry and exit signals with dynamic hedge ratios and out of sample walkforward validation. Paper trading runs through the Alpaca API. The backtest covers 5 years of data with realistic execution costs. Sharpe and drawdown TBD until I stop moving the goalposts.",
    note: "Paper trading only. Sharpe and max drawdown stay as X until the numbers are honest.",
    stats: [
      { value: "5 years", label: "out of sample backtest" },
      { value: "Paper", label: "live via Alpaca" },
    ],
    meta: {
      role: "Quant research",
      when: "Side quest",
      where: "Independent",
    },
    projects: [
      {
        title: "Statistical Arbitrage Pairs Trading",
        tags: ["Python", "Statsmodels", "Alpaca API", "PostgreSQL"],
      },
    ],
    links: [],
  },
  {
    id: "pit",
    company: "Pit",
    role: "Limit order book",
    dates: "",
    where: "Independent",
    icon: "pit",
    dialogTitle: "Price time priority, no cutting in line",
    summary:
      "I implemented a price time priority limit order book in C++20 with lockfree queues and cache aligned data structures, speaking FIX. Matching is submicrosecond, with 10M+ orders/sec of single core throughput. The whole point is to make the hot path boring: no locks, no surprises, no one jumping the queue.",
    note: "Systems work, not a live exchange. Throughput numbers are single core.",
    stats: [
      { value: "<1μs", label: "match latency" },
      { value: "10M+", label: "orders/sec, one core" },
    ],
    meta: {
      role: "Systems",
      when: "Side quest",
      where: "Independent",
    },
    projects: [
      {
        title: "Low latency limit order book",
        tags: ["C++20", "Lockfree", "FIX protocol"],
      },
    ],
    links: [],
  },
  {
    id: "cliff",
    company: "Cliff",
    role: "Biology, in plain English",
    dates: "",
    where: "Independent",
    icon: "cliff",
    dialogTitle: "Cliff notes, except the syllabus is 19,000 preprints",
    summary:
      "BioXiv is a reader for bioRxiv and medRxiv: plain language AI summaries of the latest preprints, plus search and chat with any paper. No account required. The point is to scan biology faster than a PDF tab farm, then go read the original when it actually matters. Preprints are not peer reviewed; the site says that out loud.",
    note: "Live product. Summaries are generated by Claude from bioRxiv and medRxiv metadata. Always read the original.",
    stats: [
      { value: "19K+", label: "papers in the feed" },
      { value: "No login", label: "browse, search, chat" },
    ],
    meta: {
      role: "Product",
      when: "Side quest",
      where: "Independent",
    },
    projects: [
      {
        title: "BioXiv",
        tags: ["Next.js", "Claude", "bioRxiv", "medRxiv", "Search"],
      },
    ],
    links: [{ label: "Visit website", href: "https://bio-xiv.vercel.app/" }],
  },
  {
    id: "bartender",
    company: "Bartender",
    role: "LLM serving · in progress",
    dates: "",
    where: "Self directed",
    icon: "bartender",
    dialogTitle: "BlendServe, but the tab never closes",
    summary:
      "I'm designing an extension to BlendServe (ASPLOS ’26), an offline LLM inference serving system, by adapting its compute density scheduling formula and node splitting algorithm to retrigger at tool call boundaries. The goal is multiturn agentic workloads that do not fall apart the moment the model reaches for a tool. Targeting evaluation on A100 GPU infrastructure against the published baseline.",
    note: "Self directed systems research. In progress, not a published result yet.",
    stats: [
      { value: "In progress", label: "multiturn scheduling" },
      { value: "A100", label: "eval vs published baseline" },
    ],
    meta: {
      role: "Systems research",
      when: "In progress",
      where: "Self directed",
    },
    projects: [
      {
        title: "BlendServe multiturn scheduling",
        tags: [
          "LLM serving",
          "Scheduling",
          "Agentic workloads",
          "ASPLOS ’26",
        ],
      },
    ],
    links: [],
  },
];

export const approach = [
  {
    n: "01",
    title: "I start with the bottleneck.",
    body: "Before I draw boxes, I find what is actually scarce: tokens per second, KV cache, tail latency, or a tool call that wrecks the schedule. Success is a number we can measure under load, not a diagram that looks complete.",
  },
  {
    n: "02",
    title: "I design the system first.",
    body: "Serving, storage, and failure domains come before the model card. Batching, queues, retries, and backpressure are the product. If those are wrong, no prompt will save it.",
  },
  {
    n: "03",
    title: "I go deep on inference.",
    body: "When something is slow or wrong, I follow it through the stack: scheduler, kernel, network, prompt. I would rather understand one tail spike than wrap another API and call it infrastructure.",
  },
  {
    n: "04",
    title: "I make failure cheap.",
    body: "Notebooks lie. I put serving paths and agents through real concurrency, long contexts, and bad inputs until the failure shows up in traces. Evals, replay, and rollback are how the system stays honest.",
  },
  {
    n: "05",
    title: "I write the tradeoffs down.",
    body: "Why this batch size, why this cache policy, why we did not shard yet. Alignment is a document the next engineer can use at 2am, not a meeting nobody remembers.",
  },
  {
    n: "06",
    title: "I own the last mile.",
    body: "Tools come and go. I use them when they earn their keep. The system design, the infra decisions, and the quality of what ships stay mine.",
  },
];
