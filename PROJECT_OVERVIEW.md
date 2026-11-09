# Project Overview – Markos bingo number generator

## Syfte
En webbapp som slumpar fram bingonummer inom ett valt intervall (standard 1–36) utan upprepningar. Varje dragning har en "slot machine"-animation. Bakgrunden kan bytas mellan flera stämningsbilder.

## Teknologistack
- **Next.js 15** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** + `tw-animate-css`
- **shadcn/ui-stil** komponenter (`src/components/ui/`) byggda på Radix Slot + `class-variance-authority`
- **framer-motion** – animation av det dragna numret
- **sonner** – toast-notiser
- Ingen backend, ingen databas. Allt state ligger i klienten.

## Arkitektur
```
src/
  app/
    layout.tsx      # Root layout: fonts, BackgroundSwitcher, Toaster
    page.tsx        # Huvudsidan: intervallinput, Generate/Clear, historik
    globals.css     # Tailwind + temavariabler (oklch)
  components/
    BackgroundSwitcher.tsx  # Fast bakgrundsbild + "Change mood"-knapp + länk till bingo-kortgenerator
    ui/                     # button, input, sonner (shadcn-mönster)
  lib/utils.ts      # cn()-helper (clsx + tailwind-merge)
```

## Nyckelfunktioner
- Välj intervall "From"/"To" och generera icke-upprepade nummer.
- Spin-effekt i ~2 s (setInterval 50 ms) innan slutligt nummer väljs.
- Historik över dragna nummer, "Clear" nollställer.
- Enter/Space triggar en dragning.
- "Change mood" (nere till höger) bläddrar mellan bakgrundsbilder.
- "Create bingo cards" (nere till vänster) länkar till https://bingo-generator-ckhw.vercel.app/.

## Bakgrundsbilder
- Definieras som en lista (`url` + `label`) i `BackgroundSwitcher.tsx`.
- Bilderna är **externa URL:er** som laddas via CSS `background-image`. Ny bild = lägg till ett objekt i listan.
- Risk: externa värdar kan ta bort bilder eller blockera hotlinking. För stabilitet kan bilder läggas i `public/` istället.

## Tema, färger & typografi
- Fullskärmsbild som bakgrund, innehållet ligger i ett "glas"-kort: `bg-black/50 backdrop-blur-md border-white/20`.
- Text i vitt (`text-white`, `text-white/80`). Inputs ljusa (`bg-white/70`, mörk text).
- Knappar för flytande kontroller: `bg-black/70 text-white border-white/20 backdrop-blur`.
- Typsnitt: **Geist** (sans) och **Geist Mono** via `next/font/google`.

## Konventioner
- Kod och variabelnamn på engelska, kommentarer får vara på svenska.
- Komponenter som använder state/effekter är markerade med `"use client"`.
- Importalias `@/` → `src/`.
- Kör `npm run lint` och `npx tsc --noEmit` efter ändringar.

## Kommandon
- `npm run dev` – startar dev-server (port 3000)
- `npm run build` / `npm start` – produktionsbygge
- `npm run lint` – ESLint
