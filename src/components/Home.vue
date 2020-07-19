<template>
  <div class="row">
    <div class="col-12">
    <div class="row d-flex flex-row-reverse flex-md-row">
      <div class="col-12 col-md-6">
        <div class="pospisk-illustration" id="pospisk-illustration">
           <lottie :options="illustrationOptions" :height="auto" v-on:animCreated="illustrationAnimation"/>
          <div class="pospisk-illustration-bg"></div>
        </div>
      </div>
      <div class="col-12 col-md-6 align-self-center personal">
        <h1>Kristian Pospis</h1>
        <h2 class="serif">web developer &amp; designer</h2>
        <p>
          I’m a perfectionist who focuses on front-end development with a passion for creating interactive content.
        </p>  
        <p>
          In 2019 I have graduated from Web Development (B.Sc) at UCL in Odense, Denmark. Previously I have studied Multimedia Design and Communication (AP) at EAL (former UCL, 2015) in Odense.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Latest Work</h3>

        <recent-posts-widget limit="5" class="mb-10">Recent Posts</recent-posts-widget>
      
        <!-- <div class="work__wrapper">
          
          <div class="work__item">
            <div class="work__header">
              <div class="work__header--image">
                <img src="https://pospisk.github.io/img/digital_reklame_snow.d029d6dd.jpg" alt="Work1" class="img-fluid">
              </div>
            </div>
            <div class="work__body">
              <div class="work__body--title">
                <h4>Digital Reklame Logo</h4>
              </div>
              <div class="work__body--description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis earum reprehenderit, minima nihil cum vel cumque nisi nulla ad...
                </p>
              </div>
            </div>
          </div>

        </div> -->
      </div>
    </div>
  </div>

    
    <!-- <pages-widget limit="5">Pages</pages-widget> -->
  </div>
</template>

<script>
import RecentPostsWidget from './widgets/RecentPosts.vue';
import PagesWidget from './widgets/Pages.vue';

import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import Lottie from 'vue-lottie';
import illustrationData from '../assets/json/illustration-data.json';

export default {
  components: {
    RecentPostsWidget,
    PagesWidget,
    'lottie': Lottie
  },

  data(){
    return{
      menu: false,
      illustrationAnim: "",
      illustrationOptions: {
        animationData: illustrationData,
        renderer: 'canvas',
        autoplay: false,
        loop: false,
        name: 'illustration'
        },
        animationSpeed: 1
    }
  },
  methods: {
    illustrationAnimation: function (anim) {
      this.anim = anim;
      this.illustrationAnim = this.anim;
    },
  },
  mounted(){

    var iAnim = this.illustrationAnim;

    function initSegment(){
      // Lottie Animation Instance 
      iAnim.playSegments([0, 40], true);
  
      // Lottie onComplete Event
      iAnim.onComplete = function(){
        blinkSegment();        
      }
    }

    function blinkSegment(){
      // Lottie Animation Instance 
      iAnim.playSegments([40, 65], true);
      
      // Lottie onComplete Event
      iAnim.onComplete = function(){
        setTimeout(() => {
          blinkSegment();
        }, 6500);
      }
    }
    
    function illustrationStart(){

      initSegment();
    
      window.addEventListener("mousemove", e => {
        var illustration = document.querySelector("#pospisk-illustration div");
        var illustrationOffset = illustration.getBoundingClientRect();
      
        var elementTop = illustrationOffset.top;
        var elementLeft = illustrationOffset.left;
        var elementWidth = illustrationOffset.width;
        var elementHeight = illustrationOffset.height;

        const x = e.pageX - [(elementWidth / 2) + elementLeft];
        const y = e.pageY - [(elementHeight / 2) + elementTop];

        const pagex = x / 100;
        const pagey = y / 100;

        gsap.to("#left-eyeball", {
          x: pagex,
          y: pagey,
          duration: 1
        });
        gsap.to("#right-eyeball", {
          x: pagex,
          y: pagey,
          duration: 1
        });

      });


      window.addEventListener("click", e => { 
        blinkSegment(); 
      });
    }

    //  function createCanvasOverlay(){
    //     // Create a blank div where we are going to put the canvas into.
    //     var canvasContainer = document.createElement('div');
    //     canvasContainer.classList.add('canvas-container');
    //     // Add the div into the document
    //     document.body.appendChild(canvasContainer);
    //     canvasContainer.style.position="absolute";
    //     // Set to 100% so that it will have the dimensions of the document
    //     canvasContainer.style.left="0px";
    //     canvasContainer.style.top="0px";
    //     canvasContainer.style.width="100%";
    //     canvasContainer.style.height="100%";
    //     // Set to high index so that this is always above everything else
    //     // (might need to be increased if you have other element at higher index)
    //     canvasContainer.style.zIndex="1000";

    //     // Now we create the canvas
    //     var myCanvas = document.createElement('canvas');
    //     myCanvas.id = "overlay-canvas";
    //     myCanvas.style.width = canvasContainer.scrollWidth+"px";
    //     myCanvas.style.height = canvasContainer.scrollHeight+"px";
    //     // You must set this otherwise the canvas will be streethed to fit the container
    //     myCanvas.width=canvasContainer.scrollWidth;
    //     myCanvas.height=canvasContainer.scrollHeight;
    //     myCanvas.style.overflow = 'visible';
    //     myCanvas.style.position = 'absolute';
    //     // Add int into the container
    //     canvasContainer.appendChild(myCanvas);
    // }
    
    // var illustration = document.querySelector("#pospisk-illustration div"); 
    // var illustrationOffset = illustration.getBoundingClientRect();
  
    // var elementTop = illustrationOffset.top;
    // var elementLeft = illustrationOffset.left;
    // var elementWidth = illustrationOffset.width;
    // var elementHeight = illustrationOffset.height;
    
    // createCanvasOverlay();
    // var c = document.getElementById('overlay-canvas');
    // var ctx = c.getContext("2d");
    // var ct = c.getContext("2d");
    // ct.beginPath();
    // ct.rect(elementLeft + (elementWidth / 2), elementTop + (elementHeight / 2), 5, 5);
    // ct.stroke();
    // ctx.beginPath();
    // ctx.rect(elementLeft, elementTop, elementWidth, elementHeight);
    // ctx.stroke();

    // Create a timeline
    let tl = gsap.timeline({
      delay: 3.5,
      // paused: true, // default is false
      repeat: 0, // number of repeats (-1 for infinite)
      repeatDelay: 1, // seconds between repeats
      repeatRefresh: true, // invalidates on each repeat
      // yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
      defaults: { // children inherit these defaults
        ease: "power1.out"  
      },
      smoothChildTiming: true,
      autoRemoveChildren: true,
      onComplete: illustrationStart,
      // other callbacks: 
      // onStart, onUpdate, onRepeat, onReverseComplete
      // Each callback has a params property as well
      // i.e. onUpdateParams (Array)
    });

    var logoWidth = 200 / 2;
    var logoHeight = 66 / 2;
    var windowHeight = window.innerHeight / 2 - logoHeight;
    var windowWidth = window.innerWidth / 2 - logoWidth;

    // Sequence multiple tweens
    

    tl
    .from(".pospisk-logo", {duration: 0.5, x: windowWidth, y: windowHeight, z: 999})
    .to(".intro", {duration: 0.5, opacity: 1})
    .from(".personal *", {duration: 1, x: 300, stagger: 0.1, ease: "power2.out"})
    .from(".pospisk-illustration-bg", {duration: 1, width:0, height:0, ease: "power2.out"});

    },
};
</script>

<style>
</style>