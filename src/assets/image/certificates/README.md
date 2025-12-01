# Certificate Images

Place your award certificate images in this directory.

## Naming Convention
Use kebab-case naming that matches the award name:
- `ad-scientific-index-2025.jpg`
- `worlds-top-2-percent-2024.jpg`
- `mdec-best-faculty-2022.jpg`
- etc.

## Image Requirements
- **Format**: JPG, PNG, or WebP
- **Recommended size**: 1200px width (will auto-scale)
- **File size**: Keep under 500KB for optimal performance
- **Quality**: High enough to read certificate details when zoomed

## Adding Certificates
1. Save certificate images with descriptive names in this folder
2. Update `data/awards.ts` to link the image to the corresponding award
3. The certificate will appear in the awards section with a "View Certificate" button

## Example
```typescript
{
  name: "MDEC Best Faculty Award 2022",
  category: "Competition",
  institution: "Ministry of Higher Education",
  year: "2023",
  type: "MDEC Best Faculty Award 2022",
  certificateImage: "/src/assets/image/certificates/mdec-best-faculty-2022.jpg"
}
```
