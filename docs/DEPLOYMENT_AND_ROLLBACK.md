# FestiveWala — Production Deployment & Rollback Protocol

**Target Domain:** `festivewala.in`  
**Infrastructure:** Cloudflare Pages (Free Plan)  
**CI/CD Pipeline:** GitHub Integration / Automated Builds  
**Last Updated:** November 2026

---

## 1. Production Deployment Workflow

FestiveWala follows a strict Git-driven Continuous Integration & Continuous Delivery (CI/CD) workflow:

```
[ Local Development & Testing ]
            │
            ▼
[ Automated Production Build (`npm run build`) ]
            │
            ▼
[ Pull Request Created -> Cloudflare Preview URL Generated ]
            │
            ▼
[ QA Verification on Isolated Preview Domain ]
            │
            ▼
[ Merge to `main` Branch -> Instant Production Deploy to `festivewala.in` ]
```

### Build Specifications for Cloudflare Dashboard:
- **Build command:** `npm run build` (runs sitemap generator + TypeScript check + Vite production build)
- **Build output directory:** `dist`
- **Root directory:** `/`
- **Environment variables:**
  - `NODE_VERSION`: `20` (ensures Node 20 LTS environment)

---

## 2. Pre-Deployment Verification Checklist

Before triggering a production build to `main`, verify:
- [x] `npm run build` exits with code `0`.
- [x] Zero TypeScript compilation errors (`tsc -b`).
- [x] Public sitemap contains all 22 canonical trilingual routes.
- [x] `dist/_redirects` contains `/* /index.html 200`.
- [x] `dist/_headers` contains complete CSP and caching rules.
- [x] `dist/manifest.json` and `dist/sw.js` are present in the build root.
- [x] No sensitive environment variables (`.env` or private tokens) are committed or referenced.

---

## 3. Instant Rollback Protocol

If a bug or unexpected behavior is detected in a live production deployment, Cloudflare Pages provides **atomic, instant, zero-downtime rollbacks**.

### Rollback Steps (Takes < 15 seconds):
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **festivewala**.
3. Under the **Deployments** tab, locate the list of historical builds.
4. Find the last known stable deployment (each deployment displays its commit message, commit hash, and timestamp).
5. Click the three dots (`...`) menu on the stable deployment card and select **Rollback to this deployment**.
6. Confirm the rollback.

### Propagation & Edge Cache Mechanics:
- **Zero Build Time:** Cloudflare does not recompile the code during a rollback; it points the Anycast edge routing table to the immutable snapshot of that prior deployment.
- **Propagation Speed:** The rollback takes effect across all 330+ Cloudflare edge locations within **under 15 seconds**.
- **Cache Handling:** Because HTML documents are served with `Cache-Control: public, max-age=0, must-revalidate`, user browsers will immediately fetch the rolled-back `index.html` on their next page load without being trapped in stale code.

---

## 4. Cache Purging Procedures

When deploying emergency hotfixes:

### Option A: Standard Deployment (No Manual Purge Needed)
- FestiveWala uses Vite's content-hashed filenames for all assets (`index-DC5H8HGy.js`). When a new deployment is published, asset filenames change automatically. Because `index.html` has `max-age=0`, users immediately request the new asset URLs. **Manual cache purge is usually not required.**

### Option B: Immediate Edge Purge (Emergency Hotfix)
If an immediate global cache purge is required:
1. In Cloudflare Dashboard, go to **Caching** > **Configuration**.
2. Click **Purge Cache**.
3. Select **Purge by URL** for targeted purging (e.g. `https://festivewala.in/`, `https://festivewala.in/index.html`), or select **Purge Everything** for a full global flush.

---

## 5. Monthly Build Limit Conservation (500 Builds/Month)

Cloudflare Pages Free Plan includes **500 builds per month**. To ensure we never approach this quota:
1. **Commit Grouping:** Batch non-functional changes (documentation, comments) into single commits.
2. **Skip CI Commits:** When updating internal documentation in `docs/`, append `[skip ci]` or `[skip-cd]` to the commit message. Cloudflare Pages skips building commits with this tag, saving build quotas.
3. **Local Build First:** Always test locally (`npm run build`) before pushing commits to remote branches.

