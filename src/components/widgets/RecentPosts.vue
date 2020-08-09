<template>
  <div class="latest-posts">
    <h3 class="mb-3 reveal--title">
      <slot></slot>
      <span class="reveal--box"></span>
    </h3>
    <div v-if="recentPostsLoaded" class="posts">
      <div v-for="post in recentPosts(limit)" :key="post.id" class="post">
        <router-link :to="post.slug" tag="a" class="">
          <div
            class="post__header--image"
            v-bind:style="{
              backgroundImage: 'url(' + post.featured_media_url + ')',
            }"
            title="postImageAlt"
          ></div>
          <div class="post__body">
            <div class="post__body--content">
              <div class="post__body--title">
                <h4>{{ post.title.rendered }}</h4>
              </div>

              <p
                class="post__body--text"
                :inner-html.prop="post.excerpt.rendered | truncate(140, '...')"
              ></p>
            </div>
            <!-- <div class="post__footer">
              <img 
                class="post__footer--image"
                :src="post.author_avatar"
                :alt="post.author_name"
              />
              <div class="post__footer--name">
                <p>{{post.author_name}}</p>
              </div>
            </div> -->
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import SETTINGS from "../../settings";
import "regenerator-runtime";

export default {
  data() {
    return {
      post: false,
    };
  },
  props: ["limit"],
  computed: {
    ...mapGetters({
      recentPosts: "recentPosts",
      recentPostsLoaded: "recentPostsLoaded",
    }),
  },

  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getPosts", { limit: this.limit });
  },
};
</script>
