<template>
  <div class="template-main">
    <header-z></header-z>
    <div class="template-main-content" :style="'height:'+windowH+'px;'">
      <menu-z @on-collapsed="toggleCollapsed"></menu-z>
      <content-z :style="'width:'+bodyWidth+'px;'" id="main-content"></content-z>
    </div>
  </div>
</template>
<script>
  import headerZ from "./header";
  import menuZ from "./menu";
  import contentZ from "./content";
  import {GetDictByLabel} from "@/api/dict";
  export default {
    name:"template-main",
    data(){
      return{
        collapsed: true
      }
    },
    computed:{
      bodyWidth(){
        return this.$store.state.app.bodyWidth - this.$store.state.app.leftMenuWidth;
      },
      windowH(){
        return this.$store.state.app.bodyHeight;
      }
    },
    components:{
      headerZ,
      menuZ,
      contentZ
    },
    methods:{
      toggleCollapsed(status){
        this.collapsed = status;
        this.$store.state.app.leftMenuWidth = this.collapsed?60:200;
        this.$store.commit('resize');
      }
    },
    beforeMount(){
      this.$store.state.app.leftMenuWidth = this.collapsed?60:200;
      this.$store.state.app.headerHeight = 50;
      this.$store.commit('resize');
    },
    mounted(){
    }
  }
</script>
<style scoped>
 .template-main-content{
   display: flex;
   justify-content: space-between;
 }
</style>
