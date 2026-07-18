# 🪨💫 Rocky Desktop Tamagotchi

> Your tiny rocky roommate from *Project Hail Mary* — now as a desktop tamagotchi. Transparent, always-on-top, watches your cursor, knocks back, and does a little mirror dance.

![Rocky idle](docs/screenshots/rocky-idle.png)

[![macOS](https://img.shields.io/badge/macOS-Apple%20Silicon-black?logo=apple)](https://github.com/cozyss/rocky-desktop-tamagotchi)
[![Electron](https://img.shields.io/badge/Electron-37-47848F?logo=electron)](#)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)](#)
[![Version](https://img.shields.io/badge/version-v0.9.0--tamagotchi-blue)](package.json)
[![License](https://img.shields.io/badge/license-MIT%20+Assets%20see%20DISCLAIMER-yellow)](#disclaimer)

---

## ✨ What is this tamagotchi?

Rocky is **276×182 px of pure stone**. No dock icon, no background — just a basalt creature living on your transparent window:

- 👀 **Watches your cursor** (canonical face = gap between the two forearms used in Movie Goodbye)
- 👋 **Short click on torso** → randomly `Movie Goodbye` 👋 or `Knock` ✊ (faces you first, then performs)
- 🫸 **Limbs click-through** → click where his arm is and you click the app behind — no more misclicks
- 🪟 **Drag anywhere on torso** — works across monitors, position saved
- 💃 **5 actions**: `CuteIdle`, `Walk`, `MovieGoodbye`, `Knock`, `MirrorDance`

Think Tamagotchi meets desktop companion — less feeding, more knocking.

### Gallery

| Idle | Walk | Goodbye | Knock |
|------|------|---------|-------|
| ![](docs/screenshots/rocky-idle.png) | ![](docs/screenshots/rocky-walk.png) | ![](docs/screenshots/rocky-goodbye.png) | ![](docs/screenshots/rocky-knock.png) |

**Contact sheet + hitbox viz:**

![Contact sheet](docs/screenshots/rocky-contact-v10.png)
![Hitbox](docs/screenshots/rocky-contact-hitbox.png)
![Idle hitbox](docs/screenshots/rocky-idle-hitbox.png)

Live web preview: https://rocky-motion-lab.on-solid.com/preview.html?v=tighter-hitbox-v13-bigger-up&showHitbox=1
Press **H** to toggle hitbox outline.

---

## 🎮 Features — v0.9.0 / torso-v13 final

- **276×182 tight crop** (was 400×330) — only ~2 px transparent margin
- **Torso-only ellipse hitbox** `rx=46 ry=35 at 138,90` — body interactive, limbs/shadow/corner = pass-through
- **Alpha-aware hysteresis** `enter 36 / leave 18 / radius 5 / misses 2` — shadow never clickable
- **5 film-inspired clips** baked from articulated 11-joint rig
- **Outer facing pivot** so `CuteIdle`/`Walk` animations never fight cursor/viewer facing
- **Transparent, Electron safe**: no opaque stage, no network, ACES + sRGB, DPR capped 1.35, ≤100k tris
- **Drag suppression**: drag never triggers action

## 📦 Install — macOS Apple Silicon

1. Download `Rocky-Desktop-Pet-macOS-Apple-Silicon-v9-torso-v13-final.zip` (116 MB, SHA-256 `94660a7463cd3d8f657a23de823dcbed3ba49272fb43f311e46999eeac024245`) from Releases or `release/` folder in this repo.
2. Unzip → `RockyDesktopPet.app` → `/Applications`
3. First open: if Gatekeeper says damaged:

```bash
xattr -dr com.apple.quarantine "/Applications/RockyDesktopPet.app"
open "/Applications/RockyDesktopPet.app"
```

App is ad-hoc signed, not notarized.

## 🕹️ Usage

- **Drag torso** → move anywhere across displays
- **Short click torso** → Goodbye or Knock (viewer-facing)
- **Click limb / transparent** → passes through
- **Right-click** → Walk / Quit menu

## 🛠️ Dev

Node 22 required.

```sh
npm ci
npm run build   # esbuild src/scene.js → rocky3d-tighter-hitbox-v13-bigger-up.js
npm start       # electron .
npm run check
```

Key files: `main.js` (276×182 window + persistence), `src/scene.js` (GLB loader + facing + 5 clips), `index.html` (ellipse hit test), `preview.html` (public tunnel preview).

## 🧬 Two modes in one repo (consolidated)

This repo now consolidates the previous two:

- **Full-fidelity Rocky mode (default)**: Uses `assets/rocky-full-rig-multi-action-final-v2d.glb` — 11 joints, 5 clips, Final Look v4 basalt materials. Looks exactly like movie Rocky. **Assets are NOT MIT — see Disclaimer below.**
- **Clean-room generic mode**: Comes from former `pentapod-desktop-pet`. Delete/rename the GLB, or launch with `?privateAsset=1` or set `private-assets/pet.glb`, and the app falls back to procedural dodecahedron pentapod (100% original, MIT). You can also build `dist/renderer.js` from `src/renderer/scene.js` which contains the generic body + limbs if you remove the GLB.

So you get both: gorgeous Rocky for personal use, plus MIT-safe engine you can publish.

---

## 📚 Credits / Sources

- Rocky & *Project Hail Mary* universe created by Andy Weir — novel + Amazon MGM Studios film. This is a **fan-made tamagotchi**, not affiliated/endorsed by Andy Weir, Penguin Random House, Amazon MGM.
- Official promo STL set used as reference to build articulated rig (Amazon MGM promo archive) — no redistribution license found.
- Three.js r160 MIT, Electron 37 MIT, esbuild MIT
- Procedural fallback model + icon are original.

See `CREDITS.md`, `SOURCES.md` for canonical URLs. Research refs: Official Amazon MGM “Grace Meets Rocky” clip (YouTube t3GaBssOgv8), GIPHY promo loop, Creating Rocky video, trailer transcripts.

---

## ⚠️ Disclaimer / Legal — PLEASE READ

**Fan-made / not official.** This is an independent, non-commercial fan project inspired by *Project Hail Mary*. Not affiliated with, endorsed by, or sponsored by Andy Weir, Andy Weir’s publishers, Amazon MGM Studios, or any related parties. Rocky character/design rights belong to respective rights holders.

**Two asset classes:**

1. **Code & procedural placeholder**: `main.js`, `preload.js`, `src/scene.js`, `index.html`, `preview.html`, docs, shaders, and the procedural dodecahedron model are original and offered under MIT (see `LICENSE`). The abstract icon is original.

2. **Film-derived assets**: `assets/rocky-full-rig-multi-action-final-v2d.glb`, `rocky-fallback-v4.png`, screenshots in `docs/screenshots/` that show Rocky likeness, and any release ZIPs that bundle them are **derived from promotional materials**. We found **no public license permitting redistribution**. They are included here for **personal, non-commercial, educational / portfolio use only** — exactly as the prior `rocky-pet` private build. **You may NOT redistribute the GLB/screenshots/ZIP commercially or as part of a competing product without permission from the rights holder.**

   If you want 100% MIT that you can publish anywhere, use **generic mode**: remove `assets/*.glb` + `docs/screenshots/*.png` + `release/*.zip` and rely on procedural geometry (`private-assets/pet.glb` override). That path is MIT-only and safe.

No trademarks are transferred. Publicity/personality rights not granted. This repo does not provide legal advice — you are responsible for ensuring you have rights for your use. Rights holders may request takedown and we will comply.

**Why we consolidated:** Previously we had `cozyss/pentapod-desktop-pet` (clean MIT) + `cozyss/rocky-desktop-pet` (full Rocky). To avoid confusion, we renamed to `rocky-desktop-tamagotchi` and consolidated both modes in one repo with clear disclaimer. The old pentapod repo now redirects here and will be archived.

---

## ⚖️ License

- **Code**: MIT — see `LICENSE`
- **Assets**: see Disclaimer + `ASSET_POLICY.md` + `LEGAL.md` — film-derived assets are NOT MIT.

---

Made with ☄️ for people who wanted Rocky on their desk. *Three knocks means “I’m here.”*

