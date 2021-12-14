<template>
  <a-layout-content :style="{ padding: '0', marginTop: '64px',position:'relative' }" id="app-content">
    <div style="height:38px;">
      <tag-z @on-reload="reload"></tag-z>
    </div>
    <breadcrumb-z v-if="isBreadcrumb"></breadcrumb-z>
    <iframe v-if="href" :src="href" :style="'width:'+windowW+'px;height:'+windowH+'px;'" frameborder="0"></iframe>
    <div v-else :style="{padding: '0', minHeight: '380px',height:windowH+'px',overflow:'hidden'}" id="app-content-a">
      <vue-scroll ref="vs">
        <template v-if="isRouterAlive">
            <keep-alive v-if="$route.meta.cache">
              <router-view />
            </keep-alive>
            <router-view v-else />
        </template>
        <template v-else>
            <router-view  />
        </template>
      </vue-scroll>
    </div>
  </a-layout-content>
</template>

<script>
  import tagZ from "./header-tag";
  import breadcrumbZ from "./breadcrumb";
  import {ReadCookie} from "@/libs/util.js";
  export default {
    name: "pro-main-content",
    data(){
      return {
        isRouterAlive: true
      }
    },
    computed: {
      'windowH'() {
        return this.$store.state.app.bodyHeight
      },
      'windowW'() {
        return this.$store.state.app.bodyWidth
      },
      'isBreadcrumb'() {
        return this.$store.state.app.isBreadcrumb
      },
      'isDebug'(){
        return this.$config.debug;
      },
      'href'(){
        let r = this.$route;
        if(!r.meta.isFrame){
          return ""
        }
        let reg = /\?$/;
        let url =r.meta.href;
        if(!reg.exec(url)){
          url += "?";
        }
        return  url + "&LESITSID="+ReadCookie("LESITSID")
      }
    },
    components: {
      tagZ,
      breadcrumbZ
    },
    methods:{
       reload(){
         this.isRouterAlive = false;
         this.$nextTick(function(){
           this.isRouterAlive = true;
         });
       }
    },
    mounted() {
      let self = this;
      window.onpopstate = () => {
        let href = window.location.href;
        let paths = href.split('#')[1];
        let path = paths.split("?")[0];
        self.$router.push({
          path: path
        });
      };
    }
  }
</script>

<style scoped>

</style>
