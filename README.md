# rkellar.me

Personal site: **Vite + React** renders Markdown from [`src/content/resume.md`](src/content/resume.md). Edit that file to update what visitors see.

> **Note:** People who open your domain do **not** see `README.md` (that file is only for GitHub / collaborators). The public page is the built React app, backed by `resume.md`.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
```

Output is in **`dist/`** — static files you can host anywhere.

## Host on Vercel (step by step)

[Vercel](https://vercel.com) runs the build on their servers and serves the `dist/` output on their global CDN. You connect **Git** once; after that, every push to your chosen branch can trigger a new deployment.

### 1. Put the project on GitHub

From this folder (if you have not already):

```bash
git init
git add .
git commit -m "Initial site"
```

Create an empty repository on [GitHub](https://github.com/new) (no README/license needed if you are pushing existing files). Then:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

Replace `<your-username>` and `<your-repo>` with yours.

### 2. Import the repo into Vercel

1. Sign up or log in at [vercel.com](https://vercel.com) (GitHub login is fine).
2. **Add New… → Project**.
3. **Import** your GitHub repository. Authorize Vercel to read repos if asked.
4. On the configuration screen, Vercel usually **auto-detects Vite**. Confirm:
   - **Framework Preset:** Vite (or “Other” with the settings below)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install` (default)
5. **Root Directory:** leave `.` unless this app lives in a subfolder of a monorepo.
6. Click **Deploy**.

Vercel installs dependencies, runs `npm run build`, uploads `dist/`, and gives you a URL like `your-project.vercel.app`.

### 3. Connect `rkellar.me` (custom domain)

1. In the project: **Settings → Domains**.
2. Add **`rkellar.me`** and, if you like, **`www.rkellar.me`**.
3. Vercel shows **DNS records** to add at your domain registrar (where you bought the domain). Typical patterns:
   - **Apex** (`rkellar.me`): an **A** record (or ALIAS/ANAME if your registrar uses that) pointing to the value Vercel shows.
   - **`www`:** often a **CNAME** to `cname.vercel-dns.com` or similar — use exactly what Vercel lists for your project.

Save DNS at the registrar and wait for propagation (often minutes, sometimes up to 48 hours). Vercel issues **HTTPS** automatically once DNS validates.

### 4. Day-to-day workflow

- Edit the site (e.g. `src/content/resume.md`), **commit**, **push** to `main`.
- Vercel **builds and deploys** automatically. The live site updates after the deployment finishes.

You can see build logs and previews for each deployment in the Vercel dashboard.

### Optional: Vercel CLI

Install the [Vercel CLI](https://vercel.com/docs/cli), run `vercel` in this directory, and log in. Useful for quick previews; **production** hosting for a custom domain is still usually driven by **Git push** to the connected branch.

---

### Other hosts (short)

| Platform | Build / output |
|----------|----------------|
| [Netlify](https://docs.netlify.com/configure-builds/common-configurations/#vite) | `npm run build` → `dist` |
| [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite-site/) | same |
| [GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages) | deploy `dist` via Actions or `gh-pages`; set `base` in Vite only if the site is not at domain root |

**DNS:** At your registrar, point `rkellar.me` (and `www`) to the host’s records. Each provider’s UI walks you through it.

## Why React here

React lets you grow beyond a single Markdown page (layouts, animation, blog, etc.) while keeping copy in Markdown for easy edits.
