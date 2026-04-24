# Product Requirements

This folder is the **single source of truth** for all product requirement information. It organises knowledge in three stages — from raw inputs to structured artifacts that development teams can implement from.

> **This is a template.** The files listed below are a recommended starting set. Your project may add, remove, or rename files to fit your context. The three-stage structure is the important part, not the exact file list.

---

## Three-Stage Information Flow

```
source/                    Refined Data                 epics/
(Raw Data)                 (Intermediate)               (Development Specs)

┌──────────────┐       ┌─────────────────────┐       ┌──────────────────────┐
│ transcript/  │       │ 001-product-vision   │       │ epic-NNN-[name]/     │
│ references/  │──────▶│ 002-personas         │──────▶│   overview.md        │
│              │       │ 003-user-role        │       │   story-[name].md    │
│              │       │ 004-assumption-and-  │       │   story-[name].md    │
│              │       │     constraint       │       │                      │
│              │       │ 005-prioritization   │       │                      │
│              │       │ product-decision-log │       │                      │
└──────────────┘       └─────────────────────┘       └──────────────────────┘
```

Information flows **left to right**. Raw inputs are collected in `source/`, distilled into structured refined documents, and then shaped into epics and user stories that developers implement.

---

## Stage 1 — `source/` (Raw Data)

Collect all unprocessed inputs here. These files are the foundation — they are referenced during refinement but not directly consumed by developers.

| Subfolder | What goes here | Examples |
|-----------|---------------|----------|
| `source/transcript/` | Meeting logs, client discussions, customer interviews, workshop notes | Kickoff meeting transcript, user interview recording notes |
| `source/references/` | Existing documents, diagrams, flows, competitor analysis, screenshots | As-is process flow, competitor feature matrix, Figma exports |

**Naming convention:** Use descriptive names with dates where applicable (e.g. `2025-03-10-client-kickoff-meeting.md`).

---

## Stage 2 — Refined Data (Intermediate)

Structured artifacts distilled from the raw sources. These capture the team's shared understanding of the product.

| File | Purpose |
|------|---------|
| `001-product-vision.md` | Problem statement, vision, goals & objectives, NFRs, out-of-scope |
| `002-personas.md` | Detailed persona cards grounded in user research |
| `003-user-role.md` | System roles, access levels, and permission matrix |
| `004-assumption-and-constraint.md` | Assumptions (with validation status), hard constraints, dependencies |
| `005-prioritization.md` | Feature priority ranking and release tiers (Must / Should / Could) |
| `product-decision-log.md` | Living log of product decisions with rationale and source traceability |

**Numbered files** (001–005) follow a suggested reading order. The numbering is a guideline — add or reorder as your project needs.

**`product-decision-log.md`** is unnumbered because it is a living document updated throughout the project lifecycle, not a one-time artifact.

---

## Stage 3 — `epics/` (Development Specs)

The handoff format for development teams. Each epic is a folder containing an overview and one or more user stories.

```
epics/
└── epic-NNN-[name]/
    ├── overview.md          ← Epic scope, pain point, business value, features
    └── story-[name].md      ← User story with acceptance criteria
```

- **Epic overview** defines the problem, business value, success metrics, scope, and feature list.
- **User stories** contain the user story statement, acceptance criteria (Given/When/Then), and optional NFRs and technical notes.

**Naming:** `epic-NNN-kebab-case-name` (zero-padded three digits). Stories use `story-kebab-case-name.md`.

See `epics/epic-NNN-example/` for ready-to-copy templates.

---

## How Information Evolves

1. **Collect** — Gather raw inputs into `source/`. Transcripts, interview notes, reference docs, diagrams — anything that informs the product.

2. **Refine** — Synthesize raw inputs into the intermediate documents (001–005 + decision log). This is where the team aligns on vision, personas, roles, constraints, and priorities.

3. **Specify** — Translate refined understanding into epics and user stories in `epics/`. These are the artifacts developers implement from.

4. **Update** — When new information emerges (new interviews, changed priorities, scope decisions), update the relevant stage. Log significant changes in `product-decision-log.md`.

> Each stage builds on the previous one. If a user story feels wrong, check whether the refined data is accurate. If refined data is unclear, check whether the source material is complete.

---

## Customising for Your Project

This template provides a recommended starting structure. You may:

- **Add files** — e.g. a `006-market-analysis.md` or `007-regulatory-requirements.md` if your project needs them
- **Remove files** — e.g. skip `003-user-role.md` if your product has a single user type
- **Add source subfolders** — e.g. `source/surveys/`, `source/analytics/` for different input types
- **Rename** — Use names that make sense to your team, but keep the three-stage structure

The three-stage flow (source → refined → epics) is the principle. The specific files are the starting point.
