<template>
  <div class="row mb-5">
    <div class="col-12 postview maxw-lg">
      <template v-if="post">
        <img class="img-fluid postview__header" :src="postImage" :alt="postImageAlt" />
        <ul class="arrow__links">
          <li v-if="prevPost.slug == 'null'" class="arrow__link">
            <router-link to="/null" tag="a" class="arrow__href disabled">
              <svg class="arrow__icon" viewBox="0 0 47.5 24">
                <polygon points="32.1,19.4 24.4,12 31.8,4.6 31,3.8 23.7,11.3 16.3,3.8 15.5,4.6 23,12 15.5,19.4 16.3,20.2 23.7,12.7 31.4,20.2 "/>
              </svg>
            </router-link>
          </li>
          <li v-else class="arrow__link">
            <router-link :to="'/posts/' + prevPost.slug + '/'" tag="a" class="arrow__href" replace>
              <svg class="arrow__icon" viewBox="0 0 47.5 24">
                <polygon points="35.8,3.8 35,4.6 42,11.5 4.3,11.5 4.3,12.5 42,12.5 35,19.4 35.8,20.2 43.9,12 "/>
              </svg>

              <span class="arrow__title">
                <i class="sr-only">Previous article: </i>{{prevPost.title.rendered}}
              </span>
            </router-link>
          </li>

          <li v-if="nextPost.slug == 'null'" class="arrow__link">
            <router-link to="/null" tag="a" class="arrow__href disabled">
              <svg class="arrow__icon" viewBox="0 0 47.5 24">
                <polygon points="32.1,19.4 24.4,12 31.8,4.6 31,3.8 23.7,11.3 16.3,3.8 15.5,4.6 23,12 15.5,19.4 16.3,20.2 23.7,12.7 31.4,20.2 "/>
              </svg>
            </router-link>
          </li>
          <li v-else class="arrow__link">
            <router-link :to="'/posts/' + nextPost.slug + '/'" tag="a" class="arrow__href"> 
              <span class="arrow__title">
                <i class="sr-only">Next article: </i>{{nextPost.title.rendered}}
              </span>

              <svg class="arrow__icon" viewBox="0 0 47.5 24">
                <polygon points="35.8,3.8 35,4.6 42,11.5 4.3,11.5 4.3,12.5 42,12.5 35,19.4 35.8,20.2 43.9,12 "/>
              </svg>
            </router-link>
          </li>
        </ul>
        <div class="row">
          <div class="col-12">
            <h1 class="postview__title">{{ post.title.rendered }}</h1>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 col-md-3">
            <div class="postview__info">
              <div class="postview__info--item">
                <strong>Date</strong>
                {{ post.date | truncate(10, '') }}
              </div>
              <div class="postview__info--item">
                <strong>Author</strong>
                pospisk
                <!-- {{post.author_name}} -->
              </div>
            </div>
          </div>
          <div class="col-12 col-md-9 postview__body" v-html="post.content.rendered"></div>
        </div>
        
      </template>
      <Loader v-else />
    </div>
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
      postId: null,
      nextPost: {
        slug: 'null',
        link: 'null',
        title: {
          rendered: 'null'
        }
      },
      prevPost: {
        slug: 'null',
        link: 'null',
        title: {
          rendered: 'null'
        }
      },
      postImage: [],
      postImageAlt: [],
    };
  },

  computed: {},

  beforeMount() {
    this.getPost();
    this.getPosts();
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
  created(){

    var meta_robots = document.createElement('meta');
    meta_robots.setAttribute('name', 'robots');
    meta_robots.setAttribute('content', 'index');
    document.getElementsByTagName('head')[0].appendChild(meta_robots);
  },
  methods: {
    getPost: function (postslug) {

        axios
        .get(
          SETTINGS.API_BASE_PATH + "posts?slug=" + this.$route.params.postSlug
        )
        .then((response) => {
          this.post = response.data[0];
          this.getFeaturedImage(this.post);
          this.postId = response.data[0].id;
          var sanitizedExcerpt = this.post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
          window.document.title = this.post.title.rendered + " - pospisk";

          var meta_desc = document.createElement('meta');
          meta_desc.setAttribute('name', 'description');
          meta_desc.setAttribute('content', sanitizedExcerpt);
          document.getElementsByTagName('head')[0].appendChild(meta_desc);


          this.post.author_avatar = {};
          this.post.author_name = {};
          this.post.author_url = {};

          const axiosAuthor = async () => {
            let url = SETTINGS.API_BASE_PATH + "users/" + this.post.author;
            await axios
              .get(url)
              .then((response) => {
                if (response.data.simple_local_avatar) {
                  this.post.author_avatar = response.data.simple_local_avatar["96"]; // uses https://10up.com/plugins/simple-local-avatars-wordpress/
                } else {
                  this.post.author_avatar = response.data.avatar_urls["96"];
                }
                this.post.author_name = response.data.name;
                this.post.author_url = response.data.link;

              })
              .catch((e) => {
                console.log(e);
              });
          };
          axiosAuthor();


        })
        .catch((e) => {
          console.log(e);
        });

    },
    getPosts: function() {
      axios
        .get(
          SETTINGS.API_BASE_PATH + "posts"
        )
        .then((response) => {
          var postsArray = response.data;
          var currentPostId = this.postId;
          var cur = postsArray.map(function(e) { return e.id; }).indexOf(currentPostId);
          var maxPos = postsArray.length - 1;
          
          if( cur >= maxPos ){
            this.nextPost.slug = "null";
          }else{
            this.nextPost = postsArray[cur + 1];
          }

          if( cur == 0 ){
            this.prevPost.slug = "null";
          }else{
            this.prevPost = postsArray[cur - 1];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFeaturedImage: function (post) {
      if (post.featured_media > 0) {
        axios
          .get(SETTINGS.API_BASE_PATH + "media/" + post.featured_media)
          .then((response) => {
            this.postImage = response.data.source_url;
            this.postImageAlt = response.data.alt_text;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("No Featured Image Found");
      }
    }
  },

  components: {
    Loader,
  },
};
</script>
