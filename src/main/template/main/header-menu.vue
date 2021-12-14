<template>
  <a-menu
    theme="dark"
    :selectedKeys="currentRoute"
    mode="horizontal"
    :style="{
      lineHeight: '64px',
      width: +maxWidth + 'px',
      'text-align': 'right',
    }"
    @click="goto"
  >
    <a-sub-menu v-for="menu in menuData" :key="menu.name" v-show="menu.show">
      <span
        slot="title"
        :class="
          'submenu-title-wrapper ' +
          (menu.children.length == 0 ? 'menu-no-arrow' : '')
        "
        @click="goPage(menu)"
      >
        <a-icon :type="menu.icon" />{{ menu.title }}
      </span>
      <template v-if="!!menu.children && menu.children.length > 0">
        <template v-for="child in menu.children">
          <a-sub-menu
            :key="child.name"
            v-if="child.children.length > 0"
            v-show="child.show"
          >
            <span slot="title" class="submenu-title-wrapper">
              <a-icon :type="child.icon" />{{ child.title }}
            </span>
            <a-menu-item
              v-for="ch in child.children"
              :key="ch.name"
              v-show="ch.show"
            >
              <span class="submenu-title-wrapper">
                <a-icon :type="ch.icon" /> {{ ch.title }}
              </span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="child.name" v-show="child.show">
            <span class="submenu-title-wrapper">
              <a-icon :type="child.icon" />{{ child.title }}
            </span>
          </a-menu-item>
        </template>
      </template>
    </a-sub-menu>
    <!--<a-menu-item v-else :key="menu.name" v-show="menu.show">-->
    <!--<span  class="submenu-title-wrapper">-->
    <!--<a-icon type="setting"/>{{menu.title}}-->
    <!--</span>-->
    <!--</a-menu-item>-->
  </a-menu>
</template>

<script>
export default {
  name: "header-menu",
  data() {
    return {};
  },
  computed: {
    menuData() {
      let menu = this.$store.state.user.menuData;
      return menu;
    },
    currentRoute() {
      return [this.$store.state.user.currentRoute];
    },
    maxWidth() {
      return this.$store.state.app.innerWidth - 600;
    },
  },
  components: {},
  methods: {
    goto(e) {
      this.$store.state.user.currentRoute = e.key;
      this.$router.push({
        name: e.key,
      });
    },
    goPage(d) {
      if (d.children.length == 0) {
        this.$store.state.user.currentRoute = d.name;
        this.$router.push({
          name: d.name,
        });
      }
    },
  },
};
</script>

<style>
.menu-no-arrow + i {
  display: none !important;
}
</style>
