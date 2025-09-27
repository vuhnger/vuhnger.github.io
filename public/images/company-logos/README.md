# Company Logos - Public Directory

This directory contains company logos that are served directly from the public folder.

## Usage
Place company logos here and reference them in your experience data like:

```typescript
const experiences = [
  {
    companyLogo: "/images/company-logos/company-name.png",
    companyName: "Company Name",
    // ... other props
  }
];
```

## Benefits of Public Directory Method
- Logos are not bundled with JavaScript
- Can be loaded on demand
- Easier to update without rebuilding
- Better for large images

## File Naming Convention
- Use lowercase with hyphens: `company-name-logo.png`
- Include file extension
- Keep names descriptive but concise

## Recommended Formats
- SVG: Best for logos, scales perfectly
- PNG: Good for logos with transparency
- JPG: Use only if file size is important and no transparency needed