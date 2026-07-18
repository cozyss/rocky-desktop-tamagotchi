const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('rocky', {
  walk: () => ipcRenderer.send('walk'),
  menu: () => ipcRenderer.send('pet-menu'),
  dragStart: (x, y) => ipcRenderer.send('drag-start', {x, y}),
  dragMove: (x, y) => ipcRenderer.send('drag-move', {x, y}),
  dragEnd: () => ipcRenderer.invoke('drag-end'),
  pointerGuard: down => ipcRenderer.send('pointer-guard', down),
  setMousePassthrough: ignore => ipcRenderer.send('mouse-passthrough', ignore),
  onWalk: (fn) => ipcRenderer.on('walk-now', fn),
  onCursor: (fn) => ipcRenderer.on('cursor-position', (_event, point) => fn(point)),
  onHitTestRefresh: fn => ipcRenderer.on('refresh-hit-test', fn),
  onMousePolicy: fn => ipcRenderer.on('mouse-policy', (_event, state) => fn(state))
});
