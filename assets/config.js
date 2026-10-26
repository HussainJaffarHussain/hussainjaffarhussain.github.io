/*
  ONE FILE FOR EVERYTHING PERSONAL.
  Edit this file to change names, links, projects, skills and services.
  Any value set to null is hidden on the site until you fill it in.
  Never put passwords, API keys or private tokens in this file: it is public.
*/
window.PORTFOLIO = {
  owner: {
    name: "Hussain Jaffar Hussain",
    shortName: "Hussain",
    initials: "HJH",
    title: "AI Engineer | Voice Agents, LLM Applications, RAG & Business Automation",
    location: null,                      // e.g. "Karachi, Pakistan"
    profileImage: "assets/img/Profile.jpg",   // file names are case-sensitive on GitHub Pages
    profileAlt: "Hussain Jaffar Hussain in a navy suit, standing in a modern office"
  },

  links: {
    github: null,                        // e.g. "https://github.com/your-username"
    linkedin: null,                      // e.g. "https://www.linkedin.com/in/your-profile"
    email: "virtualstager360@gmail.com",
    whatsapp: null,                      // e.g. "https://wa.me/923001234567" (business number only)
    resume: null                         // e.g. "assets/resume/Hussain-Jaffar-Hussain-Resume.pdf"
  },

  contact: {
    // Paste a Formspree (or similar) endpoint here to receive form messages in your inbox.
    // Example: "https://formspree.io/f/abcdwxyz". Leave null to fall back to email (mailto).
    formEndpoint: "https://formsubmit.co/ajax/virtualstager360@gmail.com"
  },

  about: {
    intro: [
      "I am an AI engineer who builds working software around language models. Voice agents that answer the phone. Assistants that read your documents before they reply. WhatsApp systems that capture leads, answer questions and pass the conversation to a person when it matters.",
      "My work is mostly Python: FastAPI backends, LLM API integrations, retrieval pipelines, webhooks and the plumbing that connects them to real business tools. I care about the boring parts that make AI usable: clear data flow, tenant isolation, error handling, tests and a clean deployment."
    ],
    focus: [
      "AI application engineering",
      "LLM API integration",
      "Retrieval-Augmented Generation",
      "AI agents and conversational workflows",
      "Voice agents",
      "WhatsApp CRM and automation",
      "Business process automation",
      "SaaS development and deployment"
    ],
    // Optional sections. Leave the array empty to hide a block.
    background: [],                      // e.g. ["2023 to now: Freelance AI engineer, ..."]
    certifications: [],                  // e.g. ["Course name, Issuer, 2025"]
    interests: []                        // e.g. ["Open-source voice AI", "Evaluation of RAG systems"]
  },

  skills: [
    { group: "AI Engineering", code: "AI", items: ["LLM APIs", "Prompt Engineering", "AI Agents", "RAG", "Embeddings", "Vector Search", "AI Workflow Design"] },
    { group: "Backend Development", code: "BE", items: ["Python", "FastAPI", "REST APIs", "SQL", "PostgreSQL", "Supabase"] },
    { group: "Voice AI", code: "VX", items: ["Speech-to-Text integrations", "Text-to-Speech integrations", "Real-time conversational AI", "Voice-agent workflows"] },
    { group: "Business Automation", code: "AU", items: ["n8n", "API Integrations", "Webhooks", "Workflow Orchestration", "WhatsApp Business API integrations", "CRM automation"] },
    { group: "Development and Deployment", code: "OP", items: ["Git and GitHub", "Docker", "Linux and Ubuntu", "Coolify", "Environment configuration", "Application deployment"] }
  ],

  /*
    PROJECTS
    status: one of "Live", "In development", "Prototype", "Planned". Set it to what is true today.
    scope: what the project is designed to do. Keep only what the code really does once you verify it.
    Any case-study field left out (or null) is simply not shown.
    github / demo: real URLs only, otherwise null.
    image: path to a real screenshot, otherwise null (a designed placeholder is shown).
  */
  projects: [
    {
      id: "voice-receptionist",
      title: "AI Voice Receptionist & Appointment Assistant",
      short: "A voice assistant that answers customer calls, explains services and helps book appointments.",
      category: "Voice AI",
      status: "In development",
      image: null,
      problem: "Small businesses miss calls after hours and during busy periods. Every missed call can be a missed booking.",
      solution: "A real-time voice agent that listens, understands the request, answers from the business's own service and pricing information, and walks the caller through booking, with a handoff to a person when needed.",
      scope: ["Real-time voice conversation", "Speech recognition", "AI-generated responses", "Service and pricing information", "Appointment scheduling", "Booking confirmation", "Human handoff", "Business-system integrations"],
      stack: ["Python", "LiveKit", "LLM APIs", "Speech-to-Text", "Text-to-Speech", "Supabase"],
      architecture: ["Caller connects through a LiveKit voice room", "Speech-to-Text turns audio into text in real time", "The LLM decides the reply using the business's service data", "Booking requests are checked against the configured database", "Text-to-Speech speaks the answer back to the caller", "Complex requests are handed to a person"],
      security: null,
      testing: null,
      challenges: null,
      future: null,
      github: null,
      demo: null
    },
    {
      id: "rag-assistant",
      title: "AI Document Assistant with Retrieval-Augmented Generation",
      short: "Ask questions about your documents and get answers grounded in the text, not guesses.",
      category: "RAG",
      status: "In development",
      image: null,
      problem: "Teams lose time searching long documents, and a plain chatbot will happily invent an answer it cannot support.",
      solution: "Documents are split, embedded and indexed. Each question first retrieves the most relevant passages, and the model answers only from those passages, with source references where supported.",
      scope: ["Document ingestion", "Text extraction", "Chunking and indexing", "Embedding generation", "Semantic retrieval", "Context-aware answers", "Source citations where supported"],
      stack: ["Python", "LLM APIs", "Embeddings", "Vector Search"],
      architecture: ["Upload documents", "Extract and clean the text", "Split into chunks and create embeddings", "Store vectors in a searchable index", "Retrieve the closest chunks for each question", "Answer from the retrieved context only, with sources"],
      security: null,
      testing: null,
      challenges: ["Chunk size is a trade-off: small chunks retrieve precisely but lose context, large chunks keep context but add noise."],
      future: null,
      github: null,
      demo: null
    },
    {
      id: "priceintel",
      title: "PriceIntel: AI-Powered E-commerce Price Intelligence",
      short: "Price monitoring that helps clothing brands see competitor pricing and how it moves over time.",
      category: "SaaS",
      status: "In development",
      image: null,
      problem: "Clothing brands set prices with little visibility into what competitors charge or how those prices change.",
      solution: "A monitoring platform that tracks product prices from product URLs and catalog imports, keeps a price history, compares competitors on a dashboard and sends email alerts on changes.",
      scope: ["Shopify-focused product monitoring", "Product URL input", "Catalog imports", "Price history", "Competitor comparisons", "Dashboard visualizations", "Email alerts", "Pricing insights"],
      stack: ["Python", "FastAPI", "Supabase PostgreSQL", "Modern frontend", "Email integration"],
      architecture: null,
      security: ["Monitoring respects the access rules and terms of each data source.", "Support is limited to stores that have been tested."],
      testing: null,
      challenges: null,
      future: null,
      github: null,
      demo: null
    },
    {
      id: "whatsapp-crm",
      title: "WhatsApp CRM: Multi-Tenant Customer Engagement Platform",
      short: "One place for a business to manage WhatsApp contacts, conversations and leads, with separate workspaces per client.",
      category: "SaaS",
      status: "In development",
      image: null,
      problem: "Businesses run sales and support through WhatsApp, but conversations live on individual phones with no shared history, no pipeline and no team access.",
      solution: "A multi-tenant SaaS with a Super Admin dashboard and a Client Admin dashboard. Each business gets its own isolated workspace for contacts, conversation history, lead organization and team roles.",
      scope: ["Multi-tenant workspaces", "Super Admin dashboard", "Client Admin dashboard", "Contact management", "Conversation history", "Lead organization", "Customer segmentation", "Team access and role permissions", "Subscription plans and usage limits", "White-label branding where supported", "WhatsApp Business Platform integration"],
      stack: ["Supabase PostgreSQL", "WhatsApp Business Platform", "Docker", "Coolify"],
      architecture: null,
      security: ["Tenant isolation enforced in the backend and database layers", "Role-based access for team members", "API credentials kept on the server"],
      testing: null,
      challenges: null,
      future: null,
      related: "whatsapp-automation",
      github: null,
      demo: null
    },
    {
      id: "whatsapp-automation",
      title: "WhatsApp CRM & AI-Powered Business Automation",
      short: "The automation layer: lead capture, AI-assisted replies, qualification and follow-ups, all logged to the CRM.",
      category: "AI Automation",
      status: "In development",
      image: null,
      problem: "Incoming WhatsApp messages need fast answers, but staff cannot reply to every product question, order check and follow-up by hand.",
      solution: "An automation layer that connects WhatsApp conversations to CRM records, answers common questions with rules or AI, qualifies and tags leads, and routes anything sensitive to a human agent.",
      scope: ["WhatsApp lead capture", "Automatic customer record creation or update", "Keyword-based replies", "AI-assisted FAQ responses", "Product and service inquiry handling", "Lead qualification", "Lead tagging and pipeline updates", "Follow-up reminders", "Order inquiry and status workflows", "Appointment reminders", "Customer segmentation", "Conversation summarization", "Human handoff", "n8n workflow integrations", "Webhook and REST API integrations", "Error handling and retry logic", "Activity logging and reporting"],
      stack: ["WhatsApp Business Platform", "n8n", "Webhooks", "REST APIs", "LLM APIs", "Supabase PostgreSQL"],
      architecture: [
        "A customer sends a WhatsApp message",
        "The authorized WhatsApp provider forwards the event to a secured backend webhook",
        "The backend validates the request and identifies the business tenant",
        "The system loads the customer record and conversation context",
        "Rules or an AI component identify the customer's intent",
        "Relevant business information is retrieved, or an authorized business API is called",
        "The system replies, or routes the conversation to a human agent",
        "The event is logged and the CRM or lead pipeline is updated"
      ],
      security: [
        "Authorized WhatsApp APIs and providers only",
        "Webhook signatures validated where supported",
        "Tokens and credentials kept on the server",
        "Customer consent and opt-in respected",
        "WhatsApp messaging and template rules followed",
        "No cross-tenant data access",
        "Duplicate webhook events handled safely",
        "An auditable record of important actions",
        "A human escalation path"
      ],
      useCases: ["Clothing store product inquiries", "Order-status questions", "Lead capture from incoming messages", "Customer follow-ups", "Appointment scheduling", "Frequently asked questions", "Sales-team notifications", "Customer support routing"],
      testing: null,
      challenges: null,
      future: null,
      related: "whatsapp-crm",
      github: null,
      demo: null
    },
    {
      id: "workflow-automation",
      title: "AI-Powered Business Workflow Automation",
      short: "Practical workflows that connect AI models, APIs and business apps to take repetitive work off a team.",
      category: "Automation",
      status: "In development",
      image: null,
      problem: "Teams copy data between tools, read documents by hand and chase approvals over chat.",
      solution: "A set of automation workflows that connect AI models, APIs, business applications and data systems, with clear exception handling so nothing fails silently.",
      scope: ["Repetitive-task automation", "Document processing", "Structured data extraction", "Notifications", "API integrations", "Approval workflows", "AI-assisted information processing", "Exception handling"],
      stack: ["n8n", "Python", "LLM APIs", "Webhooks", "REST APIs"],
      architecture: null,
      security: null,
      testing: null,
      challenges: null,
      future: null,
      github: null,
      demo: null
    },
    {
      id: "computer-vision",
      title: "AI Computer Vision & Video Analytics",
      short: "Image and video analysis for detecting, tracking and reporting on what happens in a scene.",
      category: "Computer Vision",
      status: "Planned",
      image: null,
      problem: null,
      solution: "A planned exploration of computer-vision techniques for image and video analysis.",
      scope: ["Object detection", "Object tracking", "Video-frame analysis", "Event detection", "Visual reporting"],
      stack: ["Python"],
      architecture: null,
      security: null,
      testing: null,
      challenges: null,
      future: null,
      github: null,
      demo: null
    }
  ],

  services: [
    { title: "AI Agent Development", problem: "Your team answers the same questions and repeats the same lookups all day.", uses: ["Internal knowledge assistants", "Task helpers inside your tools", "Information retrieval"], deliverables: ["Working agent with defined tools", "Source code and setup guide", "Test cases for key flows"], tech: ["Python", "LLM APIs", "FastAPI"] },
    { title: "AI Voice Assistant Development", problem: "Calls go unanswered after hours or while staff are busy.", uses: ["Receptionist workflows", "Appointment support", "Customer inquiries"], deliverables: ["Voice agent connected to your services data", "Booking flow", "Human handoff path"], tech: ["LiveKit", "Speech-to-Text", "Text-to-Speech"] },
    { title: "RAG and Document Q&A", problem: "Answers are buried in PDFs, policies and manuals.", uses: ["Policy and handbook Q&A", "Product documentation search", "Support knowledge base"], deliverables: ["Ingestion and indexing pipeline", "Q&A interface", "Answers with source references"], tech: ["Embeddings", "Vector Search", "LLM APIs"] },
    { title: "WhatsApp CRM Development", problem: "Customer chats are scattered across personal phones.", uses: ["Shared inbox for a team", "Contact and lead pipeline", "Multi-client workspaces"], deliverables: ["CRM workspace", "Roles and permissions", "WhatsApp Business Platform connection"], tech: ["Supabase", "WhatsApp Business Platform", "Docker"] },
    { title: "WhatsApp CRM Automation", problem: "Leads wait hours for a reply and follow-ups get forgotten.", uses: ["Lead capture and tagging", "FAQ and order-status replies", "Follow-up reminders"], deliverables: ["Automated flows with human handoff", "CRM updates and activity log", "Retry and duplicate handling"], tech: ["n8n", "Webhooks", "LLM APIs"] },
    { title: "Business Workflow Automation", problem: "People copy data between tools by hand.", uses: ["Document processing", "Approvals and notifications", "Data extraction into your systems"], deliverables: ["Documented workflows", "Error handling and alerts", "Handover session"], tech: ["n8n", "REST APIs", "Python"] },
    { title: "AI SaaS Integration", problem: "Your product needs AI features without a rewrite.", uses: ["AI features in an existing app", "Backend AI services", "Summaries, extraction, classification"], deliverables: ["API or module integrated in your stack", "Secrets kept server-side", "Integration tests"], tech: ["FastAPI", "LLM APIs", "PostgreSQL"] },
    { title: "AI Application Deployment", problem: "The app works on a laptop but not on a server.", uses: ["Docker-based deployment", "Linux server setup", "Environment management"], deliverables: ["Containerized app", "Deployment on your server or Coolify", "Runbook for updates"], tech: ["Docker", "Ubuntu", "Coolify"] }
  ],

  workflow: [
    { step: "Discovery", text: "Understand the business requirements, the constraints and what a good result looks like." },
    { step: "Architecture", text: "Choose the technologies, APIs, data models and system boundaries that fit." },
    { step: "Implementation", text: "Build the application and connect it to the systems it needs." },
    { step: "Testing", text: "Check functional behavior, security, reliability and the edge cases." },
    { step: "Deployment", text: "Prepare and ship the application to the chosen hosting environment." },
    { step: "Improvement", text: "Watch how it behaves, fix issues and improve it based on evidence." }
  ]
};
