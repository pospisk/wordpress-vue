<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-12">
          <h1>Work</h1>
          <recent-posts-widget></recent-posts-widget>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecentPostsWidget from "./widgets/RecentPosts.vue";
import PagesWidget from "./widgets/Pages.vue";

import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

export default {
  components: {
    RecentPostsWidget,
    PagesWidget,
  },
  created(){
    window.document.title = "Work - pospisk";
    var meta_desc = document.createElement('meta');
    meta_desc.setAttribute('name', 'description');
    meta_desc.setAttribute('content', 'Kristian Pospis, professional front-end developer and designer with a passion for interactive content. Based in Denmark and Germany.');
    document.getElementsByTagName('head')[0].appendChild(meta_desc);

    var meta_robots = document.createElement('meta');
    meta_robots.setAttribute('name', 'robots');
    meta_robots.setAttribute('content', 'index');
    document.getElementsByTagName('head')[0].appendChild(meta_robots);
  },
};
</script>