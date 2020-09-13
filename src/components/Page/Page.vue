<template>
  <div>
    <template v-if="allPagesLoaded">
      <h1 class="mt-2 text-center">{{ pageContent.title.rendered }}</h1>
      <div class="page-content" v-html="pageContent.content.rendered"></div>
    </template>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../partials/Loader.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      page: "page",
      allPagesLoaded: "allPagesLoaded",
    }),

    pageContent() {
      return this.page(this.$route.params.pageSlug);
    },
  },

  components: {
    Loader,
  },
};
</script>
