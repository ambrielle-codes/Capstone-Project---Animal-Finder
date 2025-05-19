# Animal Finder Capstone Project CSS Rubric

1. Global Reset & Box Model -> 
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```
2. Use of CSS Variables -> ```--card-text: white;```
3. Organized CSS Structure -> ```/* Button styles*/```
4. Responsive Design ->
```css
@media screen and (max-width: 768px) {...}
```
5. Typography Styling -> ``` font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif```
6. Color Scheme & Contrast -> 
```css
    --accent: rgb(184, 90, 255);
    --header-bg: black;
    --bg: rgb(37, 37, 37);
```
7. Flexbox/Grid Usage -> ```display: flex;```
8. Button & Input Styling -> ```#themeBtn```
9. Component Reusability -> ```.card```
10. CSS Transitions -> ```transition: transform ease-out .1s```
11. Hover/Focus Effects -> ```input:focus```
12. Layout Containers -> ```.container```

14. Utility Classes -> ```.selected```
15. Use of Psuedo-classes/elements -> ```.allAnimalsBtn:hover```
16. Shaodws & Borders -> ```border: 3px solid var(--accent)```

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
19. Naming Conventions (BEM/Readable) -> ```.search-history```
20. Cleanliness & Commenting -> 
```css
.search-history > li:hover{ /* search history terms */
    color: var(--card-text);
    transition: none;
}
```