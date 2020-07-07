# wordpress-vue
In the past I have enjoyed developing themes for WordPress using [_S](https://underscores.me/) but it lacked the features of a PWA. I wanted to create a more fluid user experience and that's when I found [WordPress Vue Theme Starter](https://github.com/EvanAgee/vuejs-wordpress-theme-starter/). The theme is built using Vue.js and the WordPress REST API. Using the PWA approach of Vue.js I have created animations using GSAP for the page transition effects and intro loading effects.

## Install
1. **Clone the repo** inside of your `wp-content/themes/` directory
2. **Navigate to the theme directory in your terminal** and run
   `npm install`
   `npm run watch` for development
   `npm run build` when you're ready to deploy the theme.
3. **Activate the theme** in your WordPress instance.
4. **Update your permalink settings** `(Settings -> Permalinks)` to be **"Day and name"**. If you don't want to use this setting you'll need to update the Vue router so it can find your content correctly. Please note that if you want to use a different permalink structure you'll need to update `./src/router/index.js` so it looks for the correct path.

## Code Organization
All of the code you're going to edit is located in `/src/`. From there it's broken into a few logical directories.
- `/src`
  - `/api` for API requests
  - `/assets` for images mostly
  - `/components` Vue components
  - `/router` vue-router directives
  - `/store` vuex store and modules
  - `/assets/css` CSS styles
  - `/vendor` 3rd party scripts and libraries

All scripts and styles in `/src` are compiled down to the `/dist` directory, which is what you will deploy. **When you're ready to deploy don't deploy the src/ directory.**
