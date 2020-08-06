import Vue from 'vue';
import Router from 'vue-router';

// Components
import Home from '../components/Home.vue';
import Work from '../components/Work.vue';
import Post from '../components/Post/Post.vue';
import Page from '../components/Page/Page.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/work',
      name: 'Work',
      component: Work,
    },
    {
      path: '/posts/:postSlug',
      name: 'Post',
      component: Post,
    },
    {
      path: '/:pageSlug',
      name: 'Page',
      component: Page,
    },
  ],
  mode: 'history',
  base: '',

  // Prevents window from scrolling back to top
  // when navigating between components/views
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => { // (to, from)
  // Add a body class specific to the route we're viewing
  let body = document.querySelector('body');
  const classBase = "vue--page--";

  let slug;
  switch (from.name){
    case "Home":
      slug = "home";
      break;
    case "Post":
      slug = from.params.postSlug;
      break;
    case "Page":
      slug = from.params.pageSlug;
      break;
    case "Work":
      slug = "work";
      break;
    default:
      slug = "404";
  }
  
  body.classList.remove(classBase + slug);
  next();
});

router.afterEach((to, from) => { // (to, from)
  // Add a body class specific to the route we're viewing
  let body = document.querySelector('body');
  const classBase = "vue--page--";
  
  let slug;
  switch (to.name){
    case "Home":
      slug = "home";
      break;
    case "Post":
      slug = to.params.postSlug;
      break;
    case "Page":
      slug = to.params.pageSlug;
      break;
    case "Work":
      slug = "work";
      break;
    default:
      slug = "404";
  }

  body.classList.add(classBase + slug);
});

export default router;