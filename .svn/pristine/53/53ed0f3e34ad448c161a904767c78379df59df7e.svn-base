<template>
    <div>
      <iframe :src="url" :style="'width:'+windowW+'px;height:'+windowH+'px;'" frameborder="0"></iframe>
    </div>
</template>

<script>
  import {ReadCookie} from "@/libs/util.js";
    export default {
      name: "fullScreen-iframe",
      data(){
        return{
          url:""
        }
      },
      computed:{
        windowW(){
          return this.$store.state.app.innerWidth
        },
        windowH(){
          return this.$store.state.app.innerHeight
        }
      },
      mounted(){
          let r = this.$route.meta;
          let reg = /\?$/;
          let href =r.href || "";
          if(!reg.exec(href)){
              href += "?";
          }
          this.url = href + "&LESITSID="+ReadCookie("LESITSID");
      }
    }
</script>

<style scoped>

</style>
