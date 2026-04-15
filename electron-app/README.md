# Mis Intereses — Desktop App (Electron)

> Native desktop application for Windows, macOS, and Linux.  
> Builds a standalone installer — no browser needed.

---

## What's different from the web version?

| Feature | Web | Desktop |
|---|---|---|
| Storage | `localStorage` (browser) | `localStorage` + auto-backup JSON file in system userData |
| Export | Browser download / File System API | Native OS "Save As" dialog |
| Import | Browser file picker | Native OS "Open" dialog |
| Window | Browser tab | Native app window, no browser chrome |
| Offline | ✅ (after first load of CDN assets) | ✅ (fully offline, all assets local) |
| Auto-save | Manual (Guardar button) | Same, but also writes to disk automatically |

Data is saved in:
- **Windows**: `%APPDATA%\mis-intereses\tracker_data.json`
- **macOS**: `~/Library/Application Support/mis-intereses/tracker_data.json`
- **Linux**: `~/.config/mis-intereses/tracker_data.json`

Backups created with the desktop app are fully compatible with the web version and vice-versa.

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or newer
- npm (comes with Node.js)

---

## Development — run without building

```bash
cd electron-app
npm install
npm start
```

This opens the app in a development window.

---

## Build a distributable

### Windows installer (.exe)

```bash
npm run build:win
```

Output: `dist/Mis Intereses Setup x.x.x.exe`

### macOS disk image (.dmg)

```bash
npm run build:mac
```

### Linux AppImage

```bash
npm run build:linux
```

### All platforms at once

```bash
npm run build:all
```

> **Cross-compilation note**: Building for Windows on macOS/Linux requires Wine. For macOS targets, you must build on macOS. For simplest results, build on the target platform.

---

## App icons

Place your icon files in `assets/` before building:

| File | Platform | Size |
|---|---|---|
| `icon.ico` | Windows | 256×256 (multi-size ICO) |
| `icon.icns` | macOS | Standard ICNS bundle |
| `icon.png` | Linux / fallback | 512×512 PNG |

If icons are missing, Electron uses its default icon. The app runs fine without them.

**Free tools to generate icons:**
- [icoconvert.com](https://icoconvert.com) — PNG → ICO
- [CloudConvert](https://cloudconvert.com) — PNG → ICNS
- [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder) — generates all formats from one PNG

---

## Project structure

```
electron-app/
├── assets/
│   ├── icon.ico        ← Windows icon (add before building)
│   ├── icon.icns       ← macOS icon (add before building)
│   └── icon.png        ← Linux / taskbar icon (add before building)
├── src/
│   ├── index.html      ← Full app UI
│   └── preload.js      ← Electron contextBridge (security layer)
├── main.js             ← Electron main process
├── package.json
└── README.md
```

---

## Architecture notes

**Security model**: `contextIsolation: true` and `nodeIntegration: false` are enforced. The renderer (index.html) can only access Node.js functionality through the explicit `window.electron` API exposed in `preload.js`. This follows Electron's current security best practices.

**Graceful degradation**: `index.html` checks for `window.electron` before using any desktop APIs. If it's not present (e.g., the file is opened directly in a browser), it falls back to `localStorage` and the browser File System API — identical to the web version behaviour.

**IPC channels used**:

| Channel | Direction | Purpose |
|---|---|---|
| `save-data` | renderer → main | Auto-save full user array to disk |
| `load-data` | renderer → main | Load user array from disk on startup |
| `export-file` | renderer → main | Native Save dialog + write single-user JSON |
| `import-file` | renderer → main | Native Open dialog + read JSON |
| `get-version` | renderer → main | Return app version string |
| `open-url` | renderer → main | Open URL in system browser |
