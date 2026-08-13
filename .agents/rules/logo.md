# DieabloFX Logo Sizing and Spacing Rule

When editing or implementing the `DieabloFX` logo alongside the text "IEABLO FX" (e.g. in the Navigation or Hero components):

1. **Height Consistency**: The logo (`/dieablofx.svg`) must visually match the height of the text. Do not use random scales or arbitrary `h-` values. The standard is `h-[0.85em]` on the `<img>` element so it perfectly matches the cap-height of the adjacent text.
2. **Spacing Consistency**: Do not use negative margins (e.g. `-ml-[0.025em]`) or arbitrary margin-rights (e.g. `mr-[0.08em]`). Instead, use a flex container with `gap-[0.15em]` (or a similar standardized em-based gap) to ensure consistent spacing between the logo and the text.
3. **No Arbitrary Scaling**: Do NOT use classes like `scale-125` on the logo image. Adjust the height via the `h-` class.

Example of correct implementation:
```tsx
<div className="flex items-center gap-[0.15em]">
  <img 
    src="/dieablofx.svg" 
    alt="DieabloFX Logo" 
    className="h-[0.85em] w-auto object-contain logo-image invert dark:invert-0" 
  />
  <div className="leading-none">
    IEABLO<span className="text-accent">FX</span>
  </div>
</div>
```
