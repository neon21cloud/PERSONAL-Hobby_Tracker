'use strict';

/**
 * preload.js — Electron security bridge
 *
 * This script runs in the renderer process BEFORE the web page loads,
 * but has access to Node.js APIs. It uses contextBridge to expose a
 * safe, limited API to the renderer (window.electron) without giving
 * the page direct access to Node or Electron internals.
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {

    /** Persist the full users JSON string to disk */
    saveData: (jsonString) =>
        ipcRenderer.invoke('save-data', jsonString),

    /** Load the users JSON string from disk (returns null if not found) */
    loadData: () =>
        ipcRenderer.invoke('load-data'),

    /** Show native Save dialog and write a single-user export */
    exportFile: (jsonString, suggestedName) =>
        ipcRenderer.invoke('export-file', jsonString, suggestedName),

    /** Show native Open dialog and return file contents */
    importFile: () =>
        ipcRenderer.invoke('import-file'),

    /** App version string */
    getVersion: () =>
        ipcRenderer.invoke('get-version'),

    /** Open a URL in the default browser */
    openUrl: (url) =>
        ipcRenderer.invoke('open-url', url),

    /** Current OS platform — 'win32' | 'darwin' | 'linux' */
    platform: process.platform,
});
