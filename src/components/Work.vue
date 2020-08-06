<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
      <div class="col-12">
        <recent-posts-widget>Work</recent-posts-widget>
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

export default {
  components: {
    RecentPostsWidget,
    PagesWidget,
  },
  
  mounted(){

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

    },
};
</script>

<style>
</style>