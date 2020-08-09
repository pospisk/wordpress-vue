import Vue from "vue";
import Router from "vue-router";

// Components
import Home from "../components/Home.vue";
import Work from "../components/Work.vue";
import Post from "../components/Post/Post.vue";
import Page from "../components/Page/Page.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/work",
      name: "Work",
      component: Work,
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: "/posts/:postSlug",
      name: "Post",
      component: Post,
    },
    {
      path: "/:pageSlug",
      name: "Page",
      component: Page,
    },
  ],
  mode: "history",
  base: "",

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

router.afterEach((to) => {
  // (to, from)
  // Add a body class specific to the route we're viewing
  let body = document.querySelector("body");
  const classBase = "vue--page--";

  const slug = !to.params.postSlug ? to.params.pageSlug : to.params.postSlug;

  if (slug === undefined) {
    function getURLPath(url) {
      var m = url.match(
          /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
        ),
        r = {
          hash: m[10] || "", // #asd
          host: m[3] || "", // localhost:257
          hostname: m[6] || "", // localhost
          href: m[0] || "", // http://username:password@localhost:257/deploy/?asd=asd#asd
          origin: m[1] || "", // http://username:password@localhost:257
          pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
          port: m[7] || "", // 257
          protocol: m[2] || "", // http:
          search: m[9] || "", // ?asd=asd
          username: m[4] || "", // username
          password: m[5] || "", // password
        };

      return r.pathname;
    }
    var gotURLPath = getURLPath(window.location.href);

    if (gotURLPath === "/") {
      var URLPath = "home";
    } else {
      var URLPath = gotURLPath.replace(/\//g, "");
      console.log(URLPath);
    }

    body.classList.add(classBase + URLPath);
  } else {
    body.classList.add(classBase + slug);
  }
});

export default router;
