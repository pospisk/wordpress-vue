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
    <div class="row my-5">
      <div class="col-12">
        <recent-posts-widget limit="3">Latest Work</recent-posts-widget>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 offset-0 col-md-8 offset-md-2">
        <h3 class="mb-3">My Skills</h3>
        <div class="row">
          <div class="col-12">
            <div class="skills">
              <div class="skill">
                <img src="/wp-content/themes/pospisk/src/static/img/development.svg" alt="Web development icon; window with centerd code brackets" class="skill__icon">
                <h4>Developer</h4>
                <hr>
                <p>
                  <strong class="serif">
                    Languages:
                  </strong>
                  <ul>
                    <li>PHP</li>
                    <li>JavaScript/jQuery</li>
                    <li>HTML</li>
                    <li>CSS / SCSS</li>
                    <li>C# (C-Sharp)</li>
                  </ul>
                </p>
                <hr>
                <p class="mb-0">
                  <strong class="serif">
                    Tools:
                  </strong>
                  <ul class="mb-0">
                    <li>Bootstrap</li>
                    <li>Git/Github</li>
                    <li>NPM</li>
                    <li>Underscores</li>
                    <li>Visual Studio Code</li>
                    <li>Vue.js</li>
                    <li>WordPress / TYPO3</li>
                  </ul>
                </p>
              </div>

              <div class="skill">
                <img src="/wp-content/themes/pospisk/src/static/img/design.svg" alt="Design icon; pen with crossed ruler" class="skill__icon">
                <h4>Designer</h4>
                <hr>
                <p>
                  <strong class="serif">
                    I design:
                  </strong>
                  <ul>
                    <li>Apps</li>
                    <li>Animations</li>
                    <li>Logos</li>
                    <li>Mobile Layouts</li>
                    <li>UI &amp; UX</li>
                    <li>Web Layouts</li>
                  </ul>
                </p>
                <hr>
                <p class="mb-0">
                  <strong class="serif">
                    Tools:
                  </strong>
                  <ul class="mb-0">
                    <li>
                      After Effects / Haiku
                    </li>
                    <li>
                      GSAP
                    </li>
                    <li>
                      Illustrator
                    </li>
                    <li>
                      Photoshop
                    </li>
                    <li>
                      Lottie &amp; Bodymovin
                    </li>
                    <li>
                      XD / Sketch
                    </li>
                  </ul>
                </p>
              </div> <!-- .skill -->

            </div> <!-- .skills -->

          </div>
        </div>
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
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

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
      animationStatus: false,
      menu: false,
      illustrationAnim: '',
      illustrationOptions: {
        animationData: illustrationData,
        renderer: 'canvas',
        autoplay: false,
        loop: false,
        name: 'illustration'
      },
      animationSpeed: 1,
    }
  },
  methods: {
    illustrationAnimation: function(anim) {
      this.anim = anim;
      this.illustrationAnim = this.anim;
    },
    mouseToEye: function(){
      var e;
      if(event){
        e = event;
      }else{
        console.error("event not found");
      }
      var illustration = document.querySelector("#pospisk-illustration div");

      if(illustration){
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
      }else{
        this.mouseTrackerOff();
      }


    },
    mouseTrackerOn: function(){
      window.addEventListener("mousemove", this.mouseToEye);
      this.animationStatus = true;
      // console.log("tracker on");
    },
    mouseTrackerOff: function(){
      window.removeEventListener("mousemove", this.mouseToEye);
      this.animationStatus = false;

      // reset the eyes

      gsap.to("#left-eyeball", {
        x: 0,
        y: 0,
        duration: 1
      });
      gsap.to("#right-eyeball", {
        x: 0,
        y: 0,
        duration: 1
      });

      // console.log("tracker off");
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
    
      if(scrollPosition > 350){
        if(this.animationStatus === true){
          this.mouseTrackerOff();
        }
      }else{
        if(this.animationStatus === false){
          this.mouseTrackerOn();
        }
      }
    },
  },
  mounted(){
     gsap.from(".post", {
      scrollTrigger:{
        trigger: ".latest-posts h3",
        start: 100,
        end: 100,
        toggleActions: "play none reverse none",
      },
      y: 200,
      duration: 0.3,
      stagger: 0.2
    });
    window.addEventListener('scroll', this.updateScroll);

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
    

    const illustrationStart = () => {
      
      initSegment();

      this.mouseTrackerOn();

      window.addEventListener("click", e => { 
        blinkSegment(); 
      });
    }
    
    // var illustration = document.querySelector("#pospisk-illustration div"); 
    // var illustrationOffset = illustration.getBoundingClientRect();
  
    // var elementTop = illustrationOffset.top;
    // var elementLeft = illustrationOffset.left;
    // var elementWidth = illustrationOffset.width;
    // var elementHeight = illustrationOffset.height;
  
    // // Create a timeline
    // let tl = gsap.timeline({
    //   delay: 3.5,
    //   // paused: true, // default is false
    //   repeat: 0, // number of repeats (-1 for infinite)
    //   repeatDelay: 1, // seconds between repeats
    //   repeatRefresh: true, // invalidates on each repeat
    //   // yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
    //   defaults: { // children inherit these defaults
    //     ease: "power1.out"  
    //   },
    //   smoothChildTiming: true,
    //   autoRemoveChildren: true,
    //   onComplete: illustrationStart,
    //   // other callbacks: 
    //   // onStart, onUpdate, onRepeat, onReverseComplete
    //   // Each callback has a params property as well
    //   // i.e. onUpdateParams (Array)
    // });

    // var logoWidth = 200 / 2;
    // var logoHeight = 66 / 2;
    // var windowHeight = window.innerHeight / 2 - logoHeight;
    // var windowWidth = window.innerWidth / 2 - logoWidth;

    // // Sequence multiple tweens
    

    // tl
    // .from(".pospisk-logo", {duration: 0.5, x: windowWidth, y: windowHeight, z: 999})
    // .to(".intro", {duration: 0.5, opacity: 1})
    // .from(".personal *", {duration: 1, x: 300, stagger: 0.1, ease: "power2.out"})
    // .from(".pospisk-illustration-bg", {duration: 1, width:0, height:0, ease: "power2.out"});


    illustrationStart();
    },
};
</script>

<style>
</style>