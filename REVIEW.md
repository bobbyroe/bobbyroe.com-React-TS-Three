# Code Review Findings

## 1. Silent fetch failure — no `.catch()` on YouTube oEmbed request

**File:** `src/VideoFeature.tsx:32`

No error handler on `fetchRandomVideoData().then(...)`. A network error or rejected promise leaves the component showing "Loading..." forever with no user feedback.

**Scenario:** User is offline or YouTube's oEmbed endpoint is unreachable → `fetch()` throws → unhandled rejection → `setVideoData` never called → permanent "Loading..." state.

---

## 2. `res.ok` unchecked before `res.json()`

**File:** `src/VideoFeature.tsx:30`

Non-2xx HTTP responses (404 for a deleted/private video, 429 rate-limit) are parsed as JSON anyway. `data.html` comes back `undefined`, `setVideoData` is called with `{html: undefined, title: undefined}`, and `dangerouslySetInnerHTML={{ __html: undefined }}` renders a blank div — broken UI with no loading indicator.

---

## 3. Stale texture dependencies in `useMemo`

**File:** `src/HeroBackground.tsx:173`

`useMemo` dep array is `[glb]` but the factory reads `woodMap`, `woodNormalMap`, and `woodRoughnessMap`. If those loaders resolve after `glb` (Suspense boundary reset, error recovery), the wood `MeshStandardMaterial` holds stale or disposed texture references and the box renders black.

**Fix:** Add the three texture values to the dep array.

---

## 4. GPU memory leak — geometries and materials never disposed

**File:** `src/HeroBackground.tsx:106`

`TorusKnotGeometry`, `TeapotGeometry`, `IcosahedronGeometry`, `RoundedBoxGeometry`, and their associated materials are created inside `useMemo` but never `.dispose()`d. On HMR save or any component remount, new GPU resources are allocated and the old ones are orphaned.

**Fix:** Return a cleanup function from `useMemo` (or a `useEffect`) that calls `.dispose()` on each entry's geometry and material.

---

## 5. Duck material borrowed from GLTFLoader cache — not cloned

**File:** `src/HeroBackground.tsx:115`

`duckMaterial` is assigned directly from the GLB mesh (`duckMaterial = meshMaterial`) without cloning. If disposal is ever added to fix #4, `duckMaterial.dispose()` destroys the material inside the shared loader cache. A subsequent remount gets back a disposed material and the duck renders black.

**Fix:** `duckMaterial = meshMaterial.clone()`.

---

## 6. Unnecessary geometry clone doubles duck's GPU footprint

**File:** `src/HeroBackground.tsx:113`

`child.geometry.clone()` duplicates all vertex/normal/UV buffers in CPU and GPU memory. The original GLB geometry is unused afterward, so the clone is wasteful — especially on integrated GPUs and mobile.

**Fix:** Use `child.geometry` directly (after fixing #5 so disposal is safe), or skip the clone and scale via a mesh's `scale` property instead.

---

## 7. `videoUrls` declared inside component body — infinite-loop trap

**File:** `src/VideoFeature.tsx:10`

`videoUrls` is a static constant reconstructed on every render. As written it's harmless (the `useEffect` dep array is `[]`), but if `exhaustive-deps` lint is applied and `videoUrls` is added to the deps, the array is a new reference every render and the effect fires in an infinite fetch loop.

**Fix:** Move `videoUrls` to module scope.

---

## 8. `index < 4` magic number ties orbit behavior to array position

**File:** `src/HeroBackground.tsx:55`

Which meshes orbit is determined by their index in the `entries` array, not by a property on `MeshEntry`. Inserting or reordering an entry silently reassigns orbit behavior with no warning.

**Fix:** Add an `orbit: boolean` field to `MeshEntry` and check that instead.

---

## 9. Redundant `position.z` write on every animation frame

**File:** `src/HeroBackground.tsx:54`

`ref.current.position.z = entry.z` runs inside `useFrame` for all 6 meshes at 60 fps. `entry.z` is a constant that never changes, so this is 360 no-op writes per second, each marking the mesh matrix dirty.

**Fix:** Set `position.z` once on mount in a `useEffect` and remove it from `useFrame`.
