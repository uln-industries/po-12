# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based emulation of the Teenage Engineering PO-12 pocket operator drum machine built with Next.js 15, React 19, and Tone.js for Web Audio API integration. The application runs entirely in the browser and is designed as a Progressive Web App (PWA).

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

### Key Technical Considerations
- **iOS Audio**: Special handling for iOS audio context activation via unmute library
- **Pattern Validation**: Strict validation for imported pattern files (JSON format)
- **Touch/Mouse Handling**: Responsive design with different behaviors for touch vs desktop
- **Local Storage**: Persistent state for patterns, settings, and progress
- **Performance**: Lazy loading of audio samples and efficient re-rendering patterns