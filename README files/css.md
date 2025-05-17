# Animal Finder Capstone Project CSS Rubric

1. Global Reset & Box Model
2. Use of CSS Variables
3. Organized CSS Structure
4. Responsive Design
5. Typography Styling
6. Color Scheme & Contrast
7. Flexbox/Grid Usage
8. Button & Input Styling
9. Component Reusability
10. CSS Transitions
11. Hover/Focus Effects
12. Layout Containers -> ```.container```

14. Utility Classes -> ```.selected```
15. Use of Psuedo-classes/elements -> ```.allAnimalsBtn:hover```
16. Shaodws & Borders -> ```border: 3px solid var(--accent);```

18. Theme Customization -> 
```css
.dark{
    --accent: rgb(184, 90, 255);
    --header-bg: black;
    --bg: rgb(37, 37, 37);
    --secondary: rgb(133, 133, 133);
    --card-bg: black;
    --card-text: white;
    --categories-text: white;
    --mammals: rgb(255, 23, 27);
    --birds: rgb(0, 149, 208);
    --reptiles:rgb(0, 128, 0);
    --insects: rgb(232, 197, 0);
}
```
19. Naming Conventions (BEM/Readable) -> ```.selected ```
20. Cleanliness & Commenting -> 
```css
.search-history > li:hover{ /* search history terms */
    color: var(--card-text);
    transition: none;
}
```