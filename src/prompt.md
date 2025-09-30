# Website Development Instructions

## Project Setup
- Create new project for new website with support of HTML, SCSS, JS also add bootstrap and swiper.js
- How i can use webpack for this project
- Update packages for node v22.19.0

## Navigation & Layout
- Create navigation with bootstrap with title and links including Home, About, Device and sign-in with responsive please make sure this menu will responsive and fix at top when page scroll
- Make menu item active state when related section in the view, if needed you can JS in main.js

## Content Sections
- Create new section for devices after main swiper that will be product cards using bootstrap, card will be including product name sample image top three features and view details link and buy now button, please make 6 cards and make it in swiper slider, also add badge for limited offer in first card
- Create one more section for about-us with some dummy content about company and insert before device section
- Using bootstrap create new section and add tabs with some dummy content
- Add this above contact section

## Styling & Components
- Add new swiper configuration for devices slider i need three slides at a time instead of one
- Create new helper file for typography and font sizes from 8px to 56px and insert into main.scss
- Make contact us form more visually appealing add css if needed in new helper file _form.scss and include in main.scss

## Code Organization
- Move sort array into new helper-function.js and import inside main.js

## Configuration & Tools
- Create axe-linter.yml and apply basic configuration for HTML check
- Add instruction to ignore dist folder and node_modules
- How i can configure playwright in my project