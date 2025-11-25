# Free AI Access Tracker - Project Context

## Project Overview

This project is a curated directory of free access points to frontier AI models. It lists APIs, CLI tools, and agentic IDEs that offer free tiers. The site is built with Astro and aims for a minimalist, high-performance "terminal card" aesthetic.

## Tech Stack

* **Framework**: [Astro](https://astro.build) (Static Site Generation)
* **Styling**: Vanilla CSS (scoped in Astro components)
* **Content**: Markdown (`src/content/models/*.md`, `src/content/updates/*.md`) + JSON Data
* **Build Tooling**: Node.js scripts for data fetching
* **Dependencies**: `sanitize-html` (for safe RSS content rendering), `marked`

## Architecture

### Content Strategy

Models are stored as Markdown files in `src/content/models/`. Updates are in `src/content/updates/`.

* **Manual Entries**: Curated files for tools like `antigravity.md`, `gemini-cli.md`.
* **Static OpenCode**: OpenCode models (`big-pickle.md`, `grok-code.md`) are served as static files to simplify the build.
* **Auto-Generated**: `scripts/fetch-openrouter.js` fetches OpenRouter models with `pricing.prompt === '0'`.

### Key Files

* `src/pages/index.astro`: The main homepage.
  * **Tabs**: Switches between "Models" and "Updates".
  * **Layout**: Uses a dashed-border "terminal card" layout for individual items.
  * **Sorting**: Prioritizes "Google Antigravity" and "Google Gemini CLI".
* `src/pages/updates/[...slug].astro`: Renders individual update pages with a "← Back" link.
* `src/pages/rss.xml.js`: Generates an RSS feed including the **full HTML content** of updates.
* `src/content/config.ts`: Defines schemas for `models` and `updates` collections.

## Design Guidelines

* **Aesthetic**: "Terminal Card" style. Individual items (models, updates) are wrapped in dashed borders.
* **Typography**: **JetBrains Mono** for a developer-focused look.
* **Dark Mode**: Fully supported via media queries.
* **Interactivity**: Copy-to-clipboard for model handles, collapsible details for OpenRouter.

## Current Status

* **Top Picks**: Google Antigravity and Google Gemini CLI are pinned.
* **OpenRouter**: Displays a "Best Model" highlight and a collapsible list.
* **Updates**: Dedicated tab for news/changelog, fully integrated with RSS.
* **Performance**: Page size optimized (<14KB gzipped).
