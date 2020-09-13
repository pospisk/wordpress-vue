<template>
  <div class="row navbar-row" id="navbar">
    <b-navbar toggleable="md" type="light" class="col-12">
      <b-navbar-brand to="/" class="pospisk-logo">
        <lottie
          :options="logoOptions"
          :height="auto"
          :width="200"
          v-on:animCreated="logoAnimation"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" id="navbar-toggler">
        <template v-slot:default="{ expanded }">
          <div 
              class="toggler-icon expand"
              v-bind:class="{ close: expanded }"
              ><span></span><span></span><span></span></div>
          <!-- <div class="toggler-icon expand" v-else><span></span><span></span><span></span></div> -->
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <PrimaryMenu :menu="menu" />
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import PrimaryMenu from "./Header/Menu.vue";

import Lottie from "vue-lottie";
import logoData from "../../assets/json/logo-data.json";

export default {
  components: {
    PrimaryMenu,
    lottie: Lottie,
  },

  data() {
    return {
      menu: false,
      scroll: {
        isScrolling: false,
        position: {
          before: 0,
          current: 0,
          delta: 10,
          offset: 150,
        },
      },
      logoOptions: {
        animationData: logoData,
        renderer: "svg",
        autoplay: true,
        loop: false,
      },
      animationSpeed: 1,
    };
  },

  watch: {
    '$route' () {
      const element = document.querySelector("#nav-collapse");
      let isShown = element.classList.contains("show");
      if(isShown){
          this.$root.$emit('bv::toggle::collapse', 'nav-collapse')
      }
    }
  },

  beforeMount() {
    this.fetchMenu();
  },

  methods: {
    fetchMenu() {
      axios
        .get("/wp-json/menus/v1/menus/primary-navigation")
        .then((response) => {
          this.menu = response.data;
        })
        .catch((error) =>
          console.log("Failed to Fetch Menu from WordPress API")
        );
    },
    logoAnimation: function (anim) {
      this.anim = anim;
      setTimeout(() => {
        anim.play();
      }, 1000);
    },
    updateScroll: function(){
      this.scroll.position.current = window.scrollY;
      const navbar = document.getElementById("navbar");

      if( !this.scroll.isScrolling ) {
        this.scroll.isScrolling = true;
        (!window.requestAnimationFrame)
          ? setTimeout(this.autoHideHeader, 250)
          : requestAnimationFrame(this.autoHideHeader);
      }

    },
    autoHideHeader: function(){
      var currentTop = window.scrollY;
      this.checkSimpleNavigation(currentTop);
      this.scroll.position.before = currentTop;
      this.scroll.isScrolling = false;
    },
    checkSimpleNavigation: function(currentTop) {
      const navbar = document.getElementById("navbar");
      if (this.scroll.position.before - currentTop > this.scroll.position.delta) {
        navbar.classList.remove('is-hidden');
        navbar.classList.add('bg');
      }else if( currentTop - this.scroll.position.before > this.scroll.position.delta && currentTop > this.scroll.position.offset) {
        navbar.classList.add('is-hidden');
      }
    }
  },
  mounted(){
    window.addEventListener("scroll", this.updateScroll);
  }
};
</script>
