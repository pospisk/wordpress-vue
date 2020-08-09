<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">

  <head>
    <meta
      charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="manifest" href="/wp-content/themes/pospisk/src/static/manifest.json">
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div id="preloader">
      <div id="preloader-inner"></div>
      <style>
        #preloader{
          position: fixed;
          top:0;
          left:0;
          right:0;
          bottom:0;
          height: 100vh;
          width: 100%;
          background-color: #f2f2f2;
          opacity:1;
          transition: all 300ms ease-in;
        }
        #preloader-inner{
          max-width: 320px;
          transform: translate(0%,0%);
          transition: all 500ms ease-in;
        }
      </style>
      <script>console.log("page body created");</script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.1/lottie_light.min.js" integrity="sha512-2YqO78j4RhLItoZr7YdCsbUZ0aPQmnuLUW6k5dibLhWt6erh6fwf50YGTPAmFsQAtnUZPWnfMXE4JRUpqStAcw==" crossorigin="anonymous"></script>
      <script>
        var loaderElement = document.getElementById("preloader-inner");

        lottie.loadAnimation({
          container: loaderElement, // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/wp-content/themes/pospisk/src/assets/json/logo-data.json' // the path to the animation json
        });
      </script>
    </div>