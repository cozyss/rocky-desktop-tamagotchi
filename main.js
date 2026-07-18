const {app, BrowserWindow, Menu, ipcMain, screen} = require('electron');
const path = require('path');
const fs = require('fs');

let win;
let direction = -1;
let moving = false;
let dragState = null;
let saveTimer = null;
let movementToken = 0;
let cursorTimer = null;
let rendererWantsPassthrough = false;
let pointerDown = false;
let menuOpen = false;
let mouseIgnored = false;
const VERSION = 'tighter-hitbox-v14-movie-dance';
const WINDOW_WIDTH = 276;
const WINDOW_HEIGHT = 182;
const LEGACY_WIDTH = 340;
const LEGACY_HEIGHT = 285;
const LEGACY_CROP_X = 10;
const LEGACY_CROP_Y = 91;

function stateFile() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

function placeNearDesktopCorner() {
  const area = screen.getPrimaryDisplay().workArea;
  return {
    x: Math.round(area.x + area.width - (WINDOW_WIDTH + 20)),
    y: Math.round(area.y + area.height - (WINDOW_HEIGHT + 25))
  };
}

function intersectsDisplay(pos) {
  const candidate = {x: pos.x, y: pos.y, width: WINDOW_WIDTH, height: WINDOW_HEIGHT};
  return screen.getAllDisplays().some(({bounds}) => {
    const width = Math.max(0, Math.min(candidate.x + candidate.width, bounds.x + bounds.width) - Math.max(candidate.x, bounds.x));
    const height = Math.max(0, Math.min(candidate.y + candidate.height, bounds.y + bounds.height) - Math.max(candidate.y, bounds.y));
    return width * height >= 2500;
  });
}

function initialPosition() {
  try {
    const saved = JSON.parse(fs.readFileSync(stateFile(), 'utf8'));
    if (Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      const legacy = saved.version !== VERSION && (saved.width ?? LEGACY_WIDTH) === LEGACY_WIDTH && (saved.height ?? LEGACY_HEIGHT) === LEGACY_HEIGHT;
      const migrated = {x: Math.round(saved.x + (legacy ? LEGACY_CROP_X : 0)), y: Math.round(saved.y + (legacy ? LEGACY_CROP_Y : 0))};
      if (intersectsDisplay(migrated)) return migrated;
    }
  } catch (_) {}
  return placeNearDesktopCorner();
}

function savePosition() {
  if (!win || win.isDestroyed()) return;
  const {x, y} = win.getBounds();
  try { fs.writeFileSync(stateFile(), JSON.stringify({x, y, width: WINDOW_WIDTH, height: WINDOW_HEIGHT, version: VERSION})); } catch (_) {}
}

function scheduleSavePosition() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(savePosition, 180);
}

function syncMousePolicy() {
  if (!win || win.isDestroyed()) return;
  const ignore = rendererWantsPassthrough && !pointerDown && !dragState && !menuOpen;
  if (ignore !== mouseIgnored) {
    mouseIgnored = ignore;
    if (ignore) win.setIgnoreMouseEvents(true, {forward: true});
    else win.setIgnoreMouseEvents(false);
  }
  win.webContents.send('mouse-policy', {ignored: mouseIgnored, rendererWantsPassthrough, pointerDown, dragging: Boolean(dragState), menuOpen});
}

function createWindow() {
  const pos = initialPosition();
  rendererWantsPassthrough = false;
  pointerDown = false;
  menuOpen = false;
  mouseIgnored = false;
  win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x: pos.x,
    y: pos.y,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  win.setAlwaysOnTop(true, 'floating');
  win.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});
  win.loadFile('index.html', {query: {v: VERSION}});
  win.once('ready-to-show', () => win.showInactive());
  win.on('move', scheduleSavePosition);
  win.on('closed', () => { win = null; dragState = null; pointerDown = false; menuOpen = false; mouseIgnored = false; clearInterval(cursorTimer); cursorTimer = null; });
  cursorTimer = setInterval(() => {
    if (!win || win.isDestroyed() || win.webContents.isLoading()) return;
    const cursor = screen.getCursorScreenPoint();
    const b = win.getBounds();
    win.webContents.send('cursor-position', {x: cursor.x - (b.x + b.width / 2), y: cursor.y - (b.y + b.height / 2)});
  }, 50);
}

ipcMain.on('mouse-passthrough', (event, ignore) => {
  if (!win || event.sender !== win.webContents || typeof ignore !== 'boolean') return;
  rendererWantsPassthrough = ignore;
  syncMousePolicy();
});

ipcMain.on('pointer-guard', (event, down) => {
  if (!win || event.sender !== win.webContents || typeof down !== 'boolean') return;
  pointerDown = down;
  syncMousePolicy();
});

ipcMain.on('drag-start', (event, point) => {
  if (!win || event.sender !== win.webContents) return;
  movementToken += 1;
  moving = false;
  pointerDown = true;
  const [windowX, windowY] = win.getPosition();
  const cursor = point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : screen.getCursorScreenPoint();
  dragState = {mouseX: cursor.x, mouseY: cursor.y, windowX, windowY};
  syncMousePolicy();
});

ipcMain.on('drag-move', (event, point) => {
  if (!win || !dragState || event.sender !== win.webContents) return;
  const cursor = point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : screen.getCursorScreenPoint();
  const x = Math.round(dragState.windowX + cursor.x - dragState.mouseX);
  const y = Math.round(dragState.windowY + cursor.y - dragState.mouseY);
  win.setPosition(x, y, false);
});

ipcMain.handle('drag-end', (event) => {
  if (!win || event.sender !== win.webContents || !dragState) return false;
  const cursor = screen.getCursorScreenPoint();
  const [x, y] = win.getPosition();
  const moved = Math.hypot(cursor.x - dragState.mouseX, cursor.y - dragState.mouseY) > 3 ||
    Math.hypot(x - dragState.windowX, y - dragState.windowY) > 3;
  dragState = null;
  pointerDown = false;
  syncMousePolicy();
  savePosition();
  return moved;
});

ipcMain.on('walk', async () => {
  if (!win || moving) return;
  if (dragState) dragState = null;
  moving = true;
  const token = ++movementToken;
  const area = screen.getDisplayMatching(win.getBounds()).workArea;
  let {x, y, width} = win.getBounds();
  if (x < area.x + 20) direction = 1;
  if (x + width > area.x + area.width - 20) direction = -1;
  const stepBob = [0, -2, -5, -3, 0, -2, -5, -3];
  for (let i = 0; i < 32; i++) {
    if (!win || token !== movementToken || dragState) break;
    x += direction * 3.1;
    win.setPosition(Math.round(x), Math.round(y + stepBob[i % stepBob.length]), false);
    await new Promise(resolve => setTimeout(resolve, 45));
  }
  if (win && token === movementToken && !dragState) {
    win.setPosition(Math.round(x), Math.round(y), false);
    savePosition();
  }
  if (token === movementToken) moving = false;
});

ipcMain.on('pet-menu', () => {
  if (!win) return;
  menuOpen = true;
  syncMousePolicy();
  Menu.buildFromTemplate([
    {label: 'Walk a little', click: () => win.webContents.send('walk-now')},
    {type: 'separator'},
    {label: 'Quit Rocky', click: () => app.quit()}
  ]).popup({window: win, callback: () => {
    menuOpen = false;
    syncMousePolicy();
    if (win && !win.isDestroyed()) win.webContents.send('refresh-hit-test');
  }});
});

app.whenReady().then(() => {
  app.dock?.hide();
  createWindow();
});
app.on('before-quit', savePosition);
app.on('window-all-closed', () => app.quit());
