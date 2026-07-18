# Asset Policy — rocky-desktop-tamagotchi

## Two classes

1. **MIT code & original art**: Electron main/preload, renderer scene, build scripts, docs, abstract icon, procedural dodecahedron/capsule limbs. MIT.

2. **Film-derived**: `assets/*.glb`, `assets/*.blend`, `rocky-fallback-v4.png`, `docs/screenshots/*` that depict Rocky, `release/*.zip` containing them. No MIT. Personal use only.

## Rules

- Do not add official STL, official GLB, BLEND, or derivatives without clear redistribution license.
- Screenshots that include Rocky likeness should not be used commercially.
- For public forks aiming for 100% MIT, delete class 2 and keep class 1. Use `private-assets/pet.glb` (gitignored) for your own model.
- Keep `LEGAL.md` + `CREDITS.md` + `SOURCES.md` accurate.

## Private override

- Place your own model at `private-assets/pet.glb` (gitignored). Launch with `?privateAsset=1` or set loader to use it.
