export interface QuestionOption {
  label: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  type: "mcq";
  options: QuestionOption[];
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export interface Module {
  id: string;
  title: string;
  shortTitle: string;
  sentTo: string;
  feedsInto: string[];
  icon: string;
  sections: Section[];
}

export const quickScanModules: Module[] = [
  {
    id: "qs-sr",
    title: "Technology Modernization",
    shortTitle: "Tech",
    sentTo: "",
    feedsInto: ["Software Robustness"],
    icon: "server",
    sections: [
      {
        id: "qs-sr-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs1",
            text: "How would you describe the age and modernization state of your core business applications (ERP, CRM, HRMS)?",
            type: "mcq",
            options: [
              { label: "Most are 10+ years old with minimal updates", score: 1 },
              { label: "Most are 5-10 years old with periodic upgrades", score: 2 },
              { label: "A mix of legacy and modern systems", score: 3 },
              { label: "Most modernized or replaced in the last 5 years", score: 4 },
              { label: "Current-generation, cloud-native platforms", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-dr",
    title: "Data Accessibility",
    shortTitle: "Data",
    sentTo: "",
    feedsInto: ["Data Readiness"],
    icon: "database",
    sections: [
      {
        id: "qs-dr-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs2",
            text: "How accessible is data for analytical or reporting purposes across your organization?",
            type: "mcq",
            options: [
              { label: "Requires IT requests and custom queries — weeks of lead time", score: 1 },
              { label: "Some self-service via BI tools, but coverage is limited", score: 2 },
              { label: "Central data warehouse/lake exists, accessible to analyst teams", score: 3 },
              { label: "Self-service analytics widely available with governed datasets", score: 4 },
              { label: "Data marketplace with self-service access, lineage, and discovery", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-ps",
    title: "Process Documentation",
    shortTitle: "Process",
    sentTo: "",
    feedsInto: ["Process Standardization"],
    icon: "workflow",
    sections: [
      {
        id: "qs-ps-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs3",
            text: "What percentage of your core business processes are formally documented and standardized?",
            type: "mcq",
            options: [
              { label: "Less than 10%", score: 1 },
              { label: "10-30%", score: 2 },
              { label: "31-50%", score: 3 },
              { label: "51-75%", score: 4 },
              { label: "Over 75%", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-as",
    title: "Automation Scale",
    shortTitle: "Automation",
    sentTo: "",
    feedsInto: ["Automation Scale"],
    icon: "workflow",
    sections: [
      {
        id: "qs-as-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs4",
            text: "What is the current scale of automation (RPA, workflow automation, scripting) in your organization?",
            type: "mcq",
            options: [
              { label: "No formal automation — processes are manual", score: 1 },
              { label: "Pilot stage — a few bots or automations in limited areas", score: 2 },
              { label: "Departmental adoption — 10-50 automations in production", score: 3 },
              { label: "Scaled program — 50-200+ automations with a CoE", score: 4 },
              { label: "Enterprise-wide — automation is standard practice", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-dc1",
    title: "Leadership Alignment",
    shortTitle: "Leadership",
    sentTo: "",
    feedsInto: ["Digital Culture"],
    icon: "users",
    sections: [
      {
        id: "qs-dc1-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs5",
            text: "How aligned is your leadership team on the role of AI and automation in the company's future?",
            type: "mcq",
            options: [
              { label: "Significant disagreement or lack of interest", score: 1 },
              { label: "Some leaders enthusiastic, others skeptical or indifferent", score: 2 },
              { label: "General agreement on the need, but no alignment on approach", score: 3 },
              { label: "Aligned on vision and priorities with active executive sponsorship", score: 4 },
              { label: "Unified vision with leaders actively championing digital adoption", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-dc2",
    title: "Change Readiness",
    shortTitle: "Change",
    sentTo: "",
    feedsInto: ["Digital Culture"],
    icon: "users",
    sections: [
      {
        id: "qs-dc2-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs6",
            text: "How does your organization typically respond to new technology or process changes?",
            type: "mcq",
            options: [
              { label: "Strong resistance — changes are slow and often rolled back", score: 1 },
              { label: "Cautious — long pilot phases, heavy governance before adoption", score: 2 },
              { label: "Mixed — some teams adopt quickly, others resist", score: 3 },
              { label: "Generally positive — structured change management enables adoption", score: 4 },
              { label: "Eagerly — culture of experimentation with fast adoption cycles", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-sc",
    title: "AI Regulation Readiness",
    shortTitle: "Compliance",
    sentTo: "",
    feedsInto: ["Security & Compliance"],
    icon: "shield",
    sections: [
      {
        id: "qs-sc-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs7",
            text: "How prepared is your organization for AI-related regulations (EU AI Act, DPDP Act, etc.)?",
            type: "mcq",
            options: [
              { label: "Not aware of upcoming regulations", score: 1 },
              { label: "Aware but haven't started preparing", score: 2 },
              { label: "Initial assessment underway", score: 3 },
              { label: "Active compliance program for key regulations", score: 4 },
              { label: "Regulatory-ready with proactive monitoring of evolving AI legislation", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-ve",
    title: "Partner Contracts",
    shortTitle: "Vendors",
    sentTo: "",
    feedsInto: ["Vendor Ecosystem"],
    icon: "handshake",
    sections: [
      {
        id: "qs-ve-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs8",
            text: "Are your IT partner contracts structured to incentivize automation and efficiency?",
            type: "mcq",
            options: [
              { label: "No — contracts are headcount/FTE-based", score: 1 },
              { label: "Mostly headcount-based with some project-based components", score: 2 },
              { label: "Mix of FTE and outcome-based pricing", score: 3 },
              { label: "Primarily outcome-based or managed services pricing", score: 4 },
              { label: "Gain-sharing or innovation-incentive models", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-ai1",
    title: "AI Journey",
    shortTitle: "AI Journey",
    sentTo: "",
    feedsInto: ["AI/ML Current State"],
    icon: "brain",
    sections: [
      {
        id: "qs-ai1-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs9",
            text: "Where is your organization on the AI journey?",
            type: "mcq",
            options: [
              { label: "Not started — no AI initiatives or exploration", score: 1 },
              { label: "Exploring — learning and attending conferences, but no projects", score: 2 },
              { label: "Experimenting — 1-3 POCs or pilots in progress", score: 3 },
              { label: "Deploying — some AI use cases in production delivering value", score: 4 },
              { label: "Scaling — AI embedded in multiple processes systematically", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-ai2",
    title: "AI Tool Adoption",
    shortTitle: "AI Tools",
    sentTo: "",
    feedsInto: ["AI/ML Current State"],
    icon: "brain",
    sections: [
      {
        id: "qs-ai2-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs10",
            text: "How are AI tools (including GenAI like ChatGPT, Copilot) being used by employees?",
            type: "mcq",
            options: [
              { label: "Blocked or not available", score: 1 },
              { label: "Unofficial/shadow use — employees use personal accounts", score: 2 },
              { label: "Approved for limited use with guidelines", score: 3 },
              { label: "Organization-wide deployment with governance", score: 4 },
              { label: "Deeply integrated into workflows with customization", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-bm",
    title: "Business Model Maturity",
    shortTitle: "Biz Model",
    sentTo: "",
    feedsInto: ["Business Model"],
    icon: "briefcase",
    sections: [
      {
        id: "qs-bm-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs11",
            text: "How digitally enabled is your organization's revenue and customer engagement model?",
            type: "mcq",
            options: [
              { label: "Fully offline — traditional sales and fixed pricing only", score: 1 },
              { label: "Basic digital presence (website, email) but revenue model unchanged", score: 2 },
              { label: "Some digital revenue streams alongside traditional model", score: 3 },
              { label: "Primarily digital/platform-based with data-driven customer engagement", score: 4 },
              { label: "AI-native business model with dynamic pricing and ecosystem monetization", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-tl",
    title: "Technology Landscape",
    shortTitle: "Tech Landscape",
    sentTo: "",
    feedsInto: ["Technology Landscape"],
    icon: "layers",
    sections: [
      {
        id: "qs-tl-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs12",
            text: "How would you describe the overall coherence and integration of your technology landscape?",
            type: "mcq",
            options: [
              { label: "Fragmented — siloed systems with no integration", score: 1 },
              { label: "Point-to-point integrations, growing complexity", score: 2 },
              { label: "Central integration layer (API/ESB) connecting major systems", score: 3 },
              { label: "Well-governed enterprise integration platform", score: 4 },
              { label: "Composable, API-first architecture with modular services", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-sp",
    title: "IT Spend Profile",
    shortTitle: "Spends",
    sentTo: "",
    feedsInto: ["Spends"],
    icon: "dollar-sign",
    sections: [
      {
        id: "qs-sp-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs13",
            text: "What is the approximate split between Run (keep-the-lights-on) vs. Change (innovation) in your IT spend?",
            type: "mcq",
            options: [
              { label: "90%+ Run / <10% Change", score: 1 },
              { label: "80% Run / 20% Change", score: 2 },
              { label: "70% Run / 30% Change", score: 3 },
              { label: "60% Run / 40% Change", score: 4 },
              { label: "50% or less Run / 50%+ Change", score: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "qs-vl",
    title: "Value Measurement",
    shortTitle: "Value",
    sentTo: "",
    feedsInto: ["Value"],
    icon: "trending-up",
    sections: [
      {
        id: "qs-vl-s",
        title: "Quick Scan",
        questions: [
          {
            id: "qs14",
            text: "How does your organization measure the value/ROI of technology investments?",
            type: "mcq",
            options: [
              { label: "No formal measurement — investments justified by gut feel", score: 1 },
              { label: "Basic cost tracking but no post-implementation ROI review", score: 2 },
              { label: "Business cases required with post-go-live reviews", score: 3 },
              { label: "Structured value tracking with KPIs at regular intervals", score: 4 },
              { label: "Real-time value dashboards with automated ROI tracking", score: 5 },
            ],
          },
        ],
      },
    ],
  },
];

export const maturityLevels = [
  { level: 1, min: 1.0, max: 1.8, label: "Foundational", description: "Minimal digital capabilities. Manual processes, no strategy.", color: "#e74c3c" },
  { level: 2, min: 1.9, max: 2.6, label: "Emerging", description: "Some awareness and pockets of effort. Inconsistent, fragmented.", color: "#e67e22" },
  { level: 3, min: 2.7, max: 3.4, label: "Developing", description: "Structured efforts underway. Key areas being addressed but gaps remain.", color: "#f1c40f" },
  { level: 4, min: 3.5, max: 4.2, label: "Advanced", description: "Strong capabilities across most dimensions. Ready for strategic AI.", color: "#8B8FCF" },
  { level: 5, min: 4.3, max: 5.0, label: "Leading", description: "Mature, integrated digital organization. AI-native practices.", color: "#3D1F3E" },
];

export const dimensions = [
  "Software Robustness",
  "Data Readiness",
  "Process Standardization",
  "Automation Scale",
  "Digital Culture",
  "Security & Compliance",
  "Vendor Ecosystem",
  "AI/ML Current State",
  "Business Model",
  "Technology Landscape",
  "Spends",
  "Value",
];
