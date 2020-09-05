<template>
    <div v-if="timelineItems" class="timeline">
        <div v-for="timelineItem in timelineItems" :key="timelineItem.id" class="timeline__item">
		
            <div class="timeline__item--inner">
                <div class="timeline__item--date">
                    {{timelineItem.date | showDate()}}
                </div>
                <div class="timeline__item--title">
                    <h3 v-html="timelineItem.title.rendered"></h3> 	
                </div>
                
                <div class="timeline__item--content" v-html="timelineItem.content.rendered"></div>

                <!-- <router-link :to="'/posts/timeline/' + timelineItem.slug + '/'" tag="a" class="timeline__item--link">read more</router-link> -->

            </div>
            <div class="timeline__item--outer">
                <div class="timeline__item--icon">
                    <img :src="timelineItem.featured_media_url" :alt="timelineItem.featured_media_url">

                    {{ timelineItem.featured_media_url }}
                </div>
                <div class="timeline__item--date">
                    {{timelineItem.date | showDate()}}
                </div>
            </div>
		
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import Loader from "../partials/Loader.vue";
import SETTINGS from "../../settings";
import "regenerator-runtime";

import gsap from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(CSSRulePlugin, ScrollTrigger);

export default {
    data() {
        return {
            timelineItems: false,
            timelineImage: [],
            // postImageAlt: [],
        };
    },

    computed: {},
    created(){
        this.getTimeline();
        window.document.title = "About - pospisk";
    },
    filters: {
        showDate: function (text) {
            var fulldate = text;
            var yearMonth = fulldate.substring(0, 7);
            var year = fulldate.substring(0, 4);
            var month = yearMonth.slice(-2);
            var monthLetters;
            switch (month) {
                case "01":
                    monthLetters = "January";
                    break;
                case "02":
                    monthLetters = "February";
                    break;
                case "03":
                    monthLetters = "March";
                    break;
                case "04":
                    monthLetters = "April";
                    break;
                case "05":
                    monthLetters = "May";
                    break;
                case "06":
                    monthLetters = "June";
                    break;
                case "07":
                    monthLetters = "July";
                    break;
                case "08":
                    monthLetters = "August";
                    break;
                case "09":
                    monthLetters = "September";
                    break;
                case "10":
                    monthLetters = "October";
                    break;
                case "11":
                    monthLetters = "November";
                    break;
                case "12":
                    monthLetters = "December";
                }
            var result = monthLetters + " " + year;
            // console.log(result);
            return result;
        },
    },
    methods: {
        getTimeline: function () {
            axios
            .get(
                SETTINGS.API_BASE_PATH + "timeline?per_page=50" //&order=asc
            )
            .then((response) => {
                this.timelineItems = response.data;
            })
            .catch((e) => {
                console.log(e);
            });
        }
    },
    mounted(){
        window.addEventListener("scroll", this.updateScroll);
    },
    updated() {

        ScrollTrigger.refresh();
        if(!(this.timelineItems == false)){
            var i;
            var selectAll = document.querySelectorAll(".timeline__item");

            if((window.innerWidth > 991 )){
                
                for( i = 2; i < selectAll.length; i++){
                    gsap.from(selectAll[i], {
                        scrollTrigger: {
                            trigger: selectAll[i],
                            scrub: true,
                            start: "top bottom+=300",
                            end: "top center+=200",
                            },
                        y: 400
                    }); 
                }

            }else{
                
                for( i = 1; i < selectAll.length; i++){
                    gsap.from(selectAll[i], {
                        scrollTrigger: {
                            trigger: selectAll[i],
                            scrub: true,
                            start: "top bottom+=300",
                            end: "top center+=200",
                            },
                        y: 400
                    }); 
                }
                

            }


            gsap.from(".timeline",{
                y: "35vh",
                duration: 1,
                ease: "power4.in",
            });
        }
    },
    

    components: {
        Loader,
    },
};
</script>
