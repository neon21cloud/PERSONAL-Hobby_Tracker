# Mis Intereses — Interest Tracker

> *A tool for people who are curious about too many things at once.*

Inspired by the video [**"Career strategies for people with too many interests"**](https://www.youtube.com/watch?v=knVaCNiH-8I) by Unordinary Mind.

---

## What is this?

A personal tracker for the fleeting, sudden interests that capture your attention — not a productivity system, not a journal of the usual, but a log of the things that make you stop and think *"wait, this is fascinating"*.

At its core, the app is a **physics-based bubble engine** paired with a **monthly voting system** and **statistical analysis**. Interests live as interactive bubbles on a canvas, connected by elastic cables, growing or shrinking based on how often you vote for them. Every month is a fresh snapshot: what captured your attention this month vs. last month?

### Why bubbles and physics?

The mind doesn't organize knowledge in flat lists. Interests cluster, overlap, attract each other. The physics simulation reflects that: related interests drift together, unrelated ones repel. The visual topology of your map becomes a picture of how you think.

### Scalability and potential beyond personal use

The bubble engine and the statistical layer were built for tracking personal interests, but the underlying architecture is domain-agnostic. The same system could map:

- **Research landscapes** — topics a team is exploring, weighted by engagement over time
- **Product backlogs** — features as bubbles, votes as community upvotes, monthly snapshots as sprint cycles
- **Knowledge graphs** — concepts in a course or book, with connections representing dependencies
- **Team skill inventories** — skills per person, with strength encoded in bubble size
- **Market trend dashboards** — emerging technologies or topics, with monthly vote cadence replaced by a real-time signal

The voting mechanic (one vote per bubble per calendar month, immutable after month-end) creates an honest longitudinal dataset. The statistical view — with per-bubble history, per-category breakdown, period filtering, and an AI narrative — generalizes directly to any domain where you want to track *interest intensity over time*.

---

## Repository structure

```
PERSONAL-Hobby_Tracker/
├── web/                    # Zero-dependency web version (single HTML file)
│   ├── index.html
│   └── README.md
├── electron-app/           # Native desktop app (Windows · macOS · Linux)
│   ├── src/
│   │   ├── index.html      # App UI (adapted from web version)
│   │   └── preload.js      # Electron security bridge
│   ├── assets/             # App icons
│   ├── main.js             # Electron main process
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

Both versions are **fully independent**. The web version requires nothing but a browser. The desktop version requires Node.js to build and produces a standalone `.exe` / `.dmg` / `.AppImage`.

---

## Feature overview (v3)

| Feature | Description |
|---|---|
| **Interactive bubble map** | Physics simulation — repulsion, elastic cables, zoom/pan |
| **Monthly voting** | One vote per bubble per month; historical votes locked immutably |
| **Statistics dashboard** | Category charts, monthly bars, top lists — filterable by period (global / year / month) |
| **Per-bubble detail** | Full vote history timeline, tags, description |
| **Per-category detail** | Aggregated stats, most-voted, oldest |
| **AI narrative** | Calls Pollinations.ai (free, no key) to analyse your curiosity profile |
| **Undo (Ctrl+Z)** | 3-step undo for all map actions |
| **Lock cable length** | Fix the max stretch of any connection |
| **Center on density** | Smart camera centering on the most clustered region |
| **Multi-user** | Up to 3 independent profiles |
| **JSON backup/restore** | Full data portability across devices |
| **Dark / Light theme** | Toggle anywhere, including inside the map |
| **ES / EN** | Full bilingual interface |

---

## License

MIT — use it, fork it, adapt it to your own domain.
