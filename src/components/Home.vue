<template>
  <div class="row">
    <div class="col-12">
      <div id="tlIntro" class="row mb-5 d-flex min-vh-80 flex-row-reverse flex-md-row personal__wrapper">
        <div class="col-12 col-lg-6 align-self-center">
          <div class="pospisk-illustration" id="pospisk-illustration">
            <lottie
              :options="illustrationOptions"
              :height="auto"
              v-on:animCreated="illustrationAnimation"
            />
            <div class="pospisk-illustration-bg"></div>
          </div>
        </div>
        <div class="col-12 col-lg-6 align-self-center personal">
          <div class="personal__inner">
            <h1>
              Kristian Pospis
            </h1>
            <h2 class="serif mb-3">
              web developer &amp; designer
            </h2>
            <p>
              I’m a perfectionist who focuses on <strong>front-end</strong> development with a
              passion for creating interactive content.
            </p>
            <p>
              In 2019, I have graduated from <strong>Web Development (B.Sc.)</strong> at UCL in
              Odense, Denmark. Previously I have studied <strong>Multimedia Design and
              Communication (AP)</strong> at EAL (former UCL, 2015) in Odense.
            </p>
            <div class="d-flex flex-row justify-content-center justify-content-lg-start">
                <a class="btn btn-primary btn-cv" :href="kpcvpdfen" download>CV EN🇬🇧</a>
                <a class="btn btn-primary btn-cv" :href="kpcvpdfde" download>CV DE🇩🇪</a>
            </div>
          </div>
        </div>
        <span class="scroll--down"></span>
      </div>
      <div id="tlPosts" class="row min-vh-80 align-items-center maxw-lg">
          <div class="col-12 my-5">
            <recent-posts-widget limit="4" class="home-posts">Latest Work</recent-posts-widget>
          </div>
      </div>
      <div id="tlSkills" class="row min-vh-80 align-items-center maxw-lg">
        <div class="col-12 offset-0 my-5 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h3 class="mb-3 reveal--title">
            My Skills<span class="reveal--box"></span>
          </h3>
          <div class="row">
            <div class="col-12">
              <div class="skills">
                <div class="skill">
                  <img
                    src="../public/img/design.svg"
                    alt="Web development icon; window with centered code brackets"
                    class="skill__icon"
                  />
                  <h4>Developer</h4>
                  <hr />
                  <div class="skill__content">
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
                    <hr />
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
                  </div>
                </div>

                <div class="skill">
                  <img
                    src="../public/img/development.svg"
                    alt="Design icon; pen with crossed ruler"
                    class="skill__icon"
                  />
                  <h4>Designer</h4>
                  <hr />
                  <div class="skill__content">
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
                    <hr />
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
                        Lottie &amp; Bodymovin
                      </li>
                      <li>
                        Photoshop
                      </li>
                      <li>
                        XD / Sketch
                      </li>
                    </ul>
                  </div>
                  <!-- .skill__content -->
                </div>
                <!-- .skill -->
              </div>
              <!-- .skills -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecentPostsWidget from "./widgets/RecentPosts.vue";
import PagesWidget from "./widgets/Pages.vue";

import kpcvpdfen from "../public/kp_cv-en.pdf";
import kpcvpdfde from "../public/kp_cv-de.pdf";

import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

import Lottie from "vue-lottie";
import illustrationData from "../assets/json/illustration-data.json";

export default {
  components: {
    RecentPostsWidget,
    PagesWidget,
    lottie: Lottie,
  },

  data() {
    return {
      animationStatus: false,
      kpcvpdfen: kpcvpdfen,
      kpcvpdfde: kpcvpdfde,
      menu: false,
      logoPlayed: false,
      tlintro: gsap.timeline(),
      tlposts: gsap.timeline(),
      tlskills: gsap.timeline(),
      illustrationAnim: "",
      illustrationOptions: {
        animationData: illustrationData,
        renderer: "canvas",
        autoplay: false,
        loop: false,
        name: "illustration",
      },
      animationSpeed: 1,
    };
  },
  methods: {
    illustrationAnimation: function (anim) {
      this.anim = anim;
      this.illustrationAnim = this.anim;
    },
    initSegment: function() {
      var iAnim = this.illustrationAnim;
      iAnim.playSegments([0, 40], true);
      iAnim.onComplete = () => {
        this.blinkSegment();
      };
    },
    blinkSegment: function() {
      var iAnim = this.illustrationAnim;
      iAnim.playSegments([40, 65], true);
      iAnim.onComplete = () => {
        setTimeout(() => {
          this.blinkSegment();
        }, 6500);
      };
    },
    illustrationStart: function() {
      this.initSegment();

      this.mouseTrackerOn();

      window.addEventListener("click", (e) => {
        this.blinkSegment();
      });
    },
    mouseToEye: function () {
      var e;
      if (event) {
        e = event;
      } else {
        console.error("event not found");
      }
      var illustration = document.querySelector("#pospisk-illustration div");

      if (illustration) {
        var illustrationOffset = illustration.getBoundingClientRect();

        var elementTop = illustrationOffset.top;
        var elementLeft = illustrationOffset.left;
        var elementWidth = illustrationOffset.width;
        var elementHeight = illustrationOffset.height;

        const x = e.pageX - [elementWidth / 2 + elementLeft];
        const y = e.pageY - [elementHeight / 2 + elementTop];

        const pagex = x / 100;
        const pagey = y / 100;

        gsap.to("#left-eyeball", {
          x: pagex,
          y: pagey,
          duration: 1,
        });
        gsap.to("#right-eyeball", {
          x: pagex,
          y: pagey,
          duration: 1,
        });
      } else {
        this.mouseTrackerOff();
      }
    },
    mouseTrackerOn: function () {
      window.addEventListener("mousemove", this.mouseToEye);
      this.animationStatus = true;

    },
    mouseTrackerOff: function () {
      window.removeEventListener("mousemove", this.mouseToEye);
      this.animationStatus = false;

      // reset the eyes
      gsap.to("#left-eyeball", {
        x: 0,
        y: 0,
        duration: 1,
      });
      gsap.to("#right-eyeball", {
        x: 0,
        y: 0,
        duration: 1,
      });
    },
    updateScroll: function() {
      const scrollPosition = window.scrollY;
      const homeClassList = document.body.classList.value;
      
      const isHome = homeClassList.match(/vue--page--home/g);

      if(isHome !== null){

        if (scrollPosition > 350) {

          if (this.animationStatus === true) {

            this.mouseTrackerOff();

          }

        } else {

          if (this.animationStatus === false) {

            this.mouseTrackerOn();

          }
        }
      }

    },
    destroyTlSt: function(){
      this.killTimeline(this.tlintro);
      this.killTimeline(this.tlposts);
      this.killTimeline(this.tlskills);

      ScrollTrigger.getAll().forEach(t => t.kill());
    },
    killTimeline: (timeline) => {
      const targets = timeline.getChildren();
      
      timeline.kill();
      
      for(let i = 0; i < targets.length; i++) {
        if(targets[i].targets().length) {
          gsap.set(targets[i].targets(), {clearProps:"all"});
        }
      }
    }
  },
  created(){
    window.document.title = "Kristián Pospiš - pospisk";

    var meta_desc = document.createElement('meta');
    meta_desc.setAttribute('name', 'description');
    meta_desc.setAttribute('content', 'Kristian Pospis, professional front-end developer and designer with a passion for interactive content. Based in Denmark and Germany.');
    document.getElementsByTagName('head')[0].appendChild(meta_desc);

    var meta_robots = document.createElement('meta');
    meta_robots.setAttribute('name', 'robots');
    meta_robots.setAttribute('content', 'index');
    document.getElementsByTagName('head')[0].appendChild(meta_robots);
  },
  mounted() {
    if(this.$parent.pageInit == false){
      document.getElementById('my-app').classList.add('block--scrolling');
      this.$parent.pageInit = true;
      var logoWidth = 200 / 2;
      var logoHeight = 66 / 2;
      var windowHeight = window.innerHeight / 2 - logoHeight;
      var windowWidth = window.innerWidth / 2 - logoWidth;

      this.tlintro = gsap.timeline({
        delay: 2.5,
        repeat: 0,
        repeatDelay: 0,
        repeatRefresh: false,
        defaults: {
          ease: "power1.out"
        },
        smoothChildTiming: true,
        autoRemoveChildren: true,
        onComplete: this.illustrationStart,
      });

      if(window.innerWidth < 768){

        this.tlintro
        .from(".pospisk-logo", {
          duration: 0.5, 
          x: windowWidth, 
          y: windowHeight,
          scale: 1.5, 
          z: 999
        })
        .from("#navbar-toggler",
        {
          x: 100,
          duration: 0.5, 
        }, "-=0.5")
        .add(function(){
          document.getElementById('my-app').classList.remove('block--scrolling');
        });
        
      }else{
        this.tlintro
        .from(".pospisk-logo", {
          duration: 0.5, 
          x: windowWidth, 
          y: windowHeight,
          scale: 1.5, 
          z: 999
        })
        .from("#nav-collapse",
        {
          x: 350,
          opacity: 0,
          duration: 0.5,
        })        
        .add(function(){
          document.getElementById('my-app').classList.remove('block--scrolling');
        });
        
      }

    }else{
      this.tlintro = gsap.timeline({
        delay: 0,
        repeat: 0,
        repeatDelay: 0,
        repeatRefresh: false,
        defaults: {
          ease: "power1.out"
        },
        smoothChildTiming: true,
        autoRemoveChildren: true,
        onComplete: this.illustrationStart,
      });
    }

    this.tlintro
      .from(".personal__inner > *", {
        x: "500",
        opacity: 0,
        duration: 1.5,
        ease: "power4.in",
        stagger: 0.1,
      },"-=1")
      .from(".pospisk-illustration-bg", {
        scale: 0,
        duration: 0.5
      })
      .from(".scroll--down", {
        opacity: 0,
        duration: 0.3,
        clearProps: "all"
      });
      

    this.tlposts
      .set('#tlPosts .reveal--title', 
        {
          color: "rgba(0,0,0,0)",
        }
      )
      .fromTo('#tlPosts .reveal--box', 
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 3,
          delay: 2,
          ease: "power4.in",
        }
      )
      .fromTo('#tlPosts .reveal--title', 
        {
          color: "rgba(0,0,0,0)",
        },
        {
          color: "#181818"
        }
      )
      .fromTo('#tlPosts .reveal--box', {
        scaleX: 1,
      }, 
      {
        scaleX: 0,
        duration: 3,
        ease: "power4.out", 
      }
      )
      .from(".post", {
        x: "100vw",
        duration: 2,
        ease: "power4.in",
        stagger: 0.2,
      });

    this.tlskills
      .set('#tlSkills .reveal--title', 
        {
          color: "rgba(0,0,0,0)",
        }
      )
      .fromTo('#tlSkills .reveal--box', 
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 5,
          delay: 2,
          ease: "power4.in",
        }
      )
      .fromTo('#tlSkills .reveal--title', 
        {
          color: "rgba(0,0,0,0)",
        },
        {
          color: "#181818"
        }
      )
      .fromTo('#tlSkills .reveal--box', 
        {
          scaleX: 1,
        }, 
        {
          scaleX: 0,
          duration: 5,
          ease: "power4.out", 
        }
      )
      .from(".skill", {
        y: 600,
        duration: 10,
        ease: "power4.out",
        stagger: 4,
      });

    ScrollTrigger.create({
      trigger: "#tlPosts",
      start: "top bottom-=100",
      end: "top center",
      animation: this.tlposts,
      scrub: true,
      toggleActions: "play none reverse none",
      id: "tlPosts",
    });

    ScrollTrigger.create({
      trigger: "#tlSkills",
      start: "top bottom-=100",
      end: "top center",
      animation: this.tlskills,
      scrub: true,
      toggleActions: "play none reverse none",
      id: "tlSkills",
    });

    window.addEventListener("scroll", this.updateScroll);

  },
  beforeDestroy() {
    this.destroyTlSt();
    this.mouseTrackerOff();
  },
};
</script>

<style></style>
