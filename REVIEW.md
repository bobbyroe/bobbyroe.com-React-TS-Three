# Project Review: bobbyroe.r3f

**Date:** 2026-06-05

**What it is:** A personal landing/course-marketing page for Bobby Roe (Robot Bobby). React + Vite + TypeScript frontend with a WebGPU Three.js canvas background. Clean, polished design.

---

## Bugs & Correctness

**`HeroBackground.tsx` — useMemo missing dependencies (line 107)**
```tsx
}, [glb]); // missing: woodMap, woodNormalMap, woodRoughnessMap
```
The three wood texture loaders are consumed inside `useMemo` but not listed as dependencies. ESLint react-hooks would flag this; in practice it's fine since textures don't change, but it's technically a stale closure.

**`HeroBackground.tsx` — geometry/material leak on unmount**
All the `new THREE.TorusKnotGeometry(...)`, `new THREE.MeshPhysicalNodeMaterial(...)`, etc. created inside `useMemo` are never disposed. When the component unmounts, WebGL resources leak. The `UltraHDREnvironment` cleanup is correct; the mesh entries aren't.

**`VideoFeature.tsx` — no error handling on fetch (line 32)**
```tsx
fetchRandomVideoData().then(data => setVideoData(...))
// no .catch — a failed oEmbed request leaves "Loading..." forever
```

**`VideoFeature.tsx` — `videoUrls` recreated every render (line 10)**
The array is declared inside the component body. Move it outside the component as a module-level `const`.

---

## Security

**Missing `rel="noopener noreferrer"` on all `target="_blank"` links**
Affects `Nav.tsx`, `HeroHeader.tsx`, `Course.tsx`, `VideoFeature.tsx`, `Footer.tsx`. Without this, opened tabs can navigate `window.opener` back (reverse tabnapping). Low real-world risk here, but it's a standard practice.

**`dangerouslySetInnerHTML` with oEmbed response (`VideoFeature.tsx:45`)**
YouTube oEmbed is trustworthy, but the pattern is worth flagging for awareness. Sanitizing or using a YouTube embed URL directly would be the belt-and-suspenders approach.

---

## Code Quality

**`HeroBackground.tsx` — `React.*` namespace vs. named imports**
This file uses `React.useEffect`, `React.useRef`, `React.useMemo` explicitly while all other components use the JSX transform with zero React imports. Pick one style.

**No `<Suspense>` boundary around `useLoader` calls**
`UltraHDRLoader`, `GLTFLoader`, and `TextureLoader` all throw promises until resolved. Without a `<Suspense>` wrapping `<HeroGroup>` / `<UltraHDREnvironment>`, load errors can crash silently or cause unhandled promise rejections.

**`key={index}` in `HeroGroup` (line 199)**
Fine here since entries are static, but worth noting.

**Dead code**
- `Course.tsx:27` — commented-out `<li>` in JSX
- `index.css:40-68` — large commented-out background and canvas slot blocks

---

## Polish

**`index.html` has template title and favicon**
- `<title>Robot Bobby + R3F</title>` — looks like it was never updated from the scaffold
- `<link rel="icon" href="/three.svg">` — still pointing to the default Vite R3F icon

**`HeroBackground.tsx` — mouse scroll offset is fragile (line 73)**
```tsx
pointer.y = -((e.clientY / document.documentElement.scrollHeight) * 2 - 1);
```
Dividing by `scrollHeight` instead of `window.innerHeight` corrects for the sticky canvas, but this breaks if content height changes dynamically (e.g., lazy-loaded sections). `getBoundingClientRect` on the canvas would be more robust.

**`Testimonials.tsx` — section id is `"testimonials"` but nav has no link to it**
Nav links to `#course` and `#video` but not `#testimonials`.

---

## Summary

| Area | Status |
|---|---|
| Core functionality | Solid |
| WebGPU/R3F setup | Well done |
| Memory management | Needs dispose() on mesh entries |
| Error handling | Missing on video fetch |
| Security hygiene | Add `noopener noreferrer` everywhere |
| HTML metadata | Still template defaults (title, favicon) |
| Dead code | Minor cleanup needed |

The biggest actionable items are: **title/favicon**, **`rel="noopener noreferrer"`** sweep, **video fetch error handling**, and **geometry/material disposal** on unmount.
