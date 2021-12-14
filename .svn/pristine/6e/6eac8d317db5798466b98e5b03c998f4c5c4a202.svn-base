<template>
  <a-layout-content :style="{ padding: '0', position:'relative' }" id="app-content">
    <iframe v-if="href" :src="href" :style="'width:'+windowW+'px;height:'+windowH+'px;'" frameborder="0"></iframe>
    <div v-else :style="{padding: '0', minHeight: '380px',height:windowH+'px',overflow:'hidden'}" id="app-content-a">
      <vue-scroll ref="vs">
        <router-view  />
      </vue-scroll>
    </div>
  </a-layout-content>
</template>

<script>
import {ReadCookie} from "@/libs/util.js";
export default {
  name: "main-content",
  computed: {
    'windowH'() {
      return this.$store.state.app.bodyHeight;
    },
    'windowW'() {
      return this.$store.state.app.bodyWidth;
    },
    'href'(){
       Velocity(document.getElementById("main-content"), {
          marginLeft: [ 0, "swing", '300px;' ]
        }, {
            duration: 400
        });
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
  },
  methods:{

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
