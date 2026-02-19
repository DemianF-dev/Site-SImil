---
name: autonomous-deploy-master
description: Advanced skill for cross-platform deployment, environmental parity, and automated health checks.
---

# 🛫 Autonomous Deploy Master

Guarantees a "Perfect Deploy" by validating every step from local code to production edge.

## 🛡️ Pre-Flight Check (Automation)

Before any commit or deploy, this skill mandates:
1.  **Environment Sync**: `vercel env pull .env.local` to ensure local tests match cloud reality.
2.  **Asset Integrity**: Check that all images in `assets/` are referenced and have optimized equivalents (WebP).
3.  **JSON Validation**: Run `jq` or a custom script to ensure `data/*.json` files are syntactically perfect.

## 🌪️ Perfect Vercel Pipeline

### 1. Zero-Downtime Config
- **Skill**: Configure `vercel.json` with aggressive caching for assets but zero-cache for `config.yml` during admin updates.

### 2. Smoke Testing
- **Skill**: After deployment, use `read_browser_page` on the preview URL to check for 404s or console errors automatically.

## 🔄 Alternative Deployment Strategies

- **Cloudflare Pages**: Better edge performance for purely static assets.
- **Netlify**: Superior built-in form handling and split testing (A/B testing).

## 🛠️ Performance "Superpowers"

- **Critical CSS Extraction**: Automate the move of above-the-fold CSS into a `<style>` block in `index.html`.
- **Image CDN Mapping**: Suggest moving from local `/assets` to a dedicated Image CDN (Cloudinary/Imgix) for global luxury-tier performance.
