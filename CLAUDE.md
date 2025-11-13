# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note:** `AGENTS.md` is the canonical source of repository-wide guidelines. This document mirrors the critical pieces so you do not need to look elsewhere, but always defer to `AGENTS.md` if anything here drifts.

## Project Overview

This is a web-based emulation of the Teenage Engineering PO-12 pocket operator drum machine built with Next.js 16, React 19, and Tone.js for Web Audio API integration. The application runs entirely in the browser and is designed as a Progressive Web App (PWA).

## Development Commands

### Core Commands
- `bun dev` - Start development server (preferred over npm)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Requirements
- Node.js >= 20.0.0
- Bun (package manager and runtime)

## Architecture Overview

### Core Application Structure
- **Next.js App Router**: Uses `src/app/` directory structure with `layout.tsx` and `page.tsx`
- **Component Architecture**: Modular component structure with clear separation between UI and logic
- **State Management**: Local state with custom hooks, persistent state via localStorage
- **Audio Engine**: Tone.js integration for Web Audio API with custom sampler implementation

### Key Architectural Patterns

#### Custom Hooks Pattern
The application heavily uses custom hooks for state management and side effects:
- `usePatterns()` - Manages drum pattern data (16 patterns, each with 16 steps)
- `useSampler()` - Handles audio loading and playback via Tone.js
- `useCurrentBeat()` - Manages playback timing and BPM
- `useSelectedPattern()` - Handles pattern selection and queueing
- `useBPM()` - Manages tempo control
- `useLocalStorage()` - Persistent state management

#### Component Structure
- **PocketOperator**: Main device component containing all UI elements
- **LCD**: Complex display component with multiple sub-components for different UI states
- **POButton/POKnob**: Reusable UI controls that mimic hardware interface
- **InstructionsPaper**: Help system with interactive tutorial

#### Audio Architecture
- Uses Tone.js for Web Audio API abstraction
- Lazy-loads 16 audio samples (1.wav through 16.wav) from sound source URL
- Implements unmute library for iOS audio context handling
- Pattern-based sequencing with 16-step patterns

### Data Models
- **Pattern**: Object with `notes` array of 16 steps, each step contains array of `Note` objects
- **Note**: Simple object with `note` property (1-16 corresponding to drum sounds)
- **BPM**: Numeric tempo value with increment/decrement controls
- **SelectingMode**: Enum for different interaction modes on the device

### Configuration
- **TypeScript**: Configured with path aliases (`@/*` maps to `src/*`)
- **SASS**: Used for component styling with CSS modules
- **PWA**: Configured with custom theme colors and offline support
- **Webpack**: Custom configuration for SVG and audio file handling

## Repository Guidelines (mirrors `AGENTS.md`)

### Project Structure & Module Organization
Source lives under `src/`: `app/` hosts the Next.js 16 route tree, `components/` contains reusable LCD, pocket-operator, and control widgets, `hooks/` keeps shared clock/animation logic, and `lib/` stores lightweight utilities (audio math, data mappers). Global assets, SVGs, and audio live in `public/`. CSS Modules (e.g., `src/components/LCD/lcd.module.scss`) localize styling, so prefer co-locating styles beside the component they serve.

### Build, Test, and Development Commands
- `bun dev` — Runs `next dev` with hot reload; requires Bun and Node 20+. Useful while iterating on figure animators or sampler UI.
- `bun run build` — Production build with type-checking; ensure it passes before opening a PR.
- `bun run start` — Serves the optimized build locally, mirroring Vercel.
- `bun run lint` — Executes the Next/TypeScript ESLint config; fix autofixable issues with `bunx next lint --fix` if needed.

### Coding Style & Naming Conventions
Use TypeScript everywhere. Follow 2-space indentation already present in `src/app/page.tsx`. Components are PascalCase (`PocketOperatorPanel`), hooks begin with `use` and camelCase (`useFigureAnimator`), and CSS Modules follow `*.module.scss`. Prefer refs + DOM class toggles for high-frequency animation to avoid React churn, and keep derived values memoized to limit rerenders.

### Testing Guidelines
Automated tests are not yet wired up, so rely on manual regression passes: verify transport timing, keypad presses, and LCD animations in Chrome + Safari. When adding tests, place them next to the feature (`componentName.test.tsx`) and run through `bun test` (add the script when introducing a framework such as Vitest). Document any new QA steps in the PR so others can reproduce.

### Commit & Pull Request Guidelines
Recent history favors concise, imperative subjects (e.g., `Use rAF beat clock and update AGENTS`). Reference issues or PR numbers in parentheses when relevant. For PRs, include: purpose, key implementation notes (especially around beat clock or animator changes), screenshots or screen recordings for UI tweaks, and a checklist of manual verifications. Keep branches rebased so deploy previews remain clean.

### Animation & Beat Clock Tips
`useFigureAnimator`, `useSpoolAnimator`, and `useCurrentBeat` own high-frequency updates; extend them with refs or subscription APIs instead of adding React state. Prefer partitioning beat data into integer index vs fractional phase, and drive keypad glows via DOM attributes so the React tree keeps its ~16 renders per bar goal.

### Key Technical Considerations
- **iOS Audio**: Special handling for iOS audio context activation via unmute library
- **Pattern Validation**: Strict validation for imported pattern files (JSON format)
- **Touch/Mouse Handling**: Responsive design with different behaviors for touch vs desktop
- **Local Storage**: Persistent state for patterns, settings, and progress
- **Performance**: Lazy loading of audio samples and efficient re-rendering patterns
