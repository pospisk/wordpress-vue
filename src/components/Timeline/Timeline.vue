<template>
    <div class="row">
        <div class="col-12">
            <div class="row about">
                <div class="col-12 offset-0 col-lg-4 offset-lg-2">
                    <div class="about__img">
                        <img src="../../public/img/kristian_pospis.png" alt="Kristián Pospiš photo">
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xl-6 about__content">
                    <h2 class="mb-0">
                        Kristian Pospis
                    </h2>
                    <h3 class="serif">
                        web developer &amp; designer
                    </h3>
                    <p>
                        I’m a perfectionist who focuses on front-end development with a passion for creating interactive content and UI. I am 24 years old with 13 years of experience in Photoshop and 8 years of experience in Illustrator. 
                    </p>
                    <div class="d-flex flex-row justify-content-center justify-content-lg-start">
                        <a class="btn btn-primary btn-cv" :href="kpcvpdfen" download>CV EN🇬🇧</a>
                        <a class="btn btn-primary btn-cv" :href="kpcvpdfde" download>CV DE🇩🇪</a>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12 p-0">
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

import kpcvpdfen from "../../public/kp_cv-en.pdf";
import kpcvpdfde from "../../public/kp_cv-de.pdf";

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
            kpcvpdfen: kpcvpdfen,
            kpcvpdfde: kpcvpdfde,
            tlAbout: gsap.timeline(),
        };
    },

    computed: {},
    beforeMount() {
        // this.getTimeline();
    },
    created() {
        window.document.title = "About - pospisk";
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
