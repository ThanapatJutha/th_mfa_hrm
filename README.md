# MFA HRM — Interactive Prototype

ระบบบริหารทรัพยากรบุคคล กระทรวงการต่างประเทศ (Interactive Prototype)

> **Note for designers:** This is a front-end only prototype. There is no server or database — all data lives in the browser's memory and resets every time you refresh the page. The purpose is to simulate real interactions for design review and user testing.

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 and pick a role to log in.

---

## Roles

| Role | What they can do |
|---|---|
| **Admin** | View, create, edit, and delete employees. Create and edit performance evaluations. |
| **Employee** | View their own profile and their own evaluation results (read-only). |

---

## Folder structure

```
src/
  features/          — business modules, one folder per feature
    auth/            — login page, route guards, auth state
    employees/       — employee list, detail, and form pages + state
    performance/     — evaluation list, detail, and form pages + state

  mock/              — seed data that pre-fills the app on startup
    users.ts         — mock user accounts (admin + employee)
    employees.ts     — 10 sample employees
    performance.ts   — sample evaluation records

  store/             — global state wiring (Redux setup)
    index.ts         — combines all feature states into one store
    hooks.ts         — helpers to read/write state from any component

  components/        — design system components (do not edit)
    ui/              — base shadcn/ui primitives
    common/          — MFA-branded wrappers (Button, Alert, Avatar)

  layouts/           — app shell (AppLayout: sidebar + header)
  pages/             — global pages not owned by a feature (404, Showcase)
  router/            — URL routing configuration
  fonts/             — CS Chatthai and Kanit typefaces
  figma/             — Figma component specs and design tokens (source of truth)
```

Each feature folder follows the same internal shape:

```
features/<name>/
  types/    — data shapes (what fields an Employee or Evaluation has)
  store/    — how data changes (add, update, delete actions)
  pages/    — the screens the user sees
  components/ — smaller UI pieces used only within this feature
```

---

## How data works (Redux — short version)

Instead of a database, this prototype uses **Redux** to hold all data in memory while the app is open.

Think of Redux as a **shared whiteboard** for the whole app:

- Every piece of data (employees list, evaluations, logged-in user) is written on this whiteboard.
- Any screen can read from it.
- When you click "Add Employee" or "Save", an **action** is sent that updates the whiteboard.
- All screens that display that data automatically refresh.

The whiteboard is divided into three sections:

| Section | What it holds |
|---|---|
| `auth` | Who is logged in right now |
| `employees` | The full list of employee records |
| `performance` | The full list of evaluation records |

**Important:** Because there is no database, all changes are lost when you close or refresh the browser tab. This is intentional for a prototype — it means every demo session starts fresh with the same seed data.

---

## Design tokens & Figma components

Design tokens (colours, spacing, typography) live in `figma/tokens/tokens.json` and are compiled into CSS variables in `src/index.css`. Component specs are in `figma/components/`.

To regenerate the theme after updating tokens:

```bash
npm run generate-theme
```
