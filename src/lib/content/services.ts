import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "green-hydrogen",
    title: "Green Hydrogen",
    shortTitle: "Green Hydrogen",
    icon: "leaf",
    heroKicker: "Clean Energy Engineering",
    summary:
      "End-to-end green hydrogen project consulting, electrolyzer system integration, and EPC support for clean hydrogen production.",
    features: [
      "Feasibility studies & detailed project reports (DPR)",
      "Electrolyzer system design & integration",
      "Renewable-to-hydrogen plant engineering",
      "Storage & distribution infrastructure",
      "Regulatory & subsidy advisory (National Green Hydrogen Mission)",
    ],
    benefits: [
      "Lower carbon footprint across operations",
      "Long-term energy cost stability",
      "Compliance with national green energy mandates",
      "Access to green hydrogen incentive schemes",
    ],
    useCases: [
      {
        title: "Industrial Decarbonization",
        description:
          "Replacing grey hydrogen and fossil fuel feedstock in steel, cement, and refining processes with green hydrogen to cut process emissions without re-engineering the entire plant.",
      },
      {
        title: "Green Ammonia & Export Hubs",
        description:
          "Engineering hydrogen-to-ammonia conversion for fertilizer production and green ammonia export terminals, structured to qualify for national incentive programs.",
      },
      {
        title: "Grid-Scale Renewable Storage",
        description:
          "Using electrolysis to store excess solar and wind generation as hydrogen for later dispatch, helping grid operators balance intermittent renewable supply.",
      },
    ],
    body: [
      "As industries and governments race toward net-zero targets, green hydrogen has emerged as one of the most viable pathways to decarbonize hard-to-abate sectors. BITRMS partners with energy producers, industrial clients, and public sector bodies to plan, design, and deliver green hydrogen projects from feasibility through commissioning.",
      "Our engineering team works across the full value chain — renewable power sizing, electrolyzer selection and integration, storage and distribution design, and safety compliance — so clients can move from concept to operating plant with a single accountable partner.",
      "We also support clients through India's evolving green hydrogen policy landscape, helping structure projects to qualify for national incentive and subsidy programs.",
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    shortTitle: "Cyber Security",
    icon: "shield",
    heroKicker: "Digital Defense & Compliance",
    summary:
      "Vulnerability assessment, SOC monitoring, and managed security operations protecting critical infrastructure and enterprise networks.",
    features: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "24x7 Security Operations Center (SOC) monitoring",
      "ISO 27001 & regulatory compliance audits",
      "Network & endpoint security architecture",
      "Incident response & digital forensics",
    ],
    benefits: [
      "Reduced breach and downtime risk",
      "Audit-ready regulatory compliance",
      "Business continuity for critical systems",
      "Hardened protection for telecom & industrial infrastructure",
    ],
    useCases: [
      {
        title: "Telecom Network Hardening",
        description:
          "Securing distributed tower and NOC infrastructure against intrusion and denial-of-service attacks, with continuous monitoring across every site.",
      },
      {
        title: "Critical Infrastructure Protection",
        description:
          "OT/SCADA security assessments and hardening for industrial and energy facilities, closing gaps between IT and operational technology networks.",
      },
      {
        title: "Regulatory Compliance Audits",
        description:
          "Preparing enterprises for ISO 27001 and data protection audits with documentation, control implementation, and remediation ahead of certification deadlines.",
      },
    ],
    body: [
      "BITRMS delivers cyber security services built for organizations that cannot afford downtime — telecom operators, industrial facilities, and enterprises running mission-critical infrastructure. Our approach combines proactive assessment with continuous monitoring, so threats are caught before they become incidents.",
      "Engagements typically begin with a full vulnerability assessment and penetration test across network, application, and endpoint layers, followed by a remediation roadmap prioritized by business risk. For clients who need ongoing protection, our SOC provides round-the-clock monitoring, alerting, and incident response.",
      "We also help clients navigate compliance frameworks such as ISO 27001, preparing documentation and controls ahead of certification audits.",
    ],
  },
  {
    slug: "odoo-facial-recognition",
    title: "Odoo ERP & Facial Recognition",
    shortTitle: "Odoo & Facial Recognition",
    icon: "cpu",
    heroKicker: "Enterprise Automation",
    summary:
      "Odoo ERP implementation and customization integrated with AI-powered facial recognition for attendance, access control, and workforce management.",
    features: [
      "Odoo ERP implementation (HR, Inventory, Sales, Accounting)",
      "Custom module development & third-party integrations",
      "AI facial recognition attendance & access control",
      "Biometric device deployment & integration",
      "Ongoing support, training & change management",
    ],
    benefits: [
      "Unified operations across departments",
      "Touchless, tamper-proof attendance tracking",
      "Reduced manual HR and admin overhead",
      "A platform that scales as the business grows",
    ],
    useCases: [
      {
        title: "Multi-Site Workforce Attendance",
        description:
          "Facial recognition attendance deployed across distributed offices and factories, feeding directly into Odoo's HR and payroll modules for touchless, tamper-proof tracking.",
      },
      {
        title: "Manufacturing Inventory & Production Control",
        description:
          "Odoo Inventory and Manufacturing modules unifying stock, procurement, and production planning onto one system, replacing spreadsheet-driven tracking.",
      },
      {
        title: "Secure Facility Access Control",
        description:
          "Facial recognition access gating for restricted zones such as data centers and factory floors, integrated with HR records for automatic provisioning and offboarding.",
      },
    ],
    body: [
      "Many growing organizations run on a patchwork of spreadsheets and disconnected tools. BITRMS implements Odoo ERP to bring HR, inventory, sales, and accounting onto a single platform — configured and customized around how the business actually operates, not the other way around.",
      "For workforce management, we layer in AI-powered facial recognition for attendance and access control, replacing card and fingerprint systems with a faster, more hygienic, and harder-to-spoof alternative that feeds directly into Odoo's HR and payroll modules.",
      "Every implementation includes staff training and a defined support window, so the system keeps delivering value long after go-live.",
    ],
  },
  {
    slug: "rms-telecom",
    title: "RMS Telecom",
    shortTitle: "RMS Telecom",
    icon: "radio-tower",
    heroKicker: "Remote Infrastructure Monitoring",
    summary:
      "Remote Monitoring System (RMS) solutions for telecom towers and infrastructure — real-time visibility into power, environment, and security across distributed sites.",
    features: [
      "Real-time tower/site monitoring (DG, battery, temperature, fuel)",
      "Centralized NOC dashboards",
      "SMS, email & app-based alerting",
      "Energy efficiency analytics",
      "Integration with existing telecom OSS/BSS systems",
    ],
    benefits: [
      "Reduced site downtime",
      "Lower diesel and energy costs",
      "Faster fault detection and response",
      "Data-driven infrastructure decisions",
    ],
    useCases: [
      {
        title: "Diesel Generator Fuel Theft Prevention",
        description:
          "Fuel-level sensors and instant alerts catch pilferage and unusual drainage across remote tower sites before it shows up as a budget overrun.",
      },
      {
        title: "Battery Health & Backup Assurance",
        description:
          "Real-time battery monitoring flags degrading cells and backup shortfalls, preventing outages during grid downtime at unmanned sites.",
      },
      {
        title: "Centralized Multi-Site NOC Visibility",
        description:
          "A single dashboard aggregating power, environmental, and security data across thousands of distributed sites, so operations teams act on one view instead of many.",
      },
    ],
    body: [
      "Telecom operators managing thousands of distributed sites need visibility they can act on in real time. BITRMS's Remote Monitoring System (RMS) gives network operations teams a live view of power, environmental, and security conditions across every tower and site from a single dashboard.",
      "The platform tracks DG runtime, battery health, fuel levels, and site temperature, raising alerts the moment a parameter drifts out of range — well before it becomes a service-affecting fault. Historical data feeds energy efficiency analytics that help operators cut diesel consumption and plan maintenance proactively.",
      "RMS is built to integrate with existing OSS/BSS systems, so it slots into an operator's current operations rather than replacing them.",
    ],
  },
  {
    slug: "carbon-climate-solutions",
    title: "Carbon & Climate Solutions",
    shortTitle: "Carbon & Climate",
    icon: "globe",
    heroKicker: "AI-Powered Carbon Accounting",
    summary:
      "An AI-powered carbon accounting and emissions tracking platform helping businesses, governments, and landowners measure, reduce, and monetize their carbon footprint.",
    features: [
      "Satellite-based carbon & land monitoring",
      "Agriculture carbon sequestration tracking (agroforestry)",
      "Infrastructure development & carbon hotspot monitoring",
      "Renewable energy & mini-grid carbon analysis",
      "Carbon credit market support",
    ],
    benefits: [
      "Verified, audit-ready emissions data",
      "Access to carbon credit markets",
      "Regulatory-ready reporting",
      "Support for climate-positive decision making",
    ],
    useCases: [
      {
        title: "Agriculture",
        description:
          "Predicting crop health and needs, running risk assessment and mitigation, and tracking carbon sequestration through agroforestry initiatives.",
      },
      {
        title: "Infrastructure",
        description:
          "Using satellite imagery to track real-time development progress on building projects and spot carbon hotspots as construction proceeds.",
      },
      {
        title: "Energy",
        description:
          "Evaluating land use for mini-grid deployments and analyzing mini-grid carbon performance to support efficient renewable energy rollout.",
      },
    ],
    body: [
      "BITRMS's carbon and climate platform helps individuals, businesses, and governments proactively track their carbon footprint using satellite imagery and AI-driven analysis, spanning agriculture, infrastructure, and energy.",
      "In agriculture, the platform predicts crop health and needs while tracking carbon sequestration through agroforestry initiatives. For infrastructure, it monitors real-time development progress on building projects and identifies carbon hotspots. In energy, it evaluates land use and analyzes mini-grid carbon performance to support efficient renewable energy rollout.",
      "The platform also supports the development of legitimate carbon markets, helping organizations generate, verify, and trade carbon credits with confidence.",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
