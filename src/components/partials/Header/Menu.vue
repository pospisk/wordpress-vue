<template>
  <b-navbar-nav v-if="menu" class="ml-auto">
    <b-nav-item
      v-for="item in menu.items"
      :key="`menu_item_${item.ID}`"
      :to="getURLPath(item.url)"
    >
      {{ item.title }}
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  props: ["menu"],

  methods: {
    getURLPath(url) {
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
