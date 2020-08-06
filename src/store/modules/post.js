import Vue from 'vue';

import api from '../../api';
import * as types from '../mutation-types';

import axios from "axios";
import SETTINGS from "../../settings";
import "regenerator-runtime";
import async from 'regenerator-runtime';


const createPostSlug = post => {
  let slug = post.link.replace(window.location.protocol + '//' + window.location.host, '');
  post.slug = slug;
  
  return post; 
  
};
const createPostProperties = post => {

  post.featured_media_url = '';
  
  const axiosMedia = async () => {
    let url = SETTINGS.API_BASE_PATH + "media/" + post.featured_media;
    post.featured_media_url = await axios.get( url            
        ).then(response => {
          return response.data.source_url;
        }).catch(e => {
          console.log(e);
        });
  }

  post.author_avatar = '';
  post.author_name = '';
  post.author_url = '';

  const axiosAuthor = async() => {
    let url = SETTINGS.API_BASE_PATH + "users/" + post.author;
    await axios.get( url            
      ).then(response => {

        if(response.data.simple_local_avatar){
          post.author_avatar = response.data.simple_local_avatar['96'];  // uses https://10up.com/plugins/simple-local-avatars-wordpress/
        }else{
          post.author_avatar = response.data.avatar_urls['96'];
        }
        
        post.author_name = response.data.name;
        post.author_url = response.data.link;
      }).catch(e => {
        console.log(e);
      });
  }
  axiosMedia();
  axiosAuthor();
  return post; 
};



// initial state
const state = {
  recent: [],
  loaded: false,
};

// getters
const getters = {
  recentPosts: state => limit => {
    if (
      !limit ||
      !Number.isInteger(limit) ||
      typeof limit == 'undefined'
    ) {  
      return state.recent;
    }
    let recent = state.recent;
    return recent.slice(0, limit);
  },

  recentPostsLoaded: state => state.loaded,
};

// actions
const actions = {
  getPosts({ commit }, { limit }) {
    api.getPosts(limit, posts => {
      posts.map((post, i) => {
        posts[i] = createPostSlug(post);
        posts[i] = createPostProperties(post);

      });

      commit(types.STORE_FETCHED_POSTS, { posts });
      commit(types.POSTS_LOADED, true);
      commit(types.INCREMENT_LOADING_PROGRESS);
    });
  },
  
};

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS](state, { posts }) {
    
    // let editedPosts = [];

    // posts.forEach(async post =>{

        // let url = SETTINGS.API_BASE_PATH + "media/" + post.featured_media;
        // let result = await axios.get(
        //   url            
        //   ).then(response => {
        //     return response.data.source_url;
        //   }).catch(e => {
        //     console.log(e);
        //   });
          
          // post.featured_media_url = result;
          // Vue.set(post, 'featured_media_url', result);
          
          // post.featured_media = Object.assign({}, post.featured_media, {
          //   id: post.featured_media,
          //   url: result
          // })
          
          // editedPosts.push(post);
          
          // console.log("post");
          // console.log(post);

        // Object.defineProperty(post, 'featured_media_url', {
        //   value: result,
        //   writable: true
        // });

        // Vue.set(editedPosts,i , post);

        // this.$set(this.post.featured_media, 'url', result);
        
        // $set(post.featured_media, 'url', result);
          // state.recent = editedPosts;
    // });

    // console.log('edited posts');
    // console.log(editedPosts);

    // state.recent = editedPosts;
    // console.log(posts);
    state.recent = posts;

  },
  

  [types.POSTS_LOADED](state, val) {
    state.loaded = val;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
