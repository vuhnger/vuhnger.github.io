# Company Logos

This folder contains company logos for the experience section.

## Adding New Company Logos

1. **Supported Formats**: PNG, JPG, SVG
2. **Recommended Size**: 80x80px or larger (will be automatically resized)
3. **File Naming**: Use kebab-case format like `company-name-logo.png`

## Current Logos

- `DrDropin_bedrift_primær_positiv.svg` - Dr.Dropin company logo
- `DrDropin_bedrift_primær_negativ.svg` - Dr.Dropin company logo (negative)

## Usage in Code

### Method 1: Import (Recommended for bundled assets)
```typescript
import companyLogo from "../../Assets/company-logo.png";

const experiences = [
  {
    companyLogo: companyLogo,
    companyName: "Company Name",
    // ... other props
  }
];
```

### Method 2: Public folder (For assets that should remain separate)
```typescript
// Place logo in public/images/company-logos/
const experiences = [
  {
    companyLogo: "/images/company-logos/company-logo.png",
    companyName: "Company Name",
    // ... other props
  }
];
```

### Method 3: Fallback (Shows company initial)
```typescript
const experiences = [
  {
    companyLogo: "", // Empty string shows fallback
    companyName: "Company Name",
    // ... other props
  }
];
```

## Optimization Tips

- Use SVG when possible for crisp scaling
- Optimize PNG/JPG files to reduce bundle size
- Consider using a consistent background color (white/transparent)
- Test logos on both light and dark backgrounds