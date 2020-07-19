<template>
  <div class="row navbar-row">
    <b-navbar toggleable="md" type="light" class="col-12" id="navbar">
      <b-navbar-brand href="#" class="pospisk-logo">
        <lottie :options="logoOptions" :height="auto" :width="200" v-on:animCreated="logoAnimation"/>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" class="intro intro-hide" is-nav>
        
        <PrimaryMenu :menu="menu"/>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>  
  </div>  
</template>

<style>
</style>

<script>
import axios from "axios";
import PrimaryMenu from "./Header/Menu.vue";

import Lottie from 'vue-lottie';
import logoData from '../../assets/json/logo-data.json';

import gsap from "gsap";
// import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin); 

export default{
  components: {
    PrimaryMenu,
    'lottie': Lottie
  },
 
  data(){
    return{
      menu: false,
      logoOptions: {
        animationData: logoData,
        renderer: 'svg',
        autoplay: true,
        loop: false
        },
        animationSpeed: 1
      }
  },

  beforeMount(){
    this.fetchMenu();
  },

  mounted(){

    
    var body = document.body;
    var ifBodyHome = body.classList.contains('home');
    if (ifBodyHome === false){
      gsap.to(".intro", {duration: 0.5, opacity: 1});
    }

  },

  methods: {
    fetchMenu(){
      axios
        .get('/wp-json/menus/v1/menus/primary-navigation')
        .then(response => {
          this.menu = response.data;
        })
        .catch(error => console.log("Failed to Fetch Menu from WordPress API"))
    },
    logoAnimation: function (anim) {
      this.anim = anim;
      setTimeout(() => {
        anim.play();
      }, 1000);
    },

    stop: function () {
      this.anim.stop();
    },

    play: function () {
      this.anim.play();
    },

    pause: function () {
      this.anim.pause();
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
}
</script>