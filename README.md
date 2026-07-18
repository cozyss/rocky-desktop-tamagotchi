# 🪨💫 Rocky Desktop Tamagotchi

> Your tiny rocky roommate from *Project Hail Mary* — now a desktop tamagotchi. Transparent, always-on-top, watches your cursor, knocks back, does a little mirror dance.

### 🌐 Live Web Preview — Try Rocky in your browser NOW (no download)

**👉 https://rocky-motion-lab.on-solid.com/preview.html**

[![Live Preview](https://img.shields.io/badge/🌐%20LIVE%20PREVIEW-Try%20in%20Browser%20Now-blue?style=for-the-badge&labelColor=000000)](https://rocky-motion-lab.on-solid.com/preview.html)

**What is this?** The real Mac app is a transparent 276×182 window living on your desktop. This web page is a **browser simulation** of that — you see Rocky inside a checkerboard (that checkerboard = transparent on Mac) and can trigger all his actions with buttons.

- Click **Idle / Walk / Goodbye / Knock / Dance** → Rocky performs it, facing you
- Press **H** → show torso-only clickable ellipse (grey = clickable, limbs pass through)
- Works in any modern browser, no install

![Preview - Rocky in browser mock](docs/screenshots/rocky-idle.png)

> Buttons now work! (`postMessage` → `MovieGoodbye`/`Knock`/`CuteIdle`). Verified via headless Chromium: `isReady=true`, 5 clips, `rocky-visible`.

**Direct preview links:**
- Latest: https://rocky-motion-lab.on-solid.com/preview.html
- Versioned v13 final: https://rocky-motion-lab.on-solid.com/preview.html?v=tighter-hitbox-v13-bigger-up
- Hitbox debug on: https://rocky-motion-lab.on-solid.com/preview.html?v=tighter-hitbox-v13-bigger-up&showHitbox=1

---

### ⬇️ Download for Mac — Real transparent app

**👉 [Download v0.9.0 for Mac (Apple Silicon) – 116 MB ZIP](https://github.com/cozyss/rocky-desktop-tamagotchi/releases/download/v0.9.0-tamagotchi/Rocky-Desktop-Tamagotchi-macOS-Apple-Silicon-v0.9.0.zip)**

[![Download Mac](https://img.shields.io/badge/⬇️%20Download%20Mac%20App-v0.9.0-green?style=for-the-badge)](https://github.com/cozyss/rocky-desktop-tamagotchi/releases/download/v0.9.0-tamagotchi/Rocky-Desktop-Tamagotchi-macOS-Apple-Silicon-v0.9.0.zip)

**What you get:** A 276×182 transparent window. No dock icon. Just Rocky sitting on your desktop, always-on-top, torso-only clickable so you never misclick.

---

### 🚀 Quick Start — 10 seconds

1. **Unzip & Move** — Unzip `RockyDesktopPet.app` → drag to `/Applications`
2. **First open (Gatekeeper)**
   ```bash
   xattr -dr com.apple.quarantine "/Applications/RockyDesktopPet.app"
   open "/Applications/RockyDesktopPet.app"
   ```
   If still blocked: System Settings → Privacy & Security → Open Anyway.
3. **Play!**
   - Drag **torso** anywhere — works across monitors, position saved
   - Click **torso** → short click randomly **👋 Goodbye** or **✊ Knock** (turns to face you first)
   - Click **limb / shadow** → passes through to app behind
   - Right-click → Walk / Quit

SHA-256: `94660a7463cd3d8f657a23de823dcbed3ba49272fb43f311e46999eeac024245` • Ad-hoc signed, not notarized

---

### 🎮 What can Rocky do?

| Idle | Walk | Goodbye (Movie) | Knock | Mirror Dance |
|------|------|-----------------|-------|--------------|
| ![](docs/screenshots/rocky-idle.png) | ![](docs/screenshots/rocky-walk.png) | ![](docs/screenshots/rocky-goodbye.png) | ![](docs/screenshots/rocky-knock.png) | 💃 See contact sheet below |

- 😌 **CuteIdle** – breathes, looks at your cursor (face = gap between two forearms, yaw 0.628 rad)
- 🚶 **Walk** – window itself marches across screens
- 👋 **MovieGoodbye** – inner-forearm graze, 5 strokes (like film)
- ✊ **Knock** – 3 taps on xenonite wall
- 💃 **MirrorDance** – awkward puppet sync / Macarena-like mirror

**Contact sheets:**

![Contact](docs/screenshots/rocky-contact-v10.png)
![Hitbox - torso only 46x35](docs/screenshots/rocky-contact-hitbox.png)

---

### 📸 Browser vs Real Mac

- **Browser preview:** checkerboard background = window, buttons below
- **Real Mac:** checkerboard = fully transparent, only Rocky + faint shadow visible, always-on-top

---

### ✨ Features — v0.9.0 / torso-v13 final

- 276×182 tight window (40% smaller than original 400×330)
- Torso-only ellipse hitbox rx=46 ry=35 at 138,90 — limbs click-through
- Alpha hysteresis enter 36 / leave 18 / radius 5 — shadow never clickable
- 11-joint rig, 5 clips, Final Look v4 basalt material
- Outer facing pivot → animations never fight cursor facing
- DPR 1.35, ACES + sRGB, drag never triggers action

---

### 🛠️ Dev (Node 22)

```sh
npm ci
npm run build
npm start
```

Key: `main.js` (276×182 + persistence), `src/scene.js` (GLB + facing), `index.html` (ellipse hit test + postMessage), `preview.html` (polished preview page).

---

### 🧬 Two modes

- **Full-fidelity Rocky (default):** `assets/rocky-full-rig-multi-action-final-v2d.glb` — personal use only, not MIT
- **Clean generic:** delete GLB/PNG/ZIP and use `private-assets/pet.glb` → 100% MIT

### 📚 Credits

- Rocky / Project Hail Mary by Andy Weir — fan-made, not affiliated
- Refs: YouTube t3GaBssOgv8 clip, Creating Rocky video
- Three.js MIT, Electron MIT

### ⚠️ Disclaimer — READ

Fan-made, not official. Rocky design rights belong to holders.

- **Code MIT**
- **Film-derived assets** `assets/*.glb`, fallback PNG, screenshots, ZIPs — promo-derived, personal non-commercial demo only, not MIT, no redistribution license. Don't sell.

See `DISCLAIMER.md` `ASSET_POLICY.md` `LEGAL.md` `CREDITS.md` `SOURCES.md`

---

Made with ☄️ — Three knocks means “I'm here.”  Live preview first, desktop second.
