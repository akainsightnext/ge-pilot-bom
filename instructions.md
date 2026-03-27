# Deploying the GE Pilot BOM on GitHub Pages (Private Repository)

**Audience:** AEs, FDEs, SAs setting up the internal playbook dashboard for team use.
**Time required:** ~20 minutes.
**Cost:** Free on GitHub Free plan (private repos support GitHub Pages on all plans as of 2023).

---

## How Access Control Works

GitHub Pages from a private repository is **not publicly accessible**. Anyone who tries to visit the URL without being logged into GitHub and added as a collaborator will see a 404 page. This makes it suitable for a small, trusted internal team.

> **Limitation:** Every person who needs to view the site must have a GitHub account and be explicitly invited to the repository as a collaborator. If your team is larger than ~15 people or includes non-technical stakeholders who do not have GitHub accounts, consider Firebase Hosting + Google Sign-In instead.

---

## Step 1 — Export the Project Code

First, download the project code from Manus.

1. In the Manus Management UI, open the **Code** panel.
2. Click **Download all files** to get a ZIP of the project.
3. Unzip it to a local folder, e.g., `ge-pilot-bom/`.

---

## Step 2 — Create a Private GitHub Repository

1. Go to [github.com/new](https://github.com/new).
2. Set the repository name, e.g., `ge-pilot-bom`.
3. Set visibility to **Private**.
4. Do **not** initialize with a README (you will push existing code).
5. Click **Create repository**.

---

## Step 3 — Update the Vite Config for GitHub Pages

GitHub Pages serves your site from a subdirectory path by default:
`https://<your-username>.github.io/<repo-name>/`

You need to tell Vite about this base path so assets load correctly.

Open `vite.config.ts` in the project and add the `base` field:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ge-pilot-bom/',   // ← Add this line. Must match your repo name exactly.
});
```

> **Important:** If your repository is named differently, replace `ge-pilot-bom` with your actual repo name.

---

## Step 4 — Add the GitHub Actions Workflow

GitHub Actions will automatically build and deploy the app every time you push to the `main` branch.

Create the file `.github/workflows/deploy.yml` in your project:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public   # Vite outputs to dist/public in this project

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Step 5 — Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**, select **GitHub Actions**.
4. Click **Save**.

> Do **not** select "Deploy from a branch" — that is the legacy method. Select **GitHub Actions** so your workflow controls the deployment.

---

## Step 6 — Push the Code

From your local project folder, run:

```bash
# Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit — GE Pilot BOM"
git branch -M main
git remote add origin https://github.com/<your-username>/ge-pilot-bom.git
git push -u origin main
```

The GitHub Actions workflow will trigger automatically. You can watch it run under the **Actions** tab in your repository. It typically takes 1–2 minutes.

---

## Step 7 — Add Team Members as Collaborators

1. Go to **Settings** → **Collaborators** in your repository.
2. Click **Add people**.
3. Enter each team member's GitHub username or email.
4. Set their role to **Read** (they only need to view the site, not push code).

Each person will receive an email invitation. Once accepted, they can visit the Pages URL and GitHub will authenticate them automatically.

---

## Your Live URL

Once deployed, your site will be available at:

```
https://<your-github-username>.github.io/ge-pilot-bom/
```

For a GitHub Organization repository:

```
https://<your-org-name>.github.io/ge-pilot-bom/
```

---

## Updating the Site

Any time you push changes to the `main` branch, GitHub Actions will automatically rebuild and redeploy. No manual steps needed.

```bash
git add .
git commit -m "Update playbook content"
git push
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Assets (CSS/JS) return 404 | `base` in `vite.config.ts` is wrong or missing | Ensure `base: '/ge-pilot-bom/'` matches your repo name exactly |
| Workflow fails at build step | Missing dependency or Node version mismatch | Check the Actions log; ensure Node 22 and pnpm 10 are specified |
| Team member sees 404 | They have not accepted the collaborator invitation | Ask them to check their email and accept the GitHub invite |
| Site shows old version | Browser cache | Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) |
| Blank white page | React Router base path mismatch | Confirm `base` in `vite.config.ts` matches the repo name |

---

## Next Steps After POC

Once the team has validated the playbook and you are ready for a more permanent, secure home:

| Upgrade Path | When to Use |
|---|---|
| **Firebase Hosting + Google Auth** | Team grows beyond GitHub users; want Google Workspace domain restriction |
| **Cloud Run + IAP** | Need enterprise-grade access control tied to Google Groups |
| **Manus Publish** | Fastest option for a wider internal audience with no auth requirement |
