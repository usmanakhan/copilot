# New Website Project

This is a starter web project with support for HTML, SCSS, JavaScript, Bootstrap, and Swiper.js.

## Features
- HTML5 structure
- SCSS for styling (compiled to CSS)
- Bootstrap 5 for responsive UI
- Swiper.js for sliders/carousels
- Simple build scripts for SCSS

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (includes npm)

### Install dependencies
```
npm install
```

### Build SCSS
To compile SCSS to CSS:
```
npm run build:css
```
Or watch for changes:
```
npm run watch:css
```

### Open the site
Open `index.html` in your browser. All assets are loaded via CDN except your custom CSS/JS.

## File Structure
```
index.html           # Main HTML file
src/main.scss        # Main SCSS source
src/main.js          # Main JavaScript
package.json         # Project scripts and dependencies
dist/main.css        # Compiled CSS (output)
```

## Customization
- Edit `src/main.scss` for styles
- Edit `src/main.js` for JS logic
- Add more HTML/JS/SCSS as needed

## License
MIT
