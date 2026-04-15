'use strict';

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs   = require('fs');

// ─── Paths ────────────────────────────────────────────────────────────────────
const DATA_FILE = path.join(app.getPath('userData'), 'tracker_data.json');

// ─── Window ───────────────────────────────────────────────────────────────────
let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:  1280,
        height: 820,
        minWidth:  900,
        minHeight: 600,
        title: 'Mis Intereses',
        // Icon path — place your icon in assets/ before building
        icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
        webPreferences: {
            preload:          path.join(__dirname, 'src', 'preload.js'),
            contextIsolation: true,   // security: keep Node out of renderer
            nodeIntegration:  false,  // security: no direct Node in renderer
            sandbox:          false,  // needed for preload to use require()
        },
        // Native window chrome
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        backgroundColor: '#161625', // matches dark theme — no white flash on load
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    // Remove default application menu (looks more like a native app)
    mainWindow.setMenuBarVisibility(false);

    mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// ─── IPC: Data persistence ────────────────────────────────────────────────────

/**
 * Save the full users array to the userData folder.
 * Called automatically every time the user clicks "Guardar" in the app.
 */
ipcMain.handle('save-data', async (_event, jsonString) => {
    try {
        fs.writeFileSync(DATA_FILE, jsonString, 'utf-8');
        return { ok: true };
    } catch (err) {
        console.error('[save-data]', err);
        return { ok: false, error: err.message };
    }
});

/**
 * Load the users array from disk on startup.
 * Returns null if the file doesn't exist yet.
 */
ipcMain.handle('load-data', async () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return null;
        return fs.readFileSync(DATA_FILE, 'utf-8');
    } catch (err) {
        console.error('[load-data]', err);
        return null;
    }
});

/**
 * Export a single user profile as a .json file.
 * Opens a native Save dialog so the user can choose folder + filename.
 */
ipcMain.handle('export-file', async (_event, jsonString, suggestedName) => {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        title:       'Exportar perfil',
        defaultPath: suggestedName,
        filters:     [{ name: 'JSON', extensions: ['json'] }],
    });
    if (canceled || !filePath) return { ok: false };
    try {
        fs.writeFileSync(filePath, jsonString, 'utf-8');
        return { ok: true, filePath };
    } catch (err) {
        return { ok: false, error: err.message };
    }
});

/**
 * Import: open a native Open dialog and return the file contents.
 */
ipcMain.handle('import-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        title:       'Importar perfil',
        filters:     [{ name: 'JSON', extensions: ['json'] }],
        properties:  ['openFile'],
    });
    if (canceled || !filePaths.length) return null;
    try {
        return fs.readFileSync(filePaths[0], 'utf-8');
    } catch (err) {
        return null;
    }
});

/** Return app version from package.json */
ipcMain.handle('get-version', () => app.getVersion());

/** Open a URL in the default system browser */
ipcMain.handle('open-url', (_event, url) => shell.openExternal(url));
