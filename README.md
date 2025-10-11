# Pitch Black Webpage

A minimalist pitch black webpage built with TypeScript, featuring interactive effects and smooth animations.

## Features

- **Pitch Black Design**: Pure black background with subtle white text
- **Interactive Effects**: Click anywhere for ripple effects
- **Keyboard Controls**: 
  - `SPACE`: Toggle glow effect
  - `ESC`: Reset all effects
- **TypeScript**: Fully typed implementation with modern ES2020 features
- **Responsive**: Works on all screen sizes

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

3. Serve the webpage:
```bash
npm run serve
```

4. Open your browser and navigate to `http://localhost:3000`

### Development

For development with auto-rebuild:
```bash
npm run dev
```

This will watch for changes and automatically recompile the TypeScript code.

## Project Structure

```
├── src/
│   └── index.ts          # Main TypeScript file
├── dist/                 # Compiled JavaScript (generated)
├── index.html           # HTML file with pitch black styling
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Customization

The webpage can be customized by modifying the `WebPageConfig` interface in `src/index.ts`:

```typescript
const config: WebPageConfig = {
    title: 'Your Custom Title',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    glowEffect: true
};
```

## License

MIT License - feel free to use this project as a starting point for your own dark-themed webpages.
