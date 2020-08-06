<template>
  <div class="row">
    <template v-if="post">
      <button v-on:click="goBack">
        go back
      </button>
      <img 
        class="img-fluid"
        :src="postImage" 
        :alt="postImageAlt">
      <h1>{{ post.title.rendered }}</h1>
      <div v-html="post.content.rendered"></div>
    </template>
    <Loader v-else/>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../partials/Loader.vue";
import { mapGetters } from "vuex";
import SETTINGS from "../../settings";

export default {
  data() {
    return {
      post: false,
      postImage: [],
      postImageAlt: []
    };
  },

  computed: {},

  beforeMount() {
    this.getPost();
  },

  methods: {
    goBack: function(){
      this.$router.go(-1)
    },
    getPost: function() {
      axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?slug=" + this.$route.params.postSlug
        )
        .then(response => {
          this.post = response.data[0];
          this.getFeaturedImage(this.post);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getFeaturedImage: function(post) {

      if(post.featured_media > 0){
        axios
          .get(
            SETTINGS.API_BASE_PATH + "media/" + post.featured_media
          )
          .then(response => {
            this.postImage = response.data.guid.rendered;
            this.postImageAlt = response.data.alt_text;
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }else{
        console.log('No Featured Image Found');
      }

    }


  },

  components: {
    Loader
  }
};
</script>
