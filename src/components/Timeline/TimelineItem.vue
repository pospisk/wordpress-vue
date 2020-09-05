<template>
    <div v-if="timelineItem">
        <h1>{{this.timelineItem.title.rendered}}</h1>
        <p v-html="this.timelineItem.content.rendered"></p>
    </div>
</template>

<script>
import axios from "axios";
import Loader from "../partials/Loader.vue";
import SETTINGS from "../../settings";

export default {
    components: {
        Loader
    },
    data() {
        return {
            timelineItem: false,
        };
    },

    computed: {},
    beforeMount() {
        this.getTimeline();
    },
    methods: {
        getTimeline: function (postslug) {
            axios
            .get(
                SETTINGS.API_BASE_PATH + "timeline?slug=" + this.$route.params.timelineSlug
            )
            .then((response) => {
                this.timelineItem = response.data[0];
                console.log(this.timelineItem);
            })
            .catch((e) => {
                console.log(e);
            });

        },
    },
};
</script>
