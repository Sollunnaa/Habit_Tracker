# Habit Tracker

This repository contains a Habit Tracker application with a separated `Backend` and `Frontend` workspace. The backend is an Express/Node project (optionally TypeScript), and the frontend is a React / Expo + TypeScript app inside `Frontend/Habit_Tracker`.

**Quick summary**
- **Backend**: `Backend/` — Express API, migrations in `Backend/migrations` and Drizzle config at `Backend/drizzle.config.ts`.
- **Frontend**: `Frontend/Habit_Tracker/` — React/Expo app.

**Why this layout?**
- Keeps server and client dependencies isolated.
- Easier to install, start, and deploy each part separately.

---

**Repository structure**
- `Backend/` : backend project
  - `package.json` : backend npm manifest
  - `src/` : source code (controllers, routes, models)
  - `migrations/` : SQL migrations (Drizzle)
- `Frontend/` : root for frontend packages
  - `Habit_Tracker/` : Expo / React app

---

## Backend (server)

- Location: `Backend/`
- Main scripts in `Backend/package.json`.

Recommended commands (run from project root or `Backend/`):

```powershell
# change to backend folder
cd "d:\Random Codes\Habit_Tracker\Backend"

# install dependencies (if not already)
npm install

# development start (if using node)
npm start

# if TypeScript dev tooling added (example)
npm run dev
```

### TypeScript (optional)

If you want to convert the backend to TypeScript, these are the typical steps:

1. Install dev dependencies:

```powershell
cd "d:\Random Codes\Habit_Tracker\Backend"
npm install -D typescript ts-node-dev @types/node @types/express
```

2. Add a `tsconfig.json` (example minimal):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

3. Update `package.json` scripts (example):

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
```

4. Rename `src/index.js` → `src/index.ts` and update imports to TypeScript/ES module style. When ready, run `npm run build` and `npm start` for production.

### Database and migrations

- This project uses Drizzle and SQL migrations located in `Backend/migrations/`.
- Keep migration files under source control (they already are in this repo).
- To apply migrations, use the migration tooling you have configured (refer to `drizzle.config.ts`).

---

## Frontend

- Location: `Frontend/Habit_Tracker/`
- Use the frontend `package.json` in that folder to run/start the app.

Example:

```powershell
cd "d:\Random Codes\Habit_Tracker\Frontend\Habit_Tracker"
npm install
npm start
```

---

## Common issues & troubleshooting

- "Should I delete `node_modules` and `package.json` from root?"
  - Yes — if you moved the real project into `Backend/` and `Frontend/`, it's okay to remove the duplicate root `node_modules` and root `package.json` to avoid confusion. Keep `node_modules` and `package.json` in each package folder.

- TypeScript error: "No overload matches this call" when inserting with Drizzle/pg
  - This often means the typed table expects an `id` column or other required fields. Solutions:
    - Configure your DB schema to auto-generate `id` (serial, identity, or UUID) and update Drizzle schema types accordingly so `id` isn't required when inserting.
    - Or include `id` (preferably generated via the DB or a UUID library) in the values you insert.

- TypeScript callback error: "Expected 1 arguments, but got 0"
  - Fix the call site to pass required data, or change the function signature to accept optional parameters.

---

## Useful PowerShell tips

- When chaining commands in PowerShell, use `;` not `&&`.

Example dev workflow:

```powershell
cd "d:\Random Codes\Habit_Tracker\Backend"; npm install; npm run dev
```

---

## Contribution / Next steps

- If you want, I can:
  - Convert the `Backend/` to TypeScript automatically and update scripts.
  - Add `tsconfig.json`, update `package.json` scripts, and convert `src/index.js` to `src/index.ts`.
  - Add a `README` section specific to deployment (Docker/Heroku) if desired.

---

If you'd like any of the follow-ups (automatic TypeScript conversion, generating `tsconfig.json`, or adding CI scripts), tell me which and I'll implement them.
