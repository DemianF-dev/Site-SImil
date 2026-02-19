---
name: cms-orchestrator-pro
description: Expert skill for managing, fixing, and evolving Content Management Systems (Decap CMS, Headless, and Visual Editors).
---

# 🛠️ CMS Orchestrator Pro Skill

This skill provides advanced capabilities to manage site editing mechanics, resolve authentication blockers, and transition between CMS architectures.

## 🧩 CMS Troubleshooting (Decap/Netlify CMS)

### 1. Local Development (The "Login Loop" Fix)
When working locally, the GitHub OAuth often fails. 
- **Action**: Switch `backend.name` to `git-gateway` or use `local_backend: true`.
- **Tooling**: Ensure `npx decap-cms-proxy-server` is running to allow local file system writes.

### 2. Media Management
- **Skill**: Automate the creation of `assets/uploads` and ensure the `public_folder` pathing matches the deployment root.

## 🚀 CMS Alternatives & Evolution

Depending on the project scale, consider these "Next-Gen" switches:

### Option A: CloudCannon (Visual Pro)
- **Best for**: Client-facing visual editing of static HTML/JS.
- **Implementation**: Add a `cloudcannon.config.yml` to define collections.

### Option B: Sanity.io (Headless Power)
- **Best for**: Content-heavy sites with complex relationships.
- **Workflow**: Create a Sanity Studio in a subfolder and map data via GraphQL/Groq.

### Option C: Custom "Live" Preview
- **Skill**: Inject a small script to allow "Alt + Click" on elements to open the corresponding JSON file in the admin panel.

## 🛠️ Commands for CMS Success

- `npx decap-cms-proxy-server`: Start local CMS proxy.
- `grep_search "widget:" admin/config.yml`: Audit field types.
- `write_to_file "admin/config.yml"`: Rapidly reconfigure backends.

> [!TIP]
> Always verify that `content-loader.js` (or equivalent) has an error fallback if the JSON is malformed by a user edit.
