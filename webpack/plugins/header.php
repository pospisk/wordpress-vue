<?php status_header(200); ?> <!doctype html><html <?php language_attributes(); ?> class="no-js no-svg"><head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="profile" href="http://gmpg.org/xfn/11"><link rel="manifest" href="/wp-content/themes/pospisk/src/static/manifest.json"> <?php wp_head(); ?> <title>pospisk</title><link href="/styles.css" rel="stylesheet"></head><body <?php body_class(); ?>> <?php wp_body_open(); ?> <div id="preloader"><style>.loader {
          -webkit-filter: url("#goo");
                  filter: url("#goo");
          position: relative;
          width: 500px;
          height: 100px;
        }
        .loader::after {
          content: '';
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #181818;
          margin: 0 auto;
          position: absolute;
          top: 25px;
          left: 225px;
          -webkit-animation: scale 2.5s ease-in-out infinite;
                  animation: scale 2.5s ease-in-out infinite;
        }
        .loader div {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #181818;
          top: 35px;
          left: 235px;
          -webkit-animation: move 2.5s ease-in-out infinite alternate;
                  animation: move 2.5s ease-in-out infinite alternate;
        }
        .loader div::after, .loader div::before {
          content: '';
          display: block;
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #181818;
        }
        .loader div::before {
          left: -75px;
        }
        .loader div::after {
          left: 75px;
        }

        @-webkit-keyframes move {
          0% {
            -webkit-transform: translateX(-150px);
                    transform: translateX(-150px);
          }
          100% {
            -webkit-transform: translateX(150px);
                    transform: translateX(150px);
          }
        }

        @keyframes move {
          0% {
            -webkit-transform: translateX(-150px);
                    transform: translateX(-150px);
          }
          100% {
            -webkit-transform: translateX(150px);
                    transform: translateX(150px);
          }
        }
        @-webkit-keyframes scale {
          10% {
            -webkit-transform: scale(1);
                    transform: scale(1);
          }
          50% {
            -webkit-transform: scale(1.25);
                    transform: scale(1.25);
          }
          90% {
            -webkit-transform: scale(1);
                    transform: scale(1);
          }
        }
        @keyframes scale {
          10% {
            -webkit-transform: scale(1);
                    transform: scale(1);
          }
          50% {
            -webkit-transform: scale(1.25);
                    transform: scale(1.25);
          }
          90% {
            -webkit-transform: scale(1);
                    transform: scale(1);
          }
        }
        html, body {
          background: #f2f2f2;
          width: 100%;
          height: 100%;
        }

        body {
          display: -webkit-box;
          display: flex;
          -webkit-box-align: center;
                  align-items: center;
          -webkit-box-pack: center;
                  justify-content: center;
          overflow: hidden;
        }

        svg {
          position: absolute;
          z-index: -100;
          pointer-events: none;
        }</style><div class="loader"><div></div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="goo"><fegaussianblur in="SourceGraphic" stddeviation="15" result="blur"></fegaussianblur><fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo"></fecolormatrix><feblend in="SourceGraphic" in2="goo"></feblend></filter></defs></svg></div><script src="/scripts/index.js"></script></body></html>