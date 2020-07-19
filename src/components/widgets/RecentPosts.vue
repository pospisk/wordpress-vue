<template>
  <div class="widget recent-posts">
    <h3>
      <slot></slot>
    </h3>
    <div v-if="recentPostsLoaded">
      <div 
      v-for="post in recentPosts(limit)" 
      :key="post.id"
      >
        
          <div
            class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            v-bind:style="{ backgroundImage: 'url(' + post.featured_media_url +')', }"
            title="postImageAlt"
          ></div>
          <div
            class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
          >
            <div class="mb-8">
              <router-link :to="post.slug" tag="a" class="max-w-sm w-full lg:max-w-full lg:flex">
                <div class="text-gray-900 font-bold text-xl mb-2">  
                  {{ post.title.rendered }}
                  <!-- {{getPostImage(post)}} -->
                </div>
              </router-link>

              <p class="text-gray-700 text-base" v-html="post.excerpt.rendered"></p>
            </div>
            <div class="flex items-center">
              <img 
                class="w-10 h-10 rounded-full mr-4"
                :src="post.author_avatar"
                :alt="post.author_name"
              />
              <div class="text-sm">
                <a :to="post.author_url" tag="a">
                  <p class="text-gray-600"> {{post.author_name}} </p>
                </a>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from "axios";
import SETTINGS from "../../settings";
import "regenerator-runtime";

export default {
  data() {
    return {
      post: false
    };
  },
  props: ['limit'],
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded',
    }),
  },

  methods: {
    
  },
  mounted() {
    this.$store.dispatch('getPosts', { limit: this.limit });
  },
};
   
</script>