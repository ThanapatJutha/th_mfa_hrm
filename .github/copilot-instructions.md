# th_mfa_hrm — Copilot Instructions

This project is an **interactive prototype** for Thailand MFA HRM. There is no backend server.

## Key Facts

- **No real API calls.** All state lives in Redux (in-memory). Use preloaded mock data from `src/features/*/mock/` or `src/store/`. Never suggest `fetch`, `axios`, or any HTTP client.
- **Design system components** come from a separate design library project synced into `figma/components/`. Run the sync with the project's npm script (e.g. `npm run sync:design`). The `figma/` folder is the source of truth — do not hand-write components that duplicate it.
- **Component path**: copied components live flat in `src/components/`. Import them as `@/components/<name>`.
- **Tech stack**: React 18 + TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, React Router v7, `@base-ui/react`, `radix-ui`, `lucide-react`, `cva`.