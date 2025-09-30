# Assets Folder Structure

This folder contains all static assets for the PERF website.

## Folder Organization

### 📁 `/images/`
- Static images (PNG, JPG, WebP)
- Screenshots, photos, illustrations
- Background images

### 📁 `/gifs/`
- Animated GIFs
- Loading animations
- Interactive elements

### 📁 `/icons/`
- SVG icons
- UI icons (buttons, navigation, etc.)
- Small decorative elements

### 📁 `/logos/`
- Company logos
- Brand assets
- Partner logos

## Usage in Code

Access assets from the public folder using absolute paths:

```jsx
// Images
<img src="/assets/images/hero-bg.jpg" alt="Hero" />

// GIFs
<img src="/assets/gifs/loading-animation.gif" alt="Loading" />

// Icons
<img src="/assets/icons/menu.svg" alt="Menu" />

// Logos
<img src="/assets/logos/perf-logo.png" alt="PERF Logo" />
```

## File Naming Convention

- Use kebab-case: `hero-background.jpg`
- Be descriptive: `loading-spinner.gif`
- Include size when relevant: `logo-small.png`, `logo-large.png`
- Use appropriate formats: `.webp` for photos, `.svg` for icons
