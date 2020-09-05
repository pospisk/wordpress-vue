<template>
  <div id="my-app" class="container-fluid">
    <!-- <Spinner/> -->

    <app-header />
    <div class="row">
      <div class="col-12 p-0">
        <transition
          name="loader-animation"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <progress-bar :show-loader="showLoader" :loader-style="loaderStyle" />
        </transition>
      </div>
    </div>

    <div id="content" class="row content-wrapper">
      <div class="col-12 content-inner">
        <transition
          name="slide-fade"
          mode="out-in"
          enter-active-class="animate__animated animate__backInUp"
          leave-active-class="animate__animated animate__backOutDown"
          @beforeLeave="beforeLeave"
          @enter="enter"
          @afterEnter="afterEnter"
        >
          <router-view :key="$route.fullPath"></router-view>
        </transition>
      </div>
    </div>
    <app-footer />


  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
// import Spinner from "./components/Spinner.vue";
import Header from "./components/partials/Header.vue";
import Footer from "./components/partials/Footer.vue";
import ProgressBar from "./components/partials/ProgressBar.vue";

import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

export default {
  data() {
    return {
      showLoader: true,
      prevHeight: 0,
      pageInit: false,
    };
  },
  mounted() {
    this.pageInit = true;
    window.scrollTo(0,0);
    var preloaderElement = document.getElementById("preloader");
    preloaderElement.remove();
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
      ScrollTrigger.refresh();
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
      loadingProgress: "loadingProgress",
    }),
    
    loaderStyle() {
      return `width: ${this.loadingProgress}%;`;
    },
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    // Spinner,
    ProgressBar,
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this;
        setTimeout(function () {
          self.showLoader = false;
        }, 1000);
      }
    },
  },
};
</script>

<style></style>