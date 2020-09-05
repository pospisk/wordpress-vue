<template>
    <div class="row">
        <div class="col-12">
            <div class="row about">
                <div class="col-12 offset-0 col-lg-4 offset-lg-2">
                    <div class="about__img">
                        <img src="https://pospisk.local/wp-content/themes/pospisk/src/static/img/kristian_pospis.png" alt="">
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xl-6 about__content">
                    <h2 class="mb-0">
                        Kristian Pospis
                    </h2>
                    <h3 class="serif">
                        web developer and designer
                    </h3>
                    <p>
                        I’m a perfectionist who focuses on front-end development with a passion for creating interactive content and UI. I am 24 years old with 13 years of experience in Photoshop and 8 years of expeirence in Illustrator. 
                    </p>
                    <router-link to="" tags="a" class="btn btn-primary">CV</router-link>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12">
                    <timeline-items></timeline-items>
                </div>
            </div>
            <div class="spacer"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Loader from "../partials/Loader.vue";
import TimelineItems from "../widgets/TimelineItems.vue";
import SETTINGS from "../../settings";

import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);


export default {
    components: {
        Loader,
        TimelineItems
    },
    data() {
        return {
            timeline: false,
            tlAbout: gsap.timeline(),
        };
    },

    computed: {},
    beforeMount() {
        // this.getTimeline();
    },
    created() {
        window.document.title = "About - pospisk";
    },
    mounted() {
        // this.tlAbout
        gsap.from(".about__img", {
            x: -300,
            opacity: 0,
            duration: 1,
            ease: "power4.in",
        });
        gsap.from(".about__content", {
            x: 300,
            opacity: 0,
            duration: 1,
            ease: "power4.in",
        });
    },
    methods: {
        
    },
};
</script>
