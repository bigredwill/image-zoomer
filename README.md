# React Image Zoomer

A lightweight, controlled React component for image zooming with customizable styling via CSS custom properties.

[![npm version](https://badge.fury.io/js/react-image-zoomer.svg)](https://www.npmjs.com/package/react-image-zoomer)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎛️ **Controlled Component** - Fully stateless, you control the zoom state
- 🎨 **CSS Custom Properties** - Easy theming via CSS variables
- 📱 **Responsive** - Works on desktop and mobile devices
- ♿ **Accessible** - Built with accessibility in mind
- 🪶 **Lightweight** - Zero runtime dependencies
- 📦 **TypeScript** - Full TypeScript support
- 🔧 **Configurable** - Extensive customization options
- 🎯 **Overlay Mode** - Viewport follows mouse cursor for intuitive zooming
- 📐 **Square Lens** - Clean, modern square lens design
- 🎯 **Crosshair** - Precise targeting with customizable crosshair

## Installation

```bash
npm install react-image-zoomer
```

```bash
yarn add react-image-zoomer
```

```bash
pnpm add react-image-zoomer
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { ImageZoomer } from 'react-image-zoomer';
import 'react-image-zoomer/styles/image-zoomer.css';

function App() {
  const [isZooming, setIsZooming] = useState(false);

  return (
    <div>
      <button onClick={() => setIsZooming(!isZooming)}>
        Toggle Zoom
      </button>
      
      <ImageZoomer
        zoom={isZooming}
        src="https://example.com/your-image.jpg"
        alt="Description of your image"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zoom` | `boolean` | - | **Required.** Whether zoom is currently active |
| `src` | `string` | - | **Required.** Image source URL |
| `alt` | `string` | `undefined` | Alt text for accessibility |
| `className` | `string` | `""` | Additional CSS class name |
| `zoomFactor` | `number` | `2.5` | Zoom magnification factor |
| `lensSize` | `number` | `200` | Size of the zoom lens in pixels |
| `viewportWidth` | `number` | `300` | Width of the zoom viewport |
| `viewportHeight` | `number` | `300` | Height of the zoom viewport |
| `viewportPosition` | `"right" \| "bottom" \| "left" \| "top"` | `"right"` | Position of the zoom viewport |
| `viewportOffset` | `number` | `20` | Offset from the image edge in pixels |
| `overlayMode` | `boolean` | `false` | Show viewport as overlay following mouse cursor |
| `showCrosshair` | `boolean` | `true` | Show crosshair at zoom center point |

### Event Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onMouseEnter` | `(event: MouseEvent) => void` | Called when mouse enters the image |
| `onMouseLeave` | `(event: MouseEvent) => void` | Called when mouse leaves the image |
| `onMouseMove` | `(event: MouseEvent, position: {x: number, y: number}) => void` | Called when mouse moves over the image |
| `onImageLoad` | `(event: SyntheticEvent) => void` | Called when image loads successfully |
| `onImageError` | `(event: SyntheticEvent) => void` | Called when image fails to load |

## Advanced Examples

### Custom Zoom Configuration

```tsx
<ImageZoomer
  zoom={isZooming}
  src="/path/to/image.jpg"
  alt="Product image"
  zoomFactor={4}
  lensSize={150}
  viewportWidth={400}
  viewportHeight={400}
  viewportPosition="bottom"
  viewportOffset={30}
/>
```

### Overlay Mode

```tsx
<ImageZoomer
  zoom={isZooming}
  src="/path/to/image.jpg"
  alt="Product image"
  overlayMode={true}
  viewportWidth={300}
  viewportHeight={300}
  lensSize={120}
/>
```

### With Crosshair Customization

```tsx
<ImageZoomer
  zoom={isZooming}
  src="/path/to/image.jpg"
  alt="Product image"
  showCrosshair={true}
  // Customize via CSS custom properties
  className="custom-crosshair"
/>
```

### With Event Handlers

```tsx
<ImageZoomer
  zoom={isZooming}
  src="/path/to/image.jpg"
  alt="Product image"
  onMouseEnter={() => console.log('Zoom activated')}
  onMouseLeave={() => console.log('Zoom deactivated')}
  onMouseMove={(event, position) => {
    console.log('Mouse position:', position);
  }}
  onImageLoad={() => console.log('Image loaded')}
  onImageError={() => console.log('Image failed to load')}
/>
```

## Styling & Theming

The component uses CSS custom properties for easy theming. Import the base styles and customize as needed:

```css
/* Import base styles */
@import 'react-image-zoomer/styles/image-zoomer.css';

/* Customize via CSS custom properties */
.my-custom-zoomer {
  --image-zoomer-zoom-factor: 3;
  --image-zoomer-lens-size: 250px;
  --image-zoomer-lens-border: 3px solid #ff0000;
  --image-zoomer-lens-shadow: 0 8px 16px rgba(255, 0, 0, 0.3);
  --image-zoomer-viewport-bg: #fff5f5;
  --image-zoomer-viewport-border: 2px solid #ff0000;
  --image-zoomer-viewport-radius: 12px;
}
```

### Available CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--image-zoomer-zoom-factor` | `2.5` | Zoom magnification factor |
| `--image-zoomer-lens-size` | `200px` | Size of the zoom lens |
| `--image-zoomer-lens-border` | `2px solid rgba(255, 255, 255, 0.8)` | Lens border style |
| `--image-zoomer-lens-shadow` | `0 4px 8px rgba(0, 0, 0, 0.2)` | Lens shadow |
| `--image-zoomer-lens-bg` | `rgba(255, 255, 255, 0.1)` | Lens background |
| `--image-zoomer-lens-backdrop-filter` | `blur(1px)` | Lens backdrop filter |
| `--image-zoomer-lens-radius` | `4px` | Lens border radius (square design) |
| `--image-zoomer-crosshair-color` | `rgba(255, 255, 255, 0.9)` | Crosshair line color |
| `--image-zoomer-crosshair-size` | `20px` | Crosshair line length |
| `--image-zoomer-crosshair-thickness` | `2px` | Crosshair line thickness |
| `--image-zoomer-crosshair-shadow` | `0 0 4px rgba(0, 0, 0, 0.5)` | Crosshair shadow |
| `--image-zoomer-viewport-border` | `1px solid rgba(0, 0, 0, 0.1)` | Viewport border |
| `--image-zoomer-viewport-shadow` | `0 8px 32px rgba(0, 0, 0, 0.12)` | Viewport shadow |
| `--image-zoomer-viewport-bg` | `#ffffff` | Viewport background |
| `--image-zoomer-viewport-radius` | `8px` | Viewport border radius |
| `--image-zoomer-transition-duration` | `0.2s` | Animation duration |
| `--image-zoomer-transition-timing` | `ease-out` | Animation timing function |
| `--image-zoomer-overlay-backdrop` | `rgba(0, 0, 0, 0.1)` | Overlay mode backdrop |
| `--image-zoomer-overlay-viewport-shadow` | `0 12px 48px rgba(0, 0, 0, 0.2)` | Enhanced shadow for overlay mode |

## Responsive Behavior

The component includes built-in responsive adjustments:

- **Mobile (≤ 768px)**: Smaller lens size, reduced zoom factor
- **Small screens (≤ 480px)**: Further optimized for touch devices
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **High contrast**: Enhanced visibility for accessibility

## Development

### Setup

```bash
git clone https://github.com/yourusername/react-image-zoomer.git
cd react-image-zoomer
pnpm install
```

### Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14.4+
- Android Chrome 88+

## TypeScript

This package includes TypeScript definitions. The main interfaces are:

```tsx
interface ImageZoomerProps {
  zoom: boolean;
  src: string;
  alt?: string;
  className?: string;
  zoomFactor?: number;
  lensSize?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  viewportPosition?: "right" | "bottom" | "left" | "top";
  viewportOffset?: number;
  overlayMode?: boolean;
  showCrosshair?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (
    event: React.MouseEvent<HTMLDivElement>,
    position: { x: number; y: number }
  ) => void;
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name](https://github.com/yourusername)

## Changelog

### v1.0.0
- Initial release
- Controlled zoom component
- CSS custom properties theming
- TypeScript support
- Responsive design
- Accessibility features
- Overlay mode for intuitive mouse-following viewport
- Square lens design for modern aesthetics
- Crosshair for precise zoom targeting