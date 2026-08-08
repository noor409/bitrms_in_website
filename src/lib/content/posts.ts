import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "national-green-hydrogen-mission-explained",
    title: "What India's National Green Hydrogen Mission Means for Industry",
    excerpt:
      "A practical look at how the mission's incentives and targets affect feasibility planning for new green hydrogen projects.",
    category: "Green Hydrogen",
    author: "BITRMS Green Hydrogen Team",
    publishedAt: "2026-02-10",
    body: [
      "India's National Green Hydrogen Mission sets ambitious production targets and backs them with production-linked incentives, electrolyzer manufacturing support, and streamlined approvals.",
      "For industrial clients, the practical question is less about the mission's headline numbers and more about how to structure a project so it qualifies for support without compromising engineering fundamentals.",
      "In our feasibility work, we start by mapping renewable capacity and site logistics against the mission's eligibility criteria before a single electrolyzer is specified — the incentive structure should shape the plan, not be bolted on afterward.",
    ],
  },
  {
    slug: "why-soc-monitoring-beats-annual-audits",
    title: "Why Continuous SOC Monitoring Beats Annual Security Audits",
    excerpt:
      "Annual audits catch what happened last year. A SOC catches what's happening right now — here's why that difference matters.",
    category: "Cyber Security",
    author: "BITRMS Cyber Security Team",
    publishedAt: "2026-01-22",
    body: [
      "An annual penetration test is a snapshot. It tells you where your defenses stood on the day of the test — not where they stand today, three months after a new vendor integration or a misconfigured firewall rule.",
      "A 24x7 SOC closes that gap by watching continuously, correlating signals across network and endpoint telemetry, and raising alerts before a small misconfiguration becomes a breach.",
      "The two aren't a replacement for each other. Audits validate posture at a point in time; a SOC keeps that posture honest every day in between.",
    ],
  },
  {
    slug: "facial-recognition-attendance-roi",
    title: "The Real ROI of Facial Recognition Attendance Systems",
    excerpt:
      "Beyond convenience: how touchless attendance systems pay for themselves through payroll accuracy and reduced HR overhead.",
    category: "Enterprise Automation",
    author: "BITRMS Enterprise Solutions Team",
    publishedAt: "2025-12-05",
    body: [
      "Card and fingerprint attendance systems share a common failure mode: they can be gamed. Facial recognition closes that loop, and when it's wired directly into payroll through an ERP like Odoo, the accuracy gains compound.",
      "In deployments across our client base, the biggest ROI driver hasn't been the novelty of the technology — it's the elimination of manual attendance reconciliation, which used to consume real HR hours every pay cycle.",
      "The technology only pays off, though, when it's properly integrated with HR and payroll workflows rather than run as a standalone system.",
    ],
  },
];
