import { Experience } from "~~/utils/types";

const defineExperience = (
  arr: (Omit<Experience, "id" | "sort"> & { id?: string; sort?: number })[],
): Experience[] =>
  arr.map((obj, i) => ({ ...obj, id: obj.id ?? `${i}`, sort: obj.sort ?? i }));

export default defineExperience([
  {
    id: "hexo",
    from: "Mar, 2022",
    description: {
      body: `- Worked on **Hexo Studio**, a platform for generating **images** from **text templates** for **social media** and **marketing** purposes using generative AI.
- It was built using:
  - **Frontend**:
    - Typescript - language
    - Next.js - Web framework
    - Tailwind CSS - utility-first styling
    - Radix UI & Headless UI - unstyled, fully-functional components
    - TanStack Query - API query management
    - Firebase - manage login methods
    - Zustand - state management
  - **Backend**:
    - Python - language
    - FastAPI - the web server API
    - Pydantic - runtime type checking
    - SQLAlchemy - PostgresQL ORM
    - Alembic - handle DB migrations
`,
    },
    workplace_name: "Hexo",
    workplace_title: "Lead Full Stack Consultant",
  },
  {
    id: "anduin",
    from: "Dec, 2022",
    to: "Jan, 2023",
    description: {
      body: `- Worked on a **Python** based **ETL** pipeline with **multi-processing** and **multi-threading** to **ingest** and **transform** **100GB+** of text files to a **data lake**.`,
    },
    workplace_name: "Anduin",
    workplace_title: "Contractor",
  },
  {
    id: "hyphen",
    from: "Mar, 2022",
    to: "Dec, 2022",
    description: {
      body: `- Built the **entire technical infrastructure** from the **ground up**, including a **ticketing system**, **accounts consolidation system**, **internal dashboard** and an **app** in **4** months.
- The entire system had an **atomic**, **zero-trust** philosophy, using **database triggers** and **webhooks** to consolidate data on a DB level, so even if items are created in the DB from multiple sources, auxiliary data is still populated.
- Created a **design system** called **Falcon** which informed the design for UI/UX for the app which was built in **Flutter**.
- The ticketing system has multiple ticket statuses, along with **automatic assignment** (club manager, SLA, holiday and work hours), **slack bot** for notifications and quick responses, and more. Created a **DSL** for querying the Slack bot for ticket statuses and more.
- The accounting system allows to create invoices which are consolidated in multiple sources including **Razorpay** and **Zoho Books** which also accounts for multiple financial entities.
- **Tech Stack**: **Typescript**, **Zod**, **Firebase** (Auth, Cloud Messaging), **Supabase** (Postgres), **Pipedream**, **Retool**, **Razorpay**, **Zoho Books**, **Flutter**, **Riverpod Architecture** (my spin on it, at least).`,
    },
    workplace_name: "Hyphen",
    workplace_title: "Full Stack Developer",
  },
  {
    id: "tcs",
    from: "Aug, 2020",
    to: "Apr, 2022",
    description: {
      body: `- Worked with **MYER**, an Australian clothing company with online and brick-and-mortar stores.
- Handled the **data-flow** of legacy **Oracle CIW** databases from different sources using Control-M, and also aided in the transition for **10000+ lines of code** from this legacy system to **GCP.**`,
    },
    workplace_name: "TCS",
    workplace_title: "Software Engineer",
  },
]);
