# Ocean Theme Design System

A cohesive ocean-inspired color palette for the portfolio website.

## Color Palette

### Primary Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| **White** | `#FFFFFF` | - | Main text, backgrounds, icons |
| **Light Ocean Blue** | `#4A90E2` | `--light-ocean` | Accent color, highlights, links, typewriter text |
| **Ocean Blue** | `#1E3A5F` | `--ocean-blue` | Secondary backgrounds, scrollbar track |
| **Deep Ocean** | `#0F233A` | `--deep-ocean` | Dark backgrounds, footer, preloader |

### Secondary Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| **Imp Text Color** | `#4A90E2` | `--imp-text-color` | Important text, purple class |
| **Scrollbar Hover** | `#6BB6FF` | - | Scrollbar thumb on hover |
| **Light Blue Accent** | `#87CEEB` | - | Footer accents |

### Gradients

#### Section Background
```css
linear-gradient(
  to bottom left,
  rgba(15, 35, 68, 0.9),
  rgba(8, 28, 58, 0.95)
)
```

#### Image Overlay
```css
linear-gradient(
  to bottom left,
  rgba(15, 35, 68, 0.8),
  rgba(8, 28, 58, 0.9)
)
```

## Component Color Applications

### Buttons
- **Background**: Ocean theme blues
- **Hover**: Lighter ocean tones
- **Border**: Matching background colors

### Navigation
- **Background**: Deep ocean with transparency
- **Links**: White text with light ocean underlines
- **Active states**: Light ocean blue

### Cards & Sections
- **Background**: Ocean blue with transparency
- **Borders**: Light ocean blue
- **Hover effects**: Enhanced ocean blue shadows

### Interactive Elements
- **Focus states**: Light ocean blue
- **Hover effects**: Lighter ocean tones
- **Active states**: Deep ocean variations

## Usage Guidelines

1. **Primary Actions**: Use Light Ocean Blue (#4A90E2)
2. **Secondary Actions**: Use Ocean Blue (#1E3A5F)
3. **Backgrounds**: Use Deep Ocean (#0F233A) or gradients
4. **Text**: White (#FFFFFF) on dark backgrounds
5. **Accents**: Light Ocean Blue (#4A90E2) for highlights and important elements

## Implementation

All colors are available as CSS custom properties in `/src/style.css`:

```css
:root {
  --imp-text-color: #4A90E2;
  --ocean-blue: #1E3A5F;
  --light-ocean: #4A90E2;
  --deep-ocean: #0F233A;
}
```

Use the `.purple` class to apply the accent color to any element:
```css
.purple {
  color: var(--imp-text-color) !important;
}
```