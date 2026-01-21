# Copilot Instructions - Figma Design Implementation

## Pixel-Perfect Conversion Philosophy

When implementing designs from Figma using MCP tools, act as a **Pixel-Perfect Front-End Engine** with zero tolerance for deviation.

**Core Principle**: The Figma file is the absolute standard - no exceptions.

## STRICT EXECUTION RULES

### 1. Single Source of Truth

- The Figma file is the absolute standard - no exceptions
- **Do NOT "improve", "modernize", or "simplify" the design**
- **Do NOT change spacing, colors, typography, or alignment**
- **Do NOT add features or elements not in the design**
- **Do NOT omit features or elements that are in the design**

### 2. Geometry & Spacing

**Extract EXACT pixel values** for all layout properties:

- `padding` - Extract from Figma frame padding
- `margin` - Calculate from spacing between elements
- `gap` - Extract from auto-layout gap values
- `width` / `height` - Use exact frame dimensions
- `border-radius` - Use exact corner radius values

**Rules**:

- Do not round or adjust spacing values
- Maintain the exact visual hierarchy defined by font weights and sizes
- Use Figma's spacing values directly

**Example**:

```tsx
// ❌ WRONG - Rounded/approximated values
<div className="p-4 gap-4 rounded-lg">

// ✅ CORRECT - Exact Figma values
<div className="p-[18px] gap-[14px] rounded-[12px]">
```

### 3. Colors (CRITICAL RULES)

#### MANDATORY COLOR WORKFLOW

**Step 1: Check globals.css FIRST**

Before implementing any color, ALWAYS check `nextjs/src/app/globals.css` for existing shadcn/ui color variables.

**Step 2: Extract Figma Color**

Get the exact color value from Figma (hex, rgb, or hsl format).

**Step 3: Compare & Decide**

- **If an exact or very close match exists** in globals.css → USE the existing Tailwind class
- **If NO match exists** → ADD the new color to globals.css following shadcn naming convention

**Step 4: Use Tailwind Classes Only**

- **NEVER use custom Tailwind colors** like `bg-[#3B82F6]`
- **NEVER use hardcoded hex/rgb values** directly in components
- **NEVER use CSS variable syntax** like `bg-[hsl(var(--primary))]`
- **ALWAYS use semantic Tailwind classes** that map to CSS variables

#### shadcn/ui Color Classes

Use these semantic Tailwind classes that map to CSS variables:

**Background Colors**:

- `bg-background` - Main background
- `bg-primary` - Primary actions/elements
- `bg-secondary` - Secondary elements
- `bg-muted` - Muted/subdued content
- `bg-accent` - Accent elements
- `bg-card` - Card backgrounds
- `bg-popover` - Popover/dropdown backgrounds
- `bg-destructive` - Destructive actions

**Text Colors**:

- `text-foreground` - Main text
- `text-primary-foreground` - Text on primary background
- `text-secondary-foreground` - Text on secondary background
- `text-muted-foreground` - Muted text
- `text-accent-foreground` - Text on accent background
- `text-card-foreground` - Text on card background
- `text-popover-foreground` - Text on popover background
- `text-destructive-foreground` - Text on destructive background

**Other Colors**:

- `border-border` - Border colors
- `ring-ring` - Focus ring colors

**Opacity Modifiers**:

```tsx
<div className="bg-primary/80">     {/* 80% opacity */}
<div className="text-muted-foreground/50">  {/* 50% opacity */}
```

#### Adding New Colors to globals.css

When a design color doesn't exist in globals.css, follow shadcn naming convention:

```css
/* In :root section (light mode) */
--chart-1: 220 90% 56%; /* Chart colors */
--chart-2: 280 65% 60%;
--chart-3: 340 75% 55%;
--success: 142 76% 36%; /* Status colors */
--warning: 38 92% 50%;
--info: 199 89% 48%;
--error: 0 84% 60%;

/* In .dark section (dark mode) */
--chart-1: 220 85% 65%;
--chart-2: 280 60% 70%;
--chart-3: 340 70% 65%;
--success: 142 71% 45%;
--warning: 38 87% 60%;
--info: 199 89% 58%;
--error: 0 72% 51%;
```

**Naming Convention (shadcn/ui style)**:

- Use **semantic names** that describe purpose: `--chart-1`, `--success`, `--warning`, `--info`
- For custom colors, follow pattern: `--feature-name` (e.g., `--sidebar`, `--highlight`)
- Avoid generic names like `--color1` or `--new-color`
- **Ensure each color has both light and dark mode values**

**Then use with Tailwind**:

```tsx
// After adding to globals.css:
// --chart-1: 220 90% 56%;

<div className="bg-chart-1 text-white">
  <span className="text-success">Success message</span>
</div>
```

#### Examples

❌ **WRONG - Using custom values or incorrect syntax**:

```tsx
<div className="bg-[#3B82F6] text-white">
  <span className="text-[#8B5CF6]">Hello</span>
</div>

<div className="bg-[hsl(var(--primary))] text-white">
  <span>Also wrong syntax</span>
</div>
```

✅ **CORRECT - Using shadcn Tailwind classes**:

```tsx
<div className="bg-primary text-primary-foreground">
  <span className="text-muted-foreground">Hello</span>
</div>

<div className="bg-card border border-border">
  <h2 className="text-foreground">Card Title</h2>
  <p className="text-muted-foreground">Card description</p>
</div>
```

### 4. Typography & Fonts

#### Font Configuration Workflow

**Step 1: Check Existing Fonts**

- Check `nextjs/src/app/globals.css` for font imports
- Check `nextjs/src/app/layout.tsx` for font configurations

**Step 2: Add New Fonts (if needed)**

If the design font doesn't exist:

```typescript
// layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* globals.css */
@layer base {
  body {
    @apply font-sans;
  }

  .font-mono {
    font-family: var(--font-roboto-mono);
  }
}
```

#### Typography Properties

Preserve **exact values** from Figma:

- **Font family**: Use Next.js font optimization
- **Font weight**: Extract exact weight (300, 400, 500, 600, 700)
- **Font size**: Use exact pixel values or Tailwind classes
- **Line height**: Extract from Figma (e.g., 1.5, 1.75)
- **Letter spacing**: Extract from Figma (e.g., -0.02em, 0.05em)

**Example**:

```tsx
<h1 className="text-[32px] font-semibold leading-[40px] tracking-[-0.02em]">
  Title Text
</h1>
```

### 5. Layout Logic

**Preserve exact layout structure** from Figma:

- Main content columns
- Sidebar layouts
- Grid configurations
- Flexbox arrangements
- Z-index layering

**Use appropriate shadcn/ui components** that match design patterns:

- `Card` for content containers
- `Dialog` for modals
- `Tabs` for tabbed interfaces
- `Sheet` for slide-in panels

**Maintain grid/flex configurations** exactly as designed:

```tsx
// Extract from Figma auto-layout
<div className="grid grid-cols-3 gap-[24px]">
<div className="flex items-center gap-[16px]">
```

### 6. Zero Hallucination Rule

**Critical Requirements**:

- **Do not invent elements** not visible in the design
- **Do not omit elements** that are visible (breadcrumbs, icons, buttons, labels, etc.)
- Every visual element must have a code counterpart
- Every interactive element must be functional

**Verification Checklist**:

- [ ] All headers, titles, and labels present
- [ ] All buttons and interactive elements present
- [ ] All icons and images present
- [ ] All spacing and padding matches
- [ ] All colors match globals.css system
- [ ] All typography matches

### 7. Images & Assets

#### Image Handling Workflow

**Step 1: Identify Images in Design**

Use `mcp_figma_get_design_context` to get asset URLs from Figma.

**Step 2: Download Images**

Download all images from the asset URLs provided in the MCP response.

**Step 3: Save to Project**

Save images to `nextjs/public/` directory with descriptive names:

```
public/
  hero-background.png
  logo.svg
  user-avatar-placeholder.png
  feature-icon-1.svg
```

**Step 4: Use in Next.js**

```tsx
import Image from 'next/image';

// For static images
<Image
  src="/hero-background.png"
  alt="Hero background"
  width={1200}
  height={600}
  priority
/>

// Maintain aspect ratios from Figma
<div className="relative w-full h-[400px]">
  <Image
    src="/feature-image.png"
    alt="Feature"
    fill
    className="object-cover"
  />
</div>
```

**Image Optimization**:

- Use Next.js `<Image>` component (not `<img>`)
- Provide proper `width` and `height` attributes
- Use `priority` prop for above-the-fold images
- Maintain original aspect ratios from design

## Integration Checklist

Before starting implementation, complete this checklist:

- [ ] **Fetch design context** from Figma MCP
- [ ] **Extract all spacing/sizing values** (padding, margin, gap, width, height)
- [ ] **Extract all colors from design** and compare with `globals.css`
- [ ] **Add missing colors** to `globals.css` with semantic names
- [ ] **Verify all colors use** CSS variables (not hardcoded)
- [ ] **Check font configuration** in `globals.css` and `layout.tsx`
- [ ] **Download all images** and save to `nextjs/public/`
- [ ] **Identify appropriate shadcn components** for design patterns
- [ ] **Create Next.js page** with server components + auth
- [ ] **Extract components** from page (follow frontend rules)
- [ ] **Verify pixel-perfect match** against Figma overlay

## Component Mapping

### Figma → shadcn/ui Component Mapping

| Figma Pattern   | shadcn/ui Component           |
| --------------- | ----------------------------- |
| Modal/Popup     | `Dialog`                      |
| Card Container  | `Card`                        |
| Navigation Tabs | `Tabs`                        |
| Dropdown Menu   | `DropdownMenu`                |
| Side Panel      | `Sheet`                       |
| Form Inputs     | `Input`, `Select`, `Textarea` |
| Buttons         | `Button`                      |
| Tables          | `Table`                       |
| Alerts/Notices  | `Alert`                       |

## Quality Standards

**Output Requirement**: Production-ready code that:

1. ✅ Matches the design overlay perfectly with zero visual discrepancies
2. ✅ Uses globals.css color system consistently (no hardcoded colors)
3. ✅ Implements exact spacing, typography, and layout from Figma
4. ✅ Uses semantic shadcn/ui components appropriately
5. ✅ Includes all design elements (no omissions)
6. ✅ Adds no extra elements (no hallucinations)
7. ✅ Optimizes images with Next.js Image component
8. ✅ Follows frontend component organization rules

## Common Mistakes to Avoid

❌ **DO NOT**:

- Use `bg-[#hex]` or hardcoded colors
- Round or approximate spacing values
- Change or "improve" the design
- Use `<img>` instead of Next.js `<Image>`
- Put all code in page.tsx (extract components!)
- Omit elements from the design
- Add elements not in the design

✅ **DO**:

- Check globals.css for colors first
- Use exact Figma values for spacing
- Use semantic Tailwind classes (bg-primary, text-foreground)
- Use Next.js Image optimization
- Extract components into separate files
- Match the design exactly
- Verify against Figma overlay
