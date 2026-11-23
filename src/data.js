// Tracks mirror the six real BitElevate labs shown on cynbit.in/bitelevate (audited Nov 2026).
export const TRACKS = {
  fullstack: { name: "Full Stack SaaS Lab", icon: "🧩", blurb: "Build a complete SaaS product end to end (SprintPulse).", roadmap: ["Modern JavaScript & Git workflow", "Next.js front-end + Node.js APIs", "PostgreSQL, auth & deployments", "Ship a deployed SaaS capstone"] },
  backend: { name: "Python Backend Lab", icon: "🐍", blurb: "Design fast, reliable APIs and services (PulseServe API).", roadmap: ["Python & HTTP fundamentals", "FastAPI, REST & data modelling", "Caching, queues & testing with pytest", "Deploy a production-style API"] },
  ai: { name: "AI & Vector Intelligence Lab", icon: "🤖", blurb: "Build LLM-powered assistants with vector search (SupportPulse AI).", roadmap: ["Python & prompting basics", "Embeddings & vector databases", "RAG pipelines & agents", "Launch an AI support assistant"] },
  frontend: { name: "Frontend Ops Dashboard Lab", icon: "📊", blurb: "Craft fast, data-rich dashboards in Next.js 15.", roadmap: ["HTML/CSS & TypeScript", "React & Next.js 15 patterns", "State, charts & performance", "Ship an ops dashboard"] },
  qa: { name: "QA & Test Automation Lab", icon: "🧪", blurb: "Make software trustworthy with automated E2E testing (ApexCart E2E).", roadmap: ["Testing fundamentals & bug reports", "Playwright / Pytest automation", "CI test pipelines", "Automate an e-commerce test suite"] },
  uiux: { name: "UI/UX & Design Systems Lab", icon: "🎨", blurb: "Design intuitive products and reusable systems (ApexDesign).", roadmap: ["Design principles & user research", "Figma components & tokens", "Prototyping & usability tests", "Publish a design system case study"] },
};

export const QUESTIONS = [
  { q: "What do you enjoy most when working on a project?", options: [
    { t: "Making it work end to end", s: { fullstack: 3, backend: 1 } },
    { t: "Making it look and feel great", s: { uiux: 3, frontend: 2 } },
    { t: "Automating things with smart tools", s: { ai: 3, backend: 1 } },
    { t: "Making sure nothing breaks", s: { qa: 3, backend: 1 } } ] },
  { q: "Which free-time activity sounds best?", options: [
    { t: "Coding a small app", s: { fullstack: 3, frontend: 1 } },
    { t: "Redesigning an app I find annoying", s: { uiux: 3, frontend: 1 } },
    { t: "Experimenting with AI models", s: { ai: 3, backend: 1 } },
    { t: "Building APIs and playing with data", s: { backend: 3 } },
    { t: "Building dashboards and charts", s: { frontend: 3 } },
    { t: "Hunting for bugs in apps", s: { qa: 3 } } ] },
  { q: "How comfortable are you with programming today?", options: [
    { t: "Total beginner", s: { uiux: 2, qa: 2 } },
    { t: "I know the basics", s: { frontend: 2, fullstack: 1, qa: 1 } },
    { t: "I build small projects", s: { fullstack: 2, backend: 2, frontend: 1 } },
    { t: "Strong, I want depth", s: { ai: 2, backend: 2, fullstack: 2 } } ] },
  { q: "Pick the problem you'd rather solve:", options: [
    { t: "Our API is slow under load", s: { backend: 3 } },
    { t: "Users drop off at checkout", s: { uiux: 2, frontend: 2 } },
    { t: "Support is drowning in repetitive questions", s: { ai: 3 } },
    { t: "Every release ships new bugs", s: { qa: 3 } },
    { t: "We need an MVP in 4 weeks", s: { fullstack: 3 } },
    { t: "Our dashboard is confusing and slow", s: { frontend: 3 } } ] },
  { q: "What kind of outcome motivates you?", options: [
    { t: "A live product people use", s: { fullstack: 2, frontend: 1 } },
    { t: "A system that runs itself", s: { ai: 2, backend: 2 } },
    { t: "Rock-solid quality", s: { qa: 3 } },
    { t: "Delighted user feedback", s: { uiux: 3 } } ] },
];
