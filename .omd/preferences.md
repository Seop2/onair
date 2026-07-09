---
schema: omd.preferences/v1
design_md_hash_at_creation:
---

# Preference Log

## 2026-07-07T08:08:34.156Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mradadm4_487ef1c3
timestamp: 2026-07-07T08:08:34.156Z
scope: visualTheme
signal: ambient
confidence: inferred
status: dismissed
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/components/layout/global-layout.tsx"
```

~~Introduced off-scale border radius rounded-lg(8px)~~ — false positive; see correction below.

## 2026-07-09T02:41:24.954Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwhcyi_5e4a3b6a
timestamp: 2026-07-09T02:41:24.954Z
scope: visualTheme
signal: ambient
confidence: inferred
status: dismissed
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/components/ui/card.tsx"
```

~~Introduced off-scale border radius rounded-lg(8px)~~ — false positive; see correction below.

## 2026-07-09T02:41:35.914Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwhley_23404ade
timestamp: 2026-07-09T02:41:35.914Z
scope: visualTheme
signal: ambient
confidence: inferred
status: dismissed
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/components/posts/create-post-button.tsx"
```

~~Introduced off-scale border radius rounded-lg(8px)~~ — false positive; see correction below.

## 2026-07-09T02:42:00.000Z — rounded-lg-equals-10px-via-theme-inline-override

```omd-meta
id: pref_mrcwi7kn_88df0361
timestamp: 2026-07-09T02:42:00.000Z
scope: spacing
signal: user-correction
confidence: explicit
status: resolved
source_agent: claude-code
source_context: "src/index.css @theme inline radius override"
```

`rounded-lg` equals 10px in this project — NOT the Tailwind default 8px. `src/index.css` sets `@theme inline { --radius-lg: var(--radius); }` and `:root { --radius: 0.625rem; }` (= 10px), overriding the Tailwind v4 default. This matches DESIGN.md §5 Medium (10px) radius scale exactly. Use `rounded-lg` instead of `rounded-[10px]` — they are equivalent and `rounded-lg` is the semantic token. Do NOT flag `rounded-lg` as off-scale in this project.

## 2026-07-09T02:42:28.661Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwiq45_4df58363
timestamp: 2026-07-09T02:42:28.661Z
scope: visualTheme
signal: ambient
confidence: inferred
status: pending
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/components/posts/post-media-carousel.tsx"
```

Introduced off-scale border radius rounded-lg(8px) in /Users/ijinseob/Downloads/onair/src/components/posts/post-media-carousel.tsx — not in DESIGN.md radius scale

## 2026-07-09T02:42:38.079Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwixdr_0d31c508
timestamp: 2026-07-09T02:42:38.079Z
scope: visualTheme
signal: ambient
confidence: inferred
status: pending
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/components/posts/streamer-filter.tsx"
```

Introduced off-scale border radius rounded-lg(8px) in /Users/ijinseob/Downloads/onair/src/components/posts/streamer-filter.tsx — not in DESIGN.md radius scale

## 2026-07-09T02:42:48.316Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwj5a4_ec57d9f2
timestamp: 2026-07-09T02:42:48.316Z
scope: visualTheme
signal: ambient
confidence: inferred
status: pending
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/pages/sign-in-page.tsx"
```

Introduced off-scale border radius rounded-lg(8px) in /Users/ijinseob/Downloads/onair/src/pages/sign-in-page.tsx — not in DESIGN.md radius scale

## 2026-07-09T02:42:49.085Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwj5vh_af592b0b
timestamp: 2026-07-09T02:42:49.085Z
scope: visualTheme
signal: ambient
confidence: inferred
status: pending
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/pages/sign-up-page.tsx"
```

Introduced off-scale border radius rounded-lg(8px) in /Users/ijinseob/Downloads/onair/src/pages/sign-up-page.tsx — not in DESIGN.md radius scale

## 2026-07-09T02:42:49.723Z — introduced-off-scale-border-radius-round

```omd-meta
id: pref_mrcwj6d7_d2d26bcd
timestamp: 2026-07-09T02:42:49.723Z
scope: visualTheme
signal: ambient
confidence: inferred
status: pending
source_agent: claude-code
source_context: "/Users/ijinseob/Downloads/onair/src/pages/forget-password-page.tsx"
```

Introduced off-scale border radius rounded-lg(8px) in /Users/ijinseob/Downloads/onair/src/pages/forget-password-page.tsx — not in DESIGN.md radius scale
